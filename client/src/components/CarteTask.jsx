import React from 'react'
import { CheckCircle2, Clock, Trash2 } from "lucide-react";

export default function CarteTask({ taches = [] }) {
    if (!taches || taches.length === 0) {
        return (
            <div className="task-list">
                <p style={{ textAlign: 'center', padding: '10px' }}>Aucune tâche trouvée.</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            {taches.map((task) => (
                <div key={task._id} className="task-card">
                    <CheckCircle2 className="task-check" size={24} />

                    <div className="task-info">
                        <h4>{task.title}</h4>
                        <p>{task.description}</p>
                        <div className="task-badges">
                            <span className="badge badge-priority">
                                <span className="priority-dot" style={{ backgroundColor: task.priorite === 'Haute' ? '#ef4444' : task.priorite === 'Moyenne' ? '#f59e0b' : '#10b981' }}></span>
                                {task.priorite}
                            </span>
                            <span className="badge badge-category">{task.categorie}</span>
                            <span className="task-time">
                                <Clock size={14} />
                                {new Date(task.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                            </span>
                        </div>
                    </div>
                    <button className="delete-task">
                        <Trash2 size={20} />
                    </button>
                </div>
            ))}
        </div>
    )
}
