import React, { forwardRef, useImperativeHandle, useState } from 'react'
import RetailUserInfo from './RetailUserInfo'



import { AdaptableCard } from 'components/shared'


const RetailMasterInfo = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    RetailUserInfo: { values: null, validated: false },


  })

  const retailUserInforef = React.useRef()



  React.useEffect(() => {
    if (
      formData.RetailUserInfo.validated
      //&& formData.EnterpriseContactInfo.validated
    ) {
      alert('Ready to save')
    }
  }, [formData])

  async function handleSubmit() {
    await retailUserInforef.current.submitForm()


  }

  function handleChangeRetailUserInfo(data) {
    setFormData({ ...formData, RetailUserInfo: data })
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
        <AdaptableCard className="h-full" bodyClass="h-full"  >
          <div className='border-b pb-6 '>
        <RetailUserInfo handleSubmit={handleSubmit}
          onChange={handleChangeRetailUserInfo}
          refId={retailUserInforef}
          retailState={props.retailState}
          setRetailState={props.setRetailState}
          setStep={props.setStep}
          step={props.step}
          retailIntialValues={props.retailIntialValues}
          setRetailIntialValues={props.setRetailIntialValues}
        />
        </div>
      </AdaptableCard>
      </div>


    </>
  )
})

export default RetailMasterInfo
