import React from "react";
import { CheckCircle2, Clock, Trash2 } from "lucide-react";
import { useState } from "react";
export default function CarteTask({ taches = [] }) {
  let array = [];

  for (let i = 0; i < taches.length; i++) {
    let obj = {};
    obj.id = taches[i]._id;
    obj.faite = taches[i].faite;
    array.push(obj);
  }
  const [check, setChecked] = useState(array);
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
            checked={check.map((e) => {
             if( e.id===task._id)
              return e.faite
            })}
                  onChange={(e) => {
                      check.map((a) => { 
                          if
                      })
                    

              setChecked();
            }}
            size={24}
          />
          <div className="task-info">
            <h4
              style={{ textDecoration: task.faite ? "line-through" : "none" }}
            >
              {task.title}
            </h4>
            <p style={{ textDecoration: task.faite ? "line-through" : "none" }}>
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
      ))}
    </div>
  );
}
