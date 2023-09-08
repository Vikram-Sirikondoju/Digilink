import React from 'react'
import { Formik, Form, Field } from 'formik';
import { Input, FormItem, FormContainer, Button,Alert } from 'components/ui';
import { Link } from 'react-router-dom'
import PasswordInput from './../../../components/shared/PasswordInput';
import * as Yup from 'yup'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { useSelector } from 'react-redux';
import { apiChangePassword } from 'services/AuthService';
const validationSchema = Yup.object().shape({
    password: Yup.string().required('Please enter your  current password'),
    newPassword: Yup.string().required('Please enter your password'),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('newPassword'), null],
        'Your passwords do not match'
    ),
})


const Password = () => {
    const {email } = useSelector(
        (state) => state.auth.user
    )
    const [message, setMessage] = useTimeOutMessage()


    const saveChangePassword = async (values,{resetForm,setSubmitting }) => {

          setSubmitting(true)
        const body = {
            old_password: values.password,
            new_password: values.newPassword,
            confirm_password:values.confirmPassword,
            user_id:email
        };
      
         const resp = await apiChangePassword(body);
         if (resp.status === 'success') {
             setTimeout(() => {
                 OpenNotification('success', 'SuccessFully Updated ')
                 resetForm()
             }, 2000)
            
         }

         if (resp.status === 'failed') {
             setMessage(GetErrorMsg(resp))
         }
    }
    return (
        <>
   {message && (
            <Alert className="mb-4" type="danger" showIcon>
                {Array.isArray(message) ? message.join(", ") : message}
            </Alert>
        )}
            <div>

                <Formik
                    initialValues={{
                        password: '',
                        newPassword: '',
                        confirmPassword: '',
                    }}

                    validationSchema={validationSchema}
                    // onSubmit={(values, { setSubmitting }) => {
                    //     setSubmitting(true)
                    //     saveChangePassword(values)

                    // }}
                    onSubmit={saveChangePassword}
                >
                    {({ values, touched, errors, isSubmitting, handleSubmit,resetForm  }) => {
                        return (
                            <>

                                {/* md:grid grid-cols-2 gap-4 mx-4 */}
                                <Form onSubmit={handleSubmit} >
                                    <FormContainer>
                                        <div style={{ backgroundColor: "#F5F5F5", padding: "15px 15px ", marginTop: "10px" }}>

                                            <div style={{ backgroundColor: "white", padding: "14px 14px", marginBelow: "10px" }}>

                                                <div className='md:grid grid-cols-4 gap-4 mx-4 '>
                                                    <FormItem
                                                        label="Current Password"
                                                        invalid={errors.password && touched.password}
                                                        errorMessage={errors.password}
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="password"
                                                            placeholder="Enter Your Current Password"
                                                            component={PasswordInput}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                        label="New Password"
                                                        invalid={errors.newPassword && touched.newPassword}
                                                        errorMessage={errors.newPassword}
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="newPassword"
                                                            placeholder="Enter Your New Password"
                                                            component={PasswordInput}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                        label="Confirm New Password"
                                                        invalid={errors.confirmPassword && touched.confirmPassword}
                                                        errorMessage={errors.confirmPassword}
                                                    >
                                                        <Field

                                                            type="text"
                                                            autoComplete="off"
                                                            name="confirmPassword"
                                                            placeholder="Confirm New Password"
                                                            component={PasswordInput}
                                                        />
                                                    </FormItem>


                                                </div>
                                            </div>
                                        </div>
                                    </FormContainer>
                                    <div className="mt-4 text-right">
                                        <>
                                            <Link
                                                className="block lg:inline-block md:mb-0 mb-4"
                                                to="">
                                                <Button
                                                    style={{ backgroundColor: "#4D4D4D" }}
                                                    className="mx-2"
                                                    variant="solid"
                                                    type="button"
                                                    onClick={resetForm}
                                                >
                                                    Reset
                                                </Button>
                                            </Link>
                                            {/* <Link


                                                className="block lg:inline-block md:mb-0 mb-4"
                                                to="views/Home"
                                                >


                                                <Button
                                                   
                                                    className="mx-2"
                                                    variant="solid"
                                                >
                                                    Save
                                                </Button>
                                            </Link> */}

                                            <Button
                                                className="mx-2"
                                                variant='solid'
                                                type="submit"
                                            >
                                                Save
                                            </Button>
                                        </>

                                    </div>

                                </Form>

                            </>
                        )
                    }}
                </Formik>

            </div>

        </>
    )
}

export default Password