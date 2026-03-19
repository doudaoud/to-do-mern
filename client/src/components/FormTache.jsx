import React, { useState } from "react";
import "./styles/FormTache.css";

export default function FormTache({ onClose }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "Work",
    priority: "Medium",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task submitted:", task);
    // Add logic to save task via API here
    if (onClose) onClose();
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
                name="category"
                value={task.category}
                onChange={handleChange}
              >
                <option value="Work">Travail</option>
                <option value="Personal">Personnel</option>
                <option value="Shopping">Achats</option>
                <option value="Health">Santé</option>
                <option value="Education">Éducation</option>
                <option value="Other">Autre</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="priority">Priorité</label>
              <select
                id="priority"
                name="priority"
                value={task.priority}
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
