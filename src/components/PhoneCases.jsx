import useInfiniteScroll from "@/customhooks/useInfiniteScroll";
import WrappedContainer from "./common/WrappedContainer";
import { OrbitProgress } from "react-loading-indicators";
import PhoneCoverItem from "./PhoneCoverItem";

const PhoneCases = () => {
  const [lastElementRef, covers, isLoading, error] = useInfiniteScroll();
  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <OrbitProgress color="white" size="small" text="" textColor="" />
      </div>
    );
  }
  if (error) {
    return <div className="w-full h-screen">{error.message}</div>;
  }
  return (
    <WrappedContainer className="mt-[55px] lg:px-[10%] md:px-[5%] px-[3%]">
      {covers && (
        <div className="grid lg:grid-cols-5  md:grid-cols-4  grid-cols-2 justify-between flex-wrap gap-x-2 gap-y-3 w-full h-full">
          {covers.map((cover, index) => {
            const isLastIndex = index === covers.length - 1;
            return (
              <PhoneCoverItem
                cover={cover}
                key={cover.id}
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
