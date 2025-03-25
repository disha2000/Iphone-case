import { OrbitProgress } from "react-loading-indicators";
import { useGetAllPhoneCoversQuery } from "../store/services/PhoneApi";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ImageURL } from "@/utils/config";

const CoverList = () => {
  const { data, error, isLoading, refetch } = useGetAllPhoneCoversQuery();
  useEffect(() => {
    refetch();
  }, []);
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
              return (
                <tr key={item.id}>
                  <td className="border-b-1 border-gray-200 text-center">
                    {index + 1}
                  </td>
                  <td className="border-b-1 border-gray-200 flex flex-col items-center py-2">
                    <img
                      src={`${ImageURL}${item.imageUrl}`}
                      className="h-[100px] w-[50px]"
                    />
                  </td>
                  <td className="border-b-1 border-gray-200 text-center">
                    <h1 className="font-normal">{item.name}</h1>
                  </td>
                  <td className="border-b-1 border-gray-200 text-center">
                    <p className="font-normal">${item.price}</p>
                  </td>
                  <td className="border-b-1 border-gray-200 text-center">
                    <p className="font-normal">${item.quantity}</p>
                  </td>
                  <td className="border-b-1 border-gray-200 text-center">
                    <Link
                      to={`/dashboard/newphonecover?edit=true&id=${item.id}`}
                    >
                      <Button className="mr-1.5 cursor-pointer">Edit</Button>
                    </Link>
                    <Button>Delete</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default CoverList;
