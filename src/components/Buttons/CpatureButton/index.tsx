'use client'

import { MutableRefObject } from "react";
import { Button } from "../../ui/button";
import html2canvas from 'html2canvas';

type CpatureButtonProps = {
  componentRef: MutableRefObject<HTMLDivElement | null>
  name: string
}

const CpatureButton = ({componentRef, name}: CpatureButtonProps) => {

  const onCaptureHandler = async (componentRef: MutableRefObject<HTMLDivElement | null>) => {
    if (!componentRef.current) return;

    const canvas = await html2canvas(componentRef.current);
    const image = canvas.toDataURL('image/png'); // 이미지로 변환 (base64 형식)

    // 이미지를 저장하거나 다른 작업을 수행할 수 있음
    // 예: 이미지 다운로드
    const link = document.createElement('a');
    link.href = image;
    link.download = `${name}_정보카드.png`;
    link.click();
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="hidden h-8 lg:flex"
      onClick={() => onCaptureHandler(componentRef)}
    >
      화면캡쳐
    </Button>
  );
};

export default CpatureButton;
