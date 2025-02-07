import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/svg/logo.svg";
import UserIcon from "../assets/svg/icon.svg";
import Facebook from "../assets/svg/facebook-f.c9b84ee9e8f82c2293bd2898403eab5c.svg";
import Instagram from "../assets/svg/instagram.849150f40cd137617202962a2e728c4d.svg";
import Twitter from "../assets/svg/twitter.e42d106c22cfc1d9eb3666486d993987.svg";
import Whatsapps from "../assets/svg/whatsapp.1c27e36893aff1c3e7e7e0e5ca55860b.svg";
import { useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // État pour le chargement
  const [error, setError] = useState(null); // État pour l'erreur

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("Id");
    localStorage.removeItem("authToken");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div>
      {user ? (
        <div className="p-5 w-full shadow-md z-0">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-2xl font-bold">Stockéa</h1>
            <div className="flex flex-row items-center gap-2 justify-between">
              <button
                // onClick={handleSignOut}
                className="bg-white border-2 border-white text-white rounded-full px-2 py-2"
              >
                <img src={UserIcon} className="h-5 w-5 text-white" alt="icon" />
              </button>
              <button
                onClick={handleSignOut}
                className="bg-zinc-800 border-2 text-sm border-white text-white rounded-full px-3 py-2"
              >
                Se Déconnecter
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5 w-full shadow-md z-0">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold">Stockéa</h1>
            <div>
              <ul className="flex flex-row gap-5">
                <li className="font-semibold">Accueil</li>
                <li className="font-semibold">Le Cabinet</li>
                <li className="font-semibold">Contact</li>
              </ul>
            </div>
            <div className="flex flex-row justify-around">
              <div>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={Facebook}
                    className="h-7 w-7 bg-white border-black border-2 rounded-full p-1 mr-2"
                    alt="Facebook"
                  />
                </a>
              </div>
              <div>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={Instagram}
                    className="h-7 w-7 bg-white border-black border-2 rounded-full p-1 mr-2"
                    alt="Instagram"
                  />
                </a>
              </div>
              <div>
                <a
                  href="https://www.twitter.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={Twitter}
                    className="h-7 w-7 bg-white border-black border-2 rounded-full p-1 mr-2"
                    alt="Twitter"
                  />
                </a>
              </div>
              <div>
                <a
                  href="https://www.whatsapp.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={Whatsapps}
                    className="h-7 w-7 bg-white border-black border-2 rounded-full p-1 mr-2"
                    alt="WhatsApp"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
