import { jwtDecode } from "jwt-decode";

export const getUser = async () => {
  const authToken = localStorage.getItem("authToken"); // Récupére le token du localStorage

  if (!authToken) {
    throw new Error("Token d'authentification manquant.");
  }

  try {
    // Décoder le token pour obtenir l'ID utilisateur
    const decodedToken = jwtDecode(authToken);
    const userId = decodedToken.id;

    // Appeler l'API pour récupérer les informations de l'utilisateur
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`, // Inclure le token dans les headers
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de l'utilisateur.");
    }

    const user = await response.json();

    return user;
  } catch (error) {
    console.error("Erreur dans getUser :", error);
    throw new Error("Impossible de récupérer les données de l'utilisateur.");
  }
};
