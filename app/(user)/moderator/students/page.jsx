"use client";

import { Button } from "@/components/ui/button";
import { deleteStudent, getAllStudents } from "@/lib/api";
import withAuth from "@/lib/withAuth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const page = () => {
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data.students);
    } catch (error) {
      toast.error(error);
    }
  };
  const deleteStudents = async (student) => {
    setLoading(true);
    try {
      toast.loading("Deleting student...");
      const response = await deleteStudent(student.username);
      fetchStudents();
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
    <main className="p-6 flex-1">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Add Student</h2>
          <Link
            href={"/moderator/students/add-student"}
            className="w-fit p-2 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center gap-2"
          >
            Add Student
            <FaPlus className="fill-white text-white" />
          </Link>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mb-4">Students List</h2>
        </div>
        <div>
          {students ? (
            students.length !== 0 ? (
              <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Student Code
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
                  {students.map((student, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-gray-100`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {student.fullName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {student.code}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {student.username}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {student.password}
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
                          onClick={() => deleteStudents(student)}
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
                There is no students yet
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
