import { jwtDecode } from "jwt-decode";

export default async function signInUser(email, password) {
  // Validation basique des données côté client
  if (!email || !password) {
    throw new Error("L'email et le mot de passe sont requis.");
  }

  try {
    const response = await fetch("http://localhost:5000/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Vérification du statut HTTP
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erreur lors de la connexion.");
    }

    const data = await response.json();
    console.log("Réponse du serveur :", data);

    // Vérification de la présence du token dans la réponse
    if (data && data.token) {
      localStorage.setItem("authToken", data.token); // Stocker le token

      // Décode le token pour récupérer l'ID utilisateur
      const decodedToken = jwtDecode(data.token);
      console.log("ID utilisateur décodé :", decodedToken.id); // ID utilisateur

      return decodedToken; // Renvoie les informations décodées si nécessaire
    } else {
      throw new Error("Token manquant dans la réponse.");
    }
  } catch (error) {
    console.log("Erreur lors de la connexion :", error.message);
    throw error;
  }
}
