import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Tooltip,
    Dialog,
} from 'components/ui'
import { BsFillPlusCircleFill } from 'react-icons/bs'

import { Field, FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
import { timeZone } from '../../../../mock/data/timezones'
import { RiCloseCircleFill } from 'react-icons/ri'
import { useState } from 'react'



export const statusOptions = [
    { label: 'Married', value: 'M' },
    { label: 'Widowed', value: 'W' },
    { label: 'Separated', value: 'S' },
    { label: 'Divorced', value: 'D' },
    { label: 'Single ', value: 'S' },
]
const genderOptions = [
    { label: 'Airtel Inc.', value: 0 },
    { label: 'Airtel Inc.', value: 1 },
    { label: 'Airtel India', value: 2 },
]


const apiConfiguration = [
    { label: 'AUTOMATIC', value: 'AUTOMATIC' },
    { label: 'MANUAL', value: 'MANUAL' },
]

const partnerType = [

    { label: 'Shipping Partner', value: 'SHIPPING_PARTNER' },
    { label: 'Warehouse Partner', value: 'WAREHOUSE_PARTNER' },
    { label: 'Payment Gateway partner', value: 'PAYMENT_GATEWAY_PARTNER' },
]

const language = [
    { label: 'English', value: 1 },
    { label: 'Spanish', value: 2 },
    { label: 'Arabic', value: 3 },
    { label: 'Portugese', value: 4 },

]

// const currency = [
//     { label: 'USD', value: 0 },
//     { label: 'EUR', value: 1 },
//     { label: 'CAD', value: 2 },
//     { label: 'KWD', value: 3 },
//     { label: 'INR', value: 4 },
// ]

const timeZonee = [
    { label: 'India (GMT+5:30)', value: 0 },
    { label: 'USA (GMT-4)', value: 1 },
    { label: 'Chicago (GMT-5)', value: 2 },
    { label: 'Phoenix (GMT-7)', value: 3 },
    { label: 'Los Angeles (GMT-7)', value: 4 },
]

const custOperator = [
    { label: 'Airtel Telangana', value: 0 },
    { label: 'Airtel Mumbai', value: 1 },
    { label: 'Airtel Rajasthan ', value: 2 },

]

const orientationtype = [
    { label: 'Right to Left', value: "RTL" },
    { label: 'Left to Right', value: "LTR" },
]

const oparatorAccountInfoInitialValues = {
    partnerId: "",//not in api
    partnerTitle: "",//not in api
    operater: "", //not in api
    accCompName: "",
    accIncorpDt: "",
    accTaxId: "",
    partnerType: "",//not in api
    accTimeZone: '',
    accCurrency: '',
    accLang: '',
    accOrient: '',
    apiConfig: "",//not in api
}

const operaterAccountInfoValidationSchema = Yup.object().shape({
    //partnerId: Yup.string().required('Please Enter Title'),
    accName: Yup.string().min(2, "Title must be at least 2 characters").max(100).required('Please enter a valid partner title').nullable(),
    operater: Yup.string().required('Please select operator').nullable(),
    accCompName: Yup.string().min(2, "Name must be at least 2 characters").max(100).required('Please enter company name').nullable(),
    accIncorpDt: Yup.string().required('Please enter incorporate date').nullable(),
    accTaxId: Yup.string().min(1).max(50).required('Please enter tax id').nullable(),
     partnerType : Yup.string().required('Please select a partner type ').nullable(),
    accTimeZone: Yup.string().required('Please select time zone').nullable(),
    accCurrency: Yup.string().required('Please select currency').nullable(),
    accLang: Yup.string().required('Please select language').nullable(),
    accOrient: Yup.string().required('Please select display orientation').nullable(),
    // apiConfig : Yup.string().required('Please select API configuration from the list').nullable()
})


const PartnerAccountInfo = ({ onChange, refId, ...props }) => {

    const currencyList = useSelector((state) => state.partnerList?.data?.currencyList)
    const parentAccountList = useSelector((state) => state.partnerList?.data?.parentAccountList)
    const dateFormat = useSelector((state) => state.locale.dateFormat)




    const timeZoneList = timeZone?.map((timezone) => ({
        value: timezone.id,
        label: timezone.value,
    }))

    const [dialogIsOpen, setIsOpen] = useState(false)
    const [newLabel, setNewLabel] = useState('')
    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e) => {
        setIsOpen(false)
    }
    const onDialogOk = (push, values) => {
        if (newLabel !== '') {
            push({ field_title: newLabel, field_value: '',field_type:'ACCOUNT' })
            setNewLabel('')
            setIsOpen(false)
        }
    }



    return (
        <>

            <h3 className="mx-4 mb-4 mt-2">ACCOUNT INFO</h3>

            <Formik
                innerRef={refId}
                initialValues={props.partnerIntialValues.accInfo}
                validationSchema={operaterAccountInfoValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    let updatedPayload = { ...props.partnerState, ...values }

                    props.setPartnerState(updatedPayload)

                    let dataToStore = props.partnerIntialValues
                    dataToStore.accInfo = values
                    props.setPartnerIntialValues(dataToStore)

                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className="md:grid grid-cols-4 gap-4 mx-4">
                                    <FormItem
                                        label={<p>Partner Title <span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.accName && touched.accName}
                                        errorMessage={errors.accName}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="accName"
                                            placeholder="Enter Partner Title"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>Operator <span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={
                                            errors.operater && touched.operater
                                        }
                                        errorMessage={errors.operater}
                                    >
                                        <Field name="operater">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select Operator"
                                                    field={field}
                                                    form={form}
                                                    options={parentAccountList}
                                                    value={parentAccountList?.filter(
                                                        (label) =>
                                                            label.value ===
                                                            values.operater
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
                                    <FormItem
                                        label={<p>Company Name <span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.accCompName && touched.accCompName}
                                        errorMessage={errors.accCompName}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="accCompName"
                                            placeholder="Enter Company Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>Incorporation Date <span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.accIncorpDt && touched.accIncorpDt}
                                        errorMessage={errors.accIncorpDt}
                                    >
                                        <Field name="accIncorpDt" >
                                            {({ field, form }) => (
                                                <DatePicker
                                                    placeholder="Select Date"
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
                                        invalid={errors.accTaxId && touched.accTaxId}
                                        errorMessage={errors.accTaxId}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="accTaxId"
                                            placeholder="Enter Tax ID"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                      
                                        label={<p>Partner Type <span style={{ color: 'red' }}>{'*'}</span></p>}
                                    invalid={
                                        errors.partnerType && touched.partnerType
                                    }
                                    errorMessage={errors.partnerType}
                                    >
                                        <Field name="partnerType">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select Partner Type"
                                                    field={field}
                                                    form={form}
                                                    options={partnerType}
                                                    value={partnerType.filter(
                                                        (label) =>
                                                            label.value ===
                                                            values.partnerType
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

                                    <FormItem
                                        label={<p>Time Zone <span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.accTimeZone && touched.accTimeZone}
                                        errorMessage={errors.accTimeZone}
                                    >
                                        <Field name="accTimeZone">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select Time Zone"
                                                    field={field}
                                                    form={form}
                                                    options={timeZoneList}
                                                    value={timeZoneList?.filter(
                                                        (label) =>
                                                            label.value ===
                                                            values.accTimeZone
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
                                    <FormItem
                                        label={<p>Currency <span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.accCurrency && touched.accCurrency}
                                        errorMessage={errors.accCurrency}
                                    >
                                        <Field name="accCurrency">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select Currency"
                                                    field={field}
                                                    form={form}
                                                    options={currencyList}
                                                    value={currencyList?.filter(
                                                        (label) =>
                                                            label.value ===
                                                            values.accCurrency
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
                                    <FormItem
                                        label={<p>Language <span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.accLang && touched.accLang}
                                        errorMessage={errors.accLang}
                                    >
                                        <Field name="accLang">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select Language"
                                                    field={field}
                                                    form={form}
                                                    options={language}
                                                    value={language.filter(
                                                        (label) =>
                                                            label.value ===
                                                            values.accLang
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
                                    <FormItem
                                        label={<p>Display Orientation <span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.accOrient && touched.accOrient}
                                        errorMessage={errors.accOrient}
                                    >
                                        <Field name="accOrient">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select Orientation"
                                                    field={field}
                                                    form={form}
                                                    options={orientationtype}
                                                    value={orientationtype.filter(
                                                        (gender) =>
                                                            gender.value ===
                                                            values.accOrient
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
                                    {/* <FormItem
                                        label='API Configuration '
                                    // invalid={errors.apiConfig && touched.apiConfig}
                                    // errorMessage={errors.apiConfig}
                                    >
                                        <Field name="apiConfig">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select API configuration"
                                                    field={field}
                                                    form={form}
                                                    options={apiConfiguration}
                                                    value={apiConfiguration.filter(
                                                        (label) =>
                                                            label.value ===
                                                            values.apiConfig
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
                                    </FormItem> */}

                                    <FieldArray name="fields">
                                        {({ push, remove }) => (
                                            <>

                                                {values.fields.map((item, index) => {
                                                    return (


                                                        <FormItem
                                                            label={
                                                                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                                                    <p style={{ marginRight: '20px' }}>{item.field_title}</p>
                                                                    <Tooltip title={`Remove`}>
                                                                        <span
                                                                            className={`cursor-pointer  text-${'rose'}-800 hover:text-${'rose'}-800`}
                                                                            onClick={() => remove(index)}
                                                                            style={{ marginLeft: 'auto' }}
                                                                        >
                                                                            <RiCloseCircleFill />
                                                                        </span>
                                                                    </Tooltip>
                                                                </div>

                                                            }
                                                        >

                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                placeholder=""
                                                                component={Input}
                                                                name={`fields[${index}].field_value`}
                                                            />

                                                        </FormItem>

                                                    )
                                                })}



                                                <Dialog
                                                    isOpen={dialogIsOpen}
                                                    onClose={onDialogClose}
                                                    onRequestClose={onDialogClose}
                                                    shouldCloseOnOverlayClick={false}
                                                    shouldCloseOnEsc={false}
                                                >
                                                    <FormItem
                                                        label="Field Title"
                                                    >
                                                        <Field
                                                            type="text"
                                                            name="title"
                                                            placeholder="Enter Field Title"
                                                            component={Input}
                                                            value={newLabel}
                                                            onChange={(e) => setNewLabel(e.target.value)}
                                                        />
                                                    </FormItem>
                                                    <div className="text-right mt-6">
                                                        <Button
                                                            className="ltr:mr-2 rtl:ml-2"
                                                            variant="plain"
                                                            onClick={onDialogClose}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button variant="solid" onClick={() => onDialogOk(push, values,)}>
                                                            Okay
                                                        </Button>
                                                    </div>
                                                </Dialog>

                                            </>
                                        )}
                                    </FieldArray>
                                </div>

                            </FormContainer>
                            <div className="mt-2">
                                <Button
                                    type="button"
                                    variant="plain"
                                    className="font-bold"
                                    style={{ color: '#004D99' }}
                                    onClick={() => openDialog()}
                                    disabled = {values.fields[values.fields.length - 1 ]?.field_value == '' ? true : false}
                                    icon={<BsFillPlusCircleFill fill="#004D99" className='' />}
                                >
                                    ADD CUSTOM FIELD
                                </Button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>

        </>
    )
}

export default PartnerAccountInfo
