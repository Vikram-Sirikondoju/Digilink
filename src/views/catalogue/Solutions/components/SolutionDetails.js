import React, { forwardRef, useImperativeHandle, useState } from 'react'
import SolutionAccountInfo from './SolutionAccountInfo'
import SolutionContactInfo from './SolutionContactInfo'
import SolutionAddressInfo from './SolutionAddressInfo'
import SolutionUploadFiles from './SolutionUploadFiles'
import SolutionBillingInfo from './SolutionBillingInfo'
import { AdaptableCard } from 'components/shared'
import SolutionBasicDetails from './SolutionBasicDetails'
import SolutionBasicDetailsOther from './SolutionBasicDetailsOther'

const SolutionDetails = forwardRef((props, ref) => {

    const [formData, setFormData] = useState({
        SolutionBasicDetails: { values: null, validated: false },
        
    })
    const solutionBasicDetailsref = React.useRef()
    

    React.useEffect(() => {
        if (
          formData.SolutionBasicDetails.validated
          //&& formData.EnterpriseContactInfo.validated
        ) {
          alert('Ready to save')
        }
      }, [formData])

    async function handleSubmit() {
     
        await solutionBasicDetailsref.current.submitForm()
        
      
    }

    function handleChangeSolutionBasicDetails(data) {
        setFormData({ ...formData, SolutionBasicDetails: data })
    }
   
    useImperativeHandle(ref, () => {
        return {
            handleSubmitFromParent() {
                handleSubmit()
            },
        }
    })


    return (
        <>
            <h3 className="mx-2 mb-4 mt-2">Basic Details</h3>
            <div className="p-3"  style={{backgroundColor:"#F5F5F5"}}>
                <AdaptableCard className="h-full m-2" bodyClass="h-full"   >
                    <SolutionBasicDetails
                        handleSubmit={handleSubmit}
                        onChange={handleChangeSolutionBasicDetails}
                        refId={solutionBasicDetailsref}
                        solutionState={props.solutionState}
                        setSolutionState={props.setSolutionState}
                        solutionIntialValues={props.solutionIntialValues}
                        setSolutionIntialValues={props.setSolutionIntialValues}
                        step={props.step}
                        setStep={props.setStep}
                    />
                </AdaptableCard>
                {/* <AdaptableCard
                   className="h-full m-2"
                    bodyClass="h-full"
                    
                >
                    <SolutionBasicDetailsOther
                      
                        onChange={handleChangeSolutionBasicDetailsOther}
                        refId={solutionBasicDetailsOtherref}
                        solutionState={props.solutionState}
                        setSolutionState={props.setSolutionState}
                        step={props.step}
                        setStep={props.setStep}
                        solutionIntialValues={props.solutionIntialValues}
                        setSolutionIntialValues={props.setSolutionIntialValues}
                    />
                </AdaptableCard>  */}
            </div>
        
        </>
    )
})

export default SolutionDetails
