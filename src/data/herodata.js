import baker from "../assets/images/baker.jpg";
import survey from "../assets/images/survey.jpg";
import party from "../assets/images/party.jpg";
import freelance from "../assets/images/freelance.jpg";

export const HERO_COPY = {
  headline: "Stunning, AI-Powered Forms in Seconds.",
  paragraph:
    "The free google form alternative you always deserved. From freelancers to big businesses — create stunning, interactive forms that boost engagement, capture better data, and deliver AI-driven insights.",
};

export const CTA = {
  primary: {
    label: "Try Demo Now",
    href: "https://app.nuraform.com/demo?ref=hero-banner",
  },
  secondary: { label: "See example →", href: "#" },
  tertiary: { label: "Get in touch →", href: "mailto:hello@nuraform.com" },
};

export const CAROUSEL_SLIDES = [
  { id: "baker", src: baker, alt: "Baker" },
  { id: "survey", src: survey, alt: "App Devs" },
  { id: "party", src: party, alt: "Host" },
  { id: "freelance", src: freelance, alt: "Freelancer" },
];

export const PROMPT_SUGGESTIONS = [
  "Create a client onboarding form…",
  "Create an event RSVP form…",
  "Create a customer feedback survey…",
];

export const BUBBLES = [
  { id: "b1", top: "-6%", left: "97%", size: 110, color: "#D964D9" },
  { id: "b2", top: "76%", left: "96%", size: 150, color: "#E555C6" },
  { id: "b3", top: "88%", left: "86%", size: 170, color: "#D5AEEF" },
  { id: "b4", top: "92%", left: "-2%", size: 90, color: "#5B3FE0" },
];

export const TIMINGS = {
  AUTOPLAY_DURATION: 4,
  TRANSITION_DURATION: 1.1,
  PROMPT_CYCLE_DURATION: 3,
  BUBBLE_FLOAT_DURATION: 7,
};
