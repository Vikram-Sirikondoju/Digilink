import { AdaptableCard } from 'components/shared';

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
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { HiMinus, HiPlus } from 'react-icons/hi';
import * as Yup from "yup";


export const statusOptions = [
    { label: 'Married', value: 'M' },
    { label: 'Widowed', value: 'W' },
    { label: 'Separated', value: 'S' },
    { label: 'Divorced', value: 'D' },
    { label: 'Single ', value: 'S' },
]
const genderOptions = [
    { label: 'Super Admin', value: 'M' },
    { label: 'User.', value: 'F' },
    { label: 'Admin', value: 'O' },
]

const retailUserInitValues = {
    roleId: '',
    firstName: '',
    lastName: '',
    emailId: '',
    phoneNumber: '',
    ordemailId:''
}


const retailValidationSchema = Yup.object().shape({

    roleId: Yup.string().required('Please Enter RoleId'),
    firstName: Yup.string().required('Please Enter Fisrt Name'),
    lastName: Yup.string().required('Please Enter Last Name'),
    emailId: Yup.string().email('Invalid email').required('Please Enter Email ID'),
    phoneNumber: Yup
        .string()
        .required("Mobile number is required")
        .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Invalid mobile number"),

        ordemailId:Yup.string().email('Invalid email').required('Please Enter Email ID')


})

const pCategoryOptions = [
    { label: 'Customer Type', value: '1' },
    { label: 'Customer Category', value: '2' },
    { label: 'Country', value: '3' },
    { label: 'State', value: '4' },
]

const CreateConfig = ({ onChange, refId, ...props }) => {


    return (
        <>
           <AdaptableCard className="h-full mt-4" bodyClass="h-full" >
                <h3 className="mx-4 mb-4">Config Conditions</h3>
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
                                    <AdaptableCard
                                        className="h-full p-4" style={{backgroundColor:"#F5F5F5"}}
                                        bodyClass="h-full"
                                        divider
                                    >
                                        <div className="md:grid grid-cols-2 gap-6 mx-4 mt-4">
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
                                            <div className="flex justify-around pt-3 w-24 h-12 mt-5 mb-5 border rounded  bg-blue-900">
                                                <span className='text-white'>IF</span>
                                            </div>
                                            <FormItem label="" className="" >
                                                <AdaptableCard className="h-full pl-36" bodyClass="h-full" divider>
                                                    <div className=''>
                                                        <div className="md:grid grid-cols-6 gap-4  mt-4 ">
                                                            <FormItem
                                                                label=""
                                                                invalid={errors.labelIfConfig &&touched.labelIfConfig}
                                                                errorMessage={errors.labelIfConfig}
                                                            >
                                                                <Field name="labelIfConfig">
                                                                    {({field,form,}) => (
                                                                        <Select
                                                                            placeholder="Select"
                                                                            field={field}
                                                                            form={form}
                                                                            options={pCategoryOptions}
                                                                            value={pCategoryOptions.filter((cItem) =>
                                                                                    cItem.value ===
                                                                                    values.labelIfConfig
                                                                            )}
                                                                            onChange={(cItem) =>
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
                                                                invalid={errors.interactionIfConfig &&touched.interactionIfConfig}
                                                                errorMessage={errors.interactionIfConfig}>
                                                                <Field name="interactionIfConfig">
                                                                    {({field,form,}) => (
                                                                        <Select
                                                                            placeholder="Select Interaction"
                                                                            field={field}
                                                                            form={form}
                                                                            options={pCategoryOptions}
                                                                            value={pCategoryOptions.filter((cItem) =>
                                                                                    cItem.value ===
                                                                                    values.interactionIfConfig
                                                                            )}
                                                                            onChange={(cItem) =>
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
                                                                invalid={errors.valueIfConfig &&touched.valueIfConfig}
                                                                errorMessage={errors.valueIfConfig}>
                                                                <Field name="valueIfConfig">
                                                                    {({field,form,}) => (
                                                                    <Select
                                                                            placeholder="Select Value"
                                                                            field={field}
                                                                            form={form}
                                                                            options={pCategoryOptions}
                                                                            value={pCategoryOptions.filter((cItem) =>
                                                                                    cItem.value ===
                                                                                    values.valueIfConfig
                                                                            )}
                                                                            onChange={(cItem) =>
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
                                                                invalid={errors.labelIfConfig &&touched.labelIfConfig}
                                                                errorMessage={errors.labelIfConfig}>
                                                                <Field name="labelIfConfig">
                                                                    {({field,form,}) => (
                                                                        <Select
                                                                            placeholder="Select"
                                                                            field={field}
                                                                            form={form}
                                                                            options={pCategoryOptions}
                                                                            value={pCategoryOptions.filter((cItem) =>
                                                                                    cItem.value ===
                                                                                    values.labelIfConfig
                                                                            )}
                                                                            onChange={(cItem) =>form.setFieldValue(
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
                                                                invalid={errors.interactionIfConfig &&touched.interactionIfConfig}
                                                                errorMessage={errors.interactionIfConfig}>
                                                                <Field name="interactionIfConfig">
                                                                    {({field,form,}) => (
                                                                        <Select
                                                                            placeholder="Select Interaction"
                                                                            field={field}
                                                                            form={form}
                                                                            options={pCategoryOptions}
                                                                            value={pCategoryOptions.filter((cItem) =>
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
                                                                invalid={errors.valueIfConfig &&touched.valueIfConfig}
                                                                errorMessage={errors.valueIfConfig}>
                                                                <Field name="valueIfConfig">
                                                                    {({field,form,}) => (
                                                                        <Select
                                                                            placeholder="Select Value"
                                                                            field={field}
                                                                            form={form}
                                                                            options={pCategoryOptions}
                                                                            value={pCategoryOptions.filter((cItem) =>
                                                                                    cItem.value ===
                                                                                    values.valueIfConfig
                                                                            )}
                                                                            onChange={(cItem) =>form.setFieldValue(
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
                                        className="h-full p-4" style={{backgroundColor:"#F5F5F5"}}
                                        bodyClass="h-full"
                                        divider
                                    >
                                        <div className="flex justify-around pt-3 w-24 h-12 mt-5 mb-5 border rounded  bg-blue-900">
                                                <span className='text-white'>THEN</span>
                                        </div>
                                        {/* <Button
                                            onClick={() => { }}
                                            className="mt-5 mb-5"
                                            variant="solid"
                                        >
                                            THEN
                                        </Button> */}
                                        <FormItem label="">
                                            <AdaptableCard className="h-full pl-36" bodyClass="h-full"divider >
                                                <div className="md:grid grid-cols-6 gap-4  mt-4">
                                                    <FormItem
                                                        label=""
                                                        invalid={errors.labelIfConfig &&touched.labelIfConfig}
                                                        errorMessage={errors.labelIfConfig}>
                                                        <Field name="labelIfConfig">
                                                            {({field,form,}) => (
                                                                <Select
                                                                    placeholder="Select"
                                                                    field={field}
                                                                    form={form}
                                                                    options={pCategoryOptions}
                                                                    value={pCategoryOptions.filter((cItem) =>
                                                                            cItem.value ===
                                                                            values.labelIfConfig
                                                                    )}
                                                                    onChange={(cItem) =>form.setFieldValue(
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
                                                        invalid={errors.interactionIfConfig &&touched.interactionIfConfig}
                                                        errorMessage={errors.interactionIfConfig}>
                                                        <Field name="interactionIfConfig">
                                                            {({field,form,}) => (
                                                            <Select
                                                                    placeholder="Select Interaction"
                                                                    field={field}
                                                                    form={form}
                                                                    options={pCategoryOptions}
                                                                    value={pCategoryOptions.filter((cItem) =>
                                                                            cItem.value ===
                                                                            values.interactionIfConfig
                                                                    )}
                                                                    onChange={(cItem) =>form.setFieldValue(
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
                                                        invalid={errors.valueIfConfig &&touched.valueIfConfig}
                                                        errorMessage={errors.valueIfConfig}>
                                                        <Field name="valueIfConfig">
                                                            {({field,form,}) => (
                                                            <Select
                                                                    placeholder="Select Value"
                                                                    field={
                                                                        field
                                                                    }
                                                                    form={form}
                                                                    options={pCategoryOptions}
                                                                    value={pCategoryOptions.filter((cItem) =>
                                                                            cItem.value ===
                                                                            values.valueIfConfig
                                                                    )}
                                                                    onChange={(cItem) =>form.setFieldValue(
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
                                                        invalid={errors.labelIfConfig &&touched.labelIfConfig}
                                                        errorMessage={errors.labelIfConfig}
                                                    >
                                                        <Field name="labelIfConfig">
                                                            {({field,form,}) => (
                                                                <Select
                                                                    placeholder="Select"
                                                                    field={field}
                                                                    form={form}
                                                                    options={pCategoryOptions}
                                                                    value={pCategoryOptions.filter((cItem) =>
                                                                            cItem.value ===
                                                                            values.labelIfConfig
                                                                    )}
                                                                    onChange={(cItem) =>form.setFieldValue(
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
                                                        invalid={errors.interactionIfConfig &&touched.interactionIfConfig}
                                                        errorMessage={errors.interactionIfConfig}>
                                                        <Field name="interactionIfConfig">
                                                            {({field,form,}) => (
                                                                <Select
                                                                    placeholder="Select Interaction"
                                                                    field={field}
                                                                    form={form}
                                                                    options={pCategoryOptions}
                                                                    value={pCategoryOptions.filter((cItem) =>
                                                                            cItem.value ===
                                                                            values.interactionIfConfig
                                                                    )}
                                                                    onChange={(cItem) =>form.setFieldValue(
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
                                                        invalid={errors.valueIfConfig &&touched.valueIfConfig}
                                                        errorMessage={errors.valueIfConfig}>
                                                        <Field name="valueIfConfig">
                                                            {({field,form,}) => (
                                                                <Select
                                                                    placeholder="Select Value"
                                                                    field={field}
                                                                    form={form}
                                                                    options={pCategoryOptions}
                                                                    value={pCategoryOptions.filter((cItem) =>
                                                                            cItem.value ===
                                                                            values.valueIfConfig
                                                                    )}
                                                                    onChange={(cItem) =>form.setFieldValue(
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
                                                <div style={{marginLeft : "-120px"}}>
                                                    <Checkbox
                                                            children={
                                                                <p className="mr-6 color-black">
                                                                    Allowed Multiple Usages
                                                                </p>
                                                            }
                                                        />
                                                </div>
                                            </AdaptableCard>
                                        </FormItem>
                                    </AdaptableCard>
                                </FormContainer>
                            </Form>
                        )
                    }}
                </Formik>
                
            </AdaptableCard>
            <div className="mt-4 text-right lg:flex items-center justify-end">
                    <Button variant="plain" className='font-bold' style={{ color: "#004D99" }} icon={<BsFillPlusCircleFill fill='#004D99' />}>ADD NEW CONFIG</Button>
                    <Button variant="plain" className='font-bold' style={{ color: "#990000" }} icon={<BsFillPlusCircleFill fill='#990000' />}>DELETE CONFIG</Button>
                </div>

        </>
    )
}

export default CreateConfig
