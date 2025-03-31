import { useState } from "react";
import { sortOptions } from "@/utils/config";
import { ChevronDown, Plus, SlidersHorizontal } from "lucide-react";
import { useContext } from "react";
import sortContext from "../context/sortContext";
import { filterContext } from "../context/filterContext";


const FilterAndSort = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const {sortIndex, setCurrentSelectedSort} = useContext(sortContext)
  const {isOutOfStockCheck, setIsInStockCheck} = useContext(filterContext)
  return (
    <div>
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
                    checked={isOutOfStockCheck}
                    onChange={() =>
                      setIsInStockCheck((prevState) => !prevState)
                    }
                  />
                  <label className="pl-2">In Stock (Availability)</label>
                </div>
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
            {sortOptions[sortIndex].name}
            <ChevronDown className="size-5" />
          </div>

          {isSortOpen && (
            <div className="absolute bottom-[-143px] left-0 bg-white border-gray-400 px-2 py-2 w-full shadow-md">
              {sortOptions.map((option) => (
                <p
                  key={option.id}
                  className={`cursor-pointer ${
                    sortIndex === option.id
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
        {isOutOfStockCheck && (
          <div className="bg-gray-200 p-1.5 px-2 relative flex flex-row items-center">
            <span>Is Stock</span>
            <Plus
              className="size-4 rotate-[315deg] cursor-pointer"
              onClick={() => setIsInStockCheck(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default FilterAndSort;
