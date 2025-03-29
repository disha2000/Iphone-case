import { useGetAllPhoneCoversQuery } from "../store/services/PhoneApi";
import { useState, useCallback, useRef, useEffect } from "react";

const useInfiniteScroll = () => {
  const [lastDoc, setLastDoc] = useState(null);
  const [covers, setCovers] = useState([]);
  const { data, error, isLoading, isSuccess, refetch } =
    useGetAllPhoneCoversQuery(lastDoc);
  const observerRef = useRef(null);

  useEffect(() => {
    if (isSuccess && data?.covers?.length) {
      setCovers((prevData) => {
        const mergedData = [...prevData, ...data.covers];
        return Array.from(
          new Map(mergedData.map((item) => [item.id, item])).values()
        );
      });
      setLastDoc((prevLastDoc) =>
        prevLastDoc?.id !== data.lastDoc?.id ? data.lastDoc : prevLastDoc
      );
    }
  }, [isSuccess, data?.covers]);

  const lastElementRef = useCallback(
    (node) => {
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
    },
    [data?.lastDoc]
  );

  return [lastElementRef, covers, isLoading, error];
};

export default useInfiniteScroll;
