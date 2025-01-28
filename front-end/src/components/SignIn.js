import React, { useState } from "react";
import signInUser from "../utils/SignInUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignIn = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      const res = await signInUser(email, password);
      // Vérifie si le token est présent dans la réponse
      if (res?.id) {
        toast.success("Connexion réussie !");
        navigate("/dashboard");
      } else {
        // Si le token est absent, traitez cela comme une erreur
        throw new Error(res?.message || "Erreur lors de la connexion.");
      }
    } catch (err) {
      console.error("Erreur lors de la connexion :", err.message);
      toast.error(err.message || "Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-[90%] sm:max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 pr-2 hover:text-black"
          aria-label="Fermer la fenêtre de connexion"
        >
          ✖
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">
          Se connecter
        </h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              aria-invalid={!!error}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mot de passe"
              aria-invalid={!!error}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-lg text-white ${
              isLoading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Chargement..." : "Se connecter"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Pas de compte ? </span>
          <a href="/register" className="text-blue-500 hover:underline">
            Créer un compte
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
