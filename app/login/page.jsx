"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { login } from "@/lib/api";
import { ThemeToggler } from "@/components/ThemeToggler";
import withAuth from "@/lib/withAuth";

const page = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const Router = useRouter();

  const [errors, setErrors] = useState({
    usernameOrEmail: "",
    password: "",
    role: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { usernameOrEmail: "", password: "", role: "" };

    if (!usernameOrEmail) {
      newErrors.usernameOrEmail = "Username or email is required";
      isValid = false;
    } else if (/@/.test(usernameOrEmail)) {
      // Email validation
      if (!/\S+@\S+\.\S+/.test(usernameOrEmail)) {
        newErrors.usernameOrEmail = "Enter a valid email address";
        isValid = false;
      }
    } else {
      // Username validation
      if (usernameOrEmail.length < 3 || usernameOrEmail.length > 15) {
        newErrors.usernameOrEmail =
          "Username must be between 3 and 15 characters";
        isValid = false;
      }
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!role) {
      newErrors.role = "Please select a role";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await login(usernameOrEmail, password, role);
      if (response) {
        toast({
          title: "Login Successful",
          description: `Logged in as ${role}`,
        });
        Router.push("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error || "There was a problem with your request.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-full max-w-md relative bg-background border-none">
        <ThemeToggler className="absolute top-2 right-2" />

        <CardHeader>
          <CardTitle>University Management System</CardTitle>
          <CardDescription>Login to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="usernameOrEmail">Username or Email</Label>
              <Input
                id="usernameOrEmail"
                type="text"
                placeholder="Enter your username or email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                className={`${
                  errors.usernameOrEmail ? "border-red-500" : ""
                } bg-background`}
              />
              {errors.usernameOrEmail && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.usernameOrEmail}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${
                    errors.usernameOrEmail ? "border-red-500 pr-10" : "pr-10"
                  } bg-background`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <div className="grid grid-cols-3 gap-4">
                {["Student", "Teacher", "Moderator"].map((option) => (
                  <Button
                    key={option}
                    type="button"
                    variant={
                      role === option.toLowerCase() ? "default" : "outline"
                    }
                    className={`w-full justify-start ${
                      role === option.toLowerCase()
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                    onClick={() => setRole(option.toLowerCase())}
                  >
                    {role === option.toLowerCase() && (
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                    )}
                    {option}
                  </Button>
                ))}
              </div>
              {errors.role && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.role}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default withAuth(page);
