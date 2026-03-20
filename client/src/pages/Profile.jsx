import React from "react";
import Menu from "../components/Menu";
import "./styles/profile.css";
import { CheckCircle2, Clock, Trash2, Plus, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { SelectedContext } from "../contexts/SelectedContext";
import FormTache from "../components/FormTache";
import CarteTask from "../components/CarteTask";
import axios from "axios";
import { useParams } from "react-router-dom";
import { affichecontext } from "../contexts/AfficheContext";
export default function Profile() {
  // Get current date in French
  const options = { weekday: "long", day: "numeric", month: "long" };
  const today = new Date().toLocaleDateString("fr-FR", options);
  const [selected, setSeleceted] = useState({
    categorie: "Tous",
    priorite: "Toutes",
  });
  const { id } = useParams();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [data, setData] = useState([]);
  const [create, setCreate] = useState(false);

  // cree la fonction de la filtration des donnes pour affichage

  const handleFilter = (data) => {};

  //fin fonction filter
  useEffect(() => {
    const handlecharge = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/tache/get/${id}`,
        );
        setData(response.data.taches);
        console.log(typeof response.data.taches);
      } catch (err) {
        console.log(err);
      }
    };
    handlecharge();
  }, [create]);
  return (
    <div className="profile-layout">
      {isFormOpen && (
        <affichecontext.Provider value={{ create, setCreate }}>
          <FormTache onClose={() => setIsFormOpen(false)} />
        </affichecontext.Provider>
      )}
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
            <button
              className="logout-btn"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                backgroundColor: "#fee2e2",
                color: "#dc2626",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "background-color 0.2s",
              }}
            >
              <LogOut size={18} />
              Déconnexion
            </button>
            <span className="current-date"> {today} </span>
          </div>
        </header>
        <hr />
        <CarteTask taches={data} />
      </main>
    </div>
  );
}
