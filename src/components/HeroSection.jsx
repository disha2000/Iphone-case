import { Check } from "lucide-react";
import Stars from "./common/Stars.jsx";

const HeroSection = () => {
  return (
    <div className="flex flex-col lg:flex-row md:justify-between items-center text-center lg:text-left min-h-[100vh]">
      <div className="product-info max-w-xl flex flex-col items-center lg:items-start ">
        <h1 className="font-extrabold text-2xl/10 lg:text-4xl/12 max-w-sm text-center lg:text-left text-wrap">
          Your Phone, Your Style:
          <span className="bg-indigo-500 px-1.5 mx-1.5 text-white">
            Customizable
          </span>
          Covers for Every Mood.
        </h1>
        <p className="pt-5">
          CaseCobra offers killer phone
          <span className="font-semibold">covers—choose</span> from our
          signature designs or unleash your creativity with fully customizable
          cases that protect your device and immortalize your memories.
        </p>
        <ul className="pt-6 text-sm/7 font-medium">
          <li>
            <Check className="inline-block text-indigo-500 pr-1" />
            High-quality, durable material
          </li>
          <li>
            <Check className="inline-block text-indigo-500 pr-1" />5 year print
            guarantee
          </li>
          <li>
            <Check className="inline-block text-indigo-500 pr-1" />
            Modern iPhone models supported
          </li>
        </ul>
        <div className="flex items-center justify-between lg:w-[60%] lg:flex-row flex-col py-5">
          <div>
            <img
              className="size-10 rounded-full ring-2 object-cover inline-block ring-indigo-200"
              src="/users/user-1.png"
              alt="user1"
            />
            <img
              className="size-10 rounded-full ring-2 object-cover inline-block ring-indigo-200 m-[-15px]"
              src="/users/user-2.png"
              alt="user2"
            />

            <img
              className="size-10 rounded-full ring-2 object-cover inline-block ring-indigo-200"
              src="/users/user-3.png"
              alt="user3"
            />

            <img
              className="size-10 rounded-full ring-2 object-cover inline-block ring-indigo-200 m-[-15px]"
              src="/users/user-4.jpg"
              alt="user4"
            />

            <img
              className="size-10 rounded-full ring-2 object-cover inline-block ring-indigo-200"
              src="/users/user-5.jpg"
              alt="user5"
            />
          </div>

          <div>
            <Stars />
            <p className="block text-sm">
              <span className="font-semibold">1.250</span> happy customers
            </p>
          </div>
        </div>
      </div>
      <div className="product-image relative max-w-[250px]">
        <img
          className="absolute top-30 right-56 hidden w-40 select-none sm:block lg:hidden lg:w-52 xl:block"
          src="/Your Image.svg"
        ></img>
        <img
          className="absolute"
          src="/phone-template-white-edges.png"
          alt="Iphone"
        />
        <img src="/testimonials/1.jpg" alt="testimonial" />
      </div>
    </div>
  );
};
export default HeroSection;
