import React, { useState, useEffect, useCallback, useRef } from "react";
import FormHeader from "./FormHeader";
import FormContent from "./FormContent";
import { formsApi, questionsApi } from "../../services/api";

const isLocalId = (id) => typeof id === "string" && id.startsWith("local-");

const createLocalForm = () => ({
  id: `local-${Date.now()}`,
  title: "Untitled Form",
  description: "",
});

const createBlankQuestion = (formId, order) => ({
  id: `local-q-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  formId,
  order,
  heading: "",
  questionText: "",
  description: "",
  answerType: "text",
  mandatory: false,
  showDescription: false,
  aiFollowUp: false,
  options: [],
});

const NuraformForm = ({ formId: propFormId, formTemplate, blank } = {}) => {
  const [formData, setFormData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFormId, setCurrentFormId] = useState(propFormId);
  const [isTemplateMode, setIsTemplateMode] = useState(Boolean(formTemplate));
  const pendingFormUpdateRef = useRef(false);
  const saveQueueRef = useRef(Promise.resolve());
  const saveRevisionRef = useRef(0);

  useEffect(() => {
    setCurrentFormId(propFormId);
  }, [propFormId]);

  useEffect(() => {
    if (!formTemplate) {
      setIsTemplateMode(false);
      return;
    }

    setIsTemplateMode(true);
    setFormData({
      id: formTemplate.id || "template-form",
      title: formTemplate.title,
      description: formTemplate.description,
    });
    setQuestions(formTemplate.questions || []);
    setLoading(false);
  }, [formTemplate]);

  useEffect(() => {
    if (formTemplate) return;

    let cancelled = false;

    const loadFormData = async () => {
      setLoading(true);

      if (blank && !currentFormId) {
        if (!cancelled) {
          setFormData(createLocalForm());
          setQuestions([]);
          setLoading(false);
        }
        return;
      }

      if (isLocalId(currentFormId)) {
        if (!cancelled) setLoading(false);
        return;
      }

      try {
        let form;

        if (currentFormId) {
          form = await formsApi.getById(currentFormId);
        } else {
          const forms = await formsApi.getAll();

          if (forms.length === 0) {
            form = await formsApi.create({
              userId: null,
              title: "Untitled Form",
              description: "",
            });
          } else {
            form = forms[0];
          }
        }

        if (cancelled) return;
        setFormData(form);

        const formQuestions = await questionsApi.getByFormId(form.id);
        if (!cancelled) setQuestions(formQuestions);
      } catch (error) {
        console.error("Failed to load form data:", error);
        if (!cancelled) {
          setFormData(createLocalForm());
          setQuestions([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadFormData();

    return () => {
      cancelled = true;
    };
  }, [currentFormId, formTemplate, blank]);

  useEffect(() => {
    const handleCreateBlank = (event) => {
      const formId = event.detail?.formId;
      setCurrentFormId(formId || null);

      if (!formId) {
        setFormData(createLocalForm());
        setQuestions([]);
        setLoading(false);
      }
    };

    window.addEventListener("nuraform:create-blank", handleCreateBlank);

    return () => {
      window.removeEventListener("nuraform:create-blank", handleCreateBlank);
    };
  }, []);

  const canPersist = Boolean(
    formData &&
    !isTemplateMode &&
    !isLocalId(formData.id) &&
    formData.id !== "template-form",
  );

  useEffect(() => {
    pendingFormUpdateRef.current = false;
  }, [formData?.id]);

  useEffect(() => {
    if (!pendingFormUpdateRef.current || !canPersist || !formData) return;

    const revision = ++saveRevisionRef.current;
    const snapshot = {
      id: formData.id,
      title: formData.title || "",
      description: formData.description || "",
    };
    const timeoutId = window.setTimeout(() => {
      pendingFormUpdateRef.current = false;
      saveQueueRef.current = saveQueueRef.current
        .catch(() => undefined)
        .then(async () => {
          const savedForm = await formsApi.update(snapshot.id, {
            title: snapshot.title,
            description: snapshot.description,
          });

          if (revision === saveRevisionRef.current) {
            window.dispatchEvent(
              new CustomEvent("nuraform:form-updated", {
                detail: { form: savedForm },
              }),
            );
          }
        })
        .catch((error) => {
          console.error("Failed to update form details:", error);
        });
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [canPersist, formData?.description, formData?.id, formData?.title]);

  const updateFormTitle = useCallback((newTitle) => {
    setFormData((prev) => (prev ? { ...prev, title: newTitle } : prev));
    pendingFormUpdateRef.current = true;
  }, []);

  const updateFormDescription = useCallback((newDescription) => {
    setFormData((prev) =>
      prev ? { ...prev, description: newDescription } : prev,
    );
    pendingFormUpdateRef.current = true;
  }, []);

  const addQuestion = async () => {
    const activeFormId = formData?.id;
    const newQuestion = createBlankQuestion(activeFormId, questions.length);

    setQuestions((prev) => [...prev, newQuestion]);

    if (!canPersist) return;

    try {
      const saved = await questionsApi.create({
        formId: activeFormId,
        order: newQuestion.order,
        heading: "",
        questionText: "",
        description: "",
        answerType: "text",
        mandatory: false,
        showDescription: false,
        aiFollowUp: false,
      });

      setQuestions((prev) =>
        prev.map((q) => (q.id === newQuestion.id ? { ...q, ...saved } : q)),
      );
    } catch (error) {
      console.error("Failed to add question:", error);
    }
  };

  const updateQuestion = async (questionId, updatedData) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, ...updatedData } : q)),
    );

    if (!canPersist || isLocalId(questionId)) return;

    try {
      await questionsApi.update(questionId, updatedData);
    } catch (error) {
      console.error("Failed to update question:", error);
    }
  };

  const copyQuestion = async (questionId) => {
    const questionToCopy = questions.find((q) => q.id === questionId);
    if (!questionToCopy) return;

    const insertAt = questions.findIndex((q) => q.id === questionId) + 1;

    const copiedQuestion = {
      ...questionToCopy,
      id: `local-q-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      order: insertAt,
    };

    const optimistic = [
      ...questions.slice(0, insertAt),
      copiedQuestion,
      ...questions.slice(insertAt),
    ].map((q, idx) => ({ ...q, order: idx }));

    setQuestions(optimistic);

    if (!canPersist) return;

    try {
      const saved = await questionsApi.create({
        ...questionToCopy,
        id: undefined,
        order: insertAt,
      });

      setQuestions((prev) =>
        prev.map((q) => (q.id === copiedQuestion.id ? { ...q, ...saved } : q)),
      );

      const toUpdate = optimistic
        .filter((q) => q.id !== copiedQuestion.id && !isLocalId(q.id))
        .map((q) => ({ id: q.id, order: q.order }));

      if (toUpdate.length > 0) await questionsApi.bulkUpdateOrder(toUpdate);
    } catch (error) {
      console.error("Failed to copy question:", error);
    }
  };

  const deleteQuestion = async (questionId) => {
    const remaining = questions
      .filter((q) => q.id !== questionId)
      .map((q, idx) => ({ ...q, order: idx }));

    setQuestions(remaining);

    if (!canPersist || isLocalId(questionId)) return;

    try {
      await questionsApi.delete(questionId);

      const toUpdate = remaining
        .filter((q) => !isLocalId(q.id))
        .map((q) => ({ id: q.id, order: q.order }));

      if (toUpdate.length > 0) await questionsApi.bulkUpdateOrder(toUpdate);
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  const reorderQuestions = async (newOrder) => {
    const reordered = newOrder.map((q, idx) => ({ ...q, order: idx }));
    setQuestions(reordered);

    if (!canPersist) return;

    try {
      const toUpdate = reordered
        .filter((q) => !isLocalId(q.id))
        .map((q) => ({ id: q.id, order: q.order }));

      if (toUpdate.length > 0) await questionsApi.bulkUpdateOrder(toUpdate);
    } catch (error) {
      console.error("Failed to reorder questions:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col py-[30px] px-[40px]">
        <p>Loading form...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col py-[30px] px-[40px] min-h-full max-[769px]:px-[20px] max-[769px]:py-[20px]   ">
      <FormHeader
        formTitle={formData?.title || "Untitled Form"}
        onUpdateTitle={updateFormTitle}
        formData={formData}
        questions={questions}
      />
      <FormContent
        formData={formData}
        questions={questions}
        onAddQuestion={addQuestion}
        onUpdateQuestion={updateQuestion}
        onCopyQuestion={copyQuestion}
        onDeleteQuestion={deleteQuestion}
        onReorderQuestions={reorderQuestions}
        formDescription={formData?.description || ""}
        formTitle={formData?.title || ""}
        onUpdateFormTitle={updateFormTitle}
        onUpdateFormDescription={updateFormDescription}
      />
    </div>
  );
};

export default NuraformForm;
