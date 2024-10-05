"use client";

import { FaTimes } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { SidebarContext } from "./SidebarProvider";

import { authorize } from "@/lib/api";
import { Skeleton } from "./ui/skeleton";

const SideBar = () => {
  const [user, setUser] = useState(null);
  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();

  const { sidebarOpen, setSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    getUser();
    const pathSegments = pathname.split("/");
    const lastSegment = pathSegments[pathSegments.length - 1];
    setActiveLink(lastSegment);
  }, [pathname]);

  async function getUser() {
    try {
      const authRes = await authorize();
      setUser(authRes.user);
    } catch (error) {
      console.log(error);
    }
  }

  const navLinks = {
    student: [
      { link: "Main Info", icon: "" },
      { link: "Tables", icon: "" },
      { link: "Poll", icon: "" },
      { link: "Absence report", icon: "" },
      { link: "Course grades", icon: "" },
      { link: "Payment And Expenses", icon: "" },
      { link: "Academic registration", icon: "" },
      { link: "Results", icon: "" },
      { link: "Warnings", icon: "" },
      { link: "Student progress", icon: "" },
      { link: "Registration form", icon: "" },
      { link: "Academic warnings", icon: "" },
    ],
    moderator: [
      { link: "Students", icon: "" },
      { link: "Teachers", icon: "" },
      { link: "Tables", icon: "" },
    ],
    teacher: [
      { link: "Main Info", icon: "" },
      { link: "Tables", icon: "" },
      { link: "Poll", icon: "" },
      { link: "Absence report", icon: "" },
      { link: "Course grades", icon: "" },
      { link: "Electronic payment", icon: "" },
      { link: "Academic registration", icon: "" },
      { link: "Study expenses", icon: "" },
      { link: "Course results", icon: "" },
      { link: "Warning of an unregistered student", icon: "" },
      { link: "Student progress", icon: "" },
      { link: "Payment authorization", icon: "" },
      { link: "Registration form", icon: "" },
      { link: "Academic warnings", icon: "" },
      { link: "The result of military education", icon: "" },
    ],
  };

  return (
    <aside
      className={`fixed z-40 inset-y-0 left-0 bg-white shadow w-72 overflow-y-auto p-6 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:translate-x-0`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold border-b-4 border-dashed border-green-600">
          University System
        </h2>
        <button
          className="lg:hidden"
          onClick={() => {
            setSidebarOpen(false);
          }}
        >
          <FaTimes />
        </button>
      </div>
      <nav className="space-y-1 text-md">
        {user ? (
          (user.role === "student" &&
            navLinks.student.map((link, index) => (
              <Link
                key={index}
                href={`/student/${link.link
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
                className={`block p-2 rounded transition-colors duration-300 ${
                  activeLink === link.link.replace(/\s+/g, "-").toLowerCase()
                    ? "bg-green-600 text-white hover:bg-green-500"
                    : " bg-slate-100 hover:bg-slate-200"
                }
            `}
              >
                {link.link}
              </Link>
            ))) ||
          (user.role === "moderator" &&
            navLinks.moderator.map((link, index) => (
              <Link
                key={index}
                href={`/moderator/${link.link
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
                className={`block p-2 rounded transition-colors duration-300 ${
                  activeLink === link.link.replace(/\s+/g, "-").toLowerCase()
                    ? "bg-green-600 text-white hover:bg-green-500"
                    : " bg-slate-100 hover:bg-slate-200"
                }
            `}
              >
                {link.link}
              </Link>
            ))) ||
          (user.role === "teacher" &&
            navLinks.teacher.map((link, index) => (
              <Link
                key={index}
                href={`/teacher/${link.link
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
                className={`block p-2 rounded transition-colors duration-300 ${
                  activeLink === link.link.replace(/\s+/g, "-").toLowerCase()
                    ? "bg-green-600 text-white hover:bg-green-500"
                    : " bg-slate-100 hover:bg-slate-200"
                }
            `}
              >
                {link.link}
              </Link>
            )))
        ) : (
          <div className="flex flex-col gap-1">
            <Skeleton className="w-full h-8 rounded bg-slate-300" />
            <Skeleton className="w-full h-8 rounded bg-slate-300" />
            <Skeleton className="w-full h-8 rounded bg-slate-300" />
            <Skeleton className="w-full h-8 rounded bg-slate-300" />
            <Skeleton className="w-full h-8 rounded bg-slate-300" />
            <Skeleton className="w-full h-8 rounded bg-slate-300" />
            <Skeleton className="w-full h-8 rounded bg-slate-300" />
            <Skeleton className="w-full h-8 rounded bg-slate-300" />
            <Skeleton className="w-full h-8 rounded bg-slate-300" />
          </div>
        )}
      </nav>
    </aside>
  );
};

export default SideBar;
