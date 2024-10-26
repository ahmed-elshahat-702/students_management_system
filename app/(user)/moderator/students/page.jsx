"use client";

import withAuth from "@/lib/withAuth";
import EntityPage from "@/components/EntityPage";
import { deleteStudent, getAllStudents } from "@/lib/api";

const page = () => {
  return (
    <EntityPage
      fetchEntities={getAllStudents}
      deleteEntity={deleteStudent}
      entityType="Student"
      addEntityUrl="/moderator/students/add-student"
    />
  );
};

export default withAuth(page);
