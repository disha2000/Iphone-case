import React, { useCallback, useState } from "react";
import { FileImage, SquareMousePointer } from "lucide-react";
import { toast } from "sonner";

import { useDropzone } from "react-dropzone";
const CreateCase = () => {

  const [isDragOver, setIsDragOver] = useState(false)
  const onDrop = useCallback((acceptedFiles) => {
    setIsDragOver(false)
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const onDropRejected = useCallback((rejectedFiles) => {
    console.log("rejected", rejectedFiles);
    const [file] = rejectedFiles;

    toast(
      <div>
        <h1 className="text-red-500 text-sm">
          ${file.file.type} type is not supported.
        </h1>
        <p className="text-red-500 text-xs">
          Please choose a PNG, JPG, or JPEG image instead.
        </p>
      </div>
    );
  }, []);

  const onDragOver = useCallback(() => { setIsDragOver(true)}, [])
  const onDragLeave = useCallback(() => { setIsDragOver(false)}, [])

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    onDrop: onDrop,
    multiple: false,
    onDropRejected: onDropRejected,
    onDragOver: onDragOver,
    onDragLeave: onDragLeave
  });

  return (
    <div className="lg:px-[10%] md:px-[5%] px-[3%] mt-[57px] h-screen">
      <div
        className="bg-linear-to-r/srgb from-slate-100 to-slate-200 h-[70%] m-10 px-8 flex flex-col items-center justify-center text-center"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {
            isDragOver ? <SquareMousePointer /> : <FileImage />
        }
        {
            !isDragOver ?  ( <p>
                <span className="font-bold">Click to upload</span> or drag and drop
              </p>): (<p>
                <span className="font-bold">Drop file</span> to upload
              </p>)
        }
        <p className="text-sm">PNG, JPG, JPEG</p>
      </div>
    </div>
  );
};

export default CreateCase;
