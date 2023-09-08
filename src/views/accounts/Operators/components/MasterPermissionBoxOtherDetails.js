import React from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem, FormContainer } from 'components/ui'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
// import { Link } from 'react-router-dom'


export default function MasterPermissionBoxOtherDetails() {

    const masterValidationSchema = Yup.object().shape({
       
        //userRole: Yup.string().required('Please Enter Role'),
       
    })

 

    return (
        <>


            <div className="mt-6  bg-gray-50 dark:bg-gray-700 rounded ">
                <div className="bg-gray-50 p-5">

                    <AdaptableCard className="h-full" bodyClass="h-full" divider>

                        <Formik
                            initialValues={{}}
                            validationSchema={masterValidationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(true)

                            }}
                        >
                            {({ values, touched, errors, isSubmitting }) => {
                                return (
                                    <Form>
                                        <FormContainer>
                                            <div className="md:grid gap-4 mx-4">
                                                <FormItem
                                                     label={<p>User Role Title <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                
                                                >
                                                    <Field
                                                        type="text"
                                                        autoComplete="off"
                                                        name="userRole"
                                                        placeholder="Enter Role"
                                                        component={Input}
                                                        style={{ width: "40%" }}
                                                    />
                                                </FormItem>
                                                <FormItem
                                                    label="Description"
                                                >
                                                    <RichTextEditor style={{ width: "60%" }}
                                                    ></RichTextEditor>
                                                </FormItem>

                                            </div>
                                        </FormContainer>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </AdaptableCard>

                </div>
            </div>
            
        </>
    )
}
