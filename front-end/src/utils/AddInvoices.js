// Création d'une facture

// Recupère les données lors de l'appel à la fonction
export default async function addInvoices({
  token,
  userId,
  quantity,
  pricePerUnit,
  totalHt,
  tax,
  totalTtc,
}) {
  try {
    const response = await fetch("http://localhost:5000/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        quantity,
        pricePerUnit,
        totalHt,
        tax,
        totalTtc,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erreur HTTP lors de l'ajout de la facture :", errorData);
      throw new Error(errorData.error || "Erreur HTTP : " + response.status);
    }

    return await response.json(); // Retourne la réponse JSON en cas de succès
  } catch (error) {
    console.error("Erreur lors de l'ajout de la facture :", error.message);
    throw error;
  }
}
