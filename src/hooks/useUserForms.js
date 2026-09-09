import { useCallback, useEffect, useRef, useState } from "react";
import { getUserForms } from "../service/formsService";

export const useUserForms = (userId) => {
  const [forms, setForms] = useState(null);
  const requestVersionRef = useRef(0);

  const isAuthenticated = Boolean(userId);

  const refetch = useCallback(async () => {
    if (!isAuthenticated) {
      setForms(null);
      return;
    }

    const requestVersion = ++requestVersionRef.current;
    const data = await getUserForms(userId);
    if (requestVersion === requestVersionRef.current) {
      setForms(Array.isArray(data) ? data : []);
    }
  }, [isAuthenticated, userId]);

  useEffect(() => {
    if (!isAuthenticated) {
      setForms(null);
      return;
    }

    let isMounted = true;

    refetch();

    const handleFormUpdated = (event) => {
      const updatedForm = event.detail?.form;
      if (!updatedForm || updatedForm.userId !== userId) return;

      requestVersionRef.current += 1;

      setForms((currentForms) => {
        const existingForms = currentForms || [];
        const hasUpdatedForm = existingForms.some(
          (form) => form.id === updatedForm.id,
        );

        return hasUpdatedForm
          ? existingForms.map((form) =>
              form.id === updatedForm.id ? { ...form, ...updatedForm } : form,
            )
          : [updatedForm, ...existingForms];
      });
    };

    const handleFormCreated = (event) => {
      const createdForm = event.detail?.form;
      if (!createdForm || createdForm.userId !== userId) return;

      requestVersionRef.current += 1;

      setForms((currentForms) => {
        const existingForms = currentForms || [];
        return existingForms.some((form) => form.id === createdForm.id)
          ? existingForms
          : [createdForm, ...existingForms];
      });
    };

    window.addEventListener("nuraform:form-updated", handleFormUpdated);
    window.addEventListener("nuraform:form-created", handleFormCreated);

    return () => {
      isMounted = false;
      window.removeEventListener("nuraform:form-updated", handleFormUpdated);
      window.removeEventListener("nuraform:form-created", handleFormCreated);
    };
  }, [isAuthenticated, refetch, userId]);

  return {
    forms,
    loading: isAuthenticated && forms === null,
    refetch,
  };
};
