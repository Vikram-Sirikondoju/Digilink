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
import * as Yup from 'yup'

export const statusOptions = [
    { label: 'Married', value: 'M' },
    { label: 'Widowed', value: 'W' },
    { label: 'Separated', value: 'S' },
    { label: 'Divorced', value: 'D' },
    { label: 'Single ', value: 'S' },
]
const userRole = [
    { label: 'Super Admin', value: 0 },
    { label: 'User.', value: 1 },
    { label: 'Admin', value: 2 },
]


const userInitValues = {
    roleId: "",
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNumber: "",
}

const userValidationSchema = Yup.object().shape({
    //roleId: Yup.string().required('Please Select Role'),
    firstName: Yup.string().required('Please enter first name').min(2, "Name must be 2 characters").max(100).nullable(),
    lastName: Yup.string().required('Please enter last name').min(2, "Name must be 2 characters").max(100).nullable(),
    emailId: Yup.string().min(5,'Email must be at least 5 characters').max(50).email('Please enter valid email id').required('Please enter email Id').nullable(),
    phoneNumber: Yup.string().min(5,"Number must be atleast 5 characters").max(20,"Max 20 characters are allowed")
    .required("Please enter phone number").nullable(),
})

const ProviderUserInfo = ({ onChange, refId, ...props }) => {


    return (
        <>

            <h3 className="mx-4 mb-4 mt-2">MASTER USER</h3>

            <Formik
                innerRef={refId}
                initialValues={props.provideIntialValues.userInfo}
                validationSchema={userValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    
                    setSubmitting(true)
                    let updatedPayload = { ...props.providerState, userInfo: values }
                    let dataToStore = props.provideIntialValues
                    dataToStore.userInfo = values
                    props.setProviderIntialValues(dataToStore)
                    props.setProviderState(updatedPayload)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div  className="md:grid grid-cols-4 gap-4 mx-4">
                                    {/* <FormItem
                                        label="User Role"
                                        invalid={errors.roleId && touched.roleId}
                                        errorMessage={errors.roleId}
                                    >
                                        <Field name="roleId">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Super Admin"
                                                    field={field}
                                                    form={form}
                                                    options={userRole}
                                                    value={userRole.filter(
                                                        (userRole) =>
                                                            userRole.value ===
                                                            values.roleId
                                                    )}
                                                    onChange={(userRole) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            userRole.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem> */}
                                </div>
                            </FormContainer>
                            <FormContainer>
                                <div className="md:grid grid-cols-4 gap-4 mx-4">
                                    <FormItem
                                        label={<p>First Name <span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.firstName && touched.firstName}
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
                                        label='Middle Name'
                                       
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="middleName"
                                            placeholder="Enter Middle Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>Last Name <span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.lastName && touched.lastName}
                                        errorMessage={errors.lastName}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="lastName"
                                            placeholder="Enter Last Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>Email ID <span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.emailId && touched.emailId}
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
                                        label={<p>Phone Number <span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.phoneNumber && touched.phoneNumber}
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

export default ProviderUserInfo
