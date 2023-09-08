import React, { useEffect, useRef, useState } from 'react'
import { Steps, Button, Alert } from 'components/ui'
import NewOperators from './NewPartners'
import PartnerDetails from './PartnerDetails'
import { AdaptableCard } from 'components/shared'
import PartnersMainUserInfo from './PartnersMainUserInfo'
import PartnersPreview from './PartnersPreview'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { apiSubmitOperator } from 'services/OperatorsService'
import { BiArrowBack } from 'react-icons/bi'
import campareandCopy, { PartnerEditandCopy, PartnersPayload } from 'utils/campareandCopy'
import { apiSubmitPartner, apiUpdatePartner } from 'services/PartnersService'
import { useDispatch, useSelector } from 'react-redux'
import { getContractType, getCurrency, getParentAccount, getUploadFileType, } from '../store/dataSlice'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile'
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
    const mode = location.state?.mode ? location.state.mode : "ADD";

    const [partnerState, setPartnerState] = useState({})
    const [step, setStep] = useState(0)
    const navigate = useNavigate()
    const [message, setMessage] = useTimeOutMessage()

    let prtnerIntialValues = {
        accInfo: {

            accName: "",//not in api
            operater: "", //not in api
            accCompName: "",
            accIncorpDt: "",
            accTaxId: "",
            partnerType: "",//not in api
            accTimeZone: '',
            accCurrency: '',
            accLang: '',
            accOrient: '',
            apiConfig: "",//not in api,
            fields: []
        },
        ContactInfo: {
            accFirstName: "",
            acctLastName: "",
            accMiddleName: "",
            accEmailId: "",
            accPrimCont: "",
            accAltCont: "",
            accFax: "",
            accWebUrl: "",
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
            prefSettleType: "",
            billCycle: "",
            billWeek: "",
            billCycleMonth: "",
            billDate: "",
            // billDate: "",
            billDueTenor: "",
            bankAccNum: "",
            bankName: "",
            bankBranchName: "",
            ifscCode: "",
            micrCode: "",
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
            contractType: "",//not in api
            signedDate: "",//not in api
            enforcementDate: "",//not in api
            terminationDate: "",//not in api
            contractStatus: "",//not in api
            contractFile: ''
        },
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

    const [partnerIntialValues, setPartnerIntialValues] = useState()
    const operatorFileTypes = useSelector(state => state.partnerList?.data?.fileList)
    useEffect(() => {
        dispatch(getUploadFileType(enterAccount))
    }, [])
    useEffect(() => {
        if (operatorFileTypes?.res?.length) {
            let uploadArray = []
            for (let i = 0; i < operatorFileTypes?.res.length; i++) {
                if (operatorFileTypes?.res[i].acc_type === 'Partner') {
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
            prtnerIntialValues.uploadFiles = uploadArray
            setPartnerIntialValues(prtnerIntialValues)
        } else {
            setPartnerIntialValues(prtnerIntialValues)
        }
    }, [operatorFileTypes])

    const newvalue = {
        "accName": "fdgfdhgfh",
        "operater": 379,
        "accCompName": "gfhgfh",
        "accIncorpDt": "2023-06-06T18:30:00.000Z",
        "accTaxId": "12321313",
        "partnerType": 0,
        "accTimeZone": 2,
        "accCurrency": 15,
        "accLang": 2,
        "accOrient": "RTL",
        "apiConfig": "AUTOMATIC",
        "accFirstName": "rgerttrytr",
        "acctLastName": "",
        "accMiddleName": "etytrytry",
        "accEmailId": "yttryttr@gmail.com",
        "accPrimCont": "1234567891",
        "accAltCont": "3216549871",
        "accFax": "trtryty",
        "accWebUrl": "trytrytr",
        "accLastName": "fdgfdgfd",
        "accCountry": "dfgdfgfdgd",
        "accAddL1": "dfgdfgfdgd",
        "accAddL2": "fgdfgfdgfdg",
        "accCity": "fdgfgdfg",
        "accState": "gfdgdfgfdg",
        "accZipcode": "gfdgfdgg",
        "prefSettleType": "AUTOMATIC",
        "billCycle": "WEEKLY",
        "billDate": "2023-06-01T18:30:00.000Z",
        "billDueTenor": "12",
        "bankAccNum": "dsvfdsfdsf",
        "bankName": "dsfdsfds",
        "bankBranchName": "fdsfdsf",
        "ifscCode": "dsfdsfdf",
        "micrCode": "2134234",
        "userInfo": {
            "roleId": "",
            "firstName": "fdgdfg",
            "lastName": "gfdgdfgg",
            "emailId": "fdgfdggfd@gmail.com",
            "phoneNumber": "7896541231",
            "middleName": "dfgfdgfd"
        },
        "contractInfo": {
            "contractType": 5,
            "signedDate": "2023-06-09T18:30:00.000Z",
            "enforcementDate": "2023-06-07T18:30:00.000Z",
            "terminationDate": "2023-06-07T18:30:00.000Z",
            "contractStatus": "ACTIVE"
        }
    }

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

    const onNext = (values) => {
        if (step === 0) {
            childRef.current?.handleSubmitFromParent()
        }
        if (step === 1) {
            childRef2.current?.handleSubmitFromParent()
        }
    }

    const onPreviousold = () => {


        if (mode === "EDIT") {
            onChange(0)
        } else
            onChange(step - 1)
    }


    const convertKeysToCamelCase = obj => {
        if (typeof obj !== "object" || obj === null) {
            return obj;
        }

        if (Array.isArray(obj)) {
            return obj.map(convertKeysToCamelCase);
        }

        const camelCaseObj = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                const camelCaseKey = key.replace(/_([a-z])/g, function (match, letter) {
                    return letter.toUpperCase();
                });
                camelCaseObj[camelCaseKey] = convertKeysToCamelCase(obj[key]);
            }
        }

        return camelCaseObj;
    }

    const onNextold = (values) => {
        console.log("onNextonNext", values, step)

        switch (mode) {
            case "ADD":
                if (step === 0) {
                    childRef.current?.handleSubmitFromParent()
                }
                if (step === 1) {
                    childRef2.current?.handleSubmitFromParent()
                }
                break;

            case "EDIT":
                if (step === 0) {


                    console.log(rowForEdit);
                    let comp = convertKeysToCamelCase(rowForEdit);

                    let temporary = campareandCopy(newvalue, comp);


                    setPartnerState(temporary);

                    childRef.current?.handleSubmitFromParent()

                    // childRef2.current?.handleSubmitFromParent()
                    onChange(step + 2)
                }

                break;

            default:
        }

    }


    const submitApi = async () => {
        let uploadEdDocument = concat(partnerState?.uploadFiles, partnerState?.additionalFiles)

        // console.log('submitApi',partnerState?.fields)
        // console.log('submitApi1',partnerState?.fieldsContact)
        let allFeilds = [...partnerState?.fields,...partnerState?.fieldsContact]
//         console.log('submitApi1',allFeilds)

// return
        // console.log(partnerState)
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
                "acc_mno_parent": acc_mno_parent_id,
                "acc_name": partnerState.accName,
                "acc_parent": partnerState.operater,
                "acc_comp_name": partnerState.accCompName,
                "acc_incorp_dt": partnerState.accIncorpDt,
                "acc_tax_id": partnerState.accTaxId,
                "acc_time_zone": partnerState.accTimeZone,
                "acc_currency": partnerState.accCurrency,
                "acc_lang": partnerState.accLang,
                "acc_orient": partnerState.accOrient,
                "partner_type": partnerState.partnerType,
                "dgl_acc_mno_custom_fields": allFeilds,
                "acc_prim_cont": partnerState.accPrimContName,
                "acc_email_id": partnerState.accEmailId,
                "acc_phone": partnerState.accPrimCont,
                "acc_alt_cont": partnerState.accAltCont,
                "acc_fax": partnerState.accFax,
                "acc_web_url": partnerState.accWebUrl,
                "acc_add_l1": partnerState.accAddL1,
                "acc_add_l2": partnerState.accAddL2,
                "acc_city": partnerState.accCity,
                "acc_state": partnerState.accState,
                "acc_country": partnerState.accCountry,
                "acc_zipcode": partnerState.accZipcode,
                "pref_settle_type": partnerState.prefSettleType,
                "bill_cycle": partnerState.billCycle,
                "bill_cycle_month": partnerState.billCycleMonth,
                "bill_date": partnerState.billDate,
                "bill_week": partnerState.billWeek,
                // "bill_date": "2023-06-30T18:30:00.000Z",
                "bill_due_tenor": partnerState.billDueTenor,
                "bank_branch_name": partnerState.bankBranchName,
                "bank_acc_num": partnerState.bankAccNum,
                "bank_name": partnerState.bankName,
                "ifsc_code": partnerState.ifscCode,
                "micr_code": partnerState.micrCode,
                "upload_cancel_cheque": partnerState.uploadCancelledCheque,
                "acc_api_config": partnerState.apiConfig,
                "acc_last_name": partnerState.accLastName,
                "acc_middle_name": partnerState.accMiddleName,
                "acc_first_name": partnerState.accFirstName,
                "acc_status": "ACTIVE",
                "acc_type": "Partner",
                "dgl_mno_files": uploadEdDocument,
                "dgl_acc_users": [
                    {
                        "first_name": partnerState.userInfo.firstName,
                        "last_name": partnerState.userInfo.lastName,
                        "email": partnerState.userInfo.emailId,
                        "phone": partnerState.userInfo.phoneNumber,
                        "status": "ACTIVE",
                        "acc_password": "12345",
                        "profile_img": "profile_img",
                        "add_line1": "hyderabad",
                        "add_line2": "Banglore",
                        "middle_name": partnerState.userInfo.middleName,
                    }
                ],
                "dgl_roles": [
                    {
                        "role_name": partnerState?.userRole,
                        "role_desc": partnerState?.description,
                        "permissions": "json string",
                        "status": 1,
                        "public_role_id": partnerState?.publicRole,
                        "dgl_acc_mno_id": acc_mno_id,
                    }
                ],
                "acc_status": "ACTIVE",
                "acc_type": "Partner",
                "dgl_contracts": [
                    {
                        "contract_name": "Provide Contract",
                        "contract_file": partnerState.contractInfo.contractFile,
                        "contr_desc": "Provider Description",
                        "enforce_date": partnerState.contractInfo.enforcementDate,
                        "signed_date": partnerState.contractInfo.signedDate,
                        "status": partnerState.contractInfo.contractStatus,
                        "terminate_date": partnerState.contractInfo.terminationDate,
                        "dgl_acc_mno_id": acc_mno_id,
                        "dgl_md_contract_type_id": partnerState.contractInfo.contractType,
                        "dgl_contracts_receiving_parties": 1
                    }
                ]
            }
            const resp = await apiSubmitPartner(createbody)

            if (resp.status === 'success') {


                OpenNotification('success', 'Created successfully ')
                navigate('/account-menu-item-view-4');

            }

            if (resp.status === 'failed') {
                // setMessage(GetErrorMsg(resp));
                let data = GetErrorMsg(resp)
                let mess = Array.isArray(data)? data.join(", "): data
                OpenNotification('danger',mess)
            }
        } else if (mode === "EDIT") {

            console.log(partnerState, "partnerState")
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

            let updatebody = {
                "id": rowForEdit?.id,
                "acc_mno_parent": acc_mno_parent_id,
                "acc_name": partnerState.accName,
                "acc_parent": partnerState.operater,
                "acc_comp_name": partnerState.accCompName,
                "acc_incorp_dt": partnerState.accIncorpDt,
                "acc_tax_id": partnerState.accTaxId,
                "acc_time_zone": partnerState.accTimeZone,
                "acc_currency": partnerState.accCurrency,
                "acc_lang": partnerState.accLang,
                "acc_orient": partnerState.accOrient,
                "partner_type": partnerState.partnerType,
                "acc_api_config": partnerState.apiConfig,
                "dgl_acc_mno_custom_fields": allFeilds,
                "acc_prim_cont": partnerState.accPrimContName,
                "acc_email_id": partnerState.accEmailId,
                "acc_phone": partnerState.accPrimCont,
                "acc_alt_cont": partnerState.accAltCont,
                "acc_fax": partnerState.accFax,
                "acc_web_url": partnerState.accWebUrl,

                "acc_add_l1": partnerState.accAddL1,
                "acc_add_l2": partnerState.accAddL2,
                "acc_city": partnerState.accCity,
                "acc_state": partnerState.accState,
                "acc_country": partnerState.accCountry,
                "acc_zipcode": partnerState.accZipcode,
                "pref_settle_type": partnerState.prefSettleType,
                "bill_cycle": partnerState.billCycle,
                "bill_cycle_month": partnerState.billCycleMonth,
                "bill_date": partnerState.billDate,
                "bill_week": partnerState.billWeek,
                // "bill_date": "2023-06-30T18:30:00.000Z",
                "bill_due_tenor": partnerState.billDueTenor,
                "bank_acc_num": partnerState.bankAccNum,
                "bank_name": partnerState.bankName,
                "bank_branch_name": partnerState.bankBranchName,
                "ifsc_code": partnerState.ifscCode,
                "micr_code": partnerState.micrCode,
                "upload_cancel_cheque": null,
                "acc_last_name": partnerState.accLastName,
                "acc_middle_name": partnerState.accMiddleName,
                "acc_first_name": partnerState.accFirstName,
                "dgl_mno_files": uploadEdDocument,
                "dgl_roles": rowForEdit?.dgl_roles,
                "dgl_acc_users": [
                    {
                        "id": rowForEdit?.dgl_acc_users[0]?.id,
                        "acc_user_unq_id": rowForEdit?.dgl_acc_users[0]?.acc_user_unq_id,
                        "first_name": partnerState.userInfo.firstName,
                        "last_name": partnerState.userInfo.lastName,
                        "email": partnerState.userInfo.emailId,
                        "phone": partnerState.userInfo.phoneNumber,
                        "middle_name": partnerState.userInfo.middleName,
                        "profile_img": "profile_img",
                        "add_line1": "hyderabad",
                        "add_line2": "Banglore",
                        "city": null,
                        "state": null,
                        "country": null,
                        "zipcode": null,
                        "status": "ACTIVE",
                        "dgl_acc_mno_id": null,
                        "dgl_roles_id": null,
                        "acc_password": "{bcrypt}$2a$10$yDuEijEUe5smrgUjV/n5kOH3qXxCn9rrFCy7Tpgvrh91prTThU.pq"
                    }
                ],
                "acc_status": rowForEdit?.acc_status,
                "acc_unq_id": rowForEdit?.acc_unq_id,
                "acc_type": "Partner",
                "dgl_contracts": [
                    {
                        "id": rowForEdit?.dgl_contracts[0]?.id,
                        "contract_name": "Provide Contract",
                        "status": partnerState.contractInfo.contractStatus,
                        "contract_unq_id": rowForEdit?.dgl_contracts[0]?.contract_unq_id,
                        "contract_file": "http://Url",
                        "signed_date": partnerState.contractInfo.signedDate,
                        "enforce_date": partnerState.contractInfo.enforcementDate,
                        "terminate_date": partnerState.contractInfo.terminationDate,
                        "contr_desc": "Provider Description",
                        "dgl_acc_mno_id": rowForEdit?.dgl_contracts[0]?.dgl_acc_mno_id,
                        "dgl_contracts_receiving_parties": 1,
                        "dgl_md_contract_type_id": partnerState.contractInfo.contractType
                    }
                ]

            }
            const resp = await apiUpdatePartner(updatebody)


            if (resp.status === 'success') {
                OpenNotification('success', 'Updated successfully ')
                navigate('/account-menu-item-view-4');

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

            const ptIntialValues = PartnerEditandCopy(prtnerIntialValues, rowForEdit)
            ptIntialValues.uploadFiles.map(e => {
                const matcheDobj = rowForEdit.dgl_mno_files.find(f => f.doc_name === e.doc_name)
                if (matcheDobj) {
                    e.file_name = matcheDobj.file_name
                    e.file_url = matcheDobj.file_url
                    e.file_type = matcheDobj.file_type
                    e.doc_name = matcheDobj.doc_name
                    e.id = matcheDobj.id
                }
            })
            setPartnerState(ptIntialValues);
        }

    }, [partnerIntialValues, rowForEdit])

    useEffect(() => {

        dispatch(getCurrency({ enterAccount }))
        dispatch(getParentAccount({ enterAccount }))





    }, [dispatch, enterAccount])

    let breadCrumbList = [{
        name: 'Accounts',
         link:"/Accounts"
    }, {
        name: 'Partners',
        link: "/account-menu-item-view-4"
    }, {
        name: `Create Partner`,
    }]
    if (mode === "EDIT") {
        breadCrumbList = [
            {
                name: 'Accounts',
                 link: '/home',
            },
            {
                name: 'Partners',
                link: '/account-menu-item-view-4',
            },
            {
                name: rowForEdit?.acc_name,
                link: '/account-menu-item-view-4',
                state:rowForEdit
            },
            {
                name: "Edit Partner" 
            },
        ]
    }


    return (
        partnerIntialValues && <div>
            {/* <div className='mb-5'>Accounts/Partners/{mode === "EDIT" ? "Edit" : "Create"} Partner</div> */}
            <CustomBreadcrumbs list={breadCrumbList} />
            {mode === "ADD" ? <Steps current={step}>
                <Steps.Item title="PARTNER DETAILS" />
                <Steps.Item title="MASTER USER" />
                <Steps.Item title="PREVIEW" />
            </Steps> : <Steps current={step}>
                <Steps.Item title="PARTNER DETAILS" />
                <Steps.Item title="PREVIEW" />
            </Steps>}

            <div className="mt-6  bg-gray-50 dark:bg-gray-700 rounded ">
                {/* <h6>Step {`${step + 1}`}
                    content
   </h6> */}

                {step === 0 && (
                    <PartnerDetails
                        ref={childRef}
                        partnerState={partnerState}
                        setPartnerState={setPartnerState}
                        setStep={setStep}
                        step={step}
                        partnerIntialValues={partnerIntialValues}
                        setPartnerIntialValues={setPartnerIntialValues}
                        mode={mode}
                    />
                )}
                {step === 1 && (
                    <AdaptableCard className="h-full" bodyClass="h-full">
                        <PartnersMainUserInfo
                            ref={childRef2}
                            partnerState={partnerState}
                            setPartnerState={setPartnerState}
                            setStep={setStep}
                            step={step}
                            partnerIntialValues={partnerIntialValues}
                            setPartnerIntialValues={setPartnerIntialValues}
                        />
                    </AdaptableCard>
                )}

                {step === 2 && (

                    <AdaptableCard className="h-full" bodyClass="h-full">



                        <PartnersPreview partnerState={partnerState} step={step} setStep={setStep} message={message} mode={mode} />
                    </AdaptableCard>
                )}
            </div>
            <div className="mt-4  flex justify-between">

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
                                className="block lg:inline-block md:mb-0 "
                                to="/account-menu-item-view-4"
                            >
                                <Button
                                    className="mx-2"
                                    onClick={onPrevious}
                                    variant="solid"
                                    style={{
                                        backgroundColor: "#4D4D4D", 
                                        fontStyle: 'normal',
                                        fontSize: 500, fontSize: '18px',
                                        color: "white"
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Link>
                        </>
                    )}
                    {step < 2 && (
                        <Button
                            variant='solid'
                            onClick={onNext}
                            disabled={step === 2}
                            style={{
                                
                                fontStyle: 'normal',
                                fontSize: 500, fontSize: '18px',
                                color: "white"
                            }}
                        >
                            {step === 2 ? 'Completed' : 'Next'}
                        </Button>
                    )}

                    {step === 2 && (
                        <>
                            {/* <Link
                            className="block lg:inline-block md:mb-0 mb-4"
                            to="/account-menu-item-view-4"
                        > */}
                            <Button onClick={submitApi} variant="solid" style={{
                                
                                fontStyle: 'normal',
                                fontSize: 500, fontSize: '18px',
                                color: "white"
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
