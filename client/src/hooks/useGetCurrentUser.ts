import {
  GetCurrentUserOutput,
  type CurrentUser,
} from "@/app/account/me/schema";
import { useQuery } from "@tanstack/react-query";
import QueryKeys from "./queryKeys";

const useGetCurrentUser = (initialData: CurrentUser) =>
  useQuery<CurrentUser>({
    queryFn: async () => {
      const response = await fetch("/account/me", { method: "GET" });
      const body = GetCurrentUserOutput.parse(await response.json());

      if ("error" in body) {
        throw body.error;
      }
      return body;
    },
    queryKey: QueryKeys.currentUser(),
    initialData,
  });

export default useGetCurrentUser;
