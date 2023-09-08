// CreateNewTemplate

import React from 'react'
import RichTextEditor from 'components/shared/RichTextEditor'
import {
    Input,
    Button,
    FormItem,
    FormContainer,
    Select,
    Radio,
} from 'components/ui'

import { Field, Form, Formik } from 'formik'
import { Link } from 'react-router-dom'
import { Upload } from 'components/ui'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { useState } from 'react'
import { AdaptableCard } from 'components/shared'

function SendNotification() {


    const [multiDropDown, setMultiDropDown] = useState()

    function handleSelect(data) {
        setMultiDropDown(data);
    }

    const formFieldsType = [
        { label: 'Text Field', value: 'TF' },
        { label: 'Text Area', value: 'TA' },
        { label: 'Drop Down', value: 'DD' },
        { label: 'Radio Button', value: 'RB' },
        { label: 'Check Boxes', value: 'CB' },
        { label: 'CK Editor', value: 'CK' },
    ]
    const onCheck = (value, field, form) => {
        form.setFieldValue(field.name, value)
    }

    const optionList = [
        { value: "Tag1", label: "Tag1" },
        { value: "Tag2", label: "Tag2" },
        { value: "tag3", label: "tag3" },
        { value: "Tag4", label: "Tag4" },
        { value: "Tag5", label: "Tag5" }
    ];

    return (
        <>
            <div>Setings / Notification / Send Notifications</div>
            <div className='mt-5'>
                <h3>Send Notifications</h3>





                {/* form table start here  */}

                <div>

                    <Formik
                        initialValues={{}}

                        validationSchema={{}}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(true)

                        }}
                    >
                        {({ values, touched, errors, isSubmitting }) => {
                            return (
                                <>

                                        <Form>
                                    <div style={{ backgroundColor: "#f5f5f5", padding: "15px", marginTop: "18px" }}>
                                            <FormContainer>
                                            <AdaptableCard className="h-full p-4" bodyClass="h-full" divider>
                                                    <label className='ml-2'>Notification Type</label>
                                                    <div className='grid grid-cols-3 mt-2 ml-1'>
                                                        <div>
                                                            <Radio.Group>
                                                                <Radio value="default" style={{ height: "25px", width: "25px" }}>SMS</Radio>
                                                                <Radio value="optional" style={{ height: "25px", width: "25px", marginLeft: "20px" }}>Email</Radio>
                                                                <Radio value="optional" style={{ height: "25px", width: "25px", marginLeft: "20px" }}>Push</Radio>

                                                            </Radio.Group>
                                                        </div>
                                                        <div style={{ marginLeft: "10%" }}>
                                                            <FormItem
                                                                label="Customer Type"
                                                            >
                                                                <Field name="customerType">
                                                                    {({ field, form }) => (
                                                                        <Select
                                                                            placeholder="Enterprise Customer"
                                                                            field={field}
                                                                            form={form}
                                                                        />
                                                                    )}
                                                                </Field>
                                                            </FormItem>
                                                        </div>


                                                    </div>
                                                    <div className='grid grid-cols-3 mt-2 ml-1'>
                                                        <div>
                                                            <FormItem
                                                                label="Select Template"
                                                            >
                                                                <Field name="customerType">
                                                                    {({ field, form }) => (
                                                                        <Select
                                                                            placeholder="Notification ABC"
                                                                            field={field}
                                                                            form={form}
                                                                        />
                                                                    )}
                                                                </Field>
                                                            </FormItem>
                                                        </div>
                                                        <div style={{ marginLeft: "10%" }}>
                                                            <FormItem
                                                                label="Customer Category"
                                                            >
                                                                <Field name="customerType">
                                                                    {({ field, form }) => (
                                                                        <Select
                                                                            placeholder="Category 1"
                                                                            field={field}
                                                                            form={form}

                                                                        />
                                                                    )}
                                                                </Field>
                                                            </FormItem>
                                                        </div>


                                                    </div>
                                                    <div>
                                                        <h6>Preview</h6>
                                                        {/* <p>Text Sent Rs.<<>>from<<Account id>>to<<date>>.</></p>
                                                        <p>Ref no <<XXXXXXX>> Click on <<ABC.com>> for any queries</p> */}
                                                        
                                                    </div>
                                                </AdaptableCard>
                                            </FormContainer>
                                            </div>
                                            <div className="mt-4 text-right">
                                                    <Link
                                                        className="block lg:inline-block md:mb-0 mb-4"
                                                        // to="/masterDataMenu-item-view-1"
                                                        to="/settings-menu-notifications"
                                                    >
                                                        <Button
                                                            className="mx-2"
                                                            style={{
                                                                backgroundColor: "#4D4D4D",
                                                                fontStyle: 'normal',
                                                                fontSize: '18px'
                                                            }}
                                                            variant="solid"
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </Link>
                                                    <Link
                                                        className="block lg:inline-block md:mb-0 mb-4"
                                                    // to="/masterDataMenu-item-view-1"
                                                    // to="/settings-menu-notifications"
                                                    >
                                                    <Button variant="solid" style={{
                                                                fontStyle: 'normal',
                                                                fontSize: '18px'
                                                            }}>
                                                            Send
                                                        </Button>
                                                    </Link>
                                            </div>
                                        
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

export default SendNotification