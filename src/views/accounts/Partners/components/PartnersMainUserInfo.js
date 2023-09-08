import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { AdaptableCard } from 'components/shared'
import PartnerUserInfo from './PartnerUserInfo'
import PartnerContractInfo from './PartnersContractInfo'
import PatnerMasterPermissions from './PatnerMasterPermissions'


const ProviderMainUserInfo = forwardRef((props, ref) => {

  
  const [formData, setFormData] = useState({
    PartnerUserInfo: { values: null, validated: false },
    PartnerContractInfo: { values: null, validated: false },
    PartnerPermissionInfo: { values: null, validated: false },
  })

  const partnerUserInforef = React.useRef()
  const partnerContractInforef = React.useRef()
  const PatnerPermissionInforef=React.useRef()

  // React.useEffect(() => {
  //   if (
  //     formData.PartnerUserInfo.validated
  //   ) {
  //     alert('Ready to save')
  //   }
  // }, [formData])

  async function handleSubmit() {
    let validationErrors = false;


    await PatnerPermissionInforef?.current?.validateForm().then(errors => {
      if (errors && Object.keys(errors).length > 0) {
        PatnerPermissionInforef.current.setTouched(errors, true);
        validationErrors = true;
      }
    });

    await partnerUserInforef.current?.validateForm().then(errors => {

      if (errors && Object.keys(errors).length > 0) {
        partnerUserInforef.current.setTouched(errors, true);
        validationErrors = true;
      }

    });
    await partnerContractInforef.current?.validateForm().then(errors => {

      if (errors && Object.keys(errors).length > 0) {
        partnerContractInforef.current.setTouched(errors, true);
        validationErrors = true;
      }

     
    });

    
    if (!validationErrors) {
      await PatnerPermissionInforef?.current.submitForm()
      await partnerUserInforef?.current.submitForm()
      await partnerContractInforef?.current.submitForm()

    }

  }

  function handleChangePartnerUserInfo(data) {
    setFormData({ ...formData, PartnerUserInfo: data })
  }

  function handleChangePartnerContractInfo(data) {
    setFormData({ ...formData, PartnerContractInfo: data })
  }


   
 
function handleChangePartnerMasterPermissionInfo(data) {
  setFormData({ ...formData,  PartnerPermissionInfo: data })
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
      <div style={{ backgroundColor: "#F5F5F5" }} className=" p-5">

        <AdaptableCard className="h-full" bodyClass="h-full" divider >
          <PatnerMasterPermissions
            handleSubmit={handleSubmit}
            onChange={handleChangePartnerMasterPermissionInfo}
            refId={PatnerPermissionInforef}
            partnerState={props.partnerState}
            setPartnerState={props.setPartnerState}
            partnerIntialValues={props.partnerIntialValues}
            setPartnerIntialValues={props.setPartnerIntialValues}
          />
        </AdaptableCard>
        <AdaptableCard className="h-full" bodyClass="h-full" divider >
          <PartnerUserInfo
            handleSubmit={handleSubmit}
            onChange={handleChangePartnerUserInfo}
            refId={partnerUserInforef}
            partnerState={props.partnerState}
            setPartnerState={props.setPartnerState}
            partnerIntialValues={props.partnerIntialValues}
            setPartnerIntialValues={props.setPartnerIntialValues}
          />
        </AdaptableCard>
        <AdaptableCard className="h-full" bodyClass="h-full" divider >
          <PartnerContractInfo
            handleSubmit={handleSubmit}
            onChange={handleChangePartnerContractInfo}
            refId={partnerContractInforef}
            partnerState={props.partnerState}
            setPartnerState={props.setPartnerState}
            setStep={props.setStep}
            step={props.step}
            partnerIntialValues={props.partnerIntialValues}
            setPartnerIntialValues={props.setPartnerIntialValues}
          />
        </AdaptableCard>
      </div>
    </>
  )
})

export default ProviderMainUserInfo
