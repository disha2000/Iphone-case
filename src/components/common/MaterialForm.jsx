import { materialsConfig } from "@/utils/config";
import BoxOutline from "./BoxOutline";
const MateiralForm = ({ handleMaterialOnClick, selectedMaterial }) => {
    return (
      <div>
        <label className="font-medium text-sm text-gray-600 pt-4 ">
          Material
        </label>
        {materialsConfig.map((material, index) => {
          return (
            <BoxOutline
              title={material.title}
              price={material.price}
              description={material.description}
              key={index}
              index={index}
              selectedIndex={selectedMaterial}
              handleOnClick={handleMaterialOnClick}
            />
          );
        })}
      </div>
    );
  };

export default MateiralForm