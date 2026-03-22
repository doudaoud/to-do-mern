import React from "react";
import "./styles/confirme.css";
import { InputOtp } from "primereact/inputotp";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Confirme() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    valide: null,
    message: "",
  });
  const [token, setTokens] = useState();
  const [loading, setLoading] = useState(false);

  // Fonction pour vérifier le code (Appel au Backend)
  const hendleverify = async () => {
    const email = localStorage.getItem("email");

    try {
      setLoading(true);
      // Le backend attend { email, code } sur la route /api/verify
      const response = await axios.post("http://localhost:3000/api/verify", {
        email: email,
        code: token,
      });

      if (response.status === 201 || response.status === 200) {
        setState({ valide: true, message: "Compte vérifié avec succès !" });
        localStorage.clear(); // Nettoyer les données temporaires
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setState({
        valide: false,
        message: error.response?.data?.message || "Code incorrect ou expiré.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour renvoyer le code
  const handleResend = async () => {
    const email = localStorage.getItem("email");
    const nomComplet = localStorage.getItem("name");
    const password = localStorage.getItem("mdps");

    try {
      setLoading(true);
      // On rappelle /api/register pour générer un nouveau code
      await axios.post("http://localhost:3000/api/register", {
        nomComplet,
        Email: email,
        password,
      });
      setState({
        valide: true, // true ici juste pour la couleur verte du message
        message: "Un nouveau code a été envoyé par email.",
      });
    } catch (error) {
      console.log(error);
      setState({
        valide: false,
        message: "Erreur lors du renvoi du code.",
      });
    } finally {
      setLoading(false);
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

          <button
            className="verify-btn"
            disabled={loading}
            onClick={hendleverify}
          >
            {loading ? "Chargement..." : "Vérifier le code"}
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

          <button
            className="resend-btn"
            onClick={handleResend}
            disabled={loading}
          >
            ⟳ Renvoyer le code
          </button>

          <p className="footer">Le code expire dans 15 minutes</p>
        </div>
      </div>
    </>
  );
}
