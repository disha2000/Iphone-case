import { useGetCustomPhoneCoverQuery } from "../store/services/PhoneApi";
import { useParams } from "react-router-dom";
import { OrbitProgress } from "react-loading-indicators";
import {
  mobileListConfig,
  materialsConfig,
  finishesConfig,
} from "@/utils/config";
import { Check } from "lucide-react";
import { Button } from "./ui/button";

const PhoneReviewPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetCustomPhoneCoverQuery(id);
  if (isLoading) {
    return (
      <div className="w-full h-full">
        {" "}
        <OrbitProgress color="white" size="small" text="" textColor="" />
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  const { finish, material, imageUrl, model, price } = data;
  const phoneCase = `https://res.cloudinary.com/do2lx5yjd/image/upload/${imageUrl}`;
  return (
    <div className="grid gap-1.5 grid-cols-1 md:grid-cols-[40%_60%] py-9 text-center md:text-left">
      <img src={phoneCase} className="m-auto" />
      <div className="w-full h-full my-4">
        <h1 className="text-2xl font-bold">
          Your {mobileListConfig[model].value} Case
        </h1>
        <div className="pb-9">
          <Check className="size-5 inline-block text-indigo-500 mr-2" />
          <p className="text-sm inline-block">In stock and ready to ship</p>
        </div>
        <div className="flex lg:flex-row flex-col justify-between">
          <div className="text-[15px]/7">
            <h3 className="font-medium">Highlights</h3>
            <li>Wireless charging compatible</li>
            <li>TPU shock absorption</li>
            <li>5 year print warranty</li>
          </div>
          <div className="text-[15px]/7">
            <h3 className="font-medium">Materials</h3>
            <li>High-qualty, durable material</li>
            <li>Scratch and fingerprint resistant coating</li>
          </div>
        </div>
        <div className="border-1 border-gray-200 my-8"></div>
        <div className="bg-indigo-50  p-8 text-[15px]">
          <div className="flex flex-row justify-between">
            <p>Base price</p>
            <p>$19.00</p>
          </div>

          {finish && (
            <div className="flex flex-row justify-between">
              <p>{finishesConfig[finish]?.title}</p>
              <p>${finishesConfig[finish]?.price.toFixed(2)}</p>
            </div>
          )}
          {finish && (
            <div className="flex flex-row justify-between">
              <p>{materialsConfig[material]?.title}</p>
              <p>${materialsConfig[material]?.price?.toFixed(2)}</p>
            </div>
          )}
          <div className="border-1 border-gray-200 my-3"></div>
          <div className="flex flex-row justify-between">
            <p className="font-bold">Order Total</p>
            <p className="font-bold">${price?.toFixed(2)}</p>
          </div>
        </div>

        <Button className="my-5 float-end text-sm bg-button-background hover:bg-button-background-hover flex flex-row items-center cursor-pointer">
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default PhoneReviewPage;
