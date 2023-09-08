import React, { forwardRef, useImperativeHandle, useState } from 'react'
import ItemAccountInfo from './ItemAccountInfo'
import ItemContactInfo from './ItemContactInfo'
import ItemAddressInfo from './ItemAddressInfo'
import ItemUploadFiles from './ItemUploadFiles'
import ItemBillingInfo from './ItemBillingInfo'
import { AdaptableCard } from 'components/shared'
import ItemTemplateSelection from './ItemTemplateSelection'
import ItemProductCategorySelection from './ItemProductCategorySelection'


const ItemTemplate = forwardRef((props, ref) => {

  const [formData, setFormData] = useState({
    SolutionBasicDetails: { values: null, validated: false },
    SolutionBasicDetailsOther: { values: null, validated: false }
  })
  const solutionBasicDetailsref = React.useRef()


  async function handleSubmit() {

    let validationErrors = false;

    await solutionBasicDetailsref?.current?.validateForm().then(errors => {
      if (errors && Object.keys(errors).length > 0) {
          solutionBasicDetailsref.current.setTouched(errors, true);
          validationErrors = true;
      }
  });

    if (!validationErrors) {
      await solutionBasicDetailsref.current?.submitForm()
    }
  }

  function handleChangeSolutionBasicDetails(data) {
    setFormData({ ...formData, SolutionBasicDetails: data })
  }
  function handleChangeSolutionBasicDetailsOther(data) {
    setFormData({ ...formData, SolutionBasicDetailsOther: data })
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
      <div className="p-5"  style={{backgroundColor:"#f5f5f5"}}>
        <AdaptableCard className="h-full" bodyClass="h-full" divider >
          <ItemProductCategorySelection
            handleSubmit={handleSubmit}
            onChange={handleChangeSolutionBasicDetails}
            refId={solutionBasicDetailsref}
            itemIntials={props.itemIntials}
            setItemInitials={props.setItemInitials}
            step={props.step} setStep={props.setStep}
          />
        </AdaptableCard>
        {/* <AdaptableCard className="h-full" bodyClass="h-full" divider >
          <ItemTemplateSelection
            handleSubmit={handleSubmit}
            onChange={handleChangeSolutionBasicDetailsOther}
            refId={solutionBasicDetailsOtherref}
            itemIntials={props.itemIntials}
            setItemInitials={props.setItemInitials}
            step={props.step} setStep={props.setStep}
          />
        </AdaptableCard> */}
      </div>

    </>
  )
}
)
export default ItemTemplate
