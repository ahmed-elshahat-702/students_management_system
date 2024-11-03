"use client";

import { useEffect, useState } from "react";
import { getStudentById } from "@/lib/api";
import StudentForm from "@/components/StudentForm";
import withAuth from "@/lib/withAuth";
import { useToast } from "@/hooks/use-toast";

const EditStudentPage = ({ params }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const id = params.id;
        const data = await getStudentById(id);
        setStudent(data?.student);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error || "There was a problem with your request.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Student</h1>
      <StudentForm initialData={student} isEditMode={true} id={params.id} />
    </div>
  );
};

export default withAuth(EditStudentPage);
