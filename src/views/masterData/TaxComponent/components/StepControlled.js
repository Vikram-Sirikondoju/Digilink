import React, { useState } from 'react'
import { Steps, Button } from 'components/ui'
import { AdaptableCard } from 'components/shared'
import { Link } from 'react-router-dom'
import TaxComponentForm from './TaxComponentForm'

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



    return (


        <div>
            <div className="mt-6  bg-gray-50 dark:bg-gray-700 rounded ">
                <TaxComponentForm />
            </div>
            <div className="mt-4 text-right">
                <>
                <Link
                    className="block lg:inline-block md:mb-0 mb-4"
                    to="/masterDataMenu-item-view-4">
                <Button
                    className="mx-2"
                    variant="solid"
                    >
                    Cancel
                </Button>
                </Link>
                <Link
                    className="block lg:inline-block md:mb-0 mb-4"
                    to="/masterDataMenu-item-view-4">
                <Button
                    className="mx-2"
                    variant="solid"
                    >
                    Submit For Approval
                </Button>
                </Link>
                </>
                {/* } */}
                {/* {step < 2 && <Button onClick={onNext} disabled={step === 2} variant="solid">
                    {step === 2 ? 'Completed' : 'Next'}
                </Button>}

                {step === 2 &&
                    <>
                        <Link
                            className="block lg:inline-block md:mb-0 mb-4"
                            to="/account-menu-item-view-4"
                        >
                            <Button onClick={onNext} variant="solid">
                                {'Submit for Approval'}
                            </Button>
                        </Link>
                    </>
                } */}
            </div>
        </div>
    )
}

export default Controlled
