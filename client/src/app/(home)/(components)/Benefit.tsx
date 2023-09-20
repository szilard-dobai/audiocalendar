import Image from "next/image";

type Props = {
  className?: string;
  imageSrc: any;
  imageAlt: string;
  title: string;
  description: string;
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
        className="w-32 mb-5 hover:scale-110 transition ease-in-out duration-300"
      />
      <h2 className="text-2xl font-bold text-[#2f2e41]">{title}</h2>
      <p className="text-lg text-secondary">{description}</p>
    </div>
  );
};

export default Benefit;
