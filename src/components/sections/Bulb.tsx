import { useEffect, useRef } from "react";
import { BULB_CONFIG as CONFIG } from "../../data/bulb";
import bulbUrl from "../../assets/lightbulb.png";
import { useLanguage } from "../../i18n/LanguageContext";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const easeInOutCubic = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);

function spring(pos: number, vel: number, cfg: { stiffness: number; damping: number; mass: number }, dt: number) {
  const a = (-cfg.stiffness * pos - cfg.damping * vel) / cfg.mass;
  vel += a * dt;
  pos += vel * dt;
  return [pos, vel] as const;
}

export default function Bulb() {
  const { t, lang } = useLanguage();
  const txt = useRef(t.bulb);
  txt.current = t.bulb;
  const sceneRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const cordRef = useRef<SVGGElement>(null);
  const pullRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const pull = pullRef.current;
    if (!pull) return;
    const night = pull.getAttribute("aria-pressed") === "true";
    pull.setAttribute("aria-label", night ? t.bulb.night : t.bulb.day);
  }, [lang, t]);

  useEffect(() => {
    const scene = sceneRef.current!;
    const rig = rigRef.current!;
    const cord = cordRef.current!;
    const rShadow = cord.querySelector<SVGPathElement>(".r-shadow")!;
    const rGhost = cord.querySelector<SVGPathElement>(".r-ghost")!;
    const rRim = cord.querySelector<SVGPathElement>(".r-rim")!;
    const rBody = cord.querySelector<SVGPathElement>(".r-body")!;
    const rHl = cord.querySelector<SVGPathElement>(".r-hl")!;
    const pull = pullRef.current!;
    const bulbEl = pull.querySelector<HTMLElement>(".lb-bulb")!;
    const status = statusRef.current!;

    const root = document.documentElement;
    const { min: Y_MIN, max: Y_MAX } = CONFIG.limits;

    let mode: "day" | "night" = "day";
    let lit = 1, litFrom = 1, litTo = 1, litStart = 0;
    let y = 0, v = 0, x = 0, xv = 0, dragX = 0;
    let dragging = false;
    let pointerId = -1;
    let startClientX = 0, startClientY = 0, startY = 0;
    let atLimit = false, prevY = 0, velSmooth = 0;
    let shake = 0, scale = 1;
    let last = performance.now();
    let raf = 0;
    let running = false;
    let wake = () => {};

    const N = 22;
    const SUB = 1 / 120;
    const px = new Float32Array(N + 1);
    const py = new Float32Array(N + 1);
    const qx = new Float32Array(N + 1);
    const qy = new Float32Array(N + 1);
    for (let i = 0; i <= N; i++) {
      py[i] = qy[i] = (CONFIG.cordLength * i) / N;
      px[i] = qx[i] = 0;
    }
    let ropeLen = CONFIG.cordLength;
    let phi = 0, wb = 0, ex = 0, ev = 0;
    let heat = 0, heatTarget = 1, speedSm = 0;
    let acc = 0, theta = 0, prevGhost = "";

    const ropePath = () => {
      let d = `M${px[0].toFixed(2)} ${py[0].toFixed(2)}`;
      for (let i = 1; i < N; i++) {
        const mx = (px[i] + px[i + 1]) / 2;
        const my = (py[i] + py[i + 1]) / 2;
        d += `Q${px[i].toFixed(2)} ${py[i].toFixed(2)} ${mx.toFixed(2)} ${my.toFixed(2)}`;
      }
      return d + `L${px[N].toFixed(2)} ${py[N].toFixed(2)}`;
    };

    const stepRope = (dt: number, time: number, endY: number) => {
      const G = 2400;
      const gx = Math.sin(theta) * G;
      const gy = Math.cos(theta) * G;
      const damp = reduceMotion ? 0.9 : 0.985;
      const seg = ropeLen / N;
      for (let i = 1; i < N; i++) {
        const vx = (px[i] - qx[i]) * damp;
        const vy = (py[i] - qy[i]) * damp;
        qx[i] = px[i];
        qy[i] = py[i];
        px[i] += vx + gx * dt * dt + (ex * i / N - px[i]) * 0.04;
        py[i] += vy + gy * dt * dt;
      }
      px[0] = 0;
      py[0] = 0;
      px[N] = ex;
      py[N] = endY;
      qx[N] = ex;
      qy[N] = endY;
      for (let k = 0; k < 12; k++) {
        for (let i = 0; i < N; i++) {
          const dx = px[i + 1] - px[i];
          const dy = py[i + 1] - py[i];
          const dist = Math.hypot(dx, dy) || 0.0001;
          const diff = (dist - seg) / dist;
          const w0x = i === 0 ? 0 : 0.5;
          const w1x = i + 1 === N ? 0 : 0.5;
          const w0y = i === 0 ? 0 : 0.5;
          const w1y = i + 1 === N ? 0 : 0.5;
          const tx = w0x + w1x;
          const ty = w0y + w1y;
          px[i] += (dx * diff * w0x) / tx;
          px[i + 1] -= (dx * diff * w1x) / tx;
          if (ty) {
            py[i] += (dy * diff * w0y) / ty;
            py[i + 1] -= (dy * diff * w1y) / ty;
          }
        }
        for (let i = 0; i < N - 1; i++) {
          const dx = px[i + 2] - px[i];
          const dy = py[i + 2] - py[i];
          const dist = Math.hypot(dx, dy) || 0.0001;
          const rest = seg * 1.96;
          if (dist >= rest) continue;
          const f = ((dist - rest) / dist) * 0.12;
          const w0 = i === 0 ? 0 : 0.5;
          const w2 = i + 2 === N ? 0 : 0.5;
          const tw = w0 + w2;
          if (!tw) continue;
          px[i] += (dx * f * w0) / tw;
          py[i] += (dy * f * w0) / tw;
          if (i + 2 !== N) {
            px[i + 2] -= (dx * f * w2) / tw;
            py[i + 2] -= (dy * f * w2) / tw;
          }
        }
      }
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = motionQuery.matches;
    const onMotion = (e: MediaQueryListEvent) => {
      reduceMotion = e.matches;
    };
    motionQuery.addEventListener("change", onMotion);

    const layout = () => {
      wake();
      const needed = CONFIG.cordLength + CONFIG.bulbHeight + CONFIG.handleExtra + Y_MAX;
      const byHeight = clamp((scene.clientHeight - 16) / needed, 0.45, 1);
      scale = (scene.clientWidth < 640 ? Math.min(byHeight, 0.7) : byHeight) * 0.7;
    };
    const ro = new ResizeObserver(layout);
    ro.observe(scene);
    layout();

    const setMode = (next: "day" | "night") => {
      if (next === mode) return;
      wake();
      mode = next;
      scene.dataset.mode = mode;
      litFrom = lit;
      litTo = mode === "day" ? 1 : 0;
      litStart = performance.now();
      heatTarget = mode === "day" ? 1 : 0;
      const text = mode === "night" ? txt.current.night : txt.current.day;
      pull.setAttribute("aria-pressed", String(mode === "night"));
      pull.setAttribute("aria-label", text);
      status.textContent = text;
    };

    const impact = (speed: number) => {
      if (reduceMotion) return;
      shake = Math.max(shake, Math.min(1, speed / 600));
    };

    const onDown = (e: PointerEvent) => {
      wake();
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      pointerId = e.pointerId;
      pull.setPointerCapture(pointerId);
      startClientX = e.clientX;
      startClientY = e.clientY;
      startY = y;
      v = 0;
      atLimit = false;
      pull.classList.add("is-dragging");
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      const raw = startY + (e.clientY - startClientY) / scale;
      const limited = clamp(raw, Y_MIN, Y_MAX);
      const hit = raw !== limited;
      if (hit && !atLimit) impact(500);
      atLimit = hit;
      y = limited;
      const fx = CONFIG.freeX;
      dragX = clamp(((e.clientX - startClientX) / scale) * fx.factor, -fx.max, fx.max);
    };

    const endDrag = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      dragging = false;
      dragX = 0;
      if (y >= CONFIG.thresholds.night) setMode(mode === "day" ? "night" : "day");
      else if (y <= CONFIG.thresholds.day) setMode("day");
      const { flingFactor, maxFling } = CONFIG.release;
      v = clamp(velSmooth * flingFactor, -maxFling, maxFling);
      try {
        pull.releasePointerCapture(pointerId);
      } catch {
        /* ya liberado */
      }
      pull.classList.remove("is-dragging");
    };

    const onKey = (e: KeyboardEvent) => {
      if (dragging) return;
      wake();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setMode("night");
        v += CONFIG.keyboardImpulse;
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setMode("day");
        v -= CONFIG.keyboardImpulse;
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const toNight = mode === "day";
        setMode(toNight ? "night" : "day");
        v += toNight ? CONFIG.keyboardImpulse : -CONFIG.keyboardImpulse;
      } else return;
    };

    pull.addEventListener("pointerdown", onDown);
    pull.addEventListener("pointermove", onMove);
    pull.addEventListener("pointerup", endDrag);
    pull.addEventListener("pointercancel", endDrag);
    pull.addEventListener("keydown", onKey);

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, CONFIG.maxDt);
      last = now;

      if (dt > 0) {
        if (dragging) {
          x += (dragX - x) * Math.min(1, dt * 14);
          velSmooth += ((y - prevY) / dt - velSmooth) * 0.3;
        } else {
          [y, v] = spring(y, v, CONFIG.spring, dt);
          [x, xv] = spring(x, xv, CONFIG.swaySpring, dt);
          velSmooth = v;
          const b = CONFIG.limitBounce;
          if (y > Y_MAX) {
            y = Y_MAX;
            if (v > 0) {
              impact(v);
              v = -v * b.restitution;
            }
          } else if (y < Y_MIN) {
            y = Y_MIN;
            if (v < 0) {
              impact(-v);
              v = -v * b.restitution;
            }
          }
        }
        prevY = y;
        shake *= Math.exp(-dt * CONFIG.limitBounce.shakeDecay);
      }

      if (lit !== litTo) {
        const u = clamp((now - litStart) / CONFIG.modeTransitionMs, 0, 1);
        lit = litFrom + (litTo - litFrom) * easeInOutCubic(u);
        if (u >= 1) lit = litTo;
        root.style.setProperty("--lit", lit.toFixed(4));
      }

      const t = now / 1000;
      const idle = 0;
      const tilt = (Math.atan2(x, CONFIG.cordLength + CONFIG.bulbHeight * 0.5) * 180) / Math.PI;
      const b = CONFIG.limitBounce;
      const jolt = reduceMotion ? 0 : shake * b.shakeDeg * Math.sin((now * b.shakeFreq) / 1000);
      rig.style.transform = `rotate(${(idle + tilt + jolt).toFixed(3)}deg) scale(${scale.toFixed(4)})`;

      const endY = CONFIG.cordLength + y + 3;
      const target = endY * 1.004 + 1;
      if (target >= ropeLen) ropeLen = target;
      else ropeLen += (target - ropeLen) * Math.min(1, dt * 3);

      const thetaNew = ((idle + tilt + jolt) * Math.PI) / 180;
      theta = thetaNew;
      acc += dt;
      while (acc >= SUB) {
        const eq = Math.sin(theta) * endY;
        ev += (-16 * (ex - eq) - 3.6 * ev) * SUB;
        ex = clamp(ex + ev * SUB, -90, 90);
        stepRope(SUB, now / 1000, endY);
        acc -= SUB;
      }
      const bx = ex;
      if (dt > 0) {
        const chord = Math.atan2(px[N] - px[0], py[N] - py[0]);
        const local = Math.atan2(px[N] - px[N - 4], py[N] - py[N - 4]);
        const ropeDir = chord + (local - chord) * 0.35;
        const steps = Math.ceil(dt / SUB);
        const h = dt / steps;
        for (let k = 0; k < steps; k++) {
          wb += (-60 * (phi - ropeDir) - 9 * wb) * h;
          phi += wb * h;
        }
      }
      const bAng = clamp((phi * 180) / Math.PI, -45, 45);
      pull.style.transform = `translate3d(${bx.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${bAng.toFixed(2)}deg)`;

      const tau = heatTarget > heat ? 0.55 : 0.22;
      heat += (heatTarget - heat) * (1 - Math.exp(-dt / tau));
      const glow = heat;
      pull.style.setProperty("--heat", glow.toFixed(3));
      rShadow.style.transform = `translate(${(4 - bx * 0.08).toFixed(2)}px, 5px)`;
      let speed = 0;
      for (let i = 1; i < N; i++) speed += Math.hypot(px[i] - qx[i], py[i] - qy[i]);
      speed = (speed / N) / SUB;
      const d = ropePath();
      rShadow.setAttribute("d", d);
      rRim.setAttribute("d", d);
      rBody.setAttribute("d", d);
      rHl.setAttribute("d", d);
      rGhost.setAttribute("d", prevGhost || d);
      speedSm += (speed - speedSm) * 0.3;
      bulbEl.style.filter = reduceMotion ? "" : `blur(${Math.min(1.1, speedSm / 900).toFixed(2)}px)`;
      rGhost.style.opacity = reduceMotion ? "0" : Math.min(0.55, speed / 500).toFixed(3);
      prevGhost = d;

      const settled =
        !dragging && Math.abs(y) < 0.15 && Math.abs(v) < 2 && Math.abs(x) < 0.15 && Math.abs(xv) < 2 &&
        Math.abs(phi) < 0.04 && Math.abs(wb) < 0.05 && Math.abs(ex) < 0.4 && Math.abs(ev) < 2 && speed < 6 && shake < 0.01;
      if (settled) {
        y = v = x = xv = phi = wb = ex = ev = shake = 0;
        prevY = 0;
        velSmooth = 0;
        for (let i = 0; i <= N; i++) {
          px[i] = qx[i] = 0;
          py[i] = qy[i] = (endY * i) / N;
        }
        ropeLen = endY * 1.004 + 1;
      }

      if (settled && lit === litTo && Math.abs(heat - heatTarget) < 0.002) {
        rig.style.transform = `rotate(0deg) scale(${scale.toFixed(4)})`;
        pull.style.transform = "translate3d(0px, 0px, 0px) rotate(0deg)";
        const rest = ropePath();
        for (const el of [rShadow, rRim, rBody, rHl, rGhost]) el.setAttribute("d", rest);
        rGhost.style.opacity = "0";
        bulbEl.style.filter = "";
        heat = heatTarget;
        pull.style.setProperty("--heat", heat.toFixed(3));
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    wake = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    wake();

    return () => {
      root.style.removeProperty("--lit");
      cancelAnimationFrame(raf);
      ro.disconnect();
      motionQuery.removeEventListener("change", onMotion);
      pull.removeEventListener("pointerdown", onDown);
      pull.removeEventListener("pointermove", onMove);
      pull.removeEventListener("pointerup", endDrag);
      pull.removeEventListener("pointercancel", endDrag);
      pull.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="lb-layer" ref={sceneRef} data-mode="day">
        <div className="lb-rig" ref={rigRef}>
          <svg className="lb-cord" width="1" height="1" aria-hidden="true" focusable="false">
            <g ref={cordRef}>
              <path className="r-shadow" />
              <path className="r-ghost" />
              <path className="r-rim" />
              <path className="r-body" />
              <path className="r-hl" />
            </g>
          </svg>

          <div className="lb-pull" ref={pullRef} role="button" tabIndex={0} aria-pressed="false" aria-label={t.bulb.day}>
            <div className="lb-bulb" aria-hidden="true">
              <span className="b-night" style={{ backgroundImage: `url(${bulbUrl})` }} />
              <span className="b-glow" />
            </div>

            <div className="lb-handle" aria-hidden="true">
              <span className="string h-day" />
              <span className="string h-night" />
              <span className="knob h-day" />
              <span className="knob h-night" />
            </div>
          </div>
        </div>

        <p className="lb-sr" ref={statusRef} aria-live="polite" />
    </div>
  );
}
