import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { getUser } from "../actions/getUser";
import DashboardContainer from "../components/DashboardContainer";
import myClients from "../utils/MyClients";
import ClientCard from "../components/ClientCard";

export default function ClientsPage() {
  const [user, setUser] = useState(null);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      // Charge les clients
      myClients(token)
        .then((data) => {
          setClients(data);
        })
        .catch((err) => {
          setError("Erreur lors du chargement des clients.");
          console.error(err);
        });

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

  if (!user?.isAdmin) {
    navigate("/");
    return null;
  }

  // Filtre les clients pour exclure l'utilisateur connecté car il ne peut pas voir ses propres informations
  const filteredClients = clients.filter((client) => client.id !== user.id);

  return (
    <div>
      <Navbar user={user} />
      <div className="container mx-auto mt-8">
        <DashboardContainer>
          <h1 className="p-4 text-4xl">Mes clients</h1>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <ClientCard
                  key={client.id}
                  client={client}
                  className="border rounded-lg p-4 shadow hover:shadow-md"
                />
              ))
            ) : (
              <p>Aucun client trouvé.</p>
            )}
          </div>
        </DashboardContainer>
      </div>
    </div>
  );
}
