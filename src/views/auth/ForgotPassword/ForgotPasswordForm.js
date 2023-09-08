import React, { useEffect, useState } from 'react'
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui'
import { ActionLink } from 'components/shared'
import { apiForgotPassword } from 'services/AuthService'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { APP_NAME } from 'constants/app.constant'
import { useNavigate } from 'react-router-dom'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile'

const validationSchema = Yup.object().shape({
    email: Yup.string().required('Please enter your registered email id'),
})

const ForgotPasswordForm = (props) => {
    const navigate = useNavigate()
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    

    const [response, setResponse] = useState('')


    const [message, setMessage] = useTimeOutMessage()

    const onSendMail = async (values, setSubmitting) => {
      
        setSubmitting(true)
        
       
            let body = {           
                user_id: values.email,            
            }
            
            const resp = await apiForgotPassword(body)
          

            
            if (resp.status === 'success') {
                setTimeout(async () => {
                  setSubmitting(false);
                  console.log(resp.data.data.response); 
                  OpenNotification('success', 'Successfully Submitted');
                  setResponse(resp.data.data.response); 
                 
                 
                }, 2000);
              }

            if (resp.status === 'failed') {
               
                setMessage(GetErrorMsg(resp))
                setSubmitting(false);
            }
     
    }

    useEffect(() => {
        if (response) {
            
          navigate('/changePassword', { state: { data: response } });
        }
      }, [response]);


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
                        email: ' ',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        if (!disableSubmit) {
                            onSendMail(values, setSubmitting)
                        } else {
                            setSubmitting(false)
                        }
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
                                        label="Email ID"
                                        invalid={errors.email && touched.email}
                                        errorMessage={errors.email}
                                    >
                                        <Field
                                            type="email"
                                            autoComplete="off"
                                            name="email"
                                            placeholder="Enter Email Id"
                                            component={Input}
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
           {/* </div> */}

        </>
    )
}

export default ForgotPasswordForm
