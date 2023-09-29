"use client";

import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";

type Props = { className?: string };

const GlobalLoader = ({ className = "" }: Props) => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  if (!isFetching && !isMutating) {
    return null;
  }

  return <BeatLoader size="0.5rem" color="#6c63ff" />;
};

export default GlobalLoader;
