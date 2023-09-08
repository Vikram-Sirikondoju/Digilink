import { AdaptableCard } from 'components/shared'
import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Card,
    Checkbox,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { HiMinus, HiPlus } from 'react-icons/hi'


const pCategoryOptions = [
    { label: 'Customer Type', value: '1' },
    { label: 'Customer Category', value: '2' },
    { label: 'Country', value: '3' },
    { label: 'State', value: '4' },
]

const CreateConfig = (props) => {
    const { onPrevious, configIntialValues, handleSecondStepSubmit } = props
    return (
        <>
            <Formik
                initialValues={configIntialValues}
                // validationSchema={{}}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    handleSecondStepSubmit(values)
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
                                                className="h-full mt-4"
                                                bodyClass="h-full"
                                            >
                                                <h3 className="mx-4 mb-4">
                                                    Config Config
                                                </h3>
                                                <FormContainer>
                                                    <AdaptableCard
                                                        className="h-full p-4"
                                                        style={{
                                                            backgroundColor:
                                                                '#F5F5F5',
                                                        }}
                                                        bodyClass="h-full"
                                                        divider
                                                    >
                                                        <div className="md:grid grid-cols-2 gap-6 mx-4 mt-4">
                                                            <FormItem label="Title">
                                                                <Field
                                                                    type="text"
                                                                    autoComplete="off"
                                                                    name="offr_config_title"
                                                                    placeholder="Enter Config Title"
                                                                    component={
                                                                        Input
                                                                    }
                                                                />
                                                            </FormItem>
                                                        </div>
                                                        <div className="flex justify-around pt-3 w-24 h-12 mt-5 mb-5 border rounded  bg-blue-900">
                                                            <span className="text-white">
                                                                IF
                                                            </span>
                                                        </div>
                                                        <FormItem
                                                            label=""
                                                            className=""
                                                        >
                                                            <AdaptableCard
                                                                className="h-full pl-3"
                                                                bodyClass="h-full"
                                                                divider
                                                            >
                                                                <div className="">
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
                                                                                        placeholder="Select"
                                                                                        field={
                                                                                            field
                                                                                        }
                                                                                        form={
                                                                                            form
                                                                                        }
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
                                                                                        placeholder="Select Interaction"
                                                                                        field={
                                                                                            field
                                                                                        }
                                                                                        form={
                                                                                            form
                                                                                        }
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
                                                                                        placeholder="Select Value"
                                                                                        field={
                                                                                            field
                                                                                        }
                                                                                        form={
                                                                                            form
                                                                                        }
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
                                                                                component={
                                                                                    Input
                                                                                }
                                                                            />
                                                                        </FormItem>
                                                                        <FormItem label="">
                                                                            <Field
                                                                                type="text"
                                                                                autoComplete="off"
                                                                                name="configIfFirst"
                                                                                placeholder=""
                                                                                component={
                                                                                    Input
                                                                                }
                                                                            />
                                                                        </FormItem>
                                                                        <FormItem className="">
                                                                            <Button
                                                                                className="border-red-500"
                                                                                shape="circle"
                                                                                size="md"
                                                                                icon={
                                                                                    <HiMinus />
                                                                                }
                                                                                onClick={
                                                                                    ''
                                                                                }
                                                                            />
                                                                            <Button
                                                                                className="ml-4 border-cyan-500"
                                                                                shape="circle"
                                                                                size="md"
                                                                                icon={
                                                                                    <HiPlus />
                                                                                }
                                                                                onClick={
                                                                                    ''
                                                                                }
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
                                                                                    <Select
                                                                                        placeholder="Select"
                                                                                        field={
                                                                                            field
                                                                                        }
                                                                                        form={
                                                                                            form
                                                                                        }
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
                                                                                        placeholder="Select Interaction"
                                                                                        field={
                                                                                            field
                                                                                        }
                                                                                        form={
                                                                                            form
                                                                                        }
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
                                                                                        placeholder="Select Value"
                                                                                        field={
                                                                                            field
                                                                                        }
                                                                                        form={
                                                                                            form
                                                                                        }
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
                                                                                component={
                                                                                    Input
                                                                                }
                                                                            />
                                                                        </FormItem>
                                                                        <FormItem label="">
                                                                            <Field
                                                                                type="text"
                                                                                autoComplete="off"
                                                                                name="configIfFirst"
                                                                                placeholder=""
                                                                                component={
                                                                                    Input
                                                                                }
                                                                            />
                                                                        </FormItem>
                                                                        <FormItem className="">
                                                                            <Button
                                                                                className="border-red-500"
                                                                                shape="circle"
                                                                                size="md"
                                                                                icon={
                                                                                    <HiMinus />
                                                                                }
                                                                                onClick={
                                                                                    ''
                                                                                }
                                                                            />
                                                                            <Button
                                                                                className="ml-4 border-cyan-500"
                                                                                shape="circle"
                                                                                size="md"
                                                                                icon={
                                                                                    <HiPlus />
                                                                                }
                                                                                onClick={
                                                                                    ''
                                                                                }
                                                                            />
                                                                        </FormItem>
                                                                    </div>
                                                                </div>
                                                            </AdaptableCard>
                                                        </FormItem>
                                                    </AdaptableCard>
                                                    <AdaptableCard
                                                        className="h-full p-4"
                                                        style={{
                                                            backgroundColor:
                                                                '#F5F5F5',
                                                        }}
                                                        bodyClass="h-full"
                                                        divider
                                                    >
                                                        <div className="flex justify-around pt-3 w-24 h-12 mt-5 mb-5 border rounded  bg-blue-900">
                                                            <span className="text-white">
                                                                THEN
                                                            </span>
                                                        </div>
                                                        {/* <Button
                                            onClick={() => { }}
                                            className="mt-5 mb-5"
                                            variant="solid"
                                        >
                                            THEN
                                        </Button> */}
                                                        <FormItem label="">
                                                            <AdaptableCard
                                                                className="h-full pl-3"
                                                                bodyClass="h-full"
                                                                divider
                                                            >
                                                                <div className="md:grid grid-cols-6 gap-4  mt-4">
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
                                                                                    placeholder="Select"
                                                                                    field={
                                                                                        field
                                                                                    }
                                                                                    form={
                                                                                        form
                                                                                    }
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
                                                                                    placeholder="Select Interaction"
                                                                                    field={
                                                                                        field
                                                                                    }
                                                                                    form={
                                                                                        form
                                                                                    }
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
                                                                                    placeholder="Select Value"
                                                                                    field={
                                                                                        field
                                                                                    }
                                                                                    form={
                                                                                        form
                                                                                    }
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
                                                                            component={
                                                                                Input
                                                                            }
                                                                        />
                                                                    </FormItem>
                                                                    <FormItem label="">
                                                                        <Field
                                                                            type="text"
                                                                            autoComplete="off"
                                                                            name="configIfFirst"
                                                                            placeholder=""
                                                                            component={
                                                                                Input
                                                                            }
                                                                        />
                                                                    </FormItem>
                                                                    <FormItem className="">
                                                                        <Button
                                                                            className="border-red-500"
                                                                            shape="circle"
                                                                            size="md"
                                                                            icon={
                                                                                <HiMinus />
                                                                            }
                                                                            onClick={
                                                                                ''
                                                                            }
                                                                        />
                                                                        <Button
                                                                            className="ml-4 border-cyan-500"
                                                                            shape="circle"
                                                                            size="md"
                                                                            icon={
                                                                                <HiPlus />
                                                                            }
                                                                            onClick={
                                                                                ''
                                                                            }
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
                                                                                    placeholder="Select"
                                                                                    field={
                                                                                        field
                                                                                    }
                                                                                    form={
                                                                                        form
                                                                                    }
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
                                                                                    placeholder="Select Interaction"
                                                                                    field={
                                                                                        field
                                                                                    }
                                                                                    form={
                                                                                        form
                                                                                    }
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
                                                                                    placeholder="Select Value"
                                                                                    field={
                                                                                        field
                                                                                    }
                                                                                    form={
                                                                                        form
                                                                                    }
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
                                                                            component={
                                                                                Input
                                                                            }
                                                                        />
                                                                    </FormItem>
                                                                    <FormItem label="">
                                                                        <Field
                                                                            type="text"
                                                                            autoComplete="off"
                                                                            name="configIfFirst"
                                                                            placeholder=""
                                                                            component={
                                                                                Input
                                                                            }
                                                                        />
                                                                    </FormItem>
                                                                    <FormItem className="">
                                                                        <Button
                                                                            className="border-red-500"
                                                                            shape="circle"
                                                                            size="md"
                                                                            icon={
                                                                                <HiMinus />
                                                                            }
                                                                            onClick={
                                                                                ''
                                                                            }
                                                                        />
                                                                        <Button
                                                                            className="ml-4 border-cyan-500"
                                                                            shape="circle"
                                                                            size="md"
                                                                            icon={
                                                                                <HiPlus />
                                                                            }
                                                                            onClick={
                                                                                ''
                                                                            }
                                                                        />
                                                                    </FormItem>
                                                                </div>
                                                                <div
                                                                    style={
                                                                        {
                                                                            // marginLeft: '-120px',
                                                                        }
                                                                    }
                                                                >
                                                                    <Checkbox
                                                                        children={
                                                                            <p className="mr-6 color-black">
                                                                                Allowed
                                                                                Multiple
                                                                                Usages
                                                                            </p>
                                                                        }
                                                                    />
                                                                </div>
                                                            </AdaptableCard>
                                                        </FormItem>
                                                    </AdaptableCard>
                                                </FormContainer>
                                            </AdaptableCard>
                                            <div className="mt-4 text-right lg:flex items-center justify-end">
                                                <Button
                                                    variant="plain"
                                                    className="font-bold"
                                                    style={{ color: '#004D99' }}
                                                    icon={
                                                        <BsFillPlusCircleFill fill="#004D99" />
                                                    }
                                                >
                                                    ADD NEW CONFIG
                                                </Button>
                                                <Button
                                                    variant="plain"
                                                    className="font-bold"
                                                    style={{ color: '#990000' }}
                                                    icon={
                                                        <BsFillPlusCircleFill fill="#990000" />
                                                    }
                                                >
                                                    DELETE CONFIG
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 text-right">
                                <>
                                    <Button
                                        className="mx-2"
                                        onClick={onPrevious}
                                    >
                                        Previous
                                    </Button>
                                </>
                                <Button
                                    // onClick={onNext}
                                    variant="solid"
                                >
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

export default CreateConfig
