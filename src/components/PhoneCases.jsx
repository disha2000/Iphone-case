import useInfiniteScroll from "@/customhooks/useInfiniteScroll";
import WrappedContainer from "./common/WrappedContainer";
import { OrbitProgress } from "react-loading-indicators";
import PhoneCoverItem from "./PhoneCoverItem";
import { outOfOrderPhoneCase } from "./hoc/outOfOrderPhoneCase";
import { useContext } from "react";
import sortContext from "./context/sortContext";
import { filterContext } from "./context/filterContext";
import FilterAndSort from "./common/FilterAndSort";

const PhoneCases = () => {
  const {sortIndex} = useContext(sortContext)
  const {isOutOfStockCheck} = useContext(filterContext)
  const [lastElementRef, covers, isLoading, error] = useInfiniteScroll(sortIndex, 15, 
    isOutOfStockCheck
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
      <FilterAndSort/>
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
