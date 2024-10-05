"use client";

import { authorize } from "@/lib/api";
import withAuth from "@/lib/withAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const router = useRouter();
  async function checkUserRoleAndNavigate() {
    const { user } = await authorize();
    user.role === "student" && router.push("/student/main-info");
    user.role === "teacher" && router.push("/teacher/main-info");
    user.role === "moderator" && router.push("/moderator/students");
  }

  useEffect(() => {
    checkUserRoleAndNavigate();
  }, []);
};

export default withAuth(page);
