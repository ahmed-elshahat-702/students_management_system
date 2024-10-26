"use client";

import withAuth from "@/lib/withAuth";
import { getAllTeachers, deleteTeacher } from "@/lib/api";
import EntityPage from "@/components/EntityPage";

const page = () => {
  return (
    <EntityPage
      fetchEntities={getAllTeachers}
      deleteEntity={deleteTeacher}
      entityType="Teacher"
      addEntityUrl="/moderator/teachers/add-teacher"
    />
  );
};

export default withAuth(page);
