import React, { useContext, useState, useEffect } from 'react';
import { Formik, FieldArray, Form, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';

import SelectOptionField from '../../atoms/select-option-field/select-option-field.component';
import RecipeTextField from '../../atoms/text-field/text-field.component';
import { RecipesContext } from '../../../providers/recipes/recipes.provider';
import {
    StyledFormWrapper,
    StyledAddInputBtn,
    StyledSubtractInputBtn,
    StyledInputWrapper,
    StyledInput,
    StyledLabel,
    InputButtonsWrap,
    FieldArrayItem,
    StyledPrimaryButton,
    StyledHRule,
    StyledFieldArrayEmptyButton
} from './add-recipe-form.styles';
import { iRecipe } from '../../../interfaces/recipe/recipe.interface';

interface iKeyValuePair {
    id: string;
    name: string;
}

interface Values {
    id?: number;
    user_id: number;
    r_name: string;
    cat_id?: string;
    shared: boolean;
    rating: number;
    category?: string;
    ingredients?: string[];
    steps?: string[];
    comments?: {
        comment: string;
        user: string;
    }[];
}

const createNumericId = (): number => {
    let d = new Date();
    return d.getTime();
}

const AddRecipeForm = () => {

    const { recipeItems, getCategoryTags, addRecipeToList } = useContext(RecipesContext);
    const [catData, setCatData] = useState<iKeyValuePair[]>([]);
    const [currentRecipeItems, setCurrentRecipeItems] = useState<iRecipe[]>(recipeItems);
    let navigate = useNavigate();
    const formValuesInitial = {
        user_id: 1,
        r_name: '',
        shared: false,
        rating: 0,
        cat_id: '',
        category: '',
        ingredients: [''],
        steps: [''],
        comments: []
    }

    useEffect(() => {
        const uniques = getCategoryTags(recipeItems);
        const data = uniques.map((item: iRecipe) => {
            const { cat_id, category } = item;
            const strId = String(cat_id);
            return { id: strId, name: category }
        });
        setCatData(data);
    }, [recipeItems]);

    return (
        <StyledFormWrapper>
            <Formik
                initialValues={formValuesInitial}
                onSubmit={(
                    values: Values,
                    { setSubmitting }: FormikHelpers<Values>
                ) => {

                    const catName = catData.find(i => i.id === values.cat_id);
                    const cat_id = Number(values.cat_id);
                    const vals = {
                        ...values,
                        category: catName?.name || '',
                        cat_id: cat_id,
                        id: createNumericId()
                    }

                    setTimeout(() => {
                        //alert(JSON.stringify(vals, null, 2));
                        setSubmitting(false);
                        setCurrentRecipeItems(addRecipeToList(currentRecipeItems, vals));
                        navigate('/')

                    }, 500);
                }}
            >
                {({ values, resetForm }) => (
                    <Form>

                        <RecipeTextField
                            id="r_name"
                            label="Recipe Name"
                            name="r_name"
                            placeholder="Ex: Chocolate Cake"
                            required
                        />

                        <SelectOptionField
                            as="select"
                            id="cat_id"
                            name="cat_id"
                            label="Category"
                            defaultOptionText="Select Recipe Category"
                            optionData={catData}
                        />

                        <SelectOptionField
                            as="select"
                            id="rating"
                            name="rating"
                            label="Rating"
                            defaultOptionText="Ex: Four Stars"
                            optionData={[
                                { id: '1', name: 'One Star' },
                                { id: '2', name: 'Two Stars' },
                                { id: '3', name: 'Three Stars' },
                                { id: '4', name: 'Four Stars' }
                            ]}
                        />


                        <div>
                            <FieldArray
                                name="ingredients"
                                render={arrayHelpers => (
                                    <div>
                                        {values.ingredients && values.ingredients.length > 0 ? (
                                            values.ingredients.map((item, index) => (
                                                <StyledInputWrapper key={index}>
                                                    <StyledLabel Required={'required'}>Ingredient {index + 1}</StyledLabel>
                                                    <FieldArrayItem>
                                                        <StyledInput required name={`ingredients.${index}`} placeholder="Ex: 1 cup milk" />
                                                        <InputButtonsWrap>
                                                            <StyledSubtractInputBtn
                                                                type="button"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            >
                                                                -
                                                            </StyledSubtractInputBtn>
                                                            <StyledAddInputBtn
                                                                type="button"
                                                                onClick={() => arrayHelpers.insert(index, '')}
                                                            >
                                                                +
                                                            </StyledAddInputBtn>
                                                        </InputButtonsWrap>
                                                    </FieldArrayItem>
                                                </StyledInputWrapper>
                                            ))
                                        ) : (
                                            <StyledFieldArrayEmptyButton type="button" onClick={() => arrayHelpers.push('')}>
                                                Add Ingredients
                                            </StyledFieldArrayEmptyButton>
                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        <div>
                            <FieldArray
                                name="steps"
                                render={arrayHelpers => (
                                    <div>
                                        {values.steps && values.steps.length > 0 ? (
                                            values.steps.map((item, index) => (
                                                <StyledInputWrapper key={index}>
                                                    <StyledLabel Required={'required'}>Step {index + 1}</StyledLabel>
                                                    <FieldArrayItem>
                                                        <StyledInput name={`steps.${index}`} placeholder="Add step" />
                                                        <InputButtonsWrap>
                                                            <StyledSubtractInputBtn
                                                                type="button"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            >
                                                                -
                                                            </StyledSubtractInputBtn>
                                                            <StyledAddInputBtn
                                                                type="button"
                                                                onClick={() => arrayHelpers.insert(index, '')}
                                                            >
                                                                +
                                                            </StyledAddInputBtn>
                                                        </InputButtonsWrap>
                                                    </FieldArrayItem>
                                                </StyledInputWrapper>
                                            ))
                                        ) : (
                                            <StyledFieldArrayEmptyButton type="button" onClick={() => arrayHelpers.push('')}>
                                                Add Steps
                                            </StyledFieldArrayEmptyButton>
                                        )}
                                    </div>
                                )}
                            />
                        </div>
                        <StyledHRule />
                        <StyledPrimaryButton type="submit">Add Recipe</StyledPrimaryButton>
                    </Form>

                )}
            </Formik>
        </StyledFormWrapper >
    );
}

export default AddRecipeForm;
