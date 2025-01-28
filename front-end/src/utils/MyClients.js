// Fonnction pour récupérer les utilisateurs depuis l'API

export default async function myClients(token) {
  try {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // J'inclus le token JWT dans l'en-tête
      },
    });

    // Si la requête est réussie (statut HTTP 2xx)
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json(); // Retourne les données JSON de la réponse
  } catch (error) {
    console.log("Erreur lors de la récupération des utilisateurs:", error);
    throw error;
  }
}
