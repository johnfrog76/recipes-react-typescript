import React, { useContext, useState, useEffect } from 'react';
import { Formik, FieldArray, Form, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import SelectOptionField from '../../components/atoms/select-option-field/select-option-field.component';
import RecipeTextField from '../../components/atoms/text-field/text-field.component';
import CheckBoxField from '../../components/atoms/checkbox-field/checkbox-field.component';
import FormButton, { FormButtons } from '../../components/atoms/form-button/form-button.component';
import { RecipesContext } from '../../providers/recipes/recipes.provider';
import { AuthContext } from '../../providers/auth/auth.provider';
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
    StyledFieldArrayEmptyButton,
    StyledAccordionContent
} from './add-recipe-form.styles';
import { iRecipe, iRecipeComment } from '../../interfaces/recipe/recipe.interface';
import { addRecipe } from '../../services/recipes/recipes.services';
import AccordionToggle from '../../components/atoms/accordion-toggle/accordion-toggle.component';
import { CategoriesContext } from '../../providers/categories/categories.provider';

interface iKeyValuePair {
    id: string;
    name: string;
}

interface Values {
    _id?: string;
    user_id: string;
    r_name: string;
    cat_id: string;
    shared: boolean;
    rating: number;
    category?: string;
    ingredients?: string[];
    steps?: string[];
    comments?: iRecipeComment[];
}

const AddRecipeForm = () => {
    const { addToast } = useToasts();
    const { token, user } = useContext(AuthContext);
    const { recipeItems, setCount, addRecipeToList } = useContext(RecipesContext);
    const { categoryItems } = useContext(CategoriesContext);
    const [catData, setCatData] = useState<iKeyValuePair[]>([]);
    const [currentRecipeItems, setCurrentRecipeItems] = useState<iRecipe[]>(recipeItems);
    const [isOpenIngredients, setIsOpenIngredients] = useState<boolean>(true);
    const [isOpenSteps, setIsOpenSteps] = useState<boolean>(true);
    const [isOpenComments, setIsOpenComments] = useState<boolean>(true);

    const handleToggleIngredients = () => {
        setIsOpenIngredients(!isOpenIngredients);
    };

    const handleToggleSteps = () => {
        setIsOpenSteps(!isOpenSteps);
    };

    const handleToggleComments = () => {
        setIsOpenComments(!isOpenComments);
    };

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
    };

    useEffect(() => {
        const data = categoryItems.map(c => {
            return {
                name: c.name,
                id: c._id
            }
        });
        setCatData(data);
    }, [categoryItems]);



    return (
        <StyledFormWrapper>
            <Formik
                initialValues={formValuesInitial}
                onSubmit={(
                    values: Values,
                    { setSubmitting }: FormikHelpers<Values>
                ) => {

                    const catName = catData.find(i => i.id === values.cat_id);
                    const cat_id = values.cat_id;
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
                            required={true}
                            defaultOptionText="Select Recipe Category"
                            optionData={catData}
                        />

                        <SelectOptionField
                            as="select"
                            id="rating"
                            name="rating"
                            label="Rating"
                            required={true}
                            defaultOptionText="Ex: Four Stars"
                            optionData={[
                                { id: '1', name: 'One Star' },
                                { id: '2', name: 'Two Stars' },
                                { id: '3', name: 'Three Stars' },
                                { id: '4', name: 'Four Stars' }
                            ]}
                        />

                        <CheckBoxField
                            id="shared"
                            name="shared"
                            label="Share Recipe"
                        />

                        <div>
                            <FieldArray
                                name="ingredients"
                                render={arrayHelpers => (
                                    <div>
                                        {values.ingredients && values.ingredients.length > 0 ? (
                                            <React.Fragment>
                                                <AccordionToggle
                                                    buttonText='Ingredients'
                                                    isOpen={isOpenIngredients}
                                                    toggleHandler={() => handleToggleIngredients()}
                                                />
                                                <StyledAccordionContent Collapsed={!isOpenIngredients ? 'collapsed' : 'expanded'}> {
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
                                                }
                                                </StyledAccordionContent>
                                            </React.Fragment>
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
                                            <React.Fragment>
                                                <AccordionToggle
                                                    buttonText='Steps'
                                                    isOpen={isOpenSteps}
                                                    toggleHandler={() => handleToggleSteps()}
                                                />
                                                <StyledAccordionContent Collapsed={isOpenSteps ? 'expanded' : 'collapsed'}>
                                                    {
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
                                                    }
                                                </StyledAccordionContent>
                                            </React.Fragment>
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
                                            <React.Fragment>
                                                <AccordionToggle
                                                    buttonText='Comments'
                                                    isOpen={isOpenComments}
                                                    toggleHandler={() => handleToggleComments()}
                                                />
                                                <StyledAccordionContent Collapsed={isOpenComments ? 'expanded' : 'collapsed'}>
                                                    {
                                                        values.comments.map((item, index) => (

                                                            <StyledInputWrapper key={index}>
                                                                <StyledLabel Required={'required'}>Comment {index + 1}</StyledLabel>
                                                                <FieldArrayItem>
                                                                    <StyledInput type="hidden" name={`comments.${index}.user`} />
                                                                    <StyledInput type="hidden" name={`comments.${index}.userId`} />
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
                                                                                index, { user: user?.name, comment: '', userId: user?.userId }
                                                                            )}
                                                                        >
                                                                            +
                                                                        </StyledAddInputBtn>
                                                                    </InputButtonsWrap>
                                                                </FieldArrayItem>
                                                            </StyledInputWrapper>
                                                        ))
                                                    }
                                                </StyledAccordionContent>
                                            </React.Fragment>
                                        ) : (
                                            <StyledFieldArrayEmptyButton
                                                type="button"
                                                onClick={() => arrayHelpers.push({ user: user?.name, comment: '', userId: user?.userId })
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
