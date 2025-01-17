import React from "react";
import { Link } from "react-router-dom";
import Facebook from "../assets/svg/facebook-f.c9b84ee9e8f82c2293bd2898403eab5c.svg";
import Instagram from "../assets/svg/instagram.849150f40cd137617202962a2e728c4d.svg";
import Twitter from "../assets/svg/twitter.e42d106c22cfc1d9eb3666486d993987.svg";
import Whatsapps from "../assets/svg/whatsapp.1c27e36893aff1c3e7e7e0e5ca55860b.svg";

export default function Navbar() {
  return (
    <div className=" p-5 w-full shadow-md z-0 ">
      <div className=" flex flex-row justify-between ">
        <h1 className=" text-2xl font-bold">Stockéa</h1>
        <div>
          <ul className="flex flex-row gap-5">
            <li className="font-semibold">Accueil</li>
            <li className="font-semibold">Le Cabinet</li>
            <li className="font-semibold">Contact</li>
          </ul>
        </div>
        <div className="flex flex-row justify-around ">
          <div>
            <a
              href="https://www.youtube.com/"
              target="_blank "
              rel="noreferrer"
            >
              <img
                src={Facebook}
                className="h-7 w-7 bg-white border-black border-2 rounded-full p-1 mr-2"
                alt=""
              />
            </a>
          </div>
          <div>
            <a
              href="https://www.youtube.com/"
              target="_blank "
              rel="noreferrer"
            >
              <img
                src={Instagram}
                className="h-7 w-7 bg-white border-black border-2 rounded-full p-1 mr-2"
                alt=""
              />
            </a>
          </div>
          <div>
            <a
              href="https://www.youtube.com/"
              target="_blank "
              rel="noreferrer"
            >
              <img
                src={Twitter}
                className="h-7 w-7 bg-white border-black border-2 rounded-full p-1 mr-2"
                alt=""
              />
            </a>
          </div>
          <div>
            <a
              href="https://www.youtube.com/"
              target="_blank "
              rel="noreferrer"
            >
              <img
                src={Whatsapps}
                className="h-7 w-7 bg-white border-black border-2 rounded-full p-1 mr-2"
                alt=""
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
