import AddToCart from "./components/common/AddToCart";
import Stars from "./components/common/Stars";
import WrappedContainer from "./components/common/WrappedContainer";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const PhoneCoverPreview = () => {
  return (
    <WrappedContainer className="mt-[58px] lg:px-[10%] md:px-[5%] px-[3%] gap-x-2">
      <div className="grid md:grid-cols-2">
      <Zoom>

        <img src="https://zapvi.in/wp-content/uploads/2024/07/M-APPLEIPHONE11-5859.jpg" />
        </Zoom>
        <div className="pt-7">
          <h1 className="font-normal text-gray-900 text-[17px] my-1.5">
            Abstract Background Blue Glossy Metal TPU Phone Cover for Apple
            Iphone 11
          </h1>
          <div className="my-3">
            <Stars/>
            <p className="text-sm font-medium text-gray-500">(4.9/5) 2359 Rating & 142 Review</p>
          </div>
          <h2 className="font-bold my-1.5">₹199.00</h2>
          <h3 className="bg-indigo-500 p-1.5 inline-block text-white my-2">
            <span>FREE DELIVERY</span>
          </h3>
          <ul className="text-gray-500 font-normal text-sm my-8">
            <li className="pb-1">- Metal Back With A Glossy Finish</li>
            <li className="pb-1">- Rubber Protected Sides For Better Grip</li>
            <li className="pb-1">- Shock-Absorbent To Prevent Fall Damages</li>
            <li className="pb-1">- Photo-realistic Stunning Print quality</li>
            <li className="pb-1">- Delivery in 5-7 working days</li>
          </ul>
          <div className="my-3 text-sm font-medium flex">
            <input type="checkbox" />
            <label className="pl-1.5">Add Flexible Glass Screen Guard</label>
          </div>
          <div className="flex start-0 my-2.5">
            <AddToCart />
          </div>
        </div>
      </div>
    </WrappedContainer>
  );
};
export default PhoneCoverPreview;
