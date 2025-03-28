import { ImageURL } from "@/utils/config";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useDeletePhoneCoverMutation } from "@/store/services/PhoneApi";
import { OrbitProgress } from "react-loading-indicators";
const CoverItem = ({ item, index, mref }) => {
  const [deletePhoneCover, { isLoading }] = useDeletePhoneCoverMutation();
  const deleteCover = async () => {
    await deletePhoneCover(item.id);
  };
  return (
    <tr className="border-b-2 text-gray-600 font-normal" ref={mref}>
      <td className="p-3">#{index + 1}</td>
      <td className="p-3">
        <img
          src={`${ImageURL}${item.imageUrl}`}
          className="h-[100px] w-[50px] object-cover rounded-md shadow-md"
        />
      </td>
      <td className="p-3">
        <h1>{item.name}</h1>
      </td>
      <td className="p-3">${item.price}</td>
      <td className="p-3">{item.quantity}</td>
      <td className="p-3 space-x-2">
        <Link to={`/dashboard/newphonecover?edit=true&id=${item.id}`}>
          <Button className="cursor-pointer bg-white text-gray-600 border border-gray-600 hover:bg-gray-100 transition">
            Edit
          </Button>
        </Link>
        <Button
          className="cursor-pointer bg-white text-gray-600 border border-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
          onClick={deleteCover}
          disabled={isLoading}
        >
          Delete
          {isLoading && <OrbitProgress size="small" />}
        </Button>
      </td>
    </tr>
  );
};
export default CoverItem;
