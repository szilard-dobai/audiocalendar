import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}>;

const HeadingMap: Record<
  Props["level"],
  { Tag: keyof JSX.IntrinsicElements; style: string }
> = {
  1: {
    Tag: "h1",
    style: "text-5xl font-extrabold",
  },
  2: {
    Tag: "h2",
    style: "text-4xl font-bold",
  },
  3: {
    Tag: "h3",
    style: "text-3xl font-bold",
  },
  4: {
    Tag: "h4",
    style: "text-2xl font-bold",
  },
  5: {
    Tag: "h5",
    style: "text-xl font-medium",
  },
  6: {
    Tag: "h6",
    style: "text-lg font-medium",
  },
};

const Heading = ({ level, className = "", children }: Props) => {
  const { Tag, style } = HeadingMap[level];

  return <Tag className={`${style} ${className}`}>{children}</Tag>;
};

export default Heading;
