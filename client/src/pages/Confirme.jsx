import React from "react";
import "./styles/confirme.css";
import { InputOtp } from "primereact/inputotp";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Confirme() {
  const Navigate = useNavigate();
  const [state, setState] = useState({
    valide: null,
    message: "",
  });
  const [token, setTokens] = useState();
  const hendleverify = async () => {
    // console.log(token);
    const code_origin = localStorage.getItem("code");
    const timer = localStorage.getItem("timesend");
    let time = new Date();
    const time_houre = time.getHours();
    let time_minuts = time.getMinutes();
    if (time_minuts < 10) time_minuts = `0${time_minuts}`;
    time = `${time_houre}:${time_minuts}`;
    const timer_houre = timer.slice(0, 2);
    const timer_minuts = timer.slice(3, 5);

    if (Number(timer_houre) < time_houre) {
      setState({
        valide: false,
        message: "le code est invalide fait un autre ptobleme heure ",
      });
      console.log(state);
    } else if (time_minuts - Number(timer_minuts) > 15) {
      setState({
        valide: false,
        message: "le code est invalide fait un autre probleme minuts ",
      });
      console.log(state);
    } else if (code_origin != token) {
      setState({
        valide: false,
        message: "le code est inncorct verify le code dans votre mail ",
      });
      console.log(state);
    } else {
      setState({
        valide: true,
        message: "le code est correct",
      });
      const user = {
        email: localStorage.getItem("email"),
        name: localStorage.getItem("name"),
        mdps: localStorage.getItem("mdps"),
      };
      try {
        const response = await axios.post(
          "http://localhost:3000/api/createuser/",
          user,
        );
        console.log(response);
        if (response.status === 201) {
          localStorage.removeItem("timesend");
          localStorage.removeItem("code");
          localStorage.removeItem("email");
          localStorage.removeItem("name");
          localStorage.removeItem("mdps");
          Navigate("/login")
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

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

          <button className="verify-btn" disabled={state.valide} onClick={hendleverify}>
            Vérifier le code
          </button>
          {state.message && (
            <p
              style={{
                color: state.valide ? "green" : "red",
                marginTop: "10px",
                fontWeight: "bold",
              }}
            >
              {state.message}
            </p>
          )}

          <hr />

          <p className="resend-text">Vous n'avez pas reçu le code ?</p>

          <button className="resend-btn">⟳ Renvoyer le code</button>

          <p className="footer">Le code expire dans 15 minutes</p>
        </div>
      </div>
    </>
  );
}
