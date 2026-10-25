export type ProjectJson = {
    name: string;
    description: string | null;
    lenguajes: string[];
    enlaceDemo: string;
    enlacePage: string;
    imgUserUrl: string;
    nameUserUrl: string;
};

export type Project = ProjectJson & {
    slug: string;
    level: number;
    prettyName: string;
};