export interface iRecipe {
    _id?: string | undefined;
    user_id: string;
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