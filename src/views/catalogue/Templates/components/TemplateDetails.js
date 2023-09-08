import React, { useState, useImperativeHandle, forwardRef } from 'react'
import TemplateBasicInfo from './TemplateBasicInfo'
import TemplateContactInfo from './TemplateContactInfo'
import TemplateAddressInfo from './TemplateAddressInfo'
import TemplateUploadFiles from './TemplateUploadFiles'
import TemplateBillingInfo from './TemplateBillingInfo'
import { AdaptableCard } from 'components/shared'


const TemplateDetails = forwardRef((props, ref) => {
  const providerTempDetails = React.useRef()

  async function handleSubmit() {
    await providerTempDetails.current.submitForm()
  }

  return (
    <>
      <div className="p-5" style={{ backgroundColor: "#f5f5f5" }}>
        <AdaptableCard className="h-full" bodyClass="h-full" divider >
          <TemplateBasicInfo
            operaterState={props.operaterState}
            setOperaterState={props.setOperaterState}
            operatorIntialValues={props.operatorIntialValues}
            setOperatorIntialValues={props.setOperatorIntialValues}
            errors={props?.errors?.tempDetails || {}}
            touched={props?.touched?.tempDetails || {}}
            values={props?.values?.tempDetails || {}}

          />
        </AdaptableCard>
      </div>
      {/* <AdaptableCard className="h-full" bodyClass="h-full" divider >
          <TemplateContactInfo/>
          </AdaptableCard>
          <AdaptableCard className="h-full" bodyClass="h-full" divider >
          <TemplateAddressInfo/>
          </AdaptableCard>
          <AdaptableCard className="h-full" bodyClass="h-full" divider >
          <TemplateBillingInfo/>
          </AdaptableCard>
          <AdaptableCard className="h-full" bodyClass="h-full" >
          <TemplateUploadFiles/>
          </AdaptableCard> */}
    </>
  )
})

export default TemplateDetails
