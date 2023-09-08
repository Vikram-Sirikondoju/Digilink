import React, { forwardRef, useImperativeHandle, useState } from 'react'
import PartnerAccountInfo from './PartnerAccountInfo'
import PartnerContactInfo from './PartnerContactInfo'
import PartnerAddressInfo from './PartnerAddressInfo'
import PartnerUploadFiles from './PartnerUploadFiles'
import PartnerSettlementInfo from './PartnerSettlementInfo'
import { AdaptableCard } from 'components/shared'
import { useFormikContext } from 'formik'

const PartnerDetails = forwardRef((props, ref) => {

    const [formData, setFormData] = useState({
        PartnerAccountInfo: { values: null, validated: false },
        PartnerContactInfo: { values: null, validated: false },
        PartnerAddressInfo: { values: null, validated: false },
        PartnerSettlementInfo: { values: null, validated: false },
        PartnerUploladFileFileInfo : { values: null, validated: false },
        PartnerAdditionalFileInfo : { values: null, validated: false },
    })

    const partnerAccountInforef = React.useRef()
    const partnerContactInforef = React.useRef()
    const partnerAddressInforef = React.useRef()
    const partnerSettlementInforef = React.useRef()
    const partnerUploladFileInforef = React.useRef()
    const partnerAdditionalFileInforef = React.useRef()

    async function handleSubmit() {

        let validationErrors = false;

        await partnerAccountInforef.current?.validateForm().then(errors => {
            if (errors && Object.keys(errors).length > 0) {
                partnerAccountInforef.current.setTouched(errors, true);
              validationErrors = true;
            }
          });
        await partnerContactInforef.current?.validateForm().then(errors => {

            if (errors && Object.keys(errors).length > 0) {
                partnerContactInforef.current.setTouched(errors, true);
              validationErrors = true;
            }
      
          });
        await partnerAddressInforef.current?.validateForm().then(errors => {

            if (errors && Object.keys(errors).length > 0) {
                partnerAddressInforef.current.setTouched(errors, true);
              validationErrors = true;
            }
      
           
          });
        await partnerSettlementInforef.current?.validateForm().then(errors => {

            if (errors && Object.keys(errors).length > 0) {
                partnerSettlementInforef.current.setTouched(errors, true);
              validationErrors = true;
            }
      
           
          });

          await partnerUploladFileInforef.current?.validateForm().then(errors => {

            if (errors && Object.keys(errors).length > 0) {
                partnerUploladFileInforef.current.setTouched(errors, true);
              validationErrors = true;
            }
      
           
          });
          await partnerAdditionalFileInforef.current?.validateForm().then(errors => {

            if (errors && Object.keys(errors).length > 0) {
                partnerAdditionalFileInforef.current.setTouched(errors, true);
              validationErrors = true;
            }
      
           
          });

          if (!validationErrors) {
            await partnerAccountInforef?.current.submitForm()
            await partnerContactInforef?.current.submitForm()
            await partnerAddressInforef?.current.submitForm()
            await partnerSettlementInforef?.current.submitForm()
            await partnerUploladFileInforef?.current.submitForm()
            await partnerAdditionalFileInforef?.current.submitForm()
      
          }
    }

    function handleChangePartnerAccountInfo(data) {
        setFormData({ ...formData, PartnerAccountInfo: data })
    }

    function handleChangePartnerContactInfo(data) {
        setFormData({ ...formData, PartnerContactInfo: data })
    }

    function handleChangePartnerAddressInfo(data) {
        setFormData({ ...formData, PartnerAddressInfo: data })
    }

    function handleChangePartnerSettlementInfo(data) {
        setFormData({ ...formData, PartnerSettlementInfo: data })
    }

    function handleChangePartnerUploadInfo(data) {
        setFormData({ ...formData, PartnerUploladFileFileInfo: data })
    }
    function handleChangePartnerAdditinalInfo(data) {
        setFormData({ ...formData, PartnerAdditionalFileInfo: data })
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
                <AdaptableCard className="h-full" bodyClass="h-full" divider>
                    <PartnerAccountInfo 
                     handleSubmit={handleSubmit}
                     onChange={handleChangePartnerAccountInfo}
                     refId={partnerAccountInforef}
                     partnerState={props.partnerState}
                     setPartnerState={props.setPartnerState}
                     partnerIntialValues={props.partnerIntialValues}
                     setPartnerIntialValues={props.setPartnerIntialValues}
                    />
                </AdaptableCard>
                <AdaptableCard className="h-full" bodyClass="h-full" divider>
                    <PartnerContactInfo 
                     handleSubmit={handleSubmit}
                     onChange={handleChangePartnerContactInfo}
                     refId={partnerContactInforef}
                     partnerState={props.partnerState}
                     setPartnerState={props.setPartnerState}
                     partnerIntialValues={props.partnerIntialValues}
                     setPartnerIntialValues={props.setPartnerIntialValues}
                    />
                </AdaptableCard>
                <AdaptableCard className="h-full" bodyClass="h-full" divider>
                    <PartnerAddressInfo 
                    handleSubmit={handleSubmit}
                    onChange={handleChangePartnerAddressInfo}
                    refId={partnerAddressInforef}
                    partnerState={props.partnerState}
                    setPartnerState={props.setPartnerState}
                    partnerIntialValues={props.partnerIntialValues}
                     setPartnerIntialValues={props.setPartnerIntialValues}
                    />
                </AdaptableCard>
                <AdaptableCard className="h-full" bodyClass="h-full" divider>
                    <PartnerSettlementInfo 
                    handleSubmit={handleSubmit}
                    onChange={handleChangePartnerSettlementInfo}
                    refId={partnerSettlementInforef}
                    partnerState={props.partnerState}
                    setPartnerState={props.setPartnerState}
                    setStep={props.setStep}
                    step={props.step}
                    partnerIntialValues={props.partnerIntialValues}
                    setPartnerIntialValues={props.setPartnerIntialValues}
                    />
                </AdaptableCard>
           
            <AdaptableCard className="h-full" bodyClass="h-full">
                <PartnerUploadFiles 
                    handleSubmit={handleSubmit}
                    onChange={handleChangePartnerUploadInfo}
                    onChangeAdd={handleChangePartnerAdditinalInfo}
                    refId={partnerUploladFileInforef}
                    refIdAdd={partnerAdditionalFileInforef}
                    partnerState={props.partnerState}
                    setPartnerState={props.setPartnerState}
                    setStep={props.setStep}
                    step={props.step}
                    partnerIntialValues={props.partnerIntialValues}
                    setPartnerIntialValues={props.setPartnerIntialValues}
                    mode={props.mode}
                />
            </AdaptableCard>
            </div>
        </>
    )
})

export default PartnerDetails
