import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <div className="home">
      
      {/* HERO */}
      <section className="hero">
        <h1>SecureVault</h1>
        <p>
          A secure place to store your private notes.
          Encrypted. Private. Yours.
        </p>

        <div className="hero-buttons">
          <Link to="/register" className="btn primary">Get Started</Link>
          <Link to="/login" className="btn secondary">Login</Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card">
          <h3>🔐 End-to-End Security</h3>
          <p>Your notes are protected using modern security practices.</p>
        </div>

        <div className="feature-card">
          <h3>🧠 Simple & Clean</h3>
          <p>No clutter. Just secure notes.</p>
        </div>

        <div className="feature-card">
          <h3>🌐 Access Anywhere</h3>
          <p>Login securely from any device.</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="steps">
        <h2>How It Works</h2>
        <ol>
          <li>Create an account</li>
          <li>Login securely</li>
          <li>Store private notes safely</li>
        </ol>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Start protecting your notes today</h2>
        <Link to="/register" className="btn primary">Create Free Account</Link>
      </section>

    </div>
  );
}
