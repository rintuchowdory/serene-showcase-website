import { Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const PHASES = [
  { name: "inhale", label: "Breathe in", seconds: 4, hint: "through the nose, gently" },
  { name: "hold", label: "Hold", seconds: 4, hint: "let it settle" },
  { name: "exhale", label: "Breathe out", seconds: 6, hint: "slow and soft" },
  { name: "rest", label: "Rest", seconds: 2, hint: "nothing to do" },
] as const;

const CYCLE_SECONDS = PHASES.reduce((sum, p) => sum + p.seconds, 0);

/**
 * A live one-minute breathing demo — the one part of the showcase you can
 * actually feel. 4-4-6-2 cycle, expanding orb, optional soft chime.
 */
export default function BreathWidget() {
  const [running, setRunning] = useState(false);
  const [chime, setChime] = useState(true);
  const [tick, setTick] = useState(0);
  const audioRef = useRef<AudioContext | null>(null);

  // Derive phase, countdown and cycles from the single tick counter.
  const elapsed = tick % CYCLE_SECONDS;
  const cycles = Math.floor(tick / CYCLE_SECONDS);
  let acc = 0;
  let phaseIndex = 0;
  for (let i = 0; i < PHASES.length; i++) {
    if (elapsed < acc + PHASES[i].seconds) {
      phaseIndex = i;
      break;
    }
    acc += PHASES[i].seconds;
  }
  const phase = PHASES[phaseIndex];
  const secondsLeft = acc + phase.seconds - elapsed;
  const progress = 1 - secondsLeft / phase.seconds;

  const playChime = useCallback((frequency: number) => {
    if (!chime) return;
    try {
      const ctx = audioRef.current ?? new AudioContext();
      audioRef.current = ctx;
      if (ctx.state === "suspended") void ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 2.3);
    } catch {
      // audio unavailable — the breath guide still works silently
    }
  }, [chime]);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [running]);

  // Chime on phase change: once per transition, never on first render.
  const lastPhaseRef = useRef(-1);
  useEffect(() => {
    if (!running) {
      lastPhaseRef.current = -1;
      return;
    }
    if (lastPhaseRef.current === -1) {
      lastPhaseRef.current = phaseIndex;
      return; // the "begin" click plays its own chime
    }
    if (lastPhaseRef.current !== phaseIndex) {
      lastPhaseRef.current = phaseIndex;
      if (phaseIndex === 0) playChime(528);
      else if (phase.name === "exhale") playChime(396);
    }
  }, [phaseIndex, running, phase.name, playChime]);

  function toggle() {
    setRunning((prev) => {
      if (!prev) playChime(528);
      return !prev;
    });
  }

  function reset() {
    setRunning(false);
    setTick(0);
  }

  // Orb: inhale grows, hold rests at full, exhale shrinks, rests at small.
  const scale = phase.name === "inhale" ? 0.62 + progress * 0.38
    : phase.name === "hold" ? 1
    : phase.name === "exhale" ? 1 - progress * 0.38
    : 0.62;

  return (
    <div className="breath-widget">
      <div className="breath-stage" aria-hidden="true">
        <div className="breath-ring" />
        <div
          className="breath-orb"
          style={{ transform: `scale(${scale})`, transitionDuration: `${phase.seconds}s` }}
        />
      </div>

      <div className="breath-readout">
        <p className="breath-phase" aria-live="polite">
          {running ? phase.label : "Ready when you are"}
        </p>
        <p className="breath-hint">
          {running
            ? `${phase.hint} · ${secondsLeft}`
            : "One gentle breath: in 4 · hold 4 · out 6 · rest 2"}
        </p>
        <p className="breath-cycles">
          {cycles === 0
            ? "16 seconds per breath · no sign-up, nothing to install"
            : `${cycles} breath${cycles === 1 ? "" : "s"} complete${cycles >= 3 ? " · nicely done" : ""}`}
        </p>
      </div>

      <div className="breath-controls">
        <button type="button" className="button button-dark" onClick={toggle}>
          {running ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
          {running ? "Pause" : "Begin one breath"}
        </button>
        <button
          type="button"
          className="breath-ghost"
          onClick={() => setChime((on) => !on)}
          aria-label={chime ? "Mute chime" : "Unmute chime"}
          aria-pressed={chime}
        >
          {chime ? <Volume2 size={16} /> : <VolumeX size={16} />}
          {chime ? "Chime on" : "Chime off"}
        </button>
        <button type="button" className="breath-ghost" onClick={reset} aria-label="Reset breathing guide">
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
    </div>
  );
}
