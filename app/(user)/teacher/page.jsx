"use client";

import withAuth from "@/lib/withAuth";
import React from "react";

const page = () => {
  return <div>page</div>;
};

export default withAuth(page);
