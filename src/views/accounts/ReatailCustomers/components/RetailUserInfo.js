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
import * as Yup from "yup";

export const statusOptions = [
    { label: 'Married', value: 'M' },
    { label: 'Widowed', value: 'W' },
    { label: 'Separated', value: 'S' },
    { label: 'Divorced', value: 'D' },
    { label: 'Single ', value: 'S' },
]
const genderOptions = [
    { label: 'Super Admin', value: 'M' },
    { label: 'User.', value: 'F' },
    { label: 'Admin', value: 'O' },
]

const retailUserInitValues = {
    roleId: '',
    firstName: '',
    lastName: '',
    middleName:'',
    emailId: '',
    phoneNumber: '',
    ordemailId: ''
}


const retailValidationSchema = Yup.object().shape({

    //roleId: Yup.string().required('Please Enter RoleId'),
    firstName: Yup.string().required('Please enter fisrt name').nullable(),
    lastName: Yup.string().required('Please enter last name').nullable(),
    emailId: Yup.string().email('Please enter valid email id').required('Please enter email id').nullable(),
    phoneNumber: Yup.string().min(5,"Number must be atleast 5 characters").max(20,"Max 20 characters are allowed")
    .required("Please enter phone number").nullable(),

    ordemailId: Yup.string().email('Please enter valid email id').required('Please enter email id').nullable()


})
const RetailMasterAccountInfo = ({ onChange, refId, ...props }) => {
    // console.log(props.retailIntialValues,"retailUserInitValues")
    return (
        <>

            <h3 className="mx-2 mb-4 mt-2">MASTER USER</h3>
             <Formik
                innerRef={refId}
                initialValues={props.retailIntialValues.retailUserInitValues}
                validationSchema={retailValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    let updatedPayload = { ...props.retailState, retailUserInitValues: values }
                    props.setRetailState(updatedPayload)
                    let dataToStore = props.retailIntialValues
                    dataToStore.retailUserInitValues = values
                    props.setRetailIntialValues(dataToStore)
                    props.setStep(props.step + 1)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                               
                                <div className="md:grid grid-cols-4 gap-4 mx-4">
                                    <FormItem
                                        label={<p>First Name<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={
                                            errors.firstName && touched.firstName
                                        }
                                        errorMessage={errors.firstName}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="firstName"
                                            placeholder="Enter First Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label="middleName"
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="middleName"
                                            placeholder="Enter Middle  Name"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label={<p>Last Name<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={
                                            errors.lastName && touched.lastName
                                        }
                                        errorMessage={errors.lastName}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="lastName"
                                            placeholder="Enter Last  Name"
                                            component={Input}
                                        />
                                    </FormItem>


                                    <FormItem
                                        label={<p>Email ID<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={
                                            errors.emailId && touched.emailId
                                        }
                                        errorMessage={errors.emailId}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="emailId"
                                            placeholder="Enter Email ID"
                                            component={Input}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label={<p>Order Approver Email ID<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={
                                            errors.ordemailId && touched.ordemailId
                                        }
                                        errorMessage={errors.ordemailId}
                                    >

                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="ordemailId"
                                            placeholder="Enter Order Approver Email ID"
                                            component={Input}
                                        />
                                    </FormItem>


                                    <FormItem
                                        label={<p>Phone Number<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={
                                            errors.phoneNumber && touched.phoneNumber
                                        }
                                        errorMessage={errors.phoneNumber}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="phoneNumber"
                                            placeholder="Enter Phone Number"
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

export default RetailMasterAccountInfo
