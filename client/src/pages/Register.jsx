import "./styles/register.css";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function Register() {
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
  // cette fonction pour le changer le state de form
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };
  // cette fonction pour envoyer le formulaire
  const  handleSubmit =async(e) => {
    e.preventDefault();
    setLoading(true);
    try {
    const response = await axios.post("http://localhost:3000/api/register", form);
    console.log(response);
    setLoading(false);
    setCreate(!create);   
    }
    catch (error) {
      console.log(error);
      setLoading(false);
    }
   
  };
  return (
    <div className="register-container">
      {/* LEFT SIDE */}
      <div className="form-section">
        <div className="form-box">
          <h1>Créer un compte</h1>
          <p className="subtitle">
            Rejoignez-nous et commencez à organiser vos tâches
          </p>
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
            Vous avez déjà un compte ? <span>Se connecter</span>
          </p>
        </div>
      </div>

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
