import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { checkProductInfoValidate } from "@/utils/validate";
import { useAddCustomPhoneCoverMutation } from "@/store/services/PhoneApi";
import { useUploadImageMutation } from "@/store/services/imageApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";
import { useGetCustomPhoneCoverQuery } from "../store/services/PhoneApi";
import { useSearchParams } from "react-router-dom";
import { ImageURL } from "@/utils/config";
import { convertBlobUrlToFile } from "@/utils/helpers";


const NewPhoneCover = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    quantity: "",
    keywords: "",
    image: "",
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get("edit");
  const id = searchParams.get("id");
  const { data, isLoading, isSuccess } = useGetCustomPhoneCoverQuery(id);

  useEffect(() => {
    if (isSuccess && data) {
      setProductDetails({
        name: data?.name || "",
        quantity: data?.quantity || "",
        keywords: data?.keywords || "",
        price: data?.price || "",
        image: ImageURL + data.imageUrl,
      });
    }
  }, [data, isSuccess]);
  const [errorMessage, setErrorMessage] = useState({});
  const [uploadImage] = useUploadImageMutation();
  const [addCustomPhoneCover, { isLoading: isLoadingDb }] =
    useAddCustomPhoneCoverMutation();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setProductDetails((prevState) => ({
        ...prevState,
        image: URL.createObjectURL(img),
      }));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addProduct = async () => {
    try {
      const { errorField, isFormValid } =
        checkProductInfoValidate(productDetails);
      setErrorMessage(errorField);
      if (!isFormValid) {
        return;
      }
      const formData = new FormData();
      const imageFile = await convertBlobUrlToFile(
        productDetails.image,
        "uploaded-image.png"
      );
      formData.append("file", imageFile);
      formData.append("upload_preset", "custom-cover");

      const response = await uploadImage({
        endpoint: "image/upload",
        formData,
      });
      let data = {};
      if (response?.data?.public_id) {
        data = {
          imageUrl: response.data.public_id,
          name: productDetails.name,
          price: productDetails.price,
          quantity: productDetails.quantity,
          keywords: productDetails.keywords,
        };
      }
      if (!isEdit) {
        await addCustomPhoneCover({
          data: data,
          id: response.data.public_id,
        });

        toast(<div>Added Phone Cover Successfully</div>);
      } else {
        await addCustomPhoneCover({ data, id });

        toast(<div>Edited Phone Cover Successfully</div>);
      }
      navigate(`/dashboard`);
    } catch (error) {
      toast(error);
    }
  };

  if (isEdit && isLoading) {
    return (
      <div className="w-full h-full">
        <OrbitProgress color="white" size="small" text="" textColor="" />
      </div>
    );
  }
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
              value={productDetails.name}
              type="text"
              name="name"
              placeholder="product Name"
              onChange={handleChange}
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
              value={productDetails.quantity}
              type="number"
              name="quantity"
              placeholder="quantity"
              onChange={handleChange}
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
              value={productDetails.keywords}
              type="text"
              name="keywords"
              placeholder="keywords"
              onChange={handleChange}
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
              value={productDetails.price}
              type="number"
              name="price"
              placeholder="price"
              onChange={handleChange}
              className="focus-visible:ring-1 focus-visible:ring-input-outline p-4  border-1 border-input-border"
            />
            {errorMessage.price && (
              <p className="text-red-700 font-medium text-xs text-right pt-1">
                {errorMessage.price}
              </p>
            )}
          </div>
          <div className="mb-3.5">
            {productDetails.image && (
              <img className="w-[90px] h-[150px]" src={productDetails.image} />
            )}
            <Label htmlFor="email" className="pb-1.5 text-label-foreground">
              Select File<span className="text-red-500">*</span>
            </Label>
            <input
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
            disabled={isLoading}
          >
            {isLoadingDb && (
              <OrbitProgress color="white" size="small" text="" textColor="" />
            )}
            {!isEdit ? "Add Cover +" : "Edit Cover"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewPhoneCover;
