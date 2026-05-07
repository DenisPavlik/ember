"use client";

import { uploadToS3 } from "@/actions/uploadActions";
import {
  faCircleNotch,
  faPencil,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useRef, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  onUploadComplete: (url: string) => void;
  onRemove?: () => void;
  hasValue?: boolean;
};

export default function UploadButton({
  onUploadComplete,
  onRemove,
  hasValue,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(ev: ChangeEvent<HTMLInputElement>) {
    const file = ev.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const result = await uploadToS3(formData);
      onUploadComplete(result.url);
      toast.success("Image uploaded");
    } catch (e: any) {
      toast.error(e.message || "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex items-center gap-1">
      <label
        className={`bg-white shadow-sm shadow-black/30 px-1.5 py-1 rounded-lg
        ${uploading ? "cursor-wait opacity-70" : "cursor-pointer"}`}
        aria-busy={uploading}
        aria-label={uploading ? "Uploading image" : "Upload image"}
      >
        <FontAwesomeIcon
          icon={uploading ? faCircleNotch : faPencil}
          className={uploading ? "animate-spin" : ""}
        />
        <input
          ref={inputRef}
          className="hidden"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          disabled={uploading}
          onChange={upload}
        />
      </label>
      {hasValue && onRemove && !uploading && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove image"
          className="bg-white shadow-sm shadow-black/30 px-1.5 py-1 rounded-lg
          text-red-500 hover:text-red-600"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      )}
    </div>
  );
}
