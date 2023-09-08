import React, { useEffect, useState } from 'react'
import { Steps, Button } from 'components/ui'
import OperatorDetails from './OperatorDetails'
import { AdaptableCard } from 'components/shared'
import MasterPermissionBox from './MasterPermissionBox'
import OperatorMasterInfo from './OperatorMasterInfo'
import OperatorPreview from './OperatorPreview'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { apiSubmitOperator, apiUpdateOperator } from 'services/OperatorsService'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { EditandCopy } from 'utils/campareandCopy'
import { useDispatch, useSelector } from 'react-redux'
import {
    getCurrency,
    getParentAccount,
    getPublicRoles,
    getUploadFileType,
} from '../store/dataSlice'
import { injectReducer } from 'store/index'
import reducer from '../store'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile'
import { concat } from 'lodash'
import { upload } from '@testing-library/user-event/dist/upload'
import cloneDeep from 'lodash/cloneDeep'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'

injectReducer('salesOrderList', reducer)

const Controlled = () => {
    const dispatch = useDispatch()
    const {
        enterAccount,
        password,
        rememberMe,
        usernameOrEmail,
        acc_mno_parent_unq_id,
        acc_mno_parent_id
    } = useSelector((state) => state.auth.user)
    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.salesOrderList.data.tableData
    )
    console.log(acc_mno_parent_id, "acc_mno_parent_id", enterAccount)
    const location = useLocation()
    const mode = location.state?.mode ? location.state.mode : 'ADD'
    const rowForEdit = location.state?.data
    const navigate = useNavigate()

    console.log('rowForEdit',rowForEdit)
    const [message, setMessage] = useTimeOutMessage()

    const validationSchema = Yup.object().shape({
        accInfo: Yup.object().shape({
            accName: Yup.string()
                .required('Please enter a valid operater title')
                .nullable(),
            accMnoParentId: Yup.string()
                .required('Please select a parent account ')
                .nullable(),
            accCompName: Yup.string()
                .required('Please enter a valid company name')
                .nullable(),
            accIncorpDt: Yup.string()
                .required('Please select a valid incorporation date')
                .nullable(),
            accTaxId: Yup.string().required('Please enter a valid tax ID').nullable(),
            accCurrency: Yup.string()
                .required('Please select a currency ')
                .nullable(),
            accLang: Yup.string().required('Please select a language ').nullable(),
            accTimeZone: Yup.string()
                .required('Please select a time zone ')
                .nullable(),
            accOrient: Yup.string()
                .required('Please select a display orientation')
                .nullable(),
        }),
        ContactInfo: Yup.object().shape({
            // accPrimContName: Yup.string().required("Please Enter Primary Contact"),
            custFirstName: Yup.string()
                .required('Please enter a valid first name ')
                .nullable(),

            custLastName: Yup.string()
                .required('Please enter a valid last name')
                .nullable(),

            accEmailId: Yup.string()
                .email('Please enter a valid email address')
                .required('Please enter a valid email address.')
                .nullable(),
            accPrimCont: Yup.string().min(2, "Number must be atleast 2 characters").max(20, "Max 20 characters are allowed")
                .required("Please enter a valid phone number").nullable(),
        }),
        address: Yup.object().shape({
            accCountry: Yup.string()
                .required('Please enter a valid country')
                .nullable(),
            accAddL1: Yup.string()
                .required('Please enter a valid address')
                .nullable(),
            accCity: Yup.string().required('Please enter a valid city').nullable(),
            accState: Yup.string()
                .required('Please enter a valid state')
                .nullable(),
        }),
        billing: Yup.object().shape({
            // accUsername: Yup.string().required('Please enter username').nullable(),
            // accPassword: Yup.string().required('Please enter password').nullable(),
            // accEndPointUrl: Yup.string().required('Please enter a valid end point URL').nullable(),
            // accSftpAdd: Yup.string().required('Please enter SFTP address or URL').nullable(),
            // accPortNo: Yup.string().required('Please enter port number').nullable(),
        }),
    })
    const masterUserInfoSchema = Yup.object().shape({
        userInfo: Yup.object().shape({
            //roleId: Yup.string().required('Please Select RoleId'),
            firstName: Yup.string()
                .required('Please enter first name')
                .nullable(),
            lastName: Yup.string()
                .required('Please enter last name')
                .nullable(),
            emailId: Yup.string()
                .email('Invalid email')
                .required('Please enter a valid email id')
                .nullable(),
            phoneNumber: Yup.string().min(2, "Number must be atleast 2 characters").max(20, "Max 20 characters are allowed")
                .required("Please enter phone number").nullable(),
        }),
    })

    const masterPermissionsInfoSchema = Yup.object().shape({
        permissionInfo: Yup.object().shape({
            publicRole: Yup.string()
                .required('Please select a master role ')
                .nullable(),
            userRole: Yup.string()
                .required('Please enter a valid user role title')
                .nullable(),
        }),
    })

    let opIntialValues = {
        accInfo: {
            operatrId: '',
            accName: '',
            globalMno: '', //not in api
            accMnoParentId: '', //not in api
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
            custFirstName: '',
            custMiddleName: '',
            custLastName: '',
            //accPrimContName: "",//not in api
            accEmailId: '',
            accPrimCont: '',
            accAltCont: '',
            accFax: '',
            accWebUrl: '',
            fieldsContact:[]
        },
        address: {
            accCountry: '',
            accAddL1: '',
            accAddL2: '',
            accCity: '',
            accState: '',
            accZipcode: '',
        },
        billing: {
            accUsername: '',
            accPassword: '',
            accEndPointUrl: '',
            accSftpAdd: '',
            accPortNo: '',
            sameCorrespondenceAddress: false,
            csvFileUrl : ""
        },
        userInfo: {
            roleId: '',
            firstName: '',
            lastName: '',
            middleName: '',
            emailId: '',
            phoneNumber: '',
        },
        permissionInfo: {
            publicRole: '',
            userRole: '',
            description: '',
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
    const operatorFileTypes = useSelector(state => state.salesOrderList?.data?.fileList)

    const [operatorIntialValues, setOperatorIntialValues] = useState()

    useEffect(() => {
        if (operatorFileTypes) {
            if (operatorFileTypes?.res?.length) {
                let uploadArray = []
                for (let i = 0; i < operatorFileTypes?.res.length; i++) {
                    if (operatorFileTypes?.res[i].acc_type === 'Operator') {
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
                opIntialValues.uploadFiles = uploadArray
                setOperatorIntialValues(opIntialValues)
            } else {
                setOperatorIntialValues(opIntialValues)
            }
        }

    }, [operatorFileTypes])
    const [operaterState, setOperaterState] = useState({})
    const [uploadFiles, setUploadFilesData] = useState({})

    const [step, setStep] = useState(0)

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
        console.log('onNextonNext', values, step)
        let isUploaded = values.uploadFiles?.filter(e => e.doc_type.is_mandatory === true).every(e => e.file_name !== "")
        if (isUploaded) {
            switch (mode) {
                case 'ADD':
                    onChange(step + 1)
                    break

                case 'EDIT':
                    if (step === 0) {
                        onChange(step + 3)
                    }

                    break

                default:
            }
        }
        else {
            OpenNotification('warning', 'Please upload the required documents')
        }

    }

    const submitApi = async () => {
        console.log('fields', operaterState.allCustomfields)
        let uploadEdDocument = concat(operaterState?.uploadFiles, operaterState?.additionalFiles)

        if (mode === 'ADD') {
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
                acc_mno_parent: acc_mno_parent_id,
                acc_name: operaterState.accName,
                acc_parent: operaterState.accMnoParentId,
                acc_comp_name: operaterState.accCompName,
                acc_incorp_dt: operaterState.accIncorpDt,
                acc_tax_id: operaterState.accTaxId,
                acc_time_zone: operaterState.accTimeZone,
                acc_currency: operaterState.accCurrency,
                acc_lang: operaterState.accLang,
                acc_orient: operaterState.accOrient,
                dgl_acc_mno_custom_fields: operaterState.allCustomfields,
                //"acc_prim_cont": operaterState.accPrimContName,
                acc_email_id: operaterState.accEmailId,
                acc_phone: operaterState.accPrimCont,
                acc_alt_cont: operaterState.accAltCont,
                acc_fax: operaterState.accFax,
                acc_web_url: operaterState.accWebUrl,
                acc_add_l1: operaterState.accAddL1,
                acc_add_l2: operaterState.accAddL2,
                acc_city: operaterState.accCity,
                acc_state: operaterState.accState,
                acc_country: operaterState.accCountry,
                acc_zipcode: operaterState.accZipcode,
                acc_is_billing_centre: operaterState.sameCorrespondenceAddress,
                acc_end_point_url: operaterState.accEndPointUrl,
                acc_csv_url: operaterState.csvFileUrl,
                acc_sftp_add: operaterState.accSftpAdd,
                acc_port_no: operaterState.accPortNo,
                acc_username: operaterState.accUsername,
                acc_password: operaterState.accPassword,

                acc_first_name: operaterState.custFirstName,
                acc_middle_name: operaterState.custMiddleName,
                acc_last_name: operaterState.custLastName,
                dgl_mno_files: uploadEdDocument,
                dgl_roles: [
                    {
                        role_name: operaterState.permissionInfo.userRole,
                        role_desc: operaterState.permissionInfo.description,
                        permissions: 'json string',
                        status: 'ACTIVE',
                        public_role_id: operaterState.permissionInfo.publicRole,
                    },
                ],
                dgl_acc_users: [
                    {
                        first_name: operaterState.userInfo.firstName,
                        last_name: operaterState.userInfo.lastName,
                        email: operaterState.userInfo.emailId,
                        phone: operaterState.userInfo.phoneNumber,
                        status: 'ACTIVE',
                        add_line1: '',
                        add_line2: '',
                        profile_img: '',
                        acc_password: '12345',
                    },
                ],
                acc_status: 'ACTIVE',

                acc_type: 'Operator',
            }
            const resp = await apiSubmitOperator(createbody)

            if (resp.status === 'success') {

                OpenNotification('success', 'Created successfully ')
                navigate('/account-menu-item-view-2');


            }

            if (resp.status === 'failed') {
                // setMessage(resp.message);
                // console.log('data',GetErrorMsg(resp))
                let data = GetErrorMsg(resp)
                let mess = Array.isArray(data)? data.join(", "): data
                OpenNotification('danger',mess)
                // setMessage(GetErrorMsg(resp))
            }
        } else if (mode === 'EDIT') {
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
                acc_mno_parent: acc_mno_parent_id,
                acc_name: operaterState.accName,
                acc_parent: operaterState.accMnoParentId,
                acc_comp_name: operaterState.accCompName,
                acc_incorp_dt: operaterState.accIncorpDt,
                acc_tax_id: operaterState.accTaxId,
                acc_time_zone: operaterState.accTimeZone,
                acc_currency: operaterState.accCurrency,
                acc_lang: operaterState.accLang,
                acc_orient: operaterState.accOrient,
                dgl_acc_mno_custom_fields: operaterState.allCustomfields,
                //"acc_prim_cont": operaterState.accPrimContName,
                acc_email_id: operaterState.accEmailId,
                acc_phone: operaterState.accPrimCont,
                acc_alt_cont: operaterState.accAltCont,
                acc_fax: operaterState.accFax,
                acc_web_url: operaterState.accWebUrl,
                acc_add_l1: operaterState.accAddL1,
                acc_add_l2: operaterState.accAddL2,
                acc_city: operaterState.accCity,
                acc_state: operaterState.accState,
                acc_country: operaterState.accCountry,
                acc_zipcode: operaterState.accZipcode,
                acc_is_billing_centre: operaterState.sameCorrespondenceAddress,
                acc_end_point_url: operaterState.accEndPointUrl,
                acc_csv_url: 'http://cdnurl/',
                acc_sftp_add: operaterState.accSftpAdd,
                acc_port_no: operaterState.accPortNo,
                acc_username: operaterState.accUsername,
                acc_password: operaterState.accPassword,
                acc_first_name: operaterState.custFirstName,
                acc_middle_name: operaterState.custMiddleName,
                acc_last_name: operaterState.custLastName,

                dgl_mno_files: uploadEdDocument,
                dgl_roles: [
                    {
                        id: rowForEdit?.dgl_roles[0]?.id,

                        role_name: operaterState.permissionInfo.userRole,
                        role_desc: operaterState.permissionInfo.description,
                        permissions: 'json string',
                        status: 'ACTIVE',
                        public_role_id: operaterState.permissionInfo.publicRole,
                        role_unq_id: rowForEdit?.dgl_roles[0]?.role_unq_id,
                    },
                ],
                dgl_acc_users: [
                    {
                        id: rowForEdit?.dgl_acc_users[0]?.id,
                        first_name: operaterState.userInfo.firstName,
                        last_name: operaterState.userInfo.lastName,
                        email: operaterState.userInfo.emailId,
                        phone: operaterState.userInfo.phoneNumber,
                        acc_user_unq_id:
                            rowForEdit?.dgl_acc_users[0]?.acc_user_unq_id,
                        status: 'ACTIVE',
                        add_line1: 'church',
                        add_line2: 'road',
                        profile_img: 'http//view',
                        add_line1: 'church',
                        add_line2: 'road',
                        city: null,
                        state: null,
                        country: null,
                        zipcode: null,
                        dgl_acc_mno_id: null,
                        dgl_roles_id: null,
                        acc_password:
                            '$2a$10$LYGcopErp5ujenNFg9LucOEWwrdgbx1DS4So0Bvow8bk9qgkE40Tm',
                    },
                ],
                acc_status: rowForEdit?.acc_status,
                id: rowForEdit?.id,
                acc_unq_id: rowForEdit?.acc_unq_id,
                acc_type: 'Operator',
            }

            const resp = await apiUpdateOperator(updatebody)

            if (resp.status === 'success') {

                OpenNotification('success', 'Updated successfully ')
                navigate('/account-menu-item-view-2');

            }

            if (resp.status === 'failed') {
                // setMessage(GetErrorMsg(resp))
                let data = GetErrorMsg(resp)
                let mess = Array.isArray(data)? data.join(", "): data
                OpenNotification('danger',mess)
            }
        }
    }

    const onPrevious = () => {
        if (mode === 'EDIT') {
            onChange(0)
        } else onChange(step - 1)
    }

    const setValidationsSchema = () => {
        switch (step) {
            case 0:
                return validationSchema
            case 1:
                return masterPermissionsInfoSchema
            case 2:
                return masterUserInfoSchema
            default:
                return null
        }
    }
    const setSubmissionPayload = (values) => {
        console.log('calessssss', values)

        let updatedPayload = {}

        switch (step) {
            case 0:
                updatedPayload = {
                    ...operaterState,
                    ...values.accInfo,
                    ...values.ContactInfo,
                    ...values.billing,
                    ...values.address,
                    uploadFiles: [...values.uploadFiles],
                    additionalFiles: [...values.additionalFiles],
                    allCustomfields: [...values.accInfo.fields, ...values.ContactInfo.fieldsContact]
                }

                if (mode === 'EDIT') {
                    updatedPayload = {
                        ...updatedPayload,
                        userInfo: values.userInfo,
                        permissionInfo: values.permissionInfo,
                    }
                }

                setOperaterState(updatedPayload)
                break

            case 1:
                updatedPayload = {
                    ...operaterState,
                    permissionInfo: values.permissionInfo,
                }

                // if (mode === "EDIT") {
                //     updatedPayload = { ...updatedPayload, permissionInfo: values.permissionInfo };

                // }

                setOperaterState(updatedPayload)
                break
            case 2:
                updatedPayload = { ...operaterState, userInfo: values.userInfo }
                setOperaterState(updatedPayload)
                break

            default:
                break
        }
    }

    useEffect(() => {
        if (rowForEdit) {
            const opIntialvValues = EditandCopy(
                opIntialValues,
                rowForEdit
            )
            opIntialvValues?.uploadFiles.map(e => {
                const matcheDobj = rowForEdit?.dgl_mno_files.find(f => f.doc_name === e.doc_name)
                if (matcheDobj) {
                    e.file_name = matcheDobj.file_name
                    e.file_url = matcheDobj.file_url
                    e.file_type = matcheDobj.file_type
                    e.doc_name = matcheDobj.doc_name
                    e.id = matcheDobj.id
                }
            })
            setOperaterState(opIntialvValues)
            


        }
    }, [rowForEdit])

    useEffect(() => {
        dispatch(getCurrency({ enterAccount }))
        dispatch(getParentAccount({ enterAccount }))
        dispatch(getPublicRoles({ acc_mno_parent_unq_id }))
    }, [dispatch, enterAccount, acc_mno_parent_unq_id])

    let  breadCrumbList=[{
        name:'Accounts',
         link:"/account-menu-item-view-1/accounts"
    },{
        name:'Operators',
        link:"/account-menu-item-view-2"
    },{
        name: `Create Operator`,
    }]

    if(mode==="EDIT"){
        breadCrumbList = [
            {
                name:'Accounts',
                link:"/account-menu-item-view-1/accounts",
            },
            {
                name:'Operators',
                link:"/account-menu-item-view-2",
            },
            {
                name: rowForEdit?.acc_name,
                link: '/account-menu-item-view-2',
                state:rowForEdit
            },
            {
                name : "Edit Operator"
            },
        ]
    }



    console.log('operaterState',operaterState)

    return (
        <div>
            <div className="mb-5">
                 <CustomBreadcrumbs  list={breadCrumbList} />
            </div>

            {operatorIntialValues && <Formik
                className="mt-5"
                initialValues={operatorIntialValues}
                validationSchema={setValidationsSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    console.log('operators', values)
                    setSubmissionPayload(values)
                    setUploadFilesData(values)
                    onNext(values)
                }}
            >
                {({ errors, touched, values, setFieldValue }) => (
                    <Form enctype="multipart/form-data">
                        {mode === "ADD" ? <Steps current={step}>
                            <Steps.Item title="OPERATOR DETAILS" />
                            <Steps.Item title="MASTER PERMISSIONS" />
                            <Steps.Item title="MASTER USER" />
                            <Steps.Item title="PREVIEW" />
                        </Steps> : <Steps current={step}>
                            <Steps.Item title="OPERATOR DETAILS" />
                            <Steps.Item title="PREVIEW" />
                        </Steps>}
                        <div className="mt-6  bg-gray-50 dark:bg-gray-700 rounded ">
                            {step === 0 && (
                                <OperatorDetails
                                    operaterState={operaterState}
                                    setOperaterState={setOperaterState}
                                    operatorIntialValues={operatorIntialValues}
                                    setOperatorIntialValues={
                                        setOperatorIntialValues
                                    }
                                    errors={errors || {}}
                                    touched={touched || {}}
                                    values={values || {}}
                                    setFieldValue={setFieldValue}
                                />
                            )}
                            {step === 1 && (
                                <AdaptableCard
                                    className="h-full"
                                    bodyClass="h-full"
                                >
                                    <MasterPermissionBox
                                        operaterState={operaterState}
                                        setOperaterState={setOperaterState}
                                        operatorIntialValues={
                                            operatorIntialValues
                                        }
                                        setOperatorIntialValues={
                                            setOperatorIntialValues
                                        }
                                        errors={errors?.permissionInfo || {}}
                                        touched={touched?.permissionInfo || {}}
                                        values={values?.permissionInfo || {}}
                                        setFieldValue={setFieldValue}
                                    />
                                </AdaptableCard>
                            )}
                            {step === 2 && (
                                <AdaptableCard
                                    className="h-full"
                                    bodyClass="h-full"
                                >
                                    <OperatorMasterInfo
                                        operaterState={operaterState}
                                        setOperaterState={setOperaterState}
                                        operatorIntialValues={
                                            operatorIntialValues
                                        }
                                        setOperatorIntialValues={
                                            setOperatorIntialValues
                                        }
                                        errors={errors || {}}
                                        touched={touched || {}}
                                        values={values || {}}
                                        setFieldValue={setFieldValue}
                                    />
                                </AdaptableCard>
                            )}
                            {step === 3 && (
                                <AdaptableCard
                                    className="h-full"
                                    bodyClass="h-full"
                                >
                                    <OperatorPreview
                                        operaterState={operaterState}
                                        step={step}
                                        setStep={setStep}
                                        message={message}
                                        mode={mode}
                                    />
                                </AdaptableCard>
                            )}
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                {step > 0 && (
                                    <Button
                                        className="mx-2   "
                                        style={{
                                            backgroundColor: '#4D4D4D',
                                            fontSize: '18px',
                                            color: 'white',
                                        }}
                                        onClick={onPrevious}
                                        type="button"
                                    >
                                        Previous
                                    </Button>
                                )}
                            </div>

                            <div className='flex gap-2'>
                                {step >= 0 && (
                                    <>
                                        <Link
                                            className="block lg:inline-block md:mb-0 mb-4"
                                            to="/account-menu-item-view-2"
                                        >
                                            <Button
                                                // className="mx-2"
                                                onClick={onPrevious}
                                                variant="solid"
                                                type="button"
                                                style={{
                                                    backgroundColor: '#4D4D4D',
                                                    
                                                    fontStyle: 'normal',
                                                    fontweight: 500,
                                                    fontSize: '18px',
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </Link>
                                    </>
                                )}
                                {step < 3 && (
                                    <Button
                                        variant="solid"
                                        disabled={step === 3}
                                        type="submit"
                                        style={{
                                            color: 'white',
                                            
                                            fontStyle: 'normal',
                                            fontweight: 500,
                                            fontSize: '18px',
                                        }}
                                    >
                                        {step === 3 ? 'Completed' : 'Next'}
                                    </Button>
                                )}
                                {step === 3 && (
                                    <>
                                        <Button
                                            onClick={submitApi}
                                            variant="solid"
                                            style={{
                                                color: 'white',
                                                
                                                fontStyle: 'normal',
                                                fontweight: 500,
                                                fontSize: '18px',
                                            }}
                                        >
                                            {'Submit for Approval'}
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>}
        </div>
    )
}
export default Controlled
