import { iphoneColorsConfig } from "@/utils/config";
import ModelDropDown from "./ModelDropDown";
import MateiralForm from "./MaterialForm";
import FinishinForm from "./FinishinForm";
import { Button } from "../ui/button";

const PhoneConfigurationPanel = ({
  customizeForm,
  handleColorChange,
  handleMaterialOnClick,
  handleFinishOnClick,
  saveConfig
}) => {
  return (
    <div className="w-full flex flex-col justify-between h-[37.5rem]">
      <div className="p-4">
        <h1 className="font-bold text-lg">Customize your case</h1>
        <div className="w-full border border-gray-200 my-2"></div>
      </div>

      <div className="px-4 h-[90%] overflow-y-auto">
        <div className="space-y-4 ">
          <p className="font-medium text-sm text-gray-600">
            Color: {iphoneColorsConfig[customizeForm.color].color}
          </p>
          <div className="colors-selection flex flex-row gap-2 py-2.5 px-1">
            {iphoneColorsConfig.map((color, index) => {
              return (
                <div
                  key={index}
                  className={`size-8 ${
                    color.className
                  } rounded-full cursor-pointer 
                ${
                  customizeForm.color === index
                    ? `outline-offset-2 outline-solid ${color.outline}`
                    : ""
                }`}
                  onClick={() => handleColorChange(index)}
                ></div>
              );
            })}
          </div>

          <div>
            <label className="font-medium text-sm text-gray-600">Model</label>
            <ModelDropDown />
          </div>

          <MateiralForm
            handleMaterialOnClick={handleMaterialOnClick}
            selectedMaterial={customizeForm?.material}
          />
          <FinishinForm
            handleFinishOnClick={handleFinishOnClick}
            selectedFinish={customizeForm?.finish}
          />
        </div>
      </div>
      <div className="final-price w-ful p-4">
        <div className="grid pt-2.5 grid-cols-[30%_70%] items-center">
          <p className="text-lg font-semibold">{"$19.00"}</p>
          <Button className="w-full text-sm bg-indigo-500" onClick={saveConfig}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhoneConfigurationPanel;
