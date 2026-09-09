import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CAROUSEL_SLIDES, TIMINGS } from "../../../data/herodata";

export default function CircularCarousel({ reducedMotion, activeSlide = 0 }) {
  const slideRefs = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const loadedCount = useRef(0);

  const addRef = (el) => {
    if (el && !slideRefs.current.includes(el)) {
      slideRefs.current.push(el);
    }
  };

  useEffect(() => {
    loadedCount.current = 0;
    const totalImages = CAROUSEL_SLIDES.length;

    const markLoaded = () => {
      loadedCount.current += 1;
      if (loadedCount.current === totalImages) {
        setImagesLoaded(true);
      }
    };

    CAROUSEL_SLIDES.forEach((slide) => {
      const img = new Image();
      img.onload = markLoaded;
      img.onerror = markLoaded;
      img.src = slide.src;
    });
  }, []);

  useGSAP(
    () => {
      const slides = slideRefs.current;
      if (!slides.length || !imagesLoaded) return;

      gsap.set(slides, {
        opacity: 0,
        visibility: "visible",
        scale: 1.08,
        filter: "blur(4px)",
        transformOrigin: "center center",
      });

      slides.forEach((slide, index) => {
        const isActive = index === activeSlide;

        gsap.to(slide, {
          opacity: isActive ? 1 : 0,
          visibility: "visible",
          scale: isActive ? 1 : 1.08,
          filter: isActive ? "blur(0px)" : "blur(4px)",
          duration: reducedMotion ? 0 : TIMINGS.TRANSITION_DURATION,
          ease: "power2.inOut",
          overwrite: true,
        });
      });
    },
    { dependencies: [activeSlide, imagesLoaded, reducedMotion] },
  );

  return (
    <div
      className="relative isolate overflow-hidden rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.25)] ring-1 ring-white/10 max-[577px]:w-[90vw]! max-[577px]:h-[90vw]! max-[577px]:z-[-1]  "
      style={{
        width: "min(45vw, 1060px)",
        height: "min(45vw, 1060px)",

        aspectRatio: "1 / 1",
        background: "transparent",
      }}
    >
      <div className="absolute inset-0 z-0">
        {CAROUSEL_SLIDES?.map((slide) => (
          <div
            key={slide.id}
            ref={addRef}
            className="absolute inset-0"
            style={{
              borderRadius: "50%",
              overflow: "hidden",
              background: "transparent",
              opacity: 0,
              visibility: "visible",
            }}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="block h-full w-full"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "50%",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
