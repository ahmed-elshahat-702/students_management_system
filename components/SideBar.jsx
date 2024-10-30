"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { authorize } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton"; // Using the normal Skeleton component
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";

const navLinks = {
  student: [
    "Main Info",
    "Tables",
    "Poll",
    "Absence Report",
    "Course Grades",
    "Payment and Expenses",
    "Academic Registration",
    "Results",
    "Warnings",
    "Student Progress",
    "Registration Form",
    "Academic Warnings",
  ],
  moderator: ["Students", "Teachers", "Tables"],
  teacher: [
    "Main Info",
    "Tables",
    "Poll",
    "Absence Report",
    "Course Grades",
    "Electronic Payment",
    "Academic Registration",
    "Study Expenses",
    "Course Results",
    "Warning of Unregistered Student",
    "Student Progress",
    "Payment Authorization",
    "Registration Form",
    "Academic Warnings",
    "Military Education Result",
  ],
};

const SideBar = () => {
  const [user, setUser] = useState(null);
  const [activeLink, setActiveLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { user: authUser } = await authorize();
        setUser(authUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    setActiveLink(getActiveLink(pathname));
  }, [pathname]);

  const getActiveLink = (path) => {
    const pathSegments = path.split("/");
    return pathSegments[pathSegments.length - 1];
  };

  const renderNavLinks = (roleLinks, basePath) =>
    roleLinks.map((link, index) => {
      const formattedLink = link.replace(/\s+/g, "-").toLowerCase();
      const isActive = activeLink === formattedLink;

      return (
        <Link
          key={index}
          href={`/${basePath}/${formattedLink}`}
          className={`group flex items-center p-2 rounded-md transition-all duration-300 ${
            isActive
              ? "bg-foreground dark:bg-secondary font-medium"
              : " hover:bg-secondary"
          }`}
        >
          <span
            className={`text-md ${isActive ? "text-white" : "text-gray-600"}`}
          >
            {link}
          </span>
        </Link>
      );
    });

  const navLinksToRender = useMemo(() => {
    if (loading) {
      return (
        <SidebarMenuItem className="space-y-1">
          <Skeleton className="h-5 w-full" style={{ width: "90%" }} />
          <Skeleton className="h-5 w-full" style={{ width: "70%" }} />
          <Skeleton className="h-5 w-full" style={{ width: "80%" }} />
          <Skeleton className="h-5 w-full" style={{ width: "40%" }} />
          <Skeleton className="h-5 w-full" style={{ width: "30%" }} />
          <Skeleton className="h-5 w-full" style={{ width: "40%" }} />
          <Skeleton className="h-5 w-full" style={{ width: "60%" }} />
          <Skeleton className="h-5 w-full" style={{ width: "30%" }} />
          <Skeleton className="h-5 w-full" style={{ width: "70%" }} />
          <Skeleton className="h-5 w-full" style={{ width: "90%" }} />
          <Skeleton className="h-5 w-full" style={{ width: "30%" }} />
          <Skeleton className="h-5 w-full" style={{ width: "50%" }} />
          <Skeleton className="h-5 w-full" style={{ width: "30%" }} />
          <Skeleton className="h-5 w-full" style={{ width: "70%" }} />
          <Skeleton className="h-5 w-full" style={{ width: "40%" }} />
          <Skeleton className="h-5 w-full" style={{ width: "80%" }} />
          <Skeleton className="h-5 w-full" style={{ width: "50%" }} />
          <Skeleton className="h-5 w-full" style={{ width: "70%" }} />
          <Skeleton className="h-5 w-full" style={{ width: "60%" }} />
          <Skeleton className="h-5 w-full" style={{ width: "80%" }} />
        </SidebarMenuItem>
      );
    }

    if (user) {
      switch (user.role) {
        case "student":
          return renderNavLinks(navLinks.student, "student");
        case "moderator":
          return renderNavLinks(navLinks.moderator, "moderator");
        case "teacher":
          return renderNavLinks(navLinks.teacher, "teacher");
        default:
          return null;
      }
    }

    return <p className="text-gray-600">No user data available.</p>;
  }, [loading, user, activeLink]);

  return (
    <Sidebar className="bg-background/80 backdrop-blur-lg border-r shadow-sm">
      <SidebarHeader className="my-3">
        <h1 className="text-lg font-semibold">University System</h1>
      </SidebarHeader>
      <SidebarSeparator className="bg-secondary" />
      <SidebarContent className="py-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{navLinksToRender}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator className="bg-secondary" />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <span className="text-sm">Coded by: Ahmed Elshahat</span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
