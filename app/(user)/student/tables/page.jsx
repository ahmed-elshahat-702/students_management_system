"use client";

import ScheduleTable from "@/components/SchedualTable";
import { authorize, getSpecificGradeTables } from "@/lib/api";
import withAuth from "@/lib/withAuth";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [tables, setTables] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    const { user } = await authorize();
    setUser(user);
    toast.dismiss();
    toast.loading("Fetching tables...");
    try {
      const { gradeTables } = await getSpecificGradeTables(user.level);
      setTables(gradeTables.tables);
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
          <ScheduleTable
            title={`Grade ${user.level} Study Schedule`}
            tableData={tables.studyTable}
            grade={`Grade ${user.level}`}
            colorGradient="from-blue-500 to-blue-700"
          />
          <ScheduleTable
            title={`Grade ${user.level} Exam Schedule`}
            tableData={tables.examsTable}
            grade={`Grade ${user.level}`}
            colorGradient="from-blue-500 to-blue-700"
          />
        </div>
      )}
    </div>
  );
};

export default withAuth(page);
