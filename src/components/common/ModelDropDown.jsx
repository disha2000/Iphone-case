import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mobileListConfig } from "@/utils/config";

export default function ModelDropDown({ handleConfigOnClick, className, seletedModel }) {
  const [checked, setChecked] = useState(seletedModel || 0);
  const handleOnChange = (index,e) => {
    setChecked(index);
    handleConfigOnClick(index, "model",e);
  };
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="my-1.5">
        <div
          variant="outline"
          className={
            "border-1 py-1.5 px-3  cursor-pointer text-sm rounded-sm hover:outline hover:outline-indigo-500" +
            className
          }
        >
          {mobileListConfig[checked].value}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-sm" >
        {mobileListConfig.map((phone, index) => (
          <DropdownMenuCheckboxItem
            key={index}
            checked={checked === index}
            onCheckedChange={() => handleOnChange(index)}
          >
            {phone.value}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
