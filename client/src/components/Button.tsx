import { forwardRef } from "react";
import google from "../../public/google.svg";
import spotify from "../../public/spotify.svg";
import Image from "next/image";

type Props = JSX.IntrinsicElements["button"] & {
  variant?: "solid" | "gradient" | "outline";
  color?: "brand" | "complement";
  image?: "google" | "spotify";
};

const imageMap: Record<
  NonNullable<Props["image"]>,
  { src: any; alt: string }
> = {
  google: { src: google, alt: "Google Logo" },
  spotify: { src: spotify, alt: "Spotify Logo" },
};

const styles: Record<
  NonNullable<Props["color"]>,
  Record<NonNullable<Props["variant"]>, string>
> = {
  brand: {
    solid:
      "py-3 px-6 rounded-lg disabled:opacity-50 bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 disabled:bg-brand-200 disabled:text-brand-700",
    outline:
      "py-3 px-6 rounded-lg disabled:opacity-50 bg-white text-brand-700 border border-brand-700 hover:bg-brand-50 active:bg-brand-100 disabled:bg-white",
    gradient:
      "py-3 px-6 rounded-lg disabled:opacity-50 bg-gradient-to-br from-brand-400 to-brand-600 text-white hover:from-brand-500 hover:to-brand-700 active:from-brand-600 active:to-brand-800 disabled:from-brand-100 disabled:to-brand-300 disabled:text-brand-700",
  },
  complement: {
    solid:
      "py-3 px-6 rounded-lg disabled:opacity-50 bg-complement-500 text-white hover:bg-complement-600 active:bg-complement-700 disabled:bg-complement-200 disabled:text-complement-700",
    outline:
      "py-3 px-6 rounded-lg disabled:opacity-50 bg-white text-complement-700 border border-complement-700 hover:bg-complement-50 active:bg-complement-100 disabled:bg-white",
    gradient:
      "py-3 px-6 rounded-lg disabled:opacity-50 bg-gradient-to-br from-complement-400 to-complement-600 text-white hover:from-complement-500 hover:to-complement-700 active:from-complement-600 active:to-complement-800 disabled:from-complement-100 disabled:to-complement-300 disabled:text-complement-700",
  },
};

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      color = "brand",
      variant = "solid",
      className = "",
      image,
      children,
      ...rest
    }: Props,
    ref
  ) => {
    const renderImage = () => {
      const { src, alt } = imageMap[image!];
      return <Image src={src} alt={alt} className="inline w-8 mr-2" />;
    };

    return (
      <button
        className={`${styles[color][variant]} flex items-center ${className}`}
        {...rest}
        ref={ref}
      >
        {!!image && renderImage()}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
