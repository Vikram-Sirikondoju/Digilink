import React, { useCallback, useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik';
import { Input, FormItem, FormContainer, Button, Select, Alert, Upload, Avatar } from 'components/ui';
import { Link } from 'react-router-dom'
import { MdModeEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileDetails } from '../store/dataSlice';
import { apiSubmitProfileData, apiUploadFiles } from 'services/ProfileService';
import { GetErrorMsg, OpenNotification } from 'views/Servicefile';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import { HiOutlineUser } from 'react-icons/hi';
import appConfig from 'configs/app.config';

const language = [
    { label: 'English', value: 1 },
    { label: 'Spanish', value: 2 },
    { label: 'Arabic', value: 3 },
    { label: 'Portugese', value: 4 },
]
const saveFilesInAccounts = 1

const Profile = (props) => {
    //console.log(props.profile,"props.profile")

    const dispatch = useDispatch()
    const profileDataForm = useSelector(
        (state) => state.profile.data.profileData.response
    )
    const { acc_unq_id, acc_user_id } = useSelector(
        (state) => state.auth.user
    )

    const [loading, setLoading] = useState(false)
    const [profileData, setProfileData] = useState()
    const [message, setMessage] = useTimeOutMessage()



    useEffect(() => {
        dispatch(getProfileDetails({ acc_unq_id }))

    }, [acc_unq_id, dispatch,props,profileDataForm])
  


    const saveProfileData = async (values) => {

        const body = { ...values };
        setLoading(true);
        if (props.profile !== 'ADD') {
            delete body.acc_password;
        }

        const resp = await apiSubmitProfileData(body);
        if (resp.status === 'success') {
            setTimeout(() => {
                OpenNotification('success', 'SuccessFully Updated ')
                setLoading(false);
            }, 2000)
        }

        if (resp.status === 'failed') {
            setMessage(GetErrorMsg(resp))
            setLoading(false);
        }
    }

    if (!profileDataForm) {
        return <div>Loading...</div>;
    }

    const beforeUpload = async (newFiles, files) => {
        const file = newFiles[0];
        const allowedTypes = ['image/jpeg', 'image/png'];

        if (!allowedTypes.includes(file.type)) {
            OpenNotification('warning', 'JPG/PNG files are allowed only!')
          return false;
        } 
        try { 
            const ress = await apiUploadFiles(newFiles[0], acc_user_id, saveFilesInAccounts)
          return ress;
        } catch (error) {
          console.error('Error during file upload:', error);
          return false;
        }
      };

  
    return (
        <>
            {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {Array.isArray(message) ? message.join(", ") : message}
                </Alert>
            )}
            {profileDataForm && <Formik
                initialValues={profileDataForm}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values, "values")
                    setSubmitting(true)
                    saveProfileData(values)
                }}
            >
                {({ values, touched, errors, isSubmitting, handleSubmit, resetForm, setFieldValue }) => {
                    return (
                        <>
                            <Form onSubmit={handleSubmit} >
                                <FormContainer>
                                    <div style={{ backgroundColor: "#F5F5F5", padding: "15px 15px ", marginTop: "10px" }}>

                                        <div style={{ backgroundColor: "white", padding: "14px 14px", marginBelow: "10px" }}>

                                            <div className=''>
                                                <h6 className='font-bold '>BASIC DETAILS</h6>

                                                <div className='mt-6'>
                                                    <div className='h-24 bg-gradient-to-r from-sky-700 from-10% via-sky-500 via-30% to-sky-700 to-90% border-2 w-full items-center flex justify-center'>
                                                        {/* <img className='h-24 w-24 rounded-full bg-gray-200 border-none absolute  mt-20 '
                                                            src={`/img/avatars/profileimage.png`} />
                                                        <div className="text-base text-black font-bold flex gap-1" >
                                                            <MdModeEdit className="mt-14 ml-3 z-40 absolute colo bg-white rounded-full h-9 w-9 p-2 text-sky-600 text-8xl border border-sky-600" />
                                                        </div>   */}

                                                        <FormItem

                                                        >
                                                            <Field name={'profile_img'}>
                                                                {({ field, form }) => (
                                                                    <Upload

                                                                        className="cursor-pointer h-[0px]"
                                                                        beforeUpload={beforeUpload}
                                                                        onChange={(updatedFiles, files, uploadRes, filesDetails) => {
                                                                            setFieldValue(field.name, uploadRes?.data.fileUnqId);
                                                                        }
                                                                        }
                                                                    >
                                                                        {/*   <img className='h-24 w-24 rounded-full'
                                                                            src={`${appConfig.apiPrefix}/media/uniqid/${field.value}`} />

                                                                        <div className="absolute top-10 right-0  mt-0 mr-0">
                                                                            <MdModeEdit className=" colo bg-white rounded-full h-9 w-9 p-2 text-sky-600 text-8xl border border-sky-600" />

                                                                        </div> */}


                                                                        <div className="relative">
                                                                            <img className="h-24 w-24 rounded-full" src={`${appConfig.apiPrefix}/media/uniqid/${field.value}`} />
                                                                            <div className="absolute top-1/2 right-0 transform -translate-y-1/4 translate-x-1/2">
                                                                                <MdModeEdit className="colo bg-white rounded-full h-9 w-9 p-2 text-sky-600 text-8xl border border-sky-600" />
                                                                            </div>
                                                                        </div>



                                                                    </Upload>
                                                                )}
                                                            </Field>
                                                        </FormItem>



                                                    </div>

                                                </div>
                                            </div>

                                            <div className='md:grid grid-cols-2 gap-x-7  mt-16  '>
                                                <FormItem
                                                    label="First Name"
                                                >
                                                    <Field className='bg-gray-100'
                                                        type="text"
                                                        autoComplete="off"
                                                        name="first_name"
                                                        placeholder="Esther Howard"
                                                        component={Input}
                                                        disabled={true}

                                                    />
                                                </FormItem>

                                                <FormItem
                                                    label="Last Name"
                                                >
                                                    <Field className='bg-gray-100'
                                                        type="text"
                                                        autoComplete="off"
                                                        name="last_name"
                                                        placeholder="Robert Fox"
                                                        component={Input}
                                                        disabled={true}
                                                    />
                                                </FormItem>
                                                <FormItem
                                                    label="Email ID"
                                                >
                                                    <Field className='bg-gray-100'
                                                        type="text"
                                                        autoComplete="off"
                                                        name="email"
                                                        placeholder="Esther Howard@gmail.com"
                                                        component={Input}
                                                        disabled={true}
                                                    />
                                                </FormItem>
                                                <FormItem
                                                    label="Phone Number"
                                                >
                                                    <Field className='bg-gray-100'
                                                        type="text"
                                                        autoComplete="off"
                                                        name="phone"
                                                        placeholder="(316) 555-0116"
                                                        component={Input}
                                                        disabled={true}
                                                    />
                                                </FormItem>
                                                <FormItem
                                                    label="Address Line-1"
                                                >
                                                    <Field className='bg-gray-100'
                                                        type="text"
                                                        autoComplete="off"
                                                        name="add_line1"
                                                        placeholder="3517 W. Gray St. Utica, Pennsylvania 57867"
                                                        component={Input}
                                                        disabled={true}
                                                    />
                                                </FormItem>
                                                <FormItem
                                                    label="Address Line-2"
                                                >
                                                    <Field className='bg-gray-100'
                                                        type="text"
                                                        autoComplete="off"
                                                        name="add_line2"
                                                        placeholder="8502 Preston Rd. Inglewood, Maine 98380"
                                                        component={Input}
                                                        disabled={true}
                                                    />
                                                </FormItem>
                                            </div>
                                            <div className='grid grid-cols-4 gap-7'>
                                                <FormItem
                                                    label="Country"
                                                >
                                                    <Field className='bg-gray-100'
                                                        type="text"
                                                        autoComplete="off"
                                                        name="country"
                                                        component={Input}
                                                        disabled={true}
                                                    />
                                                </FormItem>
                                                <FormItem
                                                    label="City"
                                                >
                                                    <Field className='bg-gray-100'
                                                        type="text"
                                                        autoComplete="off"
                                                        name="city"
                                                        component={Input}
                                                        disabled={true}
                                                    />
                                                </FormItem>
                                                <FormItem
                                                    label="State"

                                                >
                                                    <Field className='bg-gray-100'
                                                        type="text"
                                                        autoComplete="off"
                                                        name="state"
                                                        component={Input}
                                                        disabled={true}
                                                    />
                                                </FormItem>
                                                <FormItem
                                                    label="Zip-Code"
                                                >
                                                    <Field className='bg-gray-100'
                                                        type="text"
                                                        autoComplete="off"
                                                        name="zipcode"
                                                        component={Input}
                                                        disabled={true}
                                                    />
                                                </FormItem>

                                            </div>
                                            <div>
                                                <h6>PREFERENCES</h6>
                                                <div className='grid grid-cols-2 gap-7 mt-4'>


                                                    <FormItem
                                                        label={<p>Language </p>}
                                                    >
                                                        <Field name="language" disabled >
                                                            {({ field, form }) => (
                                                                <Select
                                                                    // value={language.find(lang => lang.value === field.value)}
                                                                    placeholder="Select Language"
                                                                    field={field}
                                                                    // form={form}
                                                                    disabled={true} 
                                                                    options={language}
                                                                    onChange={lang => form.setFieldValue(field.name, lang.value)}
                                                                   
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormItem>


                                                    <FormItem
                                                        label="Time-Zone"
                                                    >
                                                        <Field className='bg-gray-100'
                                                            type="text"
                                                            autoComplete="off"
                                                            name="time_zone"
                                                            placeholder="(UTC-08:00) Coordinated Universal Time-08"
                                                            component={Input}
                                                        />
                                                    </FormItem>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </FormContainer>
                                <div className="mt-4 text-right">
                                    <>
                                        <Link
                                            className="block lg:inline-block md:mb-0 mb-4"
                                            to="">
                                            <Button
                                                type="button"
                                                onClick={resetForm}
                                                className="mx-2"
                                                variant="solid"
                                                style={{ backgroundColor: "#4D4D4D" }}
                                            >
                                                Reset
                                            </Button>
                                        </Link>

                                        <Button
                                            className="mx-2"
                                            variant='solid'
                                            type="submit"
                                        >
                                            Save
                                        </Button>
                                    </>

                                </div>

                            </Form>

                        </>
                    )
                }}
            </Formik>}
        </>
    )
}

export default Profile