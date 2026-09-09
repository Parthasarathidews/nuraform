import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { supabase } from "../../lib/superbase";
import { useNavigate } from "react-router-dom";
import DemoPageSidebar from "./DemoPageSidebar";
import DemoPageContent from "./DemoPageContent";
import { useAuth } from "../../hooks/useAuth";
import "../demo/demo.css";
import NuraformLoader from "./NuraformLoader";
import GradientBackground from "../prevForm/GradientBackground";
import CustomImage from "../../components/CustomImage";
import userIcon from "../../assets/images/you.jpg";

const MOBILE_BREAKPOINT = 769;

const DemoLandingPage = () => {
  const canvasRef = useRef(null);
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);
  const profilePopupRef = useRef(null);
  const burgerLineRefs = useRef([]);
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_BREAKPOINT);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error);
        return;
      }

      setIsProfileOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Unexpected logout error:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const nextIsMobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(nextIsMobile);

      if (!nextIsMobile) {
        setIsMobileSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(
    () => {
      if (!sidebarRef.current || !contentRef.current) return;

      if (!isMobile) {
        gsap.set(sidebarRef.current, { x: 0, clearProps: "all" });
        gsap.set(contentRef.current, { x: 0, clearProps: "all" });
        return;
      }

      gsap.to(sidebarRef.current, {
        x: isMobileSidebarOpen ? 0 : "-105%",
        duration: 0.5,
        ease: "power3.out",
      });

      gsap.to(contentRef.current, {
        x: isMobileSidebarOpen ? "60vw" : 0,
        duration: 0.5,
        ease: "power3.out",
      });
    },
    { dependencies: [isMobile, isMobileSidebarOpen] },
  );

  useGSAP(
    () => {
      if (!isMobile || burgerLineRefs.current.length === 0) return;

      const lines = burgerLineRefs.current;

      gsap.to(lines[0], {
        y: isMobileSidebarOpen ? -2 : 0,
        rotate: isMobileSidebarOpen ? 45 : 0,
        duration: 0.35,
        ease: "power2.out",
      });

      gsap.to(lines[1], {
        opacity: isMobileSidebarOpen ? 0 : 1,
        x: isMobileSidebarOpen ? -1 : 0,
        duration: 0.25,
        ease: "power2.out",
      });

      gsap.to(lines[2], {
        y: isMobileSidebarOpen ? -2 : 0,
        rotate: isMobileSidebarOpen ? -45 : 0,
        duration: 0.35,
        ease: "power2.out",
      });
    },
    { dependencies: [isMobile, isMobileSidebarOpen] },
  );

  useGSAP(
    () => {
      if (!profilePopupRef.current) return;

      gsap.to(profilePopupRef.current, {
        autoAlpha: isProfileOpen ? 1 : 0,
        y: isProfileOpen ? 0 : -8,
        scale: isProfileOpen ? 1 : 0.98,
        duration: 0.25,
        ease: "power2.out",
        pointerEvents: isProfileOpen ? "auto" : "none",
      });
    },
    { dependencies: [isProfileOpen] },
  );

  useEffect(() => {
    if (!isProfileOpen) return;

    const handlePointerDown = (event) => {
      if (profilePopupRef.current && !profilePopupRef.current.contains(event.target) && !event.target.closest("[data-profile-trigger]")) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isProfileOpen]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let animationFrame;
    let time = 0;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      time += 0.003;

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "#f9bba2";
      ctx.fillRect(0, 0, width, height);

      const fixedGradient = ctx.createRadialGradient(width * 0.12, height * 0.18, 0, width * 0.12, height * 0.18, width * 0.75);

      fixedGradient.addColorStop(0, "#ff633e");
      fixedGradient.addColorStop(1, "rgba(255, 99, 62, 0)");

      ctx.fillStyle = fixedGradient;
      ctx.fillRect(0, 0, width, height);

      const x2 = width * 0.15 + Math.sin(time * 0.8) * width * 0.4;

      const y2 = height * 0.45 + Math.cos(time * 0.6) * height * 0.3;

      const gradient2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, width * 0.6);

      gradient2.addColorStop(0, "#d7adf0");
      gradient2.addColorStop(1, "rgba(215, 173, 240, 0)");

      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);

      const x3 = width * 0.1 + Math.cos(time * 0.7) * width * 0.45;

      const y3 = height * 0.35 + Math.sin(time * 0.9) * height * 0.35;

      const gradient3 = ctx.createRadialGradient(x3, y3, 0, x3, y3, width * 0.55);

      gradient3.addColorStop(0, "#ff61ab");
      gradient3.addColorStop(1, "rgba(255, 97, 171, 0)");

      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, width, height);

      const x4 = width * 0.2 + Math.sin(time * 0.5) * width * 0.4;

      const y4 = height * 0.65 + Math.cos(time * 0.8) * height * 0.3;

      const gradient4 = ctx.createRadialGradient(x4, y4, 0, x4, y4, width * 0.6);

      gradient4.addColorStop(0, "#f9bba2");
      gradient4.addColorStop(1, "rgba(249, 187, 162, 0)");

      ctx.fillStyle = gradient4;
      ctx.fillRect(0, 0, width, height);

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  useEffect(() => {
    console.log("========== DEMO LANDING PAGE AUTH ==========");
    console.log("Loading:", loading);
    console.log("User:", user);

    if (loading) {
      console.log("Authentication is still initializing...");
    } else if (user) {
      console.log("User authenticated in DemoLandingPage:");
      console.log("  - User ID:", user.id);
      console.log("  - Email:", user.email);
      console.log("  - Provider:", user.app_metadata?.provider);
      console.log("  - User Metadata:", user.user_metadata);
      console.log("  - Created At:", user.created_at);
    } else {
      console.log("No authenticated user (loading complete)");
    }

    console.log("============================================");
  }, [user, loading]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <NuraformLoader loading={loading} />

      <GradientBackground />

      {isMobile && (
        <header className="fixed inset-x-0 top-0 z-40 flex h-[68px] items-center justify-between px-[16px] backdrop-blur-md">
          <div className="flex w-[52px] items-center justify-start">
            <button type="button" aria-label={isMobileSidebarOpen ? "Close menu" : "Open menu"} onClick={() => setIsMobileSidebarOpen((prev) => !prev)} className="relative flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/8 text-white outline-none">
              {/* Top line */}
              <span
                ref={(el) => {
                  burgerLineRefs.current[0] = el;
                }}
                className="absolute top-1/2 left-1/2 h-[2px] w-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
              />

              {/* Middle line */}
              <span
                ref={(el) => {
                  burgerLineRefs.current[1] = el;
                }}
                className="absolute top-1/2 left-1/2 h-[2px] w-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
              />

              {/* Bottom line */}
              <span
                ref={(el) => {
                  burgerLineRefs.current[2] = el;
                }}
                className="absolute top-1/2 left-1/2 h-[2px] w-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
              />
            </button>
          </div>
          <div className="pointer-events-none absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[8px]">
            <div onClick={() => navigate("/")} className="text-white">
              <svg width="116" height="29" viewBox="0 0 152 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                {" "}
                <path
                  d="M10.4386 9.10711C14.3536 9.10711 17.8736 11.4418 17.8736 17.1168V26.5274C17.8736 27.6049 17.0834 28.1437 16.2932 28.1437C15.503 28.1437 14.7128 27.569 14.7128 26.5274V17.5478C14.7128 13.2377 12.1985 11.8369 9.54061 11.8369C6.1284 11.8369 4.00923 14.0638 3.9374 17.8711V26.5633C3.9374 27.569 3.1472 28.1437 2.357 28.1437C1.5668 28.1437 0.776607 27.569 0.776607 26.5633V10.9389C0.776607 9.8973 1.5668 9.35853 2.357 9.35853C3.1472 9.35853 3.9374 9.86139 3.9374 10.9389V12.9503C5.12269 10.5079 7.31369 9.10711 10.4386 9.10711ZM37.4024 9.35853C38.1926 9.35853 38.9827 9.86139 38.9827 10.9389V26.5633C38.9827 27.6049 38.1926 28.1437 37.4024 28.1437C36.6122 28.1437 35.822 27.569 35.822 26.5633V24.5878C34.6367 26.9943 32.4457 28.3592 29.3567 28.3592C25.4057 28.3592 21.8858 26.0604 21.8858 20.3854V10.9748C21.8858 9.8973 22.676 9.35853 23.4662 9.35853C24.2563 9.35853 25.0465 9.8973 25.0465 10.9748V19.9544C25.0465 24.2645 27.5967 25.6653 30.2547 25.6653C33.5232 25.6653 35.7501 23.5821 35.822 19.6311V10.9389C35.822 9.86139 36.6481 9.35853 37.4024 9.35853ZM51.8307 9.39445C52.9801 9.39445 53.4111 10.041 53.4111 10.6875C53.4111 11.2622 53.052 12.1961 51.6152 12.1601C48.5263 12.0883 46.6945 13.7405 46.6945 16.5781V26.5992C46.6945 27.6049 45.9043 28.1437 45.15 28.1437C44.3598 28.1437 43.5696 27.6049 43.5696 26.5992V10.903C43.5696 9.8973 44.3598 9.35853 45.15 9.35853C45.9043 9.35853 46.6945 9.86139 46.6945 10.903V12.4116C47.5924 10.6157 49.2446 9.39445 51.8307 9.39445ZM72.5642 9.43037C73.3544 9.43037 74.1446 9.93322 74.1446 10.9748V26.6351C74.1446 27.6408 73.3544 28.1796 72.5642 28.1796C71.774 28.1796 70.9478 27.6408 70.9478 26.6351V23.6539C69.8703 26.3837 67.2124 28.3592 63.441 28.3592C57.8018 28.3592 54.1741 24.0849 54.1741 18.6972C54.1741 13.2018 57.9096 9.10711 63.5846 9.10711C66.7814 9.10711 69.547 10.7593 70.9478 13.4891V10.9748C70.9478 9.93322 71.774 9.43037 72.5642 9.43037ZM64.1593 25.5576C68.1103 25.5576 70.9478 22.5764 70.9478 18.7331C70.9478 14.9258 68.1103 11.9446 64.1593 11.9446C60.2084 11.9446 57.3349 14.7822 57.3349 18.7331C57.3349 22.6841 60.2084 25.5576 64.1593 25.5576ZM83.169 9.5022H87.0122C87.6587 9.5022 88.2334 10.041 88.2334 10.7593C88.2334 11.4418 87.6587 11.9805 87.0122 11.9805H83.169V26.5992C83.169 27.4253 82.4506 28.1437 81.5886 28.1437C80.7265 28.1437 80.0441 27.4253 80.0441 26.5992V11.9805H78.9306C78.2482 11.9805 77.6735 11.4059 77.6735 10.7593C77.6735 10.0769 78.2482 9.5022 78.9306 9.5022H80.0441V6.55692C80.0441 2.39043 82.5943 0.881871 85.5396 0.881871C86.0783 0.881871 86.6889 0.953708 87.2636 1.06146C88.0897 1.20513 88.4848 1.81574 88.4848 2.42635C88.4848 3.10879 87.982 3.75532 87.0481 3.64756C86.7608 3.61164 86.4375 3.61164 86.1861 3.61164C84.3543 3.61164 83.0612 4.29409 83.169 6.95202V9.5022ZM98.8463 28.3592C93.2431 28.3592 89.0048 24.2286 89.0048 18.7331C89.0048 13.2377 93.2431 9.10711 98.8463 9.10711C104.485 9.10711 108.688 13.2377 108.688 18.7331C108.688 24.2286 104.485 28.3592 98.8463 28.3592ZM98.8463 25.5217C102.69 25.5217 105.635 22.5764 105.635 18.6972C105.635 14.8899 102.725 11.9446 98.8463 11.9446C95.0031 11.9446 92.0578 14.8899 92.0578 18.6972C92.0578 22.5764 95.039 25.5217 98.8463 25.5217ZM120.58 9.39445C121.73 9.39445 122.161 10.041 122.161 10.6875C122.161 11.2622 121.801 12.1961 120.365 12.1601C117.276 12.0883 115.444 13.7405 115.444 16.5781V26.5992C115.444 27.6049 114.654 28.1437 113.899 28.1437C113.109 28.1437 112.319 27.6049 112.319 26.5992V10.903C112.319 9.8973 113.109 9.35853 113.899 9.35853C114.654 9.35853 115.444 9.86139 115.444 10.903V12.4116C116.342 10.6157 117.994 9.39445 120.58 9.39445ZM144.989 9.10711C148.545 9.10711 151.705 11.2981 151.705 16.5781V26.5274C151.705 27.6049 150.879 28.1437 150.089 28.1437C149.335 28.1437 148.509 27.6049 148.509 26.5274V17.045C148.509 13.094 146.533 11.8369 144.414 11.8369C141.612 11.8369 139.924 13.956 139.924 17.3323V26.5274C139.924 27.569 139.134 28.1437 138.344 28.1437C137.518 28.1437 136.728 27.569 136.728 26.5274V17.045C136.728 13.094 134.752 11.8369 132.633 11.8369C129.867 11.8369 128.179 13.8842 128.107 17.3323V26.5633C128.107 27.569 127.317 28.1437 126.527 28.1437C125.737 28.1437 124.946 27.569 124.946 26.5633V10.9389C124.946 9.8973 125.737 9.35853 126.563 9.35853C127.353 9.35853 128.107 9.86139 128.107 10.8671V12.4475C129.113 10.3283 130.981 9.10711 133.531 9.10711C135.901 9.10711 138.057 10.2206 138.99 12.8785C139.996 10.472 142.115 9.10711 144.989 9.10711Z"
                  fill="currentColor"
                ></path>{" "}
              </svg>
            </div>
          </div>

          <div className="relative flex w-[52px] justify-end">
            <button type="button" data-profile-trigger onClick={() => setIsProfileOpen((prev) => !prev)} className="overflow-hidden rounded-full border border-white/20 bg-white/10 shadow-[0_2px_10px_rgba(0,0,0,0.15)] transition-transform hover:scale-[1.03]">
              <CustomImage
                src={user?.user_metadata?.avatar_url || user?.user_metadata?.picture || userIcon}
                alt="User avatar"
                referrerPolicy="no-referrer"
                className="h-[30px] w-[30px] object-cover"
                onError={(e) => {
                  if (e.currentTarget.src !== userIcon) {
                    e.currentTarget.src = userIcon;
                  }
                }}
              />
            </button>
          </div>
        </header>
      )}

      <div className={`${isMobile ? "pt-[68px]" : ""} relative z-10 h-full w-full`}>
        {!isMobile ? (
          <div className="relative h-full w-full p-[16px]">
            <div className="absolute top-[16px] left-[16px] z-30 h-[calc(100%-32px)] w-[25%] max-[1024px]:w-[30%]" onMouseEnter={() => setIsSidebarHovered(true)} onMouseLeave={() => setIsSidebarHovered(false)}>
              <DemoPageSidebar isSidebarHovered={isSidebarHovered} user={user} userDetails={user?.user_metadata} />
            </div>

            <div className={`absolute top-[16px] left-[calc(5.5%+16px)] z-[111] h-[calc(100%-32px)] w-[calc(100%-5.5%-32px)] rounded-[32px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isSidebarHovered ? "translate-x-[15%] max-[1024px]:translate-x-[27%]" : "translate-x-0 max-[1024px]:translate-x-[1%]"} `}>
              <div className="relative h-full w-full">
                <DemoPageContent userDetails={user?.user_metadata} />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative h-full w-full overflow-hidden max-[769px]:mx-[auto] max-[769px]:w-[90%]">
            <div className={`absolute inset-0 z-20 transition-opacity duration-300 ${isMobileSidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setIsMobileSidebarOpen(false)} />

            <div ref={sidebarRef} className="max-[769px]:rounded-0 absolute top-0 left-0 z-30 h-full w-[60vw] max-w-[60vw] overflow-hidden rounded-r-[28px] border-r border-white/10 bg-[#f7d7c7]/24 shadow-[0_20px_50px_rgba(0,0,0,0.16)] backdrop-blur-[8px] max-[769px]:border-none max-[769px]:bg-transparent max-[769px]:shadow-none">
              <div className="h-full w-full px-[12px] pt-[8px] pb-[16px]">
                <DemoPageSidebar isSidebarHovered={true} user={user} userDetails={user?.user_metadata} showProfileSection={false} isMobile={true} onMobileNavigate={() => setIsMobileSidebarOpen(false)} />
              </div>
            </div>

            <div ref={contentRef} className="relative h-full w-full">
              <div className="h-full w-full overflow-hidden rounded-none bg-transparent">
                <DemoPageContent userDetails={user?.user_metadata} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoLandingPage;
