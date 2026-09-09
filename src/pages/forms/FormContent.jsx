import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CustomInput from "../../components/CustomInput";
import CustomTextarea from "../../components/CustomTextarea";
import FormQuestion from "../../components/FormQuestion";
import { useNavigate } from "react-router-dom";
const MOBILE_BREAKPOINT = 769;
const SortableFormQuestion = ({ question, onUpdate, onCopy, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <FormQuestion
        question={question}
        onUpdate={onUpdate}
        onCopy={onCopy}
        onDelete={onDelete}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
};

const FormContent = ({
  formData,
  questions,
  onAddQuestion,
  onUpdateQuestion,
  onCopyQuestion,
  onDeleteQuestion,
  onReorderQuestions,
  formDescription,
  formTitle,
  onUpdateFormTitle,
  onUpdateFormDescription,
}) => {
  const [description, setDescription] = useState(formDescription);
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < MOBILE_BREAKPOINT,
  );
  const navigate = useNavigate("");
  useEffect(() => {
    setDescription(formDescription);
  }, [formDescription]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const handleFormView = () => {
    navigate("/viewForm", {
      state: {
        formId: formData?.id,
        title: formData?.title,
        description: formData?.description,
        questions,
      },
    });
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || !active) return;

    if (active.id !== over.id) {
      const oldIndex = questions.findIndex((q) => q.id === active.id);
      const newIndex = questions.findIndex((q) => q.id === over.id);

      const newOrder = arrayMove(questions, oldIndex, newIndex);
      onReorderQuestions(newOrder);
    }
  };

  return (
    <div className="w-[78%] mx-auto max-[769px]:w-[97%]">
      <div className="">
        <CustomInput
          placeholder="Form Title"
          value={formTitle || ""}
          onChange={(e) => {
            onUpdateFormTitle?.(e.target.value);
          }}
          className="header-trigger-api outline-[#ff633e] border-none pl-0 text-[48px] font-antonia text-[#000] formQuestionHeadingBreadCrumHeading max-[767px]:text-[32px]"
        />
        <CustomTextarea
          label=""
          name="description"
          value={description || ""}
          onChange={(e) => {
            setDescription(e.target.value);
            onUpdateFormDescription?.(e.target.value);
          }}
          placeholder="Enter description..."
          rows={2}
        />
      </div>
      {isMobile && (
        <div
          className="
    w-[60%]
    flex
    items-center
    justify-end
    gap-[8px]
    flex-wrap

    max-[769px]:w-full
    max-[769px]:justify-between
    max-[769px]:gap-[8px]
  "
        >
          <button
            type="button"
            className="
      h-[43px]
      px-[20px]
      rounded-full
      bg-[#F8B39A]
      text-black
      flex
      items-center
      justify-center
      gap-[10px]
      cursor-pointer
      text-[12px]
      leading-none
      shrink-0

      max-[767px]:h-[36px]
      max-[767px]:px-[16px]
      max-[767px]:gap-[7px]
    "
          >
            <span>Activity</span>

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M3 12H7L9.5 5L14.5 19L17 12H21"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            className="
      w-[43px]
      h-[43px]
      rounded-full
      bg-[#F8B39A]
      text-black
      flex
      items-center
      justify-center
      cursor-pointer
      shrink-0

      max-[767px]:w-[36px]
      max-[767px]:h-[36px]
    "
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="18"
                cy="5"
                r="2.5"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <circle
                cx="6"
                cy="12"
                r="2.5"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <circle
                cx="18"
                cy="19"
                r="2.5"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M8.2 10.8L15.8 6.2"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M8.2 13.2L15.8 17.8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <button
            onClick={handleFormView}
            type="button"
            className="
      h-[43px]
      px-[20px]
      rounded-full
      bg-[#F8B39A]
      text-black
      flex
      items-center
      justify-center
      gap-[10px]
      cursor-pointer
      text-[12px]
      leading-none
      shrink-0

      max-[767px]:h-[36px]
      max-[767px]:px-[16px]
      max-[767px]:gap-[7px]
    "
          >
            <span>View</span>

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 12C2 12 5.5 5 12 5C18.5 5 22 12 22 12C22 12 18.5 19 12 19C5.5 19 2 12 2 12Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </button>

          {/* Customize */}
          <button
            type="button"
            className="
      basis-full
      h-[43px]
      px-[20px]
      rounded-full
      bg-[#F8B39A]
      text-black
      flex
      items-center
      justify-between
      cursor-pointer
      text-[12px]
      leading-none

      max-[767px]:h-[36px]
      max-[767px]:px-[16px]
    "
          >
            <span>Customize</span>

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3C7.03 3 3 6.58 3 11C3 14.86 6.13 18 10 18H11.5C12.33 18 13 18.67 13 19.5C13 20.33 13.67 21 14.5 21C18.09 21 21 18.09 21 14.5C21 8.15 17.02 3 12 3Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="7.5" cy="10" r="1" fill="currentColor" />
              <circle cx="10" cy="7" r="1" fill="currentColor" />
              <circle cx="14" cy="7" r="1" fill="currentColor" />
              <circle cx="17" cy="10" r="1" fill="currentColor" />
            </svg>
          </button>
        </div>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={(questions || []).map((q) => q.id)}
          strategy={verticalListSortingStrategy}
        >
          {(questions || []).map((question) => (
            <SortableFormQuestion
              key={question.id}
              question={question}
              onUpdate={(updatedQuestion) =>
                onUpdateQuestion(question.id, updatedQuestion)
              }
              onCopy={() => onCopyQuestion(question.id)}
              onDelete={() => onDeleteQuestion(question.id)}
            />
          ))}
        </SortableContext>
      </DndContext>

      <button
        type="button"
        onClick={onAddQuestion}
        className="addQuestionButton group cursor-pointer [box-shadow:rgba(100,100,111,0.2)_0px_7px_29px_0px] flex items-center gap-[20px] py-[3px] pl-[3px] pr-[30px] mt-[5%] mx-auto rounded-full"
      >
        <span className="w-[50px] h-[50px] p-[8%] bg-[#FF633E] rounded-[100%] transition duration-500 group-hover:rotate-[90deg] ">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g>
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </g>
          </svg>
        </span>
        <p>Add a Question</p>
      </button>
    </div>
  );
};

export default FormContent;
