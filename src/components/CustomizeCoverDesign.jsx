import { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import { useParams } from "react-router-dom";
import domtoimage from "dom-to-image";
import PhoneConfigurationPanel from "./common/PhoneConfigurationPanel";
import { useUploadImageMutation } from "@/store/services/imageApi";
import { finishesConfig, iphoneColorsConfig, materialsConfig } from "@/utils/config";
import { toast } from "sonner";
import { useAddCustomPhoneCoverMutation } from "../store/services/PhoneApi";
import { useNavigate } from "react-router-dom";

const CustomizeCoverDesign = () => {
  const [customizeForm, setCustomizeForm] = useState({
    color: 0,
    material: 0,
    finish: 0,
    model: 0,
    price: 19
  });
  const { id } = useParams();
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: 200, height: 200 });
  const [droppedImage, setDroppedImage] = useState(
    `https://res.cloudinary.com/do2lx5yjd/image/upload/${id}`
  );
  const [
    uploadImage,
    {
      isError: isImageUploadError,
      error: imageUploadError,
      data: imageUploadResponse,
      isSuccess: isImageUploadSuccess,
    },
  ] = useUploadImageMutation();

  const navigate = useNavigate();
  const [addCustomPhoneCover, { error: dbError, isLoading: isLoadingDb }] =
    useAddCustomPhoneCoverMutation();
  if (isImageUploadError) {
    toast(imageUploadError.error);
  }
  if (dbError) {
    toast(dbError.error);
  }
  useEffect(() => {
    if (isImageUploadSuccess) {
      setCustomizeForm((prevState) => ({
        ...prevState,
        imageUrl: imageUploadResponse?.public_id,
      }));
    }
  }, [imageUploadResponse, isImageUploadSuccess]);
  
  useEffect(() => {
    if (isImageUploadSuccess) {
      const uploadDataInDb = async () => {
        await addCustomPhoneCover({
          data: customizeForm,
          id: id,
        });
        navigate(`/configure/preview/${id}`);
      };
      uploadDataInDb();
    }
  
  }, [customizeForm.imageUrl])

  const phoneRef = useRef(null);
  const containerRef = useRef(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setDroppedImage(reader.result);
        setPosition({ x: 50, y: 50 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfigOnClick = (index, name) => {
    let configPrice = 0;
    const basePrice = 19;
    if (name === 'material') {
      configPrice = materialsConfig?.[index].price
    }
    if (name === 'finish') {
      configPrice = finishesConfig?.[index].price
    }
    setCustomizeForm((prevState) => ({
      ...prevState,
      [name]: index,
      price: basePrice + configPrice
    }));
  };
  async function saveConfig() {
    try {
      const phoneElement = phoneRef.current;

      if (!phoneElement) {
        console.error("Phone container not found!");
        return;
      }

      const originalOverflow = phoneElement.style.overflow;
      phoneElement.style.overflow = "hidden";

      await new Promise((resolve) => setTimeout(resolve, 0));

      const dataUrl = await domtoimage.toPng(phoneElement, {
        quality: 1,
        width: phoneElement.getBoundingClientRect().width,
        height: phoneElement.getBoundingClientRect().height,
      });

      phoneElement.style.overflow = originalOverflow;

      const blob = await fetch(dataUrl).then((res) => res.blob());

      const file = new File([blob], "custom-cover.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "custom-cover");

      await uploadImage({ endpoint: "image/upload", formData });
    } catch (error) {
      toast(error);
    }
  }

  return (
    <div className="my-6 grid gap-1.5 grid-cols-1 md:grid-cols-[65%_35%] relative">
      <div
        ref={containerRef}
        className="parent-drag-container bg-gray-100 border-dashed border border-gray-400 overflow-hidden rounded-2xl h-[37.5rem] w-full flex items-center justify-center relative"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div
          ref={phoneRef}
          className={`relative w-full max-w-[16rem] aspect-[896/1831]  rounded-[40px] border-black ${
            iphoneColorsConfig[customizeForm.color].className
          }`}
        >
          <div className="absolute inset-0 bottom-px left-[3px] right-[3px] top-px z-40 rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.92)] pointer-events-none"></div>
          <img
            src="/phone-template.png"
            alt="Phone Image"
            className="w-full h-full object-cover absolute top-0 left-0 z-40 pointer-events-none"
          />

          <Rnd
            position={position}
            size={size}
            bounds=".parent-drag-container"
            enableResizing={{
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }}
            enableUserSelectHack={false}
            onDragStop={(e, d) => setPosition({ x: d.x, y: d.y })}
            onResizeStop={(e, direction, ref, delta, pos) => {
              const parent = containerRef.current.getBoundingClientRect();
              const newWidth = Math.min(ref.offsetWidth, parent.width);
              const newHeight = Math.min(ref.offsetHeight, parent.height);

              setSize({ width: newWidth, height: newHeight });
              setPosition(pos);
            }}
            dragHandleClassName="drag-handle"
            className="absolute top-0 left-0"
            minWidth={50}
            minHeight={50}
          >
            <img
              className="w-full h-full object-fill pointer-events-auto select-none drag-handle absolute bg-transparent inset-0"
              src={droppedImage}
              alt="Draggable Image"
            />

            <div className="absolute inset-0 bg-transparent drag-handle cursor-grab" />
          </Rnd>
        </div>
      </div>

      <PhoneConfigurationPanel
        customizeForm={customizeForm}
        handleConfigOnClick={handleConfigOnClick}
        saveConfig={saveConfig}
        isLoadingDb={isLoadingDb}
      />
    </div>
  );
};

export default CustomizeCoverDesign;
