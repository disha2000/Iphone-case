import useInfiniteScroll from "@/customhooks/useInfiniteScroll";
import WrappedContainer from "./common/WrappedContainer";
import { OrbitProgress } from "react-loading-indicators";
import PhoneCoverItem from "./PhoneCoverItem";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { sortOptions } from "@/utils/config";
import { outOfOrderPhoneCase } from "./PhoneCoverItem";

const PhoneCases = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentSelectedSort, setCurrentSelectedSort] = useState(0);
  const [lastElementRef, covers, isLoading, error] = useInfiniteScroll(currentSelectedSort, 15);
  
  const OutOfOrderPhoneCase = outOfOrderPhoneCase(PhoneCoverItem);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <OrbitProgress color="white" size="small" text="" textColor="" />
      </div>
    );
  }

  if (error) {
    return <div className="w-full h-screen flex items-center justify-center">{error.message}</div>;
  }

  return (
    <WrappedContainer className="mt-[55px] lg:px-[10%] md:px-[5%] px-[3%]">
      <div className="configure_options py-5 text-gray-600 flex flex-row justify-between text-sm">
        <span className="cursor-pointer">
          <SlidersHorizontal className="inline-block size-5" />
          <span className="pl-1">FILTER</span>
        </span>

        <div
          className="border border-gray-300 py-1 px-2 cursor-pointer flex flex-col relative w-[220px] select-none"
          onMouseEnter={() => setIsSortOpen(true)}
          onMouseLeave={() => setIsSortOpen(false)}
        >
          <div className="flex flex-row items-center justify-between">
            {sortOptions[currentSelectedSort].name}
            <ChevronDown className="size-5" />
          </div>

          {isSortOpen && (
            <div className="absolute bottom-[-143px] left-0 bg-white border-gray-400 px-2 py-2 w-full shadow-md">
              {sortOptions.map((option) => (
                <p
                  key={option.id}
                  className={`cursor-pointer ${
                    currentSelectedSort === option.id ? "bg-gray-300 py-1.5 px-0.5" : "py-1.5 px-0.5"
                  }`}
                  onClick={() => {
                    console.log("clicked", option.id);
                    setCurrentSelectedSort(option.id);
                  }}
                >
                  {option.name}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {covers && (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-2 gap-y-3 w-full h-full">
          {covers.map((cover, index) => {
            const isLastIndex = index === covers.length - 1;
            console.log(cover.quantity)
            return Number(cover.quantity) > 0 ? (
              <PhoneCoverItem key={cover.id} cover={cover} mref={isLastIndex ? lastElementRef : null} />
            ) : (
              <OutOfOrderPhoneCase key={cover.id} cover={cover} mref={isLastIndex ? lastElementRef : null} />
            );
          })}
        </div>
      )}
    </WrappedContainer>
  );
};

export default PhoneCases;
