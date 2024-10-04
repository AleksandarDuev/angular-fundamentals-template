export interface Course {
    id: string;
    title: string;
    description: string;
    creationDate: Date;
    duration: number;
    authors: string[];
}

export interface Author {
    name: string;
    id: string;
}

export interface User {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}
