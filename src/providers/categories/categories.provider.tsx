import React, { FC, createContext, useState, useEffect } from 'react';

import { iRecipeCategory } from '../../interfaces/category/category.interface';
import { getCategories } from '../../services/categories/categories.services';

type CategoryContextType = {
    categoryItems: iRecipeCategory[];
    isLoading: boolean;
    setCategoryItems: (recipes: iRecipeCategory[]) => void;
}

export const CategoriesContext = createContext<CategoryContextType>({
    categoryItems: [],
    isLoading: true,
    setCategoryItems: ([]) => []
});

interface Props {
    children?: React.ReactNode;
}

const CategoriesProvider: FC<Props> = ({ children }) => {
    const [categoryItems, setCategoryItems] = useState<iRecipeCategory[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        if (isLoading) {
            setIsLoading(false);
            getCategories().then((resp) => {
                if (resp) {
                    setCategoryItems(resp);
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [isLoading]);

    return (
        <CategoriesContext.Provider value={{
            isLoading,
            categoryItems,
            setCategoryItems
        }}>{children}</CategoriesContext.Provider>
    )
}

export default CategoriesProvider;