import { Select, FormItem, FormContainer, Input } from 'components/ui'
import { RichTextEditor } from 'components/shared'
import { Field, Formik, Form } from 'formik'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { getPublicRoles } from '../store/dataSlice'

const masterPermissionValidationSchema = Yup.object().shape({
    publicRole: Yup.string().required('Please enter master role').nullable(),
    userRole: Yup.string().required('Please enter user role title').nullable(),
})

const PatnerMasterPermissions = ({ onChange, refId, ...props }) => {
    const dispatch = useDispatch()
    const {
        enterAccount,
        password,
        rememberMe,
        usernameOrEmail,
        acc_mno_parent_unq_id,
    } = useSelector((state) => state.auth.user)
   
    const publicRolesList = useSelector(
        (state) => state.partnerList?.data?.publicRolesList
    )

    useEffect(() => {
        dispatch(getPublicRoles({ acc_mno_parent_unq_id }))
    }, [dispatch, enterAccount])

    console.log('PatnerMasterPermissionsvalues',props)
    return (
        <>
            <h3 className="mx-4 mb-4 mt-2">MASTER PERMISSION INFO</h3>

            <Formik
                innerRef={refId}
                initialValues={props.partnerState?.masterInfoPermission}
                validationSchema={masterPermissionValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    let updatedPayload = { ...props.partnerState, ...values }

                    props.setPartnerState(updatedPayload)
                    let dataToStore = props.partnerIntialValues
                    dataToStore.masterInfoPermission = values
                    props.setPartnerIntialValues(dataToStore)

                    console.log(updatedPayload, 'update')
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                     console.log('PatnerMasterPermissionsvalues',values)
                    return (
                        <Form>
                            <FormContainer>
                                <div className="md:grid gap-4 mx-4">
                                    <div className="md:grid grid-cols-2 gap-4">
                                        <FormItem
                                            label={
                                                <p>
                                                    Master Role{' '}
                                                    <span
                                                        style={{ color: 'red' }}
                                                    >
                                                        {'*'}
                                                    </span>
                                                </p>
                                            }
                                            invalid={
                                                errors.publicRole &&
                                                touched.publicRole
                                            }
                                            errorMessage={errors.publicRole}
                                        >
                                            <Field name="publicRole">
                                                {({ field, form }) => (
                                                    <Select
                                                        placeholder="Select Master Role"
                                                        field={field}
                                                        form={form}
                                                        options={
                                                            publicRolesList
                                                        }
                                                        value={publicRolesList?.filter(
                                                            (label) =>
                                                                label?.value ===
                                                                values?.publicRole
                                                        )}
                                                        onChange={(
                                                            label,
                                                            field
                                                        ) =>
                                                            form.setFieldValue(
                                                                field?.name,
                                                                label?.value
                                                            )
                                                        }
                                                    />
                                                )}
                                            </Field>
                                        </FormItem>
                                        <FormItem
                                            label={
                                                <p>
                                                    User Role Title{' '}
                                                    <span
                                                        style={{ color: 'red' }}
                                                    >
                                                        {'*'}
                                                    </span>
                                                </p>
                                            }
                                            invalid={
                                                errors.userRole &&
                                                touched.userRole
                                            }
                                            errorMessage={errors.userRole}
                                        >
                                            <Field
                                                // value={values?.}?
                                                type="text"
                                                autoComplete="off"
                                                name="userRole"
                                                placeholder="Enter Role"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </div>
                                    <FormItem label="Description">
                                        <Field name="description">
                                            {({ field, form }) => (
                                                <RichTextEditor
                                                    style={{ width: '60%' }}
                                                    value={field?.value}
                                                    onChange={(val) =>
                                                        form.setFieldValue(
                                                            field?.name,
                                                            val
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
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

export default PatnerMasterPermissions
