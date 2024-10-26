"use client";

import { authorize } from "@/lib/api";
import withAuth from "@/lib/withAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserRoleAndNavigate = async () => {
      try {
        const { user } = await authorize();
        if (user.role === "student") {
          router.push("/student/main-info");
        } else if (user.role === "teacher") {
          router.push("/teacher/main-info");
        } else if (user.role === "moderator") {
          router.push("/moderator/students");
        } else {
          router.push("/login");
        }
      } catch (error) {
        toast.error("Failed to authorize user");
      } finally {
        setLoading(false);
      }
    };

    checkUserRoleAndNavigate();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return null;
};

export default withAuth(page);
