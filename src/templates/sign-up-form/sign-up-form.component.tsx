import React, { useContext, useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { AuthContext } from '../../providers/auth/auth.provider';
import { UsersContext } from '../../providers/users/users.provider';
import { iUserItem } from '../../interfaces/users/users.interface';
import RecipeTextField from '../../components/atoms/text-field/text-field.component';
import FormButton, { FormButtons } from '../../components/atoms/form-button/form-button.component';
import { StyledFormWrapper, StyledHRule } from './sign-up-form.styles';
import { signUpUser } from '../../services/auth/auth.services';

interface Values {
    email: string;
    password: string;
    name: string;
}

const SignUpForm = () => {
    const { addToast } = useToasts();
    const navigate = useNavigate();
    const { addUserItem, userItems } = useContext(UsersContext);
    const { setLogin, setUserToken, setUserObject, setUserExpiration, setUserAuth } = useContext(AuthContext);
    const [isVisible, setIsVisable] = useState(false);

    const formValuesInitial = {
        email: '',
        password: '',
        name: ''
    }

    const onVisibilityChange = () => {
        setIsVisable(!isVisible);
    };

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
                        const expires = new Date(new Date().getTime() + 1000 * 60 * 60);
                        const userToAdd: iUserItem = {
                            _id: userId,
                            id: userId,
                            email: email,
                            name: name
                        };
                        setUserToken(token);
                        setLogin(true);
                        setUserObject({ token, email, userId, name });
                        setUserExpiration(Number(expires));
                        setUserAuth(resp, Number(expires));
                        addUserItem(userToAdd, userItems);
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
                            type={isVisible ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            isVisible={isVisible}
                            onVisibilityChange={() => onVisibilityChange()}
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