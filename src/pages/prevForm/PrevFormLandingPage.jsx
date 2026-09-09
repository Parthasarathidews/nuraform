import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import GradientBackground from "./GradientBackground";
import NuraformShape from "./NuraformShape";
import { formsApi, questionsApi } from "../../services/api";

const PREVIEW_FORM_STORAGE_KEY = "nuraform:preview-form";

const validateAnswer = (question, value) => {
  if (question.mandatory && !value?.trim()) {
    return "This field is required";
  }
  if (question.answerType === "email" && value?.trim()) {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(value.trim()))
      return "Please enter a valid email address";
  }
  return null;
};

const NuraformWordmark = ({ className = "" }) => (
  <svg
    className={className}
    height="22"
    viewBox="0 0 152 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="nuraform"
  >
    <path
      d="M10.4386 9.10711C14.3536 9.10711 17.8736 11.4418 17.8736 17.1168V26.5274C17.8736 27.6049 17.0834 28.1437 16.2932 28.1437C15.503 28.1437 14.7128 27.569 14.7128 26.5274V17.5478C14.7128 13.2377 12.1985 11.8369 9.54061 11.8369C6.1284 11.8369 4.00923 14.0638 3.9374 17.8711V26.5633C3.9374 27.569 3.1472 28.1437 2.357 28.1437C1.5668 28.1437 0.776607 27.569 0.776607 26.5633V10.9389C0.776607 9.8973 1.5668 9.35853 2.357 9.35853C3.1472 9.35853 3.9374 9.86139 3.9374 10.9389V12.9503C5.12269 10.5079 7.31369 9.10711 10.4386 9.10711ZM37.4024 9.35853C38.1926 9.35853 38.9827 9.86139 38.9827 10.9389V26.5633C38.9827 27.6049 38.1926 28.1437 37.4024 28.1437C36.6122 28.1437 35.822 27.569 35.822 26.5633V24.5878C34.6367 26.9943 32.4457 28.3592 29.3567 28.3592C25.4057 28.3592 21.8858 26.0604 21.8858 20.3854V10.9748C21.8858 9.8973 22.676 9.35853 23.4662 9.35853C24.2563 9.35853 25.0465 9.8973 25.0465 10.9748V19.9544C25.0465 24.2645 27.5967 25.6653 30.2547 25.6653C33.5232 25.6653 35.7501 23.5821 35.822 19.6311V10.9389C35.822 9.86139 36.6481 9.35853 37.4024 9.35853ZM51.8307 9.39445C52.9801 9.39445 53.4111 10.041 53.4111 10.6875C53.4111 11.2622 53.052 12.1961 51.6152 12.1601C48.5263 12.0883 46.6945 13.7405 46.6945 16.5781V26.5992C46.6945 27.6049 45.9043 28.1437 45.15 28.1437C44.3598 28.1437 43.5696 27.6049 43.5696 26.5992V10.903C43.5696 9.8973 44.3598 9.35853 45.15 9.35853C45.9043 9.35853 46.6945 9.86139 46.6945 10.903V12.4116C47.5924 10.6157 49.2446 9.39445 51.8307 9.39445ZM72.5642 9.43037C73.3544 9.43037 74.1446 9.93322 74.1446 10.9748V26.6351C74.1446 27.6408 73.3544 28.1796 72.5642 28.1796C71.774 28.1796 70.9478 27.6408 70.9478 26.6351V23.6539C69.8703 26.3837 67.2124 28.3592 63.441 28.3592C57.8018 28.3592 54.1741 24.0849 54.1741 18.6972C54.1741 13.2018 57.9096 9.10711 63.5846 9.10711C66.7814 9.10711 69.547 10.7593 70.9478 13.4891V10.9748C70.9478 9.93322 71.774 9.43037 72.5642 9.43037ZM64.1593 25.5576C68.1103 25.5576 70.9478 22.5764 70.9478 18.7331C70.9478 14.9258 68.1103 11.9446 64.1593 11.9446C60.2084 11.9446 57.3349 14.7822 57.3349 18.7331C57.3349 22.6841 60.2084 25.5576 64.1593 25.5576ZM83.169 9.5022H87.0122C87.6587 9.5022 88.2334 10.041 88.2334 10.7593C88.2334 11.4418 87.6587 11.9805 87.0122 11.9805H83.169V26.5992C83.169 27.4253 82.4506 28.1437 81.5886 28.1437C80.7265 28.1437 80.0441 27.4253 80.0441 26.5992V11.9805H78.9306C78.2482 11.9805 77.6735 11.4059 77.6735 10.7593C77.6735 10.0769 78.2482 9.5022 78.9306 9.5022H80.0441V6.55692C80.0441 2.39043 82.5943 0.881871 85.5396 0.881871C86.0783 0.881871 86.6889 0.953708 87.2636 1.06146C88.0897 1.20513 88.4848 1.81574 88.4848 2.42635C88.4848 3.10879 87.982 3.75532 87.0481 3.64756C86.7608 3.61164 86.4375 3.61164 86.1861 3.61164C84.3543 3.61164 83.0612 4.29409 83.169 6.95202V9.5022ZM98.8463 28.3592C93.2431 28.3592 89.0048 24.2286 89.0048 18.7331C89.0048 13.2377 93.2431 9.10711 98.8463 9.10711C104.485 9.10711 108.688 13.2377 108.688 18.7331C108.688 24.2286 104.485 28.3592 98.8463 28.3592ZM98.8463 25.5217C102.69 25.5217 105.635 22.5764 105.635 18.6972C105.635 14.8899 102.725 11.9446 98.8463 11.9446C95.0031 11.9446 92.0578 14.8899 92.0578 18.6972C92.0578 22.5764 95.039 25.5217 98.8463 25.5217ZM120.58 9.39445C121.73 9.39445 122.161 10.041 122.161 10.6875C122.161 11.2622 121.801 12.1961 120.365 12.1601C117.276 12.0883 115.444 13.7405 115.444 16.5781V26.5992C115.444 27.6049 114.654 28.1437 113.899 28.1437C113.109 28.1437 112.319 27.6049 112.319 26.5992V10.903C112.319 9.8973 113.109 9.35853 113.899 9.35853C114.654 9.35853 115.444 9.86139 115.444 10.903V12.4116C116.342 10.6157 117.994 9.39445 120.58 9.39445ZM144.989 9.10711C148.545 9.10711 151.705 11.2981 151.705 16.5781V26.5274C151.705 27.6049 150.879 28.1437 150.089 28.1437C149.335 28.1437 148.509 27.6049 148.509 26.5274V17.045C148.509 13.094 146.533 11.8369 144.414 11.8369C141.612 11.8369 139.924 13.956 139.924 17.3323V26.5274C139.924 27.569 139.134 28.1437 138.344 28.1437C137.518 28.1437 136.728 27.569 136.728 26.5274V17.045C136.728 13.094 134.752 11.8369 132.633 11.8369C129.867 11.8369 128.179 13.8842 128.107 17.3323V26.5633C128.107 27.569 127.317 28.1437 126.527 28.1437C125.737 28.1437 124.946 27.569 124.946 26.5633V10.9389C124.946 9.8973 125.737 9.35853 126.563 9.35853C127.353 9.35853 128.107 9.86139 128.107 10.8671V12.4475C129.113 10.3283 130.981 9.10711 133.531 9.10711C135.901 9.10711 138.057 10.2206 138.99 12.8785C139.996 10.472 142.115 9.10711 144.989 9.10711Z"
      fill="currentColor"
    />
  </svg>
);

const LandingScreen = ({
  formTitle,
  formDescription,
  onStart,
  noQuestionsNotice,
}) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const shapeRef = useRef(null);
  const ctaRef = useRef(null);
  const labelRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    gsap.set([titleRef.current, descriptionRef.current], {
      opacity: 0,
      y: 0,
    });
    gsap.set(shapeRef.current, {
      opacity: 0,
      scale: 0.88,
    });
    gsap.set([ctaRef.current, labelRef.current], {
      opacity: 0,
      y: 10,
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
    )
      .fromTo(
        descriptionRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        0.12,
      )
      .fromTo(
        shapeRef.current,
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
        0.2,
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.35,
      )
      .fromTo(
        labelRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power3.out" },
        0.35,
      );

    return () => tl.kill();
  }, [formTitle, formDescription, noQuestionsNotice]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-6 text-center bg-white">
      <h1
        ref={titleRef}
        className="font-dmsans text-[clamp(24px,4vw,42px)] font-normal text-[#111] mb-3 tracking-[-0.02em]"
      >
        {formTitle || "Blank Feedback Form"}
      </h1>

      <p
        ref={descriptionRef}
        className="font-dmsans text-[clamp(13px,1.6vw,16px)] text-[#888] mb-[52px] max-w-xs leading-[1.6]"
      >
        {formDescription ||
          "Create a custom feedback form with tailored questions."}
      </p>

      <div ref={shapeRef} className="mb-0">
        <NuraformShape variant="landing" />
      </div>

      <div ref={ctaRef} className="flex flex-col items-center gap-2.5">
        <button
          className="group w-16 h-16 rounded-full bg-[#f3f3f3] border-none cursor-pointer flex items-center justify-center [transition:background_0.2s_ease,transform_0.2s_ease] shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
          id="nf-start-btn"
          onClick={onStart}
          aria-label="Start form"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#000000";
            e.currentTarget.style.transform = "scale(1.07)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#f3f3f3";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <svg
            className="group-hover:text-[#fff]"
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.8718 12.7011C26.1603 12.9895 26.1603 13.4572 25.8718 13.7457L21.1711 18.4466C20.8826 18.735 20.4149 18.735 20.1264 18.4466C19.838 18.1581 19.838 17.6904 20.1264 17.4019L24.3049 13.2234L20.1263 9.04496C19.8379 8.7565 19.8379 8.28881 20.1263 8.00034C20.4148 7.71187 20.8825 7.71187 21.171 8.00033L25.8718 12.7011ZM1.32031 13.2236L1.32031 12.485L25.3495 12.4847L25.3495 13.2234L25.3495 13.9621L1.32032 13.9623L1.32031 13.2236Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
        <span
          ref={labelRef}
          className="font-dmsans text-[11px] tracking-[0.1em] text-[#aaa] uppercase"
        >
          Takes 40 sec
        </span>
        {noQuestionsNotice && (
          <p className="font-dmsans text-[12px] text-[#e53e3e] mt-2 max-w-[260px]">
            This form doesn&apos;t have any questions yet - add a question in
            the editor to preview it.
          </p>
        )}
      </div>
    </div>
  );
};

const ThankYouScreen = () => {
  const markRef = useRef(null);
  const titleRef = useRef(null);
  const shapeRef = useRef(null);
  const messageRef = useRef(null);
  const footerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    gsap.set(
      [
        markRef.current,
        titleRef.current,
        shapeRef.current,
        messageRef.current,
        footerRef.current,
      ],
      {
        opacity: 0,
      },
    );

    tl.fromTo(
      markRef.current,
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        0.1,
      )
      .fromTo(
        shapeRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
        0.2,
      )
      .fromTo(
        messageRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.45,
      )
      .fromTo(
        footerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power3.out" },
        0.6,
      );

    return () => tl.kill();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-6 text-center bg-white">
      <div ref={markRef} className="mb-10">
        <NuraformWordmark className="text-[#111]" />
      </div>

      <h1
        ref={titleRef}
        className="font-dmsans text-[clamp(28px,5vw,48px)] font-normal text-[#111] mb-10 tracking-[-0.02em]"
      >
        Thank you!
      </h1>

      <div ref={shapeRef} className="mb-10">
        <NuraformShape variant="thankyou" />
      </div>

      <p
        ref={messageRef}
        className="font-dmsans text-[clamp(13px,1.5vw,15px)] text-[#888] leading-[1.7] max-w-[280px]"
      >
        Your form has been submitted successfully.
      </p>

      <p
        ref={footerRef}
        className="font-dmsans text-xs text-[#bbb] mt-12 max-w-[340px] leading-normal"
      >
        Preview / Test mode: you won&apos;t be redirected automatically.{" "}
        <a href="/" className="text-[#888] underline">
          Continue to nuraform.com
        </a>
      </p>
    </div>
  );
};

const FormCard = ({
  question,
  value,
  onChange,
  error,
  onNext,
  onPrev,
  canGoPrev,
  isLast,
  currentIndex,
  total,
}) => {
  const inputRef = useRef(null);
  const errorRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 380);
    return () => clearTimeout(t);
  }, [question.id]);

  useGSAP(() => {
    if (!errorRef.current) return;

    if (error) {
      gsap.fromTo(
        errorRef.current,
        { opacity: 0, y: -6, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power3.out" },
      );
    } else {
      gsap.to(errorRef.current, {
        opacity: 0,
        y: -4,
        scale: 0.95,
        duration: 0.15,
        ease: "power2.inOut",
      });
    }
  }, [error]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && question.answerType !== "textarea") {
      e.preventDefault();
      onNext();
    }
  };

  const baseInputClassName =
    "w-full border-0 border-b-[1.5px] outline-none text-[clamp(14px,2vw,16px)] font-dmsans text-[#222] py-1.5 px-0 bg-transparent [transition:border-color_0.2s]";
  const borderColorClassName = error
    ? "border-b-[#e53e3e]"
    : "border-b-[#c8c8c8]";

  const renderInput = () => {
    if (question.answerType === "textarea") {
      return (
        <textarea
          ref={inputRef}
          id={`nf-input-${question.id}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter text..."
          rows={3}
          className={`${baseInputClassName} ${borderColorClassName} resize-none`}
          onFocus={(e) => {
            if (!error) e.target.style.borderBottomColor = "#e53e3e";
          }}
          onBlur={(e) => {
            if (!error) e.target.style.borderBottomColor = "#c8c8c8";
          }}
        />
      );
    }
    return (
      <input
        ref={inputRef}
        id={`nf-input-${question.id}`}
        type={
          question.answerType === "email"
            ? "email"
            : question.answerType === "number"
              ? "number"
              : "text"
        }
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter text..."
        onKeyDown={handleKeyDown}
        className={`${baseInputClassName} ${borderColorClassName}`}
        onFocus={(e) => {
          if (!error) e.target.style.borderBottomColor = "#e53e3e";
        }}
        onBlur={(e) => {
          if (!error) e.target.style.borderBottomColor = "#c8c8c8";
        }}
      />
    );
  };

  return (
    <div className="bg-white rounded-[20px] py-[clamp(28px,4vw,44px)] px-[clamp(24px,4vw,40px)] w-full ml-[-18%] min-w-[700px] max-w-[720px] min-h-[400px] flex flex-col justify-between shadow-[0_8px_40px_rgba(0,0,0,0.10)] relative max-[767px]:ml-0 max-[767px]:w-full max-[767px]:min-w-0 max-[767px]:max-w-full max-[767px]:min-h-[320px]">
      <div>
        <p className="font-dmsans text-[11px] font-medium tracking-[0.08em] text-[#999] uppercase mb-2.5">
          {question.heading || `QUESTION ${currentIndex + 1}`}
        </p>

        <h2 className="font-dmsans text-[clamp(18px,2.5vw,24px)] font-medium text-[#1a1a1a] mb-7 leading-[1.3] tracking-[-0.01em]">
          {question.questionText || "Untitled question"}
        </h2>

        {question.description && (
          <p className="font-dmsans text-[13px] text-[#aaa] mb-4 leading-[1.6]">
            {question.description}
          </p>
        )}

        <div className={error ? "mb-2" : "mb-0"}>{renderInput()}</div>

        {error && (
          <div
            ref={errorRef}
            className="mt-2.5 inline-flex items-center gap-1.5 bg-[#fff1f0] border border-[#fca5a5] rounded-[6px] py-[5px] px-2.5"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e53e3e"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span className="font-dmsans text-xs text-[#e53e3e]">{error}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center bg-[#f0f0f0] rounded-full overflow-hidden">
          <button
            id="nf-prev-btn"
            onClick={onPrev}
            disabled={!canGoPrev}
            aria-label="Previous question"
            className={`w-[38px] h-[38px] flex items-center justify-center bg-transparent border-none [transition:background_0.15s] ${
              canGoPrev
                ? "cursor-pointer opacity-100"
                : "cursor-not-allowed opacity-[0.35]"
            }`}
            onMouseEnter={(e) => {
              if (canGoPrev)
                e.currentTarget.style.background = "rgba(0,0,0,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="w-px h-[18px] bg-[rgba(0,0,0,0.15)]" />
          <button
            id="nf-next-nav-btn"
            onClick={onNext}
            aria-label="Next question"
            className="w-[38px] h-[38px] flex items-center justify-center bg-transparent border-none cursor-pointer [transition:background_0.15s]"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <button
          id={isLast ? "nf-submit-btn" : "nf-next-btn"}
          onClick={onNext}
          aria-label={isLast ? "Submit form" : "Next question"}
          className="w-[52px] h-[52px] rounded-full bg-white border-[1.5px] border-[#ddd] cursor-pointer flex items-center justify-center [transition:background_0.2s_ease,border-color_0.2s_ease,transform_0.15s_ease] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#fafafa";
            e.currentTarget.style.borderColor = "#bbb";
            e.currentTarget.style.transform = "scale(1.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#fff";
            e.currentTarget.style.borderColor = "#ddd";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <svg
            width="20"
            height="14"
            viewBox="0 0 27 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.8718 6.7011C26.1603 6.9895 26.1603 7.4572 25.8718 7.7457L21.1711 12.4466C20.8826 12.735 20.4149 12.735 20.1264 12.4466C19.838 12.1581 19.838 11.6904 20.1264 11.4019L24.3049 7.2234L20.1263 3.04496C19.8379 2.7565 19.8379 2.28881 20.1263 2.00034C20.4148 1.71187 20.8825 1.71187 21.171 2.00033L25.8718 6.7011ZM1.32031 7.2236L1.32031 6.485L25.3495 6.4847L25.3495 7.2234L25.3495 7.9621L1.32032 7.9623L1.32031 7.2236Z"
              fill="#333"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const ShowInfoPanel = ({ formTitle, formDescription }) => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const chevronRef = useRef(null);

  useGSAP(() => {
    if (!panelRef.current) return;

    if (open) {
      gsap.set(panelRef.current, {
        height: 0,
        opacity: 0,
        y: -8,
        overflow: "hidden",
      });
      gsap.to(panelRef.current, {
        height: "auto",
        opacity: 1,
        y: 0,
        duration: 0.28,
        ease: "power3.out",
      });
    } else {
      gsap.to(panelRef.current, {
        height: 0,
        opacity: 0,
        y: -8,
        duration: 0.28,
        ease: "power3.inOut",
      });
    }

    gsap.to(chevronRef.current, {
      rotate: open ? 180 : 0,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [open]);

  return (
    <div className="fixed right-[clamp(16px,3vw,40px)] top-1/2 -translate-y-1/2 z-20 flex flex-col items-end gap-2">
      <button
        id="nf-show-info-btn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="bg-none border-none cursor-pointer flex items-center gap-1.5 font-dmsans text-[13px] text-[rgba(255,255,255,0.9)] py-1 px-0 tracking-[0.01em]"
      >
        <span>Show Info</span>
        <span ref={chevronRef} className="flex items-center">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <div ref={panelRef} className="overflow-hidden">
        {open && (
          <div className="bg-[rgba(255,255,255,0.92)] backdrop-blur-[12px] rounded-[14px] py-[18px] px-5 max-w-[220px] shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
            <p className="font-dmsans text-sm font-medium text-[#1a1a1a] mb-1.5">
              {formTitle || "Blank Feedback Form"}
            </p>
            {formDescription && (
              <p className="font-dmsans text-xs text-[#777] leading-[1.6]">
                {formDescription}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const PrevFormLandingPage = () => {
  const location = useLocation();

  const [screen, setScreen] = useState("landing");
  const [questions, setQuestions] = useState([]);
  const [formMeta, setFormMeta] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [formResolved, setFormResolved] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [direction, setDirection] = useState(1);
  const [noQuestionsNotice, setNoQuestionsNotice] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const applyForm = ({ title, description, questions: qs }) => {
      if (cancelled) return;
      setScreen("landing");
      setCurrentIndex(0);
      setAnswers({});
      setErrors({});
      setDirection(1);
      setNoQuestionsNotice(false);
      setFormMeta({ title: title || "", description: description || "" });
      setQuestions(Array.isArray(qs) ? qs : []);
      setFormResolved(true);
      setLoading(false);
    };

    const isLocalId = (id) => typeof id === "string" && id.startsWith("local-");

    const load = async () => {
      const navState = location.state;

      if (navState && (Array.isArray(navState.questions) || navState.formId)) {
        if (Array.isArray(navState.questions)) {
          applyForm(navState);
          try {
            sessionStorage.setItem(
              PREVIEW_FORM_STORAGE_KEY,
              JSON.stringify(navState),
            );
          } catch {}
          return;
        }

        if (!isLocalId(navState.formId)) {
          try {
            const form = await formsApi.getById(navState.formId);
            const qs = await questionsApi.getByFormId(navState.formId);
            const resolved = {
              formId: navState.formId,
              title: form?.title ?? navState.title,
              description: form?.description ?? navState.description,
              questions: qs,
            };
            applyForm(resolved);
            try {
              sessionStorage.setItem(
                PREVIEW_FORM_STORAGE_KEY,
                JSON.stringify(resolved),
              );
            } catch {}
            return;
          } catch {}
        }

        applyForm(navState);
        return;
      }

      try {
        const cached = sessionStorage.getItem(PREVIEW_FORM_STORAGE_KEY);
        if (cached) {
          applyForm(JSON.parse(cached));
          return;
        }
      } catch {}

      try {
        const forms = await formsApi.getAll();
        const form = [...(forms || [])].sort(
          (a, b) =>
            new Date(b.updatedAt || b.createdAt || 0) -
            new Date(a.updatedAt || a.createdAt || 0),
        )[0];
        if (form) {
          const qs = await questionsApi.getByFormId(form.id);
          applyForm({
            formId: form.id,
            title: form.title,
            description: form.description,
            questions: qs,
          });
        } else if (!cancelled) {
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [location.state]);

  const currentQuestion = questions[currentIndex] ?? null;
  const isLast = currentIndex === questions.length - 1;

  const handleAnswerChange = useCallback(
    (value) => {
      if (!currentQuestion) return;
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
      setErrors((prev) => ({ ...prev, [currentQuestion.id]: null }));
    },
    [currentQuestion],
  );

  const handleNext = useCallback(() => {
    if (!currentQuestion) return;
    const val = answers[currentQuestion.id] ?? "";
    const err = validateAnswer(currentQuestion, val);
    if (err) {
      setErrors((prev) => ({ ...prev, [currentQuestion.id]: err }));
      return;
    }
    if (isLast) {
      setScreen("thankyou");
    } else {
      setDirection(1);
      setCurrentIndex((i) => i + 1);
    }
  }, [currentQuestion, answers, isLast]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const handleStart = () => {
    if (questions.length === 0) {
      setNoQuestionsNotice(true);
      return;
    }
    setScreen("form");
  };

  const screenRef = useRef(null);
  const formCardRef = useRef(null);

  useGSAP(() => {
    if (!screenRef.current) return;

    if (screen === "landing" || screen === "thankyou") {
      gsap.fromTo(
        screenRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power3.out" },
      );
    }
  }, [screen]);

  useGSAP(() => {
    if (!formCardRef.current || !currentQuestion) return;

    gsap.fromTo(
      formCardRef.current,
      { opacity: 0, y: direction > 0 ? 28 : -28 },
      { opacity: 1, y: 0, duration: 0.38, ease: "power3.out" },
    );
  }, [currentQuestion?.id, direction]);

  if (screen === "landing") {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="font-dmsans text-[#ccc] text-sm animate-pulse">
            Loading...
          </div>
        </div>
      );
    }

    if (!formResolved) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-white px-6 text-center">
          <p className="font-dmsans text-[15px] text-[#888]">
            No form selected to preview.
          </p>
          <a
            href="/welcome"
            className="font-dmsans text-[13px] text-[#111] underline underline-offset-2"
          >
            Go back and pick a form
          </a>
        </div>
      );
    }
    return (
      <div ref={screenRef}>
        <LandingScreen
          formTitle={formMeta.title}
          formDescription={formMeta.description}
          onStart={handleStart}
          noQuestionsNotice={noQuestionsNotice}
        />
      </div>
    );
  }

  if (screen === "thankyou") {
    return (
      <div ref={screenRef}>
        <ThankYouScreen />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <GradientBackground />

      <div className="nf-side-label fixed left-[clamp(16px,3vw,40px)] top-1/2 -translate-y-1/2 z-20 hidden">
        <span className="font-dmsans text-[13px] text-[rgba(255,255,255,0.85)] tracking-[0.01em]">
          {formMeta.title || "Blank Feedback Form"}
        </span>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .nf-side-label { display: block !important; }
        }
      `}</style>

      <ShowInfoPanel
        formTitle={formMeta.title}
        formDescription={formMeta.description}
      />

      <div className="relative z-10 w-full max-w-[520px] py-6 px-4 flex items-center justify-center">
        {currentQuestion && (
          <div ref={formCardRef} className="w-full">
            <FormCard
              question={currentQuestion}
              value={answers[currentQuestion.id] ?? ""}
              onChange={handleAnswerChange}
              error={errors[currentQuestion.id] ?? null}
              onNext={handleNext}
              onPrev={handlePrev}
              canGoPrev={currentIndex > 0}
              isLast={isLast}
              currentIndex={currentIndex}
              total={questions.length}
            />
          </div>
        )}
      </div>
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 whitespace-nowrap">
        <span className="font-dmsans text-xs text-[rgba(255,255,255,0.7)]">
          Created using
          <a
            href="https://nuraform.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[rgba(255,255,255,0.9)] underline underline-offset-2"
          >
            nuraform
          </a>
        </span>
      </div>
    </div>
  );
};

export default PrevFormLandingPage;
