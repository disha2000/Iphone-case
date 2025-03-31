import AddToCart from "./components/common/AddToCart";
import Stars from "./components/common/Stars";
import WrappedContainer from "./components/common/WrappedContainer";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useGetCustomPhoneCoverQuery } from "./store/services/PhoneApi";
import { OrbitProgress } from "react-loading-indicators";
import { ImageURL } from "./utils/config";
import ModelDropDown from "./components/common/ModelDropDown";

const PhoneCoverPreview = () => {
  const { id } = useParams();
  const { data, error, isLoading, refetch } = useGetCustomPhoneCoverQuery(id);
  useEffect(() => {
    refetch();
  }, []);

  const handleConfigOnClick = () => {};
  if (isLoading) {
    return (
      <div className="w-full h-full">
        <OrbitProgress color="white" size="small" text="" textColor="" />
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <WrappedContainer className="mt-[58px] lg:px-[10%] md:px-[5%] px-[3%] gap-x-2">
      {data && (
        <div className="grid md:grid-cols-2">
          <Zoom>
            <img src={`${ImageURL}${data.imageUrl}`} />
          </Zoom>
          <div className="pt-[10%]">
            <h1 className="font-normal text-gray-900 text-[20px] my-1.5">
              {data.name}
            </h1>
            <div className="my-3">
              <Stars />
              <p className="text-sm font-medium text-gray-500">
                (4.9/5) 2359 Rating & 142 Review
              </p>
            </div>
            <h2 className="font-bold my-1.5">₹199.00</h2>
            <h3 className="bg-indigo-500 p-1.5 inline-block text-white my-2">
              <span>FREE DELIVERY</span>
            </h3>
            <div className="w-[200px]">
              <label className="font-medium text-sm text-gray-700">Select Model</label>
              <ModelDropDown handleConfigOnClick={handleConfigOnClick}/>
            </div>
            <ul className="text-gray-500 font-normal text-sm my-8">
              <li className="pb-1">- Metal Back With A Glossy Finish</li>
              <li className="pb-1">- Rubber Protected Sides For Better Grip</li>
              <li className="pb-1">
                - Shock-Absorbent To Prevent Fall Damages
              </li>
              <li className="pb-1">- Photo-realistic Stunning Print quality</li>
              <li className="pb-1">- Delivery in 5-7 working days</li>
            </ul>
            <div className="my-3 text-sm font-medium flex">
              <input type="checkbox" />
              <label className="pl-1.5">Add Flexible Glass Screen Guard</label>
            </div>
            <div className="flex start-0 my-2.5">
              <AddToCart id={id} data={data} />
            </div>
          </div>
        </div>
      )}
    </WrappedContainer>
  );
};
export default PhoneCoverPreview;
