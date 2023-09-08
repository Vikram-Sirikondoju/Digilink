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


const genderOptions = [
    { label: 'Airtel Inc.', value: 'M' },
    { label: 'Airtel Inc.', value: 'F' },
    { label: 'Airtel India', value: 'O' },
]




const WareHouseSettlementInfo = (props) => {


    return (
        <>

        <h3 className="mx-4 mb-4 mt-2">SETTLEMENT INFO</h3>

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
                            <div className="md:grid grid-cols-4 gap-4 mx-4">
                                <FormItem
                                        label="Prefferd Settlement Type"
                                    >
                                        <Field name="gender">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select Type"
                                                    field={field}
                                                    form={form}
                                                    options={genderOptions}
                                                    value={genderOptions.filter(
                                                        (gender) =>
                                                            gender.value ===
                                                            values.gender
                                                    )}
                                                    onChange={(gender) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            gender.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                </FormItem>
                                <FormItem
                                        label="Settlement Cycle"
                                    >
                                        <Field name="gender">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select Cycle"
                                                    field={field}
                                                    form={form}
                                                    options={genderOptions}
                                                    value={genderOptions.filter(
                                                        (gender) =>
                                                            gender.value ===
                                                            values.gender
                                                    )}
                                                    onChange={(gender) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            gender.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                </FormItem>
                                <FormItem
                                        label="Settlement Date"
                                    >
                                        <Field name="dob" placeholder="Select Date">
                                            {({ field, form }) => (
                                                <DatePicker
                                                    field={field}
                                                    form={form}
                                                    value={field.value}
                                                    onChange={(date) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            date
                                                        )
                                                    }}
                                                />
                                            )}
                                        </Field>
                                </FormItem>
                                <FormItem
                                    label="Due Tenor (Days)"

                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="firstName"
                                        placeholder="End Tenor"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Bank Account Number"
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="firstName"
                                        placeholder="Enter Number"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Bank Name"
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="firstName"
                                        placeholder="Enter Bank Name"
                                        component={Input}
                                    />
                                </FormItem>

                                
                                <FormItem
                                    label="Branch Name"

                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="firstName"
                                        placeholder="Enter Branch Name"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="IFSC Code"

                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="lastName"
                                        placeholder="Enter Code"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="MICR Code"
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="lastName"
                                        placeholder="Enter Code"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Upload Cancelled Cheque"
                                >
                                    <Upload />
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

export default WareHouseSettlementInfo
