"use client";

import { getAllGradesTables } from "@/lib/api";
import withAuth from "@/lib/withAuth";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ScheduleTable from "@/components/SchedualTable";

const page = () => {
  const [grade1Tables, setGrade1Tables] = useState(null);
  const [grade2Tables, setGrade2Tables] = useState(null);
  const [grade3Tables, setGrade3Tables] = useState(null);
  const [grade4Tables, setGrade4Tables] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGrades();
  }, []);
  const fetchGrades = async () => {
    toast.dismiss();
    toast.loading("Fetching tables...");
    try {
      const data = await getAllGradesTables();
      setGrade1Tables(
        data.grades.filter((grades) => grades.grade === "1")[0].tables
      );
      setGrade2Tables(
        data.grades.filter((grades) => grades.grade === "2")[0].tables
      );
      setGrade3Tables(
        data.grades.filter((grades) => grades.grade === "3")[0].tables
      );
      setGrade4Tables(
        data.grades.filter((grades) => grades.grade === "4")[0].tables
      );
      toast.dismiss();
      toast.success("Tables fetched successfully");
    } catch (error) {
      toast.dismiss();
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Grade 1 */}
          <ScheduleTable
            title="Grade 1 Study Schedule"
            tableData={grade1Tables.studyTable}
            grade="Grade 1"
            colorGradient="from-blue-500 to-blue-700"
          />
          <ScheduleTable
            title="Grade 1 Exam Schedule"
            tableData={grade1Tables.examsTable}
            grade="Grade 1"
            colorGradient="from-blue-500 to-blue-700"
          />

          {/* Grade  2 */}
          <ScheduleTable
            title="Grade 2 Study Schedule"
            tableData={grade2Tables.studyTable}
            grade="Grade 2"
            colorGradient="from-green-500 to-green-700"
          />
          <ScheduleTable
            title="Grade 2 Exam Schedule"
            tableData={grade2Tables.examsTable}
            grade="Grade 2"
            colorGradient="from-green-500 to-green-700"
          />

          {/* Grade 3 */}
          <ScheduleTable
            title="Grade 3 Study Schedule"
            tableData={grade3Tables.studyTable}
            grade="Grade 3"
            colorGradient="from-purple-500 to-purple-700"
          />
          <ScheduleTable
            title="Grade 3 Exam Schedule"
            tableData={grade3Tables.examsTable}
            grade="Grade 3"
            colorGradient="from-purple-500 to-purple-700"
          />

          {/* Grade 4 */}
          <ScheduleTable
            title="Grade 4 Study Schedule"
            tableData={grade4Tables.studyTable}
            grade="Grade 4"
            colorGradient="from-orange-500 to-orange-700"
          />
          <ScheduleTable
            title="Grade 4 Exam Schedule"
            tableData={grade4Tables.examsTable}
            grade="Grade 4"
            colorGradient="from-orange-500 to-orange-700"
          />
        </div>
      )}
    </div>
  );
};
export default withAuth(page);
