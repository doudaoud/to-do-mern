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
          <img src={img} style={{
            width: 584,
            height: 584,
            borderRadius: 10,
            boxShadow: "0px 2px 10px rgba(0,0,0,0.3)",
            marginLeft:99

          }} />
        </div>
        <div className="titles_hero3">
          <h2>Pourquoi TodoApp ?</h2>
          <p>
            Conçue avec simplicité et efficacité en tête, TodoApp vous aide à
            rester productif sans surcharge.
          </p>
          <div className="icons">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
