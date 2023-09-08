import React, { useRef, useState } from 'react'
import { Steps, Button } from 'components/ui'
// import NewOperators from './NewPartners'
// import PartnerDetails from './PartnerDetails'
// import { AdaptableCard } from 'components/shared'
// import PartnersMainUserInfo from './PartnersMainUserInfo'
// import PartnersPreview from './PartnersPreview'
import { Link, useNavigate } from 'react-router-dom'
import { apiSubmitOperator } from 'services/OperatorsService'
import CreateCashBacks from './CreateCashBacks'
import CreateConfig from './CreateConfig'
import { AdaptableCard } from 'components/shared'
import CashBackPreview from './CashBackPreview'

const Controlled = () => {
    const [partnerState, setPartnerState] = useState({})
    const [step, setStep] = useState(0)
    const navigate = useNavigate()

    let prtnerIntialValues = {
        accInfo: {
            partnerId : "",//not in api
            partnerTitle : "",//not in api
            operater : "", //not in api
            accCompName : "",
            accIncorpDt : "",
            accTaxId : "",
            partnerType : "",//not in api
            accTimeZone: '',
            accCurrency: '',
            accLang: '',
            accOrient: '',
            apiConfig : "",//not in api
        },
        ContactInfo: {
            accPrimContName : "",//not in api
            accEmailId : "",
            accPrimCont : "", 
            accAltCont : "",
            accFax : "",
            accWebUrl : "",
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
            billDate: "",
            billDueTenor: "",
            bankAccNum: "",
            bankName: "",
            bankBranchName: "",
            ifscCode: "",
            micrCode: "",
        },
        userInfo: {
            roleId: '',
            firstName: '',
            lastName: '',
            emailId: '',
            phoneNumber: ''
        },
        contractInfo: {
            contractType : "",//not in api
            signedDate : "",//not in api
            enforcementDate : "",//not in api
            terminationDate : "",//not in api
            contractStatus : "",//not in api
        },
    }

    const [partnerIntialValues, setPartnerIntialValues] = useState(prtnerIntialValues)


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
        setStep(step+1)
        // if (step == 0) {
        //     childRef.current?.handleSubmitFromParent()
        // }
        // if (step == 1) {
        //     childRef2.current?.handleSubmitFromParent()
        // }
    }

    const submitApi = async () => {
        console.log(partnerState)
        let body = partnerState
        
        body.accBillFormat = 'csv'
        body.accStatus = ''
        body.accUnqId = Math.floor(10000 + Math.random() * 90000)
        body.accEndPointUrl = ''
        body.accName = partnerState.partnerTitle
        body.accPassword = ''
        body.accPortNo = ''
        body.accSftpAdd = ''
        body.accUsername = ''
        body.globalMno = ''
        body.operatrId = '15'
        body.parentAccount = '7'
        body.prefSettleType = 0
        body.billCycle = ''
        body.accType = 'PARTNER'
        body.bankBranchName = ''

        // body.billDueTenor = ''

        // body.bankName = ''

        // body.micrCode = ''
        // body.ifscCode = ''

        body.bankAccNum = ''
        body.billDate = '2017-08-14T12:17:47.720Z'
        body.partnerId = '15'
        body.accOrient = 'true'
        console.log('body final partner', body)
        body.userInfo = {
            firstName: '435435',
            lastName: '34543',
            emailId: '534534',
            phoneNumber: '5345345',
            roleId:"1"
        }
        
        const resp = await apiSubmitOperator(body)
        
        if (resp.data.success) {
            navigate('/account-menu-item-view-4')
        }
    }
    const onPrevious = () => onChange(step - 1)

    return (
        <div>
            <Steps current={step}>
                <Steps.Item title="CREATE CASHBACKS" />
                <Steps.Item title="CREATE CONFIG" />
                <Steps.Item title="PREVIEW" />
            </Steps>

            <div className="mt-6  bg-gray-50 dark:bg-gray-700 rounded ">
                {/* <h6>Step {`${step + 1}`}
                    content
   </h6> */}

                {step == 0 && (
                    <CreateCashBacks
                        
                    />
                )}
                {step == 1 && (
                    <AdaptableCard className="h-full" bodyClass="h-full">
                        <CreateConfig
                            
                        />
                    </AdaptableCard>
                )}

                {step == 2 && (
                    <AdaptableCard className="h-full" bodyClass="h-full">
                        <CashBackPreview partnerState={partnerState} />
                    </AdaptableCard>
                )} 
            </div>
            <div className="mt-4 text-right">
                {step > 0 && (
                    <Button className="mx-2" onClick={onPrevious}>
                        Previous
                    </Button>
                )}

                {step >= 0 && (
                    <>
                        <Link
                            className="block lg:inline-block md:mb-0 mb-4"
                            to="/offers"
                        >
                            <Button
                                className="mx-2"
                                onClick={onPrevious}
                                variant="solid"
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
                        variant="solid"
                    >
                        {step === 2 ? 'Completed' : 'Next'}
                    </Button>
                )}

                {step === 2 && (
                    <>
                        <Link
                            className="block lg:inline-block md:mb-0 mb-4"
                            to="/offers"
                        >
                        <Button onClick={submitApi} variant="solid">
                            {'Submit for Approval'}
                        </Button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default Controlled
