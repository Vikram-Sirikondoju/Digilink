import OperatorMasterUserInfo from './OperatorMasterUserInfo'
import { AdaptableCard } from 'components/shared'
import React, { forwardRef, useImperativeHandle, useState } from 'react'


const OperatorMasterInfo = forwardRef((props, ref) => {

    const [formData, setFormData] = useState({
        operaterUserInfo: { values: null, validated: false },

    })

    const operaterUserInforef = React.useRef()



    React.useEffect(() => {
        if (
            formData.operaterUserInfo.validated
            //&& formData.operaterContactInfo.validated
        ) {
            alert('Ready to save')
        }
    }, [formData])

    async function handleSubmit() {
        await operaterUserInforef.current.submitForm()

    }

    function handleChangeOperaterUserInfo(data) {
        setFormData({ ...formData, operaterUserInfo: data })
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
            <div style={{backgroundColor:"#F5F5F5"}} className="p-5">
                <AdaptableCard className="h-full" bodyClass="h-full" >
                    <OperatorMasterUserInfo
                        operaterState={props.operaterState}
                        setOperaterState={props.setOperaterState}                       
                        operatorIntialValues={props.operatorIntialValues}
                        setOperatorIntialValues={props.setOperatorIntialValues}
                        errors={props?.errors?.userInfo || {}}
                        touched={props?.touched?.userInfo || {}}
                        values={props?.values?.userInfo || {}}
                        />
                </AdaptableCard>
            </div>
        </>
    )
})

export default OperatorMasterInfo
