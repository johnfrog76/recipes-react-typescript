import React, { useContext, useState, useEffect, FC } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useToasts } from 'react-toast-notifications';

import RecipeTextField from '../../components/atoms/text-field/text-field.component';
import FormButton, { FormButtons } from '../../components/atoms/form-button/form-button.component';
import { AuthContext } from '../../providers/auth/auth.provider';
import { StyledFormWrapper, StyledButtonToggle } from './add-comment.styles';
import { iRecipe } from '../../interfaces/recipe/recipe.interface';
import { addRecipeComment } from '../../services/recipes/recipes.services';

interface iKeyValuePair {
    id: string;
    name: string;
}

interface Props {
    recipeId?: string;
    handleSubmit: (recipe: iRecipe) => void;
}


interface Values {
    comment: string;
    user: string;
}

const AddCommentForm: FC<Props> = ({ recipeId, handleSubmit }) => {
    const { addToast } = useToasts();

    const { token, user } = useContext(AuthContext);

    const [formValuesInitial, setFormValuesInitial] = useState<Values | undefined>(undefined);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (user) {
            setFormValuesInitial({
                user: user.name,
                comment: ''
            })
        }
    }, [user, setFormValuesInitial]);

    const toggleForm = () => {
        setShowForm(!showForm);
    }


    return (
        <React.Fragment>
            <StyledButtonToggle onClick={() => toggleForm()}>Add Comment</StyledButtonToggle>
            {
                showForm && (
                    <StyledFormWrapper>
                        {
                            formValuesInitial && (
                                <Formik
                                    initialValues={formValuesInitial}
                                    onSubmit={(
                                        values: Values,
                                        { setSubmitting }: FormikHelpers<Values>
                                    ) => {
                                        addRecipeComment(values, recipeId || '', token).then((resp) => {
                                            setSubmitting(false);
                                            handleSubmit(resp);
                                            setShowForm(false);
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
                                    {({ values, resetForm, isValid, dirty }) => (
                                        <Form>

                                            <RecipeTextField
                                                id="comment"
                                                name="comment"
                                                placeholder="Add a comment"
                                                required
                                            />

                                            <FormButton
                                                type="submit"
                                                buttonText={'Ok'}
                                                FormButton={FormButtons.Primary}
                                                disabled={!dirty || !isValid}
                                            />
                                        </Form>

                                    )}
                                </Formik>
                            )
                        }
                    </StyledFormWrapper >
                )
            }
        </React.Fragment>
    );
}

export default AddCommentForm;
