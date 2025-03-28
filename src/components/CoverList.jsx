import { OrbitProgress } from "react-loading-indicators";
import { useGetAllPhoneCoversQuery } from "../store/services/PhoneApi";
import { useCallback, useEffect, useRef, useState } from "react";
import CoverItem from "./CoverItem";

const CoverList = () => {
  const [lastDoc, setLastDoc] = useState(null)
  const [covers, setCovers] = useState([])
  const { data, error, isLoading, isSuccess, refetch } =
    useGetAllPhoneCoversQuery(lastDoc);
  const observerRef = useRef(null);
 
  useEffect(() => {
    if (isSuccess && data?.covers?.length) {  
      setCovers((prevData) => {
        const mergedData = [...prevData, ...data.covers];
        return Array.from(new Map(mergedData.map((item) => [item.id, item])).values());
      });
      setLastDoc((prevLastDoc) => (prevLastDoc?.id !== data.lastDoc?.id ? data.lastDoc : prevLastDoc));
    }
  }, [isSuccess, data?.covers]); 

  const lastElementRef = useCallback((node) => {
    if (isLoading) return;
  
    if (observerRef.current) observerRef.current.disconnect();
  
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {  
        if (data?.lastDoc) {
          setLastDoc(data.lastDoc); 
        }
        refetch();
      }
    });
    if (node) observerRef.current.observe(node);
  }, [data?.lastDoc]);
  
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
    <div className="lg:px-[10%] md:px-[5%] px-[3%] mt-8 overflow-x-auto">
      {covers && (
        <table className="w-full border-collapse  shadow-2xs">
          <thead className="border-b-2">
            <tr className="text-left">
              <th className="p-3">INDEX</th>
              <th className="p-3">COVER IMAGE</th>
              <th className="p-3 w-[200px]">NAME</th>
              <th className="p-3">PRICE</th>
              <th className="p-3">QUANTITY</th>
              <th className="p-3">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {covers.map((item, index) => {
              const isLastItem = index === covers.length - 1;

              return (
                <CoverItem
                  key={item.id}
                  item={item}
                  index={index}
                  mref={isLastItem ? lastElementRef : null}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default CoverList;
