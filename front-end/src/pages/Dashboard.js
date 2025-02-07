import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { getUser } from "../actions/getUser";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import DashboardContainer from "../components/DashboardContainer";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const token = localStorage.getItem("token");

    if (authToken || token) {
      // Appel à la fonction getUser
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

  // Je pourrais également mettre un loading spinner ici
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  const handleDeleteAccount = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
      fetch(`http://localhost:5000/api/users/${user.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Correction ici
        },
      })
        .then((response) => {
          if (response.ok) {
            // Suppression des données utilisateur
            localStorage.removeItem("token");
            localStorage.removeItem("authToken");
            localStorage.removeItem("userId");
            toast.success("Votre compte a été supprimé avec succès.");
            navigate("/");
          } else {
            console.error("Échec de la suppression du compte.");
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression du compte:", error);
        });
    }
  };

  // S'il n'est pas connecté, on redirige vers la page d'accueil ou que le token expire
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className=" mb-5 text-lg text-center font-semibold">
          Veuillez vous reconnecter {""} <br></br> {error}
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

  // Si l'utilisateur n'est pas connecté, on le redirige vers la page d'accueil
  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div>
      {/* Passe les données de l'utilisateur au composant Navbar */}
      <Navbar user={user} />
      {/* Si l'utilisateur est un administrateur, on affiche le tableau de bord */}
      {user.isAdmin ? (
        <div className="container mx-auto mt-8">
          <DashboardContainer>
            <h1 className=" p-4 text-4xl">Tableau de bord</h1>
            <hr className=" size-[1px] w-full bg-black" />

            <div className="p-4 mb-5 flex flex-wrap justify-between">
              <div>
                <Link
                  to={"/dashboard/clients"}
                  className="bg-zinc-800 text-white rounded-xl px-5 py-2"
                >
                  Voir mes clients
                </Link>
              </div>
              <div className="">
                <Link
                  to={"/dashboard/files"}
                  className="bg-zinc-800 text-white rounded-xl px-5 py-2"
                >
                  Gérer mes fichiers
                </Link>
              </div>
              <div className="">
                <Link
                  to={"/dashboard/invoices"}
                  className="bg-zinc-800 text-white rounded-xl px-5 py-2"
                >
                  Voir mes factures
                </Link>
              </div>
              <div className="">
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-800 text-white rounded-xl px-5 py-2"
                >
                  Supprimer mon compte
                </button>
              </div>
            </div>

            <p>
              • D'avoir la liste des clients ainsi que le volume de stockage
              utilisé et disponible • D'avoir une vision sur tous les fichiers
              des clients • D'avoir un tableau de bord avec des statistiques
            </p>
          </DashboardContainer>
        </div>
      ) : (
        // Si l'utilisateur n'est pas un administrateur, on affiche le tableau de bord
        <div className="container mx-auto mt-8">
          <h1 className=" text-3xl font-semibold p-10">
            Bonjour, {user.firstName}{" "}
          </h1>

          <DashboardContainer>
            <h1 className=" p-4 text-4xl">Tableau de bord</h1>
            <hr className=" size-[1px] w-full bg-black" />
            <div className="p-4">
              <div className=" p-4 my-5 flex flex-row justify-between items-center content-center">
                <div className="">
                  <Link
                    to={"/dashboard/files"}
                    className="bg-zinc-800 text-white rounded-xl px-5 py-2"
                  >
                    Gérer mes fichiers
                  </Link>
                </div>
                <div className="">
                  <Link
                    to={"/dashboard/invoices"}
                    className="bg-zinc-800 text-white rounded-xl px-5 py-2"
                  >
                    Voir mes factures
                  </Link>
                </div>
                <div className="">
                  <button
                    onClick={handleDeleteAccount}
                    className="bg-red-800 text-white rounded-xl px-5 py-2"
                  >
                    Supprimer mon compte
                  </button>
                </div>
              </div>
              <p>
                • Visualiser les fichiers uploadés • Uploader de nouveaux
                fichiers • Supprimer des fichiers • De supprimer son compte
              </p>
            </div>
          </DashboardContainer>
        </div>
      )}
    </div>
  );
}
