import React, { useRef, useEffect } from "react";
import Stockage from "../assets/img/stockage.png";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { redirect } from "react-router-dom";

export default function Paypal({
  setIsPayment,
  handlePaymentSuccess,
  handlePaymentError,
}) {
  const PAYPAL_CLIENT_ID = process.env.REACT_APP_PAYPAL_KEY;

  return (
    <PayPalScriptProvider
      options={{
        "client-id": PAYPAL_CLIENT_ID,
        locale: "fr_FR",
        currency: "EUR",
      }}
    >
      <div className="flex flex-col items-center space-y-6 py-6 px-4 sm:px-8 max-w-[90%] sm:max-w-md mx-auto">
        <div className="w-full flex flex-row items-center bg-white rounded-lg shadow-lg p-6">
          <div className="flex-1">
            <img className="h-10" src={Stockage} alt="Stockage" />
          </div>
          <div className="flex-2">20Go disponible</div>
        </div>

        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">
          Mode de paiement
        </h3>

        <div className="w-full px-6 rounded-lg space-y-4">
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order
                .create({
                  purchase_units: [
                    {
                      amount: {
                        value: "20.00", // Montant de la commande
                        currency_code: "EUR",
                      },
                    },
                  ],
                })
                .catch((error) => {
                  console.log(
                    "Erreur lors de la création de la commande",
                    error
                  );
                });
            }}
            onApprove={async (data, actions) => {
              try {
                const details = await actions.order.capture();
                await handlePaymentSuccess(details);
              } catch (error) {
                console.log("Erreur lors de la capture de la commande", error);
                handlePaymentError(error);
              }
            }}
            onError={handlePaymentError}
          />
        </div>

        <button
          onClick={() => setIsPayment(false)}
          className="mt-6 w-full text-black py-2 rounded-lg outline-none"
        >
          Retour au formulaire
        </button>
      </div>
    </PayPalScriptProvider>
  );
}
