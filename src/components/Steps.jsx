import Step from "./Step";
import { stepsConfig } from "../utils/config";

const Steps = () => {
    return (
      <div className="flex flex-col md:flex-row w-full">
        {stepsConfig.map((step, index) => {
          return <Step key={index} step={step} index={index}/>;
        })}
      </div>
    );
  };

export default Steps;