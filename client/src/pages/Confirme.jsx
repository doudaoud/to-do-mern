import React from "react";
import "./styles/confirme.css";
import { InputOtp } from "primereact/inputotp";
import { useState } from "react";
export default function Confirme() {
  const [token, setTokens] = useState();
  return (
    <>
      <div className="page">
        <div className="verify-card">
          <h2>Vérifiez votre compte</h2>

          <p className="subtitle">
            Un code de vérification a été envoyé à
            <br />
            <span>user@example.com</span>
          </p>

          <div className="otp-box" style={{ display: "flex", gap: "10px" }}>
            <InputOtp
              value={token}
              onChange={(e) => setTokens(e.value)}
              integerOnly
              length={6}
            />
          </div>

          <button
            className="verify-btn"
            onClick={() => {
              console.log({ token });
            }}
 s         >
            Vérifier le code
          </button>

          <hr />

          <p className="resend-text">Vous n'avez pas reçu le code ?</p>

          <button className="resend-btn">⟳ Renvoyer le code</button>

          <p className="footer">Le code expire dans 15 minutes</p>
        </div>
      </div>
    </>
  );
}
