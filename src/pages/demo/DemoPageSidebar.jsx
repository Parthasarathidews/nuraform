import CustomImage from "../../components/CustomImage";
import userIcon from "../../assets/images/you.jpg";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/superbase";
import { getFormTemplateById } from "../../data/formTemplates";
import { useUserForms } from "../../hooks/useUserForms";
import { sortFormsByNewest } from "../../service/formsService";

const DemoPageSidebar = ({ user, userDetails, isSidebarHovered, showProfileSection = true, isMobile = false, onMobileNavigate }) => {
  const navigate = useNavigate();

  const { forms, loading: formsLoading, refetch: refetchForms } = useUserForms(user?.id);

  const isAuthenticated = Boolean(user);
  const sortedForms = sortFormsByNewest(forms || []);

  const shouldShowFormsMenu = isSidebarHovered || isMobile;

  const isSidebarExpanded = isSidebarHovered || isMobile;
  const revealBase = "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";
  const revealState = isSidebarExpanded ? "max-w-full opacity-100 translate-x-0 pointer-events-auto" : "max-w-0 opacity-0 -translate-x-2 overflow-hidden pointer-events-none";
  const revealClass = `${revealBase} ${revealState}`;

  const handleNavigateLogin = () => {
    navigate("/signup");
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error);
      } else {
        console.log("User logged out successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Unexpected logout error:", error);
    }
  };

  const handleCreateBlank = async () => {
    onMobileNavigate?.();

    let newFormId = null;
    let createdForm = null;

    try {
      const { formsApi } = await import("../../services/api");

      createdForm = await formsApi.create({
        userId: user?.id || null,
        title: "Untitled Form",
        description: "",
      });

      newFormId = createdForm.id;

      await refetchForms();
    } catch (error) {
      console.error("Could not persist the new form (is `npm run server` running?):", error);
    }

    window.dispatchEvent(
      new CustomEvent("nuraform:create-blank", {
        detail: { formId: newFormId },
      }),
    );
    window.dispatchEvent(
      new CustomEvent("nuraform:form-created", {
        detail: { form: createdForm },
      }),
    );
  };

  const handleSelectForm = (form) => {
    onMobileNavigate?.();

    const template = getFormTemplateById(form.id);

    window.dispatchEvent(
      new CustomEvent("nuraform:select-form", {
        detail: template ? { template } : { formId: form.id },
      }),
    );
  };

  return (
    <div className="relative z-10 flex h-full w-full flex-col items-start justify-between py-[7%] pr-[20px] pl-0">
      <div className={`flex w-full flex-col items-start gap-[var(--fs80)] ${isAuthenticated ? "h-[85%] min-h-0 justify-start" : "h-[30%] justify-between"}`}>
        <div onClick={() => navigate("/")} className="flex cursor-pointer items-center gap-[20%] max-[1025px]:gap-[10%] max-[769px]:hidden max-[769px]:gap-[5%]">
          <div className="logo text-white">
            <svg width="50" height="35" viewBox="0 0 57 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M31.3997 0.026001H22.5194L28.2525 15.9338H34.2874C35.6723 15.9338 36.6376 14.5598 36.1681 13.257L31.3997 0.026001Z" fill="currentColor" />

              <path d="M24.9636 31.8415H33.8439L28.1108 15.9337H22.0759C20.691 15.9337 19.7257 17.3077 20.1952 18.6105L24.9636 31.8415Z" fill="currentColor" />

              <path
                d="M49.2611 2.8739C53.2261 2.8739 56.4408 6.08852 56.4408 10.0536C56.4406 14.0185 53.2261 17.2323 49.2611 17.2323C49.0081 17.2323 48.7581 17.2192 48.5119 17.1937C45.6566 16.8975 41.2252 17.1944 40.0299 19.8043L34.8997 31.0058C34.5707 31.7242 33.7217 32.0398 33.0033 31.7108C32.2849 31.3818 31.9692 30.5327 32.2983 29.8143L42.7948 6.89679C42.7967 6.89272 42.8014 6.89083 42.8056 6.8925C42.8097 6.89413 42.8143 6.89233 42.8163 6.88839C43.9861 4.51065 46.4321 2.874 49.2611 2.8739Z"
                fill="currentColor"
              />

              <path
                d="M7.17941 28.9933C3.21433 28.9933 -0.000279081 25.7787 -0.000279081 21.8136C-0.000128692 17.8487 3.21443 14.6349 7.17941 14.6349C7.43267 14.6349 7.68286 14.648 7.92934 14.6736C10.7841 14.9701 15.2134 14.6731 16.4086 12.0637L21.5397 0.861317C21.8687 0.142975 22.7178 -0.172651 23.4361 0.156329C24.1546 0.485343 24.4702 1.33449 24.1412 2.0529L13.6433 24.9712C13.6417 24.9748 13.6375 24.9763 13.6339 24.9747C13.6304 24.9731 13.6263 24.9746 13.6246 24.978C12.455 27.3562 10.0086 28.9931 7.17941 28.9933Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Nuraform Text */}
          <div className={`sidebarTextLogo text-white ${revealClass}`}>
            <svg width="116" height="29" viewBox="0 0 152 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.4386 9.10711C14.3536 9.10711 17.8736 11.4418 17.8736 17.1168V26.5274C17.8736 27.6049 17.0834 28.1437 16.2932 28.1437C15.503 28.1437 14.7128 27.569 14.7128 26.5274V17.5478C14.7128 13.2377 12.1985 11.8369 9.54061 11.8369C6.1284 11.8369 4.00923 14.0638 3.9374 17.8711V26.5633C3.9374 27.569 3.1472 28.1437 2.357 28.1437C1.5668 28.1437 0.776607 27.569 0.776607 26.5633V10.9389C0.776607 9.8973 1.5668 9.35853 2.357 9.35853C3.1472 9.35853 3.9374 9.86139 3.9374 10.9389V12.9503C5.12269 10.5079 7.31369 9.10711 10.4386 9.10711ZM37.4024 9.35853C38.1926 9.35853 38.9827 9.86139 38.9827 10.9389V26.5633C38.9827 27.6049 38.1926 28.1437 37.4024 28.1437C36.6122 28.1437 35.822 27.569 35.822 26.5633V24.5878C34.6367 26.9943 32.4457 28.3592 29.3567 28.3592C25.4057 28.3592 21.8858 26.0604 21.8858 20.3854V10.9748C21.8858 9.8973 22.676 9.35853 23.4662 9.35853C24.2563 9.35853 25.0465 9.8973 25.0465 10.9748V19.9544C25.0465 24.2645 27.5967 25.6653 30.2547 25.6653C33.5232 25.6653 35.7501 23.5821 35.822 19.6311V10.9389C35.822 9.86139 36.6481 9.35853 37.4024 9.35853ZM51.8307 9.39445C52.9801 9.39445 53.4111 10.041 53.4111 10.6875C53.4111 11.2622 53.052 12.1961 51.6152 12.1601C48.5263 12.0883 46.6945 13.7405 46.6945 16.5781V26.5992C46.6945 27.6049 45.9043 28.1437 45.15 28.1437C44.3598 28.1437 43.5696 27.6049 43.5696 26.5992V10.903C43.5696 9.8973 44.3598 9.35853 45.15 9.35853C45.9043 9.35853 46.6945 9.86139 46.6945 10.903V12.4116C47.5924 10.6157 49.2446 9.39445 51.8307 9.39445ZM72.5642 9.43037C73.3544 9.43037 74.1446 9.93322 74.1446 10.9748V26.6351C74.1446 27.6408 73.3544 28.1796 72.5642 28.1796C71.774 28.1796 70.9478 27.6408 70.9478 26.6351V23.6539C69.8703 26.3837 67.2124 28.3592 63.441 28.3592C57.8018 28.3592 54.1741 24.0849 54.1741 18.6972C54.1741 13.2018 57.9096 9.10711 63.5846 9.10711C66.7814 9.10711 69.547 10.7593 70.9478 13.4891V10.9748C70.9478 9.93322 71.774 9.43037 72.5642 9.43037ZM64.1593 25.5576C68.1103 25.5576 70.9478 22.5764 70.9478 18.7331C70.9478 14.9258 68.1103 11.9446 64.1593 11.9446C60.2084 11.9446 57.3349 14.7822 57.3349 18.7331C57.3349 22.6841 60.2084 25.5576 64.1593 25.5576ZM83.169 9.5022H87.0122C87.6587 9.5022 88.2334 10.041 88.2334 10.7593C88.2334 11.4418 87.6587 11.9805 87.0122 11.9805H83.169V26.5992C83.169 27.4253 82.4506 28.1437 81.5886 28.1437C80.7265 28.1437 80.0441 27.4253 80.0441 26.5992V11.9805H78.9306C78.2482 11.9805 77.6735 11.4059 77.6735 10.7593C77.6735 10.0769 78.2482 9.5022 78.9306 9.5022H80.0441V6.55692C80.0441 2.39043 82.5943 0.881871 85.5396 0.881871C86.0783 0.881871 86.6889 0.953708 87.2636 1.06146C88.0897 1.20513 88.4848 1.81574 88.4848 2.42635C88.4848 3.10879 87.982 3.75532 87.0481 3.64756C86.7608 3.61164 86.4375 3.61164 86.1861 3.61164C84.3543 3.61164 83.0612 4.29409 83.169 6.95202V9.5022ZM98.8463 28.3592C93.2431 28.3592 89.0048 24.2286 89.0048 18.7331C89.0048 13.2377 93.2431 9.10711 98.8463 9.10711C104.485 9.10711 108.688 13.2377 108.688 18.7331C108.688 24.2286 104.485 28.3592 98.8463 28.3592ZM98.8463 25.5217C102.69 25.5217 105.635 22.5764 105.635 18.6972C105.635 14.8899 102.725 11.9446 98.8463 11.9446C95.0031 11.9446 92.0578 14.8899 92.0578 18.6972C92.0578 22.5764 95.039 25.5217 98.8463 25.5217ZM120.58 9.39445C121.73 9.39445 122.161 10.041 122.161 10.6875C122.161 11.2622 121.801 12.1961 120.365 12.1601C117.276 12.0883 115.444 13.7405 115.444 16.5781V26.5992C115.444 27.6049 114.654 28.1437 113.899 28.1437C113.109 28.1437 112.319 27.6049 112.319 26.5992V10.903C112.319 9.8973 113.109 9.35853 113.899 9.35853C114.654 9.35853 115.444 9.86139 115.444 10.903V12.4116C116.342 10.6157 117.994 9.39445 120.58 9.39445ZM144.989 9.10711C148.545 9.10711 151.705 11.2981 151.705 16.5781V26.5274C151.705 27.6049 150.879 28.1437 150.089 28.1437C149.335 28.1437 148.509 27.569 148.509 26.5274V17.045C148.509 13.094 146.533 11.8369 144.414 11.8369C141.612 11.8369 139.924 13.956 139.924 17.3323V26.5274C139.924 27.569 139.134 28.1437 138.344 28.1437C137.518 28.1437 136.728 27.569 136.728 26.5274V17.045C136.728 13.094 134.752 11.8369 132.633 11.8369C129.867 11.8369 128.179 13.8842 128.107 17.3323V26.5633C128.107 27.569 127.317 28.1437 126.527 28.1437C125.737 28.1437 124.946 27.569 124.946 26.5633V10.9389C124.946 9.8973 125.737 9.35853 126.563 9.35853C127.353 9.35853 128.107 9.86139 128.107 10.8671V12.4475C129.113 10.3283 130.981 9.10711 133.531 9.10711C135.901 9.10711 138.057 10.2206 138.99 12.8785C139.996 10.472 142.115 9.10711 144.989 9.10711Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {!isAuthenticated && (
          <button type="button" onClick={handleNavigateLogin} className="group/signup flex w-[55%] cursor-pointer items-center gap-[10%] rounded-[20px] px-[3%] py-[2%] text-left transition-colors hover:bg-white">
            <div className="w-[20%] rounded-[10px] bg-white p-[2%] text-[#ff7e60] transition-all duration-300 group-hover/signup:bg-[#FF633E] group-hover/signup:text-white">
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            <p style={{ fontSize: "var(--fs30)" }} className="text-white transition-colors group-hover/signup:text-[#FF633E]">
              Sign Up
            </p>
          </button>
        )}

        {isAuthenticated && (
          <div className="flex min-h-0 w-full flex-1 flex-col">
            <div className="group/actions flex w-full flex-col gap-[4%]">
              <button type="button" onClick={handleCreateBlank} className="group/create flex w-[80%] cursor-pointer items-center gap-[10%] rounded-[20px] px-[3%] py-[2%] text-left transition-colors hover:bg-white max-[1025px]:w-[95%] max-[1025px]:rounded-[15px] max-[769px]:rounded-[10px]">
                <div className="w-[20%] rounded-full bg-white p-[10px] text-[#ff7e60] transition-all duration-300 group-hover/create:rotate-[90deg] group-hover/create:bg-[#FF633E] group-hover/create:text-white max-[769px]:p-[8px] max-[578px]:p-[6px]">
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>

                <p style={{ fontSize: "var(--fs22)" }} className={`createBlankText whitespace-nowrap text-white group-hover/create:text-[#FF633E] max-[769px]:text-[14px]! max-[578px]:text-[12px]! ${revealClass} `}>
                  Create Blank
                </p>
              </button>

              <button type="button" className={`flex w-[80%] cursor-pointer items-center gap-[10%] rounded-[20px] px-[3%] py-[2%] text-left transition-colors max-[1025px]:w-[95%] max-[1025px]:rounded-[15px] max-[769px]:rounded-[10px] max-[578px]:w-full ${isSidebarHovered ? "bg-white" : "bg-transparent"} `}>
                <div className={`w-[20%] rounded-[10px] p-[3%] transition-all duration-300 max-[769px]:p-[8px] max-[578px]:p-[6px] ${isSidebarHovered ? "bg-[#FF633E] text-white" : "bg-white text-[#ff7e60]"} `}>
                  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="8" y1="13" x2="16" y2="13" />
                    <line x1="8" y1="17" x2="16" y2="17" />
                  </svg>
                </div>

                <p style={{ fontSize: "var(--fs22)" }} className={`myFormText whitespace-nowrap max-[769px]:text-[14px]! max-[578px]:text-[12px]! ${isSidebarHovered ? "text-[#FF633E]" : "text-white"} ${revealClass} `}>
                  My Forms
                </p>
              </button>
            </div>

            {shouldShowFormsMenu && (
              <div className="mt-[7px] flex min-h-0 w-[80%] flex-1 flex-col gap-[6%] overflow-y-auto rounded-[12px] bg-[#ffffff42] p-[4%] pr-[4%] max-[1025px]:w-[95%] max-[768px]:w-[92%] max-[768px]:w-full max-[768px]:border max-[768px]:border-white/10 max-[768px]:bg-white/8 max-[768px]:shadow-[0_18px_40px_rgba(0,0,0,0.16)] max-[768px]:backdrop-blur-[6px] *:max-[768px]:mx-0">
                {formsLoading && (
                  <p style={{ fontSize: "var(--fs18)" }} className="text-white/70">
                    Loading forms...
                  </p>
                )}

                {!formsLoading && sortedForms.length === 0 && (
                  <p style={{ fontSize: "var(--fs18)" }} className="text-white/70">
                    No forms yet. Create your first one to see it here.
                  </p>
                )}

                {!formsLoading &&
                  sortedForms.map((form) => {
                    const createdDate = form.createdAt ?? form.created_at;

                    return (
                      <div key={form.id} className="menuFormSidebar group/form-item flex cursor-pointer items-center justify-between rounded-[12px] bg-transparent px-[4%] py-[3%] transition-colors hover:bg-white">
                        <button type="button" onClick={() => handleSelectForm(form)} className="flex-1 cursor-pointer text-left">
                          <p className="font-medium text-white transition-colors group-hover/form-item:text-black max-[769px]:text-[14px]!" style={{ fontSize: "var(--fs20)" }}>
                            {form.title || form.name || "Untitled Form"}
                          </p>

                          <p className="mt-[2%] text-white/60 transition-colors group-hover/form-item:text-black max-[769px]:text-[12px]!" style={{ fontSize: "var(--fs14)" }}>
                            {createdDate ? new Date(createdDate).toLocaleDateString() : "No date"}
                          </p>
                        </button>

                        <button type="button" className="siebarOptionsButton flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full text-white transition-colors group-hover/form-item:text-black hover:bg-[#ff633e] hover:text-white">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="19" cy="12" r="1" />
                            <circle cx="5" cy="12" r="1" />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* {showProfileSection && ( */}
      <div className="flex w-[80%] items-center justify-start gap-[8%] max-[769px]:w-[100%] max-[769px]:justify-between max-[769px]:gap-[0%]">
        <div className="w-[16%] overflow-hidden rounded-full">
          <CustomImage
            src={userDetails?.avatar_url || userDetails?.picture || userIcon}
            alt="userIcon"
            referrerPolicy="no-referrer"
            onError={(e) => {
              if (e.currentTarget.src !== userIcon) {
                e.currentTarget.src = userIcon;
              }
            }}
          />
        </div>

        <div className={`userProfileDetails flex w-[70%] items-end gap-[10px] max-[769px]:justify-between max-[769px]:gap-[5%] ${revealClass}`}>
          <div className="pl-[7%]">
            <p
              style={{
                whiteSpace: "nowrap",
              }}
              className="pl-[2%] text-[12px] text-white"
            >
              {userDetails?.full_name || userDetails?.name || "Guest"}
            </p>

            <p
              style={{
                whiteSpace: "nowrap",
              }}
              className="pl-[2%] text-[12px] text-white"
            >
              {userDetails?.full_name || userDetails?.name ? "Free Accesses" : "Demo Accesses"}
            </p>
          </div>

          {/* Logout */}
          <div role="button" onClick={handleLogout} className="logoutButton w-[10%] cursor-pointer">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default DemoPageSidebar;
