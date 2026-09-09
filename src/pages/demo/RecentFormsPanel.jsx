import { getFormTemplateById } from "../../data/formTemplates";
import { sortFormsByNewest } from "../../service/formsService";

const RecentFormsPanel = ({ forms = [] }) => {
  const sortedForms = sortFormsByNewest(forms);

  const handleSelectForm = (form) => {
    const template = getFormTemplateById(form.id);

    window.dispatchEvent(
      new CustomEvent("nuraform:select-form", {
        detail: template ? { template } : { formId: form.id },
      }),
    );
  };

  if (sortedForms.length === 0) return null;

  return (
    <div
      className="
        recent-forms-panel
        absolute
        top-[24px]
        right-[24px]
        z-20
        w-[clamp(300px,32vw,480px)]
        rounded-[15px]
        border
        border-[#f0ebeb]
        bg-white
       h-full
        p-[20px]
        max-[1024px]:hidden
      "
    >
      <p
        className="
          font-dmsans
          text-[11px]
          font-medium
          tracking-[0.12em]
          text-[#a3a3a3]
          uppercase
        "
      >
        Recent Forms
      </p>

      <div className="mt-[14px] flex flex-col gap-[6px]">
        {sortedForms.map((form) => {
          const createdDate = form.createdAt ?? form.created_at;

          return (
            <div
              key={form.id}
              className="
                group/recent-item
                flex
                items-center
                justify-between
                gap-[10px]
                rounded-[14px]
                px-[8px]
                py-[8px]
                cursor-pointer
                transition-colors
                hover:bg-[#faf7f7]
              "
            >
              <button
                type="button"
                onClick={() => handleSelectForm(form)}
                className="flex flex-1 min-w-0 items-center gap-[12px] cursor-pointer text-left"
              >
                <span
                  className="
                    flex
                    h-[40px]
                    w-[40px]
                    shrink-0
                    items-center
                    justify-center
                  "
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id={`recentFormIcon-${form.id}`}
                        x1="4"
                        y1="3"
                        x2="20"
                        y2="21"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stopColor="#a78bfa" />
                        <stop offset="1" stopColor="#7c6cf6" />
                      </linearGradient>
                    </defs>
                    <rect
                      x="6"
                      y="2.5"
                      width="13"
                      height="16"
                      rx="2.5"
                      fill={`url(#recentFormIcon-${form.id})`}
                      opacity="0.55"
                    />
                    <rect
                      x="4"
                      y="5"
                      width="13"
                      height="16"
                      rx="2.5"
                      fill={`url(#recentFormIcon-${form.id})`}
                    />
                    <line
                      x1="7.5"
                      y1="10"
                      x2="13.5"
                      y2="10"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                    <line
                      x1="7.5"
                      y1="13.5"
                      x2="13.5"
                      y2="13.5"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                    <line
                      x1="7.5"
                      y1="17"
                      x2="11"
                      y2="17"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

                <span className="min-w-0">
                  <p className="truncate text-[15px] font-medium text-[#1a1a1a]">
                    {form.title || form.name || "Untitled Form"}
                  </p>
                  <p className="mt-[2px] text-[12px] text-[#9c9c9c]">
                    {createdDate
                      ? new Date(createdDate).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "No date"}
                  </p>
                </span>
              </button>

              <button
                type="button"
                className="
                  flex
                  h-[28px]
                  w-[28px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-[#bbbbbb]
                  transition-colors
                  hover:bg-[#ff633e]
                  hover:text-white
                "
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentFormsPanel;
