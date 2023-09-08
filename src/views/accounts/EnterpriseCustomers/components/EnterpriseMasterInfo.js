import React, { forwardRef, useImperativeHandle, useState } from 'react'
import EnterpriseMasterUserInfo from './EnterpriseMasterUserInfo'
import EnterpriseMasterContactInfo from './EnterpriseMasterContactInfo'


import { AdaptableCard } from 'components/shared'


const EnterpriseMasterInfo = forwardRef((props, ref) => {

  const [formData, setFormData] = useState({
    EnterpriseMasterInfo: { values: null, validated: false },
    EnterpriseContractInfo: { values: null, validated: false },

  })

  const enterpriseMasterInforef = React.useRef()
  const enterpriseContractInforef = React.useRef()


  // React.useEffect(() => {
  //   if (
  //     formData.EnterpriseMasterInfo.validated
  //     //&& formData.EnterpriseContactInfo.validated
  //   ) {
  //     alert('Ready to save')
  //   }
  // }, [formData])

  async function handleSubmit() {

    let validationErrors = false;

    await enterpriseMasterInforef.current?.validateForm().then(errors => {
      if (errors && Object.keys(errors).length > 0) {
        enterpriseMasterInforef.current.setTouched(errors, true);
        validationErrors = true;
      }
    });
    await enterpriseContractInforef.current?.validateForm().then(errors => {

      if (errors && Object.keys(errors).length > 0) {
        enterpriseContractInforef.current.setTouched(errors, true);
        validationErrors = true;
      }

    });

    if (!validationErrors) {
      await enterpriseMasterInforef?.current.submitForm()
      await enterpriseContractInforef?.current.submitForm()
      

    }

  }

  function handleChangeEnterpriseMasterInfo(data) {
    setFormData({ ...formData, EnterpriseMasterInfo: data })
  }

  function handleChangeEnterpriseContactInfo(data) {
    setFormData({ ...formData, EnterpriseContractInfo: data })
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
      <div style={{backgroundColor:"#F5F5F5"}} className=" p-5">
        <AdaptableCard className="h-full" bodyClass="h-full" divider >
          <div className='border-b pb-6 '>
            <EnterpriseMasterUserInfo handleSubmit={handleSubmit}
              onChange={handleChangeEnterpriseMasterInfo}
              refId={enterpriseMasterInforef}
              enterpriseState={props.enterpriseState}
              setEnterpriseState={props.setEnterpriseState}
              EpIntialValues={props.EpIntialValues}
              setEpIntialValues={props.setEpIntialValues}

            />
          </div>

          <EnterpriseMasterContactInfo handleSubmit={handleSubmit}
            onChange={handleChangeEnterpriseContactInfo}
            refId={enterpriseContractInforef}
            enterpriseState={props.enterpriseState}
            setEnterpriseState={props.setEnterpriseState}
            setStep={props.setStep}
            step={props.step}
            EpIntialValues={props.EpIntialValues}
            setEpIntialValues={props.setEpIntialValues}
          />
        </AdaptableCard>
      </div>
    </>
  )
})

export default EnterpriseMasterInfo
