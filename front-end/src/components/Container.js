import React from "react";

export default function Container({ children, className }) {
  return (
    <div className={`max-w-6xl h-full m-auto px-5 xl:px-0 ${className}`}>
      {children}
    </div>
  );
}
