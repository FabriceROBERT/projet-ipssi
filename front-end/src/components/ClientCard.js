import React from "react";

export default function ClientCard({ client, className }) {
  return (
    <div className={`${className} bg-white transition-all`}>
      <h2 className="text-lg font-semibold text-blue-500">
        {client.lastName} {client.firstName}
      </h2>
      <p className="text-gray-600">Email : {client.email}</p>
      <p className="text-gray-600">ID : {client.id}</p>
    </div>
  );
}
