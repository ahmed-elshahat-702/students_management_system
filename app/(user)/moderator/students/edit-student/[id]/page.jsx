// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import React, { useState, useEffect } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useRouter } from "next/navigation";
// import { Loader2 } from "lucide-react";
// import toast from "react-hot-toast";
// import withAuth from "@/lib/withAuth";
// import { useEdgeStore } from "@/lib/edgestore";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const EditStudentPage = ({ params }) => {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const { edgestore } = useEdgeStore();

//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//     level: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     avatar: "",
//   });

//   const [file, setFile] = useState(null);
//   const [progress, setProgress] = useState(0);

//   // Fetch student data on mount
//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const response = await fetch(`/api/students/${params.id}`);
//         const data = await response.json();
//         if (!response.ok) throw new Error(data.message);

//         setFormData({
//           username: data.username,
//           password: "", // Don't show existing password
//           level: data.level,
//           firstName: data.firstName,
//           lastName: data.lastName,
//           email: data.email,
//           phone: data.phone,
//           avatar: data.avatar,
//         });
//       } catch (error) {
//         toast.error("Error fetching student data");
//         router.push("/moderator/students");
//       } finally {
//         setInitialLoading(false);
//       }
//     };

//     fetchStudent();
//   }, [params.id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSelectChange = (value) => {
//     setFormData((prev) => ({
//       ...prev,
//       level: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files?.[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const submitData = new FormData();

//       // Only include password if it was changed
//       Object.entries(formData).forEach(([key, value]) => {
//         if (key === "password" && !value) return;
//         if (value) submitData.append(key, value);
//       });

//       // Handle file upload if new file selected
//       if (file) {
//         toast.loading(`Uploading Avatar...${progress}%`);
//         const res = await edgestore.publicFiles.upload({
//           file,
//           onProgressChange: (progress) => {
//             setProgress(progress);
//           },
//         });
//         submitData.append("avatar", res.url);
//         toast.dismiss();
//       }

//       const response = await fetch(`/api/students/${params.id}`, {
//         method: "PUT",
//         body: submitData,
//       });

//       const data = await response.json();

//       if (!response.ok) throw new Error(data.message);

//       toast.success("Student updated successfully");
//       router.push("/moderator/students");
//     } catch (error) {
//       toast.error(error.message || "Error updating student");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (initialLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="p-8 max-w-2xl mx-auto my-4 bg-background shadow-lg rounded-lg"
//     >
//       <h1 className="text-2xl font-bold mb-6">Edit Student</h1>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="username">Username</Label>
//           <Input
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//             placeholder="Enter username"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="password">
//             Password (leave empty to keep current)
//           </Label>
//           <div className="relative">
//             <Input
//               id="password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter new password"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2"
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="firstName">First Name</Label>
//           <Input
//             id="firstName"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//             placeholder="Enter first name"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="lastName">Last Name</Label>
//           <Input
//             id="lastName"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//             placeholder="Enter last name"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             placeholder="Enter email"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="phone">Phone</Label>
//           <Input
//             id="phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//             placeholder="Enter phone number"
//           />
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="level">Level</Label>
//           <Select
//             value={formData.level}
//             onValueChange={handleSelectChange}
//             required
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select level" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="Beginner">Beginner</SelectItem>
//               <SelectItem value="Intermediate">Intermediate</SelectItem>
//               <SelectItem value="Advanced">Advanced</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="space-y-2">
//           <Label htmlFor="avatar">Avatar</Label>
//           <Input
//             id="avatar"
//             name="avatar"
//             type="file"
//             onChange={handleFileChange}
//             accept="image/*"
//           />
//           {formData.avatar && (
//             <div className="mt-2">
//               <img
//                 src={formData.avatar}
//                 alt="Current avatar"
//                 className="w-20 h-20 object-cover rounded"
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="mt-6">
//         {loading ? (
//           <Button disabled className="w-full">
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//             Updating...
//           </Button>
//         ) : (
//           <Button type="submit" className="w-full">
//             Update Student
//           </Button>
//         )}
//       </div>
//     </form>
//   );
// };

// export default withAuth(EditStudentPage);

"use client";

import { useEffect, useState } from "react";
import { getStudentById } from "@/lib/api";
import StudentForm from "@/components/StudentForm";
import withAuth from "@/lib/withAuth";
import { useToast } from "@/hooks/use-toast";
const page = ({ params }) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const id = params.id;
        const data = await getStudentById(id);
        setStudent(data?.student);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error || "There was a problem with your request.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Student</h1>
      <StudentForm initialData={student} isEditMode={true} id={params.id} />
    </div>
  );
};

export default withAuth(page);
