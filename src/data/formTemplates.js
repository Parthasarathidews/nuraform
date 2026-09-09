export const FORM_TEMPLATES = {
  "Demo Booking": {
    id: "template-demo-booking",
    title: "Demo Booking Form",
    description: "Schedule a demo session with our team",
    questions: [
      {
        id: "db-1",
        formId: "template-demo-booking",
        order: 0,
        heading: "What's your name?",
        questionText: "Full Name",
        description: "Please provide your full name",
        answerType: "text",
        mandatory: true,
        showDescription: true,
        aiFollowUp: false,
      },
      {
        id: "db-2",
        formId: "template-demo-booking",
        order: 1,
        heading: "Your email address",
        questionText: "Email",
        description: "We'll send the meeting invite to this email",
        answerType: "email",
        mandatory: true,
        showDescription: true,
        aiFollowUp: false,
      },
      {
        id: "db-3",
        formId: "template-demo-booking",
        order: 2,
        heading: "Company name",
        questionText: "Company",
        description: "Which organization are you from?",
        answerType: "text",
        mandatory: false,
        showDescription: true,
        aiFollowUp: false,
      },
      {
        id: "db-4",
        formId: "template-demo-booking",
        order: 3,
        heading: "Preferred date and time",
        questionText: "Schedule",
        description: "When would you like to schedule the demo?",
        answerType: "text",
        mandatory: true,
        showDescription: true,
        aiFollowUp: false,
      },
      {
        id: "db-5",
        formId: "template-demo-booking",
        order: 4,
        heading: "What are you interested in?",
        questionText: "Interest Areas",
        description: "Select all that apply",
        answerType: "multiple-choice",
        options: [
          "AI-powered form generation",
          "Analytics and insights",
          "Integration capabilities",
          "Team collaboration",
          "Enterprise features",
        ],
        mandatory: false,
        showDescription: true,
        aiFollowUp: false,
      },
    ],
  },

  "Gratitude Journal": {
    id: "template-gratitude-journal",
    title: "Daily Gratitude Journal",
    description: "Reflect on the positive moments in your day",
    questions: [
      {
        id: "gj-1",
        formId: "template-gratitude-journal",
        order: 0,
        heading: "What is today's date?",
        questionText: "Date",
        description: "Enter today's date",
        answerType: "text",
        mandatory: true,
        showDescription: true,
        aiFollowUp: false,
      },
      {
        id: "gj-2",
        formId: "template-gratitude-journal",
        order: 1,
        heading: "What are you grateful for today?",
        questionText: "Gratitude",
        description: "List 3 things you're grateful for",
        answerType: "textarea",
        mandatory: true,
        showDescription: true,
        aiFollowUp: false,
      },
      {
        id: "gj-3",
        formId: "template-gratitude-journal",
        order: 2,
        heading: "Who made you smile today?",
        questionText: "Positive Interactions",
        description: "Reflect on meaningful connections",
        answerType: "text",
        mandatory: false,
        showDescription: true,
        aiFollowUp: false,
      },
      {
        id: "gj-4",
        formId: "template-gratitude-journal",
        order: 3,
        heading: "What was your biggest win today?",
        questionText: "Achievement",
        description: "Celebrate your accomplishments, big or small",
        answerType: "textarea",
        mandatory: false,
        showDescription: true,
        aiFollowUp: false,
      },
      {
        id: "gj-5",
        formId: "template-gratitude-journal",
        order: 4,
        heading: "How are you feeling right now?",
        questionText: "Current Mood",
        description: "Rate your overall mood",
        answerType: "single-choice",
        options: [
          "Excellent",
          "Good",
          "Neutral",
          "Could be better",
          "Not great",
        ],
        mandatory: false,
        showDescription: true,
        aiFollowUp: false,
      },
      {
        id: "gj-6",
        formId: "template-gratitude-journal",
        order: 5,
        heading: "What can you improve tomorrow?",
        questionText: "Growth",
        description: "Set an intention for tomorrow",
        answerType: "textarea",
        mandatory: false,
        showDescription: true,
        aiFollowUp: false,
      },
    ],
  },

  "Event Registration": {
    id: "template-event-registration",
    title: "Event Registration Form",
    description: "Register for our upcoming event",
    questions: [
      {
        id: "er-1",
        formId: "template-event-registration",
        order: 0,
        heading: "What's your full name?",
        questionText: "Full Name",
        description: "First and last name",
        answerType: "text",
        mandatory: true,
        showDescription: true,
        aiFollowUp: false,
      },
      {
        id: "er-2",
        formId: "template-event-registration",
        order: 1,
        heading: "Your email address",
        questionText: "Email",
        description: "We'll send event details to this email",
        answerType: "email",
        mandatory: true,
        showDescription: true,
        aiFollowUp: false,
      },
      {
        id: "er-3",
        formId: "template-event-registration",
        order: 2,
        heading: "Phone number",
        questionText: "Phone",
        description: "For event updates and emergencies",
        answerType: "text",
        mandatory: true,
        showDescription: true,
        aiFollowUp: false,
      },
      {
        id: "er-4",
        formId: "template-event-registration",
        order: 3,
        heading: "How many tickets do you need?",
        questionText: "Number of Attendees",
        description: "Including yourself",
        answerType: "number",
        mandatory: true,
        showDescription: true,
        aiFollowUp: false,
      },
      {
        id: "er-5",
        formId: "template-event-registration",
        order: 4,
        heading: "Which ticket type?",
        questionText: "Ticket Type",
        description: "Select your preferred ticket",
        answerType: "single-choice",
        options: [
          "General Admission - $25",
          "VIP - $50",
          "Student - $15",
          "Group (5+) - $20 per person",
        ],
        mandatory: true,
        showDescription: true,
        aiFollowUp: false,
      },
      {
        id: "er-6",
        formId: "template-event-registration",
        order: 5,
        heading: "Any dietary restrictions?",
        questionText: "Dietary Requirements",
        description: "We want to accommodate everyone",
        answerType: "multiple-choice",
        options: [
          "None",
          "Vegetarian",
          "Vegan",
          "Gluten-free",
          "Nut allergy",
          "Other (please specify in comments)",
        ],
        mandatory: false,
        showDescription: true,
        aiFollowUp: false,
      },
      {
        id: "er-7",
        formId: "template-event-registration",
        order: 6,
        heading: "T-shirt size",
        questionText: "T-Shirt Size",
        description: "Everyone gets a free event t-shirt!",
        answerType: "single-choice",
        options: ["XS", "S", "M", "L", "XL", "XXL"],
        mandatory: false,
        showDescription: true,
        aiFollowUp: false,
      },
      {
        id: "er-8",
        formId: "template-event-registration",
        order: 7,
        heading: "Additional comments or questions?",
        questionText: "Comments",
        description: "Anything else we should know?",
        answerType: "textarea",
        mandatory: false,
        showDescription: true,
        aiFollowUp: false,
      },
    ],
  },
};

export function generatePromptSentence(chipText) {
  return `Create a form for ${chipText}`;
}

export function matchPromptToTemplate(promptText) {
  if (!promptText || typeof promptText !== "string") return null;

  const normalizedPrompt = promptText.toLowerCase().trim();

  for (const [key, template] of Object.entries(FORM_TEMPLATES)) {
    const normalizedKey = key.toLowerCase();

    if (normalizedPrompt.includes(normalizedKey)) {
      return {
        templateKey: key,
        ...template,
      };
    }
  }

  return null;
}

export function getFormTemplateById(id) {
  if (!id) return null;

  for (const [key, template] of Object.entries(FORM_TEMPLATES)) {
    if (template.id === id) {
      return {
        templateKey: key,
        ...template,
      };
    }
  }

  return null;
}
