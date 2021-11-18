import React from 'react';

import { Formik, FieldArray, Form, FormikHelpers } from 'formik';
import {
    StyledFormWrapper,
    StyledAddInputBtn,
    StyledSubtractInputBtn,
    StyledInputWrapper,
    StyledInput,
    StyledSelect,
    StyledLabel,
    InputButtonsWrap,
    FieldArrayItem,
    StyledPrimaryButton
} from './add-recipe-form.styles'
import RecipeTextField from '../../atoms/text-field/text-field.component';


interface Values {
    id?: number;
    user_id: number;
    r_name: string;
    cat_id?: number;
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

const createNumericId = (): number => {
    let d = new Date();
    return d.getTime();
}

const AddRecipeForm = () => (
    <StyledFormWrapper>
        <Formik
            initialValues={{
                user_id: 1,
                r_name: '',
                shared: false,
                rating: 0,
                cat_id: createNumericId(),
                category: '',
                ingredients: [''],
                steps: [''],
                comments: []
            }}
            onSubmit={(
                values: Values,
                { setSubmitting }: FormikHelpers<Values>
            ) => {
                setTimeout(() => {

                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 500);
            }}
        >
            {({ values }) => (
                <Form>

                    <RecipeTextField
                        id="r_name"
                        label="Recipe Name"
                        name="r_name"
                        placeholder="Chocolate Cake"
                        required
                    />

                    <RecipeTextField
                        id="category"
                        name="category"
                        placeholder="Category"
                        label="Recipe Category"
                    />

                    <StyledInputWrapper>
                        <StyledLabel htmlFor="lastName">Rating</StyledLabel>
                        <StyledSelect as="select" name="rating">
                            <option value="0">Select rating</option>
                            <option value="1">One star</option>
                            <option value="2">Two stars</option>
                            <option value="1">Three stars</option>
                            <option value="2">Four stars</option>
                        </StyledSelect>
                    </StyledInputWrapper>

                    <div>
                        <FieldArray
                            name="ingredients"
                            render={arrayHelpers => (
                                <div>
                                    {values.ingredients && values.ingredients.length > 0 ? (
                                        values.ingredients.map((item, index) => (
                                            <StyledInputWrapper key={index}>
                                                <StyledLabel>Ingredient {index + 1}</StyledLabel>
                                                <FieldArrayItem>
                                                    <StyledInput name={`ingredients.${index}`} placeholder="Ex: 1 cup milk" />
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
                                        <button type="button" onClick={() => arrayHelpers.push('')}>
                                            Add Ingredients
                                        </button>
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
                                                <StyledLabel>Step {index + 1}</StyledLabel>
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
                                        <button type="button" onClick={() => arrayHelpers.push('')}>
                                            Add Steps
                                        </button>
                                    )}
                                </div>
                            )}
                        />
                    </div>
                    <StyledPrimaryButton type="submit">Add Recipe</StyledPrimaryButton>
                </Form>

            )}
        </Formik>
    </StyledFormWrapper >
);

export default AddRecipeForm;
