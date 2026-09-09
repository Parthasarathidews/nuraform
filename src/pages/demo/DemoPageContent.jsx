import React, { useState, useEffect, useRef } from "react";
import ChatBar from "./ChatBar";
import NuraformForm from "../forms/NuraformForm";
import RecentFormsPanel from "./RecentFormsPanel";
import { useAuth } from "../../hooks/useAuth";
import { useUserForms } from "../../hooks/useUserForms";
import { generatePromptSentence, matchPromptToTemplate } from "../../data/formTemplates";
import { sortFormsByNewest } from "../../service/formsService";

const MAX_RECENT_FORMS = 5;

const getTemplateFormCacheKey = (templateKey) => `nuraform:template-form:${templateKey}`;

const DemoPageContent = ({ userDetails }) => {
  const { user } = useAuth();
  const { forms: userForms, loading: userFormsLoading } = useUserForms(user?.id);
  const [showForm, setShowForm] = useState(() => sessionStorage.getItem("nuraform:show-form") === "1");
  const [selectedFormTemplate, setSelectedFormTemplate] = useState(null);
  const [selectedFormId, setSelectedFormId] = useState(() => sessionStorage.getItem("nuraform:selected-form-id") || null);
  const [isBlankForm, setIsBlankForm] = useState(() => sessionStorage.getItem("nuraform:blank-form") === "1");

  const pendingTemplateCreatesRef = useRef(new Set());

  const handleLogoClick = () => {
    setShowForm(false);
    setSelectedFormTemplate(null);
    setSelectedFormId(null);
    setIsBlankForm(false);
    sessionStorage.removeItem("nuraform:show-form");
    sessionStorage.removeItem("nuraform:blank-form");
  };

  const handlePromptChipClick = (chipText) => {
    const promptSentence = generatePromptSentence(chipText);
    window.dispatchEvent(
      new CustomEvent("nuraform:prompt-chip-clicked", {
        detail: { promptText: promptSentence },
      }),
    );
  };

  const openForm = ({ formId = null, template = null }) => {
    setSelectedFormTemplate(template);
    setSelectedFormId(formId);
    setIsBlankForm(false);
    sessionStorage.removeItem("nuraform:blank-form");
    setShowForm(true);
    sessionStorage.setItem("nuraform:show-form", "1");
  };

  const handleSendPrompt = async (promptText) => {
    const matchedTemplate = matchPromptToTemplate(promptText);

    if (!matchedTemplate) {
      console.log("No matching template found for:", promptText);
      return;
    }

    const templateKey = matchedTemplate.templateKey || matchedTemplate.id;
    const cacheKey = getTemplateFormCacheKey(templateKey);

    const cachedFormId = sessionStorage.getItem(cacheKey);
    if (cachedFormId) {
      openForm({ formId: cachedFormId });
      return;
    }

    if (pendingTemplateCreatesRef.current.has(templateKey)) return;
    pendingTemplateCreatesRef.current.add(templateKey);

    try {
      const { formsApi, questionsApi } = await import("../../services/api");

      const createdForm = await formsApi.create({
        userId: user?.id || null,
        title: matchedTemplate.title,
        description: matchedTemplate.description,
      });

      const templateQuestions = matchedTemplate.questions || [];

      if (templateQuestions.length > 0) {
        await Promise.all(
          templateQuestions.map((question) =>
            questionsApi.create({
              formId: createdForm.id,
              order: question.order,
              heading: question.heading || "",
              questionText: question.questionText || "",
              description: question.description || "",
              answerType: question.answerType || "text",
              mandatory: Boolean(question.mandatory),
              showDescription: Boolean(question.showDescription),
              aiFollowUp: Boolean(question.aiFollowUp),
              options: question.options || [],
            }),
          ),
        );
      }

      sessionStorage.setItem(cacheKey, createdForm.id);
      openForm({ formId: createdForm.id });

      window.dispatchEvent(
        new CustomEvent("nuraform:form-created", {
          detail: { form: createdForm },
        }),
      );
    } catch (error) {
      console.error("Could not persist the generated form (is `npm run server` running?):", error);

      openForm({ template: matchedTemplate });
    } finally {
      pendingTemplateCreatesRef.current.delete(templateKey);
    }
  };

  useEffect(() => {
    if (showForm) sessionStorage.setItem("nuraform:show-form", "1");
    else sessionStorage.removeItem("nuraform:show-form");
  }, [showForm]);

  useEffect(() => {
    if (selectedFormId) {
      sessionStorage.setItem("nuraform:selected-form-id", selectedFormId);
    } else {
      sessionStorage.removeItem("nuraform:selected-form-id");
    }
  }, [selectedFormId]);

  useEffect(() => {
    const handleCreateBlank = (event) => {
      setShowForm(true);
      setSelectedFormTemplate(null);
      setSelectedFormId(event?.detail?.formId || null);
      setIsBlankForm(true);
      sessionStorage.setItem("nuraform:blank-form", "1");
    };

    const handleLogoClicked = () => {
      setShowForm(false);
      setSelectedFormTemplate(null);
      setSelectedFormId(null);
      setIsBlankForm(false);
      sessionStorage.removeItem("nuraform:blank-form");
    };

    const handleSelectForm = (event) => {
      const { formId, template } = event?.detail || {};

      setIsBlankForm(false);
      sessionStorage.removeItem("nuraform:blank-form");

      if (template) {
        setSelectedFormTemplate(template);
        setSelectedFormId(null);
      } else if (formId) {
        setSelectedFormTemplate(null);
        setSelectedFormId(formId);
      } else {
        return;
      }

      setShowForm(true);
      sessionStorage.setItem("nuraform:show-form", "1");
    };

    window.addEventListener("nuraform:create-blank", handleCreateBlank);
    window.addEventListener("nuraform:logo-clicked", handleLogoClicked);
    window.addEventListener("nuraform:select-form", handleSelectForm);

    return () => {
      window.removeEventListener("nuraform:create-blank", handleCreateBlank);
      window.removeEventListener("nuraform:logo-clicked", handleLogoClicked);
      window.removeEventListener("nuraform:select-form", handleSelectForm);
    };
  }, []);

  const recentForms = !userFormsLoading ? sortFormsByNewest(userForms || []).slice(0, MAX_RECENT_FORMS) : [];

  const hasRecentForms = recentForms.length > 0;

  return (
    <div className="flex h-full flex-col overflow-y-auto rounded-[20px] bg-[#fff]">
      {!showForm ? (
        <div className="visible-element relative flex w-full flex-1 flex-col self-center px-[40px] py-[30px] max-[767px]:px-[20px] max-[767px]:py-[20px]">
          <RecentFormsPanel forms={recentForms} />
          <div className="logo-demo cursor-pointer" onClick={handleLogoClick}>
            <svg width="100" height="29" viewBox="0 0 152 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              {" "}
              <path
                d="M10.4386 9.10711C14.3536 9.10711 17.8736 11.4418 17.8736 17.1168V26.5274C17.8736 27.6049 17.0834 28.1437 16.2932 28.1437C15.503 28.1437 14.7128 27.569 14.7128 26.5274V17.5478C14.7128 13.2377 12.1985 11.8369 9.54061 11.8369C6.1284 11.8369 4.00923 14.0638 3.9374 17.8711V26.5633C3.9374 27.569 3.1472 28.1437 2.357 28.1437C1.5668 28.1437 0.776607 27.569 0.776607 26.5633V10.9389C0.776607 9.8973 1.5668 9.35853 2.357 9.35853C3.1472 9.35853 3.9374 9.86139 3.9374 10.9389V12.9503C5.12269 10.5079 7.31369 9.10711 10.4386 9.10711ZM37.4024 9.35853C38.1926 9.35853 38.9827 9.86139 38.9827 10.9389V26.5633C38.9827 27.6049 38.1926 28.1437 37.4024 28.1437C36.6122 28.1437 35.822 27.569 35.822 26.5633V24.5878C34.6367 26.9943 32.4457 28.3592 29.3567 28.3592C25.4057 28.3592 21.8858 26.0604 21.8858 20.3854V10.9748C21.8858 9.8973 22.676 9.35853 23.4662 9.35853C24.2563 9.35853 25.0465 9.8973 25.0465 10.9748V19.9544C25.0465 24.2645 27.5967 25.6653 30.2547 25.6653C33.5232 25.6653 35.7501 23.5821 35.822 19.6311V10.9389C35.822 9.86139 36.6481 9.35853 37.4024 9.35853ZM51.8307 9.39445C52.9801 9.39445 53.4111 10.041 53.4111 10.6875C53.4111 11.2622 53.052 12.1961 51.6152 12.1601C48.5263 12.0883 46.6945 13.7405 46.6945 16.5781V26.5992C46.6945 27.6049 45.9043 28.1437 45.15 28.1437C44.3598 28.1437 43.5696 27.6049 43.5696 26.5992V10.903C43.5696 9.8973 44.3598 9.35853 45.15 9.35853C45.9043 9.35853 46.6945 9.86139 46.6945 10.903V12.4116C47.5924 10.6157 49.2446 9.39445 51.8307 9.39445ZM72.5642 9.43037C73.3544 9.43037 74.1446 9.93322 74.1446 10.9748V26.6351C74.1446 27.6408 73.3544 28.1796 72.5642 28.1796C71.774 28.1796 70.9478 27.6408 70.9478 26.6351V23.6539C69.8703 26.3837 67.2124 28.3592 63.441 28.3592C57.8018 28.3592 54.1741 24.0849 54.1741 18.6972C54.1741 13.2018 57.9096 9.10711 63.5846 9.10711C66.7814 9.10711 69.547 10.7593 70.9478 13.4891V10.9748C70.9478 9.93322 71.774 9.43037 72.5642 9.43037ZM64.1593 25.5576C68.1103 25.5576 70.9478 22.5764 70.9478 18.7331C70.9478 14.9258 68.1103 11.9446 64.1593 11.9446C60.2084 11.9446 57.3349 14.7822 57.3349 18.7331C57.3349 22.6841 60.2084 25.5576 64.1593 25.5576ZM83.169 9.5022H87.0122C87.6587 9.5022 88.2334 10.041 88.2334 10.7593C88.2334 11.4418 87.6587 11.9805 87.0122 11.9805H83.169V26.5992C83.169 27.4253 82.4506 28.1437 81.5886 28.1437C80.7265 28.1437 80.0441 27.4253 80.0441 26.5992V11.9805H78.9306C78.2482 11.9805 77.6735 11.4059 77.6735 10.7593C77.6735 10.0769 78.2482 9.5022 78.9306 9.5022H80.0441V6.55692C80.0441 2.39043 82.5943 0.881871 85.5396 0.881871C86.0783 0.881871 86.6889 0.953708 87.2636 1.06146C88.0897 1.20513 88.4848 1.81574 88.4848 2.42635C88.4848 3.10879 87.982 3.75532 87.0481 3.64756C86.7608 3.61164 86.4375 3.61164 86.1861 3.61164C84.3543 3.61164 83.0612 4.29409 83.169 6.95202V9.5022ZM98.8463 28.3592C93.2431 28.3592 89.0048 24.2286 89.0048 18.7331C89.0048 13.2377 93.2431 9.10711 98.8463 9.10711C104.485 9.10711 108.688 13.2377 108.688 18.7331C108.688 24.2286 104.485 28.3592 98.8463 28.3592ZM98.8463 25.5217C102.69 25.5217 105.635 22.5764 105.635 18.6972C105.635 14.8899 102.725 11.9446 98.8463 11.9446C95.0031 11.9446 92.0578 14.8899 92.0578 18.6972C92.0578 22.5764 95.039 25.5217 98.8463 25.5217ZM120.58 9.39445C121.73 9.39445 122.161 10.041 122.161 10.6875C122.161 11.2622 121.801 12.1961 120.365 12.1601C117.276 12.0883 115.444 13.7405 115.444 16.5781V26.5992C115.444 27.6049 114.654 28.1437 113.899 28.1437C113.109 28.1437 112.319 27.6049 112.319 26.5992V10.903C112.319 9.8973 113.109 9.35853 113.899 9.35853C114.654 9.35853 115.444 9.86139 115.444 10.903V12.4116C116.342 10.6157 117.994 9.39445 120.58 9.39445ZM144.989 9.10711C148.545 9.10711 151.705 11.2981 151.705 16.5781V26.5274C151.705 27.6049 150.879 28.1437 150.089 28.1437C149.335 28.1437 148.509 27.6049 148.509 26.5274V17.045C148.509 13.094 146.533 11.8369 144.414 11.8369C141.612 11.8369 139.924 13.956 139.924 17.3323V26.5274C139.924 27.569 139.134 28.1437 138.344 28.1437C137.518 28.1437 136.728 27.569 136.728 26.5274V17.045C136.728 13.094 134.752 11.8369 132.633 11.8369C129.867 11.8369 128.179 13.8842 128.107 17.3323V26.5633C128.107 27.569 127.317 28.1437 126.527 28.1437C125.737 28.1437 124.946 27.569 124.946 26.5633V10.9389C124.946 9.8973 125.737 9.35853 126.563 9.35853C127.353 9.35853 128.107 9.86139 128.107 10.8671V12.4475C129.113 10.3283 130.981 9.10711 133.531 9.10711C135.901 9.10711 138.057 10.2206 138.99 12.8785C139.996 10.472 142.115 9.10711 144.989 9.10711Z"
                fill="currentColor"
              ></path>{" "}
            </svg>
          </div>
          <div className={`absolute top-1/2 max-w-[560px] -translate-y-1/2 pb-[6%] pl-[5%] max-[1024px]:left-1/2 max-[1024px]:w-[90%] max-[1024px]:-translate-x-1/2 max-[1024px]:text-center max-[767px]:w-full max-[767px]:pb-0 max-[576px]:pl-0 ${hasRecentForms ? "left-0 w-[55%] translate-x-0 text-left" : "left-1/2 w-[90%] -translate-x-1/2 text-center"}`}>
            <p
              style={{
                fontSize: "var(--fs50)",
              }}
              className="text-[#7e7c7d] max-[576px]:px-[5%]"
            >
              {userDetails?.full_name ? `Hi ${userDetails.full_name}` : "Try Nuraform Demo"}
            </p>

            <h1
              style={{
                fontSize: "var(--fs67)",
              }}
              className="font-antonia max-[576px]:px-[5%]"
            >
              Create a form in seconds
            </h1>
            <div className={`mt-[3%] flex flex-wrap items-center gap-[2%] gap-y-[10px] max-[1024px]:justify-center max-[576px]:px-[5%] ${hasRecentForms ? "justify-start" : "justify-center"}`}>
              <button type="button" onClick={() => handlePromptChipClick("Demo Booking")} style={{ whiteSpace: "nowrap", fontSize: "var(--fs20)" }} className="prompt-chip cursor-pointer rounded-full border border-[#d6d6d6] px-[5%] py-[1.5%] shadow-[0_2px_18px_#0001] transition-all hover:bg-[#D7ADF0] hover:text-black">
                Demo Booking
              </button>
              <button type="button" onClick={() => handlePromptChipClick("Gratitude Journal")} style={{ whiteSpace: "nowrap", fontSize: "var(--fs20)" }} className="prompt-chip cursor-pointer rounded-full border border-[#d6d6d6] px-[5%] py-[1.5%] shadow-[0_2px_18px_#0001] transition-all hover:bg-[#D7ADF0] hover:text-black">
                Gratitude Journal
              </button>
              <button type="button" onClick={() => handlePromptChipClick("Event Registration")} style={{ whiteSpace: "nowrap", fontSize: "var(--fs20)" }} className="prompt-chip cursor-pointer rounded-full border border-[#d6d6d6] px-[5%] py-[1.5%] shadow-[0_2px_18px_#0001] transition-all hover:bg-[#D7ADF0] hover:text-black">
                Event Registration
              </button>
            </div>
          </div>
          <div className={`mt-auto max-[1023px]:mx-auto max-[1023px]:w-[90%] max-[767px]:w-full ${hasRecentForms ? "mr-auto w-[60%]" : "mx-auto w-[60%]"}`}>
            <ChatBar onSendPrompt={handleSendPrompt} />
          </div>
        </div>
      ) : (
        <div className="form-content-container flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto pb-[14%] max-[767px]:pb-[28%]">
            <NuraformForm formId={selectedFormId} formTemplate={selectedFormTemplate} blank={isBlankForm} />
          </div>
          <div className="fixed bottom-0 left-1/2 mx-auto w-[60%] -translate-x-1/2 bg-white py-4 max-[1023px]:w-[90%] max-[767px]:w-[94%] max-[767px]:py-3">
            <ChatBar onSendPrompt={handleSendPrompt} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoPageContent;
