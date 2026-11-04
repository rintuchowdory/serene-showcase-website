import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Gentle motion for the Serene showcase.
 *
 * Everything here is deliberately slow: the page is about calm, so the scenery
 * drifts, the pictures breathe and the copy arrives late rather than quickly.
 * Every effect honours `prefers-reduced-motion`.
 */

/** Fades content in once, when it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A slow drift and zoom for photographs and illustrations, so a still image
 * still feels alive. Pairs with `.pb-kenburns` in index.css.
 */
export function KenBurns({
  children,
  className,
  delay = 0,
  duration = 30,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <div className={cn("pb-kenburns", className)}>
      <div
        className="pb-kenburns-inner"
        style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Layered landscape: dawn sky, three ridges, drifting mist and a lake that
 * moves with the page. Drawn as SVG so it stays sharp and weighs a few kB.
 */
export function SceneryLandscape({ parallax = true }: { parallax?: boolean }) {
  const reduce = useReducedMotion();
  const layersRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!parallax || reduce) return;
    const node = layersRef.current;
    if (!node) return;
    let frame = 0;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = node.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      frame = Math.min(Math.max(progress, 0), 1);
      node.style.setProperty("--scenery-shift", `${(frame - 0.5) * 26}px`);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [parallax, reduce]);

  return (
    <div className="scenery" ref={layersRef} aria-hidden="true">
      <svg className="scenery-svg" viewBox="0 0 1600 560" preserveAspectRatio="xMidYMid slice" role="presentation">
        <defs>
          <linearGradient id="sc-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f6ecdb" />
            <stop offset="0.55" stopColor="#e8ecdf" />
            <stop offset="1" stopColor="#d7e0d2" />
          </linearGradient>
          <radialGradient id="sc-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#fff5e2" stopOpacity="1" />
            <stop offset="0.55" stopColor="#f6dfb8" stopOpacity="0.55" />
            <stop offset="1" stopColor="#f6dfb8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sc-lake" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c6d3c2" />
            <stop offset="1" stopColor="#a8bba6" />
          </linearGradient>
          <filter id="sc-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        <rect width="1600" height="560" fill="url(#sc-sky)" />

        <g className="scenery-sun">
          <circle cx="1120" cy="170" r="150" fill="url(#sc-sun)" />
          <circle cx="1120" cy="170" r="46" fill="#fbeacd" opacity="0.9" />
        </g>

        <g className="scenery-clouds" filter="url(#sc-blur)">
          <ellipse className="sc-cloud sc-cloud-a" cx="300" cy="150" rx="220" ry="42" fill="#ffffff" opacity="0.5" />
          <ellipse className="sc-cloud sc-cloud-b" cx="980" cy="96" rx="280" ry="36" fill="#ffffff" opacity="0.42" />
          <ellipse className="sc-cloud sc-cloud-c" cx="1360" cy="210" rx="200" ry="30" fill="#ffffff" opacity="0.35" />
        </g>

        <g className="scenery-far">
          <path d="M0 330 L170 262 L300 318 L430 250 L560 330 L700 276 L820 340 L940 288 L1080 342 L1220 286 L1340 338 L1470 292 L1600 336 L1600 560 L0 560 Z" fill="#cdd8c6" opacity="0.85" />
        </g>
        <g className="scenery-mid">
          <path d="M0 396 L150 340 L280 390 L420 330 L560 398 L700 346 L840 402 L980 352 L1120 404 L1260 350 L1400 400 L1600 360 L1600 560 L0 560 Z" fill="#b3c4ad" />
        </g>
        <g className="scenery-near">
          <path d="M0 470 L160 424 L320 466 L470 418 L620 470 L780 430 L930 474 L1090 428 L1250 472 L1410 432 L1600 470 L1600 560 L0 560 Z" fill="#93a98f" />
        </g>

        <rect y="486" width="1600" height="74" fill="url(#sc-lake)" />
        <g className="scenery-reflection" opacity="0.5">
          <ellipse cx="1120" cy="512" rx="70" ry="9" fill="#fbeacd" opacity="0.5" />
          <ellipse cx="1120" cy="530" rx="110" ry="7" fill="#fbeacd" opacity="0.3" />
          <ellipse cx="420" cy="520" rx="120" ry="6" fill="#ffffff" opacity="0.25" />
        </g>

        <g className="scenery-mist">
          <rect className="sc-mist sc-mist-a" x="-200" y="360" width="900" height="70" rx="35" fill="#ffffff" opacity="0.45" filter="url(#sc-blur)" />
          <rect className="sc-mist sc-mist-b" x="600" y="418" width="1100" height="54" rx="27" fill="#ffffff" opacity="0.38" filter="url(#sc-blur)" />
        </g>

        <g className="scenery-motes">
          <circle className="sc-mote sc-mote-a" cx="240" cy="330" r="2.6" fill="#fffaf0" />
          <circle className="sc-mote sc-mote-b" cx="620" cy="286" r="2.2" fill="#fffaf0" />
          <circle className="sc-mote sc-mote-c" cx="980" cy="352" r="3" fill="#fffaf0" />
          <circle className="sc-mote sc-mote-d" cx="1330" cy="300" r="2.4" fill="#fffaf0" />
        </g>
      </svg>
    </div>
  );
}
