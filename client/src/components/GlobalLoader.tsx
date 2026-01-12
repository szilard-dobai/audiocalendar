"use client";

import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import Loader from "./Loader";

const GlobalLoader = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  if (!isFetching && !isMutating) {
    return null;
  }

  return <Loader />;
};

export default GlobalLoader;
