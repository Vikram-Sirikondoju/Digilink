import React, { useRef, useState, useEffect } from 'react'
import { Steps, Button } from 'components/ui'
import NewOperators from './NewProviders'
import ProviderDetails from './ProviderDetails'
import { AdaptableCard } from 'components/shared'
import ProviderMainUserInfo from './ProvidersMainUserInfo'
import ProviderPreview from './ProviderPreview'
import { Link, useLocation } from 'react-router-dom'
import { apiSubmitProvider, apiUpdateProvider } from 'services/ProvidersService'
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import { EditValuesToFieldsForProvider } from '../../../../utils/campareandCopy'
import { useDispatch, useSelector } from 'react-redux'
import { getContractType, getCurrency, getParentAccount, getProductCategory, getUploadFileType } from '../store/dataSlice'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile';
import { concat } from 'lodash'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'

const Controlled = () => {
    const dispatch = useDispatch()
    const { enterAccount, password, rememberMe, usernameOrEmail, acc_mno_id, acc_mno_parent_unq_id, acc_mno_parent_id
    } = useSelector(
        (state) => state.auth.user
    )
    

    const location = useLocation();
    const rowForEdit = location.state?.data;
    const mode = location?.state?.mode === 'EDIT' ? 'EDIT' : 'ADD'

    const providerIntialValues = {
        accInfo: {
            providerId: '',
            prodCategory: '',
            accType: '',
            accName: '',
            accIncorpDt: '',
            accCompName: '',
            accTaxId: '',
            accCurrency: '',
            accLang: '',
            accTimeZone: '',
            accOrient: '',
            fields: []
        },
        ContactInfo: {
            accPrimeContFirstName: '',
            accPrimeContMidName: '',
            accPrimeContLastName: '',
            accEmailId: '',
            accPrimCont: '',
            accAltCont: '',
            accFax: '',
            accWebUrl: '',
            fieldsContact: []
        },
        address: {
            accCountry: '',
            accAddL1: '',
            accAddL2: '',
            accCity: '',
            accState: '',
            accZipcode: '',
        },
        settlementInfo: {
            bankAccNum: '',
            bankBranchName: '',
            bankName: '',
            billCycle: '',
            billWeek:'',
            billCycleMonth:'',
            billDate:'',
            // billDate: '',
            billDueTenor: '',
            ifscCode: '',
            micrCode: '',
            prefSettleType: '',
            uploadCancelledCheque: '',

            // settelementWeek : "",
            // settelementMonth:"",
            // settelementDate:""
        },
        userInfo: {
            roleId: '',
            firstName: '',
            lastName: '',
            emailId: '',
            phoneNumber: '',
            middleName: ''
        },
        contractInfo: {
            contractType: '', //not in api
            signedDate: '', //not in api
            enforcementDate: '', //not in api
            terminationDate: '', //not in api
            contractStatus: '', //not in api
            contractFile: ''
        },
        upload_cancel_cheque: [{
            file_name: "file_name",
            file_url: "file_url",
            file_type: "upload or additional"
        }],
        masterInfoPermission: {
            publicRole: '', //not in api
            userRole: '', //not in api
            description: '', //not in api

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
    const [provideIntialValues, setProviderIntialValues] =
        useState(providerIntialValues)
    const operatorFileTypes = useSelector(state => state.providerList?.data?.fileList)
    useEffect(() => {
        dispatch(getUploadFileType(enterAccount))
    }, [])
    useEffect(() => {
        if (operatorFileTypes?.res?.length) {
            let uploadArray = []
            for (let i = 0; i < operatorFileTypes?.res.length; i++) {
                if (operatorFileTypes?.res[i].acc_type === 'Provider') {
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
            providerIntialValues.uploadFiles = uploadArray
            setProviderIntialValues(providerIntialValues)
        } else {
            setProviderIntialValues(providerIntialValues)
        }
    }, [operatorFileTypes])
    const [providerState, setProviderState] = useState({})
    const [message, setMessage] = useTimeOutMessage()
    const [step, setStep] = useState(0)
    const navigate = useNavigate()

    const childRef = useRef()
    const childRef2 = useRef()

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
        if (step == 0) {
            childRef.current?.handleSubmitFromParent()
        }
        if (step == 1) {
            childRef2.current?.handleSubmitFromParent()
        }
    }

    const submitApi = async () => {
        
        let uploadEdDocument = concat(providerState?.uploadFiles, providerState?.additionalFiles)

        let allFeilds = [...providerState?.fields,...providerState?.fieldsContact]


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
            const createPayload = {
                "acc_mno_parent": acc_mno_parent_id,
                "acc_name": providerState.accName,
                "acc_parent": providerState.accType,
                "acc_comp_name": providerState.accCompName,
                "acc_incorp_dt": providerState.accIncorpDt,
                "acc_tax_id": providerState.accTaxId,
                "acc_time_zone": providerState.accTimeZone,
                "acc_currency": providerState.accCurrency,
                "acc_lang": providerState.accLang,
                "acc_orient": providerState.accOrient,
                // "dgl_md_prod_cats": [{ "id": providerState.prodCategory }],
                // "dgl_md_prod_cats": [
                //     {
                //         "id": providerState.prodCategory,
                //         "prod_cat_title":null,
                //         "prod_cat_desc": null,
                //         "prod_cat_img_url": null,
                //         "md_pro_cat_status": null,
                //         "dgl_acc_mno_id": null
                //     }
                // ],
                "prod_cat_id": providerState.prodCategory,
                "dgl_acc_mno_custom_fields": allFeilds,
                "acc_first_name": providerState.accPrimeContFirstName,
                "acc_last_name": providerState.accPrimeContLastName,
                "acc_middle_name": providerState.accPrimeContMidName,
                "acc_email_id": providerState.accEmailId,
                "acc_phone": providerState.accPrimCont,
                "acc_alt_cont": providerState.accAltCont,
                "acc_fax": providerState.accFax,
                "acc_web_url": providerState.accWebUrl,
                "acc_add_l1": providerState.accAddL1,
                "acc_add_l2": providerState.accAddL2,
                "acc_city": providerState.accCity,
                "acc_state": providerState.accState,
                "acc_country": providerState.accCountry,
                "acc_zipcode": providerState.accZipcode,
                "acc_username": '',
                "pref_settle_type": providerState.prefSettleType,
                "bill_cycle": providerState.billCycle,
                "bill_week":providerState.billWeek,
                "bill_cycle_month":providerState.billCycleMonth,
                "bill_date":providerState.billDate,

                // "bill_date":"2023-06-30T18:30:00.000Z",
                "bill_due_tenor": providerState.billDueTenor,
                "bank_branch_name": providerState.bankBranchName,
                "bank_acc_num": providerState.bankAccNum,
                "bank_name": providerState.bankName,
                "ifsc_code": providerState.ifscCode,
                "micr_code": providerState.micrCode,
                "upload_cancel_cheque": providerState.uploadCancelledCheque,
                "dgl_mno_files": uploadEdDocument,
                "dgl_acc_users": [
                    {
                        "first_name": providerState.userInfo.firstName,
                        "last_name": providerState.userInfo.lastName,
                        "middle_name": providerState.userInfo.middleName,
                        "email": providerState.userInfo.emailId,
                        "phone": providerState.userInfo.phoneNumber,
                        "status": "ACTIVE",
                        "add_line1": "hyderabad",
                        "add_line2": "Banglore",
                        "profile_img": "http://dhoni"
                    }
                ],
                "dgl_roles": [
                    {
                        "role_name": providerState.userRole,
                        "role_desc": providerState.description,
                        "permissions": "json string",
                        "status": 1,
                        "public_role_id": providerState.publicRole,
                        "dgl_acc_mno_id": acc_mno_id,
                    }
                ],
                "acc_status": "ACTIVE",
                "acc_type": "Provider",
                "dgl_contracts": [
                    {
                        "contract_name": "demo Contract",
                        "contract_file": providerState.contractFile,
                        "contr_desc": "demo Description",
                        "enforce_date": providerState.enforcementDate,
                        "signed_date": providerState.signedDate,
                        "status": providerState.contractStatus,
                        "terminate_date": providerState.terminationDate,
                        "dgl_acc_mno_id": acc_mno_id,
                        "dgl_md_contract_type_id": providerState.contractType,
                        "dgl_contracts_receiving_parties": 1
                    }
                ]
            }

            const resp = await apiSubmitProvider(createPayload)
            if (resp.status === 'success') {
                OpenNotification('success', 'Created successfully ')
                navigate('/account-menu-item-view-3')
            }
            if (resp.status === 'failed') {
                // setMessage(GetErrorMsg(resp));
                let data = GetErrorMsg(resp)
                let mess = Array.isArray(data)? data.join(", "): data
                OpenNotification('danger',mess)
            }
        } else if (mode === "EDIT") {
            console.log(providerState, "providerStateedit")
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
            const updatePayload = {
                "id": rowForEdit?.id,
                "acc_mno_parent": acc_mno_parent_id,
                "acc_name": providerState.accName,
                "acc_parent": providerState.accType,
                "acc_comp_name": providerState.accCompName,
                "acc_incorp_dt": providerState.accIncorpDt,
                "acc_tax_id": providerState.accTaxId,
                "acc_time_zone": providerState.accTimeZone,
                "acc_currency": providerState.accCurrency,
                "acc_lang": providerState.accLang,
                "acc_orient": providerState.accOrient,
                "acc_password": "12345",
                // "dgl_md_prod_cats": [
                //     {
                //         "id": providerState.prodCategory,
                //         "prod_cat_title": null,
                //         "prod_cat_desc": null,
                //         "prod_cat_img_url": null,
                //         "md_pro_cat_status": null,
                //         "dgl_acc_mno_id": null
                //     }
                // ],
                "prod_cat_id": providerState.prodCategory,
                "dgl_acc_mno_custom_fields": allFeilds,
                "acc_first_name": providerState.accPrimeContFirstName,
                "acc_middle_name": providerState.accPrimeContMidName,
                "acc_last_name": providerState.accPrimeContLastName,
                "acc_email_id": providerState.accEmailId,
                "acc_alt_cont": providerState.accAltCont,
                "acc_fax": providerState.accFax,
                "acc_web_url": providerState.accWebUrl,
                "acc_phone": providerState.accPrimCont,
                "acc_add_l1": providerState.accAddL1,
                "acc_add_l2": providerState.accAddL2,
                "acc_city": providerState.accCity,
                "acc_state": providerState.accState,
                "acc_country": providerState.accCountry,
                "acc_zipcode": providerState.accZipcode,
                "pref_settle_type": providerState.prefSettleType,
                "bill_cycle": providerState.billCycle,
                "bill_week":providerState.billWeek,
                "bill_cycle_month":providerState.billCycleMonth,
                "bill_date":providerState.billDate,
                // "bill_date": "2023-06-30T18:30:00.000Z",
                "bill_due_tenor": providerState.billDueTenor,
                "bank_acc_num": providerState.bankAccNum,
                "bank_name": providerState.bankName,
                "bank_branch_name": providerState.bankBranchName,
                "ifsc_code": providerState.ifscCode,
                "micr_code": providerState.micrCode,
                "upload_cancel_cheque": "upload_cancel_cheque",

                "dgl_mno_files": uploadEdDocument,
                "dgl_acc_users": [
                    {
                        "id": rowForEdit?.dgl_acc_users[0]?.id,
                        "acc_user_unq_id": rowForEdit?.dgl_acc_users[0]?.acc_user_unq_id,
                        // "first_name": rowForEdit?.dgl_acc_users[0]?.first_name,
                        // "middle_name": rowForEdit?.dgl_acc_users[0]?.middle_name,
                        // "last_name": rowForEdit?.dgl_acc_users[0]?.last_name,
                        // "email":rowForEdit?.dgl_acc_users[0]?.email,
                        // "phone":rowForEdit?.dgl_acc_users[0]?.phone,

                        "first_name": providerState.userInfo.firstName,
                        "last_name": providerState.userInfo.lastName,
                        "middle_name": providerState.userInfo.middleName,
                        "email": providerState.userInfo.emailId,
                        "phone": providerState.userInfo.phoneNumber,
                        "profile_img": "http://dhoni",
                        "add_line1": rowForEdit?.dgl_acc_users[0]?.add_line1,
                        "add_line2": rowForEdit?.dgl_acc_users[0]?.add_line2,
                        "city": null,
                        "state": null,
                        "country": null,
                        "zipcode": null,
                        "status": "ACTIVE",
                        "dgl_acc_mno_id": null,
                        "dgl_roles_id": null,
                        "acc_password": rowForEdit?.dgl_acc_users[0]?.acc_password,
                        "language": null,
                        "orientation": null,
                        "time_zone": null
                    }
                ],

                "dgl_roles": rowForEdit?.dgl_roles,
                "acc_status": rowForEdit?.acc_status,
                "acc_unq_id": rowForEdit?.acc_unq_id,
                "acc_type": "Provider",
                "dgl_contracts": rowForEdit?.dgl_contracts
            }
            const resp = await apiUpdateProvider(updatePayload)

            if (resp.status === 'success') {
                OpenNotification('success', 'Updated successfully ')
                navigate('/account-menu-item-view-3')

            }
            if (resp.status === 'failed') {
                // setMessage(GetErrorMsg(resp));
                let data = GetErrorMsg(resp)
                let mess = Array.isArray(data)? data.join(", "): data
                OpenNotification('danger',mess)
            }

        }
    }

    const onPrevious = () => {
        if (mode == 'EDIT') {
            onChange(step - 2)
        } else {
            onChange(step - 1)
        }
    }


    useEffect(() => {
        if (rowForEdit) {

            const x = EditValuesToFieldsForProvider(provideIntialValues, rowForEdit)
            x.uploadFiles.map(e => {
                const matcheDobj = rowForEdit.dgl_mno_files.find(f => f.doc_name === e.doc_name)
                if (matcheDobj) {
                    e.file_name = matcheDobj.file_name
                    e.file_url = matcheDobj.file_url
                    e.file_type = matcheDobj.file_type
                    e.doc_name = matcheDobj.doc_name
                    e.id = matcheDobj.id
                }
            })
            setProviderState(x);
        }
    }, [provideIntialValues, rowForEdit])
    useEffect(() => {

        dispatch(getCurrency({ enterAccount }))
        dispatch(getParentAccount({ enterAccount }))
        dispatch(getProductCategory({ enterAccount }))
    }, [dispatch, enterAccount])


    let breadCrumbList = [{
        name: 'Accounts',
         link:"/account-menu-item-view-1/accounts"
    }, {
        name: 'Providers',
        link: "/account-menu-item-view-3"
    }, {
        name: `Create Provider`,
    }]

    if (mode === "EDIT") {
        breadCrumbList = [
            {
                name: 'Accounts',
                 link:"/account-menu-item-view-1/accounts",
            },
            {
                name: 'Providers',
                link: "/account-menu-item-view-3",
            },
                        {
                name: rowForEdit?.acc_name,
                link: '/account-menu-item-view-3',
                state:rowForEdit
            },
            {
                name: "Edit Provider"
            },
        ]
    }

    console.log('stepcontrol',providerState,provideIntialValues)

    return (
        provideIntialValues && <div>
            <div className='mb-5'>
                {/* Accounts/Providers/{mode === "EDIT" ? "Edit" : "Create"} Provider */}
                <CustomBreadcrumbs list={breadCrumbList} />
            </div>
            {mode === "ADD" ? <Steps current={step}>
                <Steps.Item title="PROVIDER DETAILS" />
                <Steps.Item title="MASTER USER" />
                <Steps.Item title="PREVIEW" />
            </Steps> : <Steps current={step}>
                <Steps.Item title="PROVIDER DETAILS" />
                <Steps.Item title="PREVIEW" />
            </Steps>}

            <div className="mt-6  bg-gray-50 dark:bg-gray-700 rounded ">
                {/* <h6>Step {`${step + 1}`}
                    content
   </h6> */}

                {step == 0 && (
                    <ProviderDetails
                        ref={childRef}
                        providerState={providerState}
                        setProviderState={setProviderState}
                        setStep={setStep}
                        step={step}
                        provideIntialValues={provideIntialValues}
                        setProviderIntialValues={setProviderIntialValues}
                        mode={mode}
                    />
                )}
                {step == 1 && (
                    <AdaptableCard className="h-full" bodyClass="h-full">
                        <ProviderMainUserInfo
                            ref={childRef2}
                            providerState={providerState}
                            setProviderState={setProviderState}
                            setStep={setStep}
                            step={step}
                            provideIntialValues={provideIntialValues}
                            setProviderIntialValues={setProviderIntialValues}
                        />
                    </AdaptableCard>
                )}

                {step == 2 && (
                    <AdaptableCard className="h-full" bodyClass="h-full">
                        <ProviderPreview providerState={providerState} step={step} setStep={setStep} message={message} mode={mode} />
                    </AdaptableCard>
                )}
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    {step > 0 && <Button
                        className="mx-2   "
                        style={{
                            backgroundColor: "#4D4D4D", 
                            fontStyle: 'normal',
                            fontSize: 500, fontSize: '18px',
                            color: "white"
                        }}
                        onClick={onPrevious}
                        type="button"

                    >
                        Previous
                    </Button>}
                </div>

                <div className='flex'>
                    {step >= 0 && (
                        <>
                            <Link
                                className="block lg:inline-block md:mb-0 mb-4"
                                to="/account-menu-item-view-3"
                            >
                                <Button
                                    className="mx-2"
                                    onClick={onPrevious}
                                    variant="solid"

                                    style={{
                                        backgroundColor: "#4D4D4D", 
                                        fontStyle: 'normal',
                                        fontweight: 500, fontSize: '18px'
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Link>
                        </>
                    )}
                    {step < 2 && (
                        <Button
                            onClick={onNext}
                            disabled={step === 2}
                            variant='solid'
                            style={{
                                color: "white", 
                                fontStyle: 'normal',
                                fontweight: 500, fontSize: '18px',
                            }}
                        >
                            {step === 2 ? 'Completed' : 'Next'}
                        </Button>
                    )}


                    {step === 2 && (
                        <>
                            {/* <Link
                            className="block lg:inline-block md:mb-0 mb-4"
                            to="/account-menu-item-view-3"
                        > */}
                            <Button onClick={submitApi}
                                variant='solid'
                                style={{
                                    color: "white", 
                                    fontStyle: 'normal',
                                    fontweight: 500, fontSize: '18px'
                                }}>
                                {'Submit for Approval'}
                            </Button>
                            {/* </Link> */}
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Controlled
