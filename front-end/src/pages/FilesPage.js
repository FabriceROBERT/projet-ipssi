import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import InvoiceCard from "../components/InvoiceCard";
import { getUser } from "../actions/getUser";
import DashboardContainer from "../components/DashboardContainer";
import { handleFileUpload } from "../utils/handleFileUpload"; // Importation de la fonction d'upload
import FileCard from "../components/FileCard";

export default function FilesPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  // États pour recherche, tri et filtres
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("uploadA"); // Tri par date par défaut
  const [filterByFormat, setFilterByFormat] = useState("all"); // Tous les formats

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const authToken = localStorage.getItem("authToken");

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

    const fetchFiles = async () => {
      // if (!token ) {
      //   setError("Token d'authentification manquant.");
      //   return;
      // }

      try {
        const response = await fetch(
          `http://localhost:5000/api/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des fichiers :", error);
        setError(
          error.message || "Erreur lors de la récupération des fichiers."
        );
      }
    };

    fetchFiles();
  }, []);

  // Fonction de tri et de filtrage des fichiers

  const filteredAndSortedFiles = files
    .filter(
      (file) => file.fileName.toLowerCase().includes(searchQuery.toLowerCase()) // Recherche par nom
    )
    .filter(
      (file) =>
        filterByFormat === "all" ||
        file.fileType.toLowerCase() === filterByFormat
    ) // Filtre format
    .sort((a, b) => {
      if (sortBy === "date") {
        // Vérifie si 'uploadedAt' existe
        const dateA = a.uploadedAt ? new Date(a.uploadedAt) : new Date(0); // Date par défaut si 'uploadedAt' est manquant
        const dateB = b.uploadedAt ? new Date(b.uploadedAt) : new Date(0); // Date par défaut si 'uploadedAt' est manquant
        return dateB - dateA; // Tri par date
      }
      if (sortBy === "size") {
        return b.fileSize - a.fileSize; // Tri par taille
      }
      return 0;
    });

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
          <div>
            <h1 className="p-4 text-4xl">Mes Fichiers</h1>
            <hr className="size-[1px] w-full bg-black" />

            {/* Barre de recherche, tri et filtres */}
            <div className=" p-4 flex gap-4 mb-4">
              {/* Recherche par nom */}
              <input
                type="text"
                placeholder="Rechercher un fichier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border px-3 py-2 rounded"
              />

              {/* Sélecteur de tri */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border px-3 py-2 rounded"
              >
                <option value="date">Trier par date</option>
                <option value="size">Trier par poids</option>
              </select>

              {/* Sélecteur de filtre par format */}
              <select
                value={filterByFormat}
                onChange={(e) => setFilterByFormat(e.target.value)}
                className="border px-3 py-2 rounded"
              >
                <option value="all">Tous les formats</option>
                <option value="pdf">PDF</option>
                <option value="jpg">JPG</option>
                <option value="png">PNG</option>
              </select>

              {/* Bouton de téléchargement de fichiers */}
              <button
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                }
                className="bg-zinc-800 text-white rounded-full px-5 py-2"
              >
                Ajouter un fichier
              </button>
              <input
                type="file"
                // accept=".pdf,.jpg,.png"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Affichage des fichiers triés et filtrés */}
            <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-4">
              {filteredAndSortedFiles.length > 0 ? (
                filteredAndSortedFiles.map((file) => (
                  <FileCard key={file._id} file={file} />
                ))
              ) : (
                <p className="p-4 text-gray-500">Aucun fichier trouvé.</p>
              )}
            </div>
          </div>
        </DashboardContainer>
      </div>
    </div>
  );
}
