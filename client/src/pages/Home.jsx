import React from "react";
import Navbar from "../components/navbar";
import Hero from "../components/Hero";
import { Link, Routes, Route } from "react-router-dom";
import Hero2 from "../components/Hero2";
import img from "../images/graphe.webp";
import Hero3 from "../components/Hero3";
import Footer from "../components/Footer";
import "./styles/home.css";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Hero2 />
      <div className="inage-stat">
        <img
          src={img}
          className="inage-stat-img"
          alt="Statistiques"
        />
      </div>
      <Hero3 />
      <Footer />
    </>
  );
}
