import React from "react";
import CustomInput from "./CustomInput";
import CustomDropdown from "./CustomDropdown";
import CustomToggle from "./CustomToggle";

const FormQuestion = ({
  question,
  onUpdate,
  onCopy,
  onDelete,
  dragHandleProps,
}) => {
  const handleFieldChange = (field, value) => {
    onUpdate?.({ ...question, [field]: value });
  };

  const options = [
    {
      label: (
        <div className="flex gap-[10px] items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="w-6 h-6 text-black"
          >
            <path
              d="M15.0857 21H8.91427M12 3V20.999M12 3C13.4266 3 15.2606 3.03 16.7191 3.17599C17.3362 3.23799 17.6448 3.26899 17.9184 3.37798C18.2041 3.49546 18.4597 3.67279 18.6668 3.89731C18.8739 4.12184 19.0275 4.38803 19.1167 4.67691C19.2 4.95389 19.2 5.26987 19.2 5.90184M12 3C10.5734 3 8.73942 3.03 7.2809 3.17599C6.66376 3.23799 6.35519 3.26899 6.08159 3.37798C5.79567 3.49534 5.53993 3.67261 5.33262 3.89715C5.1253 4.12168 4.97153 4.38793 4.88227 4.67691C4.79999 4.95389 4.79999 5.26987 4.79999 5.90184"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p>Short Text</p>
        </div>
      ),
      value: "text",
    },
    {
      label: (
        <div className="flex gap-[10px] items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-current"
          >
            <g>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </g>
          </svg>
          <p>Email</p>
        </div>
      ),
      value: "email",
    },
    {
      label: (
        <div className="flex gap-[10px] items-center">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-black"
          >
            <path
              d="M2 19.5H14.5"
              stroke="black"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M2 12L22 12"
              stroke="black"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M2 4.5L18.25 4.5"
              stroke="black"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <p>Long Text</p>
        </div>
      ),
      value: "textarea",
    },
    {
      label: (
        <div className="flex gap-[10px] items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-current"
          >
            <g>
              <line x1="4" y1="9" x2="20" y2="9" />
              <line x1="4" y1="15" x2="20" y2="15" />
              <line x1="10" y1="3" x2="8" y2="21" />
              <line x1="16" y1="3" x2="14" y2="21" />
            </g>
          </svg>
          <p>Number</p>
        </div>
      ),
      value: "number",
    },
    {
      label: (
        <div className="flex gap-[10px] items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-current"
          >
            <g>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </g>
          </svg>
          <p>Date</p>
        </div>
      ),
      value: "date",
    },
    {
      label: (
        <div className="flex gap-[10px] items-center">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-black"
          >
            <g>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </g>
          </svg>
          <p>Phone</p>
        </div>
      ),
      value: "tel",
    },
    {
      label: (
        <div className="flex gap-[10px] items-center">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-black"
          >
            <g>
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </g>
          </svg>
          <p>URL</p>
        </div>
      ),
      value: "url",
    },
  ];

  return (
    <div className="formQuestion [box-shadow:rgba(100,100,111,0.2)_0px_7px_29px_0px] p-[20px] rounded-[20px] mt-[3%] max-[769px]:my-[18%]">
      <CustomInput
        value={question.heading || ""}
        onChange={(e) => handleFieldChange("heading", e.target.value)}
        placeholder="Question heading"
        className="border-none w-[100%] pl-0"
      />
      <div className="flex justify-between items-start pb-[2%] border-b-[1px] border-[#eeeeee] max-[769px]:flex-col">
        <CustomInput
          value={question.questionText || ""}
          onChange={(e) => handleFieldChange("questionText", e.target.value)}
          placeholder="Type your question"
          className="border-none w-[100%] pl-0 "
        />
        <div className="flex items-center w-[40%] gap-[10px] justify-end max-[769px]:w-full max-[769px]:justify-start max-[769px]:mt-[8%]">
          <button
            type="button"
            onClick={onCopy}
            className="copyQuestion cursor-pointer w-[45px] h-[45px] p-[12px] rounded-[100%] bg-[#eeeeee] flex items-center justify-center"
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.3326 8.66699H11.333C10.9828 8.66699 10.6361 8.73596 10.3125 8.86997C9.98902 9.00398 9.69507 9.20039 9.44746 9.448C9.19984 9.69562 9.00343 9.98957 8.86942 10.3131C8.73541 10.6366 8.66644 10.9834 8.66644 11.3335V19.3332C8.66644 20.0404 8.94738 20.7186 9.44746 21.2187C9.94753 21.7188 10.6258 21.9997 11.333 21.9997H19.3326C20.0398 21.9997 20.7181 21.7188 21.2181 21.2187C21.7182 20.7186 21.9992 20.0404 21.9992 19.3332V11.3335C21.9992 10.6263 21.7182 9.94808 21.2181 9.448C20.7181 8.94793 20.0398 8.66699 19.3326 8.66699Z"
                fill="#222222"
                fillOpacity="0.16"
              ></path>
              <path
                d="M5.33318 15.3327H4.66654C3.18883 15.3327 2 14.1439 2 12.6662V4.66654C2 3.18883 3.18883 2 4.66654 2H12.6662C14.1439 2 15.3327 3.18883 15.3327 4.66654V5.33318M11.3329 8.66636H19.3325C20.0397 8.66636 20.718 8.9473 21.2181 9.44737C21.7181 9.94744 21.9991 10.6257 21.9991 11.3329V19.3325C21.9991 20.0397 21.7181 20.718 21.2181 21.2181C20.718 21.7181 20.0397 21.9991 19.3325 21.9991H11.3329C10.6257 21.9991 9.94744 21.7181 9.44737 21.2181C8.9473 20.718 8.66636 20.0397 8.66636 19.3325V11.3329C8.66636 10.9827 8.73533 10.636 8.86933 10.3125C9.00334 9.98894 9.19976 9.69498 9.44737 9.44737C9.69498 9.19976 9.98894 9.00334 10.3125 8.86933C10.636 8.73533 10.9827 8.66636 11.3329 8.66636Z"
                stroke="black"
                strokeWidth="1.70911"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="deleteQuestion cursor-pointer w-[45px] h-[45px] p-[12px] rounded-[100%] bg-[#eeeeee] flex items-center justify-center"
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <g>
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </g>
            </svg>
          </button>
          <button
            type="button"
            {...dragHandleProps}
            className="dragQuestion  w-[45px] h-[45px] p-[12px] rounded-[100%] bg-[#eeeeee] flex items-center justify-center cursor-grab max-[769px]:ml-auto "
          >
            <svg
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 25 24"
              fill="none"
              className="w-6 h-6"
            >
              <g clipPath="url(#clip0_2700_173)">
                <path
                  d="M15.9871 19.1643H8.31561L12.1514 23.0001L15.9871 19.1643ZM8.31561 5.54182H15.9871L12.1514 1.70605L8.31561 5.54182Z"
                  fill="currentColor"
                />
                <path
                  d="M22.5386 10.4893L1.51377 10.4893"
                  stroke="currentColor"
                  strokeWidth="1.73145"
                  strokeLinecap="round"
                />
                <path
                  d="M22.5386 15.4365L1.51377 15.4365"
                  stroke="currentColor"
                  strokeWidth="1.73145"
                  strokeLinecap="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2700_173">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.026123)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex gap-[7%] mt-[3%] max-[769px]:flex-col">
        <div className="w-[35%] max-[769px]:w-full">
          <p className="uppercase text-[12px] pb-[5px]">Answer type</p>
          <CustomDropdown
            options={options}
            value={question.answerType || "text"}
            onChange={(value) => handleFieldChange("answerType", value)}
            placeholder="Select type"
          />
        </div>
        <div className="max-[769px]:w-full max-[769px]:flex max-[769px]:items-center max-[769px]:justify-between max-[769px]:mt-[8%]">
          <p className="uppercase text-[12px] pb-[5px]">mandatory</p>
          <CustomToggle
            enabled={question.mandatory || false}
            onChange={(value) => handleFieldChange("mandatory", value)}
          />
        </div>
        <div className="max-[769px]:w-full max-[769px]:flex max-[769px]:items-center max-[769px]:justify-between max-[769px]:mt-[8%]">
          <p className="uppercase text-[12px] pb-[5px]">description</p>
          <CustomToggle
            enabled={question.showDescription || false}
            onChange={(value) => handleFieldChange("showDescription", value)}
          />
        </div>
        <div className="max-[769px]:w-full max-[769px]:flex max-[769px]:items-center max-[769px]:justify-between max-[769px]:mt-[8%]">
          <p className="uppercase text-[12px] pb-[5px]">ai follow-up</p>
          <CustomToggle
            enabled={question.aiFollowUp || false}
            onChange={(value) => handleFieldChange("aiFollowUp", value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FormQuestion;
