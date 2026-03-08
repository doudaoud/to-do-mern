import React from "react";
import Navbar from "../components/navbar";
import Hero from "../components/Hero";
import { Link, Routes, Route } from "react-router-dom";
import Hero2 from "../components/Hero2";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Hero2 />
    </>
  );
}
