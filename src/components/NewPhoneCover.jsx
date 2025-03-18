import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { checkProductInfoValidate } from "@/utils/validate";

const NewPhoneCover = () => {
  const [image, setImage] = useState(null);
  const nameRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();
  const keywordsRef = useRef();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));
    }
  };

  const addProduct = () => {
    const [_name, _price, _quantity, _keywords] = [nameRef, priceRef, quantityRef, keywordsRef]
    checkProductInfoValidate([_name, _price, _quantity, _keywords]);
  };
  return (
    <div className="lg:px-[10%] md:px-[5%] px-[3%] mt-[57px] py-5 min-h-screen">
      <h1 className="text-center font-bold text-2xl">Add New Cover</h1>
      <div className="flex flex-col pt-[2%] items-center w-full h-full">
        <div className="md:w-[50%]">
          <div className="mb-3.5 ]">
            <Label htmlFor="email" className="pb-1.5 text-label-foreground">
              Product Name
            </Label>
            <Input
              ref={nameRef}
              type="text"
              name="name"
              placeholder="product Name"
              className="focus-visible:ring-1 focus-visible:ring-input-outline p-4  border-1 border-input-border"
            />
          </div>
          <div className="mb-3.5">
            <Label htmlFor="email" className="pb-1.5 text-label-foreground">
              Quantity
            </Label>
            <Input
              ref={quantityRef}
              type="number"
              name="quantity"
              placeholder="quantity"
              className="focus-visible:ring-1 focus-visible:ring-input-outline p-4  border-1 border-input-border"
            />
          </div>
          <div className="mb-3.5">
            <Label htmlFor="email" className="pb-1.5 text-label-foreground">
              Keywords
            </Label>
            <Input
              ref={keywordsRef}
              type="text"
              name="keywords"
              placeholder="keywords"
              className="focus-visible:ring-1 focus-visible:ring-input-outline p-4  border-1 border-input-border"
            />
          </div>
          <div className="mb-3.5">
            <Label htmlFor="email" className="pb-1.5 text-label-foreground">
              Price
            </Label>
            <Input
              ref={priceRef}
              type="number"
              name="price"
              placeholder="price"
              className="focus-visible:ring-1 focus-visible:ring-input-outline p-4  border-1 border-input-border"
            />
          </div>
          <div className="mb-3.5">
            {image && <img className="w-[100px] h-[150px]" src={image} />}
            <Label htmlFor="email" className="pb-1.5 text-label-foreground">
              Select File
            </Label>
            <input type="file" name="myImage" onChange={onImageChange} />
          </div>
          <Button
            className="bg-button-background hover:bg-button-background-hover cursor-pointer"
            onClick={addProduct}
          >
            Add Product +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewPhoneCover;

// category
// quantity
// imageUrl
// title
// price
