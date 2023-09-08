import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    toast,
    Notification,
    Alert,
    Upload,
    Dialog
} from 'components/ui'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
const PickupInputs = (props) => {

    const {values,
        touched,
        errors,
        isSubmitting,
        handleSubmit,
        submitForm } = props;
    return (

        <Form>
            <FormContainer>
                <div className="md:grid grid-cols-2 gap-4 mx-4">
                    <FormItem
                        label={<p>Address Line 1 <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={
                            errors.pickup_add_line1 &&
                            touched.pickup_add_line1
                        }
                        errorMessage={
                            errors.pickup_add_line1
                        }
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="pickup_add_line1"
                            placeholder="Enter Address"
                            component={Input}
                            value={values.pickup_add_line1}
                        />
                    </FormItem>
                    <FormItem
                        label={<p>Address Line 2 <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={
                            errors.pickup_add_line2 &&
                            touched.pickup_add_line2
                        }
                        errorMessage={
                            errors.pickup_add_line2
                        }
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="pickup_add_line2"
                            placeholder="Enter Address"
                            component={Input}
                            value={values.pickup_add_line2}
                        />
                    </FormItem>
                </div>
            </FormContainer>
            <FormContainer>
                <div className="md:grid grid-cols-2 gap-4 mx-4">
                    <FormItem
                        
                        label={<p>Country <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={
                            errors.pickup_add_country &&
                            touched.pickup_add_country
                        }
                        errorMessage={
                            errors.pickup_add_country
                        }
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="pickup_add_country"
                            placeholder="Enter Country"
                            component={Input}
                            value={values.pickup_add_country}
                        />
                    </FormItem>
                    <FormItem
                        
                        label={<p>State <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={
                            errors.pickup_add_state &&
                            touched.pickup_add_state
                        }
                        errorMessage={
                            errors.pickup_add_state
                        }
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="pickup_add_state"
                            placeholder="Enter State"
                            component={Input}
                            value={values.pickup_add_state}
                        />
                    </FormItem>
                </div>
            </FormContainer>
            <FormContainer>
                <div className="md:grid grid-cols-2 gap-4 mx-4">
                    <FormItem
                        
                        label={<p>City <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={
                            errors.pickup_add_city &&
                            touched.pickup_add_city
                        }
                        errorMessage={
                            errors.pickup_add_city
                        }
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="pickup_add_city"
                            placeholder="Enter City"
                            component={Input}
                            value={values.pickup_add_city}
                        />
                    </FormItem>
                    <FormItem
                        // label="Zipcode"
                        label={<p>Zipcode <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={
                            errors.pickup_add_zipcode &&
                            touched.pickup_add_zipcode
                        }
                        errorMessage={
                            errors.pickup_add_zipcode
                        }
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="pickup_add_zipcode"
                            placeholder="Enter Zipcode"
                            component={Input}
                            value={values.pickup_add_zipcode}
                        />
                    </FormItem>
                </div>
            </FormContainer>
            <FormContainer>
                <div className="md:grid grid-cols-2 gap-4 mx-4">
                    <FormItem
                        
                        label={<p>Longitude <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={
                            errors.pickup_add_longitude &&
                            touched.pickup_add_longitude
                        }
                        errorMessage={
                            errors.pickup_add_longitude
                        }
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="pickup_add_longitude"
                            placeholder="Enter Longitude"
                            component={Input}
                            value={values.pickup_add_longitude}
                        />
                    </FormItem>
                    <FormItem
                        // label="Latitude"
                        label={<p>Latitude <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={
                            errors.pickup_add_latitude &&
                            touched.pickup_add_latitude
                        }
                        errorMessage={
                            errors.pickup_add_latitude
                        }
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="pickup_add_latitude"
                            placeholder="Enter Latitude"
                            component={Input}
                            value={values.pickup_add_latitude}
                        />
                    </FormItem>
                </div>
            </FormContainer>
            <FormContainer>
                <div className="md:grid grid-cols-2 gap-4 mx-4">
                    <FormItem
                        
                        label={<p>Other Info <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={
                            errors.pickup_add_other_info &&
                            touched.pickup_add_other_info
                        }
                        errorMessage={
                            errors.pickup_add_other_info
                        }
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="pickup_add_other_info"
                            placeholder="Enter Other Info"
                            component={Input}
                            value={values.pickup_add_other_info}
                        />
                    </FormItem>
                </div>
            </FormContainer>
        </Form>
    )
}

export default PickupInputs
