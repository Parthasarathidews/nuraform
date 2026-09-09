const API_BASE_URL = "http://localhost:3001";

export const formsApi = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/forms`);
    if (!response.ok) throw new Error("Failed to fetch forms");
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/forms/${id}`);
    if (!response.ok) throw new Error("Failed to fetch form");
    return response.json();
  },

  async create(formData) {
    const response = await fetch(`${API_BASE_URL}/forms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) throw new Error("Failed to create form");
    return response.json();
  },

  async update(id, formData) {
    const response = await fetch(`${API_BASE_URL}/forms/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        updatedAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) throw new Error("Failed to update form");
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/forms/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete form");
    return response.json();
  },
};

export const questionsApi = {
  async getByFormId(formId) {
    const response = await fetch(
      `${API_BASE_URL}/questions?formId=${formId}&_sort=order&_order=asc`,
    );
    if (!response.ok) throw new Error("Failed to fetch questions");
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/questions/${id}`);
    if (!response.ok) throw new Error("Failed to fetch question");
    return response.json();
  },

  async create(questionData) {
    const response = await fetch(`${API_BASE_URL}/questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...questionData,
        createdAt: new Date().toISOString(),
      }),
    });
    if (!response.ok) throw new Error("Failed to create question");
    return response.json();
  },

  async update(id, questionData) {
    const response = await fetch(`${API_BASE_URL}/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(questionData),
    });
    if (!response.ok) throw new Error("Failed to update question");
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/questions/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete question");
    return response.json();
  },

  async bulkUpdateOrder(questions) {
    const promises = questions.map((q) =>
      fetch(`${API_BASE_URL}/questions/${q.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: q.order }),
      }),
    );
    const responses = await Promise.all(promises);
    if (responses.some((r) => !r.ok))
      throw new Error("Failed to update question order");
    return Promise.all(responses.map((r) => r.json()));
  },
};
