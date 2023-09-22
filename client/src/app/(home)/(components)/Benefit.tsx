import Image from "next/image";
import { type ReactNode } from "react";

type Props = {
  className?: string;
  imageSrc: any;
  imageAlt: string;
  title: string;
  description: ReactNode;
};

const Benefit = ({
  className = "",
  title,
  description,
  imageSrc,
  imageAlt,
}: Props) => {
  return (
    <div
      className={`flex-1 flex flex-col items-center justify-stretch text-center ${className}`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        className="w-20 md:w-32 mb-5 hover:scale-110 transition ease-in-out duration-300"
      />
      <h2 className="text-lg md:text-2xl font-bold text-brand">{title}</h2>
      <p className="text-md md:text-lg text-secondary">{description}</p>
    </div>
  );
};

export default Benefit;
