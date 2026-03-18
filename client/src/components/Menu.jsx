import React from "react";

export default function Menu() {
  return (
    <>
      <div>
        <div className="titles_profile">
          <h2>TaskFlow</h2>
        </div>
        <div className="categories">
          <p>CATEGORIES</p>
          <ul>
            <li>Tous</li>
            <li>Travail</li>
            <li>Reunions</li>
            <li>Developpement</li>
            <li>Documentatiom</li>
            <li>Personnel</li>
          </ul>
        </div>
        <div className="Priorite">
          <p>Priorité</p>
          <ul>
            <li>Toutes</li>
            <li>High</li>
            <li>Medium</li>
            <li>Low</li>
          </ul>
        </div>
      </div>
      </>
      
  );
}
