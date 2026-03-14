import React from "react";
import Navbar from "../components/navbar";
import Hero from "../components/Hero";
import { Link, Routes, Route } from "react-router-dom";
import Hero2 from "../components/Hero2";
import img from "../images/graphe.webp";
import Hero3 from "../components/Hero3";
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
          height: "100%",
          marginTop: 200,
          // boxShadow: "0px 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        <img
          src={img}
          style={{
            width: "95%",
            margin: "auto",
            height: "700px",
            marginLeft: "33px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.3)",
          }}
        />
      </div>
      <Hero3/>
    </>
  );
}
