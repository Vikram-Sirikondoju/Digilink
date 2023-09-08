import { AdaptableCard, RichTextEditor } from 'components/shared'
import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    toast,
    Notification,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { apiCreateWarehouse, apiUpdateWarehouse } from 'services/WareHouseService'
import {
    ApiToUiConversionWareHouse,
    UiToApiConversionWareHouse,
} from 'utils/campareandCopy'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { GetErrorMsg } from 'views/Servicefile'
import * as Yup from 'yup'
export const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const WareHouseInfo = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formikRef = useRef()
    let initialValues = {
        whTitle: '',
        whLocation: '',
        whAddressLine1: '',
        whAddressLine2: '',
        whCity: '',
        whState: '',
        whCountry: '',
        whZipCode: '',
        whContactPerson: '',
        whEmailId: '',
        whPhoneNumber: '',
        whAlternatePhoneNumber: '',
        whAllottedCapacity: '',
        whTotalCapacity: '',
        whDescription: '',
        whStatus:0
    }

    const [message, setMessage] = useTimeOutMessage()
    const location = useLocation()
    
    const mode = location.state?.mode ==="EDIT" ? location.state?.mode : 'ADD'
    const [selectedMode,setSelectedMode]=useState(mode)
    console.log(mode)
    const rowForEdit = location.state?.data
    if(rowForEdit){
        initialValues= ApiToUiConversionWareHouse(
            initialValues,
            rowForEdit
            )
        }
    const [initialState, setInitValues] = useState(initialValues)
    const { acc_mno_id } = useSelector((state) => state.auth.user)

    const submitApi = async (values) => {
        let submittedValues = { ...values, accId: acc_mno_id }
        let payload = {}
        console.log(selectedMode,'selectedMode')
        if (selectedMode === 'ADD') {
            const reqAddPayload = UiToApiConversionWareHouse(
                payload,
                submittedValues
            )
            const resp = await apiCreateWarehouse(reqAddPayload)
            if (resp.status === 'success') {
                toast.push(
                    <Notification
                        title={'WareHouse Creation'}
                        type="success"
                        duration={2500}
                    >
                        Warehouse Added Successfuly
                    </Notification>,
                    {
                        placement: 'top-right',
                    }
                )

                navigate('/wareHouse-menu-item-view-2')
            } else if (resp.status === 'failed') {
                setMessage(GetErrorMsg(resp))
            }
        } else if (selectedMode === 'EDIT') {
            const reqEditPayload = UiToApiConversionWareHouse(
                payload,
                submittedValues,
                true
            )
            const resp = await apiUpdateWarehouse(reqEditPayload)
            if (resp.status === 'success') {
                toast.push(
                    <Notification
                        title={'WareHouse Updation'}
                        type="success"
                        duration={2500}
                    >
                        Warehouse Updated Successfuly
                    </Notification>,
                    {
                        placement: 'top-right',
                    }
                )
                navigate('/wareHouse-menu-item-view-2')
            } else if (resp.status === 'failed') {
                setMessage(GetErrorMsg(resp))
            }
        }
    }

    const validationSchema = Yup.object({
        whTitle: Yup.string().required('Title is required'),
        whLocation: Yup.string().required('Location is required'),
        whAddressLine1: Yup.string().required('Address Line1 is required'),
        whAddressLine2: Yup.string().required('Address Line2 is required'),
        whCity: Yup.string().required('City is required'),
        whState: Yup.string().required('State is required'),
        whCountry: Yup.string().required('Country is required'),
        whZipCode: Yup.string().required('ZipCode is required'),
        whContactPerson: Yup.string().required('Contact Person is required'),
        whEmailId: Yup.string()
            .email('Enter Valid Email')
            .required('Email Id is required'),
        whPhoneNumber: Yup.string()
            .required('Phone Number is required')
            .matches(phoneRegExp, 'Phone number is not valid'),
        whAlternatePhoneNumber: Yup.string().matches(
            phoneRegExp,
            'Alternate Phone number is not valid'
        ),
        whAllottedCapacity: Yup.string().required(
            'Alloated Capacity is required'
        ),
        whTotalCapacity: Yup.string().required('Total Capacity is required'),
        // whDescription: Yup.string().required('Description is required'),
    })
    return (
        <>
            <Formik
                // innerRef={formikRef}
                initialValues={initialState}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    // setSubmitting(true)
                    submitApi(values)
                }}
            >
                {({
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleSubmit,
                    submitForm,
                }) => (
                    // console.log(values, touched, errors)

                    <Form onSubmit={submitForm}>
                        <div className="mt-6  bg-gray-50 dark:bg-gray-700 rounded ">
                            <AdaptableCard
                                className="h-full"
                                bodyClass="h-full"
                                divider
                            >
                                <FormContainer>
                                    <div className="md:grid grid-cols-2 gap-4 mx-4">
                                        <FormItem
                                            label="Warehouse Title"
                                            invalid={
                                                errors.whTitle &&
                                                touched.whTitle
                                            }
                                            errorMessage={errors.whTitle}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="whTitle"
                                                placeholder="Enter Warehouse Title"
                                                component={Input}
                                                value={values.whTitle}
                                            />
                                        </FormItem>
                                        {/* <FormItem label="Warehouse ID">
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="id"
                                                placeholder="Enter Warehouse ID"
                                                component={Input}
                                            />
                                        </FormItem> */}
                                        <FormItem
                                            label="Location"
                                            invalid={
                                                errors.whLocation &&
                                                touched.whLocation
                                            }
                                            errorMessage={errors.whLocation}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="whLocation"
                                                placeholder="Enter Location"
                                                component={Input}
                                                value={values.whLocation}
                                            />
                                        </FormItem>
                                        {/* <FormItem label="">
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name=" "
                                                placeholder=""
                                                component={''}
                                            />
                                        </FormItem> */}
                                        <FormItem
                                            label="Address Line 1"
                                            invalid={
                                                errors.whAddressLine1 &&
                                                touched.whAddressLine1
                                            }
                                            errorMessage={errors.whAddressLine1}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="whAddressLine1"
                                                placeholder="Enter Address"
                                                component={Input}
                                                value={values.whAddressLine1}
                                            />
                                        </FormItem>
                                        <FormItem
                                            label="Address Line 2"
                                            invalid={
                                                errors.whAddressLine2 &&
                                                touched.whAddressLine2
                                            }
                                            errorMessage={errors.whAddressLine2}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="whAddressLine2"
                                                placeholder="Enter Address"
                                                component={Input}
                                                value={values.whAddressLine2}
                                            />
                                        </FormItem>
                                        <FormItem>
                                            <div className="flex">
                                                <FormItem
                                                    label="Country"
                                                    className="w-150 mr-6"
                                                    invalid={
                                                        errors.whCountry &&
                                                        touched.whCountry
                                                    }
                                                    errorMessage={
                                                        errors.whCountry
                                                    }
                                                >
                                                    <Field
                                                        type="text"
                                                        autoComplete="off"
                                                        name="whCountry"
                                                        placeholder="Enter Your Country"
                                                        component={Input}
                                                        value={values.whCountry}
                                                    />
                                                </FormItem>
                                                <FormItem
                                                    label="City"
                                                    className="w-150 mx-6"
                                                    invalid={
                                                        errors.whCity &&
                                                        touched.whCity
                                                    }
                                                    errorMessage={errors.whCity}
                                                >
                                                    <Field
                                                        type="text"
                                                        autoComplete="off"
                                                        name="whCity"
                                                        placeholder="Enter your City"
                                                        component={Input}
                                                        value={values.whCity}
                                                    />
                                                </FormItem>
                                            </div>
                                        </FormItem>
                                        <FormItem>
                                            <div className="flex">
                                                <FormItem
                                                    label="State"
                                                    className="w-150 mr-6"
                                                    invalid={
                                                        errors.whState &&
                                                        touched.whState
                                                    }
                                                    errorMessage={
                                                        errors.whState
                                                    }
                                                >
                                                    <Field
                                                        type="text"
                                                        autoComplete="off"
                                                        name="whState"
                                                        placeholder="Enter Your State"
                                                        component={Input}
                                                        value={values.whState}
                                                    />
                                                </FormItem>
                                                <FormItem
                                                    label="Zip Code"
                                                    className="w-150 mx-6"
                                                    invalid={
                                                        errors.whZipCode &&
                                                        touched.whZipCode
                                                    }
                                                    errorMessage={
                                                        errors.whZipCode
                                                    }
                                                >
                                                    <Field
                                                        type="text"
                                                        autoComplete="off"
                                                        name="whZipCode"
                                                        placeholder="Enter your ZipCode"
                                                        component={Input}
                                                        value={values.whZipCode}
                                                    />
                                                </FormItem>
                                            </div>
                                        </FormItem>
                                    </div>
                                </FormContainer>
                            </AdaptableCard>
                            <AdaptableCard
                                className="h-full"
                                bodyClass="h-full"
                                divider
                            >
                                <FormContainer>
                                    <div className="md:grid grid-cols-2 gap-4 mx-4">
                                        <FormItem
                                            label="Contact Person"
                                            invalid={
                                                errors.whContactPerson &&
                                                touched.whContactPerson
                                            }
                                            errorMessage={
                                                errors.whContactPerson
                                            }
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="whContactPerson"
                                                placeholder="Enter Contact Person"
                                                component={Input}
                                                value={values.whContactPerson}
                                            />
                                        </FormItem>
                                        <FormItem
                                            label="Email ID"
                                            invalid={
                                                errors.whEmailId &&
                                                touched.whEmailId
                                            }
                                            errorMessage={errors.whEmailId}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="whEmailId"
                                                placeholder="Enter Email ID"
                                                component={Input}
                                                value={values.whEmailId}
                                            />
                                        </FormItem>
                                        <FormItem
                                            label="Phone Number"
                                            invalid={
                                                errors.whPhoneNumber &&
                                                touched.whPhoneNumber
                                            }
                                            errorMessage={errors.whPhoneNumber}
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="whPhoneNumber"
                                                placeholder="Enter Phone Number"
                                                component={Input}
                                                value={values.whPhoneNumber}
                                            />
                                        </FormItem>
                                        <FormItem
                                            label="Alternate Phone Number"
                                            invalid={
                                                errors.whAlternatePhoneNumber &&
                                                touched.whAlternatePhoneNumber
                                            }
                                            errorMessage={
                                                errors.whAlternatePhoneNumber
                                            }
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="whAlternatePhoneNumber"
                                                placeholder="Enter Phone Number"
                                                component={Input}
                                                value={
                                                    values.whAlternatePhoneNumber
                                                }
                                            />
                                        </FormItem>
                                        <FormItem
                                            label="Warehouse Total Capacity(in sqft)"
                                            invalid={
                                                errors.whTotalCapacity &&
                                                touched.whTotalCapacity
                                            }
                                            errorMessage={
                                                errors.whTotalCapacity
                                            }
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="whTotalCapacity"
                                                placeholder="Enter Capacity"
                                                component={Input}
                                                value={values.whTotalCapacity}
                                            />
                                        </FormItem>
                                        <FormItem
                                            label="Allocated Capacity(in sqft)"
                                            invalid={
                                                errors.whAllottedCapacity &&
                                                touched.whAllottedCapacity
                                            }
                                            errorMessage={
                                                errors.whAllottedCapacity
                                            }
                                        >
                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                name="whAllottedCapacity"
                                                placeholder="Enter Capacity"
                                                component={Input}
                                                value={
                                                    values.whAllottedCapacity
                                                }
                                            />
                                        </FormItem>
                                    </div>
                                    <div>
                                        <FormItem
                                            label="Description"
                                            className="mx-4 w-100"
                                            invalid={
                                                errors.whDescription &&
                                                touched.whDescription
                                            }
                                            errorMessage={errors.whDescription}
                                        >
                                            <Field name="whDescription">
                                            {({field})=><RichTextEditor
                                                value={field.value}
                                                onChange={field.onChange(field.name)}
                                            ></RichTextEditor>}
                                            </Field>
                                    
                                        </FormItem>
                                    </div>
                                </FormContainer>
                            </AdaptableCard>
                        </div>
                        <div className="mt-4 text-right">
                            <>
                                <Link
                                    className="block lg:inline-block md:mb-0 mb-4"
                                    to="/wareHouse-menu-item-view-2"
                                >
                                    <Button
                                        type={'button'}
                                        className="mx-2"
                                        onClick={() => console.log('cancel')}
                                        variant="solid"
                                        style={{
                                            backgroundColor: '#4D4D4D',
                                 
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </Link>
                                <Link className="block lg:inline-block md:mb-0 mb-4">
                                    <Button
                                        type={'submit'}
                                        className="mx-2"
                                        variant="solid"
                                        onClick={submitForm}
                                    >
                                        Submit For Approval
                                    </Button>
                                </Link>
                            </>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default WareHouseInfo
