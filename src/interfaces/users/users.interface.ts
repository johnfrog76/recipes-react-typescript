export interface iUserItem {
    _id: string;
    id: string;
    email: string;
    name: string;
    recipes?: string[];
    favorites?: {id: string; _id: string}[];
}