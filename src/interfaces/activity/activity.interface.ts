
export enum ActivityTypeEnum {
    Recipe = 'Recipe',
    Favorite = 'Favorite',
    Comment = 'Comment'
}

export enum ActivityActionsEnum {
    YouRecipe = "you created a new recipe",
    YouFavorite = "you favorited this recipe",
    YouComment = "you commented on this recipe",
    OtherFavorite = "another user favorited your recipe",
    OtherComment = "another user commented on your recipe"
}

export interface iActivity {
    type: ActivityTypeEnum;
    recipeName?: string;
    recipeId?: String;
    createdAt?: string;
    timeNum?: number;
    timeFormatted?: string;
    description: ActivityActionsEnum;
}