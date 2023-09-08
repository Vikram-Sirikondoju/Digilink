import React, { useCallback } from 'react'
import {
    Input,

    FormItem,
    FormContainer,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

const addressFields = {
    custCountry: '',
    custAddL1: '',
    custAddL2: '',
    custCity: '',
    custState: '',
    custZipcode: '',
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
    custCountry: Yup.string().required('Please enter country').nullable(),
    custAddL1: Yup.string().min(6,"Enter address minimum of 6 characters").required('Please enter address').nullable(),
    // accAddL2: Yup.string(),
    custCity: Yup.string().required('Please enter city').nullable(),
    custState: Yup.string().required('Please enter state').nullable(),
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
    { label: 'Airtel Inc.', value: 'M' },
    { label: 'Airtel Inc.', value: 'F' },
    { label: 'Airtel India', value: 'O' },
]


const RetailAddressInfo = ({ onChange, refId, ...props }) => {



    return (
        <>
            <h3 className="mx-4 mb-4 mt-2">ADDRESS</h3>
            <Formik innerRef={refId}
                initialValues={props.retailIntialValues.addressFields}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    let updatedPayload = { ...props.retailState, ...values }
                    props.setRetailState(updatedPayload)
                    let dataToStore =  props.retailIntialValues
                    dataToStore.addressFields = values
                    props.setRetailIntialValues(dataToStore)
                }}
            >
                {({ values, touched, errors, setFieldValue, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className="md:grid grid-cols-2 gap-4 mx-4">
                                    <FormItem
                                        label={<p>Address Line 1<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.custAddL1 && touched.custAddL1}
                                        errorMessage={errors.custAddL1}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name='custAddL1'
                                            placeholder="Address Line 1"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label="Address Line 2"
                                    // invalid={errors.custAddL2 && touched.custAddL2}
                                    // errorMessage={errors.custAddL2}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name={'custAddL2'}
                                            placeholder="Address Line 2"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="md:grid grid-cols-4 gap-4 mx-4">
                                    <FormItem
                                        label={<p>City<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.custCity && touched.custCity}
                                        errorMessage={errors.custCity}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name={'custCity'}
                                            placeholder="City"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>State<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.custState && touched.custState}
                                        errorMessage={errors.custState}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name={'custState'}
                                            placeholder="State"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>Country<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.custCountry && touched.custCountry}
                                        errorMessage={errors.custCountry}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name={'custCountry'}
                                            placeholder="State"
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
                                            name={'custZipcode'}
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

export default RetailAddressInfo
