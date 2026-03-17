import "./styles/register.css";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedContent from "./AnimatedContent";
import Login from "./Login";
export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    email: "",
    mdps: "",
    cmdps: "",
  });
  const [loading, setLoading] = useState(false);
  const [see, setSee] = useState({
    mdps: false,
    cmdps: false,
  });
  const [create, setCreate] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // cette fonction pour le changer le state de form
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };
  // cette fonction pour envoyer le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/register",
        form,
      );

      console.log(response);
      localStorage.setItem("timesend", response.data.temps);
      localStorage.setItem("code", response.data.passwordverif);
      localStorage.setItem("email", form.email);
      localStorage.setItem("name", form.userName);
      localStorage.setItem("mdps", response.data.password);
      setLoading(false);
      setCreate(!create);
      navigate("/verify-compte");
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Une erreur s'est produite lors de l'inscription.");
      }
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    }
  };
  return (
    <div className="register-container">
      {/* LEFT SIDE */}
      <AnimatedContent
        className="form-section"
        distance={100}
        direction="vertical"
        reverse={false}
        duration={0.8}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.1}
        delay={0}
      >
        <div className="form-box">
          <h1>Créer un compte</h1>
          <p className="subtitle">
            Rejoignez-nous et commencez à organiser vos tâches
          </p>
          {errorMsg && (
            <div
              className="error-message"
              style={{
                color: "#d32f2f",
                backgroundColor: "#fdecea",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "15px",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {errorMsg}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Nom complet</label>
              <input
                type="text"
                placeholder="Jean Dupont"
                value={form.userName}
                onChange={handleChange}
                id="userName"
                required
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange}
                id="email"
                required
                placeholder="vous@exemple.com"
              />
            </div>

            <div className="input-group">
              <label>Mot de passe</label>

              <div className="password-box">
                <input
                  type={see.mdps ? "text" : "password"}
                  placeholder="••••••••"
                  id="mdps"
                  value={form.mdps}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  onClick={() => {
                    setSee({ ...see, mdps: !see.mdps });
                  }}
                >
                  👁
                </button>
              </div>
            </div>

            <div className="input-group">
              <label>Confirmer le mot de passe</label>

              <div className="password-box">
                <input
                  type={see.cmdpsw ? "text" : "password"}
                  required
                  id="cmdps"
                  placeholder="••••••••"
                  value={form.cmdps}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() => {
                    setSee({ ...see, cmdps: !see.cmdps });
                  }}
                >
                  👁
                </button>
              </div>
            </div>

            <button
              className="register-btn"
              type="submit"
              onClick={() => {
                setCreate(!create);
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Veuillez patienter...
                </>
              ) : (
                "Créer un compte"
              )}
            </button>
          </form>

          <p className="login-link">
            Vous avez déjà un compte ?{" "}
            <span>
              {" "}
              <Link to="/login"> Se connecter </Link>{" "}
            </span>
          </p>
        </div>
      </AnimatedContent>

      {/* RIGHT SIDE */}
      <div className="visual-section">
        <div className="visual-content">
          <div className="icon">
            <Sparkles />
          </div>

          <h2>Commencez maintenant</h2>

          <p>
            Créez votre compte en quelques secondes et accédez à tous les outils
            pour gérer vos tâches efficacement.
          </p>
        </div>
      </div>
    </div>
  );
}
