import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Menu from "../components/Menu";
import { SelectedContext } from "../contexts/SelectedContext";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ListTodo,
  LogOut,
  Menu as MenuIcon,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import "./styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selected, setSelected] = useState({ categorie: "Tous", priorite: "Toutes" });

  const userId = localStorage.getItem("userId");
  const nomComplet = localStorage.getItem("nomComplet") || "Utilisateur";

  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("TokenJwt");
        const res = await axios.get(
          `http://localhost:3000/api/tache/stats/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setStats(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [userId, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const completionRate =
    stats && stats.total > 0
      ? Math.round((stats.completed / stats.total) * 100)
      : 0;

  const categoryColors = {
    Work: "#0066ff",
    Personal: "#8b5cf6",
    Meeting: "#f59e0b",
    Development: "#10b981",
    Documentation: "#64748b",
    Other: "#ec4899",
  };

  const categoryLabels = {
    Work: "Travail",
    Personal: "Personnel",
    Meeting: "Réunions",
    Development: "Développement",
    Documentation: "Documentation",
    Other: "Autre",
  };

  const priorityColors = { High: "#ef4444", Medium: "#f59e0b", Low: "#10b981" };
  const priorityLabels = { High: "Haute", Medium: "Moyenne", Low: "Basse" };

  const maxCategory =
    stats && stats.categories
      ? Math.max(1, ...Object.values(stats.categories))
      : 1;
  const maxPriority =
    stats && stats.priorities
      ? Math.max(1, ...Object.values(stats.priorities))
      : 1;

  return (
    <div className="dashboard-layout">
      <SelectedContext.Provider value={{ selected, setSelected }}>
        <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </SelectedContext.Provider>

      {isMenuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div className="dashboard-header-left">
            <button
              className="menu-toggle-btn"
              onClick={() => setIsMenuOpen(true)}
            >
              <MenuIcon size={22} />
            </button>
            <div>
              <h1 className="dashboard-title">Tableau de bord</h1>
              <p className="dashboard-date">{today}</p>
            </div>
          </div>
          <div className="dashboard-header-right">
            <button
              className="goto-tasks-btn"
              onClick={() => navigate(`/profile/${userId}`)}
            >
              <ListTodo size={16} />
              Mes tâches
              <ArrowRight size={16} />
            </button>
            <button className="dashboard-logout-btn" onClick={handleLogout}>
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        </header>

        {/* Welcome banner */}
        <div className="welcome-banner">
          <div className="welcome-text">
            <h2>Bonjour, {nomComplet.split(" ")[0]} 👋</h2>
            <p>Voici un aperçu de votre productivité aujourd'hui.</p>
          </div>
          <TrendingUp size={48} className="welcome-icon" />
        </div>

        {loading ? (
          <div className="dashboard-loading">
            <div className="loading-spinner" />
            <p>Chargement des statistiques...</p>
          </div>
        ) : !stats || stats.total === 0 ? (
          <div className="dashboard-empty">
            <ListTodo size={48} />
            <h3>Aucune tâche pour l'instant</h3>
            <p>Créez votre première tâche pour voir vos statistiques ici.</p>
            <button
              className="goto-tasks-btn"
              onClick={() => navigate(`/profile/${userId}`)}
            >
              Créer une tâche
            </button>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card stat-total">
                <div className="stat-icon-wrap">
                  <ListTodo size={22} />
                </div>
                <div>
                  <p className="stat-label">Total</p>
                  <p className="stat-value">{stats.total}</p>
                </div>
              </div>
              <div className="stat-card stat-completed">
                <div className="stat-icon-wrap">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <p className="stat-label">Complétées</p>
                  <p className="stat-value">{stats.completed}</p>
                </div>
              </div>
              <div className="stat-card stat-pending">
                <div className="stat-icon-wrap">
                  <Clock size={22} />
                </div>
                <div>
                  <p className="stat-label">En cours</p>
                  <p className="stat-value">{stats.pending}</p>
                </div>
              </div>
              <div className="stat-card stat-overdue">
                <div className="stat-icon-wrap">
                  <AlertCircle size={22} />
                </div>
                <div>
                  <p className="stat-label">En retard</p>
                  <p className="stat-value">{stats.overdue}</p>
                </div>
              </div>
            </div>

            {/* Middle Row */}
            <div className="dashboard-row">
              {/* Progression */}
              <div className="dashboard-card">
                <h3 className="card-title">Progression globale</h3>
                <div className="progress-circle-wrap">
                  <svg className="progress-ring" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="12"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#0066ff"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 50}`}
                      strokeDashoffset={`${2 * Math.PI * 50 * (1 - completionRate / 100)}`}
                      transform="rotate(-90 60 60)"
                    />
                    <text
                      x="60"
                      y="60"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="20"
                      fontWeight="700"
                      fill="#1e293b"
                    >
                      {completionRate}%
                    </text>
                    <text
                      x="60"
                      y="78"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="9"
                      fill="#64748b"
                    >
                      complété
                    </text>
                  </svg>
                </div>
                <div className="progress-legend">
                  <span className="legend-dot" style={{ background: "#0066ff" }} />
                  <span>{stats.completed} tâches complétées</span>
                </div>
                <div className="progress-legend">
                  <span className="legend-dot" style={{ background: "#e2e8f0" }} />
                  <span>{stats.pending} tâches restantes</span>
                </div>
              </div>

              {/* Par catégorie */}
              <div className="dashboard-card">
                <h3 className="card-title">Par catégorie</h3>
                <div className="bar-list">
                  {Object.entries(stats.categories).map(([cat, count]) => (
                    <div key={cat} className="bar-item">
                      <div className="bar-label">
                        <span
                          className="bar-dot"
                          style={{ background: categoryColors[cat] || "#64748b" }}
                        />
                        <span>{categoryLabels[cat] || cat}</span>
                        <span className="bar-count">{count}</span>
                      </div>
                      <div className="bar-track">
                        <div
                          className="bar-fill"
                          style={{
                            width: `${(count / maxCategory) * 100}%`,
                            background: categoryColors[cat] || "#64748b",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="dashboard-row">
              {/* Par priorité */}
              <div className="dashboard-card">
                <h3 className="card-title">Par priorité</h3>
                <div className="bar-list">
                  {Object.entries(stats.priorities).map(([prio, count]) => (
                    <div key={prio} className="bar-item">
                      <div className="bar-label">
                        <span
                          className="bar-dot"
                          style={{ background: priorityColors[prio] }}
                        />
                        <span>{priorityLabels[prio]}</span>
                        <span className="bar-count">{count}</span>
                      </div>
                      <div className="bar-track">
                        <div
                          className="bar-fill"
                          style={{
                            width: `${(count / maxPriority) * 100}%`,
                            background: priorityColors[prio],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tâches récentes */}
              <div className="dashboard-card">
                <h3 className="card-title">Tâches récentes</h3>
                <div className="recent-list">
                  {stats.recent.length === 0 ? (
                    <p className="no-tasks">Aucune tâche.</p>
                  ) : (
                    stats.recent.map((t) => (
                      <div key={t._id} className="recent-item">
                        <span
                          className={`recent-check ${t.faite ? "done" : ""}`}
                        >
                          {t.faite ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                        </span>
                        <div className="recent-info">
                          <p
                            className="recent-title"
                            style={{ textDecoration: t.faite ? "line-through" : "none" }}
                          >
                            {t.title}
                          </p>
                          <div className="recent-badges">
                            <span
                              className="recent-badge"
                              style={{ color: priorityColors[t.priorite] }}
                            >
                              {priorityLabels[t.priorite]}
                            </span>
                            <span className="recent-badge-cat">
                              {categoryLabels[t.categorie] || t.categorie}
                            </span>
                          </div>
                        </div>
                        <span className="recent-date">
                          {new Date(t.deadline).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                    ))
                  )}
                </div>
                <button
                  className="see-all-btn"
                  onClick={() => navigate(`/profile/${userId}`)}
                >
                  Voir toutes les tâches <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
