import React from "react";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  error?: string;
  label?: string;
};

const TextInput = ({ id, error, label, className = "", ...rest }: Props) => {
  return (
    <div className={className}>
      <label
        className="block uppercase tracking-wide text-primary text-xs font-bold mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`appearance-none border-2 text-sm w-full ${
          error
            ? "text-rose-500 border-rose-500"
            : "text-primary border-gray-200"
        } rounded-lg py-2 px-4 leading-tight focus:outline-none focus:border-brand`}
        id={id}
        {...rest}
      />
      {error && <p className="text-rose-500 text-xs italic">{error}</p>}
    </div>
  );
};

export default TextInput;
