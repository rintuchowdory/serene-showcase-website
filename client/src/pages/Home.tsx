import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

/**
 * Serene App Design Showcase
 * A minimalist landing page presenting the Serene meditation app design
 * Design: Contemporary minimalism with organic, nature-inspired elements
 */

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663652274342/cYqfSxDq3hhqr6GCtGhUZi/serene_lotus_accent-TDLDzDUn8X3hbKZAic6ZVg.webp"
              alt="Serene"
              className="w-8 h-8"
            />
            <span className="text-xl font-semibold text-foreground">Serene</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#design" className="text-sm hover:text-primary transition-colors">
              Design
            </a>
            <a href="#screens" className="text-sm hover:text-primary transition-colors">
              Screens
            </a>
            <a href="#philosophy" className="text-sm hover:text-primary transition-colors">
              Philosophy
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-secondary rounded-full">
                <span className="text-sm font-medium text-primary">Meditation App Design</span>
              </div>
              <h1 className="text-foreground">
                Find Your Inner Peace with <span className="text-primary">Serene</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A minimalist meditation app designed with calm, intention, and elegance. Explore the thoughtful UI/UX that transforms your mindfulness journey.
              </p>
              <div className="flex gap-4 pt-4">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  View Design System
                </Button>
                <Button variant="outline" className="border-border">
                  GitHub Repository
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663652274342/cYqfSxDq3hhqr6GCtGhUZi/serene_hero_bg-9NH6LU7y3GsJkrDFVHAzEu.webp"
                alt="Serene Hero"
                className="w-full h-full object-cover"
                style={{
                  transform: `translateY(${scrollY * 0.3}px)`,
                  transition: "transform 0.1s ease-out",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="w-full h-32 bg-cover bg-center" style={{
        backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663652274342/cYqfSxDq3hhqr6GCtGhUZi/serene_wave_divider-Ln4yErdb6ZCLpGZXXMtmLG.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }} />

      {/* Screens Gallery Section */}
      <section id="screens" className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-foreground mb-4">App Screens</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the complete user journey through carefully crafted interface designs that prioritize simplicity and elegance.
            </p>
          </div>

          {/* Core Screens */}
          <div className="mb-20">
            <h3 className="text-foreground mb-8 text-center">Core Experience</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Home Screen",
                  description: "Personalized greeting with daily meditation and quick categories",
                  image: "/serene_home_screen.png",
                },
                {
                  title: "Player Screen",
                  description: "Immersive meditation experience with progress visualization",
                  image: "/serene_player_screen.png",
                },
                {
                  title: "Profile Screen",
                  description: "Track your progress and meditation history",
                  image: "/serene_profile_screen.png",
                },
              ].map((screen, idx) => (
                <div
                  key={idx}
                  className="group cursor-pointer"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                  }}
                >
                  <div className="relative h-96 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-card">
                    <img
                      src={screen.image}
                      alt={screen.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="mt-4 text-foreground font-semibold">{screen.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{screen.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Screens */}
          <div>
            <h3 className="text-foreground mb-8 text-center">Additional Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Explore Screen",
                  description: "Discover meditations by category and search",
                  image: "/serene_explore_screen.png",
                },
                {
                  title: "Sleep Screen",
                  description: "Dark mode interface for bedtime relaxation",
                  image: "/serene_sleep_screen.png",
                },
                {
                  title: "Completion Screen",
                  description: "Celebrate progress and track your streak",
                  image: "/serene_completion_screen.png",
                },
              ].map((screen, idx) => (
                <div
                  key={idx}
                  className="group cursor-pointer"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${(idx + 3) * 0.1}s both`,
                  }}
                >
                  <div className="relative h-96 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-card">
                    <img
                      src={screen.image}
                      alt={screen.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="mt-4 text-foreground font-semibold">{screen.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{screen.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* User Flow Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4">User Flow</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A streamlined journey from app launch to meditation, designed for minimal friction and maximum focus.
            </p>
          </div>
          <div className="relative rounded-xl overflow-hidden shadow-lg bg-card">
            <img
              src="/serene_user_flow.png"
              alt="User Flow"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Design Philosophy Section */}
      <section id="philosophy" className="py-20 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-foreground mb-4">Design Philosophy</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every design decision reflects our commitment to creating a sanctuary from digital clutter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Calmness",
                description: "Soft sage green and warm cream tones evoke nature and tranquility, creating a peaceful visual sanctuary.",
                icon: "🧘",
              },
              {
                title: "Simplicity",
                description: "Minimalist UI components and generous whitespace reduce cognitive load, allowing focus on meditation.",
                icon: "✨",
              },
              {
                title: "Elegance",
                description: "A sophisticated blend of serif titles and modern sans-serif body text creates timeless beauty.",
                icon: "💎",
              },
              {
                title: "Nature Integration",
                description: "Organic flows, natural imagery, and earth tones connect users to the natural world within the app.",
                icon: "🌿",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors duration-300"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-foreground font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Palette Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4">Color Palette</h2>
            <p className="text-muted-foreground">
              Carefully selected colors that evoke calm and sophistication
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: "Sage Green", hex: "#B2AC88" },
              { name: "Warm Cream", hex: "#F5F5DC" },
              { name: "Charcoal", hex: "#2C2C2C" },
              { name: "Soft Gold", hex: "#D4AF8C" },
              { name: "Muted Gray", hex: "#E8E8DC" },
            ].map((color, idx) => (
              <div key={idx} className="text-center">
                <div
                  className="w-full h-24 rounded-lg shadow-md mb-3 border border-border"
                  style={{ backgroundColor: color.hex }}
                />
                <p className="font-semibold text-foreground text-sm">{color.name}</p>
                <p className="text-xs text-muted-foreground">{color.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-primary-foreground mb-6">Ready to Explore?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Visit the GitHub repository to see the complete design system and all assets.
          </p>
          <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            View on GitHub
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="container py-12">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">Serene App Design Showcase</p>
            <p className="text-sm">
              Designed with intention. Built with care.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
