import {
    Input,

    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Dialog,
    Tooltip,
    Button,
} from 'components/ui'
import { Field, FieldArray, Form, Formik } from 'formik'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import { timeZone } from '../../../../mock/data/timezones'
import { useState } from 'react'
import { RiCloseCircleFill } from 'react-icons/ri'
import { BsFillPlusCircleFill } from 'react-icons/bs'

export const statusOptions = [
    { label: 'Married', value: 'M' },
    { label: 'Widowed', value: 'W' },
    { label: 'Separated', value: 'S' },
    { label: 'Divorced', value: 'D' },
    { label: 'Single ', value: 'S' },
]
const genderOptions = [
    { label: 'Airtel Inc.', value: '5' },
    { label: 'Airtel Inc.', value: '6' },
    { label: 'Airtel India', value: '7' },
]
const orientationtype = [
    { label: 'Right to Left', value: "RTL" },
    { label: 'Left to Right', value: "LTR" },
]

const language = [
    { label: 'English', value: 1 },
    { label: 'Spanish', value: 2 },
    { label: 'Arabic', value: 3 },
    { label: 'Portugese', value: 4 },

]


const currency = [
    { label: 'USD', value: 1 },
    { label: 'EUR', value: 2 },
    { label: 'CAD', value: 3 },
    { label: 'KWD', value: 4 },
    { label: 'INR', value: 5 },
]

const timeZonea = [
    { label: 'India (GMT+5:30)', value: 1 },
    { label: 'USA (GMT-4)', value: 2 },
    { label: 'Chicago (GMT-5)', value: 3 },
    { label: 'Phoenix (GMT-7)', value: 4 },
    { label: 'Los Angeles (GMT-7)', value: 5 },
]

const parentAccount = [
    { label: 'Global MNO', value: 1 },

]

const custCat = [
    { label: 'Premium', value: 1 },
    { label: 'Platinum', value: 2 },
    { label: 'Gold', value: 3 },
    { label: 'Silver', value: 4 },

]

const custOperator = [
    { label: 'Airtel Telangana', value: 1 },
    { label: 'Airtel Mumbai', value: 2 },
    { label: 'Airtel Rajasthan ', value: 3 },

]

const retailAccInitValues = {
    retailId: '', // not in api
    // accMnoParentId: '',
    custName: '',
    customerType: '',
    custCompName: '',
    custIncorpDt: '',
    custTaxId: '',
    custTimeZone: '',
    custCurrency: '',
    custLang: '',
    custOrient: '',

}


const retailValidationSchema = Yup.object().shape({
    //providerId : Yup.string().required('Please Enter Provider Id'),
    //accMnoParentId: Yup.string().required('Please Enter Parent Account'),
    custName: Yup.string().required('Please enter retail customer title').nullable(),
    customerType: Yup.string().required('Please select type operator').nullable(),
    custCompName: Yup.string().required('Please enter company name').nullable(),
    custIncorpDt: Yup.string().required('Please select corporate date').nullable(),
    custTaxId: Yup.string().required('Please enter tax id').nullable(),
    custTimeZone: Yup.string().required('Please select time zone').nullable(),
    custCurrency: Yup.string().required('Please select currency').nullable(),
    custLang: Yup.string().required('Please select language').nullable(),
    custOrient: Yup.string().required('Please enter display orientation').nullable()
})
const RetailAccountInfo = ({ formik, onChange, refId, ...props }) => {

    const currencyList = useSelector((state) => state.retailsList?.data?.currencyList)
    const parentAccountList = useSelector((state) => state.retailsList?.data?.parentAccountList)
    const productCategoryList = useSelector((state) => state.retailsList?.data?.productCatList)
    const custmoerCategoryList = useSelector((state) => state.retailsList?.data?.custmoerCatList)
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
                initialValues={props.retailIntialValues.retailAccInitValues}
                validationSchema={retailValidationSchema}


                onSubmit={(values, { setSubmitting }) => {


                    setSubmitting(true)
                    let updatedPayload = { ...props.retailState, ...values }
                    console.log(RetailAccountInfo.custmoerCategoryLists)

                    props.setRetailState(updatedPayload)
                    let dataToStore = props.retailIntialValues
                    dataToStore.retailAccInitValues = values
                    props.setRetailIntialValues(dataToStore)

                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className="md:grid grid-cols-4 gap-4 mx-4">


                                    <FormItem
                                        label={<p>Retail Customer Title<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={
                                            errors.custName &&
                                            touched.custName
                                        }
                                        errorMessage={errors.custName}
                                    >
                                        <Field

                                            type="text"
                                            autoComplete="off"
                                            name="custName"
                                            placeholder="Enter Retail Customer Title "
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label={<p>Operator<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={
                                            errors.customerType && touched.customerType
                                        }
                                        errorMessage={errors.customerType}
                                    >
                                        <Field name="customerType">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Airtel Inc."
                                                    field={field}
                                                    form={form}
                                                    options={parentAccountList}
                                                    value={parentAccountList?.filter(
                                                        (gender) =>
                                                            gender.value ===
                                                            values.customerType
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
                                        label={<p>Company Name<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={
                                            errors.custCompName &&
                                            touched.custCompName
                                        }
                                        errorMessage={errors.custCompName}
                                    >
                                        <Field

                                            type="text"
                                            autoComplete="off"
                                            name="custCompName"
                                            placeholder="Enter Company Name"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label={<p>Incorporation Date<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={
                                            errors.custIncorpDt &&
                                            touched.custIncorpDt
                                        }
                                        errorMessage={errors.custIncorpDt}

                                    >
                                        <Field name="custIncorpDt" placeholder="Incorporation Date">
                                            {({ field, form }) => (
                                                <DatePicker
                                                placeholder="Select Incorporation Date"
                                                    field={field}
                                                    form={form}
                                                    value={field.value}
                                                    onChange={(custIncorpDt) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            custIncorpDt
                                                        )
                                                    }}
                                                    maxDate={new Date()}
                                                    inputFormat= {dateFormat}
                                                />
                                            )}
                                        </Field>
                                    </FormItem>

                                    <FormItem
                                        label={<p>Tax ID<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.custTaxId && touched.custTaxId}
                                        errorMessage={errors.custTaxId}

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="custTaxId"
                                            placeholder="Enter Tax ID"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>Customer Category</p>}

                                    >
                                        <Field name="custCat">
                                            {({ field, form }) => (
                                                <Select

                                                    placeholder="Select Customer Category"
                                                    field={field}
                                                    form={form}
                                                    options={custmoerCategoryList}
                                                    value={custmoerCategoryList?.filter(
                                                        (gender) =>
                                                            gender.value ===
                                                            values.custCat
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
                                        label={<p>Time Zone<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={
                                            errors.custTimeZone && touched.custTimeZone
                                        }
                                        errorMessage={errors.custTimeZone}

                                    >
                                        <Field name="custTimeZone">
                                            {({ field, form }) => (
                                                <Select
                                                    value={timeZoneList?.filter(
                                                        (gender) =>
                                                            gender.value ===
                                                            values.custTimeZone
                                                    )}
                                                    placeholder="Select Type"
                                                    field={field}
                                                    form={form}
                                                    options={timeZoneList}
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
                                        label={<p>Currency<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={
                                            errors.custCurrency && touched.custCurrency
                                        }
                                        errorMessage={errors.custCurrency}

                                    >
                                        <Field name="custCurrency">
                                            {({ field, form }) => (
                                                <Select
                                                    value={currencyList?.filter(
                                                        (gender) =>
                                                            gender.value ===
                                                            values.custCurrency
                                                    )}
                                                    placeholder="Select Type"
                                                    field={field}
                                                    form={form}
                                                    options={currencyList}
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
                                        label={<p>Language<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={
                                            errors.custLang && touched.custLang
                                        }
                                        errorMessage={errors.custLang}
                                    >
                                        <Field name="custLang">
                                            {({ field, form }) => (
                                                <Select
                                                    value={language.filter(
                                                        (gender) =>
                                                            gender.value ===
                                                            values.custLang
                                                    )}
                                                    placeholder="Select Type"
                                                    field={field}
                                                    form={form}
                                                    options={language}
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
                                        label={<p> Orientation<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={
                                            errors.custOrient &&
                                            touched.custOrient
                                        }
                                        errorMessage={errors.custOrient}

                                    >
                                        <Field name="custOrient">
                                            {({ field, form }) => (
                                                <Select
                                                    value={orientationtype.filter(
                                                        (gender) =>
                                                            gender.value ===
                                                            values.custOrient
                                                    )}
                                                    placeholder="Select Type"
                                                    field={field}
                                                    form={form}
                                                    options={orientationtype}
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
                                    disabled={values.fields[values.fields.length - 1]?.field_value == '' ? true : false}
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

export default RetailAccountInfo
