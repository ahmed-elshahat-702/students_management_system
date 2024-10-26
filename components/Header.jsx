"use client";

import React, { useEffect, useState, useContext } from "react";
import { SidebarContext } from "./SidebarProvider";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FaBars } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authorize } from "@/lib/api";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const [user, setUser] = useState(null);
  const { setSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { user: authUser } = await authorize();
      setUser(authUser);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <header className="header fixed top-0 left-0 w-full lg:pl-72 bg-white/75 border-b shadow">
      <div className="flex items-center justify-between p-4 w-full">
        <div className="flex items-center">
          {/* Sidebar toggle button for mobile */}
          <button
            className="lg:hidden text-xl text-gray-600 mr-4"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>
          <h1 className="font-bold text-xl capitalize">
            {user ? user.role : "User Role"}
          </h1>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="relative ml-auto flex-1 max-md:flex max-md:items-center max-md:justify-between md:grow-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  {user ? (
                    user.avatar ? (
                      <Image
                        src={user.avatar}
                        width={36}
                        height={36}
                        alt="User Avatar"
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gray-300"></div>
                    )
                  ) : (
                    <Skeleton className="w-full h-full rounded-full bg-gray-300" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Change Language
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Mode
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
