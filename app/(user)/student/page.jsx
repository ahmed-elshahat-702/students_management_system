"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import withAuth from "@/lib/withAuth";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    const redirect = () => {
      toast.loading("Loading...");
      router.push("/student/main-info");
      toast.dismiss();
    };

    redirect();
  }, [router]);

  return null;
};

export default withAuth(page);
