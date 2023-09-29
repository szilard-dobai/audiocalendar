"use client";

import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import Loader from "./Loader";

type Props = { className?: string };

const GlobalLoader = ({ className = "" }: Props) => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  if (!isFetching && !isMutating) {
    return null;
  }

  return <Loader />;
};

export default GlobalLoader;
