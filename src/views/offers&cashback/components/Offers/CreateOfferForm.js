import React, { useCallback, useEffect, useState } from 'react'
import { Steps, Button } from 'components/ui'
import CreateConfig from './CreateConfig'
import { Link, useLocation } from 'react-router-dom'
import CreateOffers from './CreateOffers'
import OffersPreview from './OffersPreview'
import * as Yup from 'yup'
import {
    getCustCatList,
    getProdCatList,
} from 'views/offers&cashback/store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { injectReducer } from 'store'
import reducer from 'views/offers&cashback/store'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'
injectReducer('offerCashback', reducer)
const CreateOfferForm = () => {
    const [step, setStep] = useState(0)
    const location = useLocation()
    const mode = location.state?.mode === 'EDIT' ? location.state?.mode : 'ADD'
    const [selectedMode, setSelectedMode] = useState(mode)
    const rowForEdit = location.state?.data
    const dispatch = useDispatch()
    let step1InitialValues = {
        offr_name: '',
        offr_start_date: '',
        offr_end_date: '',
        offr_code: '',
        offr_max_cpns_applcbl: 0,
        offr_timeperiod: '',
        offr_no_of_cpns: 0,
        rel_offr_prod_cat: '',
        rel_offr_cust_cat: '',
        offr_type_fxd_amnt: true,
        offr_value: 0,
        operator_share: 0,
        provider_share: 0,
        offr_desc: '',
        offr_type: 'OFFER',
        cust_type: '',
        cust_id: '',
    }
    let stpe2IntialValues = [
        {
            offr_config_title: '',
            offr_config_details: '',
        },
    ]
    if (rowForEdit) {
        step1InitialValues = rowForEdit
        stpe2IntialValues = rowForEdit?.dgl_offrs_configs
    }
    const [offerInitialValues, setOfferInitialValues] =
        useState(step1InitialValues)
    const [configIntialValues, setConfigIntialValues] =
        useState(stpe2IntialValues)
    const offerValidationSchema = Yup.object({
        offr_name: Yup.string().required('Please Enter Valid OfferTitle'),
        offr_start_date: Yup.date().required('Please Enter Valid Start Date'),
        offr_end_date: Yup.date().required('Please Enter Valid End Date'),
        offr_code: Yup.string().required('Please Enter Valid Offer Code'),
        offr_max_cpns_applcbl: Yup.string().required(
            'Max Allowed Usages is required'
        ),
        offr_timeperiod: Yup.string().required('Please Select Frequency'),
        offr_no_of_cpns: Yup.string().required(
            'Max Allowed Usages perCustomer is required'
        ),
        rel_offr_prod_cat: Yup.string().required(
            'Please Select Item Category'
        ),
        rel_offr_cust_cat: Yup.string().required(
            'Please Select Customer Category '
        ),
        offr_type_fxd_amnt: Yup.string().required('Offer Type is required'),
        offr_value: Yup.string().required('Offer Value is required'),
        operator_share: Yup.string().required('Operator Share is required'),
        provider_share: Yup.string().required('Provider Share is required'),
        offr_desc: Yup.string().required(''),
    })
    const { unq_id } = useSelector((state) => state.auth.user)
    const fetchData = useCallback(() => {
        dispatch(getProdCatList({ page_no: 0, page_size: 100, unqId: unq_id }))
        dispatch(getCustCatList({ page_no: 0, page_size: 100, unqId: unq_id }))
    }, [dispatch])
    useEffect(() => {
        fetchData()
    }, [dispatch, fetchData])

    const onChange = (nextStep) => {
        if (nextStep < 0) {
            setStep(0)
        } else if (nextStep > 3) {
            setStep(3)
        } else {
            setStep(nextStep)
        }
    }

    const handleFirstStepSubmit = (values) => {
        setOfferInitialValues(values)
        onNext()
    }
    const handleSecondStepSubmit = (values) => {
        setConfigIntialValues(values)
        onNext()
    }
    const goToFirstStep = () => {
        setStep(0)
    }

    const onNext = () => {
        setStep(step + 1)
    }

    const onPrevious = () => onChange(step - 1)
    const breadCrumbList=[{
        name:'Home',
        link:"/home"
    },{
        name:'Offers & Cashback',
        link:"/offers"
    },{
        name: `${mode === 'EDIT' ? 'Edit' : 'Create'} Offer`,
    }]
    return (
        <div className="mt-5">
            <CustomBreadcrumbs list={breadCrumbList}/>

            <div>
                <Steps current={step}>
                    <Steps.Item
                        title={
                            selectedMode === 'EDIT'
                                ? 'EDIT OFFERS'
                                : 'CREATE OFFERS'
                        }
                    />
                    {/* <Steps.Item title="CREATE CONFIG " /> */}
                    <Steps.Item title="PREVIEW" />
                </Steps>

                {step == 0 && (
                    <CreateOffers
                        offerInitialValues={offerInitialValues}
                        offerValidationSchema={offerValidationSchema}
                        handleFirstStepSubmit={handleFirstStepSubmit}
                        selectedMode={selectedMode}
                    />
                )}
                {/* {step == 1 && (
                <CreateConfig
                    configIntialValues={configIntialValues}
                    handleSecondStepSubmit={handleSecondStepSubmit}
                    onPrevious={onPrevious}
                />
            )} */}
                {step == 1 && (
                    <OffersPreview
                        offerInitialValues={offerInitialValues}
                        configIntialValues={configIntialValues}
                        onPrevious={onPrevious}
                        goToFirstStep={goToFirstStep}
                        selectedMode={selectedMode}
                    />
                )}
            </div>
        </div>
    )
}

export default CreateOfferForm
