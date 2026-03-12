import React from "react";
import "./styles/hero2.css";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Card from "./Card";
export default function Hero2() {
  const informations = [
    {
      logo: <CheckCircleOutlineIcon/>,
      title: "Listes intelligentes",
      discreption:
        "Créez et organisez vos tâches en listes catégorisées. Marquez les tâches comme complétées en un clic.",
    },
    {
      logo: <AccessTimeIcon/>,
      title: "Planification temporelle",
      discreption:
        "Définissez des dates d'échéance et des rappels pour ne jamais oublier une tâche importante.",
    },
    {
      logo: <NotificationsNoneIcon/>,
      title: "Notifications en temps réel",
      discreption:
        "Recevez des notifications instantanées pour rester à jour avec vos tâches prioritaires.",
    },
  ];
  return (
    <>
      <div className="hh">
        <hr className="kht" />
        <div className="titles_hero2">
          <h1>Tout ce dont vous avez besoin</h1>
          <p>
            Des fonctionnalités puissantes conçues pour simplifier votre gestion
            de tâches.
          </p>
        </div>
        <div 
        className="cards">
          {informations.map((info, index) => {
            return (
              <div key={index}>
                <Card
                  logo={info.logo}
                  title={info.title}
                  discreption={info.discreption}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
