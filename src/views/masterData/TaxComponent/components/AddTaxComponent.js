import { AdaptableCard, RichTextEditor } from 'components/shared'

import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Radio,
    Checkbox,
    Alert
} from 'components/ui'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile'
import { apiCreateTaxComp, apiUpdateTaxCompValue } from 'services/TaxComponentService'
import { EditandCopyTaxComp } from 'utils/campareandCopy'
import { useDispatch, useSelector } from 'react-redux'
import { getParentAccount } from '../store/dataSlice'
import ReactHtmlParser from 'html-react-parser'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'


const placementList = [
    { name: 'Fixed', value: 'Fixed' },
    { name: 'Percentage', value: 'Percentage' },

]

const validationSchemaforCheckbox = Yup.object().shape({
    Checkout: Yup.boolean(),
    Payments: Yup.boolean(),
    Settlements: Yup.boolean(),
}).test('checkbox-required', 'Please select at the customer type', function (value) {

    const isCheckoutSelected = value.Checkout;
    const isPaymentsSelected = value.Payments;
    const isSettlementsSelected = value.Settlements;
    const isAtLeastOneSelected = isCheckoutSelected || isPaymentsSelected || isSettlementsSelected;
    return isAtLeastOneSelected;
}).nullable()

const AddTaxComponent = (props) => {


    const formikRef = useRef()
    const location = useLocation();
    const mode = location.state?.mode ? location.state.mode : "ADD";
    const rowForEdit = location.state?.data;
    const [placement, setPlacement] = useState(rowForEdit ? rowForEdit.tax_comp_ded_type : '');

    const onPlacementChange = (e) => {
        setPlacement(e);
    };
    // const PriceInput = (props) => {
    //     return <Input {...props} value={props.field.value} suffix="%" />
    // }

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const validationSchema = Yup.object().shape({

        title: Yup.string().trim().required("Please enter tax title").nullable(),
        // description: Yup.string().required("Please enter description").nullable(),
       // acc_unq_id: Yup.string().required("Please enter operator").nullable(),


    })

    let appModules = {
        'checkout': false,
        'payments': false,
        'settlements': false
    }

    let initialValues = {
        title: "",
        description: "",
        // app_modules: appModules,
        app_modules: {
            Checkout: false,
            Payments: false,
            settlements:false,
        },
        placement: "",
        acc_unq_id: ""
    }

    const parentAccountList = useSelector((state) => state.TaxComponentList?.data?.parentAccountList)


    const {
        unq_id, user_type
    } = useSelector((state) => state?.auth?.user)

    const [message, setMessage] = useTimeOutMessage()

    const checkBoxString = rowForEdit && rowForEdit.app_modules ? JSON.parse(rowForEdit.app_modules) : appModules;

    const [taxCompInitVal, setInitValues] = useState(EditandCopyTaxComp(initialValues, rowForEdit ? rowForEdit : initialValues))

    const [checkboxValues, setCheckboxValues] = useState(checkBoxString);

    const { enterAccount, acc_mno_id } = useSelector((state) => state.auth.user)


    useEffect(() => {
        if (rowForEdit) {

            const taxCompEditIntialValues = EditandCopyTaxComp(taxCompInitVal, rowForEdit);

            setInitValues(taxCompEditIntialValues)

        }

    }, [mode, taxCompInitVal])

    useEffect(() => {
        dispatch(getParentAccount({ enterAccount }))

    }, [dispatch, enterAccount])

    const handleCheckboxChange = async (event, name) => {

        setCheckboxValues((prevValues) => ({
            ...prevValues,
            [name]: event.target.checked
        }));
    };
    const submitApi = async (values) => {

        let intialValues = {
            title: values.title,
            app_modules: checkboxValues,
            description: values.description,
            acc_unq_id: values.acc_unq_id
        }

        setInitValues(intialValues)
        // formikRef.current.handleSubmit()
        // const tax_comp_desc = ReactHtmlParser(values?.description);
        let payload = {
            "tax_comp_title": values.title.trim(),
            "app_modules": JSON.stringify(intialValues.app_modules),
            "tax_comp_desc": values?.description,   
            "md_tax_status": "ACTIVE",
            "tax_comp_ded_type": placement,
            "dgl_acc_mno_id": acc_mno_id,
            "tax_value": "30",
            // "unq_id": values.acc_unq_id,
            "unq_id": user_type !== "GlobalMno" ? enterAccount : values.acc_unq_id
        }

        if (mode === "ADD") {
            const resp = await apiCreateTaxComp(payload)
            if (resp.status === 'success') {
                OpenNotification('success', 'Created successfully ')
                navigate('/masterDataMenu-item-view-4')
            } else if (resp.status === 'failed') {
                setMessage(GetErrorMsg(resp));
            }
        } else if (mode === "EDIT") {
            payload.id = rowForEdit.id

            payload.unq_id = user_type !== "GlobalMno" ? enterAccount : values.acc_unq_id
            const resp = await apiUpdateTaxCompValue(payload, rowForEdit.id)
            if (resp.status === 'success') {
                OpenNotification('success', 'Updated successfully')

                navigate('/masterDataMenu-item-view-4')

            } else if (resp.status === 'failed') {
                setMessage(GetErrorMsg(resp));
            }
        }
    }

  


    const validateCheckBox = async (passedValue) => {

        try {
            await validationSchemaforCheckbox.validate({ ...checkboxValues });
        } catch (error) {
            return error.message;
        }

    }

    let  breadCrumbList=[{
        name:'Master Data',
         link:"/home"
    },
    {
        name:'Tax Component',
        link:"/masterDataMenu-item-view-4"
    },
    {
        name: `Add Tax Component`,
    }]
    
    
    if(mode==="EDIT"){
    breadCrumbList = [
        {
            name:'Master Data',
             link:"/home"
        },
        {
            name:'Tax Component',
            link:"/masterDataMenu-item-view-4"
        },
        {
          name: rowForEdit?.tax_comp_title,
          link: '/masterDataMenu-item-view-4',
          state:rowForEdit
      },
        {
            name: `Edit Tax Component`,
        },
    
    
    ]
    }

    return (
        <>
            {message && <Alert className="mb-4" type="danger" showIcon>
                {message}
            </Alert>}

            <div>
            <div className='mb-3'>
                {/* Master Data / Tax Component / Add Tax Component */}
                <CustomBreadcrumbs  list={breadCrumbList} />
                </div>
                <h3 className='mb-5'>{mode === "EDIT" ? "Edit " : "Create "}Tax Component</h3>

                <Formik
                    innerRef={formikRef}
                    initialValues={taxCompInitVal}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        // if (placement != "" && (checkboxValues.checkout || checkboxValues.payments || checkboxValues.settlements)) {
                            setSubmitting(true)
                            submitApi(values)
                        // } else {
                        //     placement == "" ? OpenNotification("warning", "Please select deduction type") :
                        //         OpenNotification("warning", "Please select at least one of the applicable modules")
                        // }
                    }}
                >
                    {({ values, touched, errors, isSubmitting }) => {
                        return (
                            <Form>
                                <div className="p-5" style={{ backgroundColor: "#F5F5F5" }}>
                                    <AdaptableCard className="h-full" bodyClass="h-full" divider>
                                        <FormContainer>
                                            <div>
                                                <div className="md:grid gap-4 mx-4 pl-2">
                                                    <div className='md:grid grid-cols-2 gap-4'>
                                                        {/* <FormItem
                                                            label={<p>Operator <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                            invalid={
                                                                errors.acc_unq_id && touched.acc_unq_id
                                                            }
                                                            errorMessage={errors.acc_unq_id}
                                                        >
                                                            <Field name="acc_unq_id" >
                                                                {({ field, form }) => (
                                                                    <Select
                                                                        isDisabled={user_type !== "GlobalMno" ? true : false}
                                                                        placeholder="Select Operator"
                                                                        field={field}
                                                                        form={form}
                                                                        options={parentAccountList}
                                                                        value={user_type !== "GlobalMno" ? parentAccountList?.filter(
                                                                            (label) =>
                                                                                label.acc_unq_id === enterAccount
                                                                        ) : parentAccountList?.filter(
                                                                            (label) =>
                                                                                label.acc_unq_id === values.acc_unq_id
                                                                        )}
                                                                        onChange={(label) =>
                                                                            form.setFieldValue(
                                                                                field.name,
                                                                                label.acc_unq_id
                                                                            )
                                                                        }
                                                                    />
                                                                )}
                                                            </Field>
                                                        </FormItem> */}
                                                        <FormItem
                                                            label={<p>Operator <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                            invalid={
                                                                errors.acc_unq_id && touched.acc_unq_id
                                                            }
                                                            errorMessage={errors.acc_unq_id}
                                                        >
                                                            <Field name="acc_unq_id"  validate={async (passedValue) => {
                                                                    if (user_type === "GlobalMno") {
                                                                        try {
                                                                            await Yup.string().required('Please enter operator').validate(passedValue);
                                                                        } catch (error) {
                                                                            return error.message;
                                                                        }
                                                                    }
                                                                }} >
                                                                {({ field, form }) => (
                                                                    <Select
                                                                        isDisabled={user_type !== "GlobalMno" ? true : false}
                                                                        placeholder="Select Operator"
                                                                        field={field}
                                                                        form={form}
                                                                        options={parentAccountList}
                                                                        value={user_type !== "GlobalMno" ? parentAccountList?.filter(
                                                                            (label) =>
                                                                                label.acc_unq_id === enterAccount
                                                                        ) : parentAccountList?.filter(
                                                                            (label) =>
                                                                                label.acc_unq_id === values.acc_unq_id
                                                                        )}
                                                                        onChange={(label) =>
                                                                            form.setFieldValue(
                                                                                field.name,
                                                                                label.acc_unq_id
                                                                            )
                                                                        }
                                                                    />
                                                                  
                                                                )
                                                               
                                                                }
                                                               
                                                            </Field>
                                                        </FormItem>
                                                    </div>
                                                    <div className='md:grid grid-cols-2 gap-4'>
                                                    <FormItem
                                                        label={<p>Tax Title<span style={{ color: 'red' }}>{'*'}</span></p>}
                                                        className=''
                                                        invalid={errors.title && touched.title}
                                                        errorMessage={errors.title}
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="title"
                                                            placeholder="Enter Tax Title"
                                                            component={Input}
                                                            // className='w-1/3'
                                                       
                                                        />
                                                    </FormItem>
                                                    </div>
                                                    <FormItem
                                                        label={<p>Deduction Type<span style={{ color: 'red' }}>{'*'}</span></p>}
                                                    >
                                                        <Radio.Group value={placement} onChange={onPlacementChange}>
                                                            {placementList.map((item) => (
                                                                <Radio value={item.value} id={item.value} key={item.value}>
                                                                    {item.name}
                                                                </Radio>
                                                            ))}
                                                        </Radio.Group>
                                                    </FormItem>
                                                    <FormItem
                                                        label="Description"
                                                        className=''
                                                    // invalid={errors.description && touched.description}
                                                    // errorMessage={errors.description}
                                                    >
                                                        <Field name="description"  >
                                                            {({ field, form }) => (
                                                                <RichTextEditor style={{ width: "60%" }}
                                                                    value={field.value}
                                                                    onChange={(val) =>
                                                                        form.setFieldValue(field.name, val)
                                                                    }
                                                                />
                                                            )}
                                                        </Field>


                                                    </FormItem>
                                                    <FormItem
                                                            label={<p>Applicable Modules<span style={{ color: 'red' }}>{'*'}</span></p>}
                                                            invalid={touched.app_modules && (checkboxValues["Checkout"] || checkboxValues["Payments"] || checkboxValues["Settlements"]) !== true}
                                                            errorMessage={"Please select at least one of the applicable modules"}
                                                        >
                                                            <div className="flex mt-2">
                                                                <div className='flex'>

                                                                    <p style={{ display: "flex", marginTop: "2%", marginLeft:"3px", }} > <Field className='h-5 w-5'

                                                                        type="checkbox"
                                                                        name="app_modules.Checkout" // Match the name used in Yup validation schema
                                                                        checked={checkboxValues["Checkout"]}
                                                                        onChange={(e) => handleCheckboxChange(e, "Checkout")}
                                                                        validate={validateCheckBox}
                                                                    />
                                                                        <label className='ml-2 ' htmlFor="app_modules.Checkout">Checkout</label>
                                                                    </p>
                                                                </div>
                                                                <div className='flex ml-3'>
                                                                    <p  style={{ display: "flex", marginTop: "2%", marginLeft:"3px", }} >
                                                                        <Field
                                                                        className='h-5 w-5'
                                                                            type="checkbox"
                                                                            name="app_modules.Payments" // Match the name used in Yup validation schema
                                                                            checked={checkboxValues["Payments"]}
                                                                            onChange={(e) => handleCheckboxChange(e, "Payments")}
                                                                            validate={validateCheckBox}
                                                                        />
                                                                        <label className='ml-2' htmlFor="app_modules.Payments">Payments</label>
                                                                    </p>

                                                                </div>
                                                                <div className='flex ml-3'>
                                                                    <p  style={{ display: "flex", marginTop: "2%", marginLeft:"3px", }} >
                                                                        <Field
                                                                        className='h-5 w-5'
                                                                            type="checkbox"
                                                                            name="app_modules.Settlements" // Match the name used in Yup validation schema
                                                                            checked={checkboxValues["Settlements"]}
                                                                            onChange={(e) => handleCheckboxChange(e, "Settlements")}
                                                                            validate={validateCheckBox}
                                                                        />
                                                                        <label className='ml-2' htmlFor="app_modules.Settlements">Settlements</label>
                                                                    </p>

                                                                </div>
                                                            </div>
                                                        </FormItem>
                                                </div>
                                            </div>
                                        </FormContainer>
                                    </AdaptableCard>
                                </div>
                                <div className=" pt-4 text-right w-full flex justify-end" >
                                    <Link
                                        className="block lg:inline-block md:mb-0 mb-4"
                                        to="/masterDataMenu-item-view-4"
                                    >
                                        <Button
                                            type='button'
                                            className="mx-2"
                                            style={{
                                                backgroundColor: "#4D4D4D",
                                                fontStyle: 'normal',
                                                fontSize: '18px'
                                            }}
                                            variant="solid"
                                        >
                                            Cancel
                                        </Button>
                                    </Link>

                                    <Button type='submit' variant='solid' style={{
                                        fontStyle: 'normal',
                                        fontSize: '18px',
                                    }} >
                                        {'Submit'}
                                    </Button>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>

        </>
    )
}

export default AddTaxComponent
