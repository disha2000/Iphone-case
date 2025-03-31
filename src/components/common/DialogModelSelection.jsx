import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
    Dialog,
  } from "../ui/dialog";
  import { Button } from "../ui/button";
  import { ImageURL } from "@/utils/config";
  import ModelDropDown from "./ModelDropDown";
  import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
  import { useState } from "react";
  
  const DialogModelSelection = ({
    data,
    handleConfigOnClick,
    handleIncrement,
  }) => {
    const [open, setOpen] = useState(false); // Control dialog open state
    const { imageUrl, name } = data;
  
    return (
      <Dialog open={open} onOpenChange={setOpen}> {/* Controlled state for Dialog */}
        <DialogTrigger asChild>
          <div
            className="rounded-md w-[120px] h-[35px] float-end text-sm bg-white flex flex-row items-center cursor-pointer text-black border-1 border-gray-300 justify-center"
            onClick={() => setOpen(true)} // Open dialog when triggered
          >
            ADD TO CART
          </div>
        </DialogTrigger>
        <DialogContent
          className="lg:!w-[25%] sm:!w-[40%] w-[80%]"
          onClick={(e) => e.stopPropagation()} // Prevent closing on dialog content click
        >
          <VisuallyHidden>
            <DialogTitle>Set Model</DialogTitle>
          </VisuallyHidden>
          <DialogHeader>
            <div className="flex flex-row gap-x-1.5 items-center p-3">
              <img
                src={`${ImageURL}${imageUrl}`}
                alt="phone image"
                className="w-[55px] h-[70px]"
              />
              <p className="text-sm text-gray-700">{name}</p>
            </div>
          </DialogHeader>
          <div className="border-b-2 border-gray-300"></div>
          <div className="flex items-center space-x-2 z-10">
            <div className="grid flex-1 gap-2">
              <p className="font-medium text-sm">Select Model</p>
              <ModelDropDown
                handleConfigOnClick={handleConfigOnClick}
                setOpen={setOpen} // Pass setOpen here to control dialog state
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start z-0">
            <DialogClose asChild className="cursor-pointer">
              <Button
                type="button"
                className="w-full rounded-md float-end text-sm bg-indigo-500 flex flex-row items-center cursor-pointer text-white border-1 justify-center hover:bg-indigo-500"
                onClick={handleIncrement}
              >
                DONE
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default DialogModelSelection;
  