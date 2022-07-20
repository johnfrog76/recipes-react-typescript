

export interface iRecipeComment {
    comment: string;
    user: string;
    userId?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface iFavoriteItem {
    userId: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface iRecipe {
    _id?: string | undefined;
    createdAt?: string;
    updatedAt?: string;
    user_id: string;
    r_name: string;
    cat_id: string;
    category: string;
    shared: boolean;
    rating: number;
    ingredients?: string[];
    steps?: string[];
    comments?: iRecipeComment[];
    favorites?: iFavoriteItem[];
}

export interface iRecipeCategory {
    _id: string;
    name: string;
    custom: boolean;
    userId?: string;
}