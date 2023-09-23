"use client";

import Button from "@/components/Button";
import { createSupabaseClient } from "@/utils/client/supabase";
import { useState } from "react";

const Logout = () => {
  const supabase = createSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setIsLoading(false);
    window.location.replace("/");
  };

  return (
    <Button
      className="flex items-center"
      variant="outline"
      disabled={isLoading}
      onClick={handleClick}
    >
      Logout
    </Button>
  );
};

export default Logout;
