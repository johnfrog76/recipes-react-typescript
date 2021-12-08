import React, { useContext, useState, useEffect } from 'react';
import { Formik, FieldArray, Form, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import SelectOptionField from '../../components/atoms/select-option-field/select-option-field.component';
import RecipeTextField from '../../components/atoms/text-field/text-field.component';
import FormButton, { FormButtons } from '../../components/atoms/form-button/form-button.component';
import { RecipesContext } from '../../providers/recipes/recipes.provider';
import { UserContext } from '../../providers/user/user.provider';
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
} from './add-recipe-form.styles';
import { iRecipe } from '../../interfaces/recipe/recipe.interface';
import { addRecipe } from '../../services/recipes/recipes.services';

interface iKeyValuePair {
    id: string;
    name: string;
}

interface Values {
    _id?: string;
    user_id: string;
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
    const { addToast } = useToasts();
    const { token, user } = useContext(UserContext);
    const { recipeItems, setCount, getCategoryTags, addRecipeToList } = useContext(RecipesContext);
    const [catData, setCatData] = useState<iKeyValuePair[]>([]);
    const [currentRecipeItems, setCurrentRecipeItems] = useState<iRecipe[]>(recipeItems);

    let navigate = useNavigate();
    const formValuesInitial = {
        user_id: user?.userId || '1',
        user: user ? user.name : 'none',
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
                        cat_id: cat_id
                    }

                    addRecipe(vals, token).then((resp) => {
                        setSubmitting(false);
                        setCurrentRecipeItems(addRecipeToList(currentRecipeItems, resp));
                        setCount(currentRecipeItems.length)
                        addToast(
                            'Success',
                            {
                                appearance: 'success',
                                autoDismiss: true
                            }
                        );
                        navigate('/')
                    }).catch((err) => {
                        addToast(
                            `Error: ${err.message}`,
                            {
                                appearance: 'error',
                                autoDismiss: false
                            }
                        );
                    })
                }}
            >
                {({ values, resetForm, dirty, isValid }) => (
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
                                                        <StyledInput name={`comments.${index}.comment`} placeholder="Add comment" />
                                                        <InputButtonsWrap>
                                                            <StyledSubtractInputBtn
                                                                type="button"
                                                                onClick={() => arrayHelpers.remove(index)}
                                                            >
                                                                -
                                                            </StyledSubtractInputBtn>
                                                            <StyledAddInputBtn
                                                                type="button"
                                                                onClick={() => arrayHelpers.insert(
                                                                    index, { user: user?.name, comment: '' }
                                                                )}
                                                            >
                                                                +
                                                            </StyledAddInputBtn>
                                                        </InputButtonsWrap>
                                                    </FieldArrayItem>
                                                </StyledInputWrapper>
                                            ))
                                        ) : (
                                            <StyledFieldArrayEmptyButton
                                                type="button"
                                                onClick={() => arrayHelpers.push({ user: user?.name, comment: '' })
                                                }>
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
                            buttonText={'Add Recipe'}
                            FormButton={FormButtons.Primary}
                            disabled={!dirty || !isValid}
                        />
                        <FormButton
                            type="button"
                            buttonText={'Cancel'}
                            FormButton={FormButtons.Secondary}
                            onClick={() => navigate(`/`)}
                            disabled={false}
                        />
                    </Form>

                )}
            </Formik>
        </StyledFormWrapper >
    );
}

export default AddRecipeForm;
