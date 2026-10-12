// Constantes de física y umbrales de la bombilla (px locales, antes de escalar).
export const BULB_CONFIG = {
  cordLength: 240,
  bulbHeight: 195,
  handleExtra: 40,

  limits: { min: -120, max: 160 },
  thresholds: { night: 60, day: -60 },

  spring: { stiffness: 170, damping: 11, mass: 1 },
  swaySpring: { stiffness: 55, damping: 4.2, mass: 1 },

  freeX: { factor: 0.18, max: 26 },

  limitBounce: { restitution: 0.35, shakeDeg: 4, shakeDecay: 7, shakeFreq: 55 },
  release: { flingFactor: 0.5, maxFling: 1200 },

  cord: { restCurve: 0.25, slackGain: 1.6, minOpacity: 0.7, minScaleX: 0.02 },

  keyboardImpulse: 700,
  modeTransitionMs: 500,
  maxDt: 1 / 30,
};
