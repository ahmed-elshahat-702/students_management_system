"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { authorize, getStudent } from "@/lib/api";
import withAuth from "@/lib/withAuth";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const StudentProfilePage = () => {
  const [student, setStudent] = useState(null);

  const personalInformationTitles = [
    "fullName",
    "level",
    "code",
    "systemMail",
    "gender",
    "nationality",
    "religion",
    "birthdate",
    "placeOfBirth",
    "nationalID",
    "releaseDate",
    "placeOfRelease",
  ];

  const contactInformationTitles = [
    "city",
    "address",
    "mobile",
    "email",
    "fax",
    "mailBox",
  ];

  const educationInformationTitles = [
    "school",
    "qualification",
    "graduationYear",
    "theRoleOfTheQualification",
    "totalScores",
    "ratio",
    "coordinationApprovalDate",
    "thePartyFromWhichItIsTransferred",
    "yearOfEnrollment",
    "desires",
  ];

  const guardianInformationTitles = [
    "guardianName",
    "guardianJob",
    "guardianCity",
    "guardianAddress",
    "homeTelephone",
    "guardianMobile",
    "guardianEmail",
  ];

  useEffect(() => {
    handleGetStudent();
  }, []);

  async function handleGetStudent() {
    try {
      const { user } = await authorize();
      const { student } = await getStudent(user.username);
      setStudent(student);
    } catch (error) {
      toast.error(error || "Failed to fetch student");
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  const renderInfoTable = (titles, studentData) => (
    <table className="min-w-full mb-8 text-left table-auto border-collapse">
      <tbody className="max-sm:text-sm">
        {titles.map((title, index) => (
          <tr
            className={`${index === 0 ? "border-t border-b" : "border-b"} flex`}
            key={title}
          >
            <td className="px-4 py-2 font-semibold flex-1">
              {title === "nationalID"
                ? "National ID"
                : title
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                    .split(" ")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")}
            </td>
            <td className="px-4 py-2 flex-1">
              {!studentData[title] || studentData[title] === ""
                ? "-------"
                : title === "birthdate" ||
                  title === "releaseDate" ||
                  title === "coordinationApprovalDate"
                ? formatDate(studentData[title])
                : studentData[title]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return student ? (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <div className="max-sm:max-w-full max-md:mx-4 max-w-2xl lg:max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-400 py-8 sm:py-12 text-white text-center">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2">
              Student Profile
            </h1>
            {/* Student Avatar */}
            {student.avatar ? (
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
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-100 mx-auto mb-4"></div>
            )}

            <p className="text-md sm:text-lg md:text-xl">{student.fullName}</p>
            <p className="opacity-80 text-sm sm:text-md md:text-lg">
              Level: {student.level}
            </p>
            <p className="opacity-80 text-sm sm:text-md md:text-lg">
              Username: {student.username}
            </p>
            <p className="opacity-80 text-sm sm:text-md md:text-lg">
              Password: {student.password}
            </p>
          </div>

          {/* Tables Section */}
          <div className="p-4 sm:p-8">
            <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold mb-6 pb-2">
              Personal Information
            </h2>
            {renderInfoTable(personalInformationTitles, student)}

            <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold mb-6 pb-2">
              Contact Information
            </h2>
            {renderInfoTable(contactInformationTitles, student)}

            <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold mb-6 pb-2">
              Guardian Information
            </h2>
            {renderInfoTable(guardianInformationTitles, student)}

            <h2 className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold mb-6 pb-2">
              Educational Information
            </h2>
            {renderInfoTable(educationInformationTitles, student)}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <div className="max-sm:max-w-full max-md:mx-4 max-w-2xl lg:max-w-3xl mx-auto rounded-lg overflow-hidden">
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[330px] w-full rounded-xl" />
            <div className="grid grid-cols-2 gap-4">
              {[...Array(12)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-full rounded bg-gray-300" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(StudentProfilePage);
