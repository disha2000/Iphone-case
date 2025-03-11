import ModelDropDown from "./common/ModelDropDown";
import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { Rnd } from "react-rnd";
import { useParams } from "react-router-dom";
import {
  iphoneColorsConfig,
  materialsConfig,
  finishesConfig,
} from "@/utils/config";

const BoxOutline = ({
  title,
  description,
  price,
  handleOnClick,
  index,
  selectedIndex,
}) => {
  return (
    <div
      className={`my-3 p-3 mx-1 ${
        index === selectedIndex ? "border-indigo-500" : "border-gray-200"
      } border-2 border-gray-200 flex flex-row w-full justify-between text-[13px] rounded-lg cursor-pointer`}
      onClick={() => handleOnClick(index)}
    >
      <div>
        <p className="font-bold">{title}</p>
        <p className="text-gray-400">{description}</p>
      </div>
      <p>{price}</p>
    </div>
  );
};

const MateiralForm = ({ handleMaterialOnClick, selectedMaterial }) => {
  return (
    <div>
      <label className="font-medium text-sm text-gray-600 pt-4 ">
        Material
      </label>
      {materialsConfig.map((material, index) => {
        return (
          <BoxOutline
            title={material.title}
            price={material.price}
            description={material.description}
            key={index}
            index={index}
            selectedIndex={selectedMaterial}
            handleOnClick={handleMaterialOnClick}
          />
        );
      })}
    </div>
  );
};

const FinishinForm = ({ handleFinishOnClick, selectedFinish }) => {
  return (
    <div>
      <label className="font-medium text-sm text-gray-600 pt-4">Finish</label>
      {finishesConfig.map((finish, index) => {
        return (
          <BoxOutline
            title={finish.title}
            price={finish.price}
            description={finish.description}
            key={index}
            index={index}
            selectedIndex={selectedFinish}
            handleOnClick={handleFinishOnClick}
          />
        );
      })}
    </div>
  );
};

const CustomizeCoverDesign = () => {
  const [customizeForm, setCustomizeForm] = useState({ color: 0 });
  const { id } = useParams();
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: 200, height: 200 });
  const [droppedImage, setDroppedImage] = useState(
    `https://res.cloudinary.com/do2lx5yjd/image/upload/${id}`
  );

  const phoneRef = useRef(null);

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


  const handleMaterialOnClick = (index) => {
    setCustomizeForm((prevState) => ({
      ...prevState,
      material: index,
    }));
  };
  const handleFinishOnClick = (index) => {
    setCustomizeForm((prevState) => ({
      ...prevState,
      finish: index,
    }));
  };

  const handleColorChange = (index) => {
    setCustomizeForm((prevState) => ({
      ...prevState,
      color: index,
    }));
  };
  return (
    <div className="my-6 grid gap-1.5 grid-cols-1 md:grid-cols-[65%_35%] relative">
      <div
        ref={phoneRef}
        className="parent-drag-container bg-gray-100 border-dashed border border-gray-400 overflow-hidden rounded-2xl h-[37.5rem] w-full flex items-center justify-center relative"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div
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
              const parent = phoneRef.current.getBoundingClientRect();
              const newWidth = Math.min(ref.offsetWidth, parent.width);
              const newHeight = Math.min(ref.offsetHeight, parent.height);

              setSize({ width: newWidth, height: newHeight });
              setPosition(pos);
            }}
            dragHandleClassName="drag-handle"
            className="absolute top-0 left-0 border-[3px] border-gray-950"
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

      <div className="w-full flex flex-col justify-between h-[37.5rem]">
        <div className="p-4">
          <h1 className="font-bold text-lg">Customize your case</h1>
          <div className="w-full border border-gray-200 my-2"></div>
        </div>

        <div className="px-4 h-[90%] overflow-y-auto">
          <div className="space-y-4 ">
            <p className="font-medium text-sm text-gray-600">
              Color: {iphoneColorsConfig[customizeForm.color].color}
            </p>
            <div className="colors-selection flex flex-row gap-2 py-2.5 px-1">
              {iphoneColorsConfig.map((color, index) => {
                return (
                  <div
                    key={index}
                    className={`size-8 ${
                      color.className
                    } rounded-full cursor-pointer 
                    ${
                      customizeForm.color === index
                        ? `outline-offset-2 outline-solid ${color.outline}`
                        : ""
                    }`}
                    onClick={() => handleColorChange(index)}
                  ></div>
                );
              })}
            </div>

            <div>
              <label className="font-medium text-sm text-gray-600">Model</label>
              <ModelDropDown />
            </div>

            <MateiralForm
              handleMaterialOnClick={handleMaterialOnClick}
              selectedMaterial={customizeForm?.material}
            />
            <FinishinForm
              handleFinishOnClick={handleFinishOnClick}
              selectedFinish={customizeForm?.finish}
            />
          </div>
        </div>
        <div className="final-price w-ful p-4">
          <div className="grid pt-2.5 grid-cols-[30%_70%] items-center">
            <p className="text-lg font-semibold">{"$19.00"}</p>
            <Button className="w-full text-sm bg-indigo-500">Continue</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeCoverDesign;
