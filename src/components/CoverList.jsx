import { OrbitProgress } from "react-loading-indicators";
import { useGetAllPhoneCoversQuery } from "../store/services/PhoneApi";
import { useEffect } from "react";
import CoverItem from "./CoverItem";

const CoverList = () => {
  const { data, error, isLoading, refetch } = useGetAllPhoneCoversQuery();
  useEffect(() => {
    refetch();
  }, [data]);
  if (isLoading) {
    return (
      <div className="w-full h-full">
        <OrbitProgress color="white" size="small" text="" textColor="" />
      </div>
    );
  }
  if (error) {
    return <div className="w-full h-full">{error.message}</div>;
  }

  return (
    <div className="lg:px-[10%] md:px-[5%] px-[3%] mt-[30px] h-full">
      {data && (
        <table className="table-fixed w-full">
          <thead>
            <tr>
              <th>Index</th>
              <th>Cover Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return <CoverItem item={item} index={index} key={item.id} />;
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default CoverList;
