import React, { useEffect, useState } from 'react'
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui'
import { ActionLink, PasswordInput } from 'components/shared'
import { apiForgotPassword, apiResetPassword } from 'services/AuthService'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { APP_NAME } from 'constants/app.constant'
import { useLocation, useNavigate } from 'react-router'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile'

const validationSchema = Yup.object().shape({
    password: Yup.string().required('Please enter your password'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        "Passwords don't match"
    ),
    otp: Yup.string().required('Please enter the OTP')
})

const NewPasswordForm = (props) => {
    const navigate = useNavigate()

    const location = useLocation();
    const response = location.state?.data;
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props
    const [message, setMessage] = useTimeOutMessage()
    const [resetComplete, setResetComplete] = useState(false)


    const onSubmitOld = async (values, setSubmitting) => {

        setSubmitting(true)
        try {
            let body = {
                otp: "12345",
                reference_id: response,
                new_password: values?.password,
                confirm_password: values?.confirmPassword
            }
            const resp = await apiResetPassword(body)
            if (resp.data.success) {
                setSubmitting(false)
                setResetComplete(true)
                navigate('/sign-in')
            }
        } catch (errors) {
            setMessage(errors?.response?.data?.message || errors.toString())
            setSubmitting(false)
        }
    }

    const onSubmit = async (values) => {

        let body = {
            otp: values.otp,
            reference_id: response,
            new_password: values?.password,
            confirm_password: values?.confirmPassword
        }
        const resp = await apiResetPassword(body)

        if (resp.status === 'success') {
            setTimeout(async () => {
                setResetComplete(true)
                OpenNotification('success', 'Successfully Password Changed');
                navigate('/sign-in')


            }, 2000);
        }

        if (resp.status === 'failed') {

            setMessage(GetErrorMsg(resp))
        }


    }


    return (
        <>


            <div className={className} class="bg-white p-6" style={{
                padding: "24px 32px 48px", width: "560px", height: "", opacity: 0.9,
                borderRadius: "4px"
            }}>

                {message && (
                    <Alert className="mb-4" type="danger" showIcon>
                        {message}
                    </Alert>
                )}
                <Formik
                    initialValues={{
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(false)
                        onSubmit(values)
                    }}
                >
                    {({ touched, errors, isSubmitting }) => (
                        <Form>
                            <FormContainer>
                                <div className='grid justify-center gap-8 mb-3'>
                                    <p className='ml-16'>
                                        <img className='w-20'
                                            src={'/img/avatars/Primary Logo_Large.png'} />
                                    </p>
                                    <h4 className='font-bold text-2xl text-center'>Forgot Password</h4>
                                </div>
                                <FormItem
                                    label="Enter OTP"
                                    invalid={
                                        errors.otp
                                    }
                                    errorMessage={errors.otp}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="otp"
                                        placeholder="Enter OTP"
                                        component={Input}
                                    />
                                </FormItem>

                                <FormItem
                                    label="New Password"
                                    invalid={
                                        errors.password 
                                    }
                                    errorMessage={errors.password}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="password"
                                        placeholder="Enter New Password"
                                        component={PasswordInput}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Confirm Password"
                                    invalid={
                                        errors.confirmPassword 
                                    }
                                    errorMessage={errors.confirmPassword}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="confirmPassword"
                                        placeholder="Re-enter new Password"
                                        component={PasswordInput}
                                    />
                                </FormItem>

                                <Button
                                    block
                                    loading={isSubmitting}
                                    variant="solid"
                                    type="submit"
                                    placeholder="Enter your Email ID to reset password"
                                >
                                    {'Submit'}
                                </Button>


                                <div class="flex items-center py-3">
                                    <div class="flex-grow h-px bg-gray-400"></div>
                                    <span class="flex-shrink  text-black px-4">Or</span>
                                    <div class="flex-grow h-px bg-gray-400"></div>
                                </div>
                                <div className=" text-center">
                                    <p
                                        className='border-2 border-blue-400 text-blue-500  justify-center p-3 w-full font-bold h-11 rounded'
                                    >
                                        <ActionLink to={signInUrl} className='text-[#0080FF]'>Back To Sign In page</ActionLink>
                                    </p>

                                </div>

                            </FormContainer>
                        </Form>
                    )}
                </Formik>

            </div>


        </>
    )
}

export default NewPasswordForm
