import React, { useState } from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { FormItem, FormContainer, Upload, Input } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { HiOutlineCloudUpload } from 'react-icons/hi'

const ItemUploadFiles = (props) => {
    return (
        <>
            <div className="pl-5 "  style={{ backgroundColor: "#f5f5f5" }}>
                <div className=' mb-4 pb-2'>

                    <Formik
                    // initialValues={props.itemIntials.varientDetails}
                    // // validationSchema={}
                    // // innerRef={refId}
                    // onSubmit={(values, { setSubmitting }) => {

                    //     setSubmitting(true)
                    //     let dataToStore = props.itemIntials
                    //     dataToStore.varientDetails = values
                    //     props.setItemInitials(dataToStore)

                    //     props.setStep(props.step + 1)
                    // }}
                    >
                        {({ values, touched, errors, isSubmitting }) => {
                            return (
                                <>
                                    <Form>
                                        <FormContainer>
                                            {/* <div className='bg-gray-100'> */}
                                            <div className='card mr-5 pt-4'>

                                                <div className="md:grid grid-cols-4 gap-3 mx-4 card ">
                                                    <FormItem label="Variant Title">
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="itemTitle"
                                                            placeholder="Enter Variant Title"
                                                            component={Input}
                                                        />
                                                    </FormItem>

                                                    <FormItem label="Variant Price">
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="variantID"
                                                            placeholder="Enter Variant ID"
                                                            component={Input}
                                                        />
                                                    </FormItem>

                                                    <FormItem label="Validity">
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="itemActualPrice"
                                                            placeholder="Enter Variant Price"
                                                            component={Input}
                                                        />
                                                    </FormItem>


                                                </div>
                                                <div style={{ width: "70%" }} className="p-4">
                                                    <FormItem label="Feature List">
                                                        <RichTextEditor />
                                                    </FormItem>
                                                </div>

                                                {/* upload image start here */}

                                                <div className="md:grid grid-cols-1 gap-3 mx-4  ">
                                                    <AdaptableCard>
                                                        <h6 className="mx-4 mb-4 mt-2">Upload Images</h6>
                                                        <Upload draggable className='border-blue-500 bg-blue-50 w-1/3 h-40'>
                                                            <div className="my-10 text-center">
                                                                <div className="text-6xl mb-4 flex justify-center">
                                                                    <HiOutlineCloudUpload className="h-10" style={{ color: "#2563eb" }} />
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
                                                        {/* </div> */}
                                                    </AdaptableCard>
                                                </div>

                                            </div>


                                            {/* 2nd div starrt here  */}



                                            <div className='card mr-5 pt-4 mt-6 mb-4 '>


                                                <div className="md:grid grid-cols-4 gap-3 mx-4 pt-4 ">
                                                    <FormItem label="Variant Title">
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="itemTitle"
                                                            placeholder="Enter Variant Title"
                                                            component={Input}
                                                        />
                                                    </FormItem>

                                                    <FormItem label="Monthly Price">
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="variantID"
                                                            placeholder="Enter Variant ID"
                                                            component={Input}
                                                        />
                                                    </FormItem>




                                                </div>
                                                <div className='grid grid-cols-2 p-4'>
                                                    <FormItem label="Short Description">
                                                        <Field className=" h-28"
                                                            type="text"
                                                            autoComplete="off"
                                                            name="itemActualPrice"
                                                            placeholder=""
                                                            component={Input}
                                                        />
                                                    </FormItem></div>
                                                <div style={{ width: "70%" }} className="p-4">
                                                    <FormItem label="Feature List">
                                                        <RichTextEditor />
                                                    </FormItem>
                                                </div>

                                                {/* upload image start here */}

                                                <div className="md:grid grid-cols-1 gap-3 mx-4  ">
                                                    <AdaptableCard>
                                                        <h6 className="mx-4 mb-4 mt-2">Upload Images</h6>
                                                        <Upload draggable className='border-blue-500 bg-blue-50 w-1/3 h-40'>
                                                            <div className="my-10 text-center">
                                                                <div className="text-6xl mb-4 flex justify-center">
                                                                    <HiOutlineCloudUpload className="h-10" style={{ color: "#2563eb" }} />
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
                                                        
                                                    </AdaptableCard>
                                                </div>

                                            </div>


                                            



                                        </FormContainer>
                                    </Form>


                                </>
                            )
                        }}
                    </Formik>
                </div>


            </div>
        </>
    )
}
export default ItemUploadFiles
