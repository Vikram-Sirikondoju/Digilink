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


const ItemContactInfo = (props) => {


    return (
        <>

            <h3 className="mx-4 mb-4 mt-2">CONTACT INFO</h3>

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
                                <div className="md:grid grid-cols-4 gap-4 mx-4">
                                    <FormItem
                                        label="Primary Contact"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="firstName"
                                            placeholder="Enter Primary Contact "
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Email ID"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="lastName"
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
                                            name="lastName"
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
                                            name="lastName"
                                            placeholder="Enter Phone Number"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="Fax Number"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="lastName"
                                            placeholder="Enter Fax Number"
                                            component={Input}
                                        />
                                    </FormItem>   
                                    <FormItem
                                        label="Website URL"

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="lastName"
                                            placeholder="Enter Website URL"
                                            component={Input}
                                        />
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

export default ItemContactInfo
