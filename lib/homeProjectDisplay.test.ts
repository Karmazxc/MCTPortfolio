import * as assert from "node:assert/strict";

import { getHomeProjectDisplay } from "./homeProjectDisplay";

const projects = [
  {
    _id: "project_1",
    title: "Thesis Alpha",
    description: "First thesis project",
    category: "Thesis Systems",
    image: "",
    demoLink: "",
    createdAt: 10,
  },
  {
    _id: "project_2",
    title: "Thesis Beta",
    description: "Second thesis project",
    category: "Thesis Systems",
    image: "",
    demoLink: "",
    createdAt: 9,
  },
  {
    _id: "project_3",
    title: "Thesis Gamma",
    description: "Third thesis project",
    category: "Thesis Systems",
    image: "",
    demoLink: "",
    createdAt: 8,
  },
  {
    _id: "project_4",
    title: "Campus Portal",
    description: "Web portal",
    category: "Web",
    image: "",
    demoLink: "",
    createdAt: 7,
  },
  {
    _id: "project_5",
    title: "Mobile Tracker",
    description: "Mobile app",
    category: "Mobile",
    image: "",
    demoLink: "",
    createdAt: 6,
  },
  {
    _id: "project_6",
    title: "Operations Dashboard",
    description: "Web dashboard",
    category: "Web",
    image: "",
    demoLink: "",
    createdAt: 5,
  },
];

const allProjects = getHomeProjectDisplay(projects, "All", 6);
const systemsAndWebProjects = getHomeProjectDisplay(projects, "Systems & Web", 6);

assert.equal(allProjects.length, 6, "All tab should keep the homepage limit");
assert(
  allProjects.some((project) => project.type === "Systems & Web"),
  "All tab should jumble categories so web projects are still visible",
);
assert.notDeepEqual(
  allProjects.map((project) => project.title),
  projects.slice(0, 6).map((project) => project.title),
  "All tab should not keep the raw database order",
);
assert(
  allProjects.every((project) => ["2023", "2024", "2025", "2026"].includes(project.year)),
  "Homepage years should stay within the 2023-2026 range",
);
assert.deepEqual(
  systemsAndWebProjects.map((project) => project.title),
  ["Campus Portal", "Operations Dashboard"],
  "Systems & Web filter should search the full project list, not only the first slice",
);
