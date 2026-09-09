import { useEffect, useState } from "react";
import logo from "../../assets/images/svg-1.svg";
import loaderBgOne from "../../assets/images/loader-bg.webp";
import loaderBgTwo from "../../assets/images/loader-bg2.webp";

const NuraformLoader = ({ loading = true, onComplete }) => {
  const [visible, setVisible] = useState(loading);

  useEffect(() => {
    setVisible(loading);
  }, [loading]);

  useEffect(() => {
    if (!loading && visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [loading, visible, onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[200]
        flex items-center justify-center
        overflow-hidden
        bg-[#f5f4f0]
        transition-opacity duration-700 ease-out
        ${loading ? "opacity-100" : "opacity-0"}
      `}
    >
      <div className="relative flex h-[700px] w-[700px] items-center justify-center">
        <img
          src={loaderBgOne}
          alt=""
          className="
            absolute inset-0
            h-full w-full
            object-contain
            animate-loader-bg
          "
        />

        <img
          src={loaderBgTwo}
          alt=""
          className="
            absolute inset-0
            h-full w-full
            object-contain
            animate-loader-bg-2
          "
        />

        <div
          className="
            absolute inset-[18%]
            rounded-full
            border border-black/10
            border-t-black/70
            animate-loader-spin
          "
        />
        <img
          style={{
            width: "100px",
            height: "100px",
          }}
          src={logo}
          alt="Loading"
          className="
            relative
             z-10
            object-contain
            animate-loader-logo
          "
        />
      </div>
    </div>
  );
};

export default NuraformLoader;
