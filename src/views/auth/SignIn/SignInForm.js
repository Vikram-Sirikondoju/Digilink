import React, { useEffect, useState } from 'react'
import Logo from 'components/template/Logo'
import {
    Input,
    Button,
    Checkbox,
    FormItem,
    FormContainer,
    Alert,
} from 'components/ui'
import { PasswordInput, ActionLink } from 'components/shared'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import useAuth from 'utils/hooks/useAuth'
import axios from 'axios'
import { setUser } from 'store/auth/userSlice'
import { useDispatch } from 'react-redux'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile'
import useDarkMode from 'utils/hooks/useDarkMode'
import useDirection from 'utils/hooks/useDirection'


const validationSchema = Yup.object().shape({
    usernameOrEmail: Yup.string().required('Please enter your user name'),
    password: Yup.string().required('Please enter your password'),
    rememberMe: Yup.bool(),
})

const SignInForm = (props) => {
    const dispatch = useDispatch()
    const [isDark, setIsDark] = useDarkMode()
    const [direction, updateDirection] = useDirection()

    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/forgot-password',
        signUpUrl = '/sign-up',
    } = props
    const [rememberMe, setRememberMe] = useState(false);
    const [message, setMessage] = useTimeOutMessage()
    const initialValues = {
        usernameOrEmail: '',
        password: '',
        enterAccount: '',
        rememberMe: rememberMe
    };

    useEffect(() => {
        setIsDark("light")
        updateDirection("LTR")
    },[])
    // usernameOrEmail: 'anil@getinfy.bom',
    // password: 'Gopi@12345',
    // enterAccount: 'OP83',
    // rememberMe: true,
    // const [initialValuesNew, setInitialValuesNew] = useState({
    //     usernameOrEmail: '',
    //     password: '',
    //     enterAccount: '',
    //     rememberMe: rememberMe
    // });
    const storedData = (localStorage && localStorage?.getItem('userData')) ? JSON.parse(localStorage?.getItem('userData')) : initialValues;


    const { signIn } = useAuth()

    const onSignIn = async (values, setSubmitting) => {

        if (values.rememberMe) {
            localStorage.setItem('userData', JSON.stringify(values));
        } else {
            localStorage.removeItem('userData');
        }
        const { usernameOrEmail, password, enterAccount } = values

        setSubmitting(true)



        let body = {
            unq_id: enterAccount,
            enterAccount: enterAccount,
            email: usernameOrEmail,
            password: password,
        }
        const result = await signIn(body)

        // dispatch(setUser(values))


        if (result.status === 'failed') {

            setMessage('Login failed. Invalid credentials.')

        }

        if (result.status === 'success') {

            setTimeout(() => {
                OpenNotification('success', 'Logged in successfully ')

            }, 1000)

        }

        setSubmitting(false)
    }

    return (
        <>
            <div className="">
                <div
                    className={className}
                    class="bg-white"
                    style={{
                        width: '560px',
                        height: '',
                        opacity: 0.9,
                        borderRadius: '4px',
                        padding: '15px 32px 20px 32px',
                    }}
                >
                    {message && (
                        <Alert className="mb-4" type="danger" showIcon>
                            {message}
                        </Alert>
                    )}
                    <Formik


                        initialValues={
                            storedData
                        }
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            if (!disableSubmit) {
                                onSignIn(values, setSubmitting)
                            } else {
                                setSubmitting(false)
                            }
                        }}
                    >
                        {({ touched, errors, isSubmitting, handleChange, setFieldValue }) => {

                            const handleRememberMeChange = (event) => {
                                const { checked } = event.target;
                                setFieldValue('rememberMe', checked);
                            }
                            return (
                                <Form>
                                    <FormContainer>
                                        <div className="grid justify-center gap-6 mb-2">
                                            <img
                                                className="w-20"
                                                src={
                                                    '/img/avatars/digilink.png'
                                                }
                                            />

                                            <h4 className="font-bold text-2xl">
                                                Log In
                                            </h4>
                                        </div>
                                        <FormItem label=" Account ID">
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="enterAccount"
                                                placeholder="Enter Account ID"
                                                component={Input}
                                            />
                                        </FormItem>
                                        <FormItem
                                            label="Email ID"
                                            invalid={
                                                errors.usernameOrEmail &&
                                                touched.usernameOrEmail
                                            }
                                            errorMessage={errors.usernameOrEmail}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="usernameOrEmail"
                                                placeholder="Enter Email ID"
                                                component={Input}
                                            />
                                        </FormItem>
                                        <FormItem
                                            label="Password"
                                            invalid={
                                                errors.password && touched.password
                                            }
                                            errorMessage={errors.password}
                                        >
                                            <Field
                                                autoComplete="off"
                                                name="password"
                                                placeholder="Enter Password"
                                                component={PasswordInput}
                                            />
                                        </FormItem>
                                        <div className="flex justify-between mb-6">
                                            <FormItem>

                                                <Field
                                                    className="mb-0 text-[#212121]"
                                                    name="rememberMe"
                                                    component={Checkbox}
                                                    children="Remember Me"
                                                    onChange={handleRememberMeChange}
                                                />
                                            </FormItem>
                                            <ActionLink
                                                variant="solid"
                                                to={forgotPasswordUrl}
                                            >
                                                Forgot Password?
                                            </ActionLink>
                                        </div>
                                        <Button
                                            variant="solid"
                                            block
                                            loading={isSubmitting}
                                            type="submit"
                                        >
                                            <p className="text-white">
                                                {isSubmitting
                                                    ? 'Signing in...'
                                                    : 'Sign In'}
                                            </p>
                                        </Button>

                                        <div class="flex items-center py-4">
                                            <div class="flex-grow h-px bg-gray-400"></div>
                                            <span class="flex-shrink  text-black px-4">
                                                Or
                                            </span>
                                            <div class="flex-grow h-px bg-gray-400"></div>
                                        </div>

                                        <div>
                                            <div
                                                className="border-2 border-blue-400 text-[#0080FF] font-bold flex justify-center gap-2 p-[6px] "
                                                block

                                            // variant=""
                                            // type="submit"
                                            >
                                                <span>
                                                    <img
                                                        src={
                                                            '/img/avatars/imagetriangle.png'
                                                        }
                                                    />
                                                </span>
                                                <p className="mt-1">
                                                    {' '}
                                                    Login With Airlinq
                                                </p>
                                            </div>
                                        </div>
                                    </FormContainer>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default SignInForm
