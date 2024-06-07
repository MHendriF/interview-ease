import React from "react";
import CreateInterview from "./_components/CreateInterview";

export default function Dashboard(props: any) {
  const { children } = props;
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl text-primary">Dashboard</h2>
      <h2 className="text-gray-500">Create and Start your AI Mockup Interview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-5">
        <CreateInterview />
      </div>

      {/* Previous Interview List  */}
    </div>
  );
}
