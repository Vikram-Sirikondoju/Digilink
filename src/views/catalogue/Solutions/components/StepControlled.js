import React, { useRef, useState, useEffect } from 'react'
import { Steps, Button } from 'components/ui'
import NewSolutions from './NewSolutions'
import SolutionDetails from './SolutionDetails'
import { AdaptableCard } from 'components/shared'
import MasterPermissionBox from './MasterPermissionBox'
import SolutionPreview from './SolutionPreview'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import SolutionCreate from './SolutionCreate'
import SolutionConfig from './SolutionConfig'
import { apiSolFinalSubmit, apiSolFinalUpdateSubmit } from 'services/SolutionsService'
import { BiArrowBack } from 'react-icons/bi'

// import campareandCopy from 'utils/campareandCopy'
import { useSelector } from 'react-redux'
import { OpenNotification } from 'views/Servicefile'
import { EditandCopySol } from 'utils/campareandCopy'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'

const Controlled = () => {

    const location = useLocation();
    const rowForEdit = location.state?.data;
    const mode = location.state?.mode;
    const [solutionState, setSolutionState] = useState()
    const [solutionCreate, setSolutionCreate] = useState()
    let intials = {
        basics: {
            pCategory: "", // not in api
            solTitle: "",
            solDesc: "",
            solKeywords: "",
            solTextBanner: "",
            imageFile: ""
        },
        basicOther: {
            zipCode: "",
            upload: ''
        },

        solCreate: {
            initialValues: [
                {
                    solItemType: "",
                    cItemType: "", // not in api
                    solItems: [{
                        solVariant: "",
                        solParentVariant: "",
                        solPrice: "",
                        solDiscount: "",
                        isDep: false,
                        defaultSolPrice:""
                    }],
                    paymentProvAvailable: false,
                    emiCheck: false,
                    emiArr: [{
                        noOfEmis: '',
                        emiValuePerMonth: ''
                    }],
                    chooseItems: [],
                    chooseVarients: []

                }
            ]
        }

    }
    // <div>Catalogue/Solutions/Create Solution</div>
    let breadCrumbList = [{
        name: 'Catalogue',
        link:'cataloguue'
    }, {
        name: 'Solutions',
        link: "/catalouge-menu-item-view-3"
    }, {
        name: `Create Solutions`,
    }]

    if (mode === "EDIT") {
        breadCrumbList = [
            {
                name: 'Catalogue',
                link:'cataloguue'
            },
            {
                name: 'Solutions',
                link: '/catalouge-menu-item-view-3',
            },
            {
                name: rowForEdit?.sol_title,
                link: '/catalouge-menu-item-view-3',
                state: rowForEdit
            },
            {
                name: "Edit"
            },
        ]
    }


    const { unq_id, role_name } = useSelector((state) => state.auth.user)
    const [solutionIntialValues, setSolutionIntialValues] = useState(intials)

    useEffect(() => {
        async function fetchData() {
            if (rowForEdit) {
                let valiInti = await EditandCopySol(intials, rowForEdit)
                setSolutionIntialValues(valiInti)
            } else {
                setSolutionIntialValues(intials)
            }
        }
        fetchData();
    }, [rowForEdit]);



    const [step, setStep] = useState(0)
    const childRef = useRef()
    const childRef2 = useRef()

    const navigate = useNavigate()
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
            childRef2.current.handleSubmitFromParent();
        }
        if (step == 2) {
            onChange(step + 1)
        }

    }

    const submitApi = async () => {
        console.log(solutionIntialValues)
        let body = {
            "acc_id": unq_id,
            "sol_title": solutionIntialValues?.basics?.solTitle,
            "sol_desc": solutionIntialValues?.basics?.solDesc,
            "sol_keywords": solutionIntialValues?.basics?.solKeywords,
            "sol_text_banner": solutionIntialValues?.basics?.solTextBanner,
            "sol_img_url": solutionIntialValues?.basics?.imageFile,
            "sol_geo_tag": "",
            "sol_thumbnail": "Sample1.jpg",
            "sol_status": 'ACTIVE',
            "dgl_rel_prod_cat_ids": [{
                "rel_prod_cat_id": solutionIntialValues?.basics?.pCategory,
                "prod_cat_status": 0
            },],
            "dgl_cat_sol_configs": [{
                "sol_config_title": "SolConfig3",
                "sol_config_details": "json string3"
            }]
        }

        let catSols = []
        // solutionIntialValues.solCreate.initialValues
        let array1 = solutionIntialValues.solCreate
        let array2 = []
        for (const initialValue of array1.initialValues) {
            // Loop through the solItems array of the current initialValue
            for (const solItem of initialValue.solItems) {
                const itemObj = {
                    "sol_display_item_var_price": solItem.solPrice,
                    "sol_item_parent_item": "",
                    "sol_item_is_dep": solItem?.isDep,
                    "is_paid_provider": false,
                    "item": {
                        "id": initialValue.cItemType
                    },
                    "item_var": {
                        "id": solItem.solVariant
                    }
                };
                array2.push(itemObj);
            }
        }
        body.dgl_cat_sol_items = array2
        console.log(body)
        // return
        if (mode == 'EDIT') {
            const resp = await apiSolFinalUpdateSubmit(body)
            if (resp.data.success) {
                OpenNotification('success', 'Updated successfully')
                navigate('/catalouge-menu-item-view-3')
            }
        } else {
            const resp = await apiSolFinalSubmit(body)
            if (resp.data.success) {
                OpenNotification('success', 'Created successfully')
                navigate('/catalouge-menu-item-view-3')
            }
        }


    }

    const onPrevious = () => onChange(step - 1)


    return (
        <div>
            <CustomBreadcrumbs list={breadCrumbList} />
            <Steps current={step}>
                <Steps.Item title="BASIC DETAILS" />
                <Steps.Item title="CREATE SOLUTION" />
                <Steps.Item title="SOLUTION CONFIG" />
                <Steps.Item title="PREVIEW" />
            </Steps>

            <div className="mt-6 rounded ">

                {step == 0 && Object.keys(solutionIntialValues).length &&
                    <SolutionDetails
                        ref={childRef}
                        solutionState={solutionState}
                        setSolutionState={setSolutionState}
                        step={step}
                        setStep={setStep}
                        solutionIntialValues={solutionIntialValues}
                        setSolutionIntialValues={setSolutionIntialValues}
                    />}
                {step == 1 && Object.keys(solutionIntialValues).length && <SolutionCreate
                    ref={childRef2}
                    solutionCreate={solutionCreate}
                    setSolutionCreate={setSolutionCreate}
                    solutionState={solutionState}
                    setSolutionState={setSolutionState}
                    solutionIntialValues={solutionIntialValues}
                    setSolutionIntialValues={setSolutionIntialValues}
                    step={step}
                    setStep={setStep}
                />}
                {step == 2 && Object.keys(solutionIntialValues).length && <SolutionConfig />}
                {step == 3 && Object.keys(solutionIntialValues).length && <SolutionPreview solutionIntialValues={solutionIntialValues} solutionState={solutionState} step={step} setStep={setStep} />}
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

                    {step >= 0 && (
                        <Link
                            className="block lg:inline-block md:mb-0 mb-4"
                            to="/catalouge-menu-item-view-3">
                            <Button
                                className="mx-2"
                                onClick={onPrevious}
                                variant="solid"
                                style={{ backgroundColor: "#4D4D4D" }}
                            >
                                Cancel
                            </Button>
                        </Link>
                    )}
                    {step < 3 && (
                        <Button
                            onClick={onNext}
                            disabled={step === 3}
                            variant='solid'
                        >
                            {step === 3 ? 'Completed' : 'Next'}
                        </Button>
                    )}

                    {step === 3 && (
                        <>
                            {/* <Link
                            className="block lg:inline-block md:mb-0 mb-4"
                            to="/catalouge-menu-item-view-3"
                        > */}
                            <Button onClick={submitApi} variant='solid'>
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
