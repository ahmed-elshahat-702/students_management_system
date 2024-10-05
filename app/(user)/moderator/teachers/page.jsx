"use client";

import { Button } from "@/components/ui/button";
import { deleteTeacher, getAllTeachers } from "@/lib/api";
import withAuth from "@/lib/withAuth";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrash } from "react-icons/fa";

const page = () => {
  const [teachers, setTeachers] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const data = await getAllTeachers();
      setTeachers(data.teachers);
    } catch (err) {
      toast.error(err);
    }
  };

  const deleteTeachers = async (teacher) => {
    setLoading(true);
    try {
      toast.loading("Deleting teacher...");
      const response = await deleteTeacher(teacher.username);
      fetchTeachers();
      toast.dismiss();
      toast.success(response.message);
    } catch (error) {
      toast.dismiss();
      toast.error(error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mt-16 lg:mt-0 p-6 flex-1">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mb-4">Teachers List</h2>
        </div>
        <div className="">
          {teachers ? (
            teachers.length !== 0 ? (
              <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Teacher Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Teacher Code
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Password
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Functions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {teacher.fullName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {teacher.code}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {teacher.username}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {teacher.password}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 flex gap-2">
                        <Button className="bg-green-500 hover:bg-green-600 text-white rounded flex items-center gap-2">
                          Edit
                          <FaEdit />
                        </Button>
                        <Button
                          className={`${
                            loading
                              ? "bg-red-400 disable"
                              : "bg-red-500 hover:bg-red-600"
                          } text-white rounded flex items-center gap-2`}
                          onClick={() => deleteTeachers(teacher)}
                        >
                          Delete
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h1 className="text-center text-2xl font-bold">
                There is no teachers yet
              </h1>
            )
          ) : (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default withAuth(page);
