const DEFAULT_PROJECT_IMAGE =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop";

const HOME_PROJECT_YEARS = ["2023", "2024", "2025", "2026"] as const;
const HOME_PROJECT_TYPES = [
  "Systems & Web",
  "Thesis & Research",
  "Mobile App",
] as const;

export type HomeProjectTab = "All" | (typeof HOME_PROJECT_TYPES)[number];

type RawProject = {
  _id?: string;
  title: string;
  description: string;
  category?: string;
  image?: string;
  demoLink?: string;
  createdAt?: number;
  year?: string | number | null;
};

export type HomeProjectCard = {
  type: (typeof HOME_PROJECT_TYPES)[number];
  tag: "WEB" | "THESIS" | "MOBILE";
  title: string;
  desc: string;
  image: string;
  link: string;
  year: string;
};

function normalizeCategory(category?: string) {
  const value = category?.toLowerCase() ?? "";

  // Exact match shortcuts for the three main categories
  if (value === "thesis systems" || value.includes("thesis")) {
    return {
      type: "Thesis & Research" as const,
      tag: "THESIS" as const,
    };
  }

  if (value === "mobile" || value.includes("mobile")) {
    return {
      type: "Mobile App" as const,
      tag: "MOBILE" as const,
    };
  }

  // Web catches "Web", "web", "Systems & Web", etc.
  return {
    type: "Systems & Web" as const,
    tag: "WEB" as const,
  };
}

function seededShuffle<T>(array: T[], seed: number): T[] {
  const result = [...array];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0; // LCG
    const j = s % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function hashSeed(value: string) {
  let hash = 0;

  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }

  return hash;
}

function getProjectYear(project: RawProject) {
  if (project.year !== undefined && project.year !== null && project.year !== "") {
    return String(project.year);
  }

  const seed = `${project._id ?? project.title}-${project.createdAt ?? 0}-${project.category ?? ""}`;
  return HOME_PROJECT_YEARS[hashSeed(seed) % HOME_PROJECT_YEARS.length];
}

function toHomeProjectCard(project: RawProject): HomeProjectCard {
  const { type, tag } = normalizeCategory(project.category);

  return {
    type,
    tag,
    title: project.title,
    desc: project.description,
    image: project.image || DEFAULT_PROJECT_IMAGE,
    link: project.demoLink || "/projects",
    year: getProjectYear(project),
  };
}

function mixProjectsByCategory(projects: HomeProjectCard[]) {
  const buckets = new Map(
    HOME_PROJECT_TYPES.map((type) => [type, projects.filter((project) => project.type === type)]),
  );
  const mixedProjects: HomeProjectCard[] = [];
  let hasRemainingProjects = true;

  while (hasRemainingProjects) {
    hasRemainingProjects = false;

    for (const type of HOME_PROJECT_TYPES) {
      const project = buckets.get(type)?.shift();

      if (!project) {
        continue;
      }

      mixedProjects.push(project);
      hasRemainingProjects = true;
    }
  }

  return mixedProjects;
}

export function getHomeProjectDisplay(
  projects: RawProject[],
  activeTab: HomeProjectTab,
  limit = 6,
) {
  const mappedProjects = projects.map(toHomeProjectCard);

  if (activeTab === "All") {
    // Seed by current time >> 16 so shuffle changes roughly every ~1 minute
    // while staying stable within a single render cycle
    return seededShuffle(mappedProjects, Date.now() >>> 16).slice(0, limit);
  }

  return mappedProjects.filter((project) => project.type === activeTab).slice(0, limit);
}
