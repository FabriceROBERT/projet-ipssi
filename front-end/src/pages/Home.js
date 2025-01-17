import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Container from "../components/Container";
import Header from "../components/Header";
import Image1 from "../assets/img/6606e1c2149571f85bd4d57e_header-form-image.avif";

export default function Home() {
  // État pour suivre la taille de l'écran
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  // Écouteur d'événement pour changer la taille d'écran
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    // Nettoyage de l'événement quand le composant est démonté
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Navbar />
      <Header>
        <Container>
          <div className="py-20 flex flex-col justify-center">
            <div className="flex flex-row  justify-center gap-5">
              {/* image DU HEADER */}
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

              {/* span + button */}
              <div className="text-center text-xl md:w-1/3  flex  flex-col justify-center text-white">
                <span className="text-3xl  m-auto font-bold">
                  Gérez vos stockages et transports depuis une plateforme unique
                </span>
                {/* boutons de connexion */}
                <div className="flex   m-auto flex-row mt-5 md:text-xl w-full text-base justify-center gap-5">
                  <button className="bg-white text-black rounded-full px-5   py-2">
                    Faire un devis
                  </button>
                  <button className="bg-bg-zinc-800 border-2 border-white text-white rounded-full px-5 py-2">
                    Se Connecter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Header>
    </div>
  );
}
