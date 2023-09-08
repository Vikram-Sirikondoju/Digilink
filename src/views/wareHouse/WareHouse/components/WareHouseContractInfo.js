import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Upload,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'

export const statusOptions = [
    { label: 'Married', value: 'M' },
    { label: 'Widowed', value: 'W' },
    { label: 'Separated', value: 'S' },
    { label: 'Divorced', value: 'D' },
    { label: 'Single ', value: 'S' },
]
const genderOptions = [
    { label: 'Airtel Inc.', value: 'M' },
    { label: 'Airtel Inc.', value: 'F' },
    { label: 'Airtel India', value: 'O' },
]


const WareHouseContractInfo = (props) => {


    return (
        <>

            <h3 className="mx-4 mb-4 mt-2">CONTRACT INFO</h3>

            <Formik
                initialValues={{}}
               
                validationSchema={{}}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)

                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className="md:grid grid-cols-4 gap-4 mx-4">
                                    <FormItem
                                        label="Contract Type"
                                        invalid={
                                            errors.gender && touched.gender
                                        }
                                        errorMessage={errors.gender}
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
                                        label="File Upload"
                                    >
                                        <Upload />
                                    </FormItem>
                                    <FormItem
                                        label="Signed Date"

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
                                        label="Enforcement Date"

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
                                        label="Termination date"

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
                                        label="Contract Status"
                                        invalid={
                                            errors.gender && touched.gender
                                        }
                                        errorMessage={errors.gender}
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
                                </div>

                            </FormContainer>
                            
                        </Form>
                    )
                }}
            </Formik>


        </>
    )
}

export default WareHouseContractInfo
