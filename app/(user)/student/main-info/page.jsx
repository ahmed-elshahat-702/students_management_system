"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { authorize, getStudent } from "@/lib/api";
import withAuth from "@/lib/withAuth";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const page = () => {
  const [student, setStudent] = useState(null);
  useEffect(() => {
    handleGetStudent();
  }, []);

  async function handleGetStudent() {
    try {
      const { user } = await authorize();
      const { student } = await getStudent(user.username);
      setStudent(student);
    } catch (error) {
      console.log(error);
    }
  }

  return student ? (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1">
        <div className="max-sm:max-w-full max-w-2xl lg:max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-400 py-8 sm:py-12 text-white text-center">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">
              Student Profile
            </h1>
            {/* student image */}
            {student && student.avatar && (
              <div className="w-24 h-24 rounded-full mx-auto mb-4">
                <Image
                  src={student.avatar}
                  alt="Student Avatar"
                  width={100}
                  height={100}
                  priority={true}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            )}

            <p className="text-md sm:text-lg md:text-xl">{student.fullName}</p>
            <p className="opacity-80 text-sm sm:text-md md:text-lg">
              username: {student.username}
            </p>
            <p className=" text-sm sm:text-md md:text-lg">
              Level: {student.level}
            </p>
          </div>

          {/* Tables Section */}
          <div className="p-4 sm:p-8">
            {/* Personal Information Table */}
            <h2
              id="personal-info"
              className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold mb-6 border-b pb-2"
            >
              Personal Information
            </h2>
            <table className="min-w-full mb-8 text-left table-auto border-collapse">
              <tbody className="max-sm:text-sm">
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">Full Name</td>
                  <td className="px-4 py-2">{student.fullName}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">Gender</td>
                  <td className="px-4 py-2">{student.gender}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">Nationality</td>
                  <td className="px-4 py-2">{student.nationality}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">Religion</td>
                  <td className="px-4 py-2">{student.religion}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">Birthdate</td>
                  <td className="px-4 py-2">{student.birthdate}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">Place of Birth</td>
                  <td className="px-4 py-2">{student.PlaceOfBirth}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">National ID</td>
                  <td className="px-4 py-2">{student.nationalID}</td>
                </tr>
              </tbody>
            </table>

            {/* Contact Information Table */}
            <h2
              id="contact-info"
              className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold mb-6 border-b pb-2"
            >
              Contact Information
            </h2>
            <table className="min-w-full mb-8 text-left table-auto border-collapse">
              <tbody className="max-sm:text-sm">
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">City</td>
                  <td className="px-4 py-2">{student.city}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">Address</td>
                  <td className="px-4 py-2">{student.address}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">Mobile</td>
                  <td className="px-4 py-2">{student.mobile}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">Email</td>
                  <td className="px-4 py-2">{student.email}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">System Email</td>
                  <td className="px-4 py-2">{student.systemMail}</td>
                </tr>
              </tbody>
            </table>

            {/* Educational Information Table */}
            <h2
              id="educational-info"
              className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold mb-6 border-b pb-2"
            >
              Educational Information
            </h2>
            <table className="min-w-full mb-8 text-left table-auto border-collapse">
              <tbody className="max-sm:text-sm">
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">School</td>
                  <td className="px-4 py-2">{student.school}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">Qualification</td>
                  <td className="px-4 py-2">{student.qualification}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">Graduation Year</td>
                  <td className="px-4 py-2">{student.graduationYear}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">Total Scores</td>
                  <td className="px-4 py-2">{student.totalScores}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">
                    Year of Enrollment
                  </td>
                  <td className="px-4 py-2">{student.yearOfEnrollment}</td>
                </tr>
              </tbody>
            </table>

            {/* Guardian Information Table */}
            <h2
              id="guardian-info"
              className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold mb-6 border-b pb-2"
            >
              Guardian Information
            </h2>
            <table className="min-w-full text-left table-auto border-collapse">
              <tbody className="max-sm:text-sm">
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">Guardian Name</td>
                  <td className="px-4 py-2">{student.guardianName}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">Guardian Job</td>
                  <td className="px-4 py-2">{student.guardianJob}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">Guardian City</td>
                  <td className="px-4 py-2">{student.guardianCity}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">Guardian Address</td>
                  <td className="px-4 py-2">{student.guardianAddress}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 font-semibold">Guardian Mobile</td>
                  <td className="px-4 py-2">{student.guardianMobile}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <div className="max-w-4xl max-sm:max-w-full mx-auto">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[330px] w-full rounded-xl bg-slate-300" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-8 w-full rounded bg-slate-300" />
              <Skeleton className="h-8 w-full rounded bg-slate-300" />
              <Skeleton className="h-8 w-full rounded bg-slate-300" />
              <Skeleton className="h-8 w-full rounded bg-slate-300" />
              <Skeleton className="h-8 w-full rounded bg-slate-300" />
              <Skeleton className="h-8 w-full rounded bg-slate-300" />
              <Skeleton className="h-8 w-full rounded bg-slate-300" />
              <Skeleton className="h-8 w-full rounded bg-slate-300" />
              <Skeleton className="h-8 w-full rounded bg-slate-300" />
              <Skeleton className="h-8 w-full rounded bg-slate-300" />
              <Skeleton className="h-8 w-full rounded bg-slate-300" />
              <Skeleton className="h-8 w-full rounded bg-slate-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(page);
