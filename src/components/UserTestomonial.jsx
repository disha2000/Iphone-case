import { Check } from "lucide-react";
import Stars from "./common/Stars";
const UserTestoMonial = () => {
  return (
    <div className="min-h-[100vh] pt-10">
      <h1 className="text-center sm:text-4xl  lg:text-5xl font-bold text-2xl">
        What our <span className="wavy decoration-10 decoration-amber-200">Customers</span> say
      </h1>
      <div className="flex md:flex-row flex-col pt-20">
        <div className="pb-10 pr-12">
          <Stars />
          <p className="py-3.5 text-base/8">
            "The case feels durable and I even got a compliment on the design.
            Had the case for two and a half months now and{" "}
            <span className="bg-black p-1 text-white">
              the image is super clear
            </span>
            , on the case I had before, the image started fading into yellow-ish
            color after a couple weeks. Love it."
          </p>
          <div className="flex">
            <img
              src="/users/user-1.png"
              className="size-12 rounded-full ring-2 object-cover inline-block ring-white"
              alt='user 1'
            />
            <div className="pl-4">
              <h2 className="font-semibold">Josh</h2>
              <Check className="inline-block size-4 text-indigo-500 overflow-clip" />
              <p className="font-medium text-sm inline-block">
                Verified Purchase
              </p>
            </div>
          </div>
        </div>

        <div className="pb-10">
          <Stars />
          <p className="py-3.5 text-base/8">
            "I usually keep my phone together with my keys in my pocket and that
            led to some pretty heavy scratchmarks on all of my last phone cases.
            This one, besides a barely noticeable scratch on the corner,{" "}
            <span className="bg-black p-1 text-white">
              looks brand new after about half a year
            </span>
            . I dig it."
          </p>
          <div className="flex">
            <img
              src="/users/user-2.png"
              className="size-12 rounded-full ring-2 object-cover inline-block ring-white"
              alt="user 2"
            />
            <div className="pl-4">
              <h2 className="font-semibold">Rose</h2>
              <Check className="inline-block size-4 text-indigo-500 overflow-clip" />
              <p className="font-medium text-sm inline-block">
                Verified Purchase
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserTestoMonial;
