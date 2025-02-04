import React from "react";
import { Link } from "react-router-dom";
import generateInvoicePDF from "../utils/generateInvoicePDF";

export default function InvoiceCard({ invoice, user }) {
  const formattedDate = new Date(invoice.date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    // day: "numeric",
  });

  return (
    <div className="p-4">
      <div className="bg-zinc-900 text-white p-4 rounded-xl">
        <div className="flex items-center flex-row justify-between ">
          <div>Facture {invoice.id} </div>
          <div className="flex flex-row gap-5 justify-between items-center">
            <div>Facture du mois : {formattedDate} </div>
            <button
              onClick={() => generateInvoicePDF(invoice, user)}
              className="bg-white text-black px-4 py-2 rounded-md"
            >
              Télécharger
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
