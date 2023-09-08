import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { AdaptableCard } from 'components/shared'
import { Field, Form, Formik } from 'formik'
import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Checkbox,
} from 'components/ui'
import SolutionBasicDetailsOther from './SolutionBasicDetailsOther'
import SolutionCreateStep2 from './SolutionCreateStep2'

const pCategoryOptions = [
    { label: 'Airtel Inc.', value: 'M' },
    { label: 'Airtel Inc.', value: 'F' },
    { label: 'Airtel India', value: 'O' },
]

const solutionCreateValues = {
    solItemType: "",
    cItemType: "", // not in api
    solDisplayItemPrice: "",
    solItemIsDep: false,
    cVariant: "",// not in api
    sCustomerType: "",// not in api
    sCustomerCatg: "",// not in api
    solutionSPrice: "",// not in api
    solutionDiscount: "",// not in api
    solutionDiscountMin: "",// not in api
    solutionDiscountMax: "",// not in api
    solutionDescription: "",// not in api
}

const SolutionCreate = forwardRef((props, ref) => {
    const [formData, setFormData] = useState({
        SolutionBasicDetails: { values: null, validated: false },
    })
    const solutionBasicDetailsref = React.useRef()
    async function handleSubmit() {
        await solutionBasicDetailsref.current.submitForm()
    }
    function handleChangeSolutionBasicDetails(data) {
        setFormData({ ...formData, SolutionBasicDetails: data })
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
            <h3 className="mx-4 mb-4">Create Solution</h3>
            <SolutionCreateStep2 handleSubmit={handleSubmit}
                onChange={handleChangeSolutionBasicDetails}
                refId={solutionBasicDetailsref}
                solutionCreate={props.solutionCreate}
                setSolutionCreate={props.setSolutionCreate}
                solutionState={props.solutionState}
                setSolutionState={props.setSolutionState}
                step={props.step}
                solutionIntialValues={props.solutionIntialValues}
                setSolutionIntialValues={props.setSolutionIntialValues}
                setStep={props.setStep} />
        </>
    )
})

export default SolutionCreate
