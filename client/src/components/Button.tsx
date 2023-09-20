import React from "react";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant: "solid" | "gradient" | "outline";
};

const styles: Record<Props["variant"], string> = {
  solid:
    "py-3 px-6 rounded-lg disabled:opacity-50 bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 disabled:bg-brand-200 disabled:text-brand-700",
  outline:
    "py-3 px-6 rounded-lg disabled:opacity-50 bg-white text-brand-700 border border-brand-700 hover:bg-brand-50 active:bg-brand-100 disabled:bg-white",
  gradient:
    "py-3 px-6 rounded-lg disabled:opacity-50 bg-gradient-to-br from-brand-400 to-brand-600 text-white hover:from-brand-500 hover:to-brand-700 active:from-brand-600 active:to-brand-800 disabled:from-brand-100 disabled:to-brand-300 disabled:text-brand-700",
};

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ variant, className = "", ...rest }: Props, ref) => (
    <button className={`${styles[variant]} ${className}`} {...rest} ref={ref} />
  )
);
Button.displayName = "Button";

export default Button;
