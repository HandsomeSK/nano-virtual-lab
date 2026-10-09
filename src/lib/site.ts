export const site = {
  name: "Nano Virtual Lab",
  courseCode: "MECH6045",
  courseTitle: "Nanotechnology: Fundamentals and Applications",
  description:
    "An educational space for exploring nanotechnology, connecting ideas, and learning through virtual experiments. A MECH6045 project in development.",
};

export const sections = [
  {
    href: "/explore",
    title: "Explore",
    icon: "explore",
    label: "Build your understanding",
    description:
      "A space for clear explanations, visual learning, and connections between fundamental ideas.",
    planned: [
      "Guided concept introductions",
      "Visual explanations and learning activities",
      "A glossary of key terms",
    ],
  },
  {
    href: "/simulator",
    title: "Simulator",
    icon: "simulator",
    label: "Learn by experimenting",
    description:
      "A future workspace to adjust parameters, observe outcomes, and connect theory with practice.",
    planned: [
      "Interactive experiment controls",
      "Visualisation of model outputs",
      "Model assumptions and limitations",
    ],
  },
  {
    href: "/research",
    title: "Research",
    icon: "research",
    label: "Follow the evidence",
    description:
      "A home for selected literature, considered perspectives, and the evidence behind the science.",
    planned: [
      "Curated papers and reading notes",
      "References and source attribution",
      "Connections to real-world applications",
    ],
  },
] as const;

export const navigation = [
  { href: "/", title: "Home" },
  ...sections.map(({ href, title }) => ({ href, title })),
  { href: "/about", title: "About" },
];

export type LabSection = (typeof sections)[number];
