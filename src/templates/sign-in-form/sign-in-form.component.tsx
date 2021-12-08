import react, { useContext } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { UserContext } from '../../providers/user/user.provider';
import RecipeTextField from '../../components/atoms/text-field/text-field.component';
import FormButton, { FormButtons } from '../../components/atoms/form-button/form-button.component';
import { StyledFormWrapper, StyledHRule } from './sign-in-form.styles';
import { logInUser } from '../../services/user/user.services';

interface Values {
    email: string;
    password: string;
}

const SignInForm = () => {
    const { addToast } = useToasts();
    const navigate = useNavigate();
    const { setLogin, setUserToken, setUserObject } = useContext(UserContext)

    const formValuesInitial = {
        email: '',
        password: ''
    }

    return (
        <StyledFormWrapper>
            <Formik
                initialValues={formValuesInitial}
                onSubmit={(
                    values: Values,
                    { setSubmitting }: FormikHelpers<Values>
                ) => {
                    const { email, password } = values;
                    logInUser({ email, password }).then((resp) => {
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
                            buttonText={'Sign In'}
                            FormButton={FormButtons.Primary}
                            disabled={!dirty || !isValid}
                        />
                    </Form>
                )}

            </Formik>
        </StyledFormWrapper>
    )
};

export default SignInForm;