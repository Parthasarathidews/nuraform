export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#FD6347]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 15% 10%, #FE8A73 0%, #FD6347 45%, #E5533E 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 52% 40%, rgba(252,208,199,0.55) 0%, rgba(252,208,199,0) 70%)",
        }}
      />

      <div
        className="absolute rounded-full opacity-30"
        style={{
          width: "160%",
          height: "160%",
          left: "-30%",
          top: "10%",
          background:
            "radial-gradient(circle at 50% 50%, transparent 55%, rgba(255,255,255,0.35) 60%, transparent 66%)",
        }}
      />

      <div
        className="absolute rounded-full opacity-40"
        style={{
          width: "220%",
          height: "220%",
          left: "-10%",
          top: "35%",
          background:
            "radial-gradient(circle at 50% 50%, transparent 60%, rgba(255,255,255,0.3) 64%, transparent 70%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
