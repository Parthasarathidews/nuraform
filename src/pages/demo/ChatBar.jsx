import { useEffect, useRef, useState } from "react";
import CustomInput from "../../components/CustomInput";
import { useAuth } from "../../hooks/useAuth";

const ChatBar = ({ onSendPrompt }) => {
  const { user } = useAuth();
  const inputRef = useRef(null);
  const [promptValue, setPromptValue] = useState("");

  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();

    window.addEventListener("nuraform:create-blank", focusInput);

    return () => {
      window.removeEventListener("nuraform:create-blank", focusInput);
    };
  }, []);

  useEffect(() => {
    const handlePromptChipClick = (event) => {
      const promptText = event.detail?.promptText;

      if (promptText) {
        setPromptValue(promptText);

        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      }
    };

    window.addEventListener(
      "nuraform:prompt-chip-clicked",
      handlePromptChipClick,
    );

    return () => {
      window.removeEventListener(
        "nuraform:prompt-chip-clicked",
        handlePromptChipClick,
      );
    };
  }, []);

  const handleSendPrompt = () => {
    const trimmedPrompt = promptValue.trim();

    if (trimmedPrompt && onSendPrompt) {
      onSendPrompt(trimmedPrompt);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendPrompt();
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[20px] p-[2px]">
      <div className="absolute inset-0 rounded-[20px] bg-[conic-gradient(from_0deg,transparent_0deg,#FF633E_60deg,transparent_120deg)] animate-[borderRotate_4s_linear_infinite]" />

      <div className="relative rounded-[18px] bg-white px-[1%] py-[2%] border-[2px] border-[rgba(235,0,0,0.0941176471)]">
        <CustomInput
          ref={inputRef}
          className="border-none mb-[2%]"
          placeholder="Describe Your form idea..."
          value={promptValue}
          onChange={(e) => setPromptValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className="flex items-center gap-[1%] ml-[2%]">
          <div className="shrink-0">
            <svg
              className="w-[24px] h-[24px] max-[770px]:w-[35px] max-[770px]:h-[35px] max-[577px]:w-[25px] max-[577px]:h-[25px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="15" y2="15" />
            </svg>
          </div>

          <p className="m-0 cursor-pointer">
            {user?.user_metadata ? "Add file" : "Sign Up to Add files"}
          </p>
        </div>

        <button
          type="button"
          onClick={handleSendPrompt}
          className="sendPromptButton absolute right-[1.5%] bottom-[10%] w-[40px] h-[40px] bg-[#FF633E] rounded-full p-[1%] cursor-pointer hover:bg-[#ff4520] transition-colors"
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBar;
