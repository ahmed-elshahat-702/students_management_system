// withAuth.js
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
          await authorize();
          if (!sessionStorage.getItem("was authorized")) {
            sessionStorage.setItem("was authorized", "true");
            toast.success("Authorized Successfully, Welcome back");
          }
        } catch (error) {
          toast.dismiss();
          toast.error(error);
          router.push("/login");
        }
      };

      checkAuth();
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth; // Ensure this line is present
