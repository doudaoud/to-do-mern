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
              setSeleceted({ ...selected, categorie: "Work" });
            }}
            className={
              selected.categorie === "Work"
                ? "menu-item active"
                : "menu-item"
            }
          >
            Travail
          </li>
          <li
            onClick={() => {
              setSeleceted({ ...selected, categorie: "Meeting" });
            }}
            className={
              selected.categorie === "Meeting"
                ? "menu-item active"
                : "menu-item"
            }
          >
            Réunions
          </li>
          <li
            onClick={() => {
              setSeleceted({ ...selected, categorie: "Development" });
            }}
            className={
              selected.categorie === "Development"
                ? "menu-item active"
                : "menu-item"
            }
          >
            Développement
          </li>
          <li
            onClick={() => {
              setSeleceted({ ...selected, categorie: "Documentation" });
            }}
            className={
              selected.categorie === "Documentation"
                ? "menu-item active"
                : "menu-item"
            }
          >
            Documentation
          </li>
          <li
            onClick={() => {
              setSeleceted({ ...selected, categorie: "Personal" });
            }}
            className={
              selected.categorie === "Personal"
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
          <li 
            onClick={() => {
              setSeleceted({ ...selected, priorite: "Toutes" });
            }}
            className={
              selected.priorite === "Toutes" ? "menu-item active" : "menu-item"
            } >Toutes</li>
          <li
            onClick={() => {
              setSeleceted({ ...selected, priorite: "High" });
            }}
            className={
              selected.priorite === "High" ? "menu-item active" : "menu-item"
            }
          >
            Haute
          </li>
          <li
            onClick={() => {
              setSeleceted({ ...selected, priorite: "Medium" });
            }}
            className={
              selected.priorite === "Medium" ? "menu-item active" : "menu-item"
            }
          >
            Moyenne
          </li>
          <li
            onClick={() => {
              setSeleceted({ ...selected, priorite: "Low" });
            }}
            className={
              selected.priorite === "Low" ? "menu-item active" : "menu-item"
            }
          >
            Basse
          </li>
        </ul>
      </div>

      {/* <div className="progression-section">
        <div className="progression-header">
          <h3>Progression</h3>
          <span className="progression-percent">25%</span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: "25%" }}></div>
        </div>
      </div> */}
    </div>
  );
}
