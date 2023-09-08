import React, { useRef, useState, useEffect } from 'react'
import { Steps, Button } from 'components/ui'
import EnterpriseDetails from './EnterpriseDetails'
import EnterpriseMasterInfo from './EnterpriseMasterInfo'
import EnterprisePreview from './EnterprisePreview'
import { Link } from 'react-router-dom'
import { apiSubmitEnterprise, apiUpdateEnterprise } from 'services/EnterpriseService'
import { useNavigate, useLocation } from 'react-router-dom'
import { AdaptableCard } from 'components/shared'
import { EditandCopyEnterprise } from 'utils/campareandCopy'
import { getContractType, getCurrency, getCustomerCategory, getParenOperator, getParentAccount, getUploadFileType } from '../store/dataSlice'
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
    console.log(location.state)



    let intialValues = {
        entAccInfo: {
            enterpriseId: '', // not in api
            accMnoParentId: '',
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
        entContact: {
            custFirstName: "",
            custLastName: "",
            custMiddleName: "",
            custEmailId: "",
            custAltCont: "",
            custFax: "",
            custWebUrl: "",
            custPhone: "",
            custordEmailId: "",
            fieldsContact: [],
        },
        address: {
            custCountry: '',
            custAddL1: '',
            custAddL2: '',
            custCity: '',
            custState: '',
            custZipcode: '',
        },
        billing: {
            billCycle: "",
            billWeek:'',
            billCycleMonth:'',
            billDate:'',
            // billDate: "",
            billDueTenor: "",
            creditLimit: "",
            sameCorrespondenceAddress: false,
            placement: "",


            // settelementWeek : "",
            // settelementMonth:"",
            // settelementDate:""
        },
        userInfo: {
            roleId: '',
            firstName: '',
            lastName: '',
            middleName: "",
            emailId: '',
            phoneNumber: ''
        },
        userContact: {
            contractType: "",
            signedDate: "",
            enforceDate: "",
            terminateDate: "",
            status: "",
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

    const [EpIntialValues, setEpIntialValues] = useState()
    const operatorFileTypes = useSelector(state => state.enterpriseList?.data?.fileList)
    useEffect(() => {
        dispatch(getUploadFileType(enterAccount))
    }, [])
    useEffect(() => {
        if (operatorFileTypes?.res?.length) {

            let uploadArray = []
            for (let i = 0; i < operatorFileTypes?.res.length; i++) {
                if (operatorFileTypes?.res[i].acc_type === 'Enterprise Customer') {
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
            intialValues.uploadFiles = uploadArray
            setEpIntialValues(intialValues)
        } else {
            setEpIntialValues(intialValues)
        }
    }, [operatorFileTypes])
    const navigate = useNavigate()
    const [enterpriseState, setEnterpriseState] = useState({})
    const [message, setMessage] = useTimeOutMessage()
    const [step, setStep] = useState(0)
    const childRef = useRef()
    const childRefMasterInfo = useRef()


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
            childRefMasterInfo.current?.handleSubmitFromParent()
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
       
        let uploadEdDocument = concat(enterpriseState?.uploadFiles, enterpriseState?.additionalFiles)

        
       let allFeilds = [...enterpriseState?.fields,...enterpriseState?.fieldsContact]

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
            let createPayload = {
                "dgl_acc_mno_id": enterpriseState.customerType,
                "cust_name": enterpriseState.custName,
                "cust_parent": enterpriseState.accMnoParentId,
                "cust_comp_name": enterpriseState.custCompName,
                "cust_incorp_dt": enterpriseState.custIncorpDt,
                "cust_tax_id": enterpriseState.custTaxId,
                "cust_time_zone": enterpriseState.custTimeZone,
                "cust_currency": enterpriseState.custCurrency,
                "cust_lang": enterpriseState.custLang,
                "cust_orient": enterpriseState.custOrient,
                "dgl_md_cust_cat_id": enterpriseState.custCat,
                "dgl_cust_custom_fields": allFeilds,
                "cust_prim_cont": enterpriseState.custPrimCont,
                "cust_email_id": enterpriseState.custEmailId,
                "cust_phone_number": enterpriseState.custPhone,
                "cust_alt_cont": enterpriseState.custAltCont,
                "cust_fax": enterpriseState.custFax,
                "cust_web_url": enterpriseState.custWebUrl,
                "cust_order_approver_email_id": enterpriseState.custordEmailId,
                "cust_add_l1": enterpriseState.custAddL1,
                "cust_add_l2": enterpriseState.custAddL2,
                "cust_city": enterpriseState.custCity,
                "cust_state": enterpriseState.custState,
                "cust_country": enterpriseState.custCountry,
                "cust_zipcode": enterpriseState.custZipcode,
                "is_business_unit": enterpriseState.sameCorrespondenceAddress,
                "cust_pref_pg": 1,
                "bill_cycle": enterpriseState.billCycle,

                // "bill_date": "2023-06-30T18:30:00.000Z",
                "bill_due_tenor": enterpriseState.billDueTenor,
                "credit_limit": enterpriseState.creditLimit,
                "cust_last_name": enterpriseState.custLastName,
                "cust_middle_name": enterpriseState.custMiddleName,
                "cust_first_name": enterpriseState.custFirstName,
                "cust_status": "ACTIVE",
                "dgl_cust_files": uploadEdDocument,
                "dgl_cust_roles": [
                    {
                        "role_name": "role_name1" + Math.floor(10000 + Math.random() * 90000),
                        "role_desc": "keep",
                        "permissions": "json string",
                        "status": 1
                    }
                ],
                "dgl_cust_users": [
                    {
                        "first_name": enterpriseState.userInfo.firstName,
                        "last_name": enterpriseState.userInfo.lastName,
                        "middle_name": enterpriseState.userInfo.middleName,
                        "email": enterpriseState.userInfo.emailId,
                        "phone": enterpriseState.userInfo.phoneNumber,
                        "status": "ACTIVE",
                        "cust_type": "EnterpriseCustomer",
                        "add_line1": "",
                        "add_line2": "",
                        "profile_img": "",
                        "cust_password": "12345"
                    }
                ],
                "dgl_cust_contracts": [
                    {
                        "contract_name": "gt Contrac2t",
                        "contract_file": "http://Url",
                        "contr_desc": "Contract Description",
                        "enforce_date": enterpriseState.enforceDate,
                        "signed_date": enterpriseState.signedDate,
                        "status": enterpriseState.status,
                        "terminate_date": enterpriseState.terminateDate,
                        "dgl_acc_mno_id": acc_mno_id,
                        "dgl_md_contract_type_id": enterpriseState.contractType
                    }
                ]
            }
            const resp = await apiSubmitEnterprise(createPayload)

            if (resp.status === 'success') {


                OpenNotification('success', 'Created successfully ')
                navigate('/account-menu-item-view-5')


            }
            if (resp.status === 'failed') {
                // setMessage(GetErrorMsg(resp));
                let data = GetErrorMsg(resp)
                let mess = Array.isArray(data)? data.join(", "): data
                OpenNotification('danger',mess)
            }

        } else if (mode === "EDIT") {
            uploadEdDocument = uploadEdDocument.map((file) => {
                if (file?.file_url != '') {
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
            let updatePayload = {

                "dgl_acc_mno_id": enterpriseState.customerType,
                "cust_name": enterpriseState.custName,
                "cust_parent": enterpriseState.accMnoParentId,
                "cust_comp_name": enterpriseState.custCompName,
                "cust_incorp_dt": enterpriseState.custIncorpDt,
                "cust_tax_id": enterpriseState.custTaxId,
                "cust_time_zone": enterpriseState.custTimeZone,
                "cust_currency": enterpriseState.custCurrency,
                "cust_lang": enterpriseState.custLang,
                "cust_orient": enterpriseState.custOrient,
                "dgl_md_cust_cat_id": enterpriseState.custCat,
                "dgl_cust_custom_fields": allFeilds,
                "cust_prim_cont": enterpriseState.custPrimCont,

                "cust_email_id": enterpriseState.custEmailId,
                "cust_phone_number": enterpriseState.custPhone,
                "cust_alt_cont": enterpriseState.custAltCont,
                "cust_fax": enterpriseState.custFax,
                "cust_web_url": enterpriseState.custWebUrl,
                "cust_order_approver_email_id": enterpriseState.custordEmailId,
                "cust_add_l1": enterpriseState.custAddL1,
                "cust_add_l2": enterpriseState.custAddL2,
                "cust_city": enterpriseState.custCity,
                "cust_state": enterpriseState.custState,
                "cust_country": enterpriseState.custCountry,
                "cust_zipcode": enterpriseState.custZipcode,
                "is_business_unit": enterpriseState.sameCorrespondenceAddress,
                "cust_pref_pg": 1,
                "bill_cycle": enterpriseState.billCycle,
                "bill_week":enterpriseState.billWeek,
                "bill_cycle_month":enterpriseState.billCycleMonth,
                "bill_date":enterpriseState.billDate,

                // "bill_date": "2023-06-30T18:30:00.000Z",
                "bill_due_tenor": enterpriseState.billDueTenor,
                "credit_limit": enterpriseState.creditLimit,
                "cust_status": "ACTIVE",
                "cust_unq_id": rowForEdit?.cust_unq_id,
                "cust_last_name": enterpriseState.custLastName,
                "cust_middle_name": enterpriseState.custMiddleName,
                "cust_first_name": enterpriseState.custFirstName,
                "dgl_cust_files": uploadEdDocument,
                "dgl_cust_roles": [
                    {
                        "dgl_customer_id": null,
                        "id": rowForEdit?.dgl_cust_roles[0]?.id,
                        "role_name": "role_name1" + Math.floor(10000 + Math.random() * 90000),
                        "role_desc": "role_desc1",
                        "role_unq_id": rowForEdit?.dgl_cust_roles[0]?.role_unq_id,
                        "permissions": "Permissions Json",
                        "status": rowForEdit?.dgl_cust_roles[0]?.status
                    }
                ],
                "dgl_cust_users": [
                    {
                        "id": rowForEdit?.dgl_cust_users[0]?.id,
                        "first_name": enterpriseState.userInfo.firstName,
                        "last_name": enterpriseState.userInfo.lastName,
                        "middle_name": enterpriseState.userInfo.middleName,
                        "email": enterpriseState.userInfo.emailId,
                        "phone": enterpriseState.userInfo.phoneNumber,
                        "cust_user_unq_id": rowForEdit?.dgl_cust_users[0]?.cust_user_unq_id,
                        "status": rowForEdit?.dgl_cust_users[0]?.status,
                        "cust_type": "EnterpriseCustomer",
                        "zipcode": null,
                        "add_line1": "hyderabad",
                        "add_line2": "Banglore",
                        "city": null,
                        "country": null,
                    }
                ],
                "dgl_cust_contracts": rowForEdit?.dgl_cust_contracts,
                "id": rowForEdit?.id,
            }
            const resp = await apiUpdateEnterprise(updatePayload)

            if (resp.status === 'success') {
                OpenNotification('success', 'Updated successfully')
                navigate('/account-menu-item-view-5')



            }
            if (resp.status === 'failed') {

                // setMessage(GetErrorMsg(resp));
                let data = GetErrorMsg(resp)
                let mess = Array.isArray(data)? data.join(", "): data
                OpenNotification('danger',mess)
            }


        }

    }

    useEffect(() => {
        if (rowForEdit) {

            const enterpriseIntialValues = EditandCopyEnterprise(intialValues, rowForEdit)
            enterpriseIntialValues.uploadFiles.map(e => {
                const matcheDobj = rowForEdit.dgl_cust_files.find(f => f.doc_name === e.doc_name)
                if (matcheDobj) {
                    e.file_name = matcheDobj.file_name
                    e.file_url = matcheDobj.file_url
                    e.file_type = matcheDobj.file_type
                    e.doc_name = matcheDobj.doc_name
                    e.id = matcheDobj.id
                }
            })
            setEnterpriseState(enterpriseIntialValues);
        }
    }, [EpIntialValues, rowForEdit])


    useEffect(() => {

        dispatch(getCurrency({ enterAccount }))
        dispatch(getParenOperator({ enterAccount }))
        //dispatch(getParentAccount({enterAccount}))
        dispatch(getCustomerCategory({ enterAccount }))
        dispatch(getContractType({ enterAccount }))


    }, [dispatch, enterAccount])

    let breadCrumbList = [{
        name: 'Accounts',
         link: "/home"
    }, {
        name: 'Enterprise Customers',
        link: "/account-menu-item-view-5"
    }, {
        name: `Create Enterprise Customers`,
    }]
    console.log(rowForEdit)

    if (mode === "EDIT") {
        breadCrumbList = [
            {
                name: 'Accounts',
                link: '/home',
            },
            {
                name: 'Enterprise Customers',
                link: '/account-menu-item-view-5',
            },
            {
                name: rowForEdit?.cust_name,
                link: '/account-menu-item-view-5',
                state:rowForEdit
            },
            {
                name: "Edit Enterprise Customers "  
            },
        ]
    }
    return (

        EpIntialValues && <div>
            {/* <div className='mb-5'>{mode === "EDIT" ? "Edit" : "Create"} Enterprise Customers</div> */}
            <CustomBreadcrumbs  list={breadCrumbList} />
            {mode == "ADD" ? <Steps current={step}>
                <Steps.Item title="ENTER PRISE CUSTOMER DETAILS" />
                <Steps.Item title="MASTER INFO" />
                <Steps.Item title="PREVIEW" />
            </Steps> : <Steps current={step}>
                <Steps.Item title="ENTER PRISE CUSTOMER DETAILS" />
                <Steps.Item title="PREVIEW" />
            </Steps>}

            <div className="mt-6  bg-gray-50 dark:bg-gray-700 rounded ">


                {step === 0 &&


                    <EnterpriseDetails ref={childRef} enterpriseState={enterpriseState} setStep={setStep}
                        step={step} setEnterpriseState={setEnterpriseState} EpIntialValues={EpIntialValues} setEpIntialValues={setEpIntialValues} mode={mode} />


                }
                {step === 1 &&

                    <EnterpriseMasterInfo ref={childRefMasterInfo} enterpriseState={enterpriseState} setStep={setStep}
                        step={step} setEnterpriseState={setEnterpriseState} EpIntialValues={EpIntialValues} setEpIntialValues={setEpIntialValues} />
                }
                {step === 2 &&
                    <AdaptableCard className="h-full" bodyClass="h-full">
                        <EnterprisePreview enterpriseState={enterpriseState} step={step} setStep={setStep} message={message} mode={mode} />
                    </AdaptableCard>

                }

            </div>


            <div className="flex justify-between mt-8">
                <div>
                    {step > 0 && <Button
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
                    </Button>}
                </div>

                <div>
                    {step >= 0 &&
                        <>
                            <Link
                                className="block lg:inline-block md:mb-0 mb-4"
                                to="/account-menu-item-view-5"
                            >
                                <Button
                                    className="mx-2"
                                    onClick={onPrevious}
                                    variant="solid"
                                    style={{
                                        backgroundColor: "#4D4D4D",
                                        color: "white", 
                                        fontStyle: 'normal',
                                        fontSize: '18px',
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Link>
                        </>}
                    {step < 2 && <Button onClick={onNext} disabled={step === 2} variant="solid" style={{
                        color: "white", 
                        fontStyle: 'normal',
                        fontSize: '18px',
                    }}  >
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
        </div>
    )
}

export default Controlled
