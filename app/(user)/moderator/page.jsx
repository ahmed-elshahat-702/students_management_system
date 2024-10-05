"use client";

import { useEffect } from "react";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import withAuth from "@/lib/withAuth";

const page = () => {
  const Router = useRouter();

  useEffect(() => {
    toast.loading("Loading...");
    Router.push(`/moderator/students`);
    toast.dismiss();
  }, []);
};

export default withAuth(page);
