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
import { useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi'

const taxComponentsOptions = [
    { label: 'Tax 1', value: '1' },
    { label: 'Tax 2', value: '2' },
    { label: 'Tax 3', value: '3' },
]

const initialValues = {
    taxNo: '',
    taxPercentage: '',
}

const TaxComponents = (props) => {
    const [taxNo, setTaxNo] = useState()

    const TaxComponent = () => {
        return (
            <>
                <div className="flex">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(true)
                        }}
                    >
                        {({ values, touched, errors, isSubmitting }) => {
                            return (
                                <Form>
                                    <FormContainer>
                                        <div className="md:grid grid-cols-4 gap-4 mx-4">
                                            <FormItem label="Tax Components">
                                                <Field name="taxNo">
                                                    {({ field, form }) => (
                                                        <Select
                                                            placeholder="Select Tax"
                                                            field={field}
                                                            form={form}
                                                            options={
                                                                taxComponentsOptions
                                                            }
                                                            value={taxComponentsOptions.filter(
                                                                (label) =>
                                                                    label.value ===
                                                                    values.taxNo
                                                            )}
                                                            onChange={(label) =>
                                                                form.setFieldValue(
                                                                    field.name,
                                                                    label.value
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </Field>
                                            </FormItem>
                                            <FormItem label="Enter Tax Percentage(%)">
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="taxPercentage"
                                                    placeholder="Enter Tax Percentage"
                                                    component={Input}
                                                />
                                            </FormItem>
                                        </div>
                                    </FormContainer>
                                </Form>
                            )
                        }}
                    </Formik>
                    <Button className='mx-4 mt-8 border-red-500'
                        shape="circle"
                        size="md"
                        icon={<HiMinus />}
                        onClick={''}
                    />
                    <Button className='mt-8 border-cyan-500'
                        shape="circle"
                        size="md"
                        icon={<HiPlus />}
                        onClick={''}
                    />
                </div>
            </>
        )
    }

    return (
        <>
            <h3 className="mx-4 mb-4 mt-2">TAX COMPONENTS</h3>
            <TaxComponent />
            <TaxComponent />
            {/* <Formik
                initialValues={taxNo}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className="md:grid grid-cols-4 gap-4 mx-4">
                                    <FormItem label="Tax Components">
                                        <Field name="taxNo">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder=""
                                                    field={field}
                                                    form={form}
                                                    options={taxComponentsOptions}
                                                    value={taxComponentsOptions.filter(
                                                        (label) =>
                                                            label.value ===
                                                            taxNo
                                                    )}
                                                    onChange={(label) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            label.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem label="Enter Tax Percentage(%)">
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="lastName"
                                            placeholder="Enter Email ID"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik> */}
        </>
    )
}

export default TaxComponents
