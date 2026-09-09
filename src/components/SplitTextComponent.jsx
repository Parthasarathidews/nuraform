import { isValidElement, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const renderHeadingContent = (content) => {
  const nodes = [];

  const walk = (node, keyPrefix = "") => {
    if (Array.isArray(node)) {
      node.forEach((child, index) => walk(child, `${keyPrefix}-${index}`));
      return;
    }

    if (node === null || node === undefined || typeof node === "boolean") {
      return;
    }

    if (isValidElement(node)) {
      if (node.type === "br") {
        nodes.push(<br key={`${keyPrefix}-br`} />);
        return;
      }

      if (node.props && node.props.children) {
        walk(node.props.children, keyPrefix);
      }

      return;
    }

    const text = String(node);
    const tokens = text.split(/(\s+)/);

    tokens.forEach((token, index) => {
      if (!token) return;

      if (/\s+/.test(token)) {
        nodes.push(
          <span key={`${keyPrefix}-space-${index}`} className="inline-block whitespace-pre">
            {token}
          </span>,
        );
        return;
      }

      token.split("").forEach((char, charIndex) => {
        nodes.push(
          <span
            key={`${keyPrefix}-char-${index}-${charIndex}`}
            className="split-char inline-block"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform, opacity",
            }}
          >
            {char}
          </span>,
        );
      });
    });
  };

  walk(content, "heading");
  return nodes;
};

const SplitTextComponent = ({ description, heading }) => {
  const headingRef = useRef(null);

  useLayoutEffect(() => {
    const headingEl = headingRef.current;
    if (!headingEl) return;

    const chars = headingEl.querySelectorAll(".split-char");
    if (!chars.length) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 993px)", () => {
      gsap.set(chars, {
        opacity: 0,
        rotateX: -90,
        y: 14,
        transformPerspective: 1000,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: headingEl,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      timeline.to(chars, {
        opacity: 1,
        rotateX: 0,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.06,
      });
    });

    mm.add("(max-width: 992px)", () => {
      gsap.set(chars, {
        opacity: 1,
        rotateX: 0,
        y: 0,
        clearProps: "transform,willChange",
      });
    });

    return () => mm.revert();
  }, [heading]);

  return (
    <div className="mx-auto w-[50%] text-center max-[1536px]:w-[60%] max-[1440px]:w-[70%] max-[1023px]:w-[80%] max-[992px]:mb-[10%] max-[577px]:w-[95%]">
      <h1
        ref={headingRef}
        className="heading font-antonia max-[1366px]:text-[45px]! max-[992px]:mb-[3%] max-[769px]:text-[30px]! max-[577px]:text-[25px]!"
        style={{
          perspective: "1000px",
          fontSize: "var(--fs90)",
        }}
      >
        {renderHeadingContent(heading)}
      </h1>

      <p className="text-descriptionText relative z-10 mx-auto w-[80%] max-[577px]:w-[90%] max-[577px]:text-[12px]">{description}</p>
    </div>
  );
};

export default SplitTextComponent;
