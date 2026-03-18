import React from "react"
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const token = (localStorage.getItem("TokenJwt"));
  if (!token) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
