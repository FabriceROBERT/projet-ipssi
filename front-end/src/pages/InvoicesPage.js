import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import InvoiceCard from "../components/InvoiceCard";
import { getUser } from "../actions/getUser";
import DashboardContainer from "../components/DashboardContainer";

export default function InvoicesPage() {
  const [user, setUser] = useState(null);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const token = localStorage.getItem("token");

    if (token || authToken) {
      // Charge les informations de l'utilisateur
      getUser()
        .then((fetchedUser) => {
          setUser(fetchedUser);
        })
        .catch((err) => {
          setError(
            err.message ||
              "Une erreur est survenue lors de la récupération des données."
          );
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError("Token d'authentification manquant.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const authToken = localStorage.getItem("authToken");

    const userId = localStorage.getItem("userId");

    const fetchInvoices = async () => {
      if (!token) {
        setError("Token d'authentification manquant.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/invoices/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des factures.");
        }

        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des factures :", error);
        setError(
          error.message || "Erreur lors de la récupération des factures."
        );
      }
    };

    fetchInvoices();
  }, []);

  console.log(invoices);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="mb-5 text-lg text-center font-semibold">
          {error}. Veuillez vous reconnecter.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-zinc-800 border-2 border-white text-white rounded-full px-5 py-2"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div>
      <Navbar user={user} />
      <div className="container mx-auto mt-8">
        <DashboardContainer>
          {/* Utilisation des factures récupérées */}
          <div>
            <h1 className=" p-4 text-4xl">Mes factures</h1>
            <hr className=" size-[1px] w-full bg-black" />
            {invoices.length === 0 ? (
              <p>Aucune facture disponible.</p>
            ) : (
              <ul>
                {invoices.map((invoice) => (
                  // <Link to={` ${invoice.id}`} key={invoice.id}>
                  <InvoiceCard key={invoice.id} user={user} invoice={invoice} />
                  // </Link>
                  // <li key={invoice.id}>
                  //   Facture #{invoice.id} - {invoice.totalTtc} €
                  // </li>
                ))}
              </ul>
            )}
          </div>
        </DashboardContainer>
      </div>
    </div>
  );
}
