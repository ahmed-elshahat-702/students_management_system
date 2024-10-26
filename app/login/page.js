import Form from "@/components/Form";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Form formRole="login" />
    </div>
  );
};

export default React.memo(page);
