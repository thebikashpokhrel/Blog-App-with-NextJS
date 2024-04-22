import AdminNav from "@/components/navbar/AdminNav";
import React, { ReactElement } from "react";

export default function adminLayout({ children }: { children: ReactElement }) {
  return (
    <>
      <AdminNav />
      {children}
    </>
  );
}
