import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Field, Form, Formik } from 'formik'
import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Checkbox,
} from 'components/ui'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { BsFillPlusCircleFill } from 'react-icons/bs'

const pCategoryOptions = [
    { label: 'Airtel Inc.', value: 'M' },
    { label: 'Airtel Inc.', value: 'F' },
    { label: 'Airtel India', value: 'O' },
]

const SolutionConfig = (props) => {
    return (
        <>
            <AdaptableCard className="h-full" bodyClass="h-full" >
                <h3 className="mx-2 mb-4">Create Config</h3>
                <Formik
                    initialValues={{}}
                    // validationSchema={{}}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true)
                    }}
                >
                    {({ values, touched, errors, isSubmitting }) => {
                        return (
                            <Form>
                                <FormContainer>
                                    <div className="md:grid grid-cols-2 gap-6  mt-4">
                                        <FormItem label="Title">
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="titleConfigSolution"
                                                placeholder="Enter Config Title"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </div>
                                    <AdaptableCard
                                        className="h-full p-4 bg-gray-50" style={{backgroundColor:"#f5f5f5"}}
                                        bodyClass="h-full"
                                        divider
                                    >
                                        <Button
                                            onClick={() => { }}
                                            className="mt-5 mb-5"
                                            variant="solid"
                                        >
                                            IF
                                        </Button>
                                        <FormItem label="" className="" >
                                            <AdaptableCard
                                                className="h-full pl-36"
                                                bodyClass="h-full"
                                                divider
                                            >
                                                <div className=''>
                                                    <div className="md:grid grid-cols-6 gap-4  mt-4 ">
                                                        <FormItem
                                                            label=""
                                                            invalid={
                                                                errors.labelIfConfig &&
                                                                touched.labelIfConfig
                                                            }
                                                            errorMessage={
                                                                errors.labelIfConfig
                                                            }
                                                        >
                                                            <Field name="labelIfConfig">
                                                                {({
                                                                    field,
                                                                    form,
                                                                }) => (
                                                                    <Select
                                                                        isDisabled={true} placeholder="Select"
                                                                        field={
                                                                            field
                                                                        }
                                                                        form={form}
                                                                        options={
                                                                            pCategoryOptions
                                                                        }
                                                                        value={pCategoryOptions.filter(
                                                                            (
                                                                                cItem
                                                                            ) =>
                                                                                cItem.value ===
                                                                                values.labelIfConfig
                                                                        )}
                                                                        onChange={(
                                                                            cItem
                                                                        ) =>
                                                                            form.setFieldValue(
                                                                                field.name,
                                                                                cItem.value
                                                                            )
                                                                        }
                                                                    />
                                                                )}
                                                            </Field>
                                                        </FormItem>
                                                        <FormItem
                                                            label=""
                                                            invalid={
                                                                errors.interactionIfConfig &&
                                                                touched.interactionIfConfig
                                                            }
                                                            errorMessage={
                                                                errors.interactionIfConfig
                                                            }
                                                        >
                                                            <Field name="interactionIfConfig">
                                                                {({
                                                                    field,
                                                                    form,
                                                                }) => (
                                                                    <Select
                                                                        isDisabled={true} placeholder="Select Interaction"
                                                                        field={
                                                                            field
                                                                        }
                                                                        form={form}
                                                                        options={
                                                                            pCategoryOptions
                                                                        }
                                                                        value={pCategoryOptions.filter(
                                                                            (
                                                                                cItem
                                                                            ) =>
                                                                                cItem.value ===
                                                                                values.interactionIfConfig
                                                                        )}
                                                                        onChange={(
                                                                            cItem
                                                                        ) =>
                                                                            form.setFieldValue(
                                                                                field.name,
                                                                                cItem.value
                                                                            )
                                                                        }
                                                                    />
                                                                )}
                                                            </Field>
                                                        </FormItem>
                                                        <FormItem
                                                            label=""
                                                            invalid={
                                                                errors.valueIfConfig &&
                                                                touched.valueIfConfig
                                                            }
                                                            errorMessage={
                                                                errors.valueIfConfig
                                                            }
                                                        >
                                                            <Field name="valueIfConfig">
                                                                {({
                                                                    field,
                                                                    form,
                                                                }) => (
                                                                    <Select
                                                                        isDisabled={true} placeholder="Select Value"
                                                                        field={
                                                                            field
                                                                        }
                                                                        form={form}
                                                                        options={
                                                                            pCategoryOptions
                                                                        }
                                                                        value={pCategoryOptions.filter(
                                                                            (
                                                                                cItem
                                                                            ) =>
                                                                                cItem.value ===
                                                                                values.valueIfConfig
                                                                        )}
                                                                        onChange={(
                                                                            cItem
                                                                        ) =>
                                                                            form.setFieldValue(
                                                                                field.name,
                                                                                cItem.value
                                                                            )
                                                                        }
                                                                    />
                                                                )}
                                                            </Field>
                                                        </FormItem>
                                                        <FormItem label="">
                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                name="configIfFirst"
                                                                placeholder=""
                                                                component={Input}
                                                            />
                                                        </FormItem>
                                                        <FormItem label="">
                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                name="configIfFirst"
                                                                placeholder=""
                                                                component={Input}
                                                            />
                                                        </FormItem>
                                                        <FormItem className="ml-8">
                                                            <Button className='border-red-500'
                                                                shape="circle"
                                                                size="md"
                                                                icon={<HiMinus />}
                                                                onClick={''}
                                                            />
                                                            <Button className='ml-4 border-cyan-500'
                                                                shape="circle"
                                                                size="md"
                                                                icon={<HiPlus />}
                                                                onClick={''}
                                                            />
                                                        </FormItem>
                                                    </div>
                                                    <div className="md:grid grid-cols-6 gap-4  mt-4  ">
                                                        {/* <FormItem label=""></FormItem> */}
                                                        <FormItem
                                                            label=""
                                                            invalid={
                                                                errors.labelIfConfig &&
                                                                touched.labelIfConfig
                                                            }
                                                            errorMessage={
                                                                errors.labelIfConfig
                                                            }
                                                        >
                                                            <Field name="labelIfConfig">
                                                                {({
                                                                    field,
                                                                    form,
                                                                }) => (
                                                                    <Select isDisabled={true}
                                                                        placeholder="Select"
                                                                        field={
                                                                            field
                                                                        }
                                                                        form={form}
                                                                        options={
                                                                            pCategoryOptions
                                                                        }
                                                                        value={pCategoryOptions.filter(
                                                                            (
                                                                                cItem
                                                                            ) =>
                                                                                cItem.value ===
                                                                                values.labelIfConfig
                                                                        )}
                                                                        onChange={(
                                                                            cItem
                                                                        ) =>
                                                                            form.setFieldValue(
                                                                                field.name,
                                                                                cItem.value
                                                                            )
                                                                        }
                                                                    />
                                                                )}
                                                            </Field>
                                                        </FormItem>
                                                        <FormItem
                                                            label=""
                                                            invalid={
                                                                errors.interactionIfConfig &&
                                                                touched.interactionIfConfig
                                                            }
                                                            errorMessage={
                                                                errors.interactionIfConfig
                                                            }
                                                        >
                                                            <Field name="interactionIfConfig">
                                                                {({
                                                                    field,
                                                                    form,
                                                                }) => (
                                                                    <Select
                                                                        isDisabled={true} placeholder="Select Interaction"
                                                                        field={
                                                                            field
                                                                        }
                                                                        form={form}
                                                                        options={
                                                                            pCategoryOptions
                                                                        }
                                                                        value={pCategoryOptions.filter(
                                                                            (
                                                                                cItem
                                                                            ) =>
                                                                                cItem.value ===
                                                                                values.interactionIfConfig
                                                                        )}
                                                                        onChange={(
                                                                            cItem
                                                                        ) =>
                                                                            form.setFieldValue(
                                                                                field.name,
                                                                                cItem.value
                                                                            )
                                                                        }
                                                                    />
                                                                )}
                                                            </Field>
                                                        </FormItem>
                                                        <FormItem
                                                            label=""
                                                            invalid={
                                                                errors.valueIfConfig &&
                                                                touched.valueIfConfig
                                                            }
                                                            errorMessage={
                                                                errors.valueIfConfig
                                                            }
                                                        >
                                                            <Field name="valueIfConfig">
                                                                {({
                                                                    field,
                                                                    form,
                                                                }) => (
                                                                    <Select
                                                                        isDisabled={true} placeholder="Select Value"
                                                                        field={
                                                                            field
                                                                        }
                                                                        form={form}
                                                                        options={
                                                                            pCategoryOptions
                                                                        }
                                                                        value={pCategoryOptions.filter(
                                                                            (
                                                                                cItem
                                                                            ) =>
                                                                                cItem.value ===
                                                                                values.valueIfConfig
                                                                        )}
                                                                        onChange={(
                                                                            cItem
                                                                        ) =>
                                                                            form.setFieldValue(
                                                                                field.name,
                                                                                cItem.value
                                                                            )
                                                                        }
                                                                    />
                                                                )}
                                                            </Field>
                                                        </FormItem>
                                                        <FormItem label="">
                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                name="configIfFirst"
                                                                placeholder=""
                                                                component={Input}
                                                            />
                                                        </FormItem>
                                                        <FormItem label="">
                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                name="configIfFirst"
                                                                placeholder=""
                                                                component={Input}
                                                            />
                                                        </FormItem>
                                                        <FormItem className="ml-8">
                                                            <Button className='border-red-500'
                                                                shape="circle"
                                                                size="md"
                                                                icon={<HiMinus />}
                                                                onClick={''}
                                                            />
                                                            <Button className='ml-4 border-cyan-500'
                                                                shape="circle"
                                                                size="md"
                                                                icon={<HiPlus />}
                                                                onClick={''}
                                                            />
                                                        </FormItem>
                                                    </div>
                                                </div>
                                            </AdaptableCard>
                                        </FormItem>
                                    </AdaptableCard>
                                    <AdaptableCard
                                        className="h-full p-4 bg-gray-50" style={{backgroundColor:"#F5F5F5"}}
                                        bodyClass="h-full"
                                        divider
                                    >
                                        <Button
                                            onClick={() => { }}
                                            className="mt-5 mb-5"
                                            variant="solid"
                                        >
                                            THEN
                                        </Button>
                                        <FormItem label="">
                                            <AdaptableCard
                                                className="h-full pl-36"
                                                bodyClass="h-full"
                                                divider
                                            >
                                                <div className="md:grid grid-cols-6 gap-4  mt-4  ">
                                                    <FormItem
                                                        label=""
                                                        invalid={
                                                            errors.labelIfConfig &&
                                                            touched.labelIfConfig
                                                        }
                                                        errorMessage={
                                                            errors.labelIfConfig
                                                        }
                                                    >
                                                        <Field name="labelIfConfig">
                                                            {({
                                                                field,
                                                                form,
                                                            }) => (
                                                                <Select
                                                                    isDisabled={true} placeholder="Select"
                                                                    field={
                                                                        field
                                                                    }
                                                                    form={form}
                                                                    options={
                                                                        pCategoryOptions
                                                                    }
                                                                    value={pCategoryOptions.filter(
                                                                        (
                                                                            cItem
                                                                        ) =>
                                                                            cItem.value ===
                                                                            values.labelIfConfig
                                                                    )}
                                                                    onChange={(
                                                                        cItem
                                                                    ) =>
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            cItem.value
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormItem>
                                                    <FormItem
                                                        label=""
                                                        invalid={
                                                            errors.interactionIfConfig &&
                                                            touched.interactionIfConfig
                                                        }
                                                        errorMessage={
                                                            errors.interactionIfConfig
                                                        }
                                                    >
                                                        <Field name="interactionIfConfig">
                                                            {({
                                                                field,
                                                                form,
                                                            }) => (
                                                                <Select
                                                                    isDisabled={true} placeholder="Select Interaction"
                                                                    field={
                                                                        field
                                                                    }
                                                                    form={form}
                                                                    options={
                                                                        pCategoryOptions
                                                                    }
                                                                    value={pCategoryOptions.filter(
                                                                        (
                                                                            cItem
                                                                        ) =>
                                                                            cItem.value ===
                                                                            values.interactionIfConfig
                                                                    )}
                                                                    onChange={(
                                                                        cItem
                                                                    ) =>
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            cItem.value
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormItem>
                                                    <FormItem
                                                        label=""
                                                        invalid={
                                                            errors.valueIfConfig &&
                                                            touched.valueIfConfig
                                                        }
                                                        errorMessage={
                                                            errors.valueIfConfig
                                                        }
                                                    >
                                                        <Field name="valueIfConfig">
                                                            {({
                                                                field,
                                                                form,
                                                            }) => (
                                                                <Select
                                                                    isDisabled={true} placeholder="Select Value"
                                                                    field={
                                                                        field
                                                                    }
                                                                    form={form}
                                                                    options={
                                                                        pCategoryOptions
                                                                    }
                                                                    value={pCategoryOptions.filter(
                                                                        (
                                                                            cItem
                                                                        ) =>
                                                                            cItem.value ===
                                                                            values.valueIfConfig
                                                                    )}
                                                                    onChange={(
                                                                        cItem
                                                                    ) =>
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            cItem.value
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormItem>
                                                    <FormItem label="">
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="configIfFirst"
                                                            placeholder=""
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem label="">
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="configIfFirst"
                                                            placeholder=""
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem className="ml-8">
                                                        <Button className='border-red-500'
                                                            shape="circle"
                                                            size="md"
                                                            icon={<HiMinus />}
                                                            onClick={''}
                                                        />
                                                        <Button className='ml-4 border-cyan-500'
                                                            shape="circle"
                                                            size="md"
                                                            icon={<HiPlus />}
                                                            onClick={''}
                                                        />
                                                    </FormItem>
                                                </div>
                                                <div className="md:grid grid-cols-6 gap-4  mt-4  ">

                                                    <FormItem
                                                        label=""
                                                        invalid={
                                                            errors.labelIfConfig &&
                                                            touched.labelIfConfig
                                                        }
                                                        errorMessage={
                                                            errors.labelIfConfig
                                                        }
                                                    >
                                                        <Field name="labelIfConfig">
                                                            {({
                                                                field,
                                                                form,
                                                            }) => (
                                                                <Select
                                                                    isDisabled={true} placeholder="Select"
                                                                    field={
                                                                        field
                                                                    }
                                                                    form={form}
                                                                    options={
                                                                        pCategoryOptions
                                                                    }
                                                                    value={pCategoryOptions.filter(
                                                                        (
                                                                            cItem
                                                                        ) =>
                                                                            cItem.value ===
                                                                            values.labelIfConfig
                                                                    )}
                                                                    onChange={(
                                                                        cItem
                                                                    ) =>
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            cItem.value
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormItem>
                                                    <FormItem
                                                        label=""
                                                        invalid={
                                                            errors.interactionIfConfig &&
                                                            touched.interactionIfConfig
                                                        }
                                                        errorMessage={
                                                            errors.interactionIfConfig
                                                        }
                                                    >
                                                        <Field name="interactionIfConfig">
                                                            {({
                                                                field,
                                                                form,
                                                            }) => (
                                                                <Select
                                                                    isDisabled={true} placeholder="Select Interaction"
                                                                    field={
                                                                        field
                                                                    }
                                                                    form={form}
                                                                    options={
                                                                        pCategoryOptions
                                                                    }
                                                                    value={pCategoryOptions.filter(
                                                                        (
                                                                            cItem
                                                                        ) =>
                                                                            cItem.value ===
                                                                            values.interactionIfConfig
                                                                    )}
                                                                    onChange={(
                                                                        cItem
                                                                    ) =>
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            cItem.value
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormItem>
                                                    <FormItem
                                                        label=""
                                                        invalid={
                                                            errors.valueIfConfig &&
                                                            touched.valueIfConfig
                                                        }
                                                        errorMessage={
                                                            errors.valueIfConfig
                                                        }
                                                    >
                                                        <Field name="valueIfConfig">
                                                            {({
                                                                field,
                                                                form,
                                                            }) => (
                                                                <Select
                                                                    isDisabled={true} placeholder="Select Value"
                                                                    field={
                                                                        field
                                                                    }
                                                                    form={form}
                                                                    options={
                                                                        pCategoryOptions
                                                                    }
                                                                    value={pCategoryOptions.filter(
                                                                        (
                                                                            cItem
                                                                        ) =>
                                                                            cItem.value ===
                                                                            values.valueIfConfig
                                                                    )}
                                                                    onChange={(
                                                                        cItem
                                                                    ) =>
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            cItem.value
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormItem>
                                                    <FormItem label="">
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="configIfFirst"
                                                            placeholder=""
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem label="">
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="configIfFirst"
                                                            placeholder=""
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem className="ml-8">
                                                        <Button className='border-red-500'
                                                            shape="circle"
                                                            size="md"
                                                            icon={<HiMinus />}
                                                            onClick={''}
                                                        />
                                                        <Button className='ml-4 border-cyan-500'
                                                            shape="circle"
                                                            size="md"
                                                            icon={<HiPlus />}
                                                            onClick={''}
                                                        />
                                                    </FormItem>
                                                </div>
                                            </AdaptableCard>
                                        </FormItem>
                                        <Checkbox
                                            children={
                                                <p className="mr-6 color-black">
                                                    Allowed Multiple Usages
                                                </p>
                                            }
                                        />
                                    </AdaptableCard>
                                </FormContainer>
                            </Form>
                        )
                    }}
                </Formik>
                
            </AdaptableCard>
            <div className="mt-4 text-right lg:flex items-center justify-end">
                    <Button variant="plain" className='font-bold' style={{ color: "#004D99" }} icon={<BsFillPlusCircleFill fill='#004D99' />}>ADD NEW FIELD</Button>
                    <Button variant="plain" className='font-bold' style={{ color: "#990000" }} icon={<BsFillPlusCircleFill fill='#990000' />}>DELETE</Button>
                </div>
        </>
    )
}

export default SolutionConfig
