import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Loader from "./Notifications/Loader";
import { uploadImageservice } from "../Redux/APIs/ImageUploadService";

function Uploder({ setImageUrl }) {
  const [loading, setLoading] = useState(false);

  // upload file
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = new FormData();
      file.append("file", acceptedFiles[0]);
      const data = await uploadImageservice(file, setLoading);
      setImageUrl(data);
    },
    [setImageUrl]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      multiple: false,
      onDrop,
    });
  return (
    <div className="w-full text-center flex-colo gap-6">
      {loading ? (
        <div className="px-6 w-full py-8 border-2 border-border border-dashed bg-dry rounded-md">
          <Loader />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="px-6 w-full py-8 border-2 border-border border-dashed bg-main rounded-md cursor-pointer"
        >
          <input {...getInputProps()} />
          <span className="mx-auto flex-colo text-subMain text-3xl">
            <FiUploadCloud />
          </span>
          <p className="text-sm mt-2">Add Image Here</p>
          <em className="text-xs text-border">
            {isDragActive
              ? "Drop the image"
              : isDragReject
              ? "Unsupported file type..."
              : "Add Image"}
          </em>
        </div>
      )}
    </div>
  );
}

export default Uploder;
