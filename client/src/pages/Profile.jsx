import React from "react";
import Menu from "../components/Menu";
import "./styles/profile.css";
import { CheckCircle2, Clock, Trash2, Plus } from "lucide-react";
import { useState } from "react";
import { SelectedContext } from "../contexts/SelectedContext";
import FormTache from "../components/FormTache";

export default function Profile() {
  // Get current date in French
  const options = { weekday: "long", day: "numeric", month: "long" };
  const today = new Date().toLocaleDateString("fr-FR", options);
  const [selected, setSeleceted] = useState({
    categorie: "Tous",
    priorite: "Toutes",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="profile-layout">
      {isFormOpen && <FormTache onClose={() => setIsFormOpen(false)} />}
      <SelectedContext.Provider value={{ selected, setSeleceted }}>
        <Menu />
      </SelectedContext.Provider>
      <main className="main-content">
        <header className="content-header">
          <h1>Mes Tâches</h1>
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <button
              className="add-task-btn"
              onClick={() => setIsFormOpen(true)}
            >
              <Plus size={18} />
              Ajouter
            </button>
            <span className="current-date"> {today} </span>
          </div>
        </header>
        <hr />
        <div className="task-list">
          {/* Mock Task matching the image */}
          <div className="task-card">
            <CheckCircle2 className="task-check" size={24} />

            <div className="task-info">
              <h4>Mettre à jour la documentation</h4>
              <p>Ajouter les nouvelles API à la documentation</p>
              <div className="task-badges">
                <span className="badge badge-priority">
                  <span className="priority-dot"></span>
                  Basse
                </span>
                <span className="badge badge-category">Documentation</span>
                <span className="task-time">
                  <Clock size={14} />
                  20 févr.
                </span>
              </div>
            </div>
            <button className="delete-task">
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
