import React from "react";

// Suppression de l'utilisateur dès l'echec du paiement
export default async function deleteUser(email) {
  try {
    const response = await fetch("http://localhost:5000/api/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return await response.json();
  } catch (error) {
    console.log("Erreur lors de la suppression de l'utilisateur:", error);
    throw error;
  }
}
