import React from 'react'
import RichTextEditor from 'components/shared/RichTextEditor'
import {
    Input,
    Button,
    FormItem,
    FormContainer,
    Select,
    Radio,
    Alert
} from 'components/ui'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { EditandCopyTemplate } from 'utils/campareandCopy'
import { useEffect } from 'react'
import { useRef } from 'react'
import { apiCreateNotification, apiUpdateNotification } from 'services/NotificationService'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { useDispatch, useSelector } from 'react-redux'
import ReactHtmlParser from 'html-react-parser'
import { getNotificationAccount } from '../store/dataSlice'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'
import { AdaptableCard } from 'components/shared'


function CreateNewTemplate() {

    const intialValues = {
        type: "",
        title: "",
        template: "",
        acc_unq_id: "",


    }

    const notificationValidationSchema = Yup.object().shape({
        title: Yup.string().min(2, "Sms Title must be at least 2 characters").max(100).required('Please Enter  Title'),
        type: Yup.string().required('Please select notification type')
    })
    const {
        unq_id,
        user_type,
        acc_unq_id,
        enterAccount
    } = useSelector((state) => state?.auth?.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const formikRef = useRef()
    const [message, setMessage] = useTimeOutMessage()
    const notificationAccountList = useSelector((state) => state.notificationsList?.data?.notificationAccList)


    const mode = location.state?.mode ? location.state.mode : "ADD";
    const rowForEdit = location.state?.data;
    const [notificationsIntialValues, setNotificationsIntialValues] = useState()

    const placementList = [
        { name: 'SMS', type: 'SMS' },
        { name: 'Email', type: 'EMAIL' },
        { name: 'Push', type: 'PUSH' },
    ]

    // const [placement, setPlacement] = useState(placementList[1].value)


    useEffect(() => {
        if (rowForEdit) {

            const EditIntialValues = EditandCopyTemplate(intialValues, rowForEdit);

            setNotificationsIntialValues(EditIntialValues)
        }

    }, [mode])

    useEffect(() => {

        dispatch(getNotificationAccount({ enterAccount }))

    }, [dispatch, enterAccount])

    // const onPlacementChange = (val) => {
    //     setPlacement(val)
    // }
    const submitApi = async (data) => {


        // const ntf_tp_info= ReactHtmlParser(data?.template);

        let Payload = {

            "ntf_tp_type": data.type,
            "ntf_tp_name": data.title,
            "ntf_tp_info": data?.template,
            "ntf_status": "ACTIVE",
            "unq_id": user_type !== "GlobalMno" ? enterAccount : data.acc_unq_id
        }
        if (mode === "ADD") {
            const resp = await apiCreateNotification(Payload)
            if (resp.status === 'success') {

                OpenNotification('success', 'Created successfully ')
                navigate('/settings-menu-notifications')




            }
            if (resp.status === 'failed') {
                setMessage(GetErrorMsg(resp));
            }
        }
        else if (mode === "EDIT") {

            Payload.id = rowForEdit.id
            Payload.ntf_status = rowForEdit.ntf_status

            const resp = await apiUpdateNotification(Payload)
            if (resp.status === 'success') {
                OpenNotification('success', 'Updated successfully ')

                navigate('/settings-menu-notifications')


            }
            if (resp.status === 'failed') {
                setMessage(GetErrorMsg(resp));
            }
        }

    }

    const typeChnage = () => {
        if (formikRef?.current?.values?.type === 'SMS') {
            return 'SMS'
        } else if (formikRef?.current?.values?.type === 'EMAIL') {
            return 'Email'
        } else {
            return 'Push'
        }
    }

    // const handleCheckboxChange = async (event, name) => {


    let breadCrumbList = [{
        name: 'Setings',
        // link: "/home"
    }, {
        name: 'Notification',
        link: "/settings-menu-notifications"
    }, {
        name: `Create Template`,
    }]

    if (mode === "EDIT") {
        breadCrumbList = [
            {
                name: 'Setings',
                // link: '/home',
            },
            {
                name: 'Notification',
                link: '/settings-menu-notifications',
            },
            // {
            //     name: rowForEdit?.wh_title,
            //     link: '/warehouse-view-warehouse',
            //     state: rowForEdit
            // },
            {
                name: "Edit Template"
            },
        ]
    }
    return (
        <>
            {message && <Alert className="mb-4" type="danger" showIcon>
                {message}
            </Alert>}

            {/* <div>Setings / Notification / Create Template</div> */}
            <CustomBreadcrumbs  list={breadCrumbList} />
            <div className='mt-5'>
                <h3>Template(SMS,Email,App)</h3>
                <Formik
                    initialValues={intialValues}
                    validationSchema={notificationValidationSchema}
                    innerRef={formikRef}

                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true)
                        submitApi(values)
                    }}

                >
                    {({ values, touched, errors, isSubmitting, handleSubmit }) => {
                        return (
                            <>

                                <Form >
                                <div style={{ backgroundColor: "#F5F5F5", padding: "15px", marginTop: "10px" }}>
                                    <FormContainer>
                                    <AdaptableCard className="h-full p-4" bodyClass="h-full">

                                                <div className='w-[420px]'>
                                                    <FormItem
                                                        label={<p>Operator <span style={{ color: 'red' }}>{'*'}</span></p>}

                                                    >
                                                        <Field name="acc_unq_id">

                                                            {({ field, form }) => (
                                                                <Select
                                                                    isDisabled={user_type !== "GlobalMno" ? true : false}
                                                                    placeholder="Select Operator"
                                                                    field={field}
                                                                    form={form}
                                                                    options={notificationAccountList}
                                                                    value={user_type !== "GlobalMno" ? notificationAccountList?.filter(
                                                                        (label) =>
                                                                            label.acc_unq_id === enterAccount
                                                                    ) : notificationAccountList?.filter(
                                                                        (label) =>
                                                                            label.acc_unq_id === values.acc_unq_id
                                                                    )}
                                                                    onChange={(label) =>
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            label.acc_unq_id
                                                                        )
                                                                    }
                                                                />


                                                            )}
                                                        </Field>
                                                    </FormItem>
                                                </div>

                                                <div className='ml-2'>
                                                    {/* <label>Notification Type<span style={{ color: 'red' }}>{'*'}</span></label> */}
                                                    <FormItem
                                                        label={<p> Notification Type<span style={{ color: 'red' }}>{'*'}</span></p>}
                                                        invalid={errors.type && touched.type}
                                                        errorMessage={errors.type}
                                                    >
                                                        <div className='flex gap-8 mt-4'>
                                                            {placementList.map((item, index) => {
                                                                return (
                                                                    <div className='flex gap-2'>
                                                                        <Field
                                                                            type="radio"
                                                                            autoComplete="off"
                                                                            name="type"
                                                                            value={`${item.type}`}
                                                                            component={Radio}

                                                                        />
                                                                        <div><label>{item.name}</label></div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </FormItem>
                                                </div>
                                                <div className='mt-6 card md:grid grid-cols-2 gap-4  mt-6 ml-2 '>
                                                    <FormItem
                                                        label={<p>{typeChnage()} Title<span style={{ color: 'red' }}>{'*'}</span></p>}
                                                        invalid={errors.title && touched.title}
                                                        errorMessage={errors.title}
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="title"
                                                            placeholder="Enter Title"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                </div>

                                                <div style={{ width: "70%" }} className="ml-2">
                                                    <FormItem label="Template"
                                                    >
                                                        <Field name="template" >
                                                            {({ field, form }) => (
                                                                <RichTextEditor
                                                                    value={field.value}
                                                                    onChange={(val) =>
                                                                        form.setFieldValue(field.name, val)
                                                                    }
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormItem>
                                                </div>

                                    </AdaptableCard>
                                    </FormContainer>
                                    </div>
                                    <div className="mt-4 text-right flex justify-end">
                                        <Link
                                            className="block lg:inline-block md:mb-0 mb-4"
                                            to="/settings-menu-notifications"
                                        >
                                            <Button
                                                className="mx-2"
                                                variant="solid"
                                                style={{
                                                    backgroundColor: "#4D4D4D",
                                                    fontStyle: 'normal',
                                                    fontSize: '18px'
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </Link>
                                        <Button type='submit' variant="solid" style={{
                                            fontStyle: 'normal',
                                            fontSize: '18px'
                                        }}>
                                            {'Submit for Approval'}
                                        </Button>
                                    </div>
                                </Form>
                            </>
                        )
                    }}
                </Formik>

            </div>
        </>
    )
}

export default CreateNewTemplate