import React from "react";
import { CheckCircle2, Clock, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
export default function CarteTask({ taches = [] }) {
  const [check, setChecked] = useState([]);

  useEffect(() => {
    if (taches) {
      const initialCheck = taches.map((t) => ({ id: t._id, faite: t.faite }));
      setChecked(initialCheck);
    }
  }, [taches]);

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
            {/* <CheckCircle2  size={24} /> */}
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
            <button className="delete-task">
              <Trash2 size={20} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
