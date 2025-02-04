import React, { useState } from "react";
import toast from "react-hot-toast";
import deleteUser from "../utils/DeleteUser";
import signUpUser from "../utils/SignUpUser";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
import Paypal from "./Paypal";
import addInvoices from "../utils/AddInvoices";

export default function SignUp({ onClose }) {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    address: "",
    company: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isPayment, setIsPayment] = useState(false);
  const navigate = useNavigate();

  // Validation des champs
  const validEmail = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validPassword = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/;

  // Gestion du changement des champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fonction de validation du formulaire
  const validateForm = () => {
    if (
      !formData.lastName ||
      !formData.firstName ||
      !formData.address ||
      !formData.email ||
      !formData.company ||
      !formData.password
    ) {
      toast.error("Tous les champs sont requis.");
      return false;
    }

    if (!validEmail.test(formData.email)) {
      toast.error("Veuillez entrer une adresse email valide.");
      return false;
    }

    if (!validPassword.test(formData.password)) {
      toast.error(
        "Le mot de passe doit contenir au moins 6 caractères, dont un chiffre."
      );
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return false;
    }

    return true;
  };

  // Fonction pour calculer les données de la facture
  const calculateInvoiceData = (userId) => {
    const totalHt = 16; // Exemple de valeur fixe
    const tax = (totalHt * 20) / 100;
    const totalTtc = totalHt + tax;

    return {
      userId,
      quantity: 1,
      pricePerUnit: 2,
      totalHt,
      tax,
      totalTtc,
    };
  };

  // Réinitialisation des données du formulaire
  const resetForm = () => {
    setFormData({
      lastName: "",
      firstName: "",
      address: "",
      company: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setIsPayment(false);
    onClose();
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsPayment(true); // Passe à l'étape de paiement
  };

  // Gestion du succès du paiement
  const handlePaymentSuccess = async (details) => {
    try {
      // Inscription de l'utilisateur
      const res = await signUpUser({
        lastName: formData.lastName,
        firstName: formData.firstName,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        company: formData.company,
      });

      if (!res.success) {
        if (res.error === "L'utilisateur existe déjà.") {
          return toast.error("Un utilisateur avec cet email existe déjà.");
        } else {
          toast.error(
            res.error || "Une erreur est survenue lors de l'inscription."
          );
        }
        setIsPayment(false);
      }

      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.id);

      // Création de la facture
      const invoiceData = calculateInvoiceData(res.id);

      const invoiceRes = await addInvoices({
        token: res.token,
        ...invoiceData,
      });

      if (!invoiceRes) {
        throw new Error(
          invoiceRes.error || "Erreur lors de la création de la facture."
        );
      }

      const subscription = await fetch(
        "http://localhost:5000/api/subscriptions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${res.token}`,
          },
          body: JSON.stringify({
            userId: res.id,
            storageSize: 20,
            price: invoiceData.totalTtc,
            purchaseDate: new Date().toISOString(),
            invoiceId: invoiceRes.invoiceId,
          }),
        }
      );

      if (!subscription) {
        throw new Error(
          invoiceRes.error || "Erreur lors de la création de la facture."
        );
      }

      // Succès : Redirige vers le tableau de bord
      toast.success(
        `Merci ${details.payer.name.given_name}, votre inscription et votre paiement ont été effectués avec succès !`
      );
      navigate("/dashboard");
      resetForm(); // Réinitialise les données
    } catch (err) {
      console.error("Erreur après paiement :", err);
      toast.error(
        "Une erreur est survenue après le paiement. Veuillez réessayer."
      );

      // En cas d'erreur, supprime l'utilisateur créé
      if (formData.email) {
        await deleteUser(formData.email);
      }
      setIsPayment(false);
    }
  };

  // Gestion des erreurs de paiement
  const handlePaymentError = async (err) => {
    console.error("Erreur de paiement :", err);
    toast.error("Erreur lors du paiement. Veuillez réessayer.");
    if (formData.email) {
      await deleteUser(formData.email); // Supprime l'utilisateur en cas d'erreur
    }
    setIsPayment(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-[90%] sm:max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 pr-2 hover:text-black"
        >
          ✖
        </button>

        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-left">
          Inscription
        </h2>
        <p className="text-xl sm:text-2xl mb-4 text-center">Bienvenue !</p>

        {!isPayment ? (
          <form onSubmit={handleSubmit} className="space-y-2">
            <p className="text-center text-gray-600 mb-4">
              Remplissez ce formulaire pour obtenir 20Go de stockages.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lastName" className="block text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Entrez votre nom"
                  required
                />
              </div>
              <div>
                <label htmlFor="firstName" className="block text-gray-700">
                  Prénom
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Entrez votre prénom"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company" className="block text-gray-700">
                  Entreprise
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Entrez le nom votre entreprise"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-gray-700">
                  Adresse
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Entrez votre adresse"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez votre email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez votre mot de passe"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700">
                Confirmez votre mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none mb-4 focus:ring-2 focus:ring-blue-500"
                placeholder="Confirmez votre mot de passe"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-zinc-800 text-white rounded-full px-5 py-2"
            >
              S'abonner
            </button>
          </form>
        ) : (
          // Lorsque le formulaire est validé, passage au paiement avec Paypal
          <Paypal
            setIsPayment={setIsPayment}
            handlePaymentSuccess={handlePaymentSuccess}
            handlePaymentError={handlePaymentError}
          />
        )}
      </div>
    </div>
  );
}
