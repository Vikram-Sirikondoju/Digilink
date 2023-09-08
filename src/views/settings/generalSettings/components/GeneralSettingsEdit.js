import React, { useEffect, useState } from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem, FormContainer, Select, Button, Radio, Checkbox, Alert, } from 'components/ui'


import { Formik, Form, Field, ErrorMessage } from 'formik'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { timeZone } from 'mock/data/timezones'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrency } from '../store/dataSlice'
import { apiCreateGenSettings, apiUpdateGenSettings } from 'services/GenSettings'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile'
import { SettingsEditValuesToFileds } from 'utils/campareandCopy'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'
import { setDateFormat, setLang } from 'store/locale/localeSlice'

const language = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es'},
    { label: 'Arabic', value: 'ar'},
    { label: 'Portuguese', value: 'pt'}
]

const selectDate = [
    { label: "DD-MM-YYYY", value: "DD-MM-YYYY" },
    { label: "MM-DD-YYYY", value: "MM-DD-YYYY" },
    { label: "YYYY-MM-DD", value: "YYYY-MM-DD" },
    { label: "MM-YYYY-DD", value: "MM-YYYY-DD" }
]

const selectTime = [
    { label: "12 hrs", value: "12 hrs" },
    { label: "24 hrs", value: "24 hrs" }
]

const currency = [
    { label: "US Dollars", value: "usdollars" },
    { label: "Euro", value: "euro" },
    { label: "Chinese Yuan", value: "chineseYuan" },
    { label: "Indian Rupees", value: "indianRupees" },
]

const roundoffOptions = [
    { label: 'UP', value: 'up' },
    { label: 'Down', value: 'down' },
]

export const solPriceOptions = [
    { label: 'Inclusive', value: 0 },
    { label: 'Exclusive', value: 1 },
]

const measurementOptions = [
    { label: "CI", value: "ci" },
    { label: "SI", value: "si" }
]

const validationSchema = Yup.object().shape({
    gen_set_lang_pref: Yup.string().required("Please select language preferences").nullable(),
    gen_set_timezone: Yup.string().required("Please select language preferences").nullable(),
    gen_set_date_format: Yup.string().required("Please  select  date format").nullable(),
    gen_set_time_format: Yup.string().required("Please  select  time format").nullable(),
    rel_gen_set_curncy_pref: Yup.string().required("Please  select currency preferences").nullable(),
    gen_set_tokenvalue: Yup.string().required("Please enter no of tokens as per one USD").nullable(),
    // post_ent_cust_wait : Yup.number().typeError("Doesn't look like number").required("Required").nullable(),
    // sales_exec_wait : Yup.number().typeError("Doesn't look like number").required("Required").nullable(),
    // retail_cust_wait : Yup.number().typeError("Doesn't look like number").required("Required").nullable(),
})
const settingInitValues = {
    gen_set_rndoff_val: "",
    gen_set_measr_unit: "",
    gen_set_lang_pref: "",
    gen_set_timezone: "",
    gen_set_date_format: "",
    gen_set_time_format: "",
    rel_gen_set_curncy_pref: "",
    gen_set_tokenvalue: "",
    post_ent_cust_wait: "",
    sales_exec_wait: "",
    retail_cust_wait: "",
    pre_ent_cust_wait: "",

    gen_set_sol: '0',
}

const GeneralSettingsEdit = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [message, setMessage] = useTimeOutMessage()
    const { unq_id } = useSelector((state) => state.auth.user)


    const location = useLocation()
    const mode = location.state?.mode ? location.state.mode : 'ADD'
    const rowForEdit = location.state?.data
    const account = location.state?.account

    const [genSetInitValues, setGenInitValues] = useState({
        ...settingInitValues,
        postEnterPrise: false,
        salesExec: false,
        EntRetPaid: false,
    })
    const [postEnterPrise, setpostEnterPrise] = useState(false)
    const [salesExec, setsalesExec] = useState(false)
    const [EntRetPaid, setEntRetPaid] = useState(false)

    const timeZoneList = timeZone?.map((timezone) => ({ value: timezone.id, label: timezone.value, }))
    const { enterAccount } = useSelector((state) => state.auth.user)
    const currencyList = useSelector((state) => state.genSettings?.data?.currencyList)

    useEffect(() => {
        dispatch(getCurrency({ enterAccount }))
    }, [dispatch, enterAccount])



    useEffect(() => {
        if (rowForEdit && rowForEdit.id) {
            let a = SettingsEditValuesToFileds(rowForEdit, genSetInitValues);
            setGenInitValues(a);
            if (rowForEdit.post_ent_cust_wait) {
                setpostEnterPrise(true);
            }
            if (rowForEdit.sales_exec_wait) {
                setsalesExec(true);
            }
            if (rowForEdit.retail_cust_wait) {
                setEntRetPaid(true);
            }
        } else {
            setGenInitValues(settingInitValues);
            setpostEnterPrise(false);
            setsalesExec(false);
            setEntRetPaid(false);

        }
    }, [rowForEdit, genSetInitValues]);


    const onSaveGeneralSettings = async (values) => {
        let roundOffValue = values.gen_set_rndoff_val === "up"
        let measureValue = values.gen_set_measr_unit === "ci"
        values.gen_set_rndoff_val = roundOffValue
        values.gen_set_measr_unit = measureValue
        values.id = rowForEdit?.id
        values.unq_id = account
        values.gen_set_tax = true
        values.pre_ent_cust_wait = 1;
        values.gen_set_sol = +values.gen_set_sol;

        let resp
        if(rowForEdit?.id == undefined){
            resp = await apiCreateGenSettings(values)
        }else{
            resp = await apiUpdateGenSettings(values)
        }
        if (resp.status === 'success') {
            OpenNotification('success', 'Updated successfully ')
            navigate('/settings-menu-general-settings');
            if(unq_id == account){
                dispatch(setLang(values.gen_set_lang_pref))
                dispatch(setDateFormat(values.gen_set_date_format))
            }
        }
        if (resp.status === 'failed') {
            OpenNotification('warning', 'Something went wrong ')
            setMessage(GetErrorMsg(resp))
        }
    }

    const OnChangeCheckbox = (form, e, input) => {
        if (input === "post_ent_cust_wait") {
            setpostEnterPrise(e)
            form.setFieldValue("post_ent_cust_wait", "")
        }
        if (input === "sales_exec_wait") {
            setsalesExec(e)
            form.setFieldValue("sales_exec_wait", "")
        }
        if (input === "retail_cust_wait") {
            setEntRetPaid(e)
            form.setFieldValue("retail_cust_wait", "")
        }
    }

    const onClickReset = (resetForm) => {
        resetForm()
        setpostEnterPrise(false)
        setsalesExec(false)
        setEntRetPaid(false)
    }
        let breadCrumbList = [{
            name: 'Settings',
             link: "/home"
        }, {
            name: 'General Settings',
            link: "/settings-menu-general-settings"
        }]

        if (mode === "EDIT") {
            breadCrumbList = [
                {
                    name: 'Settings',
                     link: '/home',
                },
                {
                    name: 'General Settings',
                    link: '/settings-menu-general-settings',
                },

                {
                    name: "Edit General Settings"
                },
            ]
        }

    return (
        <>
            {/* <div>Settings/General Settings/Edit General Settings</div><div></div> */}
            <CustomBreadcrumbs list={breadCrumbList} />





            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {Array.isArray(message) ? message.join(", ") : message}
                </Alert>
            )}
            <div className='mt-3'>
                <h3>Edit General Settings</h3>
                <Formik
                    initialValues={genSetInitValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true)
                        onSaveGeneralSettings(values)
                    }}>
                    {({ values, touched, errors, isSubmitting, handleSubmit, resetForm }) => {
                        return (
                            <>
                                <Form onSubmit={handleSubmit}>
                                    <div style={{ backgroundColor: "#F5F5F5", padding: "15px 15px ", marginTop: "10px" }}>
                                    <FormContainer>
                                        <AdaptableCard className="h-full p-4" bodyClass="h-full">
                                                <div className="md:grid grid-cols-2 ml-1 mt-3 ">
                                                    <FormItem label={<p>Roundoff Values<span style={{ color: "red" }}>{'*'}</span></p>}>
                                                        <div className='flex'>
                                                            {roundoffOptions.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <Field className='mr-2' type="radio" autoComplete="off"
                                                                            name='gen_set_rndoff_val' component={Radio} value={item.value} />
                                                                        <div className='mr-3'><label>{item.label}</label></div>
                                                                    </>
                                                                )
                                                            })}
                                                        </div>
                                                    </FormItem>
                                                    <FormItem label={<p>Solution Price</p>}>
                                                        <div className='flex'>
                                                            {solPriceOptions.map((item, index) => {
                                                                return (
                                                                    <>
                                                                        <Field className='mr-2' type="radio" autoComplete="off"
                                                                            name='gen_set_sol' component={Radio} value={item.value?.toString()} />
                                                                        <div className='mr-3'><label>{item.label}</label></div>
                                                                    </>
                                                                )
                                                            })}
                                                        </div>
                                                    </FormItem>
                                                </div>
                                                <div className='md:grid grid-cols-2'>
                                                    <div className='mt-5' style={{ width: "90%" }}>
                                                        <FormItem
                                                            label={<p>Language Preferences<span style={{ color: "red" }}>{'*'}</span></p>}
                                                            invalid={errors.gen_set_lang_pref && touched.gen_set_lang_pref}
                                                            errorMessage={errors.gen_set_lang_pref}
                                                        >
                                                            <Field name="gen_set_lang_pref" style={{ width: "30%", paddingLeft: "10px" }}>
                                                                {({ field, form }) => (
                                                                    <Select placeholder="Select Language" field={field} form={form} options={language}
                                                                        value={language.filter((label) => label.value === values.gen_set_lang_pref)}
                                                                        onChange={(label) => form.setFieldValue(field.name, label.value)}
                                                                    />
                                                                )}
                                                            </Field>
                                                        </FormItem>
                                                    </div>
                                                    <div className='mt-5'>
                                                        <FormItem
                                                            label={<p>Select Measurement Unit<span style={{ color: 'red' }}>{'*'}</span></p>}
                                                        >
                                                            <div className='flex'>
                                                                {measurementOptions.map((item, index) => {
                                                                    return (
                                                                        <>
                                                                            <Field className='mr-2' type="radio" autoComplete="off"
                                                                                name='gen_set_measr_unit' component={Radio} value={item.value} />
                                                                            <div className='mr-3'><label>{item.label}</label></div>
                                                                        </>
                                                                    )
                                                                })}
                                                            </div>
                                                        </FormItem>
                                                    </div>
                                                </div>
                                                <div className='md:grid grid-cols-2'>
                                                    <div className='mt-5 mr-4' style={{ width: "90%" }}>
                                                        <FormItem
                                                            label={<p>Time Zone<span style={{ color: "red" }}>{'*'}</span></p>}
                                                            invalid={errors.gen_set_timezone && touched.gen_set_timezone}
                                                            errorMessage={errors.gen_set_timezone}
                                                        >
                                                            <Field name="gen_set_timezone">
                                                                {({ field, form }) => (
                                                                    <Select placeholder=" Select Time Zone" field={field} form={form} options={timeZoneList}
                                                                        value={timeZoneList.filter((label) => label.value === values.gen_set_timezone)}
                                                                        onChange={(label) => form.setFieldValue(field.name, label.value)}
                                                                    />
                                                                )}
                                                            </Field>
                                                        </FormItem>
                                                    </div>
                                                    <div style={{ display: "flex" }}>
                                                        <div className='mt-5 mr-4'>
                                                            <FormItem
                                                                label={<p>Select Date Format<span style={{ color: "red" }}>{'*'}</span></p>}
                                                                invalid={errors.gen_set_date_format && touched.gen_set_date_format}
                                                                errorMessage={errors.gen_set_date_format}
                                                            >
                                                                <Field name="gen_set_date_format">
                                                                    {({ field, form }) => (
                                                                        <Select placeholder="Select Date Format" field={field} form={form} style={{ width: "50%" }} options={selectDate}
                                                                            value={selectDate.filter((label) => (label.value === values.gen_set_date_format))}
                                                                            onChange={(label) => form.setFieldValue(field.name, label.value)}
                                                                        />
                                                                    )}
                                                                </Field>
                                                            </FormItem>
                                                        </div>
                                                        <div className='mt-5'>
                                                            <FormItem
                                                                label={<p>Select Time Format<span style={{ color: "red" }}>{'*'}</span></p>}
                                                                invalid={errors.gen_set_time_format && touched.gen_set_time_format}
                                                                errorMessage={errors.gen_set_time_format}
                                                            >
                                                                <Field name="gen_set_time_format">
                                                                    {({ field, form }) => (
                                                                        <Select placeholder="Select Time Format" field={field} form={form} style={{ width: "50%" }}
                                                                            options={selectTime}
                                                                            value={selectTime.filter((label) => (label.value === values.gen_set_time_format))}
                                                                            onChange={(label) => form.setFieldValue(field.name, label.value)}
                                                                        />
                                                                    )}
                                                                </Field>
                                                            </FormItem>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='md:grid grid-cols-2'>
                                                    <div className='mt-5' style={{ width: "90%" }}>
                                                        <FormItem
                                                            label={<p>Currency Preferences<span style={{ color: "red" }}>{'*'}</span></p>}
                                                            invalid={errors.rel_gen_set_curncy_pref && touched.rel_gen_set_curncy_pref}
                                                            errorMessage={errors.rel_gen_set_curncy_pref}
                                                        >
                                                            <Field name="rel_gen_set_curncy_pref">
                                                                {({ field, form }) => (
                                                                    <Select placeholder="Select currency" field={field} form={form} style={{ width: "50%" }} options={currencyList}
                                                                        value={currencyList?.filter((label) => (label.value === values.rel_gen_set_curncy_pref))}
                                                                        onChange={(label) => form.setFieldValue(field.name, label.value)}
                                                                    />
                                                                )}
                                                            </Field>
                                                        </FormItem>
                                                    </div>
                                                    <div className='mt-5' style={{ width: "90%" }}>
                                                        <FormItem
                                                            label={<p>One USD = No of Tokens<span style={{ color: "red" }}>{'*'}</span></p>}
                                                            invalid={errors.gen_set_tokenvalue && touched.gen_set_tokenvalue}
                                                            errorMessage={errors.gen_set_tokenvalue}
                                                        >
                                                            <Field type="text" autoComplete="off" placeholder="Enter no of tokens"
                                                                name="gen_set_tokenvalue" component={Input}
                                                            />
                                                        </FormItem>
                                                    </div>
                                                </div>
                                                <div >
                                                    <div className='md:grid grid-cols-1'>
                                                        <h6>Select Customer Type and Duration For Blocking Inventory</h6>
                                                        <div className='flex gap-8 mt-4'>
                                                            <FormItem className='mr-4'>
                                                                <Field name="">
                                                                    {({ field, form }) => (
                                                                        <Checkbox
                                                                            checked={postEnterPrise} onChange={(e) => OnChangeCheckbox(form, e, "post_ent_cust_wait")}
                                                                        />
                                                                    )}
                                                                </Field>
                                                                <label>Enterprise Postpaid</label>
                                                            </FormItem>
                                                            <FormItem className='ml-2 mr-8'>
                                                                <Field name="">
                                                                    {({ field, form }) => (
                                                                        <Checkbox
                                                                            checked={salesExec} onChange={(e) => OnChangeCheckbox(form, e, "sales_exec_wait")}
                                                                        />
                                                                    )}
                                                                </Field>
                                                                <label className=''>Sales Executive</label>
                                                            </FormItem>
                                                            <FormItem className='ml-4'>
                                                                <Field name="">
                                                                    {({ field, form }) => (
                                                                        <Checkbox
                                                                            checked={EntRetPaid} onChange={(e) => OnChangeCheckbox(form, e, "retail_cust_wait")}
                                                                        />
                                                                    )}
                                                                </Field>
                                                                <label className=''>Enterprise & Retail Paid</label>
                                                            </FormItem>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex '>
                                                    <FormItem
                                                    // invalid={errors.post_ent_cust_wait && touched.post_ent_cust_wait}
                                                    // errorMessage={errors.post_ent_cust_wait}
                                                    >
                                                        <Field style={{ width: "80%" }} type="text" autoComplete="off" placeholder="Enter Duration"
                                                            name='post_ent_cust_wait' component={Input} disabled={postEnterPrise ? false : true}
                                                            validate={async (v) => {
                                                                if (postEnterPrise) {
                                                                    try { await Yup.string().required('Required').validate(v); }
                                                                    catch (error) { return error.message; }
                                                                }
                                                            }}
                                                        />
                                                        <ErrorMessage name='post_ent_cust_wait'>{errMsg => <div style={{ color: "red" }}>{errMsg}</div>}</ErrorMessage>
                                                    </FormItem>
                                                    <FormItem
                                                        // invalid={errors.sales_exec_wait && touched.sales_exec_wait}
                                                        errorMessage={errors.sales_exec_wait}
                                                    >
                                                        <Field style={{ width: "80%" }} type="text" autoComplete="off" placeholder="Enter Duration"
                                                            name='sales_exec_wait' component={Input} disabled={salesExec ? false : true}
                                                            validate={async (v) => {
                                                                if (salesExec) {
                                                                    try { await Yup.string().required('Required').validate(v); }
                                                                    catch (error) { return error.message; }
                                                                }
                                                            }}
                                                        />
                                                        <ErrorMessage name='sales_exec_wait'>{errMsg => <div style={{ color: "red" }}>{errMsg}</div>}</ErrorMessage>
                                                    </FormItem>
                                                    <FormItem
                                                        // invalid={errors.retail_cust_wait && touched.retail_cust_wait}
                                                        errorMessage={errors.retail_cust_wait}
                                                    >
                                                        <Field style={{ width: "80%" }} type="text" autoComplete="off" placeholder="Enter Duration"
                                                            name='retail_cust_wait' component={Input} disabled={EntRetPaid ? false : true}
                                                            validate={async (v) => {
                                                                if (EntRetPaid) {
                                                                    try { await Yup.string().required('Required').validate(v) }
                                                                    catch (error) { return error.message; }
                                                                }
                                                            }}
                                                        />
                                                        <ErrorMessage name='retail_cust_wait'>{errMsg => <div style={{ color: "red" }}>{errMsg}</div>}</ErrorMessage>
                                                    </FormItem>
                                                </div>
                                        </AdaptableCard>
                                    </FormContainer>
                                    </div>
                                    <div className="mt-4 text-right flex justify-end">
                                        <>
                                            <Button className="block lg:inline-block md:mb-0 mb-4 mx-2 flex gap-2 text-[#0080FF] border border-[#0080FF]"
                                                style={{ fontStyle: 'normal', fontSize: '18px' }} type="button"
                                                onClick={() => onClickReset(resetForm)}
                                            >
                                                Reset
                                            </Button>
                                            <Link className="block lg:inline-block md:mb-0 mb-4"
                                                to="/settings-menu-general-settings"
                                            >
                                                <Button className="mx-2" variant="solid"
                                                    style={{ backgroundColor: "#4D4D4D", fontStyle: 'normal', fontSize: '18px' }}
                                                >
                                                    Cancel
                                                </Button>
                                            </Link>
                                            <Button variant="solid" type='submit'
                                                style={{ color: "white", fontStyle: 'normal', fontSize: '18px' }}
                                            >
                                                Publish
                                            </Button>
                                        </>
                                    </div>
                                </Form>
                            </>
                        )
                    }}
                </Formik>
            </div >
        </>
    )
}

export default GeneralSettingsEdit;