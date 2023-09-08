import React, { useRef, useState, useEffect } from 'react'
import { Steps, Button } from 'components/ui'
import { AdaptableCard } from 'components/shared'
import RetailDetails from './RetailDetails'
import RetailMasterInfo from './RetailMasterInfo'
import RetailPreview from './RetailPreview'
import { Link, useLocation } from 'react-router-dom'
import { apiSubmitRetail, apiUpdateRetail } from 'services/RetailService'
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import campareandCopy from 'utils/campareandCopy'
import { RetailEditandCopy } from 'utils/campareandCopy'
import { getCurrency, getParentAccount, getCustomerCategory, getUploadFileType } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile'
import { concat } from 'lodash'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'

const Controlled = () => {
    const dispatch = useDispatch()
    const { enterAccount, password, rememberMe, usernameOrEmail, acc_mno_id
    } = useSelector(
        (state) => state.auth.user
    )

    const location = useLocation();
    const rowForEdit = location.state?.data;
    const mode = location.state?.mode ? location.state.mode : "ADD";
    const navigate = useNavigate()
    const [step, setStep] = useState(0)
    const childRef = useRef()
    const childRefUserInfo = useRef()

    let intailValues = {
        retailAccInitValues: {
            retailId: '',
            custName: '',
            customerType: '',
            custCompName: '',
            custIncorpDt: '',
            custTaxId: '',
            custTimeZone: '',
            custCurrency: '',
            custLang: '',
            custOrient: '',
            custCat: '',
            fields: []
        },
        retailContactInitValues: {
            custFirstName: "",
            custMiddleName: "",
            custLastName: "",
            custEmailId: "",
            custAltCont: "",
            custFax: "",
            custWebUrl: "",
            fieldsContact: [],
        },
        addressFields: {
            custCountry: '',
            custAddL1: '',
            custAddL2: '',
            custCity: '',
            custState: '',
            custZipcode: '',
        },
        retailUserInitValues: {
            roleId: '',
            firstName: '',
            lastName: '',
            middleName: "",
            emailId: '',
            phoneNumber: '',
            ordemailId: ''
        },
        uploadFiles: [
        ],
        additionalFiles: [
            {
                file_name: "",
                file_url: "",
                file_type: "",
                dgl_acc_mno_id: null
            }
        ]

    }
    useEffect(() => {
        dispatch(getUploadFileType(enterAccount))
    }, [])
    const operatorFileTypes = useSelector(state => state.retailsList?.data?.fileList)
    useEffect(() => {
        if (operatorFileTypes?.res?.length) {
            let uploadArray = []
            for (let i = 0; i < operatorFileTypes?.res.length; i++) {
                if (operatorFileTypes?.res[i].acc_type === 'Retail Customer') {
                    const docType = JSON.parse(operatorFileTypes?.res[i].doc_type);
                    docType.map((item, index) => {
                        uploadArray.push({
                            "doc_type": docType[index],
                            "doc_name": docType[index].doc_type_name,
                            "file_name": "",
                            "file_url": "",
                            "file_type": "upload"
                        })
                    })
                }
            }
            intailValues.uploadFiles = uploadArray
            setRetailIntialValues(intailValues)
        } else {
            setRetailIntialValues(intailValues)
        }
    }, [operatorFileTypes])
    const [retailIntialValues, setRetailIntialValues] = useState(intailValues)
    const [retailState, setRetailState] = useState({})
    const [message, setMessage] = useTimeOutMessage()

    const onChange = (nextStep) => {
        if (nextStep < 0) {
            setStep(0)
        } else if (nextStep > 3) {
            setStep(3)
        } else {
            setStep(nextStep)
        }
    }



    const onNext = () => {
        if (step === 0) {
            childRef.current?.handleSubmitFromParent()
        }

        if (step === 1) {
            childRefUserInfo.current?.handleSubmitFromParent()
        }

    }


    const onPrevious = () => {
        if (mode == 'EDIT') {
            onChange(step - 2)
        } else {
            onChange(step - 1)
        }
    }
    const submitApi = async () => {
        let uploadEdDocument = concat(retailState?.uploadFiles, retailState?.additionalFiles)
        let allFeilds = [...retailState?.fields,...retailState?.fieldsContact]

        if (mode === "ADD") {
            uploadEdDocument = uploadEdDocument.map((file) => {
                if (file?.file_url != '') {
                    return {
                        "doc_name": file?.doc_name,
                        "file_name": file?.file_name,
                        "file_url": file?.file_url,
                        "file_type": file?.file_type,
                    }
                }
            })
            uploadEdDocument = uploadEdDocument.filter(item => item !== undefined && item !== null);
            let createbody = {
                "dgl_acc_mno_id": retailState.customerType,
                "cust_name": retailState.custName,
                // "cust_parent": retailState.customerType,
                "cust_parent": retailState.customerType,
                "cust_comp_name": retailState.custCompName,
                "cust_incorp_dt": retailState.custIncorpDt,
                "cust_tax_id": retailState.custTaxId,
                "cust_time_zone": retailState.custTimeZone,
                "cust_currency": retailState.custCurrency,
                "cust_lang": retailState.custLang,
                "cust_orient": retailState.custOrient,
                "dgl_md_cust_cat_id": retailState.custCat,
                "dgl_cust_custom_fields": allFeilds,

                "cust_first_name": retailState.custFirstName,
                "cust_middle_name": retailState.custMiddleName,
                "cust_last_name": retailState.custLastName,
                // "cust_prim_cont": retailState.custPrimCont,
                "cust_email_id": retailState.custEmailId,
                "cust_phone_number": retailState.custPhone,
                "cust_alt_cont": retailState.custAltCont,
                "cust_fax": retailState.custFax,
                "cust_web_url": retailState.custWebUrl,
                "cust_order_approver_email_id": retailState?.retailUserInitValues?.ordemailId,
                "cust_add_l1": retailState.custAddL1,
                "cust_add_l2": retailState.custAddL2,
                "cust_city": retailState.custCity,
                "cust_state": retailState.custState,
                "cust_country": retailState.custCountry,
                "cust_zipcode": retailState.custZipcode,
                "cust_is_business_unit": true,
                "cust_pref_pg": 1,
                "bill_cycle": "MONTHLY",
                // "bill_date": "2023-05-12T12:52:19.120Z",
                "bill_due_tenor": "2",
                "credit_limit": 5.3451,
                "cust_status": "ACTIVE",
                "dgl_cust_files": uploadEdDocument,
                "dgl_cust_roles": [
                    {
                        "role_name": "actor" + Math.floor(10000 + Math.random() * 90000),
                        "role_desc": "Action",
                        "permissions": "json string",
                        "status": 1
                    }
                ],
                "dgl_cust_users": [
                    {
                        "first_name": retailState.retailUserInitValues.firstName,
                        // "middle_name": "meg",
                        "last_name": retailState.retailUserInitValues.lastName,
                        "middle_name": retailState.retailUserInitValues.middleName,
                        "email": retailState.retailUserInitValues.emailId,
                        "phone": retailState.retailUserInitValues.phoneNumber,
                        "status": 1,
                        "cust_type": "RetailCustomer",
                        "add_line1": "hyderabad",
                        "add_line2": "Banglore",
                        "profile_img": "profile_img",
                        "cust_password": "12345"
                    }
                ]
            }

            const resp = await apiSubmitRetail(createbody)
            if (resp.status === 'success') {
                OpenNotification('success', 'Created successfully ')
                navigate('/account-menu-item-view-6')



            }
            if (resp.status === 'failed') {
                // setMessage(GetErrorMsg(resp));
                let data = GetErrorMsg(resp)
                let mess = Array.isArray(data)? data.join(", "): data
                OpenNotification('danger',mess)
            }

        } else if (mode === "EDIT") {
            uploadEdDocument = uploadEdDocument.map((file) => {
                if (file?.file_url !== '') {
                    return {
                        "id": file.id,
                        "doc_name": file?.doc_name,
                        "file_name": file?.file_name,
                        "file_url": file?.file_url,
                        "file_type": file?.file_type,
                    }
                }
            })
            uploadEdDocument = uploadEdDocument.filter(item => item !== undefined && item !== null);
            let updatebody = {
                "dgl_acc_mno_id": retailState.customerType,
                "cust_name": retailState.custName,
                "cust_parent": retailState.customerType,
                "cust_comp_name": retailState.custCompName,
                "cust_incorp_dt": retailState.custIncorpDt,
                "cust_tax_id": retailState.custTaxId,
                "cust_time_zone": retailState.custTimeZone,
                "cust_currency": retailState.custCurrency,
                "cust_lang": retailState.custLang,
                "cust_orient": retailState.custOrient,
                "dgl_md_cust_cat_id": retailState.custCat,
                "dgl_cust_custom_fields": allFeilds,
                "cust_first_name": retailState.custFirstName,
                "cust_middle_name": retailState.custMiddleName,
                "cust_last_name": retailState.custLastName,
                // "cust_prim_cont": retailState.custPrimCont,
                "cust_email_id": retailState.custEmailId,
                "cust_phone_number": retailState.custPhone,
                "cust_alt_cont": retailState.custAltCont,
                "cust_fax": retailState.custFax,
                "cust_web_url": retailState.custWebUrl,
                "cust_order_approver_email_id": retailState?.retailUserInitValues?.ordemailId,
                "cust_add_l1": retailState.custAddL1,
                "cust_add_l2": retailState.custAddL2,
                "cust_city": retailState.custCity,
                "cust_state": retailState.custState,
                "cust_country": retailState.custCountry,
                "cust_zipcode": retailState.custZipcode,
                "cust_is_business_unit": true,
                "cust_pref_pg": 1,
                "bill_cycle": "MONTHLY",
                // "bill_date": "2023-05-12T12:52:19.120Z",
                "bill_due_tenor": "2",
                "credit_limit": 5.3451,
                "cust_status": "ACTIVE",
                "dgl_cust_files": uploadEdDocument,
                "dgl_cust_roles": [
                    {
                        "id": rowForEdit?.dgl_cust_roles[0]?.id,
                        "role_name": "actor" + Math.floor(10000 + Math.random() * 90000),
                        "role_desc": "Action",
                        "permissions": "json string",
                        "status": 1,
                        "dgl_customer_id": null,
                        "role_unq_id": rowForEdit?.dgl_cust_roles[0]?.role_unq_id,

                    }
                ],
                "dgl_cust_users": rowForEdit?.dgl_cust_users,
                "id": rowForEdit?.id,
            }
            console.log(updatebody)
            const resp = await apiUpdateRetail(updatebody)
            if (resp.status === 'success') {
                OpenNotification('success', 'Updated successfully')
                navigate('/account-menu-item-view-6')



            }
            if (resp.status === 'failed') {
                // setMessage(GetErrorMsg(resp));
                console.log('first')
                let data = GetErrorMsg(resp)
                let mess = Array.isArray(data)? data.join(", "): data
                OpenNotification('danger',mess)
            }
        }



    }

    useEffect(() => {
        if (rowForEdit) {
            const retailValues = RetailEditandCopy(retailIntialValues, rowForEdit)
            retailValues?.uploadFiles.map(e => {
                const matcheDobj = rowForEdit?.dgl_cust_files.find(f => f.doc_name === e.doc_name)
                if (matcheDobj) {
                    e.file_name = matcheDobj.file_name
                    e.file_url = matcheDobj.file_url
                    e.file_type = matcheDobj.file_type
                    e.doc_name = matcheDobj.doc_name
                    e.id = matcheDobj.id
                }
            })
            setRetailState(retailValues);
        }

    }, [retailIntialValues,rowForEdit])


    useEffect(() => {

        dispatch(getCurrency({ enterAccount }))
        dispatch(getParentAccount({ enterAccount }))
        dispatch(getCustomerCategory({ enterAccount }))


    }, [dispatch, enterAccount])
    let breadCrumbList = [{
        name: 'Accounts',
         link: "/home"
    }, {
        name: 'Reatil Customers',
        link: "/account-menu-item-view-6"
    }, {
        name: `Create  Reatil Customers`,
    }]

    if (mode === "EDIT") {
        breadCrumbList = [
            {
                name: 'Accounts',
                 link: '/home',
            },
            {
                name: 'Reatil Customers',
                link: '/account-menu-item-view-6',
            },
            {
                name: rowForEdit?.cust_name,
                link: '/account-menu-item-view-6',
                state: rowForEdit
            },
            {
                name: "Edit Reatil Customers"
            },
        ]
    }

    console.log('retailIntialValues',retailState)
    return (


        retailIntialValues && <div>
            {/* <div className='mb-5'>Accounts/Reatil Customers/{mode === "EDIT" ? "Edit" : "Create"} Reatil Customers</div> */}
            <CustomBreadcrumbs list={breadCrumbList} />


            {mode == "ADD" ? <Steps current={step}>
                <Steps.Item title="RETAIL CUSTOMER DETAILS" />
                <Steps.Item title="MASTER USER" />
                <Steps.Item title="PREVIEW" />
            </Steps> : <Steps current={step}>
                <Steps.Item title="RETAIL CUSTOMER DETAILS" />
                <Steps.Item title="PREVIEW" />
            </Steps>}

            <div className="mt-6  bg-gray-50 dark:bg-gray-700 rounded ">


                {step === 0 &&
                    <RetailDetails ref={childRef}
                        retailState={retailState} setStep={setStep}
                        step={step} setRetailState={setRetailState}
                        retailIntialValues={retailIntialValues}
                        setRetailIntialValues={setRetailIntialValues}
                        mode={mode}
                    />
                }
                {step === 1 &&
                    <RetailMasterInfo ref={childRefUserInfo} retailState={retailState} setStep={setStep}
                        step={step} setRetailState={setRetailState}
                        retailIntialValues={retailIntialValues}
                        setRetailIntialValues={setRetailIntialValues}
                    />
                }
                {step === 2 &&
                    <AdaptableCard className="h-full" bodyClass="h-full">
                        <RetailPreview retailState={retailState} step={step} setStep={setStep} message={message} mode={mode} />
                    </AdaptableCard>
                }

            </div>
            <div className="flex justify-between mt-4">

                <div>
                    {step > 0 &&
                        <Button
                            className="mx-2   "
                            style={{
                                backgroundColor: "#4D4D4D", 
                                fontStyle: 'normal',
                                fontSize: '18px',
                                color: "white"
                            }}
                            onClick={onPrevious}
                            type="button"

                        >
                            Previous
                        </Button>
                    }
                </div>

                <div className='flex'>
                    {step >= 0 &&
                        <Link
                            className="block lg:inline-block md:mb-0 "
                            to="/account-menu-item-view-6"
                        >
                            <Button
                                className="mx-2"
                                onClick={onPrevious}
                                variant="solid"
                                style={{
                                    color: "white", 
                                    fontStyle: 'normal',
                                    fontSize: '18px', backgroundColor: "#4D4D4D"
                                }}


                            >
                                Cancel
                            </Button>
                        </Link>
                    }
                    {step < 2 && <Button onClick={onNext} disabled={step === 2} variant='solid' style={{
                        
                        fontStyle: 'normal',
                        fontSize: '18px',
                        color: "white"
                    }}>
                        {step === 2 ? 'Completed' : 'Next'}
                    </Button>}

                    {step === 2 &&
                        <>
                            <Button onClick={submitApi} variant='solid' style={{
                                
                                fontStyle: 'normal',
                                fontSize: '18px',
                                color: "white"
                            }}>
                                {'Submit for Approval'}
                            </Button>
                        </>
                    }
                </div>
            </div>

        </div >
    )
}

export default Controlled
