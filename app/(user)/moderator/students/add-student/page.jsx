"use client";

import { Button } from "@/components/ui/button";
import React, { useMemo, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { addStudent } from "@/lib/api";
import withAuth from "@/lib/withAuth";
import { useEdgeStore } from "@/lib/edgestore";

const AddStudentForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const initialValues = {
    username: "",
    password: "",
    level: "",
    avatar: null,
    fullName: "",
    code: "",
    nationality: "",
    gender: "",
    religion: "",
    birthdate: "",
    PlaceOfBirth: "",
    nationalID: "",
    releaseDate: "",
    placeOfRelease: "",
    city: "",
    address: "",
    mobile: "",
    email: "",
    fax: "",
    mailBox: "",
    systemMail: "",
    school: "",
    qualification: "",
    graduationYear: "",
    theRoleOfTheQualification: "",
    totalScores: "",
    ratio: "",
    sittingNumber: "",
    coordinationApprovalNumber: "",
    coordinationApprovalDate: "",
    thePartyFromWhichItIsTransferred: "",
    yearOfEnrollment: "",
    desires: "",
    guardianName: "",
    guardianJob: "",
    guardianCity: "",
    guardianAddress: "",
    homeTelephone: "",
    guardianMobile: "",
    guardianEmail: "",
  };
  const [studentData, setStudentData] = useState(initialValues);

  const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
  const passwordRegex = /^[A-Za-z\d@$!%*?&]{8,}$/;

  const isFormValid = useMemo(
    () =>
      usernameRegex.test(studentData.username) &&
      passwordRegex.test(studentData.password),
    [studentData.username, studentData.password]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      setLoading(true);

      const formData = new FormData();
      Object.keys(studentData).forEach((key) => {
        formData.append(key, studentData[key]);
      });

      if (file) {
        try {
          toast.dismiss();
          toast.loading(`Uploading Avatar...${progress}`);
          const res = await edgestore.publicFiles.upload({
            file,
            onProgressChange: (recentProgress) => {
              setProgress(recentProgress);
            },
          });
          setProgress;
          0;
          formData.append("avatar", res.url);
          try {
            toast.dismiss();
            toast.loading("Adding Student...");
            const response = await addStudent(formData);
            toast.dismiss();
            toast.success(response.message);
            router.push("/moderator/students");
            setStudentData(initialValues);
          } catch (error) {
            toast.dismiss();
            toast.error(error || "An error occurred");
          } finally {
            setLoading(false);
          }
        } catch (error) {
          toast.dismiss();
          toast.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          toast.dismiss();
          toast.loading("Adding Student...");
          const response = await addStudent(formData);
          toast.dismiss();
          toast.success(response.message);
          router.push("/moderator/students");
          setStudentData(initialValues);
        } catch (error) {
          toast.dismiss();
          toast.error(error || "An error occurred");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 max-w-2xl mx-auto my-4 bg-white shadow-lg rounded-lg"
    >
      <h1 className="text-2xl font-bold mb-6">Add Student</h1>

      <div className="grid grid-cols-2 gap-2">
        {/* Username */}
        <div className="mb-4">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <input
              type="text"
              name="username"
              id="username"
              value={studentData.username}
              onChange={handleChange}
              autoComplete="name"
              required
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border rounded-full"></div>
            <p
              className={`text-sm ${
                studentData.username
                  ? usernameRegex.test(studentData.username)
                    ? "text-green-600"
                    : "text-red-600"
                  : "text-gray-500"
              }`}
            >
              Username must be 3 to 15 characters.
            </p>
          </div>
        </div>
        {/* Password */}
        <div className="mb-4">
          <Label htmlFor="password">Password</Label>
          <div className="relative flex items-center gap-3 justify-between bg-gray-50 box-border p-2 border-b border-gray-400 focus-within:bg-[#4985e01f]">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="input w-full border-none outline-none ring-0 focus:ring-0 bg-transparent"
              value={studentData.password}
              onChange={handleChange}
            />
            <div className="text-xl">
              {showPassword ? (
                <FaEye
                  onClick={() => setShowPassword(false)}
                  className="cursor-pointer"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setShowPassword(true)}
                  className="cursor-pointer"
                />
              )}
            </div>
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>

          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border rounded-full"></div>
            <p
              className={`text-sm ${
                studentData.password
                  ? passwordRegex.test(studentData.password)
                    ? "text-green-600"
                    : "text-red-600"
                  : "text-gray-500"
              }`}
            >
              Password must be at least 8 characters.
            </p>
          </div>
        </div>
        {/* Level */}
        <div className="mb-4 flex flex-col justify-end gap-1">
          <Label htmlFor="level">Level</Label>
          <select
            name="level"
            id="level"
            value={studentData.level}
            onChange={handleChange}
            required
            className="bg-gray-50 text-gray-900 border-0 rounded-md p-2 focus:outline-none transition ease-in-out duration-150"
          >
            <option value="">Select Level</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
        </div>
        {/* Avatar */}
        <div className="mb-4 flex flex-col justify-end gap-1">
          <Label htmlFor="avatar">Avatar (optional)</Label>
          <input
            type="file"
            about="image/png, image/jpeg, image/jpg"
            name="avatar"
            id="avatar"
            onChange={handleFileChange}
            className="border-none p-1 shadow-none file:mr-4 file:py-1 file:px-4 file:bg-green-600 file:rounded-full file:border-0 file:text-sm file:font-semibold file:text-white hover:file:bg-green-800 cursor-pointer file:cursor-pointer"
          />
        </div>
        {/* Full Name */}
        <div className="mb-4">
          <Label htmlFor="fullName">Full Name</Label>
          <div className="relative">
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={studentData.fullName}
              onChange={handleChange}
              required
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Code */}
        <div className="mb-4">
          <Label htmlFor="code">Code</Label>
          <div className="relative">
            <input
              type="text"
              name="code"
              id="code"
              value={studentData.code}
              onChange={handleChange}
              required
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Nationality */}
        <div className="mb-4 flex flex-col justify-end gap-1">
          <Label htmlFor="nationality">Nationality</Label>
          <select
            name="nationality"
            id="nationality"
            value={studentData.nationality}
            onChange={handleChange}
            required
            className="bg-gray-50 text-gray-900 border-0 rounded-md p-2 transition ease-in-out duration-150"
          >
            <option value="">Select Nationality</option>
            <option value="Egypt">Egypt</option>
            <option value="Sudia arabia">Sudia arabia</option>
            <option value="etch...">etch...</option>
          </select>
        </div>
        {/* Gender */}
        <div className="mb-4 flex flex-col justify-end gap-1">
          <Label htmlFor="gender">Gender</Label>
          <select
            name="gender"
            id="gender"
            value={studentData.gender}
            onChange={handleChange}
            required
            className="bg-gray-50 text-gray-900 border-0 rounded-md p-2 focus:outline-none transition ease-in-out duration-150"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        {/* Religion */}
        <div className="mb-4 flex flex-col justify-end gap-1">
          <Label htmlFor="religion">Religion</Label>
          <select
            name="religion"
            id="religion"
            value={studentData.religion}
            onChange={handleChange}
            required
            className="bg-gray-50 text-gray-900 border-0 rounded-md p-2 transition ease-in-out duration-150"
          >
            <option value="">Select Religion</option>
            <option value="Islam">Islam</option>
            <option value="Chrestian">Chrestian</option>
            <option value="Jewish">Jewish</option>
          </select>
        </div>
        {/* Birthdate */}
        <div className="mb-4">
          <Label htmlFor="birthdate">Birthdate</Label>
          <div className="relative">
            <input
              type="date"
              name="birthdate"
              id="birthdate"
              value={studentData.birthdate}
              onChange={handleChange}
              required
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Place of Birth */}
        <div className="mb-4">
          <Label htmlFor="PlaceOfBirth">Place of Birth</Label>
          <div className="relative">
            <input
              type="text"
              name="PlaceOfBirth"
              id="PlaceOfBirth"
              value={studentData.PlaceOfBirth}
              onChange={handleChange}
              required
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* National ID */}
        <div className="mb-4">
          <Label htmlFor="nationalID">National ID</Label>
          <div className="relative">
            <input
              type="number"
              name="nationalID"
              id="nationalID"
              value={studentData.nationalID}
              onChange={handleChange}
              required
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Realease Date */}
        <div className="mb-4">
          <Label htmlFor="releaseDate">Realease Date (optional)</Label>
          <div className="relative">
            <input
              type="date"
              name="releaseDate"
              id="releaseDate"
              value={studentData.releaseDate}
              onChange={handleChange}
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Place of Realease */}
        <div className="mb-4">
          <Label htmlFor="PlaceOfRelease">Place of Realease (optional)</Label>
          <div className="relative">
            <input
              type="text"
              name="PlaceOfRelease"
              id="PlaceOfRelease"
              value={studentData.PlaceOfRelease}
              onChange={handleChange}
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* City */}
        <div className="mb-4">
          <Label htmlFor="city">City</Label>
          <div className="relative">
            <input
              type="text"
              name="city"
              id="city"
              value={studentData.city}
              onChange={handleChange}
              required
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Address */}
        <div className="mb-4">
          <Label htmlFor="address">Address</Label>
          <div className="relative">
            <input
              type="text"
              name="address"
              id="address"
              value={studentData.address}
              onChange={handleChange}
              autoComplete="address-level1"
              required
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Mobile */}
        <div className="mb-4">
          <Label htmlFor="mobile">Mobile</Label>
          <div className="relative">
            <input
              type="number"
              name="mobile"
              id="mobile"
              value={studentData.mobile}
              onChange={handleChange}
              required
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Email */}
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={studentData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Fax */}
        <div className="mb-4">
          <Label htmlFor="fax">Fax (optional) </Label>
          <div className="relative">
            <input
              type="text"
              name="fax"
              id="fax"
              value={studentData.fax}
              onChange={handleChange}
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Mail Box */}
        <div className="mb-4">
          <Label htmlFor="mailBox">Mail Box (optional)</Label>
          <div className="relative">
            <input
              type="text"
              name="mailBox"
              id="mailBox"
              value={studentData.mailBox}
              onChange={handleChange}
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* System Mail */}
        <div className="mb-4">
          <Label htmlFor="systemMail">System Mail</Label>
          <div className="relative">
            <input
              type="email"
              name="systemMail"
              id="systemMail"
              value={studentData.systemMail}
              onChange={handleChange}
              required
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/*School*/}
        <div className="mb-4">
          <Label htmlFor="school">School (optional)</Label>
          <div className="relative">
            <input
              type="text"
              name="school"
              id="school"
              value={studentData.school}
              onChange={handleChange}
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Qualification */}
        <div className="mb-4">
          <Label htmlFor="qualification">Qualification (optional)</Label>
          <div className="relative">
            <input
              type="text"
              name="qualification"
              id="qualification"
              value={studentData.qualification}
              onChange={handleChange}
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Graduation Year */}
        <div className="mb-4">
          <Label htmlFor="graduationYear">Graduation Year (optional)</Label>
          <div className="relative">
            <input
              type="number"
              name="graduationYear"
              id="graduationYear"
              value={studentData.graduationYear}
              onChange={handleChange}
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* The Role Of The Qualification  */}
        <div className="mb-4">
          <Label htmlFor="theRoleOfTheQualification">
            The Role Of The Qualification (optional)
          </Label>
          <div className="relative">
            <input
              type="text"
              name="theRoleOfTheQualification"
              id="theRoleOfTheQualification"
              value={studentData.theRoleOfTheQualification}
              onChange={handleChange}
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Total Scores */}
        <div className="mb-4">
          <Label htmlFor="totalScores">Total Scores</Label>
          <div className="relative">
            <input
              type="number"
              name="totalScores"
              id="totalScores"
              value={studentData.totalScores}
              onChange={handleChange}
              required
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Ratio */}
        <div className="mb-4">
          <Label htmlFor="ratio">Ratio (optional)</Label>
          <div className="relative">
            <input
              type="text"
              name="ratio"
              id="ratio"
              value={studentData.ratio}
              onChange={handleChange}
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Sitting Number*/}
        <div className="mb-4">
          <Label htmlFor="sittingNumber">Sitting Number (optional)</Label>
          <div className="relative">
            <input
              type="number"
              name="sittingNumber"
              id="sittingNumber"
              value={studentData.sittingNumber}
              onChange={handleChange}
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Coordination Approval Number */}
        <div className="mb-4">
          <Label htmlFor="coordinationApprovalNumber">
            Coordination Approval Number (optional)
          </Label>
          <div className="relative">
            <input
              type="text"
              name="coordinationApprovalNumber"
              id="coordinationApprovalNumber"
              value={studentData.coordinationApprovalNumber}
              onChange={handleChange}
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Coordination Approval Date */}
        <div className="mb-4">
          <Label htmlFor="coordinationApprovalDate">
            Coordination Approval Date (optional)
          </Label>
          <div className="relative">
            <input
              type="date"
              name="coordinationApprovalDate"
              id="coordinationApprovalDate"
              value={studentData.coordinationApprovalDate}
              onChange={handleChange}
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* The Party From Which It Is Transferred */}
        <div className="mb-4 flex flex-col justify-end gap-1">
          <Label htmlFor="thePartyFromWhichItIsTransferred">
            The Party From Which It Is Transferred (optional)
          </Label>
          <div className="relative">
            <input
              type="text"
              name="thePartyFromWhichItIsTransferred"
              id="thePartyFromWhichItIsTransferred"
              value={studentData.thePartyFromWhichItIsTransferred}
              onChange={handleChange}
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Year Of Enrollment */}
        <div className="mb-4 flex flex-col justify-end gap-1">
          <Label htmlFor="yearOfEnrollment">
            Year Of Enrollment (optional)
          </Label>
          <div className="relative">
            <input
              type="number"
              name="yearOfEnrollment"
              id="yearOfEnrollment"
              value={studentData.yearOfEnrollment}
              onChange={handleChange}
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Desires  */}
        <div className="mb-4">
          <Label htmlFor="desires">Desires (optional)</Label>
          <div className="relative">
            <input
              type="text"
              name="desires"
              id="desires"
              value={studentData.desires}
              onChange={handleChange}
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Guardian Name */}
        <div className="mb-4">
          <Label htmlFor="guardianName">Guardian Name</Label>
          <div className="relative">
            <input
              type="text"
              name="guardianName"
              id="guardianName"
              value={studentData.guardianName}
              onChange={handleChange}
              required
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Guardian Job  */}
        <div className="mb-4">
          <Label htmlFor="guardianJob">Guardian Job (optional)</Label>
          <div className="relative">
            <input
              type="text"
              name="guardianJob"
              id="guardianJob"
              value={studentData.guardianJob}
              onChange={handleChange}
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Guardian City  */}
        <div className="mb-4">
          <Label htmlFor="guardianCity">Guardian City (optional)</Label>
          <div className="relative">
            <input
              type="text"
              name="guardianCity"
              id="guardianCity"
              value={studentData.guardianCity}
              onChange={handleChange}
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Guardian Address  */}
        <div className="mb-4">
          <Label htmlFor="guardianAddress">Guardian Address (optional)</Label>
          <div className="relative">
            <input
              type="text"
              name="guardianAddress"
              id="guardianAddress"
              value={studentData.guardianAddress}
              onChange={handleChange}
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Home Telephone  */}
        <div className="mb-4">
          <Label htmlFor="homeTelephone">Home Telephone (optional)</Label>
          <div className="relative">
            <input
              type="number"
              name="homeTelephone"
              id="homeTelephone"
              value={studentData.homeTelephone}
              onChange={handleChange}
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Guardian Mobile */}
        <div className="mb-4">
          <Label htmlFor="guardianMobile">Guardian Mobile</Label>
          <div className="relative">
            <input
              type="number"
              name="guardianMobile"
              id="guardianMobile"
              value={studentData.guardianMobile}
              onChange={handleChange}
              required
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
        {/* Guardian Email */}
        <div className="mb-4">
          <Label htmlFor="guardianEmail">Guardian Email (optional)</Label>
          <div className="relative">
            <input
              type="email"
              name="guardianEmail"
              id="guardianEmail"
              value={studentData.guardianEmail}
              onChange={handleChange}
              className="input bg-gray-50 w-full box-border p-2 border-b border-gray-400 focus:outline-none focus:bg-[#4985e01f]"
            />
            <span className="input-border absolute bg-[#5891ff] h-0.5 bottom-0 left-0 transition-all duration-500 origin-left w-0" />
          </div>
        </div>
      </div>
      {loading ? (
        <Button disabled className="w-full">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700 w-full"
          disabled={!isFormValid}
        >
          Add Student
        </Button>
      )}
    </form>
  );
};

export default withAuth(AddStudentForm);
