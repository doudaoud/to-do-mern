import { useState } from "react";
import "./styles/login.css";
import AnimatedContent from "./AnimatedContent";
import { Eye, EyeOff } from "lucide-react";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setLogin({ ...login, [id]: value });
  };

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

            <form
              className="login-form"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="form-group">
                <label htmlFor="email">Adresse email</label>
                <input
                  id="email"
                  type="email"
                  onChange={handleChange}
                  placeholder="vous@exemple.com"
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

              <button className="login-btn">Se connecter</button>
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
