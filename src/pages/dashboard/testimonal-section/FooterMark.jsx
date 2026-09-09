import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import person1 from "../../../assets/images/person1.png";
import person2 from "../../../assets/images/person2.png";
import person3 from "../../../assets/images/person3.png";

const FooterMark = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const avatars = container.querySelectorAll(".avatar");

    const animations = [
      {
        element: avatars[0],
        x: [-60, -42, -68, -48, -60],
        y: [-27, -40, -15, -32, -27],
        duration: 5.5,
        delay: 0,
      },
      {
        element: avatars[1],
        x: [22, 40, 10, 35, 22],
        y: [-58, -45, -68, -50, -58],
        duration: 6.2,
        delay: 0.8,
      },
      {
        element: avatars[2],
        x: [16, 5, 28, 8, 16],
        y: [21, 35, 12, 28, 21],
        duration: 5.8,
        delay: 1.4,
      },
    ];

    const tweens = animations.map(({ element, x, y, duration, delay }) => {
      const timeline = gsap.timeline({
        repeat: -1,
        delay,
        ease: "sine.inOut",
      });

      x.forEach((xValue, index) => {
        timeline.to(
          element,
          {
            x: xValue,
            y: y[index],
            duration: duration / (x.length - 1),
            ease: "sine.inOut",
          },
          index === 0 ? 0 : ">",
        );
      });

      return timeline;
    });

    return () => {
      tweens.forEach((timeline) => timeline.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        relative
        flex
        h-32
        w-32
        items-center
        justify-center
      "
    >
      <span className="relative mt-[-75%] z-20 block text-white ">
        <svg
          className="h-[70px] w-[450px] max-[577px]:h-[50px] max-[577px]:ml-[-90px]"
          viewBox="0 0 57 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M31.3997 0.026001H22.5194L28.2525 15.9338H34.2874C35.6723 15.9338 36.6376 14.5598 36.1681 13.257L31.3997 0.026001Z"
            fill="currentColor"
          />

          <path
            d="M24.9636 31.8415H33.8439L28.1108 15.9337H22.0759C20.691 15.9337 19.7257 17.3077 20.1952 18.6105L24.9636 31.8415Z"
            fill="currentColor"
          />

          <path
            d="M49.2611 2.8739C53.2261 2.8739 56.4408 6.08852 56.4408 10.0536C56.4406 14.0185 53.2261 17.2323 49.2611 17.2323C49.0081 17.2323 48.7581 17.2192 48.5119 17.1937C45.6566 16.8975 41.2252 17.1944 40.0299 19.8043L34.8997 31.0058C34.5707 31.7242 33.7217 32.0398 33.0033 31.7108V31.7108C32.2849 31.3818 31.9692 30.5327 32.2983 29.8143L42.7948 6.89679C42.7967 6.89272 42.8014 6.89083 42.8056 6.8925V6.8925C42.8097 6.89413 42.8143 6.89233 42.8163 6.88839C43.9861 4.51065 46.4321 2.874 49.2611 2.8739Z"
            fill="currentColor"
          />

          <path
            d="M7.17941 28.9933C3.21433 28.9933 -0.000279081 25.7787 -0.000279081 21.8136C-0.000128692 17.8487 3.21443 14.6349 7.17941 14.6349C7.43267 14.6349 7.68286 14.648 7.92934 14.6736C10.7841 14.9701 15.2134 14.6731 16.4086 12.0637L21.5397 0.861317C21.8687 0.142975 22.7178 -0.172651 23.4361 0.156329V0.156329C24.1546 0.485343 24.4702 1.33449 24.1412 2.0529L13.6433 24.9712C13.6417 24.9748 13.6375 24.9763 13.6339 24.9747V24.9747C13.6304 24.9731 13.6263 24.9746 13.6246 24.978C12.455 27.3562 10.0086 28.9931 7.17941 28.9933Z"
            fill="currentColor"
          />
        </svg>
      </span>

      <span
        className="
          avatar
          absolute
          left-0
          top-[10%]
          z-10
          block
          h-10
          w-10
          -translate-x-1/2
          -translate-y-1/2
          overflow-hidden
          rounded-full
        "
      >
        <img src={person1} alt="" className="h-full w-full object-cover" />
      </span>

      <span
        className="
          avatar
          absolute
          left-[100%]
          top-0
          z-10
          block
          h-10
          w-10
          -translate-x-1/2
          -translate-y-1/2
          overflow-hidden
          rounded-full
          max-[577px]:left-[50%]
        "
      >
        <img src={person2} alt="" className="h-full w-full object-cover" />
      </span>

      <span
        className="
          avatar
          absolute
          left-1/2
          top-[60%]
          z-10
          block
          h-10
          w-10
          -translate-x-1/2
          -translate-y-1/2
          overflow-hidden
          rounded-full
          max-[577px]:top-[30%]
        "
      >
        <img src={person3} alt="" className="h-full w-full object-cover" />
      </span>
    </div>
  );
};

export default FooterMark;
