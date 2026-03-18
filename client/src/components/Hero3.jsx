import React from "react";
import { ArrowRight, CheckCircle2, Clock, Bell, Zap } from "lucide-react";
import "./styles/Hero3Updated.css";
import img from "../images/img_hero_3.webp";
export default function Hero3() {
  return ( 
    <>
      <div className="hero3">
        <div className="hero3_container">
          <img
            src={img}
            className="hero3-img"
            alt="Pourquoi TodoApp"
          />
        </div>
        <div className="titles_hero3">
          <h2>Pourquoi TodoApp ?</h2>
          <p>
            Conçue avec simplicité et efficacité en tête, TodoApp vous aide à
            rester productif sans surcharge.
          </p>
          <div className="part2">
            <div className="icon_title">
              <Zap size={20} color="rgb(0, 102, 255)" strokeWidth={2} style={{flexShrink:0, marginTop:2}} />
              <div className="title_icon">
                <h4>Ultra rapide</h4>
                <p>Interface fluide et réactive</p>
              </div>
            </div>
            <div className="icon_title">
              <CheckCircle2 size={20} color="rgb(0, 102, 255)" strokeWidth={2} style={{flexShrink:0, marginTop:2}} />
              <div className="title_icon">
                <h4>Facile à utiliser</h4>
                <p>Pas de courbe d'apprentissage</p>
              </div>
            </div>
            <div className="icon_title">
              <Clock size={20} color="rgb(0, 102, 255)" strokeWidth={2} style={{flexShrink:0, marginTop:2}} />
              <div className="title_icon">
                <h4>Synchronisation instantanée</h4>
                <p>Accédez à vos tâches partout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
