import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<h1>Signup page</h1>} />
        <Route path="/login" element={<h1>Login page</h1>} />
        <Route path="/dashboard" element={<h1>Dashboard page</h1>} />
        <Route path="/profile" element={<h1>Profile page</h1>} />
        <Route path="/settings" element={<h1>Settings page</h1>} />
      </Routes>
      {/* Routes */}
    </div>
  );
}

export default App;

