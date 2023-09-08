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
    Alert,
    Upload,
    Dialog
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Accordion from 'components/shared/Accordion'
import ShippingInputs from './ShippingAddressInput'
import PickupInputs from './PickupAddressInput'
import { APiToUiConversionShipment, UiToApiConversionShipment } from 'utils/campareandCopy'
import { apiCreateWorkOrderShipment, apiGetPickUpTimeSlots } from 'services/WorkOrderService'
import { getWorkOrderById } from 'views/wareHouse/WareHouse/store/dataSlice'
import { GetErrorMsg } from 'views/Servicefile'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'

const ShipmentForm = ({
    shipmentFormVisible,
    setShipmentFormVisible,
    onNext,
    onPrevious
}) => {
    const dispatch=useDispatch()
    const [message, setMessage] = useTimeOutMessage()
    useEffect(()=>{
        fetchTimeSlots()
    },[])
    const res = useSelector((state) => state.wareHouse.data);
    const [timeslotOptions,setTimeslotOptions]=useState([])
    const workOrderData = res?.workOrderItem

    let initialValues = {
        shippment_id: Math.floor(100000 + Math.random() * 900000),
        // shippment_id:  `SHIP${Math.floor(
        //     Math.random() * (999 - 100 + 1) + 100
        // )}`,
        dispatchdate: new Date(),
        timeSlot: '',
        "wo_info_id": workOrderData?.id,
        "wo_shippment_status": "IN_TRANSIT",
        delivery_partner: '',
        doc_id: '',
        shippment_add_line1: '',
        shippment_add_line2: '',
        shippment_add_country: '',
        shippment_add_state: '',
        shippment_add_city: '',
        shippment_add_zipcode: '',
        shippment_add_longitude: '',
        shippment_add_latitude: '',
        shippment_add_type: 'DELIVERY',
        shippment_add_other_info: '',
        pickup_add_line1: '',
        pickup_add_line2: '',
        pickup_add_country: '',
        pickup_add_state: '',
        pickup_add_city: '',
        pickup_add_zipcode: '',
        pickup_add_longitude: '',
        pickup_add_latitude: '',
        pickup_add_type: 'PICKUP',
        pickup_add_other_info: ''
    }
    let dataValue=initialValues
    if(workOrderData?.dgl_wo_shippment_details){
        dataValue=APiToUiConversionShipment(workOrderData?.dgl_wo_shippment_details)
    }
    const [initialState, setInitValues] = useState({...dataValue, "wo_info_id": workOrderData?.id,id:dataValue?.id})

    const onDialogClose = () => {
        onPrevious()
    }

    const onDialogOk = (e) => {
        console.log('onDialogOk', e)
        setShipmentFormVisible(false);
        onNext();
    }
    const validationSchema = Yup.object({
        shippment_id: Yup.number().required('Shipment Id is required'),
        dispatchdate: Yup.date().nullable().required('Dispatch Date is required'),
        timeSlot: Yup.string().required('Time Slot is required'),
        // deliveryAddress: Yup.string().required('Delivery Address is required'),
        // pickupAddress: Yup.string().required('Pickup Address is required'),
        delivery_partner: Yup.string().required('Delivery Partner is required'),
        // doc_id: Yup.string().required('Support Documents is required'),
        shippment_add_line1: Yup.string().required('Shippment Address Line 1 is required'),
        shippment_add_line2: Yup.string().required('Shippment Address Line 2 is required'),
        shippment_add_country: Yup.string().required('Country is required'),
        shippment_add_state: Yup.string().required('State is required'),
        shippment_add_city: Yup.string().required('City is required'),
        shippment_add_zipcode: Yup.string().required('ZipCode is required'),
        shippment_add_longitude: Yup.string().required('Longitude is required'),
        shippment_add_latitude: Yup.string().required('latitude is required'),
        // shippment_add_type: Yup.string().required('Delivery Type is required'),
        shippment_add_other_info: Yup.string().required('Other is required'),
        pickup_add_line1: Yup.string().required('Address Line 1 is required'),
        pickup_add_line2: Yup.string().required('Address Line 2 is required'),
        pickup_add_country: Yup.string().required('Country is required'),
        pickup_add_state: Yup.string().required('State is required'),
        pickup_add_city: Yup.string().required('City is required'),
        pickup_add_zipcode: Yup.string().required('ZipCode is required'),
        pickup_add_longitude: Yup.string().required('Longitude is required'),
        pickup_add_latitude: Yup.string().required('latitude is required'),
        // pickup_add_type: Yup.string().required('Delivery Type is required'),
        pickup_add_other_info: Yup.string().required('Other is required'),
    })

    const handleSubmit = async(values) => {
        // onDialogOk();
        const data=UiToApiConversionShipment(values)
        const resp = await apiCreateWorkOrderShipment(data)
        if (resp.status === 'success') {
            dispatch(getWorkOrderById(workOrderData?.id))
            onDialogOk();
        } else if (resp.status === 'failed') {
            setMessage(GetErrorMsg(resp))
            onDialogOk();
        }
    
    };
    const fetchTimeSlots=async()=>{
        const response = await apiGetPickUpTimeSlots({
            int_type:'pickup',
            data:'%7B%22pickupAddress%22%3A%7B%22streetLines%22%3A%5B%22Walker%20st%22%5D%2C%22urbanizationCode%22%3A%22URB%20FAIR%20OAKS%22%2C%22city%22%3A%22NewYork%22%2C%22stateOrProvinceCode%22%3A%22NY%22%2C%22postalCode%22%3A%2210006%22%2C%22countryCode%22%3A%22US%22%2C%22residential%22%3Afalse%2C%22addressClassification%22%3A%22MIXED%22%7D%2C%22dispatchDate%22%3A%222023-07-14%22%2C%22packageReadyTime%22%3A%2215%3A30%3A00%22%2C%22customerCloseTime%22%3A%2218%3A00%3A00%22%2C%22pickupRequestType%22%3A%5B%22SAME_DAY%22%5D%2C%22shipmentAttributes%22%3A%7B%22weight%22%3A%7B%22units%22%3A%22KG%22%2C%22value%22%3A20%7D%2C%22packagingType%22%3A%22YOUR_PACKAGING%22%2C%22dimensions%22%3A%7B%22length%22%3A7%2C%22width%22%3A8%2C%22units%22%3A%22CM%22%2C%22height%22%3A9%7D%7D%2C%22numberOfBusinessDays%22%3A1%2C%22packageDetails%22%3A%5B%7B%22packageSpecialServices%22%3A%7B%22specialServiceTypes%22%3A%5B%22SIGNATURE_OPTION%22%5D%7D%7D%5D%2C%22associatedAccountNumber%22%3A%22740561073%20%22%2C%22associatedAccountNumberType%22%3A%22FEDEX_EXPRESS%22%2C%22carriers%22%3A%5B%22FDXE%22%5D%2C%22countryRelationship%22%3A%22DOMESTIC%22%7D'
        })
        const res= JSON.parse(response?.data?.response?.response_message)
        const timeslots=res?.output?.options[0]?.readyTimeOptions || []
        const result=timeslots?.map((i)=>{
            return {value:i,label:i}
        })
        setTimeslotOptions(result)
    }
    // const timeslotOptions = [
    //     { value: '09:00 AM - 01:00 PM', label: '09:00 AM - 01:00 PM' },
    //     { value: '02:00 PM - 05:00 PM', label: '02:00 PM - 05:00 PM' }
    // ];

    const deliveryPartnerOptions = [
        { value: 'FEDEX', label: 'FEDEX' },
        { value: 'BlueDart', label: 'BlueDart' }
    ];

    const dateFormat = useSelector((state) => state.locale.dateFormat)

    const beforeUpload = (file) => {
        // Implement any required file validation here, if necessary.
        return true; // Return true to allow the upload, or false to prevent it.
    };
      
    return (
        <div>
            <Dialog
                isOpen={shipmentFormVisible}
                shouldCloseOnOverlayClick={false}
                width={1000}
                height={'90%'}
                shouldCloseOnEsc={false}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <div className="flex flex-col h-full">
                    <h5 className="mb-4">Create Shipment</h5>
                    <div className=" overflow-y-auto">
                        <Formik
                            initialValues={initialState}
                            // validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({
                                values,
                                touched,
                                errors,
                                isSubmitting,
                                handleSubmit,
                                submitForm,
                            }) => (
                                
                                <Form>
                                    <FormContainer>
                                        <div className="md:grid grid-cols-2 gap-4 mx-4">
                                            <FormItem
                                                label={<p>Shipment ID <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                invalid={
                                                    errors.shippment_id &&
                                                    touched.shippment_id
                                                }
                                                errorMessage={
                                                    errors.shippment_id
                                                }
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="shippment_id"
                                                    placeholder="Enter Shipment Id"
                                                    component={Input}
                                                    value={values.shippment_id}
                                                    disabled={true}
                                                />
                                            </FormItem>
                                            <FormItem
                                                    label={<p>Dispatch Date <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                    invalid={
                                                        errors.dispatchdate &&
                                                        touched.dispatchdate
                                                    }
                                                    errorMessage={
                                                        errors.dispatchdate
                                                    }
                                                >
                                                <Field name="dispatchdate" >
                                                    {({ field, form }) => (
                                                        <DatePicker
                                                            placeholder="Select Dispatch date"
                                                            field={field}
                                                            form={form}
                                                            value={new Date(field.value)}
                                                            onChange={(date) => {
                                                                form.setFieldValue(
                                                                    field.name,
                                                                    date
                                                                )
                                                            }}
                                                            // minDate={new Date()}
                                                            inputFormat= {dateFormat}
                                                        />
                                                    )}
                                                </Field>
                                            </FormItem>
                                        </div>
                                    </FormContainer>
                                    <FormContainer>
                                        
                                        <div className="md:grid grid-cols-2 gap-4 mx-4">
                                            <FormItem
                                                label={<p>Time Slot <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                
                                                invalid={errors.timeSlot && touched.timeSlot}
                                                    errorMessage={errors.timeSlot}
                                            >
                                                <Field name="timeSlot">
                                                    {({ field, form }) => (
                                                        <Select
                                                        placeholder="Select Time Slot"
                                                        field={field}
                                                        form={form}
                                                        options={timeslotOptions}
                                                        value={timeslotOptions.find(option => option.value === field.value) || ''}
                                                        onChange={(selectedOption) => form.setFieldValue(field.name, selectedOption.value)}
                                                    />
                                                    )}
                                                </Field>
                                            </FormItem>
                                            <FormItem
                                                
                                                label={<p>Delivery Partner <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                invalid={
                                                    errors.delivery_partner &&
                                                    touched.delivery_partner
                                                }
                                                errorMessage={
                                                    errors.delivery_partner
                                                }
                                            >
                                                <Field name="delivery_partner">
                                                    {({ field, form }) => (
                                                        <Select
                                                        placeholder="Select Delivery Partner"
                                                        field={field}
                                                        form={form}
                                                        options={deliveryPartnerOptions}
                                                        value={deliveryPartnerOptions.find(option => option.value === field.value) || ''}
                                                        onChange={(selectedOption) => form.setFieldValue(field.name, selectedOption.value)}
                                                    />
                                                    )}
                                                </Field>
                                            </FormItem>
                                        </div>
                                    </FormContainer>
                                    <FormContainer>
                                        <Accordion Items={[
                                            {
                                                id: 1,
                                                title: 'Shippment Address',
                                                component: <ShippingInputs {...{
                                                    values,
                                                    touched,
                                                    errors,
                                                    isSubmitting,
                                                    handleSubmit,
                                                    submitForm,
                                                }}  />,
                                            },
                                            {
                                                id: 2,
                                                title: 'Pickup Address',
                                                component: <PickupInputs {...{
                                                    values,
                                                    touched,
                                                    errors,
                                                    isSubmitting,
                                                    handleSubmit,
                                                    submitForm,
                                                }} />,
                                            },
                                        ]}  /> 
                                        <div className="md:grid mx-4">
                                            <FormItem
                                               
                                                label={<p>Support Documents <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                invalid={
                                                    errors.doc_id &&
                                                    touched.doc_id
                                                }
                                                errorMessage={
                                                    errors.doc_id
                                                }
                                            >
                                        <Upload
                                            draggable
                                            className="border-gray-200 w-[500] h-[0] px-6"
                                            style={{ minHeight: '3rem' }}
                                            beforeUpload={beforeUpload}
                                            onChange={(updatedFiles, files, uploadRes, filesDetails) => {
                                            // Here, you can update the form values with the uploaded file information.
                                            // Since we are using static values, this will not be triggered in this example.
                                            }}
                                        >
                                            <div className="my-10 text-center">
                                            <p className="font-semibold">
                                                <span className="text-gray-400 dark:text-white">
                                                
                                                </span>
                                                <span className="text-blue-700">Support Documents</span>
                                            </p>
                                            </div>
                                        </Upload>
                                        </FormItem>
                                        </div>  
                                    
                                    </FormContainer>
                                <div className="mt-4 text-right">
                                            <>
                                                <Link
                                                    className="block lg:inline-block md:mb-0 mb-4"
                                                >
                                                    <Button
                                                        type={'button'}
                                                        className="mx-2"
                                                        onClick={() =>
                                                            onDialogClose()
                                                        }
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
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default ShipmentForm;