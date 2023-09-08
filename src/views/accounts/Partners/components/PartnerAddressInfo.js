import React, { useCallback } from 'react'
import {
    Input,
    Button,
    Checkbox,
    Select,
    FormItem,
    FormContainer,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import get from 'lodash/get'
import { countryList } from 'constants/countries.constant'
import * as Yup from 'yup'

const addressFields = {
    accCountry: '',
    accAddL1: '',
    accAddL2: '',
    accCity: '',
    accState: '',
    accZipcode: '',
    // sameCorrespondenceAddress: true,
    // correspondenceAddress: {
    //     accCountry: '',
    //     accAddL1: '',
    //     accAddL2: '',
    //     accCity: '',
    //     accState: '',
    //     accZipcode: '',
    // },
}

const validationSchema = Yup.object().shape({
    accCountry: Yup.string().min(3,"Country must be at least 3 characters").required('Please enter country').nullable(),
    accAddL1: Yup.string().min(3,"Address must be at least 3 characters").max(255).required('Please enter address').nullable(),
    // accAddL2: Yup.string(),
    accCity: Yup.string().min(3,"City must be at least 3 characters").max(50).required('Please enter city').nullable(),
    accState: Yup.string().min(3,"State must be at least 3 characters").required('Please enter state').nullable(),
    //accZipcode: Yup.string().required('Please enter zip code'),
    // sameCorrespondenceAddress: Yup.bool(),
    // correspondenceAddress: Yup.object().when('sameCorrespondenceAddress', {
    //     is: false,
    //     then: Yup.object().shape({
    //         accCountry: Yup.string().required('Please select accCountry'),
    //         accAddL1: Yup.string().required('Please enter your address'),
    //         accAddL2: Yup.string(),
    //         accCity: Yup.string().required('Please enter your accCity'),
    //         accState: Yup.string().required('Please enter your accState'),
    //         accZipcode: Yup.string().required('Please enter zip code'),
    //     }),
    //     otherwise: (schema) => schema,
    // }),
})

const genderOptions = [
    { label: 'Airtel Inc.', value: '1' },
    { label: 'Airtel Inc.', value: '2' },
    { label: 'Airtel India', value: '3' },
]


const PartnerAddressInfo = ({onChange,refId,onNextChange,onBackChange,currentStepStatus,...props}) => {

    const onNext = (values, setSubmitting) => {
        onNextChange?.(values, 'addressInformation', setSubmitting)
    }

    const onCheck = (value, field, form) => {
        form.setFieldValue(field.name, value)
    }

    const onBack = () => {
        onBackChange?.()
    }

    return (
        <>
            <h3 className="mx-4 mb-4 mt-2">ADDRESS</h3>
            <Formik innerRef ={refId}
                initialValues={props.partnerIntialValues.address}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    let updatedPayload ={...props.partnerState, ...values}
                    
                    props.setPartnerState(updatedPayload)

                    let dataToStore = props.partnerIntialValues
                    dataToStore.address = values
                    props.setPartnerIntialValues(dataToStore)
                }}
            >
                {({ values, touched, errors, setFieldValue, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className="md:grid grid-cols-2 gap-4 mx-4">
                                    <FormItem
                                        label={<p>Address Line 1 <span style={{color: 'red'}}>{'*'}</span></p>}
                                        invalid={errors.accAddL1 &&touched.accAddL1}
                                        errorMessage={errors.accAddL1}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name='accAddL1'
                                            placeholder="Enter Address Line 1..."
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Address Line 2"
                                        // invalid={errors.accAddL2 && touched.accAddL2}
                                        // errorMessage={errors.accAddL2}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name={'accAddL2'}
                                            placeholder="Enter Address Line 2..."
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="md:grid grid-cols-4 gap-4 mx-4">
                                    <FormItem
                                        label={<p>City <span style={{color: 'red'}}>{'*'}</span></p>}
                                        invalid={errors.accCity && touched.accCity}
                                        errorMessage={errors.accCity}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name={'accCity'}
                                            placeholder="City"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>State <span style={{color: 'red'}}>{'*'}</span></p>}
                                        invalid={errors.accState &&touched.accState}
                                        errorMessage={errors.accState}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name={'accState'}
                                            placeholder="State"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>Country <span style={{color: 'red'}}>{'*'}</span></p>}
                                        invalid={errors.accCountry &&touched.accCountry}
                                        errorMessage={errors.accCountry}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name={'accCountry'}
                                            placeholder="Country"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Zip Code"
                                        //invalid={errors.accZipcode && touched.accZipcode}
                                        //errorMessage={errors.accZipcode}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name={'accZipcode'}
                                            placeholder="Zip Code"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>

                                {/* <AddressForm
                                    countryName="accCountry"
                                    addressLine1Name="accAddL1"
                                    addressLine2Name="accAddL2"
                                    cityName="accCity"
                                    stateName="accState"
                                    zipCodeName="accZipcode"
                                    {...formProps}
                                />
                               */}
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default PartnerAddressInfo
