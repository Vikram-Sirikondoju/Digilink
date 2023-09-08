import React, { useState } from 'react'
import { AdaptableCard } from 'components/shared'
import { FormItem, FormContainer, Upload } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { HiOutlineCloudUpload } from 'react-icons/hi'

const ItemUploadFiles = (props) => {
    return (
        <>
            <div className="bg-gray-50">
                <div className="md:grid grid-cols-1 gap-4 ">
                    <AdaptableCard>
                        <h5 className="mb-4 mt-2 mx-4">UPLOAD IMAGES</h5>
                        <Formik
                            initialValues={{}}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(true)
                            }}
                        >
                            {({
                                values,
                                touched,
                                errors,
                                isSubmitting,
                                setFieldValue,
                            }) => {
                                return (
                                    <Form>
                                        <FormContainer>
                                            <div className="md:grid grid-cols-2 gap-4">
                                                <FormItem label="">
                                                <div className='mx-4'>
                                                    <Upload draggable className='border-blue-500 bg-blue-50 w-96 h-36'>
                                                        <div className="my-10 text-center">
                                                            <div className="text-6xl mb-4 flex justify-center">
                                                                <HiOutlineCloudUpload className="h-10" style={{color : "#2563eb"}}/>
                                                            </div>
                                                            <p className="font-semibold">
                                                                <span className="text-gray-800 dark:text-white">
                                                                    Upload Files Here or{' '}
                                                                </span>
                                                                <span className="text-blue-500">
                                                                    browse
                                                                </span>
                                                            </p>
                                                            <p className="mt-1 opacity-60 dark:text-white">
                                                                JPG/PNG are allowed 
                                                            </p>
                                                        </div>
                                                    </Upload>
                                                </div>
                                                </FormItem>

                                                {/* <FormItem label="Incorporation certificate">
                                                    <Upload />
                                                </FormItem>
                                                <FormItem label="Tax Registration Certificate">
                                                    <Upload />
                                                </FormItem> */}
                                            </div>
                                        </FormContainer>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </AdaptableCard>
                    {!props.noNeed && (
                        <AdaptableCard>
                            <h3 className=" mb-4 mt-2">ADDITIONAL FILES</h3>
                            <Formik
                                initialValues={{}}
                                onSubmit={(values, { setSubmitting }) => {
                                    setSubmitting(true)
                                }}
                            >
                                {({
                                    values,
                                    touched,
                                    errors,
                                    isSubmitting,
                                    setFieldValue,
                                }) => {
                                    return (
                                        <Form>
                                            <FormContainer>
                                                <div className="md:grid grid-cols-2 gap-4 mx-4">
                                                    <FormItem label="File Upload-1">
                                                        <Upload />
                                                    </FormItem>

                                                    <FormItem label="File Upload-2">
                                                        <Upload />
                                                    </FormItem>
                                                </div>
                                            </FormContainer>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </AdaptableCard>
                    )}
                </div>
            </div>
        </>
    )
}
export default ItemUploadFiles
