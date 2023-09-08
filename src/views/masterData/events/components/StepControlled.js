import React, { useState } from 'react'
import { Steps, Button } from 'components/ui'
import { AdaptableCard } from 'components/shared'
import { Link } from 'react-router-dom'
import AddEvents from './AddEvents'
import EventsConfig from './EventsConfig'
import EventsPreview from './EvnetsPreview'
import { BiArrowBack } from 'react-icons/bi'
// import TaxComponentForm from './TaxComponentForm'

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


    const onNext = () => {
        // if (step == 0) {
        //     childRef.current?.handleSubmitFromParent()
        // }

        // if (step == 1) {
        //     childRefUserInfo.current?.handleSubmitFromParent()
        // }
        setStep(step + 1)

    }

    const onPrevious = () => onChange(step - 1)

    return (

        <div>

            <Steps current={step}>

                <Steps.Item title="CREATE EVENT" />
                <Steps.Item title="CREATE CONFIG" />
                <Steps.Item title="PREVIEW" />
            </Steps>

            <div className="">

                {step == 0 &&

                    <div>
                        <div className='flex'>
                            <h3 className='mt-6 mb-6'>Add Event </h3>
                            {/* <AiOutlineInfoCircle className='ml-2 mt-8' style={{color : "blue"}}/> */}
                        </div>
                        <div className='bg-gray-50 dark:bg-gray-700 rounded'>
                            <AddEvents />
                        </div>
                    </div>
                }
                {step == 1 &&
                    <EventsConfig />
                }
                {step == 2 &&
                    <div className='mt-6'>
                        <h3 className='ml-4'>Preview</h3>
                        <EventsPreview />
                    </div>

                }
            </div>
            <div className="flex justify-between mt-4 text-right">
                <div>
                    {step > 0 && <Button
                        // className="mx-2 flex gap-2 text-[#0080FF] border border-[#0080FF]"
                        style={{
                            backgroundColor: "#4D4D4D", color: "white", 
                            fontStyle: 'normal',
                            fontSize: '18px'
                        }}
                        onClick={onPrevious}
                        type="button"

                    >
                        Previous
                    </Button>}
                </div>
                <div className='flex justify-end'>
                    {step >= 0 &&
                        <Link
                            className="block lg:inline-block md:mb-0 mb-4"
                            to="/masterDataMenu-item-view-7"
                        >
                            <Button
                                className="mx-2"
                                onClick={onPrevious}
                                variant="solid"
                                style={{
                                    backgroundColor: "#4D4D4D", 
                                    fontStyle: 'normal',
                                    fontSize: '18px'
                                }}


                            >
                                Cancel
                            </Button>
                        </Link>}
                    {step < 2 && <Button variant="solid" onClick={onNext} disabled={step === 2} style={{
                        fontStyle: 'normal',
                        fontSize: '18px'
                    }}>
                        {step === 2 ? 'Completed' : 'Next'}
                    </Button>}

                    {step === 2 &&
                        <>
                            <Link
                                className="block lg:inline-block md:mb-0 mb-4"
                                to="/masterDataMenu-item-view-7"
                            >
                                <Button variant="solid" style={{
                                    fontStyle: 'normal',
                                    fontSize: '18px'
                                }}>
                                    {'Submit for Approval'}
                                </Button>
                            </Link>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Controlled
