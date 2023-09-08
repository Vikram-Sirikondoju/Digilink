import React from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import {
    Input,
    FormItem,
    FormContainer,
    Select,
    DatePicker,
    Radio,
    Checkbox,
    Button,
} from 'components/ui'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import NumberFormatInput from 'react-number-format'
import { Link } from 'react-router-dom'

function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value)
}

const PercentageInput = (props) => {
    return <Input {...props} value={props.field.value} suffix="%" />
}
const PriceInput = (props) => {
    return <Input {...props} value={props.field.value} prefix="$" />
}
const FrequencyList = [
    { label: 'Daily', value: 'DAILY' },
    { label: 'Weekly', value: 'WEEKLY' },
    { label: 'Monthly', value: 'MONTHLY' },
    { label: 'Quarterly', value: 'QUARTERLY' },
    { label: 'Half-Yearly', value: 'HALFYEARLY' },
    { label: 'Yearly', value: 'YEARLY' },
]

export default function CreateOffers(props) {
    const { offerInitialValues, offerValidationSchema, handleFirstStepSubmit } =
        props
    const { customerCategories, productCategories } = useSelector(
        (state) => state.offerCashback.data
    )
    return (
        <>
            <Formik
                initialValues={offerInitialValues}
                validationSchema={offerValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    handleFirstStepSubmit(values)
                }}
            >
                {({ values, touched, errors, isSubmitting, handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <div className="mt-6 dark:bg-gray-700 rounded ">
                                <div
                                     className="mt-5"
                                    style={{ backgroundColor: 'white' }}
                                >
                                    <h3>Create Offer</h3>
                                    <div
                                        className="mt-6  rounded"
                                        style={{ backgroundColor: '#f5f5f5' }}
                                    >
                                        <div
                                            className=" p-5"
                                            style={{
                                                backgroundColor: '#F5F5F5',
                                            }}
                                        >
                                            <AdaptableCard
                                                className="h-full"
                                                bodyClass="h-full"
                                                divider
                                            >
                                                <FormContainer>
                                                    <div className="md:grid grid-cols-2 gap-6 mx-4 mt-3">
                                                        <FormItem
                                                            label={
                                                                <span>Offer Code  <span style={{color:'red'}}>{" *"}</span></span>
                                                            }
                                                            invalid={
                                                                errors.offr_code &&
                                                                touched.offr_code
                                                            }
                                                            errorMessage={
                                                                errors.offr_code
                                                            }
                                                        >
                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                name="offr_code"
                                                                placeholder="Enter Offer Code"
                                                                component={
                                                                    Input
                                                                }
                                                                style={{
                                                                    width: '100%',
                                                                }}
                                                            />
                                                        </FormItem>
                                                        <FormItem
                                                           label={
                                                            <span>Offer Title  <span style={{color:'red'}}>{" *"}</span></span>
                                                        }
                                                            invalid={
                                                                errors.offr_name &&
                                                                touched.offr_name
                                                            }
                                                            errorMessage={
                                                                errors.offr_name
                                                            }
                                                        >
                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                name="offr_name"
                                                                placeholder="Enter Offer Title"
                                                                component={
                                                                    Input
                                                                }
                                                                style={{
                                                                    width: '100%',
                                                                }}
                                                            />
                                                        </FormItem>
                                                        <div
                                                            className="md:grid grid-cols-2 gap-4"
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                        >
                                                            <FormItem
                                                             label={
                                                                <span>Start Date<span style={{color:'red'}}>{" *"}</span></span>
                                                            }
                                                                invalid={
                                                                    errors.offr_start_date &&
                                                                    touched.offr_start_date
                                                                }
                                                                errorMessage={
                                                                    errors.offr_start_date
                                                                }
                                                            >
                                                                <Field name="offr_start_date">
                                                                    {({
                                                                        field,
                                                                        form,
                                                                    }) => (
                                                                        <DatePicker
                                                                            placeholder="Select Date"
                                                                            field={
                                                                                field
                                                                            }
                                                                            form={
                                                                                form
                                                                            }
                                                                            value={
                                                                                field.value
                                                                                    ? new Date(
                                                                                          field.value
                                                                                      )
                                                                                    : field.value
                                                                            }
                                                                            onChange={(
                                                                                date
                                                                            ) => {
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
                                                                label={
                                                                    <span>End Date<span style={{color:'red'}}>{" *"}</span></span>
                                                                }
                                                                invalid={
                                                                    errors.offr_end_date &&
                                                                    touched.offr_end_date
                                                                }
                                                                errorMessage={
                                                                    errors.offr_end_date
                                                                }
                                                            >
                                                                <Field name="offr_end_date">
                                                                    {({
                                                                        field,
                                                                        form,
                                                                    }) => (
                                                                        <DatePicker
                                                                            placeholder="Select Date"
                                                                            field={
                                                                                field
                                                                            }
                                                                            form={
                                                                                form
                                                                            }
                                                                            value={
                                                                                field.value
                                                                                    ? new Date(
                                                                                          field.value
                                                                                      )
                                                                                    : field.value
                                                                            }
                                                                            onChange={(
                                                                                date
                                                                            ) => {
                                                                                form.setFieldValue(
                                                                                    field.name,
                                                                                    date
                                                                                )
                                                                            }}
                                                                        />
                                                                    )}
                                                                </Field>
                                                            </FormItem>
                                                        </div>
                                                        <FormItem
                                                            label="Max Allowed Usages"
                                                            invalid={
                                                                errors.offr_max_cpns_applcbl &&
                                                                touched.offr_max_cpns_applcbl
                                                            }
                                                            errorMessage={
                                                                errors.offr_max_cpns_applcbl
                                                            }
                                                        >
                                                            <Field
                                                                type="number"
                                                                autoComplete="off"
                                                                name="offr_max_cpns_applcbl"
                                                                placeholder="Enter Max Allowed Usages"
                                                                component={
                                                                    Input
                                                                }
                                                                style={{
                                                                    width: '100%',
                                                                }}
                                                            />
                                                        </FormItem>
                                                        <FormItem
                                                            label="Max Allowed Usages/customer"
                                                            invalid={
                                                                errors.offr_no_of_cpns &&
                                                                touched.offr_no_of_cpns
                                                            }
                                                            errorMessage={
                                                                errors.offr_no_of_cpns
                                                            }
                                                        >
                                                            <Field
                                                                type="number"
                                                                autoComplete="off"
                                                                name="offr_no_of_cpns"
                                                                placeholder="Enter Amount"
                                                                component={
                                                                    Input
                                                                }
                                                            />
                                                        </FormItem>
                                                        <FormItem
                                                          label={
                                                            <span>Frequency<span style={{color:'red'}}>{" *"}</span></span>
                                                        }
                                                            className="ml-2"
                                                            invalid={
                                                                errors.offr_timeperiod &&
                                                                touched.offr_timeperiod
                                                            }
                                                            errorMessage={
                                                                errors.offr_timeperiod
                                                            }
                                                        >
                                                            <Field name="offr_timeperiod">
                                                                {({
                                                                    field,
                                                                    form,
                                                                }) => (
                                                                    <Select
                                                                        placeholder="Select Frequency"
                                                                        field={
                                                                            field
                                                                        }
                                                                        form={
                                                                            form
                                                                        }
                                                                        options={
                                                                            FrequencyList
                                                                        }
                                                                        value={FrequencyList?.filter(
                                                                            (
                                                                                fq
                                                                            ) =>
                                                                                fq.value ===
                                                                                values.offr_timeperiod
                                                                        )}
                                                                        onChange={(
                                                                            fq
                                                                        ) =>
                                                                            form.setFieldValue(
                                                                                field.name,
                                                                                fq.value
                                                                            )
                                                                        }
                                                                    />
                                                                )}
                                                            </Field>
                                                        </FormItem>
                                                        <FormItem
                                                      label={
                                                        <span>Item Category<span style={{color:'red'}}>{" *"}</span></span>
                                                    }
                                                            invalid={
                                                                errors.rel_offr_prod_cat &&
                                                                touched.rel_offr_prod_cat
                                                            }
                                                            errorMessage={
                                                                errors.rel_offr_prod_cat
                                                            }
                                                        >
                                                            <Field name="rel_offr_prod_cat">
                                                                {({
                                                                    field,
                                                                    form,
                                                                }) => (
                                                                    <Select
                                                                        placeholder="Select Item Category"
                                                                        field={
                                                                            field
                                                                        }
                                                                        form={
                                                                            form
                                                                        }
                                                                        options={
                                                                            productCategories
                                                                        }
                                                                        value={productCategories?.filter(
                                                                            (
                                                                                fq
                                                                            ) =>
                                                                                fq.id ==
                                                                                values.rel_offr_prod_cat
                                                                        )}
                                                                        onChange={(
                                                                            fq
                                                                        ) =>
                                                                            form.setFieldValue(
                                                                                field.name,
                                                                                fq.id
                                                                            )
                                                                        }
                                                                    />
                                                                )}
                                                            </Field>
                                                        </FormItem>
                                                        <FormItem
                                                    label={
                                                        <span>Customer Category<span style={{color:'red'}}>{" *"}</span></span>
                                                    }
                                                            invalid={
                                                                errors.rel_offr_cust_cat &&
                                                                touched.rel_offr_cust_cat
                                                            }
                                                            errorMessage={
                                                                errors.rel_offr_cust_cat
                                                            }
                                                        >
                                                            <Field name="rel_offr_cust_cat">
                                                                {({
                                                                    field,
                                                                    form,
                                                                }) => (
                                                                    <Select
                                                                        placeholder="Select Customer Category"
                                                                        field={
                                                                            field
                                                                        }
                                                                        form={
                                                                            form
                                                                        }
                                                                        options={
                                                                            customerCategories
                                                                        }
                                                                        value={customerCategories?.filter(
                                                                            (
                                                                                pc
                                                                            ) =>
                                                                                pc.id ==
                                                                                values.rel_offr_cust_cat
                                                                        )}
                                                                        onChange={(
                                                                            pc
                                                                        ) => {
                                                                            form.setFieldValue(
                                                                                field.name,
                                                                                pc.id
                                                                            )

                                                                            const value =
                                                                                JSON.parse(
                                                                                    pc.cust_cat_type
                                                                                )
                                                                            getKeyByValue(
                                                                                value,
                                                                                true
                                                                            )
                                                                            form.setFieldValue(
                                                                                'cust_type',
                                                                                getKeyByValue(
                                                                                    value,
                                                                                    true
                                                                                )?.replace(
                                                                                    /_/g,
                                                                                    ''
                                                                                ) ||
                                                                                    'RetailCustomer'
                                                                            )
                                                                        }}
                                                                    />
                                                                )}
                                                            </Field>
                                                        </FormItem>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection:
                                                                    'column',
                                                            }}
                                                        >
                                                            <label className="mb-3">
                                                                Offer Type
                                                            </label>
                                                            <Field name="offr_type_fxd_amnt">
                                                                {({
                                                                    field,
                                                                    form,
                                                                }) => (
                                                                    <Radio.Group
                                                                        field={
                                                                            field
                                                                        }
                                                                        form={
                                                                            form
                                                                        }
                                                                        value={
                                                                            values.offr_type_fxd_amnt
                                                                        }
                                                                        onChange={(
                                                                            val
                                                                        ) =>
                                                                            form.setFieldValue(
                                                                                field.name,
                                                                                val
                                                                            )
                                                                        }
                                                                    >
                                                                        <Radio
                                                                            value={
                                                                                true
                                                                            }
                                                                            style={{
                                                                                height: '25px',
                                                                                width: '25px',
                                                                            }}
                                                                        >
                                                                            Fixed
                                                                            Amount
                                                                        </Radio>
                                                                        <Radio
                                                                            value={
                                                                                false
                                                                            }
                                                                            style={{
                                                                                height: '25px',
                                                                                width: '25px',
                                                                                marginLeft:
                                                                                    '30px',
                                                                            }}
                                                                        >
                                                                            Percentage
                                                                        </Radio>
                                                                    </Radio.Group>
                                                                )}
                                                            </Field>
                                                        </div>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection:
                                                                    'column',
                                                            }}
                                                        >
                                                            <label className="mb-3">
                                                                Select Bearer
                                                                Account
                                                            </label>
                                                            <div
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                }}
                                                            >
                                                                <Checkbox />
                                                                <label>
                                                                    Operator
                                                                </label>
                                                                <Checkbox className="ml-6" />
                                                                <label>
                                                                    Provider
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <FormItem
                                                            className="mt-2"
                                                            invalid={
                                                                errors.offr_value &&
                                                                touched.offr_value
                                                            }
                                                            errorMessage={
                                                                errors.offr_value
                                                            }
                                                        >
                                                            <Field name="offr_value">
                                                                {({
                                                                    field,
                                                                    form,
                                                                }) => {
                                                                    return (
                                                                        <NumberFormatInput
                                                                            form={
                                                                                form
                                                                            }
                                                                            field={
                                                                                field
                                                                            }
                                                                            placeholder="Enter Amount"
                                                                            // className="w-4/5"
                                                                            customInput={
                                                                                values?.offr_type_fxd_amnt
                                                                                    ? PriceInput
                                                                                    : PercentageInput
                                                                            }
                                                                            onValueChange={(
                                                                                e
                                                                            ) => {
                                                                                form.setFieldValue(
                                                                                    field.name,
                                                                                    e.value
                                                                                )
                                                                            }}
                                                                        />
                                                                    )
                                                                }}
                                                            </Field>
                                                        </FormItem>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                            }}
                                                        >
                                                            <FormItem
                                                                className="mt-2"
                                                                invalid={
                                                                    errors.operator_share &&
                                                                    touched.operator_share
                                                                }
                                                                errorMessage={
                                                                    errors.operator_share
                                                                }
                                                            >
                                                                <Field name="operator_share">
                                                                    {({
                                                                        field,
                                                                        form,
                                                                    }) => {
                                                                        return (
                                                                            <NumberFormatInput
                                                                                form={
                                                                                    form
                                                                                }
                                                                                field={
                                                                                    field
                                                                                }
                                                                                // className="w-40"
                                                                                customInput={
                                                                                    PercentageInput
                                                                                }
                                                                                onValueChange={(
                                                                                    e
                                                                                ) => {
                                                                                    form.setFieldValue(
                                                                                        field.name,
                                                                                        e.value
                                                                                    )
                                                                                }}
                                                                            />
                                                                        )
                                                                    }}
                                                                </Field>
                                                            </FormItem>
                                                            <FormItem
                                                                className="mt-2"
                                                                invalid={
                                                                    errors.provider_share &&
                                                                    touched.provider_share
                                                                }
                                                                errorMessage={
                                                                    errors.provider_share
                                                                }
                                                            >
                                                                <Field name="provider_share">
                                                                    {({
                                                                        field,
                                                                        form,
                                                                    }) => {
                                                                        return (
                                                                            <NumberFormatInput
                                                                                className="ml-3 "
                                                                                form={
                                                                                    form
                                                                                }
                                                                                field={
                                                                                    field
                                                                                }
                                                                                customInput={
                                                                                    PercentageInput
                                                                                }
                                                                                onValueChange={(
                                                                                    e
                                                                                ) => {
                                                                                    form.setFieldValue(
                                                                                        field.name,
                                                                                        e.value
                                                                                    )
                                                                                }}
                                                                            />
                                                                        )
                                                                    }}
                                                                </Field>
                                                            </FormItem>
                                                        </div>
                                                        <FormItem
                                                            label="Description"
                                                            className=""
                                                            invalid={
                                                                errors.offr_desc &&
                                                                touched.offr_desc
                                                            }
                                                            errorMessage={
                                                                errors.offr_desc
                                                            }
                                                        >
                                                            <Field name="offr_desc">
                                                                {({
                                                                    field,
                                                                }) => (
                                                                    <RichTextEditor
                                                                        value={
                                                                            field.value
                                                                        }
                                                                        onChange={field.onChange(
                                                                            field.name
                                                                        )}
                                                                    ></RichTextEditor>
                                                                )}
                                                            </Field>
                                                        </FormItem>
                                                    </div>
                                                </FormContainer>
                                            </AdaptableCard>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 text-right">
                                <>
                                    <Link
                                        className="block lg:inline-block md:mb-0 mb-4"
                                        to="/offers"
                                    >
                                        <Button
                                           type={'button'}
                                           className="mx-2"
                                           onClick={() =>
                                               console.log('cancel')
                                           }
                                           variant="solid"
                                           style={{
                                               backgroundColor: '#4D4D4D',
                                           }}
                                        >
                                            Cancel
                                        </Button>
                                    </Link>
                                </>
                                <Button variant="solid" type={'submit'}>
                                    {'Next'}
                                </Button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}
