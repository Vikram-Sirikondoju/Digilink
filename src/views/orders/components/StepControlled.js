import React, { useState } from 'react'
import { Steps, Button } from 'components/ui'
import NewOperators from './NewOrders'
import OrderDetails from './OrderDetails'
import { AdaptableCard } from 'components/shared'
import MasterPermissionBox from './MasterPermissionBox'

const Controlled = () => {
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

    const onNext = () => onChange(step + 1)

    const onPrevious = () => onChange(step - 1)

    return (


        <div>

            <Steps current={step}>
                <Steps.Item title="ORDER DETAILS" />
                <Steps.Item title="MASTER PERMISSIONS" />
                <Steps.Item title="MASTER USERS" />
                <Steps.Item title="PREVIEW" />
            </Steps>

            <div className="mt-6  bg-gray-50 dark:bg-gray-700 rounded ">
                {/* <h6>Step {`${step + 1}`}
                    content
   </h6> */}
                
                {step==0 && 
                
               <OrderDetails />
               }
               {step==1&& 
                <AdaptableCard className="h-full" bodyClass="h-full">
                    <MasterPermissionBox />
               </AdaptableCard> }
                
            </div>
            <div className="mt-4 text-right">
                <Button
                    className="mx-2"
                    onClick={onPrevious}
                    disabled={step === 0}
                >
                    Previous
                </Button>
                {step < 3 && <Button onClick={onNext} disabled={step === 3} variant="solid">
                    {step === 3 ? 'Completed' : 'Next'}
                </Button>}
                {step === 3 && <Button onClick={onNext}  variant="solid">
                 {'Submit'}
                </Button>}
            </div>
        </div>
    )
}

export default Controlled
