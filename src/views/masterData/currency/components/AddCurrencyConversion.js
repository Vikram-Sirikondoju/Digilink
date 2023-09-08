import { AdaptableCard } from 'components/shared'
import React, { useEffect, useRef, useState } from 'react'
import {
    Input,
    FormItem,
    FormContainer,
    Button,
    Alert,
    Select
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile'
import { apiCreateCurrency, apiUpdateCurrency } from 'services/CurrencyService'
import { CurrencyEditandCopy } from 'utils/campareandCopy'
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux'
import { getCurrAccount } from '../store/dataSlice'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'



let validationSchema = Yup.object().shape({
    // acc_unq_id: Yup.string().required('Please select operator').nullable(),
    curTitle: Yup.string().trim().required('Please enter currency name').nullable(),
    curSymbol: Yup.string().required('Please enter currency symbol').nullable(),
    curConvRate: Yup.string().required('Please enter conversion rate').nullable(),

})

const AddCurrencyConversion = () => {
    let intialValues = {
        curTitle: "",
        curSymbol: "",
        curConvRate: "",
        oneUsd: "",
        acc_unq_id: ""

    }
    const dispatch = useDispatch()
    const [message, setMessage] = useTimeOutMessage()
    const [currState, setCurrState] = useState()
    const formikRef = useRef()
    const location = useLocation();
    const mode = location.state?.mode ? location.state.mode : "ADD";
    const rowForEdit = location.state?.data;
    const navigate = useNavigate()
    const currAccountList = useSelector((state) => state.CurrencyList?.data?.currAccountList)

    const {
        enterAccount,
        password,
        rememberMe,
        usernameOrEmail,
        acc_mno_parent_unq_id,
        unq_id,
        user_type
    } = useSelector((state) => state?.auth?.user)

    const [initValues, setInitValues] = useState(rowForEdit ? CurrencyEditandCopy(intialValues, rowForEdit) : intialValues)

    const submitApi = async (data) => {


        let Payload = {
            "is_default": true,
            "cur_title": data.curTitle.trim(),
            "md_curr_status": "ACTIVE",
            "cur_symbol": data.curSymbol,
            "cur_conv_rate": data.curConvRate,
            "one_usd": data.oneUsd,
            "unq_id": user_type !== "GlobalMno" ? enterAccount : data.acc_unq_id
        }
        if (mode === "ADD") {
            const resp = await apiCreateCurrency(Payload)
            if (resp.status === 'success') {
                OpenNotification('success', 'Created successfully ')
                navigate('/masterDataMenu-item-view-5')


            }

            if (resp.status === 'failed') {
                setMessage(GetErrorMsg(resp));
            }
        }
        else if (mode === "EDIT") {
            Payload.id = rowForEdit.id
            const resp = await apiUpdateCurrency(Payload)
            if (resp.status === 'success') {
                OpenNotification('success', 'Updated successfully ')
                navigate('/masterDataMenu-item-view-5')


            }
            if (resp.status === 'failed') {
                setMessage(GetErrorMsg(resp));
            }
        }
    }


    useEffect(() => {

        dispatch(getCurrAccount({ enterAccount }))

    }, [dispatch, enterAccount])

    let  breadCrumbList=[{
        name:'Master Data',
         link:"/home"
    },
    {
        name:'Currency',
        link:"/masterDataMenu-item-view-5"
    },
    {
        name: `Add Currency`,
    }]
    
    
    if(mode==="EDIT"){
    breadCrumbList = [
        {
            name:'Master Data',
             link:"/home"
        },
        {
            name:'Currency',
            link:"/masterDataMenu-item-view-5"
        },
        {
          name: rowForEdit?.cur_title,
          link: '/masterDataMenu-item-view-5',
          state:rowForEdit
      },
        {
            name: `Edit Currency`,
        },
    
    
    ]
    }

    return (
        <>
            {message && <Alert className="mb-4" type="danger" showIcon>
                {message}
            </Alert>}
            <CustomBreadcrumbs  list={breadCrumbList} />
            <h3 className='mb-5'>{mode === "EDIT" ? "Edit " : "Create "}Currency Conversion</h3>
            <div className="mt-6 rounded ">
                        <Formik
                            innerRef={formikRef}
                            initialValues={initValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(true)
                                submitApi(values)
                            }}
                        >
                            {({ values, touched, errors, isSubmitting }) => {
                                return (
                                    <Form>
                                        <div style={{ backgroundColor: "#F5F5F5", padding: "15px", marginTop: "10px" }}>
                                            <FormContainer>
                                            <AdaptableCard className="h-full " bodyClass="h-full">
                                                <div className="gap-3 mt-2 p-5">
                                                    <div className='md:grid grid-cols-2 gap-4'>
                                                        <FormItem
                                                            label={<p>Operator <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                        invalid={
                                                            errors.acc_unq_id && touched.acc_unq_id
                                                        }
                                                        errorMessage={errors.acc_unq_id}
                                                        >
                                                            <Field name="acc_unq_id" validate={async (passedValue) => {
                                                                if (user_type === "GlobalMno") {
                                                                    try {
                                                                        await Yup.string().required('Please select operator').validate(passedValue);
                                                                    } catch (error) {
                                                                        return error.message;
                                                                    }
                                                                }
                                                            }}>
                                                                {({ field, form }) => (
                                                                    <Select
                                                                        isDisabled={user_type !== "GlobalMno" ? true : false}
                                                                        placeholder="Select Operator"
                                                                        field={field}
                                                                        form={form}
                                                                        options={currAccountList}
                                                                        value={user_type !== "GlobalMno" ? currAccountList?.filter(
                                                                            (label) =>
                                                                                label.acc_unq_id === enterAccount
                                                                        ) : currAccountList?.filter(
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
                                                        </FormItem>
                                                    </div>

                                                    {/* <div className='w-[420px]'>
                                                        <FormItem
                                                            label="1 USD="
                                                        >
                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                name="oneUsd"
                                                                placeholder="Eg: 81.78 INR"
                                                                component={Input}
                                                            />
                                                        </FormItem>
                                                    </div> */}
                                                </div>
                                                <div className=" md:grid grid-cols-3 gap-4  px-5">

                                                    <FormItem
                                                        label={<p>Currency Name<span style={{ color: 'red' }}>{'*'}</span></p>}
                                                        invalid={errors.curTitle && touched.curTitle}
                                                        errorMessage={errors.curTitle}
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name='curTitle'
                                                            placeholder="Eg : INR, EUR,..."
                                                            component={Input}
                                                        />
                                                    </FormItem>

                                                    <FormItem

                                                        label={<p>Currency Symbol<span style={{ color: 'red' }}>{'*'}</span></p>}
                                                        invalid={errors.curSymbol && touched.curSymbol}
                                                        errorMessage={errors.curSymbol}
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name='curSymbol'
                                                            placeholder="Eg : $, ₹, ¥,..."
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                </div>
                                                <div className=" md:grid grid-cols-3 gap-3  px-5">
                                                    <FormItem
                                                        label={<p>Conversion rate<span style={{ color: 'red' }}>{'*'}</span></p>}
                                                        invalid={errors.curConvRate && touched.curConvRate}
                                                        errorMessage={errors.curConvRate}
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="curConvRate"
                                                            placeholder='00.00'
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                </div>
                                            </AdaptableCard>
                                            </FormContainer>
                                        </div>
                                        <div className="mt-2 pt-4 text-right w-full flex justify-end">
                                            <Link
                                                className="block lg:inline-block md:mb-0 mb-4"
                                                to="/masterDataMenu-item-view-5">
                                                <Button
                                                    type="Button"
                                                    className="mx-2"
                                                    variant="solid"
                                                    style={{
                                                        backgroundColor: "#4D4D4D",
                                                        fontStyle: 'normal',
                                                        fontSize: '18px'
                                                    }}


                                                >
                                                    Cancel
                                                </Button>
                                            </Link>
                                            {/* <Link
                                                    className="block lg:inline-block md:mb-0 mb-4"
                                                > */}
                                            <Button variant='solid' type="submit" style={{
                                                fontStyle: 'normal',
                                                fontSize: '18px',
                                            }} >
                                                {'Submit'}
                                            </Button>
                                            {/* </Link> */}
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
            </div>


        </>

    )
}

export default AddCurrencyConversion