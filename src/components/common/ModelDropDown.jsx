import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mobileListConfig = [
  { value: "iPhone X" },
  { value: "iPhone 11" },
  { value: "iPhone 12" },
];

export default function ModelDropDown() {
  const [checked, setChecked] = useState(0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="my-1.5">
        <div variant="outline" className="border-1 py-1.5 px-3 mx-1 cursor-pointer text-sm rounded-sm hover:outline hover:outline-indigo-500">
          {mobileListConfig[checked].value}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-sm">
        {mobileListConfig.map((phone, index) => (
          <DropdownMenuCheckboxItem
            key={index}
            checked={checked === index}
            onCheckedChange={() => setChecked(index)}
          >
            {phone.value}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
