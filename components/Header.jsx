"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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
import { SidebarTrigger } from "./ui/sidebar";
import { ThemeToggler } from "./ThemeToggler";

const Header = () => {
  const [user, setUser] = useState(null);

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
    <header className=" bg-background/80 backdrop-blur-lg border-b shadow-sm z-10">
      <div className="flex items-center justify-between p-4">
        {/* Sidebar Toggle and Page Title */}
        <div className="flex items-center space-x-4">
          <SidebarTrigger />

          <h1 className="text-lg font-semibold capitalize">
            {user ? user.role : "Loading..."}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggler />
          {/* User Profile and Dropdown */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full p-0"
                >
                  {user ? (
                    <div className="w-8 h-8 rounded-full mx-auto">
                      {user.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={`${user.fullName}'s Avatar`}
                          width={100}
                          height={100}
                          priority
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-200" />
                      )}
                    </div>
                  ) : (
                    <Skeleton className="w-9 h-9 rounded-full" />
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-48 bg-background shadow-lg rounded-md"
              >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Change Language
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
