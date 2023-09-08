import React, { forwardRef, useImperativeHandle, useState } from 'react'

import { AdaptableCard } from 'components/shared'
import RetailAccountInfo from './RetailAccountInfo'
import RetailContactInfo from './RetailContactInfo'
import RetailAddressInfo from './RetailAddressInfo'
import RetailUploadFiles from './RetailUploadFiles'
import { useFormikContext } from 'formik'



const RetailDetails = forwardRef((props, ref) => {

  const [formData, setFormData] = useState({
    RetailAccountInfo: { values: null, validated: false },
    RetailContactInfo: { values: null, validated: false },
    RetailAddressInfo: { values: null, validated: false },
    RetailUploladFileInfo : { values: null, validated: false },
    RetailAdditionalFileInfo : { values: null, validated: false },
  })

  const retailAccountInforef = React.useRef()
  const retailContactInforef = React.useRef()
  const retailAddressInforef = React.useRef()
  const retailUploladFileInforef = React.useRef()
  const retailAdditionalFileInforef = React.useRef()


  // React.useEffect(() => {
  //   if (
  //     formData.RetailAccountInfo.validated
  //     //&& formData.EnterpriseContactInfo.validated
  //   ) {
  //     alert('Ready to save')
  //   }
  // }, [formData])

  async function handleSubmit() {
    let validationErrors = false;

    await retailAccountInforef.current?.validateForm().then(errors => {
      if (errors && Object.keys(errors).length > 0) {
        retailAccountInforef.current.setTouched(errors, true);
        validationErrors = true;
      }
    });
    await retailContactInforef.current?.validateForm().then(errors => {

      if (errors && Object.keys(errors).length > 0) {
        retailContactInforef.current.setTouched(errors, true);
        validationErrors = true;
      }

    });
    await retailAddressInforef.current?.validateForm().then(errors => {

      if (errors && Object.keys(errors).length > 0) {
        retailAddressInforef.current.setTouched(errors, true);
        validationErrors = true;
      }

     
    });

    await retailUploladFileInforef.current?.validateForm().then(errors => {

      if (errors && Object.keys(errors).length > 0) {
        retailUploladFileInforef.current.setTouched(errors, true);
        validationErrors = true;
      }

     
    });
    await retailAdditionalFileInforef.current?.validateForm().then(errors => {

      if (errors && Object.keys(errors).length > 0) {
        retailAdditionalFileInforef.current.setTouched(errors, true);
        validationErrors = true;
      }

     
    });

    if (!validationErrors) {
      await retailAccountInforef.current?.submitForm()
      await retailContactInforef.current?.submitForm()
      await retailAddressInforef.current?.submitForm()
      await retailUploladFileInforef.current?.submitForm()
      await retailAdditionalFileInforef.current?.submitForm()
    

    }


  }

  function handleChangeRetailAccountInfo(data) {
    setFormData({ ...formData, RetailAccountInfo: data })
  }

  function handleChangeRetailContactInfo(data) {
    setFormData({ ...formData, RetailContactInfo: data })
  }

  function handleChangeRetailAddressInfo(data) {
    setFormData({ ...formData, RetailAddressInfo: data })
  }

  function handleChangeRetailUploladFileInfo(data) {
    setFormData({ ...formData, RetailUploladFileInfo: data })
  }

  function handleChangeRetailAdditionalFileInfo(data) {
    setFormData({ ...formData, RetailAdditionalFileInfo: data })
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
      <div className="p-5" style={{backgroundColor:"#F5F5F5"}}>
        <AdaptableCard className="h-full" bodyClass="h-full" divider>
          <div className='border-b pb-6 mx-4'>
            <RetailAccountInfo handleSubmit={handleSubmit}
              onChange={handleChangeRetailAccountInfo}
              refId={retailAccountInforef}
              retailState={props.retailState}
              setRetailState={props.setRetailState}
              retailIntialValues={props.retailIntialValues}
              setRetailIntialValues={props.setRetailIntialValues}
            />
          </div>
          <div className='border-b pb-6 mx-4'>
            <RetailContactInfo handleSubmit={handleSubmit}
              onChange={handleChangeRetailContactInfo}
              refId={retailContactInforef}
              retailState={props.retailState}
              setRetailState={props.setRetailState}
              retailIntialValues={props.retailIntialValues}
              setRetailIntialValues={props.setRetailIntialValues}
            />
          </div>

          <RetailAddressInfo handleSubmit={handleSubmit}
            onChange={handleChangeRetailAddressInfo}
            refId={retailAddressInforef}
            retailState={props.retailState}
            setRetailState={props.setRetailState}
            setStep={props.setStep}
            step={props.step}
            retailIntialValues={props.retailIntialValues}
            setRetailIntialValues={props.setRetailIntialValues}
          />
        </AdaptableCard>

    
      <AdaptableCard className="h-full" bodyClass="h-full"  >
        < RetailUploadFiles 
          handleSubmit={handleSubmit}
          onChange={handleChangeRetailUploladFileInfo}
          onChangeAdd={handleChangeRetailAdditionalFileInfo}
          refId={retailUploladFileInforef}
          refIdAdd={retailAdditionalFileInforef}
          retailState={props.retailState}
          setRetailState={props.setRetailState}
          setStep={props.setStep}
          step={props.step}
          retailIntialValues={props.retailIntialValues}
          setRetailIntialValues={props.setRetailIntialValues}
          mode={props.mode}
        />
      </AdaptableCard>
        </div>
    </>
  )
})

export default RetailDetails
