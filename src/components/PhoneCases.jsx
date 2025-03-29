import useInfiniteScroll from "@/customhooks/useInfiniteScroll";
import WrappedContainer from "./common/WrappedContainer";
import { OrbitProgress } from "react-loading-indicators";
import PhoneCoverItem from "./PhoneCoverItem";
import { ChevronDown, Plus, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { sortOptions } from "@/utils/config";
import { outOfOrderPhoneCase } from "./hoc/outOfOrderPhoneCase";

const PhoneCases = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isInStockCheck, setIsInStockCheck] = useState(false);
  // const [price, setPrice] = useState({
  //   to: "",
  //   from: "",
  // });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentSelectedSort, setCurrentSelectedSort] = useState(0);
  const [lastElementRef, covers, isLoading, error] = useInfiniteScroll(
    currentSelectedSort,
    15,
    {
      isInStockCheck,
      // price
    }
  );

  const OutOfOrderPhoneCase = outOfOrderPhoneCase(PhoneCoverItem);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <OrbitProgress color="white" size="small" text="" textColor="" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        {error.message}
      </div>
    );
  }

  return (
    <WrappedContainer className="mt-[55px] lg:px-[10%] md:px-[5%] px-[3%]">
      <div className="configure_options py-5 text-gray-600 flex flex-row justify-between text-sm">
        <div
          className="relative z-20"
          onMouseEnter={() => setIsFilterOpen(true)}
          onMouseLeave={() => setIsFilterOpen(false)}
        >
          <span className="cursor-pointer">
            <SlidersHorizontal className="inline-block size-5" />
            <span className="pl-1">FILTER</span>
            {isFilterOpen && (
              <div className="bg-white border-1 border-gray-200 w-[200px] h-[70px] absolute px-2 py-3 shadow-md">
                <div className="mb-3 flex flex-row">
                  <input
                    type="checkbox"
                    checked={isInStockCheck}
                    onChange={() =>
                      setIsInStockCheck((prevState) => !prevState)
                    }
                  />
                  <label className="pl-2">In Stock (Availability)</label>
                </div>
                {/* <div className="flex flex-row justify-between items-center">
                  <span>Price:</span>
                  <input
                    placeholder="From"
                    value={price.from}
                    onChange={(e) =>
                      setPrice((prevPrice) => ({
                        ...prevPrice,
                        from: e.target.value,
                      }))
                    }
                    className="w-[60px] border-1 h-[30px] text-center"
                  />
                  <input
                    placeholder="To"
                    value={price.to}
                    onChange={(e) =>
                      setPrice((prevPrice) => ({
                        ...prevPrice,
                        to: e.target.value,
                      }))
                    }
                    className="w-[60px] border-1 h-[30px] text-center"
                  />
                </div> */}
              </div>
            )}
          </span>
        </div>

        <div
          className="border border-gray-300 py-1 px-2 cursor-pointer flex flex-col relative w-[220px] select-none h-[30px] z-20"
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
                    currentSelectedSort === option.id
                      ? "bg-gray-300 py-1.5 px-0.5"
                      : "py-1.5 px-0.5"
                  }`}
                  onClick={() => {
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
      <div className="flex flex-row gap-x-2 text-sm z-10">
        {isInStockCheck && (
          <div className="bg-gray-200 p-1.5 px-2 relative flex flex-row items-center">
            <span>Is Stock</span>
            <Plus className="size-4 rotate-[315deg] cursor-pointer"  onClick={() => setIsInStockCheck(false)}/>
          </div>
        )}
        {/* {price.from && price.to && (
          <div className="bg-gray-200 p-1.5 px-1 flex flex-row items-center cursor-pointer">
            <span>{`Price${price.from} between ${price.to}`}</span>
            <Plus className="size-4 rotate-[315deg]" onClick={() => setPrice({from:"", to:""})}/>
          </div>
        )} */}
      </div>

      {covers && (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-2 gap-y-3 w-full h-full">
          {covers.map((cover, index) => {
            const isLastIndex = index === covers.length - 1;
            return Number(cover.quantity) > 0 ? (
              <PhoneCoverItem
                key={cover.id}
                cover={cover}
                mref={isLastIndex ? lastElementRef : null}
              />
            ) : (
              <OutOfOrderPhoneCase
                key={cover.id}
                cover={cover}
                mref={isLastIndex ? lastElementRef : null}
              />
            );
          })}
        </div>
      )}
    </WrappedContainer>
  );
};

export default PhoneCases;
