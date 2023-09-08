import { RichTextEditor } from 'components/shared'
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


const WareHouseContactInfo = (props) => {


    return (
        <>
            <Formik
                initialValues={{}}
               
                validationSchema={{}}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)

                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className="md:grid grid-cols-2 gap-4 mx-4">
                                    <FormItem
                                        label="Contact Person"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="firstName"
                                            placeholder="Enter Contact Person"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Email ID"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="emialId"
                                            placeholder="Enter Email ID"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Phone Number"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="phoneNumber"
                                            placeholder="Enter Phone Number"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Alternate Phone Number"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="altPhoneNumber"
                                            placeholder="Enter Phone Number"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Warehouse Total Capacity(in sqft)"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="totalCapacity"
                                            placeholder="Enter Capacity"
                                            component={Input}
                                        />
                                    </FormItem>   
                                    <FormItem
                                        label="Allocated Capacity(in sqft)"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="allocatedCapacity"
                                            placeholder="Enter Capacity"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div>
                                <FormItem
                                label='Description'
                                className='mx-4 w-100'
                                >
                                <RichTextEditor
                                ></RichTextEditor> 
                              </FormItem>
                 </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>

        </>
    )
}

export default WareHouseContactInfo