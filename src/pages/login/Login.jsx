import { supabase } from "../../lib/superbase";

const Login = () => {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/welcome`,
      },
    });

    if (error) {
      console.error("Google login error:", error);
    } else {
      console.log("Redirecting to Google OAuth...");
    }
  };
  return (
    <div className="bg-gradient-to-t from-[#ffeee5] to-[#ff4e5d] w-screen h-screen p-[2%] max-[577px]:flex">
      <div className="py-[3%] px-[5%] w-[40%] bg-[#fff] ml-auto my-auto h-full rounded-[20px] max-[1025px]:w-[55%] max-[769px]:w-[70%] max-[769px]:mx-auto max-[769px]:py-[5%] max-[769px]:px-[5%] max-[577px]:w-[90%] max-[577px]:flex max-[577px]:flex-col max-[577px]:justify-center max-[577px]:h-[80%] max-[577px]:mt-auto">
        <svg
          className="mx-auto"
          width="116"
          height="29"
          viewBox="0 0 152 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <path
            d="M10.4386 9.10711C14.3536 9.10711 17.8736 11.4418 17.8736 17.1168V26.5274C17.8736 27.6049 17.0834 28.1437 16.2932 28.1437C15.503 28.1437 14.7128 27.569 14.7128 26.5274V17.5478C14.7128 13.2377 12.1985 11.8369 9.54061 11.8369C6.1284 11.8369 4.00923 14.0638 3.9374 17.8711V26.5633C3.9374 27.569 3.1472 28.1437 2.357 28.1437C1.5668 28.1437 0.776607 27.569 0.776607 26.5633V10.9389C0.776607 9.8973 1.5668 9.35853 2.357 9.35853C3.1472 9.35853 3.9374 9.86139 3.9374 10.9389V12.9503C5.12269 10.5079 7.31369 9.10711 10.4386 9.10711ZM37.4024 9.35853C38.1926 9.35853 38.9827 9.86139 38.9827 10.9389V26.5633C38.9827 27.6049 38.1926 28.1437 37.4024 28.1437C36.6122 28.1437 35.822 27.569 35.822 26.5633V24.5878C34.6367 26.9943 32.4457 28.3592 29.3567 28.3592C25.4057 28.3592 21.8858 26.0604 21.8858 20.3854V10.9748C21.8858 9.8973 22.676 9.35853 23.4662 9.35853C24.2563 9.35853 25.0465 9.8973 25.0465 10.9748V19.9544C25.0465 24.2645 27.5967 25.6653 30.2547 25.6653C33.5232 25.6653 35.7501 23.5821 35.822 19.6311V10.9389C35.822 9.86139 36.6481 9.35853 37.4024 9.35853ZM51.8307 9.39445C52.9801 9.39445 53.4111 10.041 53.4111 10.6875C53.4111 11.2622 53.052 12.1961 51.6152 12.1601C48.5263 12.0883 46.6945 13.7405 46.6945 16.5781V26.5992C46.6945 27.6049 45.9043 28.1437 45.15 28.1437C44.3598 28.1437 43.5696 27.6049 43.5696 26.5992V10.903C43.5696 9.8973 44.3598 9.35853 45.15 9.35853C45.9043 9.35853 46.6945 9.86139 46.6945 10.903V12.4116C47.5924 10.6157 49.2446 9.39445 51.8307 9.39445ZM72.5642 9.43037C73.3544 9.43037 74.1446 9.93322 74.1446 10.9748V26.6351C74.1446 27.6408 73.3544 28.1796 72.5642 28.1796C71.774 28.1796 70.9478 27.6408 70.9478 26.6351V23.6539C69.8703 26.3837 67.2124 28.3592 63.441 28.3592C57.8018 28.3592 54.1741 24.0849 54.1741 18.6972C54.1741 13.2018 57.9096 9.10711 63.5846 9.10711C66.7814 9.10711 69.547 10.7593 70.9478 13.4891V10.9748C70.9478 9.93322 71.774 9.43037 72.5642 9.43037ZM64.1593 25.5576C68.1103 25.5576 70.9478 22.5764 70.9478 18.7331C70.9478 14.9258 68.1103 11.9446 64.1593 11.9446C60.2084 11.9446 57.3349 14.7822 57.3349 18.7331C57.3349 22.6841 60.2084 25.5576 64.1593 25.5576ZM83.169 9.5022H87.0122C87.6587 9.5022 88.2334 10.041 88.2334 10.7593C88.2334 11.4418 87.6587 11.9805 87.0122 11.9805H83.169V26.5992C83.169 27.4253 82.4506 28.1437 81.5886 28.1437C80.7265 28.1437 80.0441 27.4253 80.0441 26.5992V11.9805H78.9306C78.2482 11.9805 77.6735 11.4059 77.6735 10.7593C77.6735 10.0769 78.2482 9.5022 78.9306 9.5022H80.0441V6.55692C80.0441 2.39043 82.5943 0.881871 85.5396 0.881871C86.0783 0.881871 86.6889 0.953708 87.2636 1.06146C88.0897 1.20513 88.4848 1.81574 88.4848 2.42635C88.4848 3.10879 87.982 3.75532 87.0481 3.64756C86.7608 3.61164 86.4375 3.61164 86.1861 3.61164C84.3543 3.61164 83.0612 4.29409 83.169 6.95202V9.5022ZM98.8463 28.3592C93.2431 28.3592 89.0048 24.2286 89.0048 18.7331C89.0048 13.2377 93.2431 9.10711 98.8463 9.10711C104.485 9.10711 108.688 13.2377 108.688 18.7331C108.688 24.2286 104.485 28.3592 98.8463 28.3592ZM98.8463 25.5217C102.69 25.5217 105.635 22.5764 105.635 18.6972C105.635 14.8899 102.725 11.9446 98.8463 11.9446C95.0031 11.9446 92.0578 14.8899 92.0578 18.6972C92.0578 22.5764 95.039 25.5217 98.8463 25.5217ZM120.58 9.39445C121.73 9.39445 122.161 10.041 122.161 10.6875C122.161 11.2622 121.801 12.1961 120.365 12.1601C117.276 12.0883 115.444 13.7405 115.444 16.5781V26.5992C115.444 27.6049 114.654 28.1437 113.899 28.1437C113.109 28.1437 112.319 27.6049 112.319 26.5992V10.903C112.319 9.8973 113.109 9.35853 113.899 9.35853C114.654 9.35853 115.444 9.86139 115.444 10.903V12.4116C116.342 10.6157 117.994 9.39445 120.58 9.39445ZM144.989 9.10711C148.545 9.10711 151.705 11.2981 151.705 16.5781V26.5274C151.705 27.6049 150.879 28.1437 150.089 28.1437C149.335 28.1437 148.509 27.6049 148.509 26.5274V17.045C148.509 13.094 146.533 11.8369 144.414 11.8369C141.612 11.8369 139.924 13.956 139.924 17.3323V26.5274C139.924 27.569 139.134 28.1437 138.344 28.1437C137.518 28.1437 136.728 27.569 136.728 26.5274V17.045C136.728 13.094 134.752 11.8369 132.633 11.8369C129.867 11.8369 128.179 13.8842 128.107 17.3323V26.5633C128.107 27.569 127.317 28.1437 126.527 28.1437C125.737 28.1437 124.946 27.569 124.946 26.5633V10.9389C124.946 9.8973 125.737 9.35853 126.563 9.35853C127.353 9.35853 128.107 9.86139 128.107 10.8671V12.4475C129.113 10.3283 130.981 9.10711 133.531 9.10711C135.901 9.10711 138.057 10.2206 138.99 12.8785C139.996 10.472 142.115 9.10711 144.989 9.10711Z"
            fill="currentColor"
          ></path>{" "}
        </svg>
        <h1
          style={{
            fontSize: "var(--fs67)",
          }}
          className="text-center font-antonia"
        >
          Sign In
        </h1>
        <p
          style={{
            fontSize: "var(--fs22)",
          }}
          className="text-center text-[#868686]"
        >
          Thanks for choosing Nuraform, you're just one click away from using
          the best form app yet.
        </p>
        <div className="flex flex-col gap-[5px] pt-[10%]">
          <button
            className="group flex items-center rounded-t-[20px] bg-[#eeeeee] py-[5%] pl-[5%] cursor-pointer transition duration-300 hover:bg-[#d7adf0] hover:scale-[1.02] hover:text-black max-[577px]:py-[3%] "
            type="button"
            onClick={handleGoogleLogin}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-colors duration-300 group-hover:fill-black"
            >
              <path
                d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
                fill="#4285F4"
                className="group-hover:fill-black transition-colors duration-300"
              />
              <path
                d="M12 23.0001C14.97 23.0001 17.46 22.0201 19.28 20.3401L15.71 17.5701C14.73 18.2301 13.48 18.6301 12 18.6301C9.13999 18.6301 6.70999 16.7001 5.83999 14.1001H2.17999V16.9401C3.98999 20.5301 7.69999 23.0001 12 23.0001Z"
                fill="#34A853"
                className="group-hover:fill-black transition-colors duration-300"
              />
              <path
                d="M5.84 14.0901C5.62 13.4301 5.49 12.7301 5.49 12.0001C5.49 11.2701 5.62 10.5701 5.84 9.91007V7.07007H2.18C1.43 8.55007 1 10.2201 1 12.0001C1 13.7801 1.43 15.4501 2.18 16.9301L5.03 14.7101L5.84 14.0901Z"
                fill="#FBBC05"
                className="group-hover:fill-black transition-colors duration-300"
              />
              <path
                d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.69999 1 3.98999 3.47 2.17999 7.07L5.83999 9.91C6.70999 7.31 9.13999 5.38 12 5.38Z"
                fill="#EA4335"
                className="group-hover:fill-black transition-colors duration-300"
              />
            </svg>

            <p className="w-full text-center max-[577px]:text-[14px]">
              Continue with Google
            </p>
          </button>

          <button
            className="group flex items-center bg-[#eeeeee] py-[5%] pl-[5%] cursor-pointer transition duration-300 hover:bg-[#d7adf0] hover:scale-[1.02] max-[577px]:py-[3%] "
            type="button"
            onClick={handleGoogleLogin}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 31 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3155_200)">
                <path
                  d="M14.0838 13.2241H1.0838V-0.775879H14.0838V13.2241Z"
                  fill="#F1511B"
                  className="group-hover:fill-black transition-colors duration-300"
                />
                <path
                  d="M30.0838 13.2241H17.0838V-0.775879H30.0838V13.2241Z"
                  fill="#80CC28"
                  className="group-hover:fill-black transition-colors duration-300"
                />
                <path
                  d="M14.0838 29.2241H1.0838V16.2241H14.0838V29.2241Z"
                  fill="#00ADEF"
                  className="group-hover:fill-black transition-colors duration-300"
                />
                <path
                  d="M30.0838 29.2241H17.0838V16.2241H30.0838V29.2241Z"
                  fill="#FBBC09"
                  className="group-hover:fill-black transition-colors duration-300"
                />
              </g>
              <defs>
                <clipPath id="clip0_3155_200">
                  <rect
                    width="30"
                    height="29"
                    fill="white"
                    transform="translate(0.588257)"
                  />
                </clipPath>
              </defs>
            </svg>

            <p className="w-full text-center max-[577px]:text-[14px]">
              Continue with Microsoft
            </p>
          </button>

          <button
            className="group flex items-center rounded-b-[20px] bg-[#eeeeee] py-[5%] pl-[5%] cursor-pointer transition duration-300 hover:bg-[#d7adf0] hover:scale-[1.02] max-[577px]:py-[3%] "
            type="button"
            onClick={handleGoogleLogin}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 34 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.90617 5.52808H27.9062C29.4187 5.52808 30.6562 6.72808 30.6562 8.19474V24.1947C30.6562 25.6614 29.4187 26.8614 27.9062 26.8614H5.90617C4.39367 26.8614 3.15617 25.6614 3.15617 24.1947V8.19474C3.15617 6.72808 4.39367 5.52808 5.90617 5.52808Z"
                stroke="#FF633E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:stroke-black transition-colors duration-300"
              />
              <path
                d="M30.6562 8.19458L16.9062 17.5279L3.15617 8.19458"
                stroke="#FF633E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:stroke-black transition-colors duration-300"
              />
            </svg>

            <p className="w-full text-center max-[577px]:text-[14px]">
              Continue with Email
            </p>
          </button>
        </div>
        <div className="text-center text-[12px] text-[#868686] mt-[17%]">
          <p>By continuing, you agree to our</p>
          <p className="flex w-full gap-[30px] justify-center">
            <span className="underline cursor-pointer relative after:content-[''] after:absolute after:w-[2px] after:h-[2px] after:bg-[#868686] after:rounded-full after:-right-[8px] after:top-1/2 after:-translate-y-1/2 right-[-3%]">
              <p>Privacy Policy</p>
            </span>
            <span className="underline cursor-pointer">Terms of Use</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
