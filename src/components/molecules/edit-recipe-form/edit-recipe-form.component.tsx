import React, { useContext, useState, useEffect, FC } from 'react';
import { Formik, FieldArray, Form, FormikHelpers } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import SelectOptionField from '../../atoms/select-option-field/select-option-field.component';
import RecipeTextField from '../../atoms/text-field/text-field.component';
import FormButton, { FormButtons } from '../../atoms/form-button/form-button.component';
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
    StyledHRule,
    StyledFieldArrayEmptyButton
} from './edit-recipe-form.styles';
import { iRecipe } from '../../../interfaces/recipe/recipe.interface';

interface iKeyValuePair {
    id: string;
    name: string;
}

interface Props {
    recipeId: number;
}

interface Values {
    id?: number;
    user_id: number;
    user: string;
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

const EditRecipeForm: FC<Props> = ({ recipeId }) => {
    const { addToast } = useToasts();
    const { recipeItems, getCategoryTags, editRecipe } = useContext(RecipesContext);
    const [catData, setCatData] = useState<iKeyValuePair[]>([]);
    const [currentRecipeItems, setCurrentRecipeItems] = useState<iRecipe[]>(recipeItems);
    const [formValuesInitial, setFormValuesInitial] = useState<Values | undefined>(undefined);

    let navigate = useNavigate();

    useEffect(() => {
        const uniques = getCategoryTags(recipeItems);
        const data = uniques.map((item: iRecipe) => {
            const { cat_id, category } = item;
            const strId = String(cat_id);
            return { id: strId, name: category }
        });
        setCatData(data);

        const foundRecipe = recipeItems.find(r => r.id && r.id === recipeId);
        if (foundRecipe) {

            setFormValuesInitial({
                id: foundRecipe.id,
                user_id: foundRecipe.user_id,
                user: 'John',
                r_name: foundRecipe.r_name,
                shared: foundRecipe.shared,
                rating: foundRecipe.rating,
                cat_id: foundRecipe.cat_id.toString(),
                category: foundRecipe.category,
                ingredients: foundRecipe.ingredients,
                steps: foundRecipe.steps,
                comments: foundRecipe.comments
            })
        }

    }, [recipeItems]);

    return (
        <StyledFormWrapper>
            {
                formValuesInitial && (
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
                                cat_id: cat_id
                            }
                            setCurrentRecipeItems(editRecipe(currentRecipeItems, vals));

                            addToast(
                                'Success',
                                {
                                    appearance: 'success',
                                    autoDismiss: true
                                }
                            );
                            setTimeout(() => {
                                setSubmitting(false);
                                navigate('/')
                            }, 500);
                        }}
                    >
                        {({ values, resetForm, isValid, dirty }) => (
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
                                                                <StyledInput required name={`steps.${index}`} placeholder="Add step" />
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

                                <div>
                                    <FieldArray
                                        name="comments"
                                        render={arrayHelpers => (
                                            <div>
                                                {values.comments && values.comments.length > 0 ? (
                                                    values.comments.map((item, index) => (
                                                        <StyledInputWrapper key={index}>
                                                            <StyledLabel Required={'required'}>Comment {index + 1}</StyledLabel>
                                                            <FieldArrayItem>
                                                                <StyledInput type="hidden" name={`comments.${index}.user`} />
                                                                <StyledInput required name={`comments.${index}.comment`} placeholder="Add comment" />
                                                                <InputButtonsWrap>
                                                                    <StyledSubtractInputBtn
                                                                        type="button"
                                                                        onClick={() => arrayHelpers.remove(index)}
                                                                    >
                                                                        -
                                                                    </StyledSubtractInputBtn>
                                                                    <StyledAddInputBtn
                                                                        type="button"
                                                                        onClick={() => arrayHelpers.insert(index, { user: 'John', comment: '' })}
                                                                    >
                                                                        +
                                                                    </StyledAddInputBtn>
                                                                </InputButtonsWrap>
                                                            </FieldArrayItem>
                                                        </StyledInputWrapper>
                                                    ))
                                                ) : (
                                                    <StyledFieldArrayEmptyButton type="button" onClick={() => arrayHelpers.push({ user: 'John', comment: '' })}>
                                                        Add comment
                                                    </StyledFieldArrayEmptyButton>
                                                )}
                                            </div>
                                        )}
                                    />
                                </div>
                                <StyledHRule />
                                <FormButton
                                    type="submit"
                                    buttonText={'Update Recipe'}
                                    FormButton={FormButtons.Primary}
                                    disabled={!dirty || !isValid}
                                />
                                <FormButton
                                    type="button"
                                    buttonText={'Cancel'}
                                    FormButton={FormButtons.Secondary}
                                    onClick={() => navigate(`/recipes/${values.id}`)}
                                />
                            </Form>

                        )}
                    </Formik>
                )
            }
        </StyledFormWrapper >
    );
}

export default EditRecipeForm;
