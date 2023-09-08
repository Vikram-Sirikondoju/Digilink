import { AdaptableCard } from 'components/shared'
import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import ItemUploadFiles from './ItemUploadFiles'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import ItemVariantDetails from './ItemVariantDetails'

const ItemVariant = forwardRef((props, ref) => {

    const [formData, setFormData] = useState({
        SolutionBasicDetails: { values: null, validated: false },
    })
    const solutionBasicDetailsref = React.useRef()


    async function handleSubmit() {

        let validationErrors = false;

        await solutionBasicDetailsref?.current?.validateForm().then(errors => {
            if (errors && Object.keys(errors).length > 0) {
                solutionBasicDetailsref.current.setTouched(errors, true);
                validationErrors = true;
            }
        });

        if (!validationErrors) {
            await solutionBasicDetailsref.current?.submitForm()
        }
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
            <AdaptableCard className="h-full" bodyClass="h-full"  >
                <h3 className="mx-4 mb-4 mt-2">ITEM VARIANTS</h3>
                <ItemVariantDetails
                    handleSubmit={handleSubmit}
                    onChange={handleChangeSolutionBasicDetails}
                    refId={solutionBasicDetailsref}
                    itemIntials={props.itemIntials}
                    setItemInitials={props.setItemInitials}
                    step={props.step} setStep={props.setStep}
                    optionalValues={props.optionalValues}
                />
            </AdaptableCard>
        </>
    )
})

export default ItemVariant
