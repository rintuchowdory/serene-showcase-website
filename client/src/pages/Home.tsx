import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  Leaf,
  Menu,
  Moon,
  Pause,
  Play,
  Sparkles,
  SunMedium,
  Wind,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

type Screen = {
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  duration: string;
  color: string;
};

const base = import.meta.env.BASE_URL;

const screens: Screen[] = [
  {
    title: "Your daily ritual",
    eyebrow: "Home screen",
    description:
      "A gentle starting point that turns one quiet minute into a habit worth keeping.",
    image: `${base}serene-home.svg`,
    duration: "5–20 min",
    color: "sage",
  },
  {
    title: "Find your focus",
    eyebrow: "Explore screen",
    description:
      "Browse small practices for busy mornings, deep work, and the space between.",
    image: `${base}serene-explore.svg`,
    duration: "12 sessions",
    color: "mist",
  },
  {
    title: "Settle into sleep",
    eyebrow: "Sleep screen",
    description:
      "A softer, darker room for easing out of the day without another bright screen.",
    image: `${base}serene-sleep.svg`,
    duration: "8–30 min",
    color: "night",
  },
];

const principles = [
  {
    number: "01",
    title: "Make it feel easy",
    description: "Less friction means more room for the practice itself.",
    Icon: Check,
  },
  {
    number: "02",
    title: "Respect attention",
    description: "No streak anxiety. No noisy notifications. Just a gentle nudge.",
    Icon: Leaf,
  },
  {
    number: "03",
    title: "Let nature in",
    description: "Warm colors and organic movement give the interface room to breathe.",
    Icon: Wind,
  },
  {
    number: "04",
    title: "Celebrate quietly",
    description: "Progress is worth noticing, without turning calm into a competition.",
    Icon: Sparkles,
  },
];

const inspirations = [
  {
    quote: "You do not have to rush the becoming.",
    label: "For slow mornings",
    image:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1400&q=85",
  },
  {
    quote: "Small steps still move you forward.",
    label: "For the in-between",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85",
  },
  {
    quote: "Breathe in what is. Let go of what was.",
    label: "For winding down",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85",
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const selectedScreen = screens[activeScreen];

  return (
    <div className="serene-site min-h-screen overflow-x-hidden bg-[#f7f6f1] text-[#1f2b26]">
      <div
        className="reading-progress"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        aria-hidden="true"
      />

      <header className="serene-header">
        <nav className="container flex h-[76px] items-center justify-between" aria-label="Primary navigation">
          <button
            type="button"
            className="brand-mark"
            onClick={() => scrollToId("top")}
            aria-label="Back to top"
          >
            <span className="brand-icon">
              <img src={`${base}serene-lotus.svg`} alt="" />
            </span>
            <span>serene</span>
          </button>

          <div className="hidden items-center gap-8 md:flex">
            <button type="button" onClick={() => scrollToId("story")} className="nav-link">
              The ritual
            </button>
            <button type="button" onClick={() => scrollToId("screens")} className="nav-link">
              Inside Serene
            </button>
            <button type="button" onClick={() => scrollToId("principles")} className="nav-link">
              Philosophy
            </button>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/rintuchowdory/serene-showcase-website"
              target="_blank"
              rel="noreferrer"
              className="nav-cta hidden sm:inline-flex"
            >
              Open repository <ArrowUpRight size={15} />
            </a>
            <button
              type="button"
              className="menu-button md:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {isMenuOpen && (
          <div className="mobile-menu md:hidden">
            {[
              ["The ritual", "story"],
              ["Inside Serene", "screens"],
              ["Philosophy", "principles"],
            ].map(([label, id]) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToId(id);
                }}
              >
                {label}
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
        )}
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow eyebrow-light">
                <span className="eyebrow-dot" />
                A calmer way to come back to yourself
              </div>
              <h1>
                Make room
                <br />
                <em>for a little quiet.</em>
              </h1>
              <p className="hero-description">
                Serene is a meditation space designed around real life: a breath between
                meetings, a reset before bed, and five unrushed minutes that belong only to you.
              </p>
              <div className="hero-actions">
                <button type="button" className="button button-light" onClick={() => scrollToId("screens")}>
                  Explore the experience <ArrowDown size={16} />
                </button>
                <button type="button" className="text-button" onClick={() => scrollToId("story")}>
                  See how it flows <ChevronRight size={16} />
                </button>
              </div>
              <div className="hero-note">
                <div className="avatar-stack" aria-hidden="true">
                  <span>J</span>
                  <span>M</span>
                  <span>A</span>
                </div>
                <span>Made for the moments in between.</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-image-frame">
                <img src={`${base}serene-hero.svg`} alt="A calm morning landscape from Serene" />
                <div className="image-fade" />
                <div className="hero-image-label">
                  <span>01</span>
                  <span>Begin gently</span>
                </div>
              </div>
              <div className="floating-session-card">
                <div className="session-card-top">
                  <span className="session-icon"><Leaf size={17} /></span>
                  <span className="live-pill"><span /> ready when you are</span>
                </div>
                <p>Morning clarity</p>
                <div className="session-meta"><Clock3 size={14} /> 08 min <span>•</span> guided by Mira</div>
                <button
                  type="button"
                  className="session-play"
                  onClick={() => setIsPlaying((playing) => !playing)}
                  aria-label={isPlaying ? "Pause morning clarity" : "Play morning clarity"}
                >
                  {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                </button>
              </div>
            </div>
          </div>
          <div className="hero-bottom-line container">
            <span>Scroll to wander through the experience</span>
            <span className="line" />
            <span>↓</span>
          </div>
        </section>

        <section id="story" className="story-section section-space">
          <div className="container">
            <div className="section-intro split-intro">
              <div>
                <div className="eyebrow"><span className="eyebrow-dot" /> Designed for real days</div>
                <h2>Not a new routine.<br /><em>A softer rhythm.</em></h2>
              </div>
              <p>
                The best meditation app is the one that meets you where you are. Serene shapes
                itself around the small windows you already have, making calm feel close instead
                of complicated.
              </p>
            </div>

            <div className="ritual-grid">
              <article className="ritual-card ritual-card-large">
                <div className="ritual-card-art morning-art">
                  <SunMedium size={34} strokeWidth={1.2} />
                  <span className="art-caption">07:42</span>
                </div>
                <div className="ritual-card-content">
                  <span className="card-kicker">01 — Morning</span>
                  <h3>Start with space</h3>
                  <p>Trade the first scroll of the day for a clearer first thought.</p>
                  <button type="button" className="arrow-link" onClick={() => { setActiveScreen(0); scrollToId("screens"); }}>
                    See the home screen <ArrowUpRight size={15} />
                  </button>
                </div>
              </article>
              <article className="ritual-card">
                <div className="ritual-card-art afternoon-art">
                  <Wind size={32} strokeWidth={1.2} />
                  <span className="art-caption">14:16</span>
                </div>
                <div className="ritual-card-content">
                  <span className="card-kicker">02 — Afternoon</span>
                  <h3>Find your center</h3>
                  <p>A two-minute reset for when the day gets loud.</p>
                </div>
              </article>
              <article className="ritual-card">
                <div className="ritual-card-art evening-art">
                  <Moon size={32} strokeWidth={1.2} />
                  <span className="art-caption">22:31</span>
                </div>
                <div className="ritual-card-content">
                  <span className="card-kicker">03 — Evening</span>
                  <h3>Let the day go</h3>
                  <p>Ease into sleep with soundscapes that know when to fade.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="inspiration-section section-space">
          <div className="container">
            <div className="section-intro inspiration-intro">
              <div>
                <div className="eyebrow"><span className="eyebrow-dot" /> A little something to carry</div>
                <h2>Keep a kind thought<br /><em>close by.</em></h2>
              </div>
              <p>
                Beautiful reminders for the moments when you need permission to pause, begin
                again, or simply take the next small step.
              </p>
            </div>

            <div className="inspiration-grid">
              {inspirations.map((item, index) => (
                <article className="inspiration-card" key={item.quote}>
                  <img
                    src={item.image}
                    alt={item.quote}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="inspiration-shade" />
                  <div className="inspiration-card-content">
                    <span className="inspiration-number">0{index + 1}</span>
                    <p>{item.quote}</p>
                    <span className="inspiration-label">{item.label}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="screens" className="screens-section section-space">
          <div className="container">
            <div className="section-intro screens-intro">
              <div>
                <div className="eyebrow"><span className="eyebrow-dot" /> A closer look</div>
                <h2>Quietly considered,<br /><em>down to the detail.</em></h2>
              </div>
              <p>
                Every screen is an invitation, not an interruption. Tap through a few of the
                spaces that make Serene feel like somewhere you want to return to.
              </p>
            </div>

            <div className="screen-tabs" role="tablist" aria-label="Serene screens">
              {screens.map((screen, index) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeScreen === index}
                  key={screen.title}
                  className={activeScreen === index ? "screen-tab active" : "screen-tab"}
                  onClick={() => setActiveScreen(index)}
                >
                  <span>0{index + 1}</span>
                  {screen.title}
                </button>
              ))}
            </div>

            <div className={`screen-feature screen-${selectedScreen.color}`}>
              <div className="screen-feature-copy">
                <span className="card-kicker">{selectedScreen.eyebrow}</span>
                <h3>{selectedScreen.title}</h3>
                <p>{selectedScreen.description}</p>
                <div className="screen-feature-meta">
                  <span><Clock3 size={14} /> {selectedScreen.duration}</span>
                  <span><Sparkles size={14} /> gentle by design</span>
                </div>
                <button type="button" className="button button-dark" onClick={() => setIsViewerOpen(true)}>
                  View full screen <ArrowUpRight size={16} />
                </button>
              </div>
              <button
                type="button"
                className="device-stage"
                onClick={() => setIsViewerOpen(true)}
                aria-label={`View ${selectedScreen.title} full screen`}
              >
                <div className="device-glow" />
                <div className="device-frame">
                  <div className="device-notch" />
                  <img src={selectedScreen.image} alt={`${selectedScreen.eyebrow} preview`} />
                </div>
              </button>
              <div className="feature-index">0{activeScreen + 1}<span> / 03</span></div>
            </div>
          </div>
        </section>

        <section className="flow-section section-space">
          <div className="container">
            <div className="flow-panel">
              <div className="flow-copy">
                <div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> One beautiful path</div>
                <h2>Less searching.<br /><em>More arriving.</em></h2>
                <p>
                  From the first hello to the last exhale, Serene keeps the path simple so your
                  attention can stay where it matters.
                </p>
                <div className="flow-stat"><strong>01</strong><span /> Choose a moment that feels like yours</div>
                <div className="flow-stat"><strong>02</strong><span /> Press play and let the noise soften</div>
                <div className="flow-stat"><strong>03</strong><span /> Leave feeling a little more here</div>
              </div>
              <div className="flow-art">
                <img src={`${base}serene-flow.svg`} alt="Serene meditation user flow" />
              </div>
            </div>
          </div>
        </section>

        <section id="principles" className="principles-section section-space">
          <div className="container">
            <div className="section-intro centered-intro">
              <div className="eyebrow"><span className="eyebrow-dot" /> The thinking behind it</div>
              <h2>Softness is a feature.</h2>
              <p>Four small principles keep the experience grounded, useful, and unmistakably human.</p>
            </div>
            <div className="principles-grid">
              {principles.map(({ number, title, description, Icon }) => (
                <article className="principle-item" key={number}>
                  <div className="principle-number">{number}</div>
                  <div className="principle-icon"><Icon size={18} strokeWidth={1.5} /></div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="closing-section">
          <div className="container closing-inner">
            <div className="closing-mark"><img src={`${base}serene-lotus.svg`} alt="" /></div>
            <p className="eyebrow eyebrow-light">Your next quiet moment is close</p>
            <h2>Come back to yourself.</h2>
            <p className="closing-copy">
              Serene is a meditation app concept built with care, clarity, and a little more
              breathing room than the average screen.
            </p>
            <a
              href="https://github.com/rintuchowdory/serene-showcase-website"
              target="_blank"
              rel="noreferrer"
              className="button button-light"
            >
              Explore the repository <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>

      <footer className="serene-footer">
        <div className="container flex flex-col items-start justify-between gap-4 py-7 sm:flex-row sm:items-center">
          <div className="brand-mark"><span className="brand-icon"><img src={`${base}serene-lotus.svg`} alt="" /></span><span>serene</span></div>
          <p>Designed with intention. Built with care. <span>© 2026</span></p>
        </div>
      </footer>

      {isViewerOpen && (
        <div className="viewer-backdrop" role="dialog" aria-modal="true" aria-label={selectedScreen.title}>
          <button type="button" className="viewer-close" onClick={() => setIsViewerOpen(false)} aria-label="Close preview">
            <X size={22} />
          </button>
          <div className="viewer-content">
            <span className="card-kicker">{selectedScreen.eyebrow}</span>
            <h2>{selectedScreen.title}</h2>
            <img src={selectedScreen.image} alt={`${selectedScreen.title} full screen`} />
          </div>
        </div>
      )}
    </div>
  );
}