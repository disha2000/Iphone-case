import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { checkProductInfoValidate } from "@/utils/validate";
import { useAddCustomPhoneCoverMutation } from "@/store/services/PhoneApi";
import { useUploadImageMutation } from "@/store/services/imageApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";

const NewPhoneCover = () => {
  const [image, setImage] = useState(null);
  const nameRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();
  const keywordsRef = useRef();
  const imageRef = useRef();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState({});
  const [
    uploadImage,
  ] = useUploadImageMutation();
  const [addCustomPhoneCover, { isLoading: isLoadingDb }] =
    useAddCustomPhoneCoverMutation();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));
    }
  };

  const addProduct = async () => {
    try {
      const [_name, _price, _quantity, _keywords, _image] = [
        nameRef.current,
        priceRef.current,
        quantityRef.current,
        keywordsRef.current,
        imageRef.current,
      ];
      const { errorField, isFormValid } = checkProductInfoValidate([
        _name,
        _price,
        _quantity,
        _keywords,
        _image,
      ]);
      console.log(errorField, isFormValid);
      setErrorMessage(errorField);
      if (!isFormValid) {
        return;
      }
      const formData = new FormData();
      console.log(imageRef.current.files[0]);
      formData.append("file", imageRef.current.files[0]);
      formData.append("upload_preset", "custom-cover");
      const response = await uploadImage({
        endpoint: "image/upload",
        formData,
      });
      if (response?.data?.public_id) {
        const data = {
          imageUrl: response.data.public_id,
          name: _name.value,
          price: _price.value,
          quantity: _quantity.value,
          keywords: _keywords.value,
        };
        await addCustomPhoneCover({ data: data, id: response.data.public_id });

        toast(<div>Added Phone Cover Successfully</div>);
        navigate(`/dashboard`);
      }
    } catch (error) {
      toast(error);
    }
  };
  return (
    <div className="lg:px-[10%] md:px-[5%] px-[3%] mt-[30px] h-full">
      <h1 className="text-center font-bold text-2xl">Add Cover</h1>
      <div className="flex flex-col pt-[2%] items-center w-full h-full">
        <div className="md:w-[50%]">
          <div className="mb-3.5 ]">
            <Label htmlFor="email" className="pb-1.5 text-label-foreground">
              Product Name<span className="text-red-500">*</span>
            </Label>
            <Input
              ref={nameRef}
              type="text"
              name="name"
              placeholder="product Name"
              className="focus-visible:ring-1 focus-visible:ring-input-outline p-4  border-1 border-input-border"
            />
            {errorMessage.name && (
              <p className="text-red-700 font-medium text-xs text-right pt-1">
                {errorMessage.name}
              </p>
            )}
          </div>
          <div className="mb-3.5">
            <Label htmlFor="email" className="pb-1.5 text-label-foreground">
              Quantity<span className="text-red-500">*</span>
            </Label>
            <Input
              ref={quantityRef}
              type="number"
              name="quantity"
              placeholder="quantity"
              className="focus-visible:ring-1 focus-visible:ring-input-outline p-4  border-1 border-input-border"
            />
            {errorMessage.quantity && (
              <p className="text-red-700 font-medium text-xs text-right pt-1">
                {errorMessage.quantity}
              </p>
            )}
          </div>
          <div className="mb-3.5">
            <Label htmlFor="email" className="pb-1.5 text-label-foreground">
              Keywords<span className="text-red-500">*</span>
            </Label>
            <Input
              ref={keywordsRef}
              type="text"
              name="keywords"
              placeholder="keywords"
              className="focus-visible:ring-1 focus-visible:ring-input-outline p-4  border-1 border-input-border"
            />
            {errorMessage.keywords && (
              <p className="text-red-700 font-medium text-xs text-right pt-1">
                {errorMessage.keywords}
              </p>
            )}
          </div>
          <div className="mb-3.5">
            <Label htmlFor="email" className="pb-1.5 text-label-foreground">
              Price<span className="text-red-500">*</span>
            </Label>
            <Input
              ref={priceRef}
              type="number"
              name="price"
              placeholder="price"
              className="focus-visible:ring-1 focus-visible:ring-input-outline p-4  border-1 border-input-border"
            />
            {errorMessage.price && (
              <p className="text-red-700 font-medium text-xs text-right pt-1">
                {errorMessage.price}
              </p>
            )}
          </div>
          <div className="mb-3.5">
            {image && <img className="w-[100px] h-[150px]" src={image} />}
            <Label htmlFor="email" className="pb-1.5 text-label-foreground">
              Select File<span className="text-red-500">*</span>
            </Label>
            <input
              ref={imageRef}
              type="file"
              name="image"
              onChange={onImageChange}
              className="cursor-pointer"
            />
            {errorMessage.image && (
              <p className="text-red-700 font-medium text-xs text-right pt-1">
                {errorMessage.image}
              </p>
            )}
          </div>
          <Button
            className="bg-button-background hover:bg-button-background-hover cursor-pointer"
            onClick={addProduct}
          >
            {isLoadingDb && (
              <OrbitProgress color="white" size="small" text="" textColor="" />
            )}
            Add Cover +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewPhoneCover;
