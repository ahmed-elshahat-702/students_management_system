"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useEdgeStore } from "@/lib/edgestore";
import { addStudent, updateStudent } from "@/lib/api";

export default function StudentForm({ initialData, isEditMode, id }) {
  const [studentData, setStudentData] = useState(
    () =>
      initialData || {
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
      }
  );

  // Convert all dates to ISO format
  const formattedDates = {
    birthdate: studentData.birthdate
      ? new Date(studentData.birthdate).toISOString().split("T")[0]
      : "",
    releaseDate: studentData.releaseDate
      ? new Date(studentData.releaseDate).toISOString().split("T")[0]
      : "",
  };

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const router = useRouter();
  const { toast } = useToast();
  const { edgestore } = useEdgeStore();

  useEffect(() => {
    if (initialData) {
      setStudentData(initialData);
    }
  }, [initialData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFileChange = useCallback((e) => {
    setFile(e.target.files?.[0]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(studentData).forEach(([key, value]) => {
        if (key === "password" && !value) return;
        formData.append(key, value);
      });

      if (file) {
        await uploadAvatar(formData);
      }

      await saveStudentData(formData);
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (formData) => {
    try {
      toast({
        title: "Uploading Avatar...",
        description: `Progress: ${progress}%`,
      });
      const res = isEditMode
        ? await edgestore.publicFiles.upload({
            file,
            options: {
              replaceTargetUrl: studentData.avatar,
            },
            onProgressChange: (progress) => {
              setProgress(progress);
            },
          })
        : await edgestore.publicFiles.upload({
            file,
            onProgressChange: (progress) => {
              setProgress(progress);
            },
          });
      formData.append("avatar", res.url);
    } catch (error) {
      showErrorToast(error);
    }
  };

  const saveStudentData = async (formData) => {
    try {
      toast({
        title: isEditMode ? "Updating Student..." : "Adding Student...",
      });
      const response = isEditMode
        ? await updateStudent(id, formData)
        : await addStudent(formData);
      toast({
        title: "Successfully",
        description: response.message,
      });
      router.push("/moderator/students");
    } catch (error) {
      showErrorToast(error);
    }
  };

  const showErrorToast = (error) => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: error || "There was a problem with your request.",
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditMode ? "Edit Student" : "Add Student"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={studentData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={studentData.password}
                  onChange={handleChange}
                  required={!isEditMode}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select
                name="level"
                value={studentData.level}
                onValueChange={(value) =>
                  handleChange({ target: { name: "level", value } })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7].map((level) => (
                    <SelectItem key={level} value={level.toString()}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              {file ? (
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Avatar preview"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <p className="text-sm text-muted-foreground">Preview</p>
                </div>
              ) : studentData.avatar ? (
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={studentData.avatar}
                    alt="Current avatar"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <p className="text-sm text-muted-foreground">Current</p>
                </div>
              ) : null}
              <Label htmlFor="avatar">Avatar (optional)</Label>
              <Input
                type="file"
                about="image/png, image/jpeg, image/jpg"
                name="avatar"
                id="avatar"
                onChange={handleFileChange}
                className="border-none p-1 shadow-none file:mr-4 file:py-1 file:px-4 file:bg-secondary file:rounded-full file:border-0 file:text-sm file:font-semibold  cursor-pointer file:cursor-pointer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={studentData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                name="code"
                value={studentData.code}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Select
                name="nationality"
                value={studentData.nationality}
                onValueChange={(value) =>
                  handleChange({ target: { name: "nationality", value } })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Egypt">Egypt</SelectItem>
                  <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                  {/* Add more nationalities as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                name="gender"
                value={studentData.gender}
                onValueChange={(value) =>
                  handleChange({ target: { name: "gender", value } })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="religion">Religion</Label>
              <Select
                name="religion"
                value={studentData.religion}
                onValueChange={(value) =>
                  handleChange({ target: { name: "religion", value } })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Religion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Islam">Islam</SelectItem>
                  <SelectItem value="Christianity">Christianity</SelectItem>
                  <SelectItem value="Judaism">Judaism</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthdate">Birthdate</Label>
              <Input
                id="birthdate"
                name="birthdate"
                type="date"
                value={
                  isEditMode ? formattedDates.birthdate : studentData.birthdate
                }
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="PlaceOfBirth">Place of Birth</Label>
              <Input
                id="PlaceOfBirth"
                name="PlaceOfBirth"
                value={studentData.PlaceOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nationalID">National ID</Label>
              <Input
                id="nationalID"
                name="nationalID"
                value={studentData.nationalID}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="releaseDate">Release Date</Label>
              <Input
                id="releaseDate"
                name="releaseDate"
                type="date"
                value={
                  isEditMode
                    ? formattedDates.releaseDate
                    : studentData.releaseDate
                }
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="placeOfRelease">Place of Release</Label>
              <Input
                id="placeOfRelease"
                name="placeOfRelease"
                value={studentData.placeOfRelease}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={studentData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={studentData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                value={studentData.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={studentData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fax">Fax</Label>
              <Input
                id="fax"
                name="fax"
                value={studentData.fax}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mailBox">Mail Box</Label>
              <Input
                id="mailBox"
                name="mailBox"
                value={studentData.mailBox}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="systemMail">System Mail</Label>
              <Input
                id="systemMail"
                name="systemMail"
                value={studentData.systemMail}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="school">School</Label>
              <Input
                id="school"
                name="school"
                value={studentData.school}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification</Label>
              <Input
                id="qualification"
                name="qualification"
                value={studentData.qualification}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="graduationYear">Graduation Year</Label>
              <Input
                id="graduationYear"
                name="graduationYear"
                value={studentData.graduationYear}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="theRoleOfTheQualification">
                The Role of the Qualification
              </Label>
              <Input
                id="theRoleOfTheQualification"
                name="theRoleOfTheQualification"
                value={studentData.theRoleOfTheQualification}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalScores">Total Scores</Label>
              <Input
                id="totalScores"
                name="totalScores"
                value={studentData.totalScores}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ratio">Ratio</Label>
              <Input
                id="ratio"
                name="ratio"
                value={studentData.ratio}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sittingNumber">Sitting Number</Label>
              <Input
                id="sittingNumber"
                name="sittingNumber"
                value={studentData.sittingNumber}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coordinationApprovalNumber">
                Coordination Approval Number
              </Label>
              <Input
                id="coordinationApprovalNumber"
                name="coordinationApprovalNumber"
                value={studentData.coordinationApprovalNumber}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coordinationApprovalDate">
                Coordination Approval Date
              </Label>
              <Input
                id="coordinationApprovalDate"
                name="coordinationApprovalDate"
                type="date"
                value={studentData.coordinationApprovalDate}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thePartyFromWhichItIsTransferred">
                The Party From Which It Is Transferred
              </Label>
              <Input
                id="thePartyFromWhichItIsTransferred"
                name="thePartyFromWhichItIsTransferred"
                value={studentData.thePartyFromWhichItIsTransferred}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearOfEnrollment">Year of Enrollment</Label>
              <Input
                id="yearOfEnrollment"
                name="yearOfEnrollment"
                value={studentData.yearOfEnrollment}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desires">Desires</Label>
              <Input
                id="desires"
                name="desires"
                value={studentData.desires}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guardianName">Guardian Name</Label>
              <Input
                id="guardianName"
                name="guardianName"
                value={studentData.guardianName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guardianJob">Guardian Job</Label>
              <Input
                id="guardianJob"
                name="guardianJob"
                value={studentData.guardianJob}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guardianCity">Guardian City</Label>
              <Input
                id="guardianCity"
                name="guardianCity"
                value={studentData.guardianCity}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guardianAddress">Guardian Address</Label>
              <Input
                id="guardianAddress"
                name="guardianAddress"
                value={studentData.guardianAddress}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="homeTelephone">Home Telephone</Label>
              <Input
                id="homeTelephone"
                name="homeTelephone"
                value={studentData.homeTelephone}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guardianMobile">Guardian Mobile</Label>
              <Input
                id="guardianMobile"
                name="guardianMobile"
                type="tel"
                value={studentData.guardianMobile}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guardianEmail">Guardian Email</Label>
              <Input
                id="guardianEmail"
                name="guardianEmail"
                type="email"
                value={studentData.guardianEmail}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : isEditMode ? (
                "Update Student"
              ) : (
                "Add Student"
              )}
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="flex-2"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
