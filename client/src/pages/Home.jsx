import React from "react";
import Navbar from "../components/navbar";
import Hero from "../components/Hero";
import { Link, Routes, Route } from "react-router-dom";
import Hero2 from "../components/Hero2";
import img from "../images/graphe.webp";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Hero2 />
      <div
        className="inage-stat "
        style={{
          width: "90%",
          margin: "auto",
          height: "500px",
          marginTop:200
        }}
      >
        <img
          src={img}
          style={{
            width: "95%",
            margin: "auto",
            height: "700px",
            marginLeft:"33px"
          }}
        />
      </div>
    </>
  );
}
