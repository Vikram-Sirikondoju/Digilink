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

const validationSchema = Yup.object().shape({
    country: Yup.string().required('Please select country'),
    addressLine1: Yup.string().required('Please enter your address'),
    addressLine2: Yup.string(),
    city: Yup.string().required('Please enter your city'),
    state: Yup.string().required('Please enter your state'),
    zipCode: Yup.string().required('Please enter zip code'),
    sameCorrespondenceAddress: Yup.bool(),
    correspondenceAddress: Yup.object().when('sameCorrespondenceAddress', {
        is: false,
        then: Yup.object().shape({
            country: Yup.string().required('Please select country'),
            addressLine1: Yup.string().required('Please enter your address'),
            addressLine2: Yup.string(),
            city: Yup.string().required('Please enter your city'),
            state: Yup.string().required('Please enter your state'),
            zipCode: Yup.string().required('Please enter zip code'),
        }),
        otherwise: (schema) => schema,
    }),
})

const AddressForm = (props) => {
    const {
        values,
        touched,
        errors,
        countryName,
        addressLine1Name,
        addressLine2Name,
        cityName,
        stateName,
        zipCodeName,
    } = props

    const getError = useCallback(
        (name) => {
            return get(errors, name)
        },
        [errors]
    )

    const getTouched = useCallback(
        (name) => {
            return get(touched, name)
        },
        [touched]
    )

    return (
        <>
            <div className="md:grid grid-cols-2 gap-4 mx-4">
               
                <FormItem
                    label="Address Line 1"
                    invalid={
                        getError(addressLine1Name) &&
                        getTouched(addressLine1Name)
                    }
                    errorMessage={getError(addressLine1Name)}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name={addressLine1Name}
                        placeholder="Address Line 1"
                        component={Input}
                    />
                </FormItem>

                <FormItem
                    label="Address Line 2"
                    invalid={
                        getError(addressLine2Name) &&
                        getTouched(addressLine2Name)
                    }
                    errorMessage={getError(addressLine2Name)}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name={addressLine2Name}
                        placeholder="Address Line 2"
                        component={Input}
                    />
                </FormItem>
            </div>
            <div className="md:grid grid-cols-4 gap-4 mx-4">
              
                <FormItem
                    label="City"
                    invalid={getError(cityName) && getTouched(cityName)}
                    errorMessage={getError(cityName)}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name={cityName}
                        placeholder="City"
                        component={Input}
                    />
                </FormItem>
                <FormItem
                    label="State"
                    invalid={getError(stateName) && getTouched(stateName)}
                    errorMessage={getError(stateName)}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name={stateName}
                        placeholder="State"
                        component={Input}
                    />
                </FormItem>
                <FormItem
                    label="Country"
                    invalid={getError(countryName) && getTouched(countryName)}
                    errorMessage={getError(countryName)}
                >
                    <Field name={countryName}>
                        {({ field, form }) => (
                            <Select
                                placeholder="Country"
                                field={field}
                                form={form}
                                options={countryList}
                                value={countryList.filter(
                                    (c) => c.value === get(values, countryName)
                                )}
                                onChange={(c) =>
                                    form.setFieldValue(field.name, c.value)
                                }
                            />
                        )}
                    </Field>
                </FormItem>
                <FormItem
                    label="Zip Code"
                    invalid={getError(zipCodeName) && getTouched(zipCodeName)}
                    errorMessage={getError(zipCodeName)}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name={zipCodeName}
                        placeholder="Zip Code"
                        component={Input}
                    />
                </FormItem>
            </div>
           
              
            
        </>
    )
}

const SolutionAddressInfo = ({
    data = {
        country: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        sameCorrespondenceAddress: true,
        correspondenceAddress: {
            country: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipCode: '',
        },
    },
    onNextChange,
    onBackChange,
    currentStepStatus,
}) => {
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
            <Formik
                initialValues={data}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    setTimeout(() => {
                        onNext(values, setSubmitting)
                    }, 1000)
                }}
            >
                {({ values, touched, errors, setFieldValue, isSubmitting }) => {
                    const formProps = { values, touched, errors }
                    return (
                        <Form>
                            <FormContainer>
                               
                                <AddressForm
                                    countryName="country"
                                    addressLine1Name="addressLine1"
                                    addressLine2Name="addressLine2"
                                    cityName="city"
                                    stateName="state"
                                    zipCodeName="zipCode"
                                    {...formProps}
                                />
                              
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default SolutionAddressInfo
