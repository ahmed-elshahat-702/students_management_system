"use client";

import StudentInfo from "@/components/StudentInfo";
import { Skeleton } from "@/components/ui/skeleton";
import { authorize, getStudent } from "@/lib/api";
import withAuth from "@/lib/withAuth";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const StudentProfilePage = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    handleGetStudent();
  }, []);

  const handleGetStudent = async () => {
    try {
      const { user } = await authorize();
      const { student } = await getStudent(user.username);
      setStudent(student);
    } catch (error) {
      toast.error("Failed to fetch student data.");
    }
  };

  return student ? (
    <div className="flex min-h-screen p-6">
      <StudentInfo student={student} />
    </div>
  ) : (
    <div className="flex min-h-screen p-6">
      <div className="flex-1 max-w-3xl mx-auto bg-background shadow-lg rounded-lg p-6">
        <Skeleton className="h-24 w-24 mx-auto rounded-full mb-6" />
        <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
        <div className="grid grid-cols-2 gap-4">
          {[...Array(12)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-full rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuth(StudentProfilePage);
