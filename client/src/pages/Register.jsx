import "./styles/register.css";
import React from "react";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    mdps: "",
    cmdps: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    setForm({
      userName: "",
      email: "",
      mdps: "",
      cmdps: "",
    });
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
                  type="password"
                  placeholder="••••••••"
                  id="mdps"
                  value={form.mdps}
                  onChange={handleChange}
                  required
                />

                <button type="button">👁</button>
              </div>
            </div>

            <div className="input-group">
              <label>Confirmer le mot de passe</label>

              <div className="password-box">
                <input
                  type="password"
                  required
                  id="cmdps"
                  placeholder="••••••••"
                  value={form.cmdps}
                  onChange={handleChange}
                />

                <button type="button">👁</button>
              </div>
            </div>

            <button className="register-btn">Créer mon compte</button>
          </form>

          <p className="login-link">
            Vous avez déjà un compte ? <span>Se connecter</span>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="visual-section">
        <div className="visual-content">
          <div className="icon">✨</div>

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
