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
import { Field, FieldArray, Form, Formik } from 'formik'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { timeZone } from '../../../../mock/data/timezones'
import { useEffect, useState } from 'react'
import { getParenOperator, getParentAccount, setSelectedParentOperator } from '../store/dataSlice'
import { RiCloseCircleFill } from 'react-icons/ri'

export const statusOptions = [
    { label: 'Married', value: '1' },
    { label: 'Widowed', value: '2' },
    { label: 'Separated', value: '3' },
    { label: 'Divorced', value: '3' },
    { label: 'Single ', value: '4' },
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
    { label: 'USD', value: 0 },
    { label: 'EUR', value: 1 },
    { label: 'CAD', value: 2 },
    { label: 'KWD', value: 3 },
    { label: 'INR', value: 4 },
]

const timeZone111 = [
    { label: 'India (GMT+5:30)', value: 0 },
    { label: 'USA (GMT-4)', value: 1 },
    { label: 'Chicago (GMT-5)', value: 2 },
    { label: 'Phoenix (GMT-7)', value: 3 },
    { label: 'Los Angeles (GMT-7)', value: 4 },
]

const parentAccount = [
    { label: 'Global MNO', value: 1 },

]

const custCat = [
    { label: 'Premium', value: "0" },
    { label: 'Platinum', value: "1" },
    { label: 'Gold', value: "2" },
    { label: 'Silver', value: "3" },

]



const enterpriseValidationSchema = Yup.object().shape({
    //providerId : Yup.string().required('Please Enter Provider Id'),
    // accMnoParentId: Yup.string().required('Please Enter Parent Account'),
    custName: Yup.string().min(2, "Customer title must be at least 2 characters").max(100).required('Please enter a valid enterprise customer title'),
    customerType: Yup.string().required('Please Select Type'),
    custCompName: Yup.string().min(2, "Company name must be at least 2 characters").max(100).required('Please enter company name'),
    custIncorpDt: Yup.string().required('Please select incorporate date'),
    custTaxId: Yup.string().min(1).max(50).required('Please enter tax id'),
    custTimeZone: Yup.string().required('Please select time zone'),
    custCurrency: Yup.string().required('Please select currency'),
    custLang: Yup.string().required('Please select language'),
    custOrient: Yup.string().required('Please select display orientation'),
    custCat: Yup.string().required('Please select a customer category').nullable(),
})
const EnterpriseAccountInfo = ({ formik, onChange, refId, ...props }) => {

    const dispatch = useDispatch()

    const [accOperatorId, setOperatorId] = useState()

    const currencyList = useSelector((state) => state.enterpriseList?.data?.currencyList)
    const parentAccountList = useSelector((state) => state.enterpriseList?.data?.parentAccountList)
    const custmoerCategoryList = useSelector((state) => state.enterpriseList?.data?.custmoerCatList)
    const dateFormat = useSelector((state) => state.locale.dateFormat)

    const operatorAccountList = useSelector((state) => state.enterpriseList?.data?.operatorAccountList)

    const timeZoneList = timeZone?.map((timezone) => ({
        value: timezone.id,
        label: timezone.value,
    }))
    const selectedParentOperator = useSelector((state) => state.enterpriseList?.data?.selectedParentOperator)


    // useEffect(() => {
    //     if (formik.isValidating && !formik.isValid) {
    //       formik.setTouched(formik.errors, true);
    //     }
    //   }, [formik.isValidating, formik.isValid, formik.errors]);

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
    // useEffect(() => {
    //     dispatch(getParentAccount({ accMnoParentId: accOperatorId }))


    // }, [accOperatorId, dispatch])

    const handleDropdownChange = (field, form, gender) => {
        form.setFieldValue(field.name, gender.value)
        setOperatorId(gender.acc_unq_id);
        dispatch(setSelectedParentOperator(gender.acc_unq_id))

    };


    useEffect(() => {

        if (selectedParentOperator) {
            dispatch(getParentAccount({ accMnoParentId: selectedParentOperator }))

        }

    }, [accOperatorId, dispatch, selectedParentOperator]);
    console.log(selectedParentOperator, "selectedParentOperator")
    return (
        <>

            <h3 className="mx-4 mb-4 mt-2">ACCOUNT INFO</h3>

            <Formik
                innerRef={refId}
                initialValues={props.EpIntialValues.entAccInfo}
                validationSchema={enterpriseValidationSchema}


                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)

                    let updatedPayload = { ...props.enterpriseState, ...values }
                    props.setEnterpriseState(updatedPayload)
                    let dataToStore = props.EpIntialValues
                    dataToStore.entAccInfo = values
                    props.setEpIntialValues(dataToStore)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className="md:grid grid-cols-4 gap-4 mx-4">


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
                                                    options={operatorAccountList}
                                                    value={operatorAccountList?.filter(
                                                        (gender) =>
                                                            gender.value ===
                                                            values.customerType
                                                    )}

                                                    onChange={(gender) => { handleDropdownChange(field, form, gender) }
                                                    }


                                                />
                                            )}
                                        </Field>
                                    </FormItem>

                                    <FormItem
                                        label={<p>Parent Account</p>}
                                    >
                                        <Field name="accMnoParentId">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Global Mno"
                                                    field={field}
                                                    form={form}
                                                    options={parentAccountList}
                                                    value={parentAccountList?.filter(
                                                        (gender) =>
                                                            gender.value ===
                                                            values.accMnoParentId
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
                                        label={<p>Enterprise Customer Title<span style={{ color: 'red' }}>{'*'}</span></p>}

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
                                            placeholder="Enter Enterprise Customer Title"
                                            component={Input}
                                        />
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
                                        label={<p>Display Orientation<span style={{ color: 'red' }}>{'*'}</span></p>}
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
                                    <FormItem
                                        label={<p>Customer Category<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.custCat && touched.custCat}
                                        errorMessage={errors.custCat}
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

export default EnterpriseAccountInfo
