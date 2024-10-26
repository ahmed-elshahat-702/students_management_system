"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { login } from "@/lib/api";
import { debounce } from "lodash";

const Form = ({ formRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
  const passwordRegex = /^[A-Za-z\d@$!%*?&]{8,}$/;

  const Router = useRouter();

  // Debounced function for username to reduce excessive state updates
  const handleUsernameChange = useMemo(
    () =>
      debounce((value) => {
        setUsername(value.toLowerCase());
      }, 300),
    []
  );

  const isFormValid = useMemo(
    () => usernameRegex.test(username) && passwordRegex.test(password),
    [username, password]
  );

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      setLoading(true);
      toast.loading("Logging in...");
      try {
        const response = await login(username, password, role);
        if (response) {
          toast.dismiss();
          toast.success("Login success");
          Router.push("/");
        }
      } catch (error) {
        toast.dismiss();
        toast.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form
      className="max-[450px]:w-full max-[450px]:h-full max-[450px]:flex max-[450px]:flex-col sm:w-[400px] md:min-w-[500px] max-w-1/3 p-6 md:p-12 rounded bg-white shadow-md"
      onSubmit={formRole === "login" && handleLogin}
    >
      <div className="block text-center mb-6">
        <h1 className="text-center font-bold text-xl  border-b-4 border-green-600 border-dashed inline">
          {formRole}
        </h1>
      </div>
      <div className="flex flex-col gap-5">
        {/* Username Field */}
        <div>
          <div className="border px-3 py-1 rounded w-full flex items-center gap-3">
            <FaUser />
            <Input
              type="text"
              placeholder="Username"
              className="outline-none focus-visible:ring-0 border-none shadow-none m-0 p-0"
              onChange={(e) => handleUsernameChange(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 border rounded-full"></div>
            <p
              className={`text-sm ${
                username
                  ? usernameRegex.test(username)
                    ? "text-green-600"
                    : "text-red-600"
                  : "text-gray-500"
              }`}
            >
              Username must be 3 to 15 characters.
            </p>
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="border px-3 py-2 rounded flex items-center justify-between">
            <div className="w-full flex items-center gap-3">
              <FaLock />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="outline-none border-none focus-visible:ring-0 shadow-none m-0 p-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
              className={`text-sm ${
                password
                  ? passwordRegex.test(password)
                    ? "text-green-600"
                    : "text-red-600"
                  : "text-gray-500"
              }`}
            >
              Password must be at least 8 characters.
            </p>
          </div>
        </div>

        {/* Role Selection */}
        <div className="flex items-center justify-center w-full">
          <div className="relative text-sm w-fit grid grid-cols-3 rounded bg-black/10 box-border shadow p-1">
            {["student", "teacher", "moderator"].map((item) => (
              <label key={item} htmlFor={item} className="flex-1 text-center">
                <input
                  type="radio"
                  id={item}
                  name="role"
                  value={item}
                  checked={role === item}
                  onChange={(e) => setRole(e.target.value)}
                  className="hidden"
                />
                <span
                  className={`flex cursor-pointer items-center justify-center rounded px-2 py-1 transition-all ${
                    role === item
                      ? "bg-white text-gray-900 font-semibold shadow"
                      : "bg-transparent text-gray-500"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        {loading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700"
            disabled={!isFormValid}
          >
            Login
          </Button>
        )}
      </div>
    </form>
  );
};

export default Form;
