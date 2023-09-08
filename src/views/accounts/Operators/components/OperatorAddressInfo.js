import React from 'react'
import {
    Input,
    FormItem,
    FormContainer,
} from 'components/ui'
import { Field } from 'formik'

const OperatorAddressInfo = ({ onChange,  onNextChange, onBackChange, currentStepStatus, ...props }) => {
    const { errors, touched, values } = props
    return (
        <>
            <h3 className="mx-4 mb-4 mt-2">ADDRESS</h3>
            <FormContainer>
                <div className="md:grid grid-cols-2 gap-4 mx-4">
                    <FormItem
                        label={<p>Address Line 1 <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={errors.accAddL1 && touched.accAddL1}
                        errorMessage={errors.accAddL1}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name='address.accAddL1'
                            placeholder="Enter Address "
                            component={Input}
                        />
                    </FormItem>

                    <FormItem
                        label="Address Line 2"
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name={'address.accAddL2'}
                            placeholder="Enter Address Line 2"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="md:grid grid-cols-4 gap-4 mx-4">
                    <FormItem
                        label={<p>City <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={errors.accCity && touched.accCity}
                        errorMessage={errors.accCity}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name={'address.accCity'}
                            placeholder="Enter City"
                            component={Input}
                        />
                    </FormItem>
                    <FormItem
                        label={<p>State <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={errors.accState && touched.accState}
                        errorMessage={errors.accState}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name={'address.accState'}
                            placeholder="Enter State"
                            component={Input}
                        />
                    </FormItem>
                    <FormItem
                        label={<p>Country <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={errors.accCountry && touched.accCountry}
                        errorMessage={errors.accCountry}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name={'address.accCountry'}
                            placeholder="Enter Country"
                            component={Input}
                        />
                    </FormItem>
                    <FormItem
                        label="Zip Code"
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name={'address.accZipcode'}
                            placeholder="Enter Zip Code"
                            component={Input}
                        />
                    </FormItem>
                </div>
            </FormContainer>
        </>
    )
}

export default OperatorAddressInfo
