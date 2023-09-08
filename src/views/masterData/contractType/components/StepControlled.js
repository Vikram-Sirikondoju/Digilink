import React, { useEffect, useRef, useState } from 'react'
import { Steps, Button, Alert } from 'components/ui'
import { AdaptableCard } from 'components/shared'
import ContractPreview from './ContractPreview'
import { Link, useLocation } from 'react-router-dom'
import { apiSubmitOperator } from 'services/EnterpriseService'
import { useNavigate } from 'react-router-dom'
import ContractCreateType from './ContractCreateType'
import ContractConfig from './ContractConfig'
import { MdOutlineInfo } from 'react-icons/md'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { apiCreateContractType, apiUpdateContractType } from 'services/ContractTypeService'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile'
import { useDispatch, useSelector } from 'react-redux'
import HTMLReactParser from 'html-react-parser'
import { EditFieldsToContractType } from 'utils/campareandCopy'
import { cloneDeep } from 'lodash'
import { getParentAccount } from '../store/dataSlice'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'

const initValues = {
    cust_cat: "",
    contract_type_title: "",
    contract_type_desc: "",
    md_contr_status: "ACTIVE",
    is_event: false,
    unq_id: "",
    dgl_md_contract_type_configs: [{
        config_title: "",
        config_details: {
            configIf: [{ select: "", interAction: "", selectValue: "", input1: "", input2: "" }],
            configThen: [{ select: "", interAction: "", selectValue: "", input1: "", input2: "" }]
        }
    }]
}

const validationSchema1 = Yup.object().shape({
    contract_type_title: Yup.string().trim().required('Please enter contract title').nullable(),
    cust_cat: Yup.string().required('Please select user category'),
    // acc_unq_id: Yup.string().required('Please select operator')
})




const validation = Yup.object().shape({
    select: Yup.string().required('Required').nullable(),
    interAction: Yup.string().required('Required').nullable(),
    selectValue: Yup.string().required('Required').nullable(),
    input1: Yup.string().required('Required').nullable(),
    input2: Yup.string().required('Required').nullable(),
})

const validationSchema2 = Yup.object().shape({
    dgl_md_contract_type_configs: Yup.array().of(
        Yup.object().shape({
            config_title: Yup.string().required('Please enter title').nullable(),
            // config_details :  Yup.object().shape({
            //     configIf : Yup.array().of(validation),
            //     configThen : Yup.array().of(validation)
            // }),
        })
    )
})



const Controlled = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const mode = location.state?.mode ? location.state.mode : 'ADD'
    const rowForEdit = location.state?.data

    const setValidationsSchema = () => {
        switch (step) {
            case 0:
                return validationSchema1
            case 1:
                return validationSchema2
            default:
                return null
        }
    }

    const childRef = useRef()
    const childRefUserInfo = useRef()

    // const [retailState, setRetailState] = useState(rowForEdit ? EditFieldsToContractType(initValues,rowForEdit): initValues)
    const [retailState, setRetailState] = useState()

    const [step, setStep] = useState(0)
    const [message, setMessage] = useTimeOutMessage()

    const { enterAccount,user_type } = useSelector((state) => state?.auth?.user)


    useEffect(() => {
        if (rowForEdit) {
            let intis = cloneDeep(initValues)
            let sdf = EditFieldsToContractType(intis, rowForEdit)
            setRetailState(sdf)
        } else {
            setRetailState(initValues)
        }
    }, [rowForEdit])
    const onChange = (nextStep) => {
        if (nextStep < 0) {
            setStep(0)
        } else if (nextStep > 3) {
            setStep(3)
        } else {
            setStep(nextStep)
        }
    }

    useEffect(() => {
        dispatch(getParentAccount({ enterAccount }))

    }, [dispatch, enterAccount])

    const onNext = (values) => {
        console.log('onNextonNext', values, step)

        switch (mode) {
            case 'ADD':
                onChange(step + 1)
                break
            case 'EDIT':
                if (step === 0) {
                    onChange(step + 2)
                }
                break
            default:
        }
    }

    const onPrevious = () => onChange(step - 1)

    const submitApi = async (values) => {
        console.log(values,"vaaaa")
        let payload = {
            cust_cat: values.cust_cat,
            contract_type_title: values.contract_type_title.trim(),
            contract_type_desc: values.contract_type_desc,
            md_contr_status: "ACTIVE",
            is_event: false,
            //unq_id: values.unq_id,
            unq_id: user_type !== "GlobalMno" ? enterAccount : values.acc_unq_id,
            dgl_md_contract_type_configs: values.dgl_md_contract_type_configs.map(e => ({
                ...e,
                config_details: JSON.stringify(e.config_details)
            }))
        }

        if (mode === "ADD") {
            const resp = await apiCreateContractType(payload)
            if (resp.status === 'success') {
                OpenNotification('success', 'Created successfully')
                navigate('/masterDataMenu-item-view-6')
            } else if (resp.status === 'failed') {
                setMessage(GetErrorMsg(resp));
            }
        } else if (mode === "EDIT") {
            payload.id = rowForEdit.id
            const resp = await apiUpdateContractType(payload)
            if (resp.status === 'success') {
                OpenNotification('success', 'Updated successfully')
                navigate('/masterDataMenu-item-view-6')
            } else if (resp.status === 'failed') {
                setMessage(GetErrorMsg(resp));
            }
        }
    }

    const setSubmissionPayload = (values) => {
        let updatedPayload = {}
        switch (step) {
            case 0:
                updatedPayload = { ...retailState, }
                if (mode === 'EDIT') {
                    updatedPayload = {
                        ...updatedPayload,
                    }
                }
                setRetailState(updatedPayload)
                break
            case 1:
                updatedPayload = { ...retailState, }
                // if (mode === "EDIT") {
                //     updatedPayload = { ...updatedPayload};
                // }
                setRetailState(updatedPayload)
                break
            default:
                break
        }
    }

    let  breadCrumbList=[{
        name:'Master Data',
         link:"/home"
    },
    {
        name:'Contract Type',
        link:"/masterDataMenu-item-view-6"
    },
    {
        name: `Add Contract Type`,
    }]
    
    
    if(mode==="EDIT"){
    breadCrumbList = [
        {
            name:'Master Data',
             link:"/home"
        },
        {
            name:'Contract Type',
            link:"/masterDataMenu-item-view-6"
        },
        {
          name: rowForEdit?.contract_type_title,
          link: '/masterDataMenu-item-view-6',
          state:rowForEdit
      },
        {
            name: `Edit Contract Type`,
        },
    
    
    ]
    }

    return (
        <>
            {message &&
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>}
                <div className='mb-3'>
                    {/* Accounts/Contract Type/Create Contract Type */}
                    <CustomBreadcrumbs  list={breadCrumbList} />
                    </div>
            {retailState && <Formik
                className="mt-5"
                initialValues={retailState}
                validationSchema={setValidationsSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    setSubmissionPayload(values)
                    onNext(values)
                }}>
                {({ errors, touched, values, setFieldValue }) => (
                    <Form enctype="multipart/form-data">
                        <Steps current={step}>
                            <Steps.Item title="CREATE CONTRACT TYPE" />
                            <Steps.Item title="CREATE CONFIG" />
                            <Steps.Item title="PREVIEW" />
                        </Steps>
                        <div className="">
                            {step == 0 &&
                                <div>
                                    <div className='flex'>
                                        <h3 className='mt-6 mb-6'>{mode === 'EDIT' ? "Edit" : "Add"} Contract Type </h3>
                                    </div>
                                    <div className='dark:bg-gray-700 rounded p-4' style={{ backgroundColor: "#F5F5F5" }}>
                                        <ContractCreateType ref={childRef}
                                            retailState={retailState} setStep={setStep}
                                            step={step} setRetailState={setRetailState}
                                            errors={errors || {}}
                                            touched={touched || {}}
                                            values={values || {}}
                                            setFieldValue={setFieldValue}
                                        />
                                    </div>
                                </div>
                            }
                            {step === 1 &&
                                <>
                                    <div className='flex'>
                                        <h3 className='mt-6 mb-4'>Config Conditions </h3>
                                    </div>
                                    <ContractConfig ref={childRefUserInfo}
                                        step={step} setStep={setStep}
                                        retailState={retailState} setRetailState={setRetailState}
                                        errors={errors || {}}
                                        touched={touched || {}}
                                        values={values || {}}
                                        setFieldValue={setFieldValue}
                                    />
                                </>
                            }
                            {step === 2 &&
                                <div className='mt-6'>
                                    <h3 className='ml-4'>Preview</h3>
                                    <ContractPreview values={values} />
                                </div>
                            }
                        </div>
                        <div className="flex justify-between mt-4 text-right">
                            <div>
                                {step > 0 && <Button style={{ backgroundColor: "#4D4D4D", color: "white",  fontStyle: 'normal', fontSize: '18px' }}
                                    type="button" onClick={onPrevious}
                                >
                                    Previous
                                </Button>}
                            </div>
                            <div className='flex justify-end'>
                                {step >= 0 &&
                                    <Link className="block lg:inline-block md:mb-0 mb-4" to="/masterDataMenu-item-view-6">
                                        <Button
                                            className="mx-2" variant="solid" style={{ backgroundColor: "#4D4D4D",fontStyle: 'normal', fontSize: '18px' }}
                                            onClick={onPrevious}
                                        >
                                            Cancel
                                        </Button>
                                    </Link>}
                                {step < 2 && <Button type="submit" style={{fontStyle: 'normal', fontSize: '18px' }} variant="solid"
                                    disabled={step === 2} >
                                    {step === 2 ? 'Completed' : 'Next'}
                                </Button>}
                                {step === 2 &&
                                    <Button variant="solid" style={{ fontStyle: 'normal', fontSize: '18px' }}
                                        onClick={() => submitApi(values)}>
                                        {'Submit for Approval'}
                                    </Button>
                                }
                            </div>
                        </div>
                    </Form>)}
            </Formik>}
        </>
    )
}

export default Controlled
