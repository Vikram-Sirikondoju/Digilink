import React, { forwardRef, useImperativeHandle, useState } from 'react'
import ItemAccountInfo from './ItemAccountInfo'
import ItemContactInfo from './ItemContactInfo'
import ItemAddressInfo from './ItemAddressInfo'
import ItemUploadFiles from './ItemUploadFiles'
import ItemBillingInfo from './ItemBillingInfo'
import { AdaptableCard } from 'components/shared'
import ItemTemplateSelection from './ItemTemplateSelection'
import ItemProductCategorySelection from './ItemProductCategorySelection'
import ItemFeatures from './ItemFeatures'
import TaxComponents from './TaxComponents'
import SopUploads from './SopUploads'
import ItemBasicDetails from './ItemBasicDetails'


const ItemDetails = forwardRef((props, ref) => {
    const [formData, setFormData] = useState({
        SolutionBasicDetails: { values: null, validated: false },
        SolutionBasicDetailsOther: { values: null, validated: false }
    })
    const solutionBasicDetailsref = React.useRef()
    const solutionBasicDetailsOthersref = React.useRef()

    async function handleSubmit() {

        let validationErrors = false;

        await solutionBasicDetailsref?.current?.validateForm().then(errors => {
            if (errors && Object.keys(errors).length > 0) {
                solutionBasicDetailsref.current.setTouched(errors, true);
                validationErrors = true;
            }
        });

        // await solutionBasicDetailsOthersref?.current?.validateForm().then(errors => {
        //     if (errors && Object.keys(errors).length > 0) {
        //         solutionBasicDetailsOthersref.current.setTouched(errors, true);
        //         validationErrors = true;
        //     }
        //   });

        // await solutionBasicDetailsref.current.submitForm()
        // await solutionBasicDetailsOthersref.current.submitForm()

        if (!validationErrors) {
            await solutionBasicDetailsref.current?.submitForm()
            // await solutionBasicDetailsOthersref.current?.submitForm()
          }
    }

    function handleChangeSolutionBasicDetails(data) {
        setFormData({ ...formData, SolutionBasicDetails: data })
       
    }

    // function handleChangeSolutionBasicOtherDetails(data) {
    //     setFormData({ ...formData, SolutionBasicDetailsOther: data })
    // }

    useImperativeHandle(ref, () => {
        return {
            handleSubmitFromParent() {
                handleSubmit()
            },
        }
    })

    return (
        <>
            <div className="p-5"  style={{backgroundColor:"#F5F5F5"}}>
                <AdaptableCard className="h-full m-2" bodyClass="h-full"   >
                    <ItemBasicDetails
                        handleSubmit={handleSubmit}
                        onChange={handleChangeSolutionBasicDetails}
                        refId={solutionBasicDetailsref}
                        itemIntials={props.itemIntials}
                        setItemInitials={props.setItemInitials}
                        step={props.step} setStep={props.setStep}
                    />
                </AdaptableCard>

                {/* <AdaptableCard className="h-full m-2" bodyClass="h-full" >
                    <ItemFeatures 
                     handleSubmit={handleSubmit}
                     onChange={handleChangeSolutionBasicOtherDetails}
                     refId={solutionBasicDetailsOthersref}
                     itemIntials={props.itemIntials}
                     setItemInitials={props.setItemInitials}
                     step={props.step} setStep={props.setStep}
                    
                    
                    />
                </AdaptableCard>  */}
            </div>

        </>
    )
})

export default ItemDetails
