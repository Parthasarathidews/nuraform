export const getUserForms = async (userId) => {
  if (!userId) return [];

  try {
    const { formsApi } = await import("../services/api");

    const allForms = await formsApi.getAll();

    const userForms = allForms.filter(
      (form) => form.userId === userId || form.userId === null,
    );

    const seenIds = new Set();
    const uniqueForms = userForms.filter((form) => {
      if (seenIds.has(form.id)) return false;
      seenIds.add(form.id);
      return true;
    });

    return sortFormsByNewest(uniqueForms);
  } catch (error) {
    console.error("Failed to fetch user forms:", error);
    return [];
  }
};

export const getFormCreatedAtValue = (form) => {
  const rawDate = form?.createdAt ?? form?.created_at ?? null;
  const timestamp = rawDate ? new Date(rawDate).getTime() : 0;

  return Number.isFinite(timestamp) ? timestamp : 0;
};

export const sortFormsByNewest = (forms = []) =>
  [...forms].sort(
    (a, b) => getFormCreatedAtValue(b) - getFormCreatedAtValue(a),
  );
