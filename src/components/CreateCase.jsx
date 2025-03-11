import React, { useCallback, useState, useTransition } from "react";
import { FileImage, SquareMousePointer } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDropzone } from "react-dropzone";
const CreateCase = () => {
  const [progress, setProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  console.log(progress);
  const [isPending, startTransition] = useTransition();

  const onDrop = useCallback((acceptedFiles) => {
    console.log("Files received:", acceptedFiles);

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("File reading was aborted");
      reader.onerror = () => console.log("File reading has failed");

      reader.onload = async () => {
        console.log("File read successfully");
        setIsUpload(true);
        setIsDragOver(false);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "custom-cover");
        try {
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/do2lx5yjd/image/upload",
            formData,
            {
              onUploadProgress: async (progressEvent) => {
                console.log(progress);

                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setTimeout(() => setProgress(percentCompleted), 3000);
              },
            }
          );
          startTransition(() => {
            navigate(`/configure/design/${response.data.public_id}`);
          });
          setIsUpload(false);

          setFile(file?.handle?.name);
          console.log("Upload successful:", response.data);
        } catch (error) {
          setIsUpload(false);
          toast(
            <div>
              <h1 className="text-red-500 text-sm">
                Image upload failed: {error.message}
              </h1>
            </div>
          );
        }
      };

      reader.readAsDataURL(file);
    });
  }, []);

  const onDropRejected = useCallback((rejectedFiles) => {
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

  const onDragEnter = useCallback(() => {
    setIsDragOver(true);
  }, []);
  const onDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
    onDrop: onDrop,
    multiple: false,
    onDropRejected: onDropRejected,
    onDragEnter: onDragEnter,
    onDragLeave: onDragLeave,
  });

  return (
    <div className="h-screen">
      <div
        className="bg-linear-to-r/srgb from-slate-50 to-slate-100 h-[70%] my-10 flex flex-col items-center justify-center rounded-4xl border-1"
        {...getRootProps()}
      >
        {!isPending ? (
          <div className="flex justify-center flex-col items-center">
            <input {...getInputProps()} />
            {isDragOver ? <SquareMousePointer /> : <FileImage />}

            {!isDragOver && !isUpload && (
              <p>
                <span className="font-bold">Click to upload</span> or drag and
                drop
              </p>
            )}
            {isDragOver && (
              <p>
                <span className="font-bold">Drop file</span> to upload
              </p>
            )}
            {isUpload && <Progress className="w-[150px]" value={progress} />}
            {isUpload && (
              <div>
                <div className="py-3.5">Uploading ....</div>
                <p>{file}</p>
              </div>
            )}
            <p className="text-xs">PNG, JPG, JPEG</p>
          </div>
        ) : (
          <p className="text-sm h-full text-center">Redirecting, Please wait</p>
        )}
      </div>
    </div>
  );
};

export default CreateCase;

/*
isDragOver
isUpload

!isDragOver -> click to upload 
isDragOver -> drop file


!isDragOver and !isUpload  click to upload
isDragOver drop file
isUpload uploading 
progress 100 redirecting 

*/
