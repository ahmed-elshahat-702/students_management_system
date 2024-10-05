"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { logout } from "@/lib/api";

const LogoutButton = ({ className }) => {
  const Router = useRouter();

  return (
    <Button
      variant="destructive"
      className={`bg-red-600 text-white hover:bg-red-800 rounded ${className}`}
      onClick={async () => {
        toast.loading("Logging You Out....");
        try {
          await logout();
          Router.push("/login");
          sessionStorage.removeItem("was authorized");
          toast.dismiss();
          toast.success("Logged Out Successfully");
        } catch (error) {
          console.error("Error fetching dashboard data", error);
        }
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
