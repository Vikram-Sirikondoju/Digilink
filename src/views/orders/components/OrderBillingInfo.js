import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Checkbox
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { Upload } from 'components/ui'

const onCheck = (value, field, form) => {
    form.setFieldValue(field.name, value)
}
const OrderSettlementInfo = (props) => {


    return (
        <>

            <h3 className="mx-4 mb-4 mt-2">BILLING INFO</h3>

            <Formik
                initialValues={{}}

                validationSchema={{}}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)

                }}
            >
                {({ values, touched, errors, isSubmitting, setFieldValue }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className="md:grid grid-cols-3 gap-4 mx-4">
                                    <FormItem
                                        label="Contains Billing Centre"
                                    >
                                        <Field name="sameCorrespondenceAddress">
                                            {({ field, form }) => (
                                                <Checkbox
                                                    checked={
                                                        values.sameCorrespondenceAddress
                                                    }
                                                    onChange={(val) =>
                                                        onCheck(
                                                            val,
                                                            field,
                                                            form,
                                                            setFieldValue
                                                        )
                                                    }
                                                >

                                                </Checkbox>
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        label="End Point URL"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="firstName"
                                            placeholder="End Point URL"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Upload CSV"

                                    >
                                        <Upload />
                                    </FormItem>


                                </div>
                                <div className="md:grid grid-cols-4 gap-4 mx-4">
                                    <FormItem
                                        label="SFTP Address or URL"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="firstName"
                                            placeholder="Enter URL"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Port Number"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="lastName"
                                            placeholder="Enter Port Number"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="User Name"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="lastName"
                                            placeholder="Enter User Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Enter Password"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="lastName"
                                            placeholder="Enter Password"
                                            component={Input}
                                        />
                                    </FormItem>



                                </div>

                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>


        </>
    )
}

export default OrderSettlementInfo
