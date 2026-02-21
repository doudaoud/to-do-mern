import React from "react";
import "./styles/hero.css";
import heroImage from "../images/image1.webp";
export default function Hero() {
  return (
    <>
      <div className="Hero">
        <div className="hero">
          <div className="hero_left">
            <h1 className="title1">Organisez votre vie simplement</h1>
            <h5 className="title2">
              TodoApp est l'outil parfait pour gérer vos tâches quotidiennes.
              Simple, efficace, et conçu pour vous aider à rester productif.
            </h5>
            <div className="hero_buttons">
              <button className="button-gratuit">Commencer gratuitement &#8594;</button>
              <button className="button-demo">
                demo
              </button>
            </div>
          </div>
          <div className="hero_right">
            <img src={heroImage} alt="this is the image for hero section " />
          </div>
        </div>
      </div>
    </>
  );
}
