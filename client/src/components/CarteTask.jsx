import React from "react";
import { CheckCircle2, Clock, Trash2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
export default function CarteTask({ taches = [], setCreate, create }) {
  const [check, setChecked] = useState(() =>
    taches.map((t) => ({ id: t._id, faite: t.faite })),
  );
  const [prevTaches, setPrevTaches] = useState(taches);

  if (taches !== prevTaches) {
    setPrevTaches(taches);
    setChecked(taches.map((t) => ({ id: t._id, faite: t.faite })));
  }

  const hasChanged = check.some((c) => {
    const original = taches.find((t) => t._id === c.id);
    return original && original.faite !== c.faite;
  });

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("TokenJwt");
      await axios.delete(`http://localhost:3000/api/tache/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (setCreate) setCreate(!create);
    } catch (error) {
      console.log(error);
    }
  };

  if (!taches || taches.length === 0) {
    return (
      <div className="task-list">
        <p style={{ textAlign: "center", padding: "10px" }}>
          Aucune tâche trouvée.
        </p>
      </div>
    );
  }
  return (
    <div className="task-list">
      {taches.map((task) => {
        const taskStatus = check.find((c) => c.id === task._id);
        const isFaite = taskStatus ? taskStatus.faite : task.faite;
        return (
          <div key={task._id} className="task-card">
            <input
              type="checkbox"
              className="task-check"
              checked={isFaite}
              onChange={() => {
                setChecked(
                  check.map((c) =>
                    c.id === task._id ? { ...c, faite: !c.faite } : c,
                  ),
                );
                console.log(typeof check);
                console.log(check);
              }}
            />
            <div className="task-info">
              <h4 style={{ textDecoration: isFaite ? "line-through" : "none" }}>
                {task.title}
              </h4>
              <p style={{ textDecoration: isFaite ? "line-through" : "none" }}>
                {task.description}
              </p>
              <div className="task-badges">
                <span className="badge badge-priority">
                  <span
                    className="priority-dot"
                    style={{
                      backgroundColor:
                        task.priorite === "High"
                          ? "#ef4444"
                          : task.priorite === "Medium"
                            ? "#f59e0b"
                            : "#10b981",
                    }}
                  ></span>
                  {task.priorite}
                </span>
                <span className="badge badge-category">{task.categorie}</span>
                <span className="task-time">
                  <Clock size={14} />
                  {new Date(task.deadline).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
            </div>
            <button
              className="delete-task"
              onClick={() => handleDelete(task._id)}
            >
              <Trash2 size={20} />
            </button>
          </div>
        );
      })}
      {hasChanged && (
        <button
          className="save-button"
          onClick={async () => {
            try {
              const token = localStorage.getItem("TokenJwt");
              const response = await axios.patch(
                "http://localhost:3000/api/tache/patch",
                check.filter((c) => {
                  const original = taches.find((t) => t._id === c.id);
                  return original && original.faite !== c.faite;
                }),
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              );
              console.log(response.data);
              if (setCreate) setCreate(!create);
            } catch (err) {
              console.log(err);
            }
          }}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "rgb(0, 102, 255)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            display: "block",
            width: "100%",
            fontWeight: "bold",
          }}
        >
          Enregistrer les modifications
        </button>
      )}
    </div>
  );
}
