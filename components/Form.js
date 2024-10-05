"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { login } from "@/lib/api";

const Form = ({ formRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
  const passwordRegex = /^[A-Za-z\d@$!%*?&]{8,}$/;

  const Router = useRouter();

  function checkInfoValidity({ x, y }) {
    if (usernameRegex.test(x) && passwordRegex.test(y)) {
      return true;
    } else {
      return false;
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (checkInfoValidity({ x: username, y: password })) {
      setLoading(true);
      toast.loading("logging in...");
      try {
        const response = await login(username, password, role);
        if (response) {
          toast.dismiss();
          toast.success("login success");
          Router.push("/");
        }
      } catch (error) {
        toast.dismiss();
        toast.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("invalid username or password");
    }
  };

  (e) => {
    if (e.key === "Enter") {
      login(e);
    }
  };

  return (
    <form
      className="max-[450px]:w-full max-[450px]:h-full max-[450px]:flex max-[450px]:flex-col sm:w-[400px] md:min-w-[500px] max-w-1/3 p-6 md:p-12 rounded bg-white"
      onSubmit={formRole === "login" && ((e) => handleLogin(e))}
    >
      <div className="block text-center mb-6">
        <h1 className="text-center font-bold text-xl  border-b-4 border-green-600 border-dashed inline">
          {formRole}
        </h1>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <div className="border px-3 py-1 rounded w-full flex items-center gap-3">
            <FaUser />
            <Input
              type="text"
              placeholder="username"
              className="outline-none focus-visible:ring-0 border-none shadow-none m-0 p-0"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
            />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border rounded-full"></div>
            <p
              className={`text-sm text-gray-500 ${
                checkInfoValidity({ x: username })
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              username must be 3 to 15 characters.
            </p>
          </div>
        </div>
        <div>
          <div className="border px-3 py-2 rounded flex items-center justify-between">
            <div className=" w-full flex items-center gap-3">
              <FaLock />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="outline-none border-none focus-visible:ring-0 shadow-none m-0 p-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
            </div>
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
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border rounded-full"></div>
            <p
              className={`text-sm text-gray-500 ${
                checkInfoValidity({ y: password })
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              password must be at least 8 characters.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <div className="relative text-sm w-fit grid grid-cols-3 rounded bg-black/5 box-border shadow p-1">
            <label htmlFor="moderator" className="flex-1 text-center">
              <input
                type="radio"
                id="moderator"
                name="role"
                value="moderator"
                checked={role === "moderator"}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                className="hidden"
              />
              <span
                className={`flex cursor-pointer items-center justify-center rounded px-2 py-1 transition-all ${
                  role === "moderator"
                    ? "bg-white text-gray-900"
                    : "bg-transparent text-gray-600"
                }`}
              >
                Moderator
              </span>
            </label>

            <label htmlFor="teacher" className="flex-1 text-center">
              <input
                type="radio"
                id="teacher"
                name="role"
                value="teacher"
                checked={role === "teacher"}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                className="hidden"
              />
              <span
                className={`flex cursor-pointer items-center justify-center rounded px-2 py-1 transition-all ${
                  role === "teacher"
                    ? "bg-white text-gray-900"
                    : "bg-transparent text-gray-600"
                }`}
              >
                Teacher
              </span>
            </label>

            <label htmlFor="student" className="flex-1 text-center">
              <input
                type="radio"
                id="student"
                name="role"
                value="student"
                checked={role === "student"}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                className="hidden"
              />
              <span
                className={`flex cursor-pointer items-center justify-center rounded px-2 py-1 transition-all ${
                  role === "student"
                    ? "bg-white text-gray-900"
                    : "bg-transparent text-gray-600"
                }`}
              >
                Student
              </span>
            </label>
          </div>
        </div>
        {loading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button className="bg-green-600 hover:bg-green-700">Login</Button>
        )}
      </div>
    </form>
  );
};

export default Form;
