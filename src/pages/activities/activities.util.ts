
import dateFormat, { masks } from "dateformat";

import {iRecipe} from '../../interfaces/recipe/recipe.interface';
import { iActivity, ActivityTypeEnum, ActivityActionsEnum } from '../../interfaces/activity/activity.interface';

const formattedTime = (timestamp: string):string => {
    const d = new Date(timestamp);
    return dateFormat(d, "dddd, mmmm dS, yyyy, h:MM:ss TT");
};

const numericTime = (timestamp: string): number => {
    return new Date(timestamp).getTime();
};


export const fetchFilterValues = (filter: string, activitesList: iActivity[]): iActivity[] => {
    let filterRange: number = Infinity;

    switch (filter) {
        case 'dayOne':
            // timeago rounds to next unit;
            filterRange = 1000 * 60 * 60 * 47;
            break;
        case 'weekOne':
            filterRange = 1000 * 60 * 60 * 24 * 7;
            break;
        case '30days':
            filterRange = 1000 * 60 * 60 * 24 * 30;
            break;
    }

    const now = new Date().getTime();

    const tempList: iActivity[] = activitesList.filter(a =>
        a.timeNum && (a.timeNum > now - filterRange)
    );

    return tempList;
}

export const getRecentActivities = (userId: string, recipes: iRecipe[]):iActivity[] => {
    const ret:iActivity[] = [];

    if (!userId) return ret;

    for (let i = 0; i < recipes.length; i++) {
        const item = recipes[i];

        // your added recipe
        if (item.user_id === userId) {
            if (item.createdAt) {
                ret.push({
                    type: ActivityTypeEnum.Recipe,
                    description: ActivityActionsEnum.YouRecipe,
                    recipeName: item.r_name,
                    recipeId: item._id,
                    createdAt: item.createdAt,
                    timeFormatted: formattedTime(item.createdAt),
                    timeNum: numericTime(item.createdAt)
                });
            }


            if (item.favorites) {
                // other user favorites YOUR recipe
                const hasItems = item.favorites.some(fav => fav.userId !== userId);
                if (hasItems) {
                    item.favorites.filter(fav => fav.userId !== userId).forEach(fav => {
                        if (fav.createdAt) {
                            ret.push({
                                type: ActivityTypeEnum.Favorite,
                                description: ActivityActionsEnum.OtherFavorite,
                                recipeName: item.r_name,
                                recipeId: item._id,
                                createdAt: fav.createdAt,
                                timeFormatted: formattedTime(fav.createdAt),
                                timeNum: numericTime(fav.createdAt)
                            })
                        }
                    })
                }
            }

            if (item.comments) {
                // other user commented on YOUR recipe
                const hasItems = item.comments.some(c => c.userId !== userId);
                item.comments.filter(c => c.userId !== userId).forEach(c => {
                    if (c.createdAt) {
                        ret.push({
                            type: ActivityTypeEnum.Comment,
                            description: ActivityActionsEnum.OtherComment,
                            recipeName: item.r_name,
                            recipeId: item._id,
                            createdAt: c.createdAt,
                            timeFormatted: formattedTime(c.createdAt),
                            timeNum: numericTime(c.createdAt)
                        })
                    }
                })
            }
        }


        if (item.favorites) {
            // your favorite on ANY recipe
            const hasItems = item.favorites.some(fav => fav.userId === userId);
            if (hasItems) {
                item.favorites.filter(fav => fav.userId === userId).forEach(fav => {
                    if (fav.createdAt) {
                        ret.push({
                            type: ActivityTypeEnum.Favorite,
                            description: ActivityActionsEnum.YouFavorite,
                            recipeName: item.r_name,
                            recipeId: item._id,
                            createdAt: fav.createdAt,
                            timeFormatted: formattedTime(fav.createdAt),
                            timeNum: numericTime(fav.createdAt)
                        })
                    }
                })
            }
        }

        if (item.comments) {
            // your comments on ANY recipe
            const hasItems = item.comments.some(c => c.userId === userId);
            item.comments.filter(c => c.userId === userId).forEach(c => {
                if (c.createdAt) {
                    ret.push({
                        type: ActivityTypeEnum.Comment,
                        description: ActivityActionsEnum.YouComment,
                        recipeName: item.r_name,
                        recipeId: item._id,
                        createdAt: c.createdAt,
                        timeFormatted: formattedTime(c.createdAt),
                        timeNum: numericTime(c.createdAt)
                    })
                }
            })
        }
    }

    return ret.sort((a,b) => {
        if (a.timeNum && b.timeNum) {
            return b.timeNum - a.timeNum;
        } else {
            return 0;
        }
    });
};