import { useState } from "react";
import "./styles/login.css";
import AnimatedContent from "./AnimatedContent";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLogin({ ...login, [id]: value });
  };
  const navigate = useNavigate();
  return (
    <div className="login-container">
      {/* LEFT */}

      <div className="login-left">
        <div className="login-box">
          <AnimatedContent>
            <div className="login-header">
              <h1>Connexion</h1>
              <p>Accédez à votre espace de gestion de tâches</p>
            </div>

            {message && (
              <div
                style={{
                  color: "#2e7d32",
                  backgroundColor: "#edf7ed",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "15px",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {message}
              </div>
            )}
            {errorMsg && (
              <div
                style={{
                  color: "#d32f2f",
                  backgroundColor: "#fdecea",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "15px",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {errorMsg}
              </div>
            )}

            <form
              className="login-form"
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                setErrorMsg("");
                setMessage("");
                try {
                  const response = await axios.post(
                    "http://localhost:3000/api/login",
                    login,
                  );
                  console.log(response);
                  if (response.status === 200) {
                    setMessage(response.data.message);
                    localStorage.setItem("TokenJwt", response.data.token);
                    console.log(response.data.dataUser);
                    // localStorage.setItem("id", response.data.dataUser._id);
                    let id = response.data.dataUser._id;
                    setTimeout(() => {
                      setMessage("");
                      navigate(`/profile/${id}`);
                    }, 3000);
                  }
                } catch (error) {
                  console.log(error);
                  if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                  ) {
                    setErrorMsg(error.response.data.message);
                  } else {
                    setErrorMsg(
                      "Une erreur s'est produite lors de la connexion.",
                    );
                  }
                  setTimeout(() => {
                    setErrorMsg("");
                  }, 3000);
                } finally {
                  setLoading(false);
                }
              }}
            >
              <div className="form-group">
                <label htmlFor="email">Adresse email</label>
                <input
                  id="email"
                  type="email"
                  onChange={handleChange}
                  placeholder="vous@exemple.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <div className="password-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              <button className="login-btn" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Veuillez patienter...
                  </>
                ) : (
                  "Se connecter"
                )}
              </button>
            </form>

            <div className="login-footer">
              <p>
                Pas encore de compte ? <span>S'inscrire</span>
              </p>

              <button className="forgot">Mot de passe oublié ?</button>
            </div>
          </AnimatedContent>
        </div>
      </div>

      {/* RIGHT */}
      <div className="login-right">
        <div className="background-shapes">
          <div className="circle top"></div>
          <div className="circle bottom"></div>
          <div className="line"></div>
        </div>

        <div className="right-content">
          <div className="icon">✔</div>
          <h2>Bienvenue</h2>
          <p>
            Organisez vos tâches et augmentez votre productivité avec notre
            application simple et efficace.
          </p>
        </div>
      </div>
    </div>
  );
}
