
      
  import React, { useState } from "react";

const CATEGORIES = [
  "Borsa",
  "Amigurumi",
  "Corredino bebè",
  "Accessori (sciarpa, cappello, guanti)",
  "Coperta / plaid",
  "Altro"
];

function ChainStitch({ className = "", style = {} }) {
  return (
    <svg
      viewBox="0 0 400 20"
      className={className}
      style={style}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,10 C10,0 20,20 30,10 C40,0 50,20 60,10 C70,0 80,20 90,10 C100,0 110,20 120,10 C130,0 140,20 150,10 C160,0 170,20 180,10 C190,0 200,20 210,10 C220,0 230,20 240,10 C250,0 260,20 270,10 C280,0 290,20 300,10 C310,0 320,20 330,10 C340,0 350,20 360,10 C370,0 380,20 390,10 C395,5 398,15 400,10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function App() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState("");

  const canGenerate = description.trim().length > 2 && !loading;

  async function handleGenerate() {
    if (!canGenerate) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, description: description.trim() })
      });

      if (!response.ok) throw new Error("Errore server");
      const parsed = await response.json();

      if (!parsed.hook || !parsed.cta) throw new Error("Risposta incompleta");
      setResult(parsed);
    } catch (err) {
      setError("Qualcosa non ha funzionato. Riprova tra un momento.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy(text, which) {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(which);
      setTimeout(() => setCopied(""), 1500);
    });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#3B1F2B",
        color: "#F5EFE3",
        fontFamily: "'Work Sans', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "48px 20px 80px"
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        .hs-select:focus, .hs-textarea:focus, .hs-btn:focus-visible, .hs-copy:focus-visible {
          outline: 2px solid #D9A72E;
          outline-offset: 2px;
        }
        .hs-btn { transition: transform 0.15s ease, background 0.15s ease; }
        .hs-btn:hover:not(:disabled) { transform: translateY(-1px); background: #E8B93A; }
        .hs-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        @media (prefers-reduced-motion: reduce) { .hs-btn { transition: none; } }
      `}</style>

      <div style={{ width: "100%", maxWidth: 560 }}>
        <div
          style={{
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#8FA68E",
            fontWeight: 600,
            marginBottom: 10
          }}
        >
          Hook&amp;Sale — copilota AI per creative
        </div>

        <h1
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: "clamp(28px, 5vw, 40px)",
            lineHeight: 1.15,
            margin: "0 0 14px",
            color: "#F5EFE3"
          }}
        >
          Dì cosa hai creato. Ricevi le parole per venderlo.
        </h1>

        <p style={{ fontSize: 16, lineHeight: 1.6, color: "#D8CBB8", margin: "0 0 32px", maxWidth: 480 }}>
          Scegli la categoria, descrivi il pezzo in poche parole e l'AI genera
          subito un hook e una CTA pronti da usare sotto il tuo prossimo reel.
        </p>

        <ChainStitch style={{ width: "100%", height: 18, color: "#D9A72E", opacity: 0.7, marginBottom: 28 }} />

        <div style={{ background: "#4A2838", borderRadius: 16, padding: 24, boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}>
          <label htmlFor="hs-category" style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "#D8CBB8" }}>
            Cosa hai creato
          </label>
          <select
            id="hs-category"
            className="hs-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 10,
              border: "1px solid #6B4356",
              background: "#3B1F2B",
              color: "#F5EFE3",
              fontSize: 15,
              marginBottom: 18,
              fontFamily: "inherit"
            }}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <label htmlFor="hs-description" style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6, color: "#D8CBB8" }}>
            Descrivilo in poche parole
          </label>
          <textarea
            id="hs-description"
            className="hs-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Es. borsa a righe azzurre e bianche, manici in corda"
            rows={3}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 10,
              border: "1px solid #6B4356",
              background: "#3B1F2B",
              color: "#F5EFE3",
              fontSize: 15,
              fontFamily: "inherit",
              resize: "vertical",
              marginBottom: 20
            }}
          />

          <button
            className="hs-btn"
            onClick={handleGenerate}
            disabled={!canGenerate}
            style={{
              width: "100%",
              padding: "14px 20px",
              borderRadius: 10,
              border: "none",
              background: "#D9A72E",
              color: "#2B1620",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit"
            }}
          >
            {loading ? "Genero…" : "Genera hook e CTA"}
          </button>

          {error && <p style={{ color: "#E8A3A3", fontSize: 14, marginTop: 14, marginBottom: 0 }}>{error}</p>}
        </div>

        {result && (
          <div style={{ marginTop: 28 }}>
            <ChainStitch style={{ width: "100%", height: 18, color: "#8FA68E", opacity: 0.7, marginBottom: 20 }} />
            <div style={{ border: "1.5px dashed #D9A72E", borderRadius: 14, padding: "20px 22px", background: "rgba(217,167,46,0.06)" }}>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8FA68E", fontWeight: 600, marginBottom: 6 }}>
                  Hook
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.5, margin: "0 0 10px", fontFamily: "'Fraunces', serif", fontWeight: 500 }}>
                  {result.hook}
                </p>
                <button
                  className="hs-copy"
                  onClick={() => handleCopy(result.hook, "hook")}
                  style={{ background: "none", border: "1px solid #8FA68E", color: "#8FA68E", borderRadius: 8, padding: "6px 12px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
                >
                  {copied === "hook" ? "Copiato" : "Copia hook"}
                </button>
              </div>

              <div>
                <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8FA68E", fontWeight: 600, marginBottom: 6 }}>
                  CTA
                </div>
                <p style={{ fontSize: 16, lineHeight: 1.5, margin: "0 0 10px", color: "#F5EFE3" }}>
                  {result.cta}
                </p>
                <button
                  className="hs-copy"
                  onClick={() => handleCopy(result.cta, "cta")}
                  style={{ background: "none", border: "1px solid #8FA68E", color: "#8FA68E", borderRadius: 8, padding: "6px 12px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
                >
                  {copied === "cta" ? "Copiato" : "Copia CTA"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
  

