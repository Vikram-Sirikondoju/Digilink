import React, { useEffect, useRef, useState } from 'react'
// import { useEffect, useRef, useState } from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem, FormContainer, Select, Button, Alert } from 'components/ui'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Link, useLocation, useNavigate, } from 'react-router-dom'
import {
    Checkbox
} from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import { getUserRoles } from '../store/dataSlice'
import { apiCreatePassPolicy, apiUpdatePassPolicy } from 'services/PasswordPolicy'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile'
import { EditValuesToFieldsPassPolicy } from 'utils/campareandCopy'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'

const initialValues = {
    id: '',
    policyName: "",
    roleId: '',
    description: "",
    passwordExpDays: '',
    minLength: '',
    maxLength: '',
    allowUpper: false,
    allowLower: false,
    allowNum: false,
    allowSpel: false,
    unSuccAttmts: '',
    enforcedPassHist: ''
}

const validationSchema = Yup.object().shape({
    roleId: Yup.string().required("Please select user role").nullable(),
    policyName: Yup.string().required("Please enter policy title").nullable(),
    // description: Yup.string().required("Please enter description").nullable(),
    passwordExpDays: Yup.number().typeError("That doesn't look like number").required('Please enter password expiration'),
    minLength: Yup.number().typeError("That doesn't look like number").required("Please enter min. length of password").nullable(),
    maxLength: Yup.number().typeError("That doesn't look like number").required("Please enter max. length of password").nullable(),
    unSuccAttmts: Yup.number().typeError("That doesn't look like number").required("Please enter no. of unsuccessfull attempts").nullable(),
    //enforcedPassHist : Yup.string().required("Please enter Enforce password history").nullable()
})

const CharToAllowArr = [
    { label: "Numbers", value: "allowNum" },
    { label: "Upper Case Letters", value: "allowUpper" },
    { label: "Lower Case Letters", value: "allowLower" },
    { label: "Special Characters", value: "allowSpel" }
]

function AddPasswordPolicy() {

    const dispatch = useDispatch()
    const location = useLocation();
    const navigate = useNavigate()

    const { enterAccount, password, rememberMe, usernameOrEmail
    } = useSelector(
        (state) => state.auth.user
    )
    const mode = location.state?.mode ? location.state.mode : "ADD";
    const rowForEdit = location.state?.data;

    const userRoles = useSelector((state) => state.passwordPolicy?.data?.usersList)

    const [initState, setInitState] = useState(rowForEdit ? EditValuesToFieldsPassPolicy(initialValues, rowForEdit) : initialValues)
    const [message, setMessage] = useTimeOutMessage()

    const submitApi = async (values) => {
        let payload = {
            //"id": values.id,
            "policy_name": values.policyName,
            "role_id": values.roleId,
            "password_exp_days": values.passwordExpDays,
            "pre_num_check": "",
            "min_length": values.minLength,
            "max_length": values.maxLength,
            "allow_upper": values.allowUpper,
            "allow_lower": values.allowLower,
            "allow_num": values.allowNum,
            "allow_spel": values.allowSpel,
            "un_succ_attmts": values.unSuccAttmts,
            "status": "ACTIVE"
        }
        if (mode === "ADD") {
            const resp = await apiCreatePassPolicy(payload)
            if (resp.status === 'success') {
                OpenNotification("success", 'Created  successfully')
                navigate('/settings-menu-password-policy')
            } else if (resp.status === 'failed') {
                setMessage(GetErrorMsg(resp));
            }
        } else if (mode === "EDIT") {
            payload.id = rowForEdit.id
            const resp = await apiUpdatePassPolicy(payload)
            if (resp.status === 'success') {
                OpenNotification("success", 'Updated  successfully')
                navigate('/settings-menu-password-policy')
            } else if (resp.status === 'failed') {
                setMessage(GetErrorMsg(resp));
            }
        }
    }

    useEffect(() => {
        dispatch(getUserRoles({ enterAccount }))
    }, [dispatch, enterAccount])

    let breadCrumbList = [{
        name: 'Settings',
         link: "/home"
    }, {
        name: 'Password Policy',
        link: "/settings-menu-password-policy"
    }, {
        name: `Create Password Policy `,
    }]

    if (mode === "EDIT") {
        breadCrumbList = [
            {
                name: 'Settings',
                 link: '/home',
            },
            {
                name: 'Password Policy',
                link: '/settings-menu-password-policy',
            },

            {
                name: "Edit Password Policy "
            },
        ]
    }


    return (
        <>
            {/* <div>Settings/Password Policy/ {mode === "EDIT"? "Edit": "Add"} Password Policy </div> */}
            <CustomBreadcrumbs list={breadCrumbList} />
            <div className='mt-5'>
                <h3>{mode === "EDIT" ? "Edit" : "Add"} Password Policy</h3>
                {message &&
                    <Alert className="mb-4" type="danger" showIcon>
                        {message}
                    </Alert>}
                    <Formik
                        initialValues={initState}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(true)
                            submitApi(values)
                        }}
                    >
                        {({ values, touched, errors, isSubmitting }) => {
                            return (
                                <Form>
                                    <div style={{ backgroundColor: "#F5F5F5", padding: "15px", marginTop: "10px" }}>
                                    <AdaptableCard className="h-full" bodyClass="h-full" divider>
                                        <FormContainer>
                                            <div className="md:grid gap-4 mx-4 mt-3 pl-2">
                                                <div className='md:grid grid-cols-2 w-3/4'>
                                                    <FormItem
                                                        label={<p>User Role <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                        className=' mr-6'
                                                        invalid={errors.roleId && touched.roleId}
                                                        errorMessage={errors.roleId}
                                                    >
                                                        <Field name="roleId">
                                                            {({ field, form }) => (
                                                                <Select
                                                                    placeholder="Select User Role"
                                                                    field={field}
                                                                    form={form}
                                                                    options={userRoles}
                                                                    value={userRoles?.filter(v => values.roleId === v.value)}
                                                                    onChange={(v) => form.setFieldValue(field.name, v.value)}
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormItem>
                                                    <FormItem
                                                        label={<p> Policy Title <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                        className=' ml-6'
                                                        invalid={errors.policyName && touched.policyName}
                                                        errorMessage={errors.policyName}
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="policyName"
                                                            placeholder="Enter Password Policy"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                </div>
                                                <FormItem
                                                    label={<p>Description</p>}
                                                    className=''
                                                    invalid={errors.description && touched.description}
                                                    errorMessage={errors.description}
                                                >
                                                    <Field name="description"  >
                                                        {({ field, form }) => (
                                                            <RichTextEditor
                                                                value={field.value}
                                                                placeholder="Enter Text"
                                                                className="w-3/4"
                                                                onChange={(val) => form.setFieldValue(field.name, val)}
                                                            />
                                                        )}
                                                    </Field>
                                                </FormItem>
                                                <div className='md:grid grid-cols-2'>
                                                    <FormItem
                                                        label={<p> Password Expires in(days) <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                        className=''
                                                        invalid={errors.passwordExpDays && touched.passwordExpDays}
                                                        errorMessage={errors.passwordExpDays}
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="passwordExpDays"
                                                            className="w-96"
                                                            placeholder="Enter No.of days"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                </div>
                                                <div className='md:grid grid-cols-2 w-3/4'>
                                                    <FormItem
                                                        label={<p>Minimum Length <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                        className=' mr-6'
                                                        invalid={errors.minLength && touched.minLength}
                                                        errorMessage={errors.minLength}
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="minLength"
                                                            placeholder="Enter minimum no.of characters"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                        label={<p> Maximum Length <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                        className=' ml-6'
                                                        invalid={errors.maxLength && touched.maxLength}
                                                        errorMessage={errors.maxLength}
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="maxLength"
                                                            placeholder="Enter maximum no.of characters"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                </div>
                                                <div className="pt-2 pb-4">
                                                    <label className=" font-bold">Characters to be allowed in password</label>
                                                    <div className='flex gap-6 mt-4'>
                                                        {CharToAllowArr.map((item, index) => {
                                                            return (
                                                                <div className='flex'>
                                                                    <Field
                                                                        type="checkbox"
                                                                        autoComplete="off"
                                                                        name={`${item.value}`}
                                                                        component={Checkbox}
                                                                    />
                                                                    <div><label>{item.label}</label></div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                                <div className='md:grid grid-cols-2 w-3/4'>
                                                    <FormItem
                                                        label={<p>No.of unsuccessfull attempts <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                        className=' mr-6'
                                                        invalid={errors.unSuccAttmts && touched.unSuccAttmts}
                                                        errorMessage={errors.unSuccAttmts}
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="unSuccAttmts"
                                                            placeholder="Enter No.of unsuccessfull attempts"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                        label={<p> Enforce Password History</p>}
                                                        className=' ml-6'
                                                        invalid={errors.enforcedPassHist && touched.enforcedPassHist}
                                                        errorMessage={errors.enforcedPassHist}
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="enforcedPassHist"
                                                            placeholder="Enter maximum no.of of unique password needed"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                </div>
                                            </div>
                                        </FormContainer>
                                    </AdaptableCard>
                                    </div> 
                                    <div className="text-right pt-4 flex justify-end" >
                                        <Link
                                            className="block lg:inline-block md:mb-0 mb-4"
                                            to="/settings-menu-password-policy">
                                            <Button type="button"
                                                className="mx-2"
                                                onClick={"onPrevious"}
                                                variant="solid"
                                                style={{ backgroundColor: "#4D4D4D" }}
                                            >
                                                Cancel
                                            </Button>
                                        </Link>
                                        <Button type="submit" variant='solid' style={{ fontStyle: 'normal', fontSize: '18px', }} >
                                            Submit for Approval
                                        </Button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
            </div>
        </>
    )
}

export default AddPasswordPolicy