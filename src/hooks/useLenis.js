import { useEffect, useRef } from "react";
// import { useLocation } from "react-router-dom";
import Lenis from "lenis";

const useLenis = () => {
  // const { pathname } = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
      allowNestedScroll: true,
      autoRaf: true,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      if (window.__lenis === lenis) window.__lenis = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, []);
};

export default useLenis;
