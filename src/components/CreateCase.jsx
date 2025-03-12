import React, { useCallback, useState, useEffect } from "react";
import { FileImage, SquareMousePointer } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { useUploadImageMutation } from "@/store/services/imageApi";
import { useSelector } from "react-redux";
import { OrbitProgress } from "react-loading-indicators";

const CreateCase = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [complete, setComplete] = useState(false);
  const navigate = useNavigate();
  const [uploadImage, { data, isError, isLoading, isSuccess, error }] =
    useUploadImageMutation();

  const progress = useSelector((store) => store.progress.progress);
  useEffect(() => {
    if (isSuccess) {
      setComplete(true);
      setTimeout(() => {
        navigate(`/configure/design/${data.public_id}`);
      }, 3000);
    }
  }, [isSuccess, data, navigate]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => toast("File reading was aborted");
        reader.onerror = () => toast("File reading has failed");

        reader.onload = async () => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "custom-cover");
          setFile(file.name);
          await uploadImage({ formData, endpoint: "image/upload" });
        };

        reader.readAsDataURL(file);
      });
    },
    [uploadImage]
  );

  const onDropRejected = useCallback((rejectedFiles) => {
    const [file] = rejectedFiles;

    toast(
      <div>
        <h1 className="text-red-500 text-sm">
          {file.type} type is not supported.
        </h1>
        <p className="text-red-500 text-xs">
          Please choose a PNG, JPG, or JPEG image instead.
        </p>
      </div>
    );
  }, []);

  if (isError) {
    toast(
      <div>
        <h1 className="text-red-500 text-sm">
          Image upload failed: {error?.message}
        </h1>
      </div>
    );
  }

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
        {!complete ? (
          <div className="flex flex-col justify-center items-center">
            <input {...getInputProps()} />

            {isDragOver && !isLoading && <SquareMousePointer />}
            {!isDragOver && !isLoading && <FileImage />}

            {!isDragOver && !isLoading && (
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

            {isLoading && (
              <div className="flex flex-col items-center">
                <OrbitProgress
                  color="#6366f1"
                  size="small"
                  text=""
                  textColor=""
                />

                <div className="my-2">Uploading ....</div>
                <Progress
                  className="w-[150px] !bg-gray-600] my-2"
                  value={progress}
                />
                <p className="text-sm font-bold">{file}</p>
              </div>
            )}

            {!isSuccess && <p className="text-xs">PNG, JPG, JPEG</p>}
          </div>
        ) : (
          <div className="text-sm h-full w-full flex flex-col justify-center items-center text-gray-600">
            <OrbitProgress color="#6366f1" size="small" text="" textColor="" />
            <p>Redirecting, Please wait....</p>
          </div>
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
