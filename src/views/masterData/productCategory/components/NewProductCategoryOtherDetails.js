import React, { useState } from 'react'
import { AdaptableCard } from 'components/shared'
import { FormItem, FormContainer, Upload } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { HiOutlineCloudUpload } from 'react-icons/hi'

const NewProductCategoryOtherDetails = (props) => {
    return (
        <>
            <div className='p-2'>

                <AdaptableCard>
                    <h5 className="mb-4 mt-2 mx-4">Upload Image</h5>
                    <FormItem label="">

                        <Field name="upload">
                            {({ field, form }) => (
                                <div className='mx-4'>
                                    <Upload draggable className='border-blue-500 bg-blue-50 w-96 h-36'>
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
                                </div>
                            )}
                        </Field>
                    </FormItem>
                </AdaptableCard>
            </div>
        </>
    )
}
export default NewProductCategoryOtherDetails
