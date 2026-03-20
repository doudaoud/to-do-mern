import React, { useState } from "react";
import "./styles/FormTache.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { affichecontext } from "../contexts/AfficheContext";

export default function FormTache({ onClose }) {
  const { create, setCreate } = useContext(affichecontext);
  const [task, setTask] = useState({
    title: "",
    description: "",
    categorie: "work",
    priorite: "Low",
    deadline: "",
  });
  const { id } = useParams();
  const cleanId = id.startsWith(":") ? id.slice(1) : id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Task submitted:", task);
    try {
      const token = localStorage.getItem("TokenJwt");
      const response = await axios.post(
        `http://localhost:3000/api/tache/create/${cleanId}`,
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setMessage(response.data.message);
      setError("");
      setTimeout(() => setMessage(""), 3000);
      setCreate(!create);
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message ||
          "Une erreur est survenue lors de la création de la tâche",
      );
      setMessage("");
      // Clear error after 5 seconds
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="form-overlay">
      <div className="form-tache">
        <div className="form-header">
          <h2>Créer une tâche</h2>
          {onClose && (
            <button className="close-btn" onClick={onClose}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        {message && (
          <div className="message success">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="message error">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="title">Titre de la tâche</label>
            <input
              type="text"
              id="title"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Ex: Finir le rapport MERN"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Ajoutez des détails sur votre tâche..."
            />
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="category">Catégorie</label>
              <select
                id="category"
                name="categorie"
                value={task.categorie}
                onChange={handleChange}
              >
                <option value="Work">Travail</option>
                <option value="Personal">Personnel</option>
                <option value="Réunions">Réunions</option>
                <option
                  value="Développement
"
                >
                  Développement
                </option>
                <option value="Documentation">Documentation</option>
                <option value="Other">Autre</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="priority">Priorité</label>
              <select
                id="priority"
                name="priorite"
                value={task.priorite}
                onChange={handleChange}
              >
                <option value="Low">Basse</option>
                <option value="Medium">Moyenne</option>
                <option value="High">Haute</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="deadline">Date de deadline</label>
            <input
              type="datetime-local"
              id="deadline"
              name="deadline"
              value={task.deadline}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            <span>Créer la tâche</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
