import React, { forwardRef, useImperativeHandle, useState } from 'react'
import EnterpriseAccountInfo from './EnterpriseAccountInfo'
import EnterpriseContactInfo from './EnterpriseContactInfo'
import EnterpriseAddressInfo from './EnterpriseAddressInfo'
import EnterpriseUploadFiles from './EnterpriseUploadFiles'
import EnterpriseBillingInfo from './EnterpriseBillingInfo'
import { AdaptableCard } from 'components/shared'
import { useFormikContext } from 'formik'


const EnterpriseDetails = forwardRef((props, ref) => {

  const [formData, setFormData] = useState({
    EnterpriseAccountInfo: { values: null, validated: false },
    EnterpriseContactInfo: { values: null, validated: false },
    EnterpriseAddressInfo: { values: null, validated: false },
    EnterpriseBillingInfo: { values: null, validated: false },
    EnterpriseUploladFileFileInfo : { values: null, validated: false },
    EnterpriseAdditionalFileInfo : { values: null, validated: false },
  })

  const enterpriseAccountInforef = React.useRef()
  const enterpriseContactInforef = React.useRef()
  const enterpriseAddressInforef = React.useRef()
  const enterpriseBillingInforef = React.useRef()
  const enterpriseUploadFileref = React.useRef()
  const enterpriseAddItonalref = React.useRef()

  // React.useEffect(() => {
  //   if (
  //     formData.EnterpriseAccountInfo.validated &&  formData.EnterpriseAddressInfo.validated
  //     //&& formData.EnterpriseContactInfo.validated


  //   ) {
  //     alert('Ready to save')
  //   }
  // }, [formData])

  async function handleSubmit() {

    let validationErrors = false;

    await enterpriseAccountInforef.current?.validateForm().then(errors => {
      if (errors && Object.keys(errors).length > 0) {
        enterpriseAccountInforef.current.setTouched(errors, true);
        validationErrors = true;
      }
    });

    await enterpriseContactInforef.current?.validateForm().then(errors => {

      if (errors && Object.keys(errors).length > 0) {
        enterpriseContactInforef.current.setTouched(errors, true);
        validationErrors = true;
      }

    });

    await enterpriseAddressInforef.current?.validateForm().then(errors => {

      if (errors && Object.keys(errors).length > 0) {
        enterpriseAddressInforef.current.setTouched(errors, true);
        validationErrors = true;
      }

     
    });

    enterpriseBillingInforef.current?.validateForm().then(errors => {
      if (errors && Object.keys(errors).length > 0) {
        enterpriseBillingInforef.current.setTouched(errors, true);
        validationErrors=true;
      }
    });

    await enterpriseUploadFileref.current?.validateForm().then(errors => {

      if (errors && Object.keys(errors).length > 0) {
        enterpriseUploadFileref.current.setTouched(errors, true);
        validationErrors = true;
      }

    });

    await enterpriseAddItonalref.current?.validateForm().then(errors => {

      if (errors && Object.keys(errors).length > 0) {
        enterpriseAddItonalref.current.setTouched(errors, true);
        validationErrors = true;
      }

    });


    if (!validationErrors) {
      await enterpriseAccountInforef?.current.submitForm()
      await enterpriseContactInforef?.current.submitForm()
      await enterpriseAddressInforef?.current.submitForm()
      await enterpriseBillingInforef?.current.submitForm()
      await enterpriseUploadFileref?.current.submitForm()
      await enterpriseAddItonalref?.current.submitForm()
    }





  }

  function handleChangeEnterpriseAccountInfo(data) {
    setFormData({ ...formData, EnterpriseAccountInfo: data })
  }

  function handleChangeEnterpriseContactInfo(data) {
    setFormData({ ...formData, EnterpriseContactInfo: data })
  }

  function handleChangeEnterpriseAddressInfo(data) {
    setFormData({ ...formData, EnterpriseAddressInfo: data })
  }

  function handleChangeEnterpriseBillingInfo(data) {
    setFormData({ ...formData, EnterpriseBillingInfo: data })
  
  }

  function handleChangeEnterpriseUploadInfo(data) {
    setFormData({ ...formData, EnterpriseUploladFileFileInfo: data })
  }

  function handleChangeEnterpriseAdditionalInfo(data) {
    setFormData({ ...formData, EnterpriseAdditionalFileInfo: data })
  }
    

  console.log(props.EpIntialValues)
  
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
        <AdaptableCard className="h-full" bodyClass="h-full" divider >
          <div className='border-b pb-6 mx-4'>
            <EnterpriseAccountInfo handleSubmit={handleSubmit}
              onChange={handleChangeEnterpriseAccountInfo}
              refId={enterpriseAccountInforef}
              enterpriseState={props.enterpriseState}
              setEnterpriseState={props.setEnterpriseState}
              EpIntialValues={props.EpIntialValues}
              setEpIntialValues={props.setEpIntialValues}
              setAccMnoId={props.setAccMnoId}
            />
          </div>
          <div className='border-b pb-6 mx-4'>
            <EnterpriseContactInfo onChange={handleChangeEnterpriseContactInfo}
              refId={enterpriseContactInforef}
              enterpriseState={props.enterpriseState}
              setEnterpriseState={props.setEnterpriseState}
              EpIntialValues={props.EpIntialValues}
              setEpIntialValues={props.setEpIntialValues}
            />
          </div>
          <div className='border-b pb-6 mx-4'>
            <EnterpriseAddressInfo onChange={handleChangeEnterpriseAddressInfo}
              refId={enterpriseAddressInforef}
              enterpriseState={props.enterpriseState}
              setEnterpriseState={props.setEnterpriseState}
              EpIntialValues={props.EpIntialValues}
              setEpIntialValues={props.setEpIntialValues}
            />
          </div>

          <EnterpriseBillingInfo onChange={handleChangeEnterpriseBillingInfo}
            refId={enterpriseBillingInforef}
            enterpriseState={props.enterpriseState}
            setEnterpriseState={props.setEnterpriseState}
            setStep={props.setStep}
            step={props.step}
            EpIntialValues={props.EpIntialValues}
            setEpIntialValues={props.setEpIntialValues}
          />

        </AdaptableCard>
     

      <AdaptableCard className="h-full" bodyClass="h-full" >
        <EnterpriseUploadFiles 
          onChange={handleChangeEnterpriseUploadInfo}
          onChangeAdd={handleChangeEnterpriseAdditionalInfo}
          refId={enterpriseUploadFileref}
          refIdAdd={enterpriseAddItonalref}
          enterpriseState={props.enterpriseState}
          setEnterpriseState={props.setEnterpriseState}
          setStep={props.setStep}
          step={props.step}
          EpIntialValues={props.EpIntialValues}
          setEpIntialValues={props.setEpIntialValues}
          mode={props.mode}
        />
      </AdaptableCard>
</div>
    </>
    
  )
})

export default EnterpriseDetails
