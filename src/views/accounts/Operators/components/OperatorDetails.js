import React, { forwardRef, useState } from 'react'
import OperatorAccountInfo from './OperatorAccountInfo'
import OperatorContactInfo from './OperatorContactInfo'
import OperatorAddressInfo from './OperatorAddressInfo'
import OperatorUploadFiles from './OperatorUploadFiles'
import OperatorBillingInfo from './OperatorBillingInfo'
import { AdaptableCard } from 'components/shared'

const OperatorDetails = forwardRef((props, ref) => {
    const [formData, setFormData] = useState({
        operaterAccountInfo: { values: null, validated: false },
        operaterContactInfo: { values: null, validated: false },
        operaterAddressInfo: { values: null, validated: false },
        operaterBillingInfo: { values: null, validated: false },
        operatorUploadFiles: { values: null, validated: false },
    })
    function handleChangeOperaterAccountInfo(data) {
        setFormData({ ...formData, operaterAccountInfo: data })
    }

    function handleChangeOperaterContactInfo(data) {
        setFormData({ ...formData, operaterContactInfo: data })
    }

    function handleChangeOperaterAddressInfo(data) {
        setFormData({ ...formData, operaterAddressInfo: data })
    }

    function handleChangeOperaterBillingInfo(data) {
        setFormData({ ...formData, operaterBillingInfo: data })
    }
    function handleChangeUploadFilesInfo(data) {
        setFormData({ ...formData, operatorUploadFiles: data })
    }
    return (
        <>
            <div style={{ backgroundColor: "#F5F5F5" }} className=" p-5">
                <AdaptableCard className="h-full" bodyClass="h-full" >
                    <div className='border-b pb-4 mx-4'>
                        <OperatorAccountInfo
                            onChange={handleChangeOperaterAccountInfo}
                            operaterState={props.operaterState}
                            setOperaterState={props.setOperaterState}
                            operatorIntialValues={props.operatorIntialValues}
                            setOperatorIntialValues={props.setOperatorIntialValues}
                            errors={props?.errors?.accInfo || {}}
                            touched={props?.touched?.accInfo || {}}
                            values={props?.values?.accInfo || {}}
                        />
                    </div>
                    <div className='border-b pb-4 mx-4'>
                        <OperatorContactInfo
                            onChange={handleChangeOperaterContactInfo}
                            operaterState={props.operaterState}
                            setOperaterState={props.setOperaterState}
                            operatorIntialValues={props.operatorIntialValues}
                            setOperatorIntialValues={props.setOperatorIntialValues}
                            errors={props?.errors?.ContactInfo || {}}
                            touched={props?.touched?.ContactInfo || {}}
                            values={props?.values?.ContactInfo || {}}
                        />
                    </div>

                    <div className='border-b pb-6 mx-4'>
                        <OperatorAddressInfo
                            onChange={handleChangeOperaterAddressInfo}
                            operaterState={props.operaterState}
                            setOperaterState={props.setOperaterState}
                            operatorIntialValues={props.operatorIntialValues}
                            setOperatorIntialValues={props.setOperatorIntialValues}
                            errors={props?.errors?.address || {}}
                            touched={props?.touched?.address || {}}
                            values={props?.values?.address || {}}
                        />
                    </div>

                    <div className='border-b pb-6 mx-4'>
                        <OperatorBillingInfo
                            onChange={handleChangeOperaterBillingInfo}
                            operaterState={props.operaterState}
                            setOperaterState={props.setOperaterState}
                            operatorIntialValues={props.operatorIntialValues}
                            setOperatorIntialValues={props.setOperatorIntialValues}
                            errors={props?.errors?.billing || {}}
                            touched={props?.touched?.billing || {}}
                            values={props?.values?.billing || {}}
                            setFieldValue={props.setFieldValue}
                        />
                    </div>
                </AdaptableCard>
                <AdaptableCard className="h-full" bodyClass="h-full" >
                    <OperatorUploadFiles
                        onChange={handleChangeUploadFilesInfo}
                        operaterState={props.operaterState}
                        setOperaterState={props.setOperaterState}
                        operatorIntialValues={props.operatorIntialValues}
                        setOperatorIntialValues={props.setOperatorIntialValues}
                        errors={props?.errors || {}}
                        touched={props?.touched || {}}
                        values={props?.values || {}}
                        setFieldValue={props.setFieldValue} />
                </AdaptableCard>
            </div>
        </>
    )
})

export default OperatorDetails
