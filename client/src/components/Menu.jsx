import React from "react";
import { ListTodo, Flag, Layout, Users, FileText, User, Plus } from "lucide-react";
import "./styles/menu.css";
export default function Menu() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">TaskFlow</div>
      
      <div className="sidebar-section">
        <p className="section-title">CATÉGORIES</p>
        <ul className="sidebar-menu">
          <li className="menu-item active">Tous</li>
          <li className="menu-item">Travail</li>
          <li className="menu-item">Réunions</li>
          <li className="menu-item">Développement</li>
          <li className="menu-item">Documentation</li>
          <li className="menu-item">Personnel</li>
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
