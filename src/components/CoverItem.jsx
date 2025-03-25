import { ImageURL } from "@/utils/config";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useDeletePhoneCoverMutation } from "@/store/services/PhoneApi";
import { OrbitProgress } from "react-loading-indicators";
const CoverItem = ({ item, index }) => {
  const [deletePhoneCover, {isLoading}] = useDeletePhoneCoverMutation();
  const deleteCover = async () => {
    await deletePhoneCover(item.id);

  };
  return (
    <tr>
      <td className="border-b-1 border-gray-200 text-center">{index + 1}</td>
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
        <Link to={`/dashboard/newphonecover?edit=true&id=${item.id}`}>
          <Button className="mr-1.5 cursor-pointer">Edit</Button>
        </Link>
        <Button className="cursor-pointer" onClick={deleteCover}>Delete {isLoading && <OrbitProgress size="small"/>}</Button>
      </td>
    </tr>
  );
};
export default CoverItem;
