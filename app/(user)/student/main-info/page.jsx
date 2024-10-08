"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { authorize, getStudent } from "@/lib/api";
import withAuth from "@/lib/withAuth";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const page = () => {
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
    "placeOfBirth	",
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
            {student && student?.avatar && (
              <div className="w-24 h-24 rounded-full mx-auto mb-4">
                <Image
                  src={student?.avatar}
                  alt="Student Avatar"
                  width={100}
                  height={100}
                  priority={true}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            )}

            <p className="text-md sm:text-lg md:text-xl">{student?.fullName}</p>
            <p className="opacity-80 text-sm sm:text-md md:text-lg">
              level: {student?.level}
            </p>
            <p className="opacity-80 text-sm sm:text-md md:text-lg">
              username: {student?.username}
            </p>
            <p className="opacity-80 text-sm sm:text-md md:text-lg">
              password: {student?.password}
            </p>
          </div>

          {/* Tables Section */}
          <div className="p-4 sm:p-8">
            {/* Personal Information Table */}
            <h2
              id="personal-info"
              className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold mb-6 pb-2"
            >
              Personal Information
            </h2>
            <table className="min-w-full mb-8 text-left table-auto border-collapse">
              <tbody className="max-sm:text-sm">
                {personalInformationTitles.map((title, index) => (
                  <tr
                    className={`${
                      index === 0 ? "border-t border-b" : "border-b"
                    }`}
                    key={title}
                  >
                    <td className="px-4 py-2 font-semibold">
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
                    <td className="px-4 py-2">
                      {!student[title] || student[title] === ""
                        ? "-------"
                        : student[title]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Contact Information Table */}
            <h2
              id="contact-info"
              className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold mb-6 pb-2"
            >
              Contact Information
            </h2>
            <table className="min-w-full mb-8 text-left table-auto border-collapse">
              <tbody className="max-sm:text-sm">
                {contactInformationTitles.map((title, index) => (
                  <tr
                    className={`${
                      index === 0 ? "border-t border-b" : "border-b"
                    }`}
                    key={title}
                  >
                    <td className="px-4 py-2 font-semibold">
                      {title
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
                    <td className="px-4 py-2">
                      {!student[title] || student[title] === ""
                        ? "-------"
                        : student[title]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Guardian Information Table */}
            <h2
              id="guardian-info"
              className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold mb-6 pb-2"
            >
              Guardian Information
            </h2>
            <table className="min-w-full mb-8 text-left table-auto border-collapse">
              <tbody className="max-sm:text-sm">
                {guardianInformationTitles.map((title, index) => (
                  <tr
                    className={`${
                      index === 0 ? "border-t border-b" : "border-b"
                    }`}
                    key={title}
                  >
                    <td className="px-4 py-2 font-semibold">
                      {title
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
                    <td className="px-4 py-2">
                      {!student[title] || student[title] === ""
                        ? "-------"
                        : student[title]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Educational Information Table */}

            <h2
              id="educational-info"
              className="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold mb-6 pb-2"
            >
              Educational Information
            </h2>
            <table className="min-w-full mb-8 text-left table-auto border-collapse">
              <tbody className="max-sm:text-sm">
                {educationInformationTitles.map((title, index) => (
                  <tr
                    className={`${
                      index === 0 ? "border-t border-b" : "border-b"
                    }`}
                    key={title}
                  >
                    <td className="px-4 py-2 font-semibold">
                      {title
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
                    <td className="px-4 py-2">
                      {!student[title] || student[title] === ""
                        ? "-------"
                        : student[title]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    // skeleton
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
