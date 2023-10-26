import { z } from "zod";

// Source: https://github.com/colinhacks/zod/issues/53#issuecomment-1681090113
export type TypeToZod<T> = {
  [K in keyof T]: T[K] extends string | number | boolean | null | undefined
    ? undefined extends T[K]
      ? z.ZodOptional<z.ZodType<Exclude<T[K], undefined>>>
      : z.ZodType<T[K]>
    : z.ZodObject<TypeToZod<T[K]>>;
};
