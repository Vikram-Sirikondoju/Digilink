import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { AdaptableCard } from 'components/shared'
import ProviderUserInfo from './ProvidersUserInfo'
import ProviderContractInfo from './ProviderContractInfo'
import ProviderMasterPermissions from './ProviderMasterPermissions'

const ProviderMainUserInfo = forwardRef((props, ref) => {
    const [formData, setFormData] = useState({
        ProviderUserInfo: { values: null, validated: false },
        ProviderContractInfo: { values: null, validated: false },
        ProviderPermissionInfo: { values: null, validated: false },
    })

    const ProviderUserInforef = React.useRef()
    const ProviderContractInforef = React.useRef()
    const ProviderPermissionInforef = React.useRef()

    async function handleSubmit() {

        let validationErrors = false;
     
        await ProviderPermissionInforef.current?.validateForm().then(errors => {
            if (errors && Object.keys(errors).length > 0) {
                ProviderPermissionInforef.current.setTouched(errors, true);
              validationErrors = true;
            }
          });
        await ProviderUserInforef.current?.validateForm().then(errors => {

            if (errors && Object.keys(errors).length > 0) {
                ProviderUserInforef.current.setTouched(errors, true);
              validationErrors = true;
            }
      
          });
        await ProviderContractInforef.current?.validateForm().then(errors => {

            if (errors && Object.keys(errors).length > 0) {
                ProviderContractInforef.current.setTouched(errors, true);
              validationErrors = true;
            }
      
           
          });

          if (!validationErrors) {
            await ProviderPermissionInforef?.current.submitForm()
            await ProviderUserInforef?.current.submitForm()
            await ProviderContractInforef?.current.submitForm()
      
          }
      
    }

    function handleChangeProviderUserInfo(data) {
        setFormData({ ...formData, ProviderUserInfo: data })
    }

    function handleChangeProviderContractInfo(data) {
        setFormData({ ...formData, ProviderContractInfo: data })
    }

    function handleChangeProviderMasterPermissionInfo(data) {
        setFormData({ ...formData, ProviderPermissionInfo: data })
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
                  <div className="border-b border-dashed pb-6 mx-4 mt-6">
                        <ProviderMasterPermissions
                            handleSubmit={handleSubmit}
                            onChange={handleChangeProviderMasterPermissionInfo}
                            refId={ProviderPermissionInforef}
                            providerState={props.providerState}
                            setProviderState={props.setProviderState}
                            setStep={props.setStep}
                            step={props.step}
                            provideIntialValues = {props.provideIntialValues}
                            setProviderIntialValues = {props.setProviderIntialValues}
                        />
                    </div>
                    <div className="border-b border-dashed pb-6 mx-4 mt-6">
                        <ProviderUserInfo
                            handleSubmit={handleSubmit}
                            onChange={handleChangeProviderUserInfo}
                            refId={ProviderUserInforef}
                            providerState={props.providerState}
                            setProviderState={props.setProviderState}
                            provideIntialValues = {props.provideIntialValues}
                            setProviderIntialValues = {props.setProviderIntialValues}
                        />
                    </div>
                    <div className="mx-4 mt-6">
                        <ProviderContractInfo
                            handleSubmit={handleSubmit}
                            onChange={handleChangeProviderContractInfo}
                            refId={ProviderContractInforef}
                            providerState={props.providerState}
                            setProviderState={props.setProviderState}
                            setStep={props.setStep}
                            step={props.step}
                            provideIntialValues = {props.provideIntialValues}
                            setProviderIntialValues = {props.setProviderIntialValues}
                        />
                    </div>

                  

                </AdaptableCard>
            </div>
        </>
    )
})

export default ProviderMainUserInfo
