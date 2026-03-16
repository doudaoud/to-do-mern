import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Confirme from "./pages/Confirme";
function App() {
  return (
    <div>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-compte" element ={ <Confirme/> }/>
        <Route path="/dashboard" element={<h1>Dashboard page</h1>} />
        <Route path="/profile" element={<h1>Profile page</h1>} />
        <Route path="/settings" element={<h1>Settings page</h1>} />
      </Routes>
      {/* Routes */}
    </div>
  );
}

export default App;

