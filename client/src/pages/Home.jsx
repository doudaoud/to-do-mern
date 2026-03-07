import React from "react";
import Navbar from "../components/navbar";
import Hero from "../components/Hero";
import { Link, Routes, Route } from "react-router-dom";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      {/*  routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signup' element={<h1>Signup page</h1>} />
        <Route path='/login' element={<h1>Login page</h1>} />
        <Route path='/dashboard' element={<h1>Dashboard page</h1>} />
        <Route path='/profile' element={<h1>Profile page</h1>} />
        <Route path='/settings' element={<h1>Settings page</h1>} />
      </Routes>
    </>
  );
}
