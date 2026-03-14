import React from "react";
import { ArrowRight, CheckCircle2, Clock, Bell, Zap } from "lucide-react";
import "./styles/Hero3.css";
import img from "../images/img_hero_3.webp"
export default function Hero3() {
  return (
    <>
      <hr/>
      <div className="hero3_container">
        <img src={img}/>
      </div>
      <div className="">
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
    </>
  );
}
