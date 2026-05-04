import React from "react";
import Menu from "../components/Menu";
import "./styles/profile.css";
import { CheckCircle2, Clock, Trash2, Plus, LogOut, Menu as MenuIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { SelectedContext } from "../contexts/SelectedContext";
import FormTache from "../components/FormTache";
import CarteTask from "../components/CarteTask";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AfficheContext } from "../contexts/AfficheContext";
export default function Profile() {
  const navigate = useNavigate();
  // Get current date in French
  const options = { weekday: "long", day: "numeric", month: "long" };
  const today = new Date().toLocaleDateString("fr-FR", options);
  const [selected, setSeleceted] = useState({
    categorie: "Tous",
    priorite: "Toutes",
  });
  const { id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [data, setData] = useState([]);
  const [create, setCreate] = useState(false);

  // cree la fonction de la filtration des donnes pour affichage

  const handleFilter = (dataa) => {
    return dataa.filter((task) => {
      const { categorie, priorite } = selected;
      const matchCategorie = categorie === "Tous" || task.categorie === categorie;
      const matchPriorite = priorite === "Toutes" || task.priorite === priorite;
      return matchCategorie && matchPriorite;
    });
  };

  //fin fonction filter
  useEffect(() => {
    const handlecharge = async () => {
      try {
        const token = localStorage.getItem("TokenJwt");
        const response = await axios.get(
          `http://localhost:3000/api/tache/get/${id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setData(response.data.taches);
      } catch (err) {
        console.log(err);
      }
    };
    handlecharge();
  }, [create, id]);
  return (
    <div className="profile-layout">
      {isFormOpen && (
        <AfficheContext.Provider value={{ create, setCreate }}>
          <FormTache onClose={() => setIsFormOpen(false)} />
        </AfficheContext.Provider>
      )}
      <SelectedContext.Provider value={{ selected, setSeleceted }}>
        <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </SelectedContext.Provider>

      {isMenuOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.3)',
            zIndex: 999
          }}
        />
      )}
      <main className="main-content">
        <header className="content-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button 
              className="menu-toggle"
              onClick={() => setIsMenuOpen(true)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#1e293b',
                padding: '5px'
              }}
            >
              <MenuIcon size={24} />
            </button>
            <h1>Mes Tâches</h1>
          </div>
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
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
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
        <CarteTask
          taches={handleFilter(data)}
          setCreate={setCreate}
          create={create}
        />
      </main>
    </div>
  );
}
