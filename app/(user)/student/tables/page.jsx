"use client";

import ScheduleTable from "@/components/SchedualTable";
import { authorize, getSpecificGradeTables } from "@/lib/api";
import withAuth from "@/lib/withAuth";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SchedulePage = () => {
  const [tables, setTables] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const { user } = await authorize();
      setUser(user);
      toast.loading("Fetching tables...");

      const { gradeTables } = await getSpecificGradeTables(user.level);
      setTables(gradeTables.tables);

      toast.dismiss();
      toast.success("Tables fetched successfully");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to fetch tables. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8  min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600 border-solid"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {tables && (
            <>
              <ScheduleTable
                scheduleType="study"
                tableData={tables.studyTable}
                grade={`Grade ${user.level}`}
                colorGradient="from-green-600 to-green-700"
              />
              <ScheduleTable
                scheduleType="exams"
                tableData={tables.examsTable}
                grade={`Grade ${user.level}`}
                colorGradient="from-green-600 to-green-700"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default withAuth(SchedulePage);
