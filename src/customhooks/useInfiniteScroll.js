import { useGetAllPhoneCoversQuery } from "../store/services/PhoneApi";
import { useState, useCallback, useRef, useEffect } from "react";
import { sortOptions } from "@/utils/config";

const useInfiniteScroll = (id, pageSize, filterOptions) => {
  const [lastDoc, setLastDoc] = useState(null);
  const [covers, setCovers] = useState([]);
  const observerRef = useRef(null);

  const { data, error, isLoading, isSuccess, refetch } =
    useGetAllPhoneCoversQuery({ lastDoc, sortObj: sortOptions[id], page_size:pageSize, filterOptions});

  useEffect(() => {
    setLastDoc(null);
    setCovers([]);
  }, [id]);

  useEffect(() => {
    if (isSuccess && data?.covers?.length) {
      setCovers((prevData) => {
        const mergedData = [...prevData, ...data.covers];
        return Array.from(new Map(mergedData.map((item) => [item.id, item])).values());
      });

      setLastDoc((prevLastDoc) =>
        prevLastDoc?.id !== data.lastDoc?.id ? data.lastDoc : prevLastDoc
      );
    }
  }, [isSuccess, data?.lastDoc]);

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading || !data?.lastDoc) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          refetch();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [data?.lastDoc, isLoading]
  );

  return [lastElementRef, covers, isLoading, error];
};

export default useInfiniteScroll;
