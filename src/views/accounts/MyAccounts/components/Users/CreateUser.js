import { AdaptableCard } from 'components/shared'
import {
    Button,
    Checkbox,
    Upload,
    FormContainer,
    FormItem,
    Input,
    Select,
    Alert,
    Dialog,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { timeZone } from '../../../../../mock/data/timezones'
import * as Yup from 'yup'
import { apiCreateUser, apiUpdateUser, apiUploadFiles } from 'services/MyAccountService'
import { EditandCopyUsers } from 'utils/campareandCopy'
import { useDispatch, useSelector } from 'react-redux'
import { getUserRoles } from '../../store/dataSlice'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { GetErrorMsg } from 'views/Servicefile'
import { OpenNotification } from 'views/Servicefile'
import toast from 'components/ui'
import CloseButton from 'components/ui/CloseButton'
import appConfig from 'configs/app.config'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'

const saveFilesInUser = 1
const CreateUser = () => {
    const onCheck = (value, field, form) => {
        form.setFieldValue(field.name, value)
    }
    const navigate = useNavigate()

    const productCategoryOptions = [
        { label: 'Airtel Inc.', value: 1 },
        { label: 'Airtel Inc.', value: 2 },
        { label: 'Airtel India', value: 3 },
    ]

    const dispatch = useDispatch()
    const language = [
        { label: 'English', value: 1 },
        { label: 'Spanish', value: 2 },
        { label: 'Arabic', value: 3 },
        { label: 'Portugese', value: 4 },
    ]
    const orientationtype = [
        { label: 'Right to Left', value: 'RTL' },
        { label: 'Left to Right', value: 'LTR' },
    ]

    const timeZoneList = timeZone?.map((timezone) => ({
        value: timezone.id,
        label: timezone.value,
    }))

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().trim().required('Please Enter Valid First Name ').nullable(),
        lastName: Yup.string().trim().required('Please Enter Valid Last Name ').nullable(),
        email: Yup.string().trim().min(5, "Email id must be at least 5 characters").max(50).email('Please enter valid email id').required('Please enter email id').nullable(),
        phone: Yup.string().trim().min(2, "Number must be atleast 2 characters").max(20, "Max 20 characters are allowed")
            .required("Please Enter Phone Valid Number").nullable(),
        role: Yup.string().trim().required('Please Select Valid User Role ').nullable(),
        country: Yup.string().required('Please enter your country').nullable(),
        addL1: Yup.string().required('Please enter your address').nullable(),
        city: Yup.string().required('Please enter your city').nullable(),
        state: Yup.string().required('Please enter your state').nullable(),
    })

    const { enterAccount, acc_user_id, rememberMe, usernameOrEmail } = useSelector(
        (state) => state.auth.user
    )
    const userRoles = useSelector(
        (state) => state.myaccountList?.data?.userRoles
    )

    let intialValues = {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phone: '',
        role: '',
        addL1: '',
        addL2: '',
        city: '',
        state: '',
        country: '',
        zipcode: '',
        status: 'ACTIVE',
        language: '',
        orientation: '',
        timeZone: '',
        profileImg: '',
        dgl_acc_mno_unq_id: enterAccount,
    }
    const [userIntialValues, setUserIntialValues] = useState(intialValues)
    const [userState, setuserState] = useState({})
    const [message, setMessage] = useTimeOutMessage()
    const formikRef = useRef()
    const location = useLocation()
    const mode = location.state?.mode ? location.state.mode : 'ADD'
    const rowForEdit = location.state?.data

    const submitApi = async (e) => {
        formikRef.current.handleSubmit()

        let validationErrors = false;
        await formikRef.current?.validateForm().then(errors => {
            if (errors && Object.keys(errors).length > 0) {
                formikRef.current.setTouched(errors, true);
              validationErrors = true;
            }
          });
        if(!validationErrors){
        if (mode === 'ADD' && formikRef.current.submitForm()) {
            let data = formikRef.current.values
            let createPayload = {
                first_name: data.firstName.trim(),
                last_name: data.lastName.trim(),
                email: data.email.trim(),
                phone: data.phone.trim(),
                dgl_roles_id: data.role,
                add_line1: data.addL1.trim(),
                add_line2: data.addL2.trim(),
                city: data.city.trim(),
                state: data.state.trim(),
                country: data.country.trim(),
                zipcode: data.zipcode.trim(),
                status: data.status,
                language: data.language,
                orientation: data.orientation,
                time_zone: data.timeZone,
                profile_img: data.profileImg,
                dgl_acc_mno_unq_id: data.dgl_acc_mno_unq_id,
            }

            const resp = await apiCreateUser(createPayload)
            if (resp.status === 'success') {
                OpenNotification('success', 'Created successfully ')
                navigate('/account-menu-item-view-1/users')
                // setTimeout(() => {
                //     OpenNotification('success', 'Created successfully ')
                // }, 2000)
            }

            if (resp.status === 'failed') {
                // setMessage(GetErrorMsg(resp))
                let data = GetErrorMsg(resp)
                let mess = Array.isArray(data)? data.join(", "): data
                OpenNotification('danger',mess)
            }
        } else if (mode === 'EDIT' && formikRef.current.submitForm()) {
            let data = formikRef.current.values

            let updatePayload = {
                id: rowForEdit.id,
                acc_user_unq_id: rowForEdit.acc_user_unq_id,
                first_name: data.firstName.trim(),
                last_name: data.lastName.trim(),
                email: data.email.trim(),
                phone: data.phone.trim(),
                profile_img: data.profileImg,
                add_line1: data.addL1.trim(),
                add_line2: data.addL2.trim(),
                city: data.city.trim(),
                state: data.state.trim(),
                country: data.country.trim(),
                zipcode: data.zipcode.trim(),
                status: data.status,
                dgl_acc_mno_id: data.dgl_acc_mno_id,
                dgl_roles_id: rowForEdit.dgl_roles_id,
                acc_password: rowForEdit.acc_password,
                language: data.language,
                orientation: data.orientation,
                time_zone: data.timeZone,
                dgl_acc_mno_unq_id: rowForEdit.dgl_acc_mno_unq_id,
            }

            const resp = await apiUpdateUser(updatePayload)
            if (resp.status === 'success') {
                OpenNotification('success', 'Updated successfully')
                // OpenNotification('success', 'Another one')
                navigate('/account-menu-item-view-1/users')
            }
            if (resp.status === 'failed') {
                // setMessage(GetErrorMsg(resp))
                let data = GetErrorMsg(resp)
                let mess = Array.isArray(data)? data.join(", "): data
                OpenNotification('danger',mess)
            }
        }
        }
    }
    useEffect(() => {
        dispatch(getUserRoles({ enterAccount }))
    }, [dispatch, enterAccount])

    useEffect(() => {
        if (rowForEdit) {
            const userEditIntialValues = EditandCopyUsers(
                userIntialValues,
                rowForEdit
            )

            setuserState(userEditIntialValues)
        }
    }, [userIntialValues, rowForEdit])

    const beforeUpload = async (newFiles, files) => {
        const file = newFiles[0];
        const allowedTypes = ['image/jpeg', 'image/png'];

        if (!allowedTypes.includes(file.type)) {
            OpenNotification('warning', 'JPG/PNG files are allowed only!')
          return false;
        } 
        try { 
            const ress = await apiUploadFiles(newFiles[0], acc_user_id, saveFilesInUser)
            return ress
        } catch (error) {
          console.error('Error during file upload:', error);
          return false;
        }
    }
    const [showContent, setShowContent] = useState(false)
    const [content, setContent] = useState(null)
    const onClickView = (fileInfo) => {
        setShowContent(true)
        setContent(fileInfo)
    }

    
    let breadCrumbList = [{
        name: 'Accounts',
        // link:"/account-menu-item-view-1/accounts"
    }, {
        name: 'My Account',
        link: "/account-menu-item-view-1/users"
    }, {
        name: `Create User`,
    }]

    if (mode === "EDIT") {
        breadCrumbList = [
            {
                name: 'Accounts',
                // link:"/account-menu-item-view-1/accounts",
            },
            {
                name: 'My Account',
                link: "/account-menu-item-view-1/users",
            },
            {
                name: rowForEdit?.acc_user_unq_id,
                link: '/account-menu-item-view-1/users',
                state:rowForEdit
            },
            {
                name: "Edit User"
            },
        ]
    }

    return (
        <>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {message}
                </Alert>
            )}
            <div>
            <CustomBreadcrumbs list={breadCrumbList} />
                    <h3 className="mb-4 mt-2">
                        {mode === 'EDIT' ? 'Edit' : 'Create '} User
                    </h3>
                    
                        <Formik
                            innerRef={formikRef}
                            initialValues={userIntialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(true)
                            }}
                        >
                            {({
                                values,
                                touched,
                                errors,
                                isSubmitting,
                                setFieldValue,
                            }) => {
                                return (
                                    <Form>
                                        <div
                                            style={{ backgroundColor: '#F5F5F5' }}
                                            className="p-4"
                                        >
                                        <FormContainer>
                                        <AdaptableCard className="h-full" bodyClass="h-full">
                                            <div className=" mx-4 p-4">
                                                <h4>BASIC DETAILS</h4>
                                                <div className="md:grid grid-cols-4 gap-6 mt-5">
                                                    <FormItem
                                                        label={
                                                            <p>
                                                                First Name{' '}
                                                                <span
                                                                    style={{
                                                                        color: 'red',
                                                                    }}
                                                                >
                                                                    {'*'}
                                                                </span>
                                                            </p>
                                                        }
                                                        className=""
                                                        invalid={
                                                            errors.firstName &&
                                                            touched.firstName
                                                        }
                                                        errorMessage={
                                                            errors.firstName
                                                        }
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
                                                        className=""
                                                        label="Middle Name"
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="middleName"
                                                            placeholder="Enter Middle Name "
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                        label={
                                                            <p>
                                                                Last Name{' '}
                                                                <span
                                                                    style={{
                                                                        color: 'red',
                                                                    }}
                                                                >
                                                                    {'*'}
                                                                </span>
                                                            </p>
                                                        }
                                                        className=""
                                                        invalid={
                                                            errors.lastName &&
                                                            touched.lastName
                                                        }
                                                        errorMessage={
                                                            errors.lastName
                                                        }
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
                                                        label=
                                                        {
                                                            <p>
                                                                Email ID{' '}
                                                                <span
                                                                    style={{
                                                                        color: 'red',
                                                                    }}
                                                                >
                                                                    {'*'}
                                                                </span>
                                                            </p>
                                                        }
                                                        className=""
                                                        invalid={
                                                            errors.email &&
                                                            touched.email
                                                        }
                                                        errorMessage={
                                                            errors.email
                                                        }
                                                    >
                                                        <Field disabled = {rowForEdit ? true :  false}
                                                            type="text"
                                                            autoComplete="off"
                                                            name="email"
                                                            placeholder="Enter Email ID"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                        label={<p>Phone Number <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                        invalid={errors.phone && touched.phone}
                                                        errorMessage={errors.phone}
                                                        className=''
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="phone"
                                                            placeholder="Enter Phone Number"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                        label=
                                                        {
                                                            <p>
                                                                User Role{' '}
                                                                <span
                                                                    style={{
                                                                        color: 'red',
                                                                    }}
                                                                >
                                                                    {'*'}
                                                                </span>
                                                            </p>
                                                        }
                                                        className=""
                                                        invalid={
                                                            errors.role &&
                                                            touched.role
                                                        }
                                                        errorMessage={
                                                            errors.role
                                                        }
                                                    >
                                                        <Field name="role">
                                                            {({
                                                                field,
                                                                form,
                                                            }) => (
                                                                <Select
                                                                    placeholder="Select Role"
                                                                    field={
                                                                        field
                                                                    }
                                                                    form={form}
                                                                    options={
                                                                        userRoles
                                                                    }
                                                                    value={userRoles?.filter(
                                                                        (
                                                                            role
                                                                        ) =>
                                                                            role.value ===
                                                                            values.role
                                                                    )}
                                                                    onChange={(
                                                                        role
                                                                    ) =>
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            role.value
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormItem>
                                                    <FormItem
                                                        label="Language"
                                                        className=""
                                                        invalid={
                                                            errors.language &&
                                                            touched.language
                                                        }
                                                        errorMessage={
                                                            errors.language
                                                        }
                                                    >
                                                        <Field name="language">
                                                            {({
                                                                field,
                                                                form,
                                                            }) => (
                                                                <Select
                                                                    placeholder="Select Language"
                                                                    field={
                                                                        field
                                                                    }
                                                                    form={form}
                                                                    options={
                                                                        language
                                                                    }
                                                                    value={language.filter(
                                                                        (
                                                                            language
                                                                        ) =>
                                                                            language.value ===
                                                                            values.language
                                                                    )}
                                                                    onChange={(
                                                                        language
                                                                    ) =>
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            language.value
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormItem>
                                                    <FormItem
                                                        label="Orientation"
                                                        className=""
                                                        invalid={
                                                            errors.orientation &&
                                                            touched.orientation
                                                        }
                                                        errorMessage={
                                                            errors.orientation
                                                        }
                                                    >
                                                        <Field name="orientation">
                                                            {({
                                                                field,
                                                                form,
                                                            }) => (
                                                                <Select
                                                                    placeholder="Select Orientation"
                                                                    field={
                                                                        field
                                                                    }
                                                                    form={form}
                                                                    options={
                                                                        orientationtype
                                                                    }
                                                                    value={orientationtype.filter(
                                                                        (
                                                                            orientation
                                                                        ) =>
                                                                            orientation.value ===
                                                                            values.orientation
                                                                    )}
                                                                    onChange={(
                                                                        orientation
                                                                    ) =>
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            orientation.value
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormItem>
                                                    <FormItem
                                                        label="Time Zone"
                                                        className=""
                                                        invalid={
                                                            errors.timeZone &&
                                                            touched.timeZone
                                                        }
                                                        errorMessage={
                                                            errors.timeZone
                                                        }
                                                    >
                                                        <Field name="timeZone">
                                                            {({
                                                                field,
                                                                form,
                                                            }) => (
                                                                <Select
                                                                    placeholder="Select Time Zone"
                                                                    field={
                                                                        field
                                                                    }
                                                                    form={form}
                                                                    options={
                                                                        timeZoneList
                                                                    }
                                                                    value={timeZoneList.filter(
                                                                        (
                                                                            timeZone
                                                                        ) =>
                                                                            timeZone.value ===
                                                                            values.timeZone
                                                                    )}
                                                                    onChange={(
                                                                        timeZone
                                                                    ) =>
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            timeZone.value
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormItem>
                                                    <FormItem label="Upoload Profile Image">
                                                        <Field name='profileImg'>
                                                        {({field,form}) => (
                                                        <div className="">
                                                            <AdaptableCard>
                                                                <div>
                                                                    <Upload beforeUpload={beforeUpload} draggable className='border-gray-200 w-[500] h-[0]' style={{ minHeight: "3rem"}}
                                                                        onChange={(updatedFiles, files, uploadRes, filesDetails) => {form.setFieldValue(field.name,uploadRes?.data?.fileUnqId)}}>
                                                                        <div className="my-10 text-center">
                                                                            <p className="font-semibold">
                                                                                <span className="text-gray-400 dark:text-white">{values.profileImg ? "File uploaded, " : 'No Files Uploaded, '}</span>
                                                                                <span className="text-blue-700">Browse</span>
                                                                            </p>
                                                                        </div>
                                                                    </Upload>
                                                                </div>
                                                            </AdaptableCard>
                                                            <p className='text-dark-100 dark:text-gray-3 00' style={{marginTop : "-10px",fontSize:"10px",color:""}}>Note: accepts only jpg/png type files</p>
                                                            {values.profileImg &&
                                                            <div className="upload-file cursor-pointer h-12 w-120" >
                                                                <div className="upload-file-info" onClick={() => onClickView(values.profileImg)}>
                                                                    <h6 className="upload-file-name">{values.profileImg.substring(0, 15)}</h6>
                                                                </div>
                                                                <CloseButton className="upload-file-remove " onClick={() => {form.setFieldValue(field.name, '');}}/>
                                                            </div>}
                                                        </div>
                                                        )}
                                                        </Field>
                                                    </FormItem>
                                                </div>
                                            </div>
                                            </AdaptableCard>
                                            <AdaptableCard className="h-full" bodyClass="h-full" divider>
                                            <div className="card mx-4 p-4">                                     
                                                <div>
                                                    <h3>ADDRESS</h3>
                                                    <div className=" md:grid grid-cols-2 gap-6 mt-5">
                                                        <FormItem
                                                            label={
                                                                <p>
                                                                    Address Line
                                                                    1{' '}
                                                                    <span
                                                                        style={{
                                                                            color: 'red',
                                                                        }}
                                                                    >
                                                                        {'*'}
                                                                    </span>
                                                                </p>
                                                            }
                                                            invalid={
                                                                errors.addL1 &&
                                                                touched.addL1
                                                            }
                                                            errorMessage={
                                                                errors.addL1
                                                            }
                                                            className=""
                                                        >
                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                name="addL1"
                                                                placeholder="Enter Address"
                                                                component={
                                                                    Input
                                                                }
                                                            />
                                                        </FormItem>
                                                        <FormItem
                                                            label="Address Line 2"
                                                            className=""
                                                        >
                                                            <Field
                                                                type="text"
                                                                autoComplete="off"
                                                                name="addL2"
                                                                placeholder="Enter Address"
                                                                component={
                                                                    Input
                                                                }
                                                            />
                                                        </FormItem>
                                                    </div>
                                                    </div>
                                                    <div className="card md:grid grid-cols-4 gap-6">
                                                    <FormItem
                                                        className=""
                                                        label={
                                                            <p>
                                                                City{' '}
                                                                <span
                                                                    style={{
                                                                        color: 'red',
                                                                    }}
                                                                >
                                                                    {'*'}
                                                                </span>
                                                            </p>
                                                        }
                                                    invalid={
                                                        errors.city &&
                                                        touched.city
                                                    }
                                                    errorMessage={
                                                        errors.city
                                                    }
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="city"
                                                            placeholder="Enter City"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                        label={
                                                            <p>
                                                                State
                                                                <span
                                                                    style={{
                                                                        color: 'red',
                                                                    }}
                                                                >
                                                                    {'*'}
                                                                </span>
                                                            </p>
                                                        }
                                                        invalid={
                                                            errors.state &&
                                                            touched.state
                                                        }
                                                        errorMessage={
                                                            errors.state
                                                        }
                                                        className=""
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="state"
                                                            placeholder="Enter State"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                        label={
                                                            <p>
                                                                Country
                                                                <span
                                                                    style={{
                                                                        color: 'red',
                                                                    }}
                                                                >
                                                                    {'*'}
                                                                </span>
                                                            </p>
                                                        }
                                                        invalid={
                                                            errors.country &&
                                                            touched.country
                                                        }
                                                        errorMessage={
                                                            errors.country
                                                        }
                                                        className=""
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="country"
                                                            placeholder="Enter Country"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                        label="Zip Code"
                                                        className=""
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="zipcode"
                                                            placeholder="Enter Zip Code"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                </div>
                                            </div>
                                        </AdaptableCard>
                                        </FormContainer>
                                        </div>
                                        <div style={{display: 'flex',justifyContent: 'flex-end',}} className='mt-4'>
                                            <Link type='button' className="block lg:inline-block md:mb-0 mb-4" to="/account-menu-item-view-1/users" >
                                                <Button className="mx-2" onClick={'onPrevious'} variant="solid" style={{ backgroundColor: '#4D4D4D' }}>
                                                    Cancel
                                                </Button>
                                            </Link>
                                            <Link className="block lg:inline-block md:mb-0 mb-4">
                                                <Button type='submit' onClick={submitApi} variant="solid" style={{ color: 'white',fontStyle: 'normal',fontSize: '18px'}}>
                                                    {'Submit for Approval'}
                                                </Button>
                                            </Link>
                                        </div>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </div>
                    <Dialog isOpen={showContent}
                            onClose={() => setShowContent(false)}>
                            <div className='p-5'>
                                <img src={`${appConfig.apiPrefix}/media/uniqid/${content}`} alt="Content" />
                                <Button onClick={() => window.open(`${appConfig.apiPrefix}/media/uniqid/${content}`, '_blank')} className='mt-2' variant='solid'>Download</Button>
                            </div>

                    </Dialog>
        </>
    )
}

export default CreateUser
