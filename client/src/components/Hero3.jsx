import React from "react";
import { ArrowRight, CheckCircle2, Clock, Bell, Zap } from "lucide-react";
import "./styles/Hero3.css";
import img from "../images/img_hero_3.webp";
export default function Hero3() {
  return (
    <>
      <div className="hero3">
        {/* TODO  regler le css */}
        <div className="hero3_container">
          <img
            src={img}
            style={{
              width: 584,
              height: 584,
              borderRadius: 10,
              boxShadow: "0px 2px 10px rgba(0,0,0,0.3)",
              marginLeft: 99,
            }}
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
              <Zap className="icon" />
              <div className="title_icon">
                <h4>Ultra rapide</h4>
                <p>Interface fluide et réactive</p>
              </div>
            </div>
            <div className="icon_title">
              <CheckCircle2 className="icon" />
              <div className="title_icon">
                <h4>Facile à utiliser</h4>
                <p>Pas de courbe d'apprentissage</p>
              </div>
            </div>
            <div className="icon_title">
              <Clock className="icon" />
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
