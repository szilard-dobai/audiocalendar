"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";

type Props = {
  className?: string;
  term: string;
  description: ReactNode;
};

const CollapsibleDefinition = ({
  className = "",
  term,
  description,
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const collapsibleRef = useRef<HTMLElement>(null);

  const collapsibleStyle: CSSProperties = isCollapsed
    ? { opacity: "0", maxHeight: "0px" }
    : {
        opacity: "100",
        maxHeight: collapsibleRef.current?.scrollHeight + "px",
        marginTop: "0.75rem",
      };

  return (
    <div
      className={`text-left select-none cursor-pointer p-4 rounded-lg border-4 ${
        isCollapsed ? "border-brand" : "border-complement bg-complement-50"
      } transition-all duration-300 ease-in-out ${className}`}
      onClick={() => setIsCollapsed((previous) => !previous)}
    >
      <div
        className={`flex justify-between items-center gap-3 font-semibold text-lg ${
          isCollapsed ? "text-brand-700" : "text-complement-700"
        }`}
      >
        <dt>{term}</dt>
        {isCollapsed ? (
          <span aria-label="down pointing triangle">▼</span>
        ) : (
          <span aria-label="up pointing triangle">▲</span>
        )}
      </div>

      <dd
        ref={collapsibleRef}
        className={`overflow-hidden max-h-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? "text-brand-800" : "text-complement-800"
        }`}
        style={collapsibleStyle}
      >
        {description}
      </dd>
    </div>
  );
};

export default CollapsibleDefinition;
