import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { getUser } from "../actions/getUser";
import Container from "../components/Container";
import Header from "../components/Header";
import Image1 from "../assets/img/6606e1c2149571f85bd4d57e_header-form-image.avif";
import SignUp from "../components/SignUp";
import MarqueeComponent from "../components/MarqueeComponent";
import SignIn from "../components/SignIn";

export default function Home() {
  // État pour suivre la taille de l'écran
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  // État pour gérer l'ouverture du formulaire d'inscription
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Gestion du redimensionnement de l'écran
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // Détection des grands écrans
    };

    window.addEventListener("resize", handleResize);

    // Nettoyage de l'écouteur d'événements au démontage
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fonction pour basculer l'état d'ouverture du formulaire
  const handleSignUp = () => {
    setOpenSignUp((prev) => !prev);
  };
  const handleSignIn = () => {
    setOpenSignIn((prev) => !prev);
  };

  // Fonction pour fermer le modal
  const closeSignUp = () => {
    setOpenSignUp(false);
  };
  const closeSignIn = () => {
    setOpenSignIn(false);
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      // Appel à la fonction getUser
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

  return (
    <div>
      <Navbar user={user} />
      <Header>
        <Container>
          <div className="py-20 flex flex-col justify-center">
            <div className="flex flex-row justify-center gap-5">
              {/* Image du Header */}
              <div
                className={`relative h-80 w-80 ${
                  isLargeScreen ? "block" : "hidden"
                }`}
              >
                <img
                  className="absolute object-cover h-full w-full"
                  src={Image1}
                  alt="Header Image"
                />
              </div>

              {/* Texte + boutons */}
              <div className="text-center text-xl md:w-1/3 flex flex-col justify-center text-white ">
                <span className="text-3xl m-auto font-bold">
                  Gérez vos stockages et transports depuis une plateforme unique
                </span>
                {/* Boutons de connexion */}

                {!user ? (
                  <div className="flex flex-row mt-5 md:text-xl w-full text-base justify-center gap-5">
                    <button
                      onClick={handleSignUp} // Appel de la fonction
                      className="bg-white text-black rounded-full px-5 py-2"
                    >
                      Faire un devis
                    </button>
                    <button
                      onClick={handleSignIn}
                      className="bg-zinc-800 border-2 border-white text-white rounded-full px-5 py-2"
                    >
                      Se Connecter
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-row mt-5 md:text-xl w-full text-base justify-center gap-5">
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="bg-zinc-800 border-2 border-white text-white rounded-full px-5 py-2"
                    >
                      Accerder à mon Espace
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Header>

      {/* Espace inscription ou connexion */}
      {openSignUp && (
        <div>
          <SignUp onClose={closeSignUp} />{" "}
        </div>
      )}

      {openSignIn && (
        <div>
          <SignIn onClose={closeSignIn} />{" "}
        </div>
      )}

      <div className="text-center">
        <span className="  font-semibold text-3xl">
          Ils nous font confiance{" "}
        </span>

        <MarqueeComponent />
      </div>
    </div>
  );
}
