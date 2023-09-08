import React, { useEffect, useRef, useState } from 'react'
import { Steps, Button } from 'components/ui'
// import NewOperators from './NewOperators'
// import OperatorDetails from './OperatorDetails'
// import { AdaptableCard } from 'components/shared'
// import MasterPermissionBox from './MasterPermissionBox'
// import OperatorMasterInfo from './OperatorMasterInfo'
// import OperatorPreview from './OperatorPreview'
import CreateConfig from './CreateConfig'
import { Link } from 'react-router-dom'
import { apiSubmitOperator } from 'services/OperatorsService'
import { useNavigate } from 'react-router-dom'
import CreateOffers from './CreateOffers'
import OffersPreview from './OffersPreview'


const StepControlled = () => {
    const [operaterState, setOperaterState] = useState({})
    const [step, setStep] = useState(0)

    let opIntialValues = {
        accInfo: {
            operatrId: "",
            accName: "",
            globalMno: "",//not in api
            parentAccount: "",//not in api
            accIncorpDt: "",
            accCompName: "",
            accTaxId: '',
            accCurrency: '',
            accLang: '',
            accTimeZone: '',
            accOrient: ''
        },
        ContactInfo: {
            accPrimContName: "",//not in api
            accEmailId: "",
            accPrimCont: "",
            accAltCont: "",
            accFax: "",
            accWebUrl: "",
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
            accUsername: "",
            accPassword: "",
            accEndPointUrl: "",
            accSftpAdd: "",
            accPortNo: "",

        },
        userInfo: {
            roleId: '',
            firstName: '',
            lastName: '',
            emailId: '',
            phoneNumber: ''
        }
    }


    const [operatorIntialValues, setOperatorIntialValues] = useState(opIntialValues)





    const navigate = useNavigate()

    const childRef = useRef()
    const childRefMastrerUsers = useRef()
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
        // if (step == 0) {
        //     childRef.current?.handleSubmitFromParent()
        // }
        // if (step == 1) {
        //     onChange(step + 1)
        // }
        // if (step == 2) {
        //     childRefMastrerUsers.current?.handleSubmitFromParent()
        // }
           setStep(step+1)

    }
    const submitApi = async () => {
        console.log(operaterState)
        let body = operaterState

        body.accBillFormat = 'csv'
        body.accStatus = ""
        body.accUnqId = Math.floor(10000 + Math.random() * 90000);
        body.prefSettleType = 0
        body.billCycle = ""
        body.accType = "OPERATOR"
        body.bankBranchName = ''

        body.billDueTenor = ''

        body.bankName = ''

        body.micrCode = ''
        body.ifscCode = ''

        body.bankAccNum = ''
        body.billDate = "2017-08-14T12:17:47.720Z"
        body.operatrId = '15'
        body.userInfo.roleId = '1'
        console.log(body)

        const resp = await apiSubmitOperator(body)
        if (resp.data.success) {
            navigate('/account-menu-item-view-2')
        }



    }
    const onPrevious = () => onChange(step - 1)

    return (


        <div>

            <Steps current={step}>
                <Steps.Item title="CREATE OFFERS" />
                <Steps.Item title="CREATE CONFIG " />
                <Steps.Item title="PREVIEW" />
            </Steps>

            <div className="mt-6 dark:bg-gray-700 rounded ">

                {/* <h6>Step {`${step + 1}`}
                    content
   </h6> */}

                {step == 0 &&
                    <CreateOffers />


                }
                {step == 1 &&
                    <CreateConfig />

                }
                {step == 2 &&
                    <OffersPreview />
                }



            </div>
            <div className="mt-4 text-right">
                {step > 0 && <Button
                    className="mx-2"
                    onClick={onPrevious}

                >
                    Previous
                </Button>}

                {step >= 0 &&
                    <>
                        <Link
                            className="block lg:inline-block md:mb-0 mb-4"
                            to="/offers">
                            <Button
                                className="mx-2"
                                onClick={onPrevious}
                                variant="solid"
                            >
                                Cancel
                            </Button>
                        </Link>
                    </>}
                {step < 2 && <Button onClick={onNext} disabled={step === 2} variant="solid">
                    {step === 2 ? 'Completed' : 'Next'}
                </Button>}


                {step === 2 &&
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
                }
            </div>
        </div>
    )
}

export default StepControlled
