import React from "react";

export default function DashboardContainer({ children, className }) {
  return (
    <div
      className={`max-w-6xl bg-zinc-200 p-6 rounded-lg shadow-lg h-full m-auto px-5 xl:px-0 ${className}`}
    >
      {children}
    </div>
  );
}
