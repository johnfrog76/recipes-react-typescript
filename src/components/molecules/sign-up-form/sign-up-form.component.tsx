import React, { useContext } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { UserContext } from '../../../providers/user/user.provider';
import RecipeTextField from '../../atoms/text-field/text-field.component';
import FormButton, { FormButtons } from '../../atoms/form-button/form-button.component';
import { StyledFormWrapper, StyledHRule } from './sign-up-form.styles';
import { signUpUser } from '../../../services/user/user.services';

interface Values {
    email: string;
    password: string;
    name: string;
}

const SignUpForm = () => {
    const { addToast } = useToasts();
    const navigate = useNavigate();
    const { setLogin, setUserToken, setUserObject } = useContext(UserContext)

    const formValuesInitial = {
        email: '',
        password: '',
        name: ''
    }

    return (
        <StyledFormWrapper>
            <Formik
                initialValues={formValuesInitial}
                onSubmit={(
                    values: Values,
                    { setSubmitting }: FormikHelpers<Values>
                ) => {
                    const { email, password, name } = values;
                    signUpUser({ email, password, name }).then((resp) => {
                        const { token, email, userId, name } = resp;
                        setUserToken(token);
                        setLogin(true);
                        setUserObject({ token, email, userId, name });
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
                    });
                }}
            >
                {({ values, resetForm, dirty, isValid }) => (
                    <Form>

                        <RecipeTextField
                            id="name"
                            label="Name"
                            name="name"
                            placeholder="Ex: John"
                            required
                        />

                        <RecipeTextField
                            id="email"
                            label="Email"
                            name="email"
                            placeholder="Email"
                            required
                        />

                        <RecipeTextField
                            id="password"
                            label="Password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                        />
                        <StyledHRule />
                        <FormButton
                            type="submit"
                            buttonText={'Sign Up'}
                            FormButton={FormButtons.Primary}
                            disabled={!dirty || !isValid}
                        />
                    </Form>
                )}

            </Formik>
        </StyledFormWrapper>
    )
};

export default SignUpForm;