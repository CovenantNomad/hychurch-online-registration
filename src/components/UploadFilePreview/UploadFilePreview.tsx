import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";

type UploadFilePreviewProps = {
  src: string
  alt: string
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
  setSelectedFile: Dispatch<SetStateAction<File | null>>
  setImagePreview: Dispatch<SetStateAction<string>>
}

const UploadFilePreview = ({src, alt, aspectRatio, width, height, setSelectedFile, setImagePreview}: UploadFilePreviewProps) => {
  
  const onCancelHandler = () => {
    setSelectedFile(null)
    setImagePreview("")
  }

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "object-cover transition-all hover:scale-105",
          aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
        )}
      />
      <div className="mt-4 text-end">
        <Button variant={"outline"} onClick={onCancelHandler}>삭제</Button>
      </div>
    </>
  );
};

export default UploadFilePreview;
