import React from "react";
import {
  ListTodo,
  Flag,
  Layout,
  Users,
  FileText,
  User,
  Plus,
} from "lucide-react";
import "./styles/menu.css";
import { useContext } from "react";
import { SelectedContext } from "../contexts/SelectedContext";
export default function Menu() {
  const { selected, setSeleceted } = useContext(SelectedContext);
  return (
    <div className="sidebar">
      <div className="sidebar-logo">TaskFlow</div>

      <div className="sidebar-section">
        <p className="section-title">CATÉGORIES</p>
        <ul className="sidebar-menu">
          <li
            onClick={() => {
              setSeleceted({ ...selected, categorie: "Tous" });
            }}
            className={
              selected.categorie === "Tous" ? "menu-item active" : "menu-item"
            }
          >
            Tous
          </li>
          <li
            onClick={() => {
              setSeleceted({ ...selected, categorie: "Travail" });
            }}
            className={
              selected.categorie === "Travail"
                ? "menu-item active"
                : "menu-item"
            }
          >
            Travail
          </li>
          <li
            onClick={() => {
              setSeleceted({ ...selected, categorie: "reunions" });
            }}
            className={
              selected.categorie === "reunions"
                ? "menu-item active"
                : "menu-item"
            }
          >
            Réunions
          </li>
          <li
            onClick={() => {
              setSeleceted({ ...selected, categorie: "developpement" });
            }}
            className={
              selected.categorie === "developpement"
                ? "menu-item active"
                : "menu-item"
            }
          >
            Développement
          </li>
          <li
            onClick={() => {
              setSeleceted({ ...selected, categorie: "documentation" });
            }}
            className={
              selected.categorie === "documentation"
                ? "menu-item active"
                : "menu-item"
            }
          >
            Documentation
          </li>
          <li
            onClick={() => {
              setSeleceted({ ...selected, categorie: "personnel" });
            }}
            className={
              selected.categorie === "personnel"
                ? "menu-item active"
                : "menu-item"
            }
          >
            Personnel
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <p className="section-title">PRIORITÉ</p>
        <ul className="sidebar-menu">
          <li className="menu-item">Toutes</li>
          <li className="menu-item">High</li>
          <li className="menu-item">Medium</li>
          <li className="menu-item active">Low</li>
        </ul>
      </div>

      <div className="progression-section">
        <div className="progression-header">
          <h3>Progression</h3>
          <span className="progression-percent">25%</span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: "25%" }}></div>
        </div>
      </div>
    </div>
  );
}
