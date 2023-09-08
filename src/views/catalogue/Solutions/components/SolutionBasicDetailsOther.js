import { AdaptableCard } from 'components/shared'
import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
} from 'components/ui'
import { apiSubmitSolBasic } from 'services/SolutionsService'
import { FormItem, FormContainer, Upload } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { HiOutlineCloudUpload } from 'react-icons/hi'
export const statusOptions = [
    { label: 'Married', value: 'M' },
    { label: 'Widowed', value: 'W' },
    { label: 'Separated', value: 'S' },
    { label: 'Divorced', value: 'D' },
    { label: 'Single ', value: 'S' },
]
const pCategoryOptions = [
    { label: 'Airtel Inc.', value: 'M' },
    { label: 'Airtel Inc.', value: 'F' },
    { label: 'Airtel India', value: 'O' },
]

const solutionBasicDetailsOtherValues = {
    zipCode: "" //not in api
}



const SolutionBasicDetailsOther = ({ onChange, refId, ...props }) => {

    const SubmitSolBasicDet = async (values) => {
       

        let updatedPayload = { ...props.solutionState, ...values }

        let body = {
            "id": Math.floor(10000 + Math.random() * 900),
            "solId": Math.floor(10000 + Math.random() * 900),
            "solUnqId": Math.floor(10000 + Math.random() * 900),
            "solTitle": updatedPayload.solTitle,
            "solDesc": updatedPayload.solDesc,
            "solKeywords": updatedPayload.solKeywords,
            "solTextBanner": updatedPayload.solTextBanner,
            "solImgUrl": "/app/digilink/image-0.0555.jpeg",
            "solGeoTag": "tag3",
            "solThumbnail": "YES",
            "solStatus": "SUCCESS",
            "relProdCat": {
                "id": Math.floor(10000 + Math.random() * 900),
                "prodCatTitle": "Prod-Catalog55",
                "prodCatDesc": "Testing ProdCatalog55",
                "prodCatImgUrl": "/app/digilink/image-0.0555.jpeg",
                "prodCatId": updatedPayload.pCategory,
                "mdProCatStatus": "SUCSESS"
            }
        }

        const resp = await apiSubmitSolBasic(body)
        if (resp.data.success) {
            let dataToStore = props.solutionIntialValues
            dataToStore.basicOther = values
            props.setSolutionIntialValues(dataToStore)
            props.setSolutionState(resp.data.response)
            props.setStep(props.step + 1)
        }
    }

    return (
        <>

            <Formik
                innerRef={refId}
                initialValues={props?.solutionIntialValues?.basicOther}
                onSubmit={(values, { setSubmitting }) => {
                    
                    setSubmitting(true)
                   SubmitSolBasicDet(values)
                
                }}
            >
                {({ values, touched, errors, isSubmitting,handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit} autoComplete="off">


                            <FormContainer>

                                <div className='p-2'>

                                    <AdaptableCard>
                                        <h5 className="mb-4 mt-2 mx-4">UPLOAD IMAGES</h5>
                                        <FormItem label="">

                                            <Field name="upload">
                                                {({ field, form }) => (
                                                    <div className='mx-4'>
                                                        <Upload draggable className='border-blue-500 bg-blue-50 w-96 h-36'>
                                                            <div className="my-10 text-center">
                                                                <div className="text-6xl mb-4 flex justify-center">
                                                                    <HiOutlineCloudUpload className="h-10" style={{ color: "#2563eb" }} />
                                                                </div>
                                                                <p className="font-semibold">
                                                                    <span className="text-gray-800 dark:text-white">
                                                                        Upload Files Here or{' '}
                                                                    </span>
                                                                    <span className="text-blue-500">
                                                                        browse
                                                                    </span>
                                                                </p>
                                                                <p className="mt-1 opacity-60 dark:text-white">
                                                                    JPG/PNG are allowed
                                                                </p>
                                                            </div>
                                                        </Upload>
                                                    </div>
                                                )}
                                            </Field>
                                        </FormItem>
                                    </AdaptableCard>
                                </div>


                            </FormContainer>


                        </Form>
                    )
                }}
            </Formik >

        </>
    )
}

export default SolutionBasicDetailsOther
