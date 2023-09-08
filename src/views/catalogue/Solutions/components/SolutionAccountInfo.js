import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { useSelector } from 'react-redux'

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


const SolutionAccountInfo = (props) => {

    const dateFormat = useSelector((state) => state.locale.dateFormat)

    return (
        <>

            <h3 className="mx-4 mb-4 mt-2">ACCOUNT INFO</h3>

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
                                        label="Item ID"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="firstName"
                                            placeholder="Item ID"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Item Title"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="lastName"
                                            placeholder="Enter Title"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Global Mno"
                                        invalid={
                                            errors.gender && touched.gender
                                        }
                                        errorMessage={errors.gender}
                                    >
                                        <Field name="gender">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Airtel Inc."
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
                                        label="Parent Account"

                                    >
                                        <Field name="gender">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Airtel Inc."
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
                                        label="Company Name"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="lastName"
                                            placeholder="Enter Company Name"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Incorporation Date"

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
                                                    maxDate={new Date()}
                                                    inputFormat= {dateFormat}
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        label="Tax ID"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="lastName"
                                            placeholder="Enter Tax ID"
                                            component={Input}
                                        />
                                    </FormItem>


                                    <FormItem
                                        label="Time zone"

                                    >
                                        <Field name="gender">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select Time zone"
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
                                        label="Currency"

                                    >
                                        <Field name="gender">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select Currency"
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
                                        label="Language"

                                    >
                                        <Field name="gender">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select Language"
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
                                        label="Display Orientation *"

                                    >
                                        <Field name="gender">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select Orientation"
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

export default SolutionAccountInfo
