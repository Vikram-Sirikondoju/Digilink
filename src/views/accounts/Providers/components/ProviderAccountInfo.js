import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Tooltip,
    Dialog
} from 'components/ui'
import { Field, Form, Formik, FieldArray } from 'formik'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
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

const operator = [
    { label: 'Airtel Telangana', value: 1 },
    { label: 'Airtel Mumbai', value: 2 },
    { label: 'Airtel Rajasthan ', value: 3 },
]
const genderOptions = [
    { label: 'Airtel Inc.', value: 0 },
    { label: 'Airtel Inc.', value: 1 },
    { label: 'Airtel India', value: 2 },
]
const language = [
    { label: 'English', value: 1 },
    { label: 'Spanish', value: 2 },
    { label: 'Arabic', value: 3 },
    { label: 'Portugese', value: 4 },

]

const currency = [
    { label: 'USD', value: 0 },
    { label: 'EUR', value: 1 },
    { label: 'CAD', value: 2 },
    { label: 'KWD', value: 3 },
    { label: 'INR', value: 4 },
]

const timeZonea = [
    { label: 'India (GMT+5:30)', value: 0 },
    { label: 'USA (GMT-4)', value: 1 },
    { label: 'Chicago (GMT-5)', value: 2 },
    { label: 'Phoenix (GMT-7)', value: 3 },
    { label: 'Los Angeles (GMT-7)', value: 4 },
]

const productCategory = [
    { label: 'Sensors', value: 0 },
    { label: 'GPS Trackers', value: 1 },
    { label: 'Smart security system', value: 2 },
    { label: 'Smart mobiles', value: 3 },
]

const orientationtype = [
    { label: 'Right to left', value: 'RTL' },
    { label: 'Left to right', value: 'LTR' },
]
const provAccInitValues = {
    providerId: '', // not in api
    accName: '',
    accType: '',
    accCompName: '',
    accIncorpDt: '',
    accTaxId: '',
    prodCategory: '',
    accTimeZone: '',
    accCurrency: '',
    accLang: '',
    accOrient: '',
}

const provValidationSchema = Yup.object().shape({
    //providerId : Yup.string().required('Please Enter Provider Id'),
    accName: Yup.string().min(2, "Title must be at least 2 characters").max(100).required('Please enter a valid provider title').nullable(),
    accType: Yup.string().required('Please select an operator ').nullable(),
    accCompName: Yup.string().required('Please enter company name').min(2, "Name must be at least 2 characters").max(100).nullable(),
    accIncorpDt: Yup.string().required('Please select Incorporation  date').nullable(),
    accTaxId: Yup.string().min(1).max(50).required('Please enter tax id').nullable(),
    prodCategory: Yup.string().required('Please select a product category ').nullable(),
    accTimeZone: Yup.string().required('Please select time zone').nullable(),
    accCurrency: Yup.string().required('Please select currency').nullable(),
    accLang: Yup.string().required('Please select language').nullable(),
    accOrient: Yup.string().required('Please select orientation').nullable(),
})

const ProviderAccountInfo = ({ onChange, refId, ...props }) => {

    const currencyList = useSelector((state) => state.providerList?.data?.currencyList)
    const parentAccountList = useSelector((state) => state.providerList?.data?.parentAccountList)
    const productCategoryList = useSelector((state) => state.providerList?.data?.productCatList)
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
            push({ field_title: newLabel, field_value: '',field_type:'ACCOUNT', })
            setNewLabel('')
            setIsOpen(false)
        }
    }


    // const {provAccInitValues,provValidationSchema,onSubmitting} = props
    return (
        <>
            <h3 className="mx-4 mb-4 mt-2">ACCOUNT INFO</h3>
            <Formik
                innerRef={refId}
                initialValues={props.provideIntialValues.accInfo}
                validationSchema={provValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    let updatedPayload = { ...props.providerState, ...values }

                    props.setProviderState(updatedPayload)

                    let dataToStore = props.provideIntialValues
                    dataToStore.accInfo = values
                    props.setProviderIntialValues(dataToStore)
                }}
            >
                {({ errors, touched, handleSubmit, values }) => {
                    return (
                        <Form onSubmit={handleSubmit} autoComplete="off">
                            <FormContainer>
                                <div className="md:grid grid-cols-4 gap-4 mx-4">
                                    <FormItem
                                        label={
                                            <p>
                                                Provider Title
                                                <span style={{ color: 'red' }}>
                                                    {'*'}
                                                </span>
                                            </p>
                                        }
                                        invalid={
                                            errors.accName && touched.accName
                                        }
                                        errorMessage={errors.accName}
                                    >
                                        <Field
                                            value={values.accName}
                                            type="text"
                                            autoComplete="off"
                                            name="accName"
                                            placeholder="Enter Provider Title"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={
                                            <p>
                                                Operator
                                                <span style={{ color: 'red' }}>
                                                    {'*'}
                                                </span>
                                            </p>
                                        }
                                        invalid={
                                            errors.accType && touched.accType
                                        }
                                        errorMessage={errors.accType}
                                    >
                                        <Field name="accType">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select An Operator"
                                                    field={field}
                                                    form={form}
                                                    options={parentAccountList}
                                                    onChange={(operator) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            operator.value
                                                        )
                                                    }
                                                    value={parentAccountList?.filter(
                                                        (operator) =>
                                                            operator.value ===
                                                            values.accType
                                                    )}
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        label={
                                            <p>
                                                Company Name
                                                <span style={{ color: 'red' }}>
                                                    {'*'}
                                                </span>
                                            </p>
                                        }
                                        invalid={
                                            errors.accCompName &&
                                            touched.accCompName
                                        }
                                        errorMessage={errors.accCompName}
                                    >
                                        <Field
                                            value={values.accCompName}
                                            type="text"
                                            autoComplete="off"
                                            name="accCompName"
                                            placeholder="Enter Company Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={
                                            <p>
                                                Incorporation Date
                                                <span style={{ color: 'red' }}>
                                                    {'*'}
                                                </span>
                                            </p>
                                        }
                                        invalid={
                                            errors.accIncorpDt &&
                                            touched.accIncorpDt
                                        }
                                        errorMessage={errors.accIncorpDt}
                                    >
                                        <Field name="accIncorpDt">
                                            {({ field, form }) => (
                                                <DatePicker
                                                    value={values.accIncorpDt}
                                                    placeholder="Select Date"
                                                    field={field}
                                                    form={form}
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
                                        label={
                                            <p>
                                                Tax ID
                                                <span style={{ color: 'red' }}>
                                                    {'*'}
                                                </span>
                                            </p>
                                        }
                                        invalid={
                                            errors.accTaxId && touched.accTaxId
                                        }
                                        errorMessage={errors.accTaxId}
                                    >
                                        <Field
                                            value={values.accTaxId}
                                            type="text"
                                            autoComplete="off"
                                            name="accTaxId"
                                            placeholder="Enter Tax ID"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={
                                            <p>
                                                Item Category
                                                <span style={{ color: 'red' }}>
                                                    {'*'}
                                                </span>
                                            </p>
                                        }
                                        invalid={
                                            errors.prodCategory &&
                                            touched.prodCategory
                                        }
                                        errorMessage={errors.prodCategory}
                                    >
                                        <Field name="prodCategory">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select Item Category"
                                                    field={field}
                                                    form={form}
                                                    options={productCategoryList}
                                                    onChange={(
                                                        productCategory
                                                    ) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            productCategory.value
                                                        )
                                                    }
                                                    value={productCategoryList?.filter(
                                                        (productCategory) =>
                                                            productCategory.value ===
                                                            values.prodCategory
                                                    )}
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        label={
                                            <p>
                                                Time Zone
                                                <span style={{ color: 'red' }}>
                                                    {'*'}
                                                </span>
                                            </p>
                                        }
                                        invalid={
                                            errors.accTimeZone &&
                                            touched.accTimeZone
                                        }
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
                                                        (timeZone) =>
                                                            timeZone.value ===
                                                            values.accTimeZone
                                                    )}
                                                    onChange={(timeZone) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            timeZone.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        label={
                                            <p>
                                                Currency
                                                <span style={{ color: 'red' }}>
                                                    {'*'}
                                                </span>
                                            </p>
                                        }
                                        invalid={
                                            errors.accCurrency &&
                                            touched.accCurrency
                                        }
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
                                                        (currency) =>
                                                            currency.value ===
                                                            values.accCurrency
                                                    )}
                                                    onChange={(currency) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            currency.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        label={
                                            <p>
                                                Language
                                                <span style={{ color: 'red' }}>
                                                    {'*'}
                                                </span>
                                            </p>
                                        }
                                        invalid={
                                            errors.accLang && touched.accLang
                                        }
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
                                                        (language) =>
                                                            language.value ===
                                                            values.accLang
                                                    )}
                                                    onChange={(language) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            language.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        label={
                                            <p>
                                                Display Orientation
                                                <span style={{ color: 'red' }}>
                                                    {'*'}
                                                </span>
                                            </p>
                                        }
                                        invalid={
                                            errors.accOrient &&
                                            touched.accOrient
                                        }
                                        errorMessage={errors.accOrient}
                                    >
                                        <Field name="accOrient">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select Display Orientation"
                                                    field={field}
                                                    form={form}
                                                    options={orientationtype}
                                                    value={orientationtype.filter(
                                                        (orientationtype) =>
                                                            orientationtype.value ===
                                                            values.accOrient
                                                    )}
                                                    onChange={(
                                                        orientationtype
                                                    ) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            orientationtype.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
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
                                    icon={<BsFillPlusCircleFill fill="#004D99" className='' />}
                                    disabled = {values.fields[values.fields.length - 1 ]?.field_value == '' ? true : false}
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

export default ProviderAccountInfo
