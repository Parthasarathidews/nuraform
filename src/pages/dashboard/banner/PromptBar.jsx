import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { PROMPT_SUGGESTIONS } from "../../../data/herodata";

export default function PromptBar({
  reducedMotion,
  prompt = PROMPT_SUGGESTIONS[0],
  onPromptComplete,
}) {
  const [text, setText] = useState("");
  const cursorRef = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion || !cursorRef.current) return;

      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    },
    { dependencies: [reducedMotion] },
  );

  useEffect(() => {
    if (reducedMotion) {
      setText(prompt);
      return;
    }

    let cancelled = false;

    const typePrompt = async () => {
      setText("");

      for (let i = 1; i <= prompt.length && !cancelled; i += 1) {
        setText(prompt.slice(0, i));
        await wait(100);
      }

      if (cancelled) return;

      await wait(350);

      for (let i = prompt.length; i >= 0 && !cancelled; i -= 1) {
        setText(prompt.slice(0, i));
        await wait(100);
      }

      if (!cancelled && typeof onPromptComplete === "function") {
        onPromptComplete();
      }
    };

    typePrompt();

    return () => {
      cancelled = true;
    };
  }, [prompt, reducedMotion, onPromptComplete]);

  return (
    <div className="prompt-bar-wrapper pointer-events-none absolute left-1/2 top-[47%] w-[100%]  -translate-x-1/2 -translate-y-1/2 px-2 max-[1025px]:w-[68%] max-[769px]:w-[100%]">
      <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-black/45 px-5 py-3.5 backdrop-blur-md">
        <span className="flex-1 truncate text-left text-sm text-white/90">
          {text}
          <span
            ref={cursorRef}
            className="ml-0.5 inline-block h-4 w-[2px] translate-y-[2px] bg-orange-400"
          />
        </span>
        <button
          type="button"
          aria-label="Generate form"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-500 text-white transition hover:bg-violet-400"
        >
          <svg
            width="51"
            height="51"
            viewBox="0 0 51 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.798828"
              y="0.354248"
              width="49.7016"
              height="49.7016"
              rx="24.8508"
              fill="#C785FF"
            />
            <path
              d="M18.7529 17.9941C19.0109 17.8296 19.2767 17.8034 19.5645 17.917V17.918L34.9639 24.418C35.1512 24.5007 35.2823 24.6068 35.3672 24.7324C35.452 24.8579 35.498 25.0133 35.498 25.2051C35.498 25.3966 35.4518 25.5514 35.3672 25.6768C35.2823 25.8023 35.1511 25.9085 34.9639 25.9912L19.5635 32.4912C19.276 32.6052 19.0117 32.58 18.7539 32.415C18.4985 32.2516 18.3731 32.0215 18.373 31.7051V18.7051C18.373 18.4273 18.469 18.2161 18.6641 18.0586L18.7529 17.9941ZM20.0723 23.8223L20.1865 23.8506L25.6045 25.2051L20.1865 26.5596L20.0723 26.5879V30.4307L20.2812 30.3428L32.1309 25.3428L32.459 25.2051L32.1309 25.0664L20.2812 20.0664L20.0723 19.9785V23.8223Z"
              fill="white"
              stroke="#FF633E"
              stroke-width="0.3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
