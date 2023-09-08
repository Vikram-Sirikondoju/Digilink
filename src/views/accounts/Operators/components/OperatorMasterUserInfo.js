import {
    Input,
    FormItem,
    FormContainer,
} from 'components/ui'
import { Field } from 'formik'

const OperatorMasterAccountInfo = ({ onChange, ...props }) => {
    const { errors, touched } = props

    return (
        <>
            <h3 className="mx-4 mb-4 pt-4">MASTER USER</h3>
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
                            name="userInfo.firstName"
                            placeholder="Enter First Name"
                            component={Input}
                        />
                    </FormItem>
                    <FormItem
                        label="Middle Name"
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="userInfo.middleName"
                            placeholder="Enter Middle Name "
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
                            name="userInfo.lastName"
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
                            type="email"
                            autoComplete="off"
                            name="userInfo.emailId"
                            placeholder="Enter Email ID"
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
                            name="userInfo.phoneNumber"
                            placeholder="Enter Phone Number"
                            component={Input}
                        />
                    </FormItem>
                </div>

            </FormContainer>

        </>
    )
}

export default OperatorMasterAccountInfo
