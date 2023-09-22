import type { ReactNode } from "react";

type Props = {
  id?: string;
  title: string;
  className?: string;
  description: string;
  content: ReactNode;
};

const Card = ({ id, title, description, content, className = "" }: Props) => (
  <section
    id={id}
    className={`my-20 md:my-36 text-center bg-brand-50  px-8 py-16 rounded-lg ${className}`}
  >
    <hgroup className="mb-14">
      <h2 className="text-3xl md:text-5xl font-bold text-brand mb-2">
        {title}
      </h2>
      <p className="text-md md:text-xl text-secondary">{description}</p>
    </hgroup>

    {content}
  </section>
);

export default Card;
