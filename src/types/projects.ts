export type ProjectJson = {
    name: string;
    description: string | null;
    lenguajes: string[];
    enlaceDemo: string;
    enlacePage: string;
    imagen: string;
    avatar: string;
};

export type Project = ProjectJson & {
    slug: string;
    level: number;
};