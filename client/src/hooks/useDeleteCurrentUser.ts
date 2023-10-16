import { DeleteCurrentUserOutput } from "@/app/account/delete/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useDeleteCurrentUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<boolean, string>({
    mutationFn: async () => {
      const response = await fetch("/account/delete", { method: "DELETE" });
      const body = DeleteCurrentUserOutput.parse(await response.json());

      if (typeof body !== "boolean") {
        throw body.error;
      }
      return body;
    },
    retry: 0,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ refetchType: "none" });
      router.push("/");
    },
  });
};

export default useDeleteCurrentUser;
