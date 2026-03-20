import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Confirme from "./pages/Confirme";
import { useEffect } from "react";
import ProtectedRoute from "./utils/ProtectedRoute";
import Profile from "./pages/Profile";
import BlockedRoute from "./utils/BlockedRoute";
function App() {
   useEffect(() => {
     const blockBack = () => {
       window.history.pushState(null, "", window.location.href);
     };

     blockBack();

     window.addEventListener("popstate", blockBack);

     return () => {
       window.removeEventListener("popstate", blockBack);
     };
   }, []);
  return (
    <div>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/verify-compte"
          element={
            <BlockedRoute>
              <Confirme />
            </BlockedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <h1>Dashboard page</h1>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <h1>Settings page</h1>
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* Routes */}
    </div>
  );
}

export default App;
