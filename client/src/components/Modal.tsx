"use client";

import useOutsideClickCallback from "@/utils/client/useOutsideClickCallback";
import Image from "next/image";
import { useEffect, useRef, type PropsWithChildren } from "react";
import close from "../../public/close.svg";

type Props = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

const Modal = ({ isOpen, children, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClickCallback(ref, onClose);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 p-3 z-50">
      <div
        className="relative max-h-full w-full max-w-xl rounded-lg bg-white overflow-y-scroll no-scrollbar py-12 px-6"
        ref={ref}
      >
        <Image
          src={close}
          alt="close icon"
          className="absolute right-3 top-3 w-6 hover:cursor-pointer"
          onClick={onClose}
        />

        {children}
      </div>
    </div>
  );
};

export default Modal;
