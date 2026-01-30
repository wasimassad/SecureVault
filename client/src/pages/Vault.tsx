import { useEffect, useMemo, useState } from "react";
import "../styles/vault.css";
import { noteService } from "../services/noteService";
import { type Note, type NoteDetail } from "../services/noteService";
import { useNavigate } from "react-router-dom";

type Mode = "none" | "create" | "view" | "edit";

export default function Vault() {
  const nav = useNavigate();

  const [items, setItems] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  const [mode, setMode] = useState<Mode>("none");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<NoteDetail | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [formError, setFormError] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((x) => x.title.toLowerCase().includes(s));
  }, [items, q]);

  async function refresh() {
    setError("");
    setLoading(true);
    try {
      const data = await noteService.list();
      setItems(data);
    } catch (e: any) {
      // common when token missing/expired
      const msg = e?.message || "Failed to load";
      setError(msg);
      if (msg.toLowerCase().includes("401") || msg.toLowerCase().includes("unauthorized")) {
        nav("/"); // back to login
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  function openCreate() {
    setMode("create");
    setSelectedId(null);
    setDetail(null);
    setTitle("");
    setContent("");
    setFormError("");
  }

  async function openView(id: string) {
    setMode("view");
    setSelectedId(id);
    setDetail(null);
    setFormError("");
    setBusy(true);
    try {
      const data = await noteService.get(id);
      setDetail(data);
      setTitle(data.title);
      setContent(data.content);
    } catch (e: any) {
      setError(e?.message || "Failed to open");
      setMode("none");
    } finally {
      setBusy(false);
    }
  }

  async function openEdit(id: string) {
    setMode("edit");
    setSelectedId(id);
    setDetail(null);
    setFormError("");
    setBusy(true);
    try {
      const data = await noteService.get(id);
      setDetail(data);
      setTitle(data.title);
      setContent(data.content);
    } catch (e: any) {
      setError(e?.message || "Failed to open for edit");
      setMode("none");
    } finally {
      setBusy(false);
    }
  }

  function closeModal() {
    setMode("none");
    setSelectedId(null);
    setDetail(null);
    setTitle("");
    setContent("");
    setFormError("");
  }

  async function handleSave() {
    const t = title.trim();
    const c = content.trim();
    setFormError("");

    if (!t || !c) {
      setFormError("Title and content are required.");
      return;
    }

    setBusy(true);
    try {
      if (mode === "create") {
        const created = await noteService.create({ title: t, content: c });
        setItems((prev) => [created, ...prev]);
        closeModal();
      } else if (mode === "edit" && selectedId) {
        const updated = await noteService.update(selectedId, { title: t, content: c });
        setItems((prev) => prev.map((x) => (x.id === updated.id ? { ...x, ...updated } : x)));
        closeModal();
      }
      await refresh();
    } catch (e: any) {
      setFormError(e?.message || "Save failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    const ok = window.confirm("Delete this secret?");
    if (!ok) return;

    setBusy(true);
    setError("");
    try {
      await noteService.remove(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
      if (selectedId === id) closeModal();
    } catch (e: any) {
      setError(e?.message || "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  const isOpen = mode !== "none";

  return (
    <div className="vault-page">
      <div className="vault-wrap">
        <div className="vault-topbar">
          <div>
            <h1 className="vault-title">My Vault</h1>
            <p className="vault-subtitle">Encrypted notes — secure storage 🔒</p>
          </div>

          <div className="vault-top-actions">
            <button className="vault-btn" onClick={refresh} disabled={loading || busy}>
              Refresh
            </button>
            <button className="vault-btn vault-btn-primary" onClick={openCreate} disabled={busy}>
              + New Secret
            </button>
          </div>
        </div>

        <div className="vault-card">
          <div className="vault-controls">
            <input
              className="vault-input"
              placeholder="Search secrets..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <div className="vault-count">
              {loading ? "…" : `${filtered.length} item(s)`}
            </div>
          </div>

          {error && <p className="vault-error">{error}</p>}
          {loading && <p className="vault-status">Loading vault…</p>}

          {!loading && filtered.length === 0 && (
            <p className="vault-status">No secrets yet. Click “New Secret”.</p>
          )}

          <div className="vault-grid">
            {filtered.map((item) => (
              <div className="vault-item" key={item.id}>
                <h3 className="vault-item-title">{item.title}</h3>

                <div className="vault-item-meta">
                  <span className="vault-date">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <span className="vault-pill">Encrypted</span>
                </div>

                <div className="vault-actions">
                  <button className="vault-icon-btn" onClick={() => openView(item.id)} disabled={busy}>
                    View
                  </button>
                  <button className="vault-icon-btn" onClick={() => openEdit(item.id)} disabled={busy}>
                    Edit
                  </button>
                  <button className="vault-icon-btn vault-danger" onClick={() => handleDelete(item.id)} disabled={busy} >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {isOpen && (
          <div className="vault-modal-backdrop" onMouseDown={closeModal}>
            <div className="vault-modal" onMouseDown={(e) => e.stopPropagation()}>
              <div className="vault-modal-header">
                <h2 className="vault-modal-title">
                  {mode === "create" && "New Secret"}
                  {mode === "view" && "View Secret"}
                  {mode === "edit" && "Edit Secret"}
                </h2>
                <button className="vault-close" onClick={closeModal} aria-label="Close">
                  ✕
                </button>
              </div>

              {(busy && (mode === "view" || mode === "edit")) ? (
                <p className="vault-status">Loading…</p>
              ) : (
                <>
                  {formError && <p className="vault-error">{formError}</p>}

                  <label className="vault-label">Title</label>
                  <input
                    className="vault-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Email credentials"
                    disabled={mode === "view" || busy}
                  />

                  <label className="vault-label">Content</label>
                  <textarea
                    className="vault-textarea"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your secret here…"
                    disabled={mode === "view" || busy}
                  />

                  <div className="vault-modal-actions">
                    {mode === "view" ? (
                      <>
                        {selectedId && (
                          <button className="vault-btn" onClick={() => openEdit(selectedId)} disabled={busy}>
                            Edit
                          </button>
                        )}
                        <button className="vault-btn" onClick={closeModal}>
                          Close
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="vault-btn vault-btn-primary" onClick={handleSave} disabled={busy}>
                          {busy ? "Saving…" : "Save"}
                        </button>
                        <button className="vault-btn" onClick={closeModal} disabled={busy}>
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
