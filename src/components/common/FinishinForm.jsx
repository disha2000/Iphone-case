import { finishesConfig } from "@/utils/config";
import BoxOutline from "./BoxOutline";
const FinishinForm = ({ handleFinishOnClick, selectedFinish }) => {
    return (
      <div>
        <label className="font-medium text-sm text-gray-600 pt-4">Finish</label>
        {finishesConfig.map((finish, index) => {
          return (
            <BoxOutline
              title={finish.title}
              price={finish.price}
              description={finish.description}
              key={index}
              index={index}
              selectedIndex={selectedFinish}
              handleOnClick={handleFinishOnClick}
            />
          );
        })}
      </div>
    );
  };
export default FinishinForm;