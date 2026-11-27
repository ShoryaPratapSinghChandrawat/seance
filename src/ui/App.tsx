export default function App() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="SÉANCE home">
          <span className="sigil" aria-hidden="true">✳</span>
          <span>SÉANCE</span>
        </a>
        <span className="topbar-note"><span className="status-dot" /> DIGITAL ARCHAEOLOGY LAB</span>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span>FIELD NOTE 001</span><span className="eyebrow-line" /></p>
          <h1 id="hero-title">Some things<br />deserve to <em>run</em><br />again.</h1>
          <p className="intro">
            SÉANCE is a preservation lab for software left behind by the web.
            We are building the tools to examine old Flash artifacts and give
            them a chance to speak again.
          </p>
          <div className="development-tag"><span className="tag-mark">✳</span> THE ARCHIVE IS TAKING SHAPE</div>
        </div>

        <aside className="artifact-card" aria-label="Project status">
          <div className="card-topline"><span>SPECIMEN / 00</span><span>STATUS: IN DEVELOPMENT</span></div>
          <div className="orbital-art" aria-hidden="true">
            <span className="orbit orbit-one" />
            <span className="orbit orbit-two" />
            <span className="orbit orbit-three" />
            <span className="core">S</span>
            <span className="spark spark-a">✳</span>
            <span className="spark spark-b">·</span>
          </div>
          <div className="card-caption">
            <span className="caption-index">01 — PRESERVATION</span>
            <span className="caption-rule" />
            <p>Not nostalgia.<br /><strong>A second chance.</strong></p>
          </div>
          <span className="card-corner" aria-hidden="true">S / 26</span>
        </aside>
      </section>

      <footer className="footer">
        <span>MADE FOR THE FRAGILE THINGS WE KEEP</span>
        <span>V. 0.1 — FOUNDATION</span>
      </footer>
    </main>
  );
}
