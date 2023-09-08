import React, { useCallback, useEffect, useState } from 'react'
import {
    Steps,
    Button,
    Card
} from 'components/ui'
import { Link, useLocation } from 'react-router-dom'
import OrderAllocation from './OrderAllocation'
import OrderLabelling from './OrderLabelling'
import OrderPacking from './OrderPacking'
import OrderDispatch from './OrderDispatch'
import OrderDelivery from './OrderDelivery'
const AccordionSteps = ({woIndex}) => {
    const [step, setStep] = useState(0)
    const onPrevious = () => onChange(step - 1)

    const onChange = (nextStep) => {
        if (nextStep < 0) {
            setStep(0)
        } else if (nextStep > 3) {
            setStep(3)
        } else {
            setStep(nextStep)
        }
    }

    const steps = (
        <Steps current={step}>
            <Steps.Item title={'ALLOCATION'} />
            <Steps.Item title={'LABELLING'} />
            <Steps.Item title={'PACKING'} />
            <Steps.Item title={'DISPATCH'} />
            <Steps.Item title={'DELIVERY'} />
        </Steps>
    )
    const onNext = () => {
        setStep(step + 1)
    }
    
    return (
        <div className="max-h-96 overflow-y-auto overflow-x-auto">
                <Card header= {steps}
            >
            {step === 0 && (
                <div >
                    <OrderAllocation woIndex={woIndex} onNext={onNext} onPrevious={onPrevious} />
                </div>
            )}
            {step === 1 && (
                <div >
                    <OrderLabelling woIndex={woIndex} onNext={onNext} onPrevious={onPrevious} />
                </div>
            )}
            {step === 2 && (
                <div >
                    <OrderPacking woIndex={woIndex} onNext={onNext} onPrevious={onPrevious} />
                </div>
            )}
            {step === 3 && (
                <div>
                    <OrderDispatch woIndex={woIndex} onNext={onNext} onPrevious={onPrevious} />
                </div>
            )}
             {step === 4 && (
                
                <div>
                    <OrderDelivery woIndex={woIndex} onPrevious={onPrevious} />
                </div>
            )}
                <div className="mt-4 text-right">
                    <Button
                        type={'button'}
                        className="mx-2"
                        onClick={() => onPrevious()}
                        variant="solid"
                        style={{
                            backgroundColor: '#4D4D4D',
                        }}
                    >
                        Preview
                    </Button>
                    {(step === 4)
                        ? <Link
                        to={`/orders`}
                    >
                        <Button
                            type={'button'}
                            className="mx-2"
                            variant="solid"
                        >
                            Finish
                        </Button>
                        </Link>
                            : <Button
                            variant="solid"
                            onClick={() => onNext()}
                        >
                            {'Next'}
                        </Button>
                    }
                    
                </div>
            </Card>
        </div>
    )
}

export default AccordionSteps