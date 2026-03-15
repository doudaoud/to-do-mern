import "./styles/register.css";

export default function Register() {
  return (
    <div className="register-container">
      {/* LEFT SIDE */}
      <div className="form-section">
        <div className="form-box">
          <h1>Créer un compte</h1>
          <p className="subtitle">
            Rejoignez-nous et commencez à organiser vos tâches
          </p>

          <form>
            <div className="input-group">
              <label>Nom complet</label>
              <input type="text" placeholder="Jean Dupont" />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="vous@exemple.com" />
            </div>

            <div className="input-group">
              <label>Mot de passe</label>

              <div className="password-box">
                <input type="password" placeholder="••••••••" />

                <button type="button">👁</button>
              </div>
            </div>

            <div className="input-group">
              <label>Confirmer le mot de passe</label>

              <div className="password-box">
                <input type="password" placeholder="••••••••" />

                <button type="button">👁</button>
              </div>
            </div>

            <button className="register-btn">Créer mon compte</button>
          </form>

          <p className="login-link">
            Vous avez déjà un compte ? <span>Se connecter</span>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="visual-section">
        <div className="visual-content">
          <div className="icon">✨</div>

          <h2>Commencez maintenant</h2>

          <p>
            Créez votre compte en quelques secondes et accédez à tous les outils
            pour gérer vos tâches efficacement.
          </p>
        </div>
      </div>
    </div>
  );
}
