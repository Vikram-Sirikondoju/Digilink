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


const WarehouseUserInfo = (props) => {


    return (
        <>
            <h3 className="mx-4 mb-4 mt-2">USER INFO</h3>

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
                                        label="User Role"

                                    >
                                        <Field name="gender">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Super Admin"
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
                            <FormContainer>
                                <div className="md:grid grid-cols-4 gap-4 mx-4">
                                    <FormItem
                                        label="First Name"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="firstName"
                                            placeholder="Enter First Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Last Name"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="lastName"
                                            placeholder="Enter Last Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Email ID"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="Email ID"
                                            placeholder="Enter Email ID"
                                            component={Input}
                                        />
                                    </FormItem> 
                                    <FormItem
                                        label="Phone Number"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="phoneNumber"
                                            placeholder="Enter Phone Number"
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

export default WarehouseUserInfo
