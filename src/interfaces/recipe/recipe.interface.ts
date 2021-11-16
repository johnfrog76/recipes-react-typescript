export interface iRecipe {
    id: number;
    user_id: number;
    r_name: string;
    cat_id: number;
    shared: boolean;
    rating: number;
    category: string;
    ingredients?: string[];
    steps?: string[];
    comments?: {
        comment: string;
        user: string;
    }[];
}