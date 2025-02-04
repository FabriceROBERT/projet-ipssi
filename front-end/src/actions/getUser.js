import { jwtDecode } from "jwt-decode";

export const getUser = async () => {
  // Récupére les tokens du localStorage
  const authToken = localStorage.getItem("token");
  const authToken2 = localStorage.getItem("authToken");

  if (!authToken && !authToken2) {
    throw new Error("Aucun token d'authentification trouvé.");
  }

  // Fonction pour récupérer l'utilisateur via un token
  const fetchUserWithToken = async (token) => {
    try {
      const decodedToken = jwtDecode(token); // Décoder le token
      const userId = decodedToken.id; // Récupérer l'ID utilisateur

      // Appeler l'API pour obtenir les informations de l'utilisateur
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Inclure le token dans les headers
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      const user = await response.json();
      return user;
    } catch (error) {
      console.error(`Erreur avec le token ${token}:`, error);
      throw error;
    }
  };
  // Essaie avec le second token si le premier échoue
  try {
    return await fetchUserWithToken(authToken);
  } catch (error) {
    console.warn("Premier token échoué, tentative avec le second...");
    if (authToken2) {
      return await fetchUserWithToken(authToken2);
    } else {
      throw new Error(
        "Impossible de récupérer l'utilisateur avec les tokens fournis."
      );
    }
  }
};
