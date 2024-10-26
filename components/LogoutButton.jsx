"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { logout } from "@/lib/api";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const LogoutButton = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    toast.loading("Logging You Out...");
    setLoading(true);
    try {
      await logout();
      sessionStorage.removeItem("was authorized");
      toast.dismiss();
      toast.success("Logged Out Successfully");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.dismiss();
      toast.error("Failed to log out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  ) : (
    <Button
      variant="destructive"
      className={`bg-red-600 text-white hover:bg-red-700 rounded w-full`}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
