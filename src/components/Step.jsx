import { activeTab } from "./context/activateTab";
import { useContext } from "react";
const Step = ({ step, index }) => {
  const { active } = useContext(activeTab);
  return (
    <div
      className={`border-1 border-gray-200 md:border-b-3 md:border-b-gray-300 md:border-l-1 border-l-3 border-l-gray-200 py-5 ${
        active === index
          ? "border-l-gray-500 md:border-b-gray-500 "
          : "border-l-gray-200 md:border-b-gray-200"
      } md:border-l-gray-200 border-t-0 p-3 w-full`}
    >
      <div className="flex flex-row gap-3.5  items-center h-full">
        <img className="size-10" src={step.image} />
        <div className="my-auto">
          <h1 className="text-sm font-extrabold">Step {index + 1}:</h1>
          <p className="text-[13px] font-medium text-gray-600">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Step;
