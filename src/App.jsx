import { useState, useEffect, useRef } from "react";

// DNACreative palette
const C = {
  navy: "#1B2A4A",
  orange: "#F28C28",
  lime: "#7BC142",
  cyan: "#29B6D1",
  purple: "#6B3FA0",
  blue: "#2D5FBF",
  cream: "#FAF8F5",
  warmGray: "#E8E3DC",
  midGray: "#8A8578",
  darkText: "#2C2A26",
  white: "#FFFFFF",
};

const domains = {
  self: { label: "Self", color: C.orange, icon: "◉" },
  society: { label: "Society", color: C.blue, icon: "◎" },
  spaces: { label: "Spaces", color: C.cyan, icon: "◈" },
  sustainability: { label: "Sustainability", color: C.lime, icon: "◇" },
};

// Floating dots decoration component
function Dots({ color, count = 5, area = "topright" }) {
  const dotsRef = useRef(null);
  if (!dotsRef.current) {
    dotsRef.current = Array.from({ length: count }, (_, i) => {
      const size = 4 + Math.random() * 12;
      let x, y;
      if (area === "topright") { x = 70 + Math.random() * 28; y = Math.random() * 30; }
      else if (area === "bottomleft") { x = Math.random() * 30; y = 70 + Math.random() * 28; }
      else { x = Math.random() * 100; y = Math.random() * 100; }
      return { size, x, y, opacity: 0.15 + Math.random() * 0.25, key: i };
    });
  }
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {dotsRef.current.map(d => (
        <div key={d.key} style={{
          position: "absolute",
          left: `${d.x}%`, top: `${d.y}%`,
          width: d.size, height: d.size,
          borderRadius: "50%",
          backgroundColor: color,
          opacity: d.opacity,
        }} />
      ))}
    </div>
  );
}

// Pack preview component (the "designed pack" view)
function PackPreview({ pack, onClose }) {
  const domain = domains[pack.domain];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(28,42,74,0.6)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      padding: "24px 16px", overflowY: "auto",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 720,
        background: C.cream, borderRadius: 16,
        overflow: "hidden", position: "relative",
        boxShadow: "0 24px 80px rgba(27,42,74,0.3)",
        marginBottom: 40,
      }}>
        {/* Cover section */}
        <div style={{
          background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navy}ee 100%)`,
          padding: "40px 36px 32px", position: "relative", overflow: "hidden",
        }}>
          <Dots color={domain.color} count={12} area="all" />
          <div style={{
            display: "inline-block", padding: "4px 16px", borderRadius: 20,
            background: domain.color, marginBottom: 20,
          }}>
            <span style={{ color: C.white, fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>
              {domain.label}
            </span>
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ marginBottom: 4 }}>
              <span style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 36, color: C.orange, fontWeight: 400 }}>i</span>
              <span style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 36, color: C.white, fontWeight: 700 }}>MPACT</span>
              <span style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 36, color: C.white, fontWeight: 400 }}> Pack</span>
            </div>
            <h2 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 22, color: C.orange, fontWeight: 700, margin: "12px 0 4px", lineHeight: 1.3 }}>
              {pack.title}
            </h2>
            <p style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 17, color: "rgba(255,255,255,0.85)", margin: 0, fontStyle: "italic", lineHeight: 1.4 }}>
              {pack.subtitle}
            </p>
          </div>
        </div>

        {/* Challenge callout */}
        <div style={{ padding: "28px 36px 0" }}>
          <div style={{
            borderLeft: `4px solid ${C.orange}`, paddingLeft: 20, margin: "0 0 28px",
          }}>
            <p style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 15, color: C.navy, lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
              {pack.challenge}
            </p>
          </div>
        </div>

        {/* Quick info bar */}
        <div style={{ display: "flex", gap: 1, margin: "0 36px 28px", borderRadius: 10, overflow: "hidden" }}>
          {[
            { label: "Evidence Window", value: pack.window, color: C.orange },
            { label: "Grading", value: pack.grading, color: C.navy },
            { label: "AI Integrity", value: pack.ai, color: C.purple },
          ].map((item, i) => (
            <div key={i} style={{ flex: 1, background: C.warmGray, padding: "14px 14px" }}>
              <div style={{ fontSize: 10, color: C.midGray, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, fontFamily: "system-ui" }}>{item.label}</div>
              <div style={{ fontSize: 13, color: item.color, fontWeight: 700, fontFamily: "'Libre Baskerville', Georgia, serif", lineHeight: 1.3 }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Evidence section */}
        <div style={{ padding: "0 36px 28px" }}>
          <h3 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 16, color: C.navy, fontWeight: 700, margin: "0 0 14px", borderBottom: `2px solid ${C.warmGray}`, paddingBottom: 8 }}>
            Evidence Portfolio
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {pack.evidence.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px",
                background: i % 2 === 0 ? C.warmGray + "88" : "transparent", borderRadius: 8,
              }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${domain.color}`, flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 10, color: domain.color, fontWeight: 700 }}>{i + 1}</span>
                </div>
                <span style={{ fontSize: 13, color: C.darkText, lineHeight: 1.4, fontFamily: "'Libre Baskerville', Georgia, serif" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phases section */}
        <div style={{ padding: "0 36px 32px" }}>
          <h3 style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 16, color: C.navy, fontWeight: 700, margin: "0 0 14px", borderBottom: `2px solid ${C.warmGray}`, paddingBottom: 8 }}>
            Teacher Journey
          </h3>
          {pack.phases.map((phase, i) => {
            const [name, desc] = phase.split(": ");
            const phaseColors = [C.cyan, C.orange, C.lime, C.purple];
            return (
              <div key={i} style={{ display: "flex", gap: 14, marginBottom: 12, alignItems: "flex-start" }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                  background: phaseColors[i], display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ color: C.white, fontSize: 14, fontWeight: 700 }}>{i + 1}</span>
                </div>
                <div style={{ paddingTop: 4 }}>
                  <span style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 14, fontWeight: 700, color: C.navy }}>{name}: </span>
                  <span style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 14, color: C.darkText, lineHeight: 1.5 }}>{desc}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Download button */}
        {pack.pdf && (
          <div style={{ padding: "0 36px 28px" }}>
            <a
              href={`/packs/${pack.pdf}`}
              download
              onClick={e => e.stopPropagation()}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                width: "100%", padding: "16px 24px",
                background: domain.color, color: C.white,
                borderRadius: 10, textDecoration: "none",
                fontFamily: "'Libre Baskerville', Georgia, serif",
                fontSize: 15, fontWeight: 700, letterSpacing: 0.5,
                transition: "opacity 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              <span style={{ fontSize: 18 }}>↓</span>
              Download Full iMPACT Pack (PDF)
            </a>
            <p style={{
              textAlign: "center", fontSize: 11, color: C.midGray,
              margin: "10px 0 0", fontFamily: "system-ui",
            }}>
              Includes: Challenge · Evidence Guide · Rubric · Teacher Setup · FAQ · Parent Letter
            </p>
          </div>
        )}

        {/* Footer */}
        <div style={{
          background: C.navy, padding: "20px 36px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <span style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 14, color: C.orange }}>i</span>
            <span style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 14, color: C.white, fontWeight: 700 }}>MPACT</span>
            <span style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 12, color: "rgba(255,255,255,0.5)", marginLeft: 8 }}>Making Learning Matter</span>
          </div>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "system-ui" }}>DNACreative</span>
        </div>

        {/* Close button */}
        <button onClick={onClose} style={{
          position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: "50%",
          background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer",
          color: C.white, fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(4px)", transition: "background 0.2s",
        }}
          onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.3)"}
          onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.15)"}
        >×</button>
      </div>
    </div>
  );
}

export default function App() {
  const [packs, setPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeDomain, setActiveDomain] = useState(null);
  const [selectedPack, setSelectedPack] = useState(null);
  const [animatedIn, setAnimatedIn] = useState(false);
  const inputRef = useRef(null);

  // Load packs from JSON file
  useEffect(() => {
    fetch("/packs.json")
      .then(r => r.json())
      .then(data => {
        setPacks(data);
        setLoading(false);
        setTimeout(() => setAnimatedIn(true), 50);
      })
      .catch(() => {
        setLoading(false);
        setAnimatedIn(true);
      });
  }, []);

  const hasSearch = query.length > 0 || activeDomain !== null;

  const filtered = packs.filter(p => {
    const matchesDomain = !activeDomain || p.domain === activeDomain;
    const q = query.toLowerCase();
    const matchesQuery = !q ||
      p.unit.toLowerCase().includes(q) ||
      p.subject.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q) ||
      p.challenge.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q);
    return matchesDomain && matchesQuery;
  });

  const suggestedTerms = ["energy", "persuasive writing", "nutrition", "biodiversity", "design", "financial literacy", "accessibility", "transport", "sound", "enterprise"];

  return (
    <div style={{
      minHeight: "100vh", background: C.cream, position: "relative", overflow: "hidden",
      fontFamily: "'Libre Baskerville', Georgia, serif",
    }}>
      {/* Background dots */}
      <Dots color={C.orange} count={8} area="topright" />
      <Dots color={C.lime} count={6} area="bottomleft" />

      {/* Header */}
      <div style={{
        background: C.navy, padding: "48px 32px 44px", position: "relative", overflow: "hidden",
      }}>
        <Dots color={C.orange} count={15} area="all" />
        <Dots color={C.cyan} count={10} area="all" />
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{
            opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease-out",
          }}>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 42, color: C.orange }}>i</span>
              <span style={{ fontSize: 42, color: C.white, fontWeight: 700 }}>MPACT</span>
            </div>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", margin: "0 0 32px", fontStyle: "italic", letterSpacing: 0.5 }}>
              Making Learning Matter
            </p>
          </div>

          {/* Search */}
          <div style={{
            opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease-out 0.2s",
          }}>
            <label style={{ display: "block", fontSize: 22, color: C.white, marginBottom: 16, fontWeight: 700, lineHeight: 1.3 }}>
              Make my unit on <span style={{ borderBottom: `3px solid ${C.orange}`, paddingBottom: 2 }}>_____</span> matter
            </label>
            <div style={{ position: "relative" }}>
              <input
                ref={inputRef}
                type="text"
                placeholder="energy, persuasive writing, nutrition, biodiversity..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{
                  width: "100%", padding: "16px 20px", fontSize: 17,
                  fontFamily: "'Libre Baskerville', Georgia, serif",
                  border: "none", borderRadius: 12,
                  background: "rgba(255,255,255,0.12)",
                  color: C.white, outline: "none",
                  boxSizing: "border-box",
                  transition: "background 0.3s",
                }}
                onFocus={e => e.target.style.background = "rgba(255,255,255,0.18)"}
                onBlur={e => e.target.style.background = "rgba(255,255,255,0.12)"}
              />
              {query && (
                <button onClick={() => setQuery("")} style={{
                  position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", color: "rgba(255,255,255,0.5)",
                  fontSize: 20, cursor: "pointer", padding: 4,
                }}>×</button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Domain filters */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 32px 0" }}>
        <div style={{
          display: "flex", gap: 8, flexWrap: "wrap",
          opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.6s ease-out 0.4s",
        }}>
          <button
            onClick={() => setActiveDomain(null)}
            style={{
              padding: "8px 20px", borderRadius: 24, border: `2px solid ${C.warmGray}`,
              background: !activeDomain ? C.navy : "transparent",
              color: !activeDomain ? C.white : C.midGray,
              fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 13,
              cursor: "pointer", fontWeight: 600, transition: "all 0.2s",
            }}
          >All Domains</button>
          {Object.entries(domains).map(([key, d]) => (
            <button
              key={key}
              onClick={() => setActiveDomain(activeDomain === key ? null : key)}
              style={{
                padding: "8px 20px", borderRadius: 24, border: `2px solid ${d.color}`,
                background: activeDomain === key ? d.color : "transparent",
                color: activeDomain === key ? C.white : d.color,
                fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 13,
                cursor: "pointer", fontWeight: 600, transition: "all 0.2s",
              }}
            >{d.label}</button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px 32px 60px" }}>

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: C.midGray }}>
            <p style={{ fontSize: 16, fontStyle: "italic" }}>Loading iMPACT Packs...</p>
          </div>
        ) : !hasSearch ? (
          <div style={{
            textAlign: "center", padding: "60px 20px 80px",
            opacity: animatedIn ? 1 : 0, transform: animatedIn ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.8s ease-out 0.6s",
          }}>
            <div style={{ marginBottom: 24 }}>
              {Object.values(domains).map((d, i) => (
                <span key={i} style={{
                  display: "inline-block", width: 12, height: 12, borderRadius: "50%",
                  background: d.color, margin: "0 6px",
                  opacity: 0.6,
                }} />
              ))}
            </div>
            <p style={{ fontSize: 20, color: C.navy, fontWeight: 700, marginBottom: 8, lineHeight: 1.4 }}>
              What do you teach?
            </p>
            <p style={{ fontSize: 15, color: C.midGray, margin: "0 0 28px", lineHeight: 1.6, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
              Type a topic, subject, or keyword above and discover how to turn your existing unit into an opportunity for real-world positive impact.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              {suggestedTerms.map(term => (
                <button
                  key={term}
                  onClick={() => { setQuery(term); inputRef.current?.focus(); }}
                  style={{
                    padding: "8px 18px", borderRadius: 20,
                    background: "transparent", border: `1.5px solid ${C.warmGray}`,
                    color: C.midGray, fontFamily: "'Libre Baskerville', Georgia, serif",
                    fontSize: 13, cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { e.target.style.borderColor = C.orange; e.target.style.color = C.orange; }}
                  onMouseLeave={e => { e.target.style.borderColor = C.warmGray; e.target.style.color = C.midGray; }}
                >{term}</button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 13, color: C.midGray, margin: "0 0 20px", fontStyle: "italic" }}>
              {filtered.length} impact {filtered.length === 1 ? "pack" : "packs"} found
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {filtered.map((pack) => {
            const domain = domains[pack.domain];
            return (
              <div
                key={pack.id}
                onClick={() => setSelectedPack(pack)}
                style={{
                  background: C.white, borderRadius: 14, overflow: "hidden",
                  cursor: "pointer", position: "relative",
                  boxShadow: "0 2px 12px rgba(27,42,74,0.06)",
                  transition: "all 0.25s ease",
                  opacity: animatedIn ? 1 : 0,
                  transform: animatedIn ? "translateY(0)" : "translateY(20px)",
                  border: "1px solid transparent",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(27,42,74,0.12)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.borderColor = domain.color + "44";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(27,42,74,0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "transparent";
                }}
              >
                <div style={{ height: 4, background: domain.color }} />
                <div style={{ padding: "18px 20px 20px", position: "relative" }}>
                  <Dots color={domain.color} count={4} area="topright" />
                  <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
                    <span style={{
                      display: "inline-block", padding: "3px 10px", borderRadius: 12,
                      background: domain.color, fontSize: 10, fontWeight: 700,
                      color: C.white, letterSpacing: 1, textTransform: "uppercase",
                      fontFamily: "system-ui",
                    }}>{domain.label}</span>
                    <span style={{
                      display: "inline-block", padding: "3px 10px", borderRadius: 12,
                      background: C.warmGray, fontSize: 10, fontWeight: 600,
                      color: C.midGray, letterSpacing: 0.5,
                      fontFamily: "system-ui",
                    }}>{pack.subject}</span>
                  </div>
                  <h3 style={{ fontSize: 15, color: C.navy, fontWeight: 700, margin: "0 0 4px", lineHeight: 1.35 }}>
                    {pack.title}
                  </h3>
                  <p style={{ fontSize: 13, color: C.midGray, margin: "0 0 14px", lineHeight: 1.4, fontStyle: "italic" }}>
                    {pack.subtitle}
                  </p>
                  <div style={{ display: "flex", gap: 16, fontSize: 11, color: C.midGray, fontFamily: "system-ui" }}>
                    <span>⏱ {pack.window}</span>
                    <span>📋 {pack.evidence.length} evidence items</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{
            textAlign: "center", padding: "60px 20px",
            color: C.midGray, fontStyle: "italic",
          }}>
            <p style={{ fontSize: 18, marginBottom: 8 }}>No packs match that search yet.</p>
            <p style={{ fontSize: 14 }}>We're building new iMPACT Packs all the time. Try a different keyword or browse all domains.</p>
          </div>
        )}
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{
        background: C.navy, padding: "32px 32px", textAlign: "center",
      }}>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontSize: 20, color: C.orange }}>i</span>
          <span style={{ fontSize: 20, color: C.white, fontWeight: 700 }}>MPACT</span>
          <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginLeft: 10 }}>Making Learning Matter</span>
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", margin: 0, fontFamily: "system-ui" }}>
          A DNACreative product · dnacreative.co/impact
        </p>
      </div>

      {selectedPack && <PackPreview pack={selectedPack} onClose={() => setSelectedPack(null)} />}
    </div>
  );
}
