export default async function signUpUser({
  lastName,
  firstName,
  email,
  password,
  company,
  address,
}) {
  // Validation des données côté client
  if (!lastName || !firstName || !email || !password || !address) {
    throw new Error("Tous les champs sont requis.");
  }

  const validEmail = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!validEmail.test(email)) {
    throw new Error("Adresse email invalide.");
  }

  const validPassword = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/;
  if (!validPassword.test(password)) {
    throw new Error(
      "Le mot de passe doit contenir au moins 6 caractères, dont un chiffre."
    );
  }

  try {
    const response = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lastName,
        firstName,
        email,
        password,
        company,
        address,
      }),
    });

    if (!response.ok) {
      // Affichage des erreurs retournées par l'API
      const errorData = await response.json();
      throw new Error(errorData.error || "Erreur lors de l'inscription.");
    }

    const data = await response.json();

    // Vérification de la réponse pour éviter des erreurs inattendues
    if (!data?.data?.token || !data?.data?.id) {
      throw new Error(
        "La réponse de l'API est invalide : Token ou ID manquant."
      );
    }

    // Retourne les données nécessaires (le stockage sera fait ailleurs)
    return {
      token: data.data.token,
      id: data.data.id,
    };
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error.message);
    throw error;
  }
}
