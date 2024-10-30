import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authorize } from "./api";
import toast from "react-hot-toast";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await authorize();
          // If on login page and authorized, redirect to main page
          if (window.location.pathname === "/login") {
            router.push("/");
          }
          // Check if user was not previously authorized
          if (!sessionStorage.getItem("was authorized")) {
            sessionStorage.setItem("was authorized", "true");
            toast.success("Authorized Successfully, Welcome back!");
          }
        } catch (error) {
          // Clear any previous toasts and display a new error message
          toast.dismiss();
          toast.error("Authorization failed, redirecting to login...");
          router.push("/login");
        }
      };

      checkAuth();
    }, [router]); // Add router dependency

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
