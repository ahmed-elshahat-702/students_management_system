import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function StudentInfo({ student }) {
  const formattedDates = {
    birthdate: student?.birthdate
      ? new Intl.DateTimeFormat("en-US").format(new Date(student.birthdate))
      : "-------",
    releaseDate: student?.releaseDate
      ? new Intl.DateTimeFormat("en-US").format(new Date(student.releaseDate))
      : "-------",
    coordinationApprovalDate: student?.coordinationApprovalDate
      ? new Intl.DateTimeFormat("en-US").format(
          new Date(student.coordinationApprovalDate)
        )
      : "-------",
  };

  const infoCategories = {
    personalInformationTitles: [
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
    ],
    contactInformationTitles: [
      "city",
      "address",
      "mobile",
      "email",
      "fax",
      "mailBox",
    ],
    educationInformationTitles: [
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
    ],
    guardianInformationTitles: [
      "guardianName",
      "guardianJob",
      "guardianCity",
      "guardianAddress",
      "homeTelephone",
      "guardianMobile",
      "guardianEmail",
    ],
  };

  const renderInfoTable = (titles, studentData) => (
    <table className="min-w-full mb-8 text-left table-auto border-collapse">
      <tbody className="max-sm:text-sm">
        {titles.map((title) => (
          <tr key={title} className="border-b flex">
            <td className="px-4 py-2 font-semibold flex-1">
              {title
                .replace(/([A-Z])/g, " $1")
                .trim()
                .replace(/^\w/, (c) => c.toUpperCase())}
            </td>
            <td className="px-4 py-2 flex-1">
              {formattedDates[title] || studentData[title] || "-------"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <Card className="flex-1 max-w-3xl mx-auto bg-background shadow-lg rounded-lg overflow-hidden">
      <CardHeader>
        <div className=" rounded bg-gradient-to-r from-green-600 to-green-400 dark:from-green-800 dark:to-green-600 py-8 text-white text-center">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            Student Profile
          </h1>
          <div className="w-24 h-24 rounded-full mx-auto mb-4">
            {student.avatar ? (
              <Image
                src={student.avatar}
                alt={`${student.fullName}'s Avatar`}
                width={100}
                height={100}
                priority
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200" />
            )}
          </div>
          <p className="text-lg">{student.fullName}</p>
          <p className="opacity-80">Level: {student.level}</p>
          <p className="opacity-80">Username: {student.username}</p>
          <p className="opacity-80">Password: {student.password}</p>
        </div>
      </CardHeader>
      <CardContent>
        {Object.entries(infoCategories).map(([category, titles]) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {category.replace(/([A-Z])/g, " $1").replace(/Titles/, "")}
            </h2>
            {renderInfoTable(titles, student)}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
