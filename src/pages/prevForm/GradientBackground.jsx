import React from "react";

const GradientBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[linear-gradient(135deg,#ff9a9e_0%,#fecfef_30%,#fda085_60%,#f093fb_100%)]"
    >
      <div
        className="
          nf-blob-1
          absolute -top-[15%] -left-[10%]
          w-[65vw] h-[65vw]
          max-w-[900px] max-h-[900px]
          bg-[radial-gradient(circle_at_40%_40%,rgba(255,107,107,0.85)_0%,rgba(255,154,100,0.7)_45%,rgba(255,176,132,0.4)_70%,transparent_100%)]
          rounded-[60%_40%_70%_30%/50%_60%_40%_50%]
          will-change-transform
        "
      />

      <div
        className="
          nf-blob-2
          absolute -top-[20%] -right-[15%]
          w-[55vw] h-[55vw]
          max-w-[750px] max-h-[750px]
          bg-[radial-gradient(circle_at_60%_35%,rgba(232,121,249,0.75)_0%,rgba(192,132,252,0.6)_40%,rgba(167,139,250,0.35)_70%,transparent_100%)]
          rounded-[40%_60%_50%_50%/60%_40%_60%_40%]
          will-change-transform
        "
      />

      <div
        className="
          nf-blob-3
          absolute top-[25%] -left-[5%]
          w-[50vw] h-[50vw]
          max-w-[680px] max-h-[680px]
          bg-[radial-gradient(circle_at_50%_50%,rgba(255,182,153,0.65)_0%,rgba(255,126,95,0.5)_45%,rgba(253,160,133,0.28)_70%,transparent_100%)]
          rounded-[55%_45%_60%_40%/50%_55%_45%_50%]
          will-change-transform
        "
      />

      <div
        className="
          nf-blob-4
          absolute -bottom-[20%] -right-[10%]
          w-[60vw] h-[60vw]
          max-w-[820px] max-h-[820px]
          bg-[radial-gradient(circle_at_45%_55%,rgba(255,72,153,0.7)_0%,rgba(236,72,153,0.55)_40%,rgba(249,115,171,0.3)_70%,transparent_100%)]
          rounded-[70%_30%_45%_55%/45%_65%_35%_55%]
          will-change-transform
        "
      />

      <div
        className="
          nf-blob-5
          absolute -bottom-[15%] left-[15%]
          w-[45vw] h-[45vw]
          max-w-[620px] max-h-[620px]
          bg-[radial-gradient(circle_at_50%_50%,rgba(216,180,254,0.6)_0%,rgba(196,181,253,0.45)_45%,rgba(167,139,250,0.25)_70%,transparent_100%)]
          rounded-[45%_55%_65%_35%/60%_45%_55%_40%]
          will-change-transform
        "
      />

      <div className='absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url("data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120"%3E%3Cfilter id="n"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23n)"/%3E%3C/svg%3E")]' />
    </div>
  );
};

export default GradientBackground;
