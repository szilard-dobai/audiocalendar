"use client";

import Button from "@/components/Button";
import useLogout from "@/hooks/useLogout";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
};

const Logout = ({ className = "" }: Props) => {
  const router = useRouter();
  const { mutateAsync: logout, isLoading } = useLogout();

  const handleClick = async () => {
    await logout();
    router.push("/");
  };

  return (
    <Button
      className={`${className} flex items-center`}
      variant="outline"
      disabled={isLoading}
      onClick={handleClick}
    >
      Logout
    </Button>
  );
};

export default Logout;
