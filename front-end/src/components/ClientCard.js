import React from "react";
import Icon from "../assets/svg/icon.svg";

export default function ClientCard({ client, className }) {
  return (
    <div className={`${className} bg-white transition-all`}>
      <div className="flex items-center gap-2">
        <div>
          <img
            src={Icon}
            alt="Icon"
            className="w-8 p-1 border-2 rounded-full h-8"
          />
        </div>
        <h2 className="text-lg font-semibold text-blue-500">
          {client.lastName} {client.firstName}
        </h2>
      </div>
      <p className="text-gray-600 italic uppercase font-semibold">
        {client.company}
      </p>
      <p className="text-gray-600">Email : {client.email}</p>
      <p className="text-gray-600">ID : {client.id}</p>
    </div>
  );
}
