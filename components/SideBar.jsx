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
    fetchUser();
    setActiveLink(getActiveLink(pathname));
  }, [pathname]);

  const fetchUser = async () => {
    try {
      const { user: authUser } = await authorize();
      setUser(authUser);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getActiveLink = (path) => {
    const pathSegments = path.split("/");
    return pathSegments[pathSegments.length - 1];
  };

  const navLinks = {
    student: [
      "Main Info",
      "Tables",
      "Poll",
      "Absence report",
      "Course grades",
      "Payment And Expenses",
      "Academic registration",
      "Results",
      "Warnings",
      "Student progress",
      "Registration form",
      "Academic warnings",
    ],
    moderator: ["Students", "Teachers", "Tables"],
    teacher: [
      "Main Info",
      "Tables",
      "Poll",
      "Absence report",
      "Course grades",
      "Electronic payment",
      "Academic registration",
      "Study expenses",
      "Course results",
      "Warning of an unregistered student",
      "Student progress",
      "Payment authorization",
      "Registration form",
      "Academic warnings",
      "The result of military education",
    ],
  };

  const renderNavLinks = (roleLinks, basePath) => {
    return roleLinks.map((link, index) => (
      <Link
        key={index}
        href={`/${basePath}/${link.replace(/\s+/g, "-").toLowerCase()}`}
        className={`block p-2 rounded transition-colors duration-300 ${
          activeLink === link.replace(/\s+/g, "-").toLowerCase()
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        {link}
      </Link>
    ));
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
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <FaTimes />
        </button>
      </div>
      <nav className="space-y-1 text-md">
        {user ? (
          user.role === "student" ? (
            renderNavLinks(navLinks.student, "student")
          ) : user.role === "moderator" ? (
            renderNavLinks(navLinks.moderator, "moderator")
          ) : user.role === "teacher" ? (
            renderNavLinks(navLinks.teacher, "teacher")
          ) : null
        ) : (
          <div className="flex flex-col gap-1">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-full h-8 rounded bg-gray-300"
              />
            ))}
          </div>
        )}
      </nav>
    </aside>
  );
};

export default SideBar;
