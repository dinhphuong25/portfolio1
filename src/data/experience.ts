export interface ExperienceItem {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string | null;
    location: string;
    description: string;
    highlights: string[];
    tags: string[];
    logoColor: string;
    website: string;
}

export const experiences: ExperienceItem[] = [
    {
        id: "coinbase",
        company: "Coinbase",
        role: "Lead Product Designer",
        startDate: "May 2020",
        endDate: null,
        location: "San Francisco, CA (Remote)",
        description: "Leading design for the core trading experience. Shipped redesigned portfolio view used by 100M+ users.",
        highlights: [
            "Led redesign of portfolio dashboard, increasing user engagement by 40%",
            "Established design system used across 5 product teams",
            "Mentored 3 junior designers to senior roles",
        ],
        tags: ["Product Design", "Design Systems", "Leadership"],
        logoColor: "bg-blue-600",
        website: "https://coinbase.com",
    },
    {
        id: "intercom",
        company: "Intercom",
        role: "Product Designer",
        startDate: "Jan 2018",
        endDate: "May 2020",
        location: "Dublin, Ireland (Remote)",
        description: "Designed new messenger features and improved onboarding flows, increasing activation by 25%.",
        highlights: [
            "Redesigned messenger UI, improving CSAT scores by 15%",
            "Created onboarding flow that increased activation by 25%",
            "Collaborated with engineering on design system components",
        ],
        tags: ["UX Design", "B2B SaaS", "Research"],
        logoColor: "bg-blue-500",
        website: "https://intercom.com",
    },
    {
        id: "loom",
        company: "Loom",
        role: "User Researcher",
        startDate: "Mar 2017",
        endDate: "Jan 2018",
        location: "San Francisco, CA",
        description: "Conducted user research and usability testing to inform product decisions and improve UX.",
        highlights: [
            "Conducted 50+ user interviews and usability tests",
            "Developed research insights that shaped product roadmap",
            "Created user personas and journey maps",
        ],
        tags: ["User Research", "Usability Testing", "Analytics"],
        logoColor: "bg-purple-600",
        website: "https://loom.com",
    },
];

export function getExperienceById(id: string): ExperienceItem | undefined {
    return experiences.find((exp) => exp.id === id);
}

export function getCurrentRole(): ExperienceItem | undefined {
    return experiences.find((exp) => exp.endDate === null);
}
