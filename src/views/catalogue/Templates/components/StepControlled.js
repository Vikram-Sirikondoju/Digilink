import React, { useState, useEffect } from 'react'
import { Steps, Button } from 'components/ui'
import NewOperators from './NewTemplates'
import TemplateDetails from './TemplateDetails'
import { AdaptableCard } from 'components/shared'
import MasterPermissionBox from './MasterPermissionBox'
import TemplatePreview from './TemplatePreview'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import RetailMasterInfo from 'views/accounts/ReatailCustomers/components/RetailMasterInfo'
import TemplateCreation from './TemplateCreation'
import { BiArrowBack } from 'react-icons/bi'
import { Formik, Form } from 'formik';
import { apiSubmitOperator, apiUpdateOperator } from 'services/TemplateService'
import { cloneDeep } from 'lodash'
import { TemplateEditCopy } from 'utils/campareandCopy'
import { useSelector } from 'react-redux'
import ReactHtmlParser from 'html-react-parser'
import * as Yup from 'yup'
import { OpenNotification } from 'views/Servicefile'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'

const Controlled = () => {
    const [step, setStep] = useState(0)
    const location = useLocation();
    const mode = location.state?.mode ? location.state.mode : "ADD";

    const rowForEdit = location.state?.data;
    const { enterAccount, password, rememberMe, usernameOrEmail, unq_id } = useSelector(
        (state) => state.auth.user
    )
    // <div>Catalogue/Templates/Create Template</div>
    let breadCrumbList = [ {
        name: 'Catalogue',
        link:'catalogue'
    },{
        name: 'Templates',
        link: "/catalouge-menu-item-view-1"
      }, {
        name: `Create Template`,
      }]
    


    let opIntialValues = {
        tempDetails: {
            category: '',
            title: '',
            type: '',
            description: "",
        },
        initialValues: [{
            sectionTitle: '',
            sectionValues: [{
                title: '',
                formType: '',
                isMandatery: false,
                textAreaMaxLength: '',
                dropdownOptions: [{ option: '' }],
                radioBtnOptions: [{ option: '' }],
                checkBoxOptions: [{ option: '' }],
                textEditor: '',
                maxFileSize: '',
                fileType: [
                    { label: 'Document', status: false },
                    { label: 'Image', status: false },
                    { label: 'Pdf', status: false },
                    { label: 'Video', status: false }
                ]
            }]
        }]
    }
    const [operaterState, setOperaterState] = useState({})
    const [operatorIntialValues, setOperatorIntialValues] = useState(opIntialValues)
    const onChange = (nextStep) => {
        if (nextStep < 0) {
            setStep(0)
        } else if (nextStep > 3) {
            setStep(3)
        } else {
            setStep(nextStep)
        }
    }

    const tempDetails = React.useRef()
    const tempCreation = React.useRef()

    const onNext = (values) => {
        console.log("onNextonNext", values)
        setSubmissionPayload(values)

        onChange(step + 1)
    }

    const onPrevious = () => onChange(step - 1)

    async function handleSubmit() {
        await tempDetails.current.submitForm()
        await tempCreation.current.submitForm()
    }
    const validationSchema = Yup.object().shape({
        tempDetails: Yup.object().shape({
            title: Yup.string().trim()
                .required('Please enter a valid template title')
                .nullable(),
            category: Yup.string()
                .required('Please select item category')
                .nullable(),
            type: Yup.string()
                .required('Please select item type')
                .nullable(),
        }),
    })
    const setValidationsSchema = () => {
        switch (step) {
            case 0:
                return validationSchema
            case 1:
                return Yup.object().shape({})
            default:
                return null
        }
    }




    const setSubmissionPayload = (values) => {
        let updatedPayload = {};
        updatedPayload = {
            ...operaterState,
            ...values
        };
        setOperaterState(updatedPayload);
    };
    const navigate = useNavigate()

    const submitApi = async () => {
        if (mode === "ADD") {
            // const tp_desc = ReactHtmlParser(operaterState?.tempDetails?.description);
            let createbody = {
                // "relProdCatId": 1,
                // "tpTitle": operaterState?.tempDetails?.title,
                // "tpType": operaterState?.tempDetails?.type,
                // "tpDesc": operaterState?.tempDetails?.description,
                // "tpStruc": JSON.stringify(operaterState?.initialValues),
                // "tpStatus": 0,
                // "accId": 1231

                "rel_prod_cat_id": operaterState?.tempDetails?.category,
                "tp_title": operaterState?.tempDetails?.title?.trim(),
                "tp_type": operaterState?.tempDetails?.type,
                "tp_desc": operaterState?.tempDetails?.description,
                "tp_struc": JSON.stringify(operaterState?.initialValues),
                "tp_status": 0,
                "acc_id": unq_id
            }
            let res = await apiSubmitOperator(createbody)
            if (res?.data?.success) {
                OpenNotification('success', 'Template created sucessfully')
                navigate('/catalouge-menu-item-view-1')
            }
        } else if (mode === "EDIT") {
            console.log(rowForEdit, "rowForEditrowForEdit")
            let updatebody = {
                "id": rowForEdit?.id,
                "tpUnqId": rowForEdit?.tpUnqId,
                "relProdCatId": rowForEdit?.relProdCatId,
                "tpTitle": operaterState?.tempDetails?.title,
                "tpType": operaterState?.tempDetails?.type,
                "tpDesc": operaterState?.tempDetails?.description,
                "tpStruc": JSON.stringify(operaterState?.initialValues),
                "tpStatus": rowForEdit?.tpStatus,
                "acc_id": unq_id
            }
            await apiUpdateOperator(updatebody)
        }
    }

    useEffect(() => {
        if (rowForEdit) {
            // let editData = rowForEdit
            // let initialValuesObj = {
            //     tempDetails: {
            //         category: '',
            //         title: editData?.tpTitle,
            //         type: editData?.tpType,
            //         description: editData?.tpDesc,
            //     },
            //     initialValues: JSON.parse(editData.tpStruc)
            // }
            const opIntialvValues = TemplateEditCopy(opIntialValues, rowForEdit);
            console.log("initialValuesObj", opIntialValues)
            setOperaterState(opIntialvValues)
        }
    }, [rowForEdit])

    return (
        <div>
                 <CustomBreadcrumbs  list={breadCrumbList} />
            <Formik
                initialValues={opIntialValues}
                validationSchema={setValidationsSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmissionPayload(values)
                    setSubmitting(true)
                    setOperatorIntialValues(values)
                    onNext(values)
                }}
            >
                {({ errors, touched, values, setFieldValue }) => (
                    <Form>
                        <Steps current={step}>
                            <Steps.Item title="BASIC DETAILS" />
                            <Steps.Item title="CREATE TEMPLATE" />
                            <Steps.Item title="PREVIEW" />
                        </Steps>

                        <div className="mt-6 rounded ">
                            {step == 0 &&
                                <TemplateDetails
                                    operaterState={operaterState}
                                    setOperaterState={setOperaterState}
                                    operatorIntialValues={operatorIntialValues}
                                    errors={errors || {}}
                                    touched={touched || {}}
                                    values={values || {}}
                                    setFieldValue={setFieldValue}
                                />
                            }
                            {step == 1 &&
                                <TemplateCreation
                                    operaterState={operaterState}
                                    setOperaterState={setOperaterState}
                                    operatorIntialValues={operatorIntialValues}
                                    errors={errors || {}}
                                    touched={touched || {}}
                                    values={values || []}
                                    setFieldValue={setFieldValue}
                                />
                            }
                            {step == 2 &&
                                <TemplatePreview operaterState={operaterState?.tempDetails} setStep={setStep} />
                            }

                        </div>
                        <div className="flex justify-between mt-12">

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
                                {step >= 0 &&
                                    <Link
                                        className="block lg:inline-block md:mb-0 mb-4"
                                        to='/catalouge-menu-item-view-1'
                                    >
                                        <Button
                                            className="mx-2"
                                            onClick={onPrevious}
                                            variant="solid"
                                            style={{ backgroundColor: "#4D4D4D" }}
                                        >
                                            Cancel
                                        </Button>
                                    </Link>}
                                {step < 2 &&
                                    <Button variant="solid"
                                        disabled={step === 2}
                                        type="submit">
                                        {step === 2 ? 'Completed' : 'Next'}
                                    </Button>}
                                {/* <Button onClick={handleSubmit} variant='solid' type="submit">
                                    submit
                                </Button> */}
                                {step === 2 &&
                                    <>
                                        {/* <Link
                                            className="block lg:inline-block md:mb-0 mb-4"
                                            to="/catalouge-menu-item-view-1"
                                        > */}
                                        <Button variant='solid' onClick={submitApi}>
                                            {'Submit for Approval'}
                                        </Button>
                                        {/* </Link> */}
                                    </>
                                }
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

// const Controlled = () => {
//     const [step, setStep] = useState(0)

//     const onChange = (nextStep) => {
//         if (nextStep < 0) {
//             setStep(0)
//         } else if (nextStep > 3) {
//             setStep(3)
//         } else {
//             setStep(nextStep)
//         }
//     }

//     const onNext = () => onChange(step + 1)

//     const onPrevious = () => onChange(step - 1)

//     return (


//         <div>

//             <Steps current={step}>
//                 <Steps.Item title="BASIC DETAILS" />
//                 <Steps.Item title="CREATE TEMPLATE" />
//                 {/* <Steps.Item title="MASTER USERS" /> */}
//                 <Steps.Item title="PREVIEW" />
//             </Steps>

//             <div className="mt-6  bg-gray-50 dark:bg-gray-700 rounded ">
//                 {/* <h6>Step {`${step + 1}`}
//                     content
//    </h6> */}

//                 {step==0 && 

//                <TemplateDetails />
//                }
//                {step==1&& 
//                 <AdaptableCard className="h-full" bodyClass="h-full">
//                     <MasterPermissionBox />
//                </AdaptableCard> }

//             </div>
//             <div className="mt-4 text-right">
//                 <Button
//                     className="mx-2"
//                     onClick={onPrevious}
//                     disabled={step === 0}
//                 >
//                     Previous
//                 </Button>
//                 {step < 2 && <Button onClick={onNext} disabled={step === 3} variant="solid">
//                     {step === 2 ? 'Completed' : 'Next'}
//                 </Button>}
//                 {step === 2 && <Button onClick={onNext}  variant="solid">
//                  {'Submit'}
//                 </Button>}
//             </div>
//         </div>
//     )
// }

export default Controlled
