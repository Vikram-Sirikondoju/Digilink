import React, { useState } from 'react'
import {
    AdaptableCard,
} from 'components/shared'
import {

    FormItem,
    FormContainer,

    Upload
} from 'components/ui'
import { Field, Form, Formik } from 'formik'



const TemplateUploadFiles = (props) => {

    return (
        <>
            <div className="md:grid grid-cols-2 gap-4 mx-4">
                <AdaptableCard>
                    <h3 className=" mb-4 mt-2">UPLOAD FILES</h3>
                    <Formik
                        initialValues={{}}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(true)

                        }}
                    >
                        {({ values, touched, errors, isSubmitting, setFieldValue }) => {
                            return (
                                <Form>
                                    <FormContainer>
                                        <div className="md:grid grid-cols-2 gap-4 mx-4">


                                            <FormItem
                                                label="Company Logo"

                                            >
                                                <Upload />
                                            </FormItem>

                                            <FormItem
                                                label="Incorporation certificate"

                                            >
                                                <Upload />
                                            </FormItem>
                                            <FormItem
                                                label="Tax Registration Certificate"

                                            >
                                                <Upload />
                                            </FormItem>


                                        </div>

                                    </FormContainer>
                                </Form>
                            )
                        }}
                    </Formik>
                </AdaptableCard>
                <AdaptableCard>
                    <h3 className=" mb-4 mt-2">ADDITIONAL FILES</h3>
                    <Formik
                        initialValues={{}}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(true)

                        }}
                    >
                        {({ values, touched, errors, isSubmitting, setFieldValue }) => {
                            return (
                                <Form>
                                    <FormContainer>
                                        <div className="md:grid grid-cols-2 gap-4 mx-4">


                                            <FormItem
                                                label="File Upload-1"

                                            >
                                                <Upload />
                                            </FormItem>

                                            <FormItem
                                                label="File Upload-2"

                                            >
                                                <Upload />
                                            </FormItem>



                                        </div>

                                    </FormContainer>
                                </Form>
                            )
                        }}
                    </Formik>
                </AdaptableCard>
            </div>
        </>
    )
}
export default TemplateUploadFiles
