import React from "react";
import { CheckCircle2, Clock, Trash2 } from "lucide-react";
// import { useState } from "react";
export default function CarteTask({ taches = [] }) {
    // let array = [];
    // for (let i = 0; i < taches.length; i++) {
    //     array.push(taches._id, taches.faite);
    // }
  const [checked, setChecked] = useState();
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
      {taches.map((task) => (
        <div key={task._id} className="task-card">
          {/* <CheckCircle2  size={24} /> */}
          <input
            type="checkbox"
            className="task-check"
            checked={task.faite}
            onChange={(e) => {
              setChecked(e.target.checked);
            }}
            size={24}
          />
          <div className="task-info">
            <h4>{task.title}</h4>
            <p>{task.description}</p>
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
      ))}
    </div>
  );
}
