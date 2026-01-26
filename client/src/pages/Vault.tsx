import { useEffect, useState } from "react";
import "../styles/vault.css";

interface VaultItem {
  id: number;
  title: string;
  createdAt: string;
}

export default function Vault() {
  const [items, setItems] = useState<VaultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setItems([
        { id: 1, title: "Email Credentials", createdAt: "2026-01-20" },
        { id: 2, title: "Bank Notes", createdAt: "2026-01-22" },
      ]);
      setLoading(false);
    }, 600);
  }, []);

  const filtered = items.filter((x) =>
    x.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="vault-page">
      <div className="vault-wrap">
        <div className="vault-topbar">
          <div>
            <h1 className="vault-title">My Vault</h1>
            <p className="vault-subtitle">Your secrets stay encrypted 🔒</p>
          </div>

          <button className="vault-btn vault-btn-primary">+ New Secret</button>
        </div>

        <div className="vault-card">
          <div className="vault-controls">
            <div className="vault-search">
              <input
                className="vault-input"
                placeholder="Search secrets..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <button className="vault-btn">Refresh</button>
          </div>

          {loading && <p className="vault-status">Loading vault...</p>}
          {error && <p className="vault-error">{error}</p>}
          {!loading && filtered.length === 0 && (
            <p className="vault-status">No secrets found.</p>
          )}

          <div className="vault-grid">
            {filtered.map((item) => (
              <div className="vault-item" key={item.id}>
                <h3 className="vault-item-title">{item.title}</h3>

                <div className="vault-item-meta">
                  <span>{item.createdAt}</span>
                  <span className="vault-pill">Encrypted</span>
                </div>

                <div className="vault-actions">
                  <button className="vault-icon-btn">View</button>
                  <button className="vault-icon-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
