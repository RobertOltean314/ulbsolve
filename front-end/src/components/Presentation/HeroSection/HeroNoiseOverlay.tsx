const HeroNoiseOverlay = () => (
  <div
    className="absolute inset-0 bg-[url('/noise-pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"
    aria-hidden="true"
  />
);

export default HeroNoiseOverlay;
