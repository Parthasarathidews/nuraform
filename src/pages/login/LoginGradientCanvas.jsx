import { useEffect, useRef } from "react";

const LoginGradientCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let animationFrame;
    let width = 0;
    let height = 0;

    const blobs = [
      {
        x: 0.2,
        y: 0.2,
        radius: 0.55,
        color: [255, 78, 93],
        speedX: 0.00025,
        speedY: 0.00018,
        phase: 0,
      },
      {
        x: 0.8,
        y: 0.25,
        radius: 0.5,
        color: [255, 238, 229],
        speedX: -0.0002,
        speedY: 0.00022,
        phase: 2,
      },
      {
        x: 0.55,
        y: 0.8,
        radius: 0.6,
        color: [255, 120, 130],
        speedX: 0.00018,
        speedY: -0.0002,
        phase: 4,
      },
    ];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);

      // Base background
      ctx.fillStyle = "#fff5f1";
      ctx.fillRect(0, 0, width, height);

      blobs.forEach((blob) => {
        const x =
          blob.x * width +
          Math.sin(time * blob.speedX + blob.phase) * width * 0.15;

        const y =
          blob.y * height +
          Math.cos(time * blob.speedY + blob.phase) * height * 0.15;

        const radius = Math.max(width, height) * blob.radius;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

        const [r, g, b] = blob.color;

        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.95)`);

        gradient.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, 0.5)`);

        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;

        ctx.fillRect(0, 0, width, height);
      });

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    animationFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas ref={canvasRef} id="gradient-canvas" className="gradient-bg" />
  );
};

export default LoginGradientCanvas;
