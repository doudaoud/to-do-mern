import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import "./styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section logo-section">
          <div className="footer-logo">
            <div
              className="logo-icon"
              style={{
                height: 30,
                width: 30,
                backgroundColor: "rgb(0, 102, 255)",
                borderRadius: "30%",
                marginRight: "10px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircleOutlineIcon
                style={{
                  color: "white",
                  marginLeft: "3px",
                  fontSize: "20px",
                }}
              />
            </div>
            <h2>TodoApp</h2>
          </div>
          <p>Organisez votre vie simplement avec TodoApp.</p>
        </div>

        <div className="footer-section links-section">
          <h3>Liens rapides</h3>
          <ul>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/profile">Profil</a>
            </li>
            <li>
              <a href="/settings">Paramètres</a>
            </li>
          </ul>
        </div>

        <div className="footer-section links-section">
          <h3>Compte</h3>
          <ul>
            <li>
              <a href="/signup">S'inscrire</a>
            </li>
            <li>
              <a href="/login">Se connecter</a>
            </li>
          </ul>
        </div>

        <div className="footer-section social-section">
          <h3>Suivez-nous</h3>
          <div className="social-icons">
            <Facebook size={24} className="social-icon" />
            <Twitter size={24} className="social-icon" />
            <Instagram size={24} className="social-icon" />
            <Linkedin size={24} className="social-icon" />
          </div>
          <p>contact@todoapp.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 TodoApp. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
