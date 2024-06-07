import React from "react";
import Header from "@/components/Header";

export default function DashboardLayout(props: any) {
  const { children } = props;
  return (
    <div>
      <Header />
      <div className="mx-5 md:mx-20 lg:mx-36">{children}</div>
    </div>
  );
}
