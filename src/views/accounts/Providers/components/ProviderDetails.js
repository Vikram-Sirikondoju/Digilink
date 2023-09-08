import React, { forwardRef, useImperativeHandle, useState } from 'react'
import ProviderAccountInfo from './ProviderAccountInfo'
import ProviderContactInfo from './ProviderContactInfo'
import ProviderAddressInfo from './ProviderAddressInfo'
import ProviderUploadFiles from './ProviderUploadFiles'
import ProviderSettlementInfo from './ProviderSettlementInfo'
import { AdaptableCard } from 'components/shared'
import * as Yup from 'yup'

const ProviderDetails = forwardRef((props, ref) => {
    const [formData, setFormData] = useState({
        ProviderAccountInfo: { values: null, validated: false },
        ProviderContactInfo: { values: null, validated: false },
        ProviderAddressInfo: { values: null, validated: false },
        ProviderSettlementInfo: { values: null, validated: false },
        ProviderUploladFileFileInfo : { values: null, validated: false },
        ProviderAdditionalFileInfo : { values: null, validated: false },
    })

    const providerAccountInforef = React.useRef()
    const providerContactInforef = React.useRef()
    const providerAddressInforef = React.useRef()
    const providerSettlementInforef = React.useRef()
    const providerUploladFileInforef = React.useRef()
    const providerAdditionalFileInforef = React.useRef()

    async function handleSubmit() {

        let validationErrors = false;

        await providerAccountInforef?.current?.validateForm().then(errors => {
            if (errors && Object.keys(errors).length > 0) {
              providerAccountInforef.current.setTouched(errors, true);
              validationErrors = true;
            }
          });
        await providerContactInforef?.current?.validateForm().then(errors => {

            if (errors && Object.keys(errors).length > 0) {
                providerContactInforef.current.setTouched(errors, true);
              validationErrors = true;
            }
      
          });
        await providerAddressInforef?.current?.validateForm().then(errors => {

            if (errors && Object.keys(errors).length > 0) {
                providerAddressInforef.current.setTouched(errors, true);
              validationErrors = true;
            }
      
           
          });
        await providerSettlementInforef?.current?.validateForm().then(errors => {

            if (errors && Object.keys(errors).length > 0) {
                providerSettlementInforef.current.setTouched(errors, true);
              validationErrors = true;
            }
      
           
          });
          await providerUploladFileInforef?.current?.validateForm().then(errors => {

            if (errors && Object.keys(errors).length > 0) {
                providerUploladFileInforef.current.setTouched(errors, true);
              validationErrors = true;
            }
      
           
          });
          await providerAdditionalFileInforef?.current?.validateForm().then(errors => {

            if (errors && Object.keys(errors).length > 0) {
                providerAdditionalFileInforef.current.setTouched(errors, true);
              validationErrors = true;
            }
      
           
          });

        if (!validationErrors) {
            await providerAccountInforef.current?.submitForm()
            await providerContactInforef.current?.submitForm()
            await providerAddressInforef.current?.submitForm()
          
            await providerSettlementInforef.current?.submitForm()
            await providerUploladFileInforef.current?.submitForm()
            await providerAdditionalFileInforef.current?.submitForm()
          }
    }

    function handleChangeProviderAccountInfo(data) {
        setFormData({ ...formData, providerAccountInfo: data })
    }

    function handleChangeProviderContactInfo(data) {
        setFormData({ ...formData, providerContactInfo: data })
    }

    function handleChangeProviderAddressInfo(data) {
        setFormData({ ...formData, ProviderAddressInfo: data })
    }

    function handleChangeProviderSettlementInfo(data) {
        setFormData({ ...formData, ProviderSettlementInfo: data })
    }

    function handleChangeProviderUploadInfo(data) {
        setFormData({ ...formData, ProviderUploladFileFileInfo: data })
    }

    function handleChangeProviderAdditionalInfo(data) {
        setFormData({ ...formData, ProviderAdditionalFileInfo: data })
    }


    useImperativeHandle(ref, () => {
        return {
            handleSubmitFromParent() {
                handleSubmit()
            },
        }
    })

    console.log('provider details',props)

    return (
        <>
            <div style={{ backgroundColor: "#F5F5F5" }} className=" p-5">
                <AdaptableCard className="h-full" bodyClass="h-full" divider>
                    <div className="border-b border-dashed pb-6 mx-4">
                        <ProviderAccountInfo
                            handleSubmit={handleSubmit}
                            onChange={handleChangeProviderAccountInfo}
                            refId={providerAccountInforef}
                            providerState={props.providerState}
                            setProviderState={props.setProviderState}
                            provideIntialValues={props.provideIntialValues}
                            setProviderIntialValues={props.setProviderIntialValues}
                        />
                    </div>
                    <div className="border-b border-dashed pb-6 mx-4 mt-6">
                        <ProviderContactInfo
                            handleSubmit={handleSubmit}
                            onChange={handleChangeProviderContactInfo}
                            refId={providerContactInforef}
                            providerState={props.providerState}
                            setProviderState={props.setProviderState}
                            provideIntialValues={props.provideIntialValues}
                            setProviderIntialValues={props.setProviderIntialValues}
                        />
                    </div>
                    <div className="border-b border-dashed pb-6 mx-4 mt-6">
                        <ProviderAddressInfo
                            handleSubmit={handleSubmit}
                            onChange={handleChangeProviderAddressInfo}
                            refId={providerAddressInforef}
                            providerState={props.providerState}
                            setProviderState={props.setProviderState}
                            provideIntialValues={props.provideIntialValues}
                            setProviderIntialValues={props.setProviderIntialValues}
                        />
                    </div>
                    <div className="mx-4 mt-6">
                        <ProviderSettlementInfo
                            handleSubmit={handleSubmit}
                            onChange={handleChangeProviderSettlementInfo}
                            refId={providerSettlementInforef}
                            providerState={props.providerState}
                            setProviderState={props.setProviderState}
                            setStep={props.setStep}
                            step={props.step}
                            provideIntialValues={props.provideIntialValues}
                            setProviderIntialValues={props.setProviderIntialValues}
                        />
                    </div>
                </AdaptableCard>
           
            <AdaptableCard className="h-full" bodyClass="h-full">
                <ProviderUploadFiles 
                    handleSubmit={handleSubmit}
                    onChangeUpload={handleChangeProviderUploadInfo}
                    onChangeAdditional={handleChangeProviderAdditionalInfo}
                    refId={providerUploladFileInforef}
                    refIdAdd={providerAdditionalFileInforef}
                    providerState={props.providerState}
                    setProviderState={props.setProviderState}
                    setStep={props.setStep}
                    step={props.step}
                    provideIntialValues={props.provideIntialValues}
                    setProviderIntialValues={props.setProviderIntialValues}
                    mode={props.mode}
                />
            </AdaptableCard>
            </div>
        </>
    )
})

export default ProviderDetails
