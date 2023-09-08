import { IoMdDownload, IoMdCloudUpload } from 'react-icons/io'
import logo from '../../../../../../../assets/images/fedex.png'
import { useSelector } from 'react-redux'
import {
    Button,
    Card,
    Checkbox,
    DatePicker,
    FormContainer,
    FormItem,
    Input,
    Select,
    Table,
    Upload,
} from 'components/ui'
import { Field, FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import dayjs from 'dayjs'
import { useState } from 'react'
import { apiUpdateWorkOrderShipment } from 'services/WorkOrderService'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { GetErrorMsg } from 'views/Servicefile'
const { Tr, Th, Td, THead, TBody } = Table
const Dispatch = (props) => {
    const data = useSelector((state) => state.wareHouse.data)
    const workOrderItem = data?.workOrderItem
    const shipment_details = workOrderItem?.dgl_wo_shippment_details
    const package_details = workOrderItem?.dgl_work_order_packaging
    const [message, setMessage] = useTimeOutMessage()
    const [shipInitValues,setShipInitValues]=useState({...shipment_details,wo_info_id:workOrderItem?.id})

    const beforeUpload = (file) => {
        // Implement any required file validation here, if necessary.
        return true // Return true to allow the upload, or false to prevent it.
    }
    const handleSubmitDispatch = async (values) => {
        console.log(values)
        const resp = await apiUpdateWorkOrderShipment(values)
        if (resp.status === 'success') {
            props?.onNext()
        } else if (resp.status === 'failed') {
            setMessage(GetErrorMsg(resp))
        }
    
    }

    const validationSchema = Yup.object().shape({
        delivery_partner: Yup.string().trim().required('Please enter Delivery Partner ').nullable(),
        vehicle_number: Yup.string().trim().required('Please enter Vehicle Number ').nullable(),
        driver_name: Yup.string().trim().required('Please enter Driver Name ').nullable(),
        mobile_number: Yup.string().trim().min(2, "Number must be atleast 2 characters").max(20, "Max 20 characters are allowed")
            .required("Please enter Contact number").nullable()
    })

    return (
        <div>
            <Formik
                initialValues={shipInitValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    handleSubmitDispatch(values, setSubmitting)
                }}
            >
                {({ values, touched, errors, handleSubmit, isSubmitting }) => {
                    return (
                        <Form onSubmit={handleSubmit}>
                            <FormContainer>
                                <div className="m-4 border p-6">
                                    <div className="md:grid grid-cols-2 mb-4">
                                        <h5 className="mb-4 mt-1 text-xl">
                                            Shipment ID:{' '}
                                            <span className="text-slate-500">{`#${shipment_details?.shippment_id}`}</span>
                                        </h5>
                                    </div>
                                    <div className="md:grid grid-cols-4">
                                        <div>
                                            <div className="text-base text-black font-bold decoration-2">
                                                Dispatch Date:
                                            </div>
                                            <div className="md:grid grid-cols-1 gap-2">
                                                <p className="mt-2 text-base">
                                                    {dayjs(
                                                        shipment_details?.dispatchdate,
                                                        'YYYY-MM-DD'
                                                    )?.format('YYYY-MM-DD')}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-base text-black font-bold decoration-2">
                                                Time Slot:
                                            </div>
                                            <div className="md:grid grid-cols-1 gap-2">
                                                <p className="mt-2 text-base">
                                                    02:00PM - 05:00PM
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-base text-black font-bold decoration-2 mt-2 mb-1">
                                                Tracking ID:
                                            </div>
                                            <a
                                                className="text-blue-500"
                                                href="javascript:void(0)"
                                            >
                                                {
                                                    shipment_details?.tracking_number
                                                }
                                            </a>
                                        </div>
                                        <div>
                                            <div className="text-base text-black font-bold decoration-2">
                                                Shipment Status:
                                            </div>
                                            <div className="md:grid grid-cols-1 gap-2">
                                                <p className="mt-2 text-base flex flex-row">
                                                    <span className="pt-2">
                                                        <span class="flex w-2.5 h-2.5 bg-orange-600 rounded-full mr-1.5 flex-shrink-0"></span>
                                                    </span>
                                                    {
                                                        shipment_details?.wo_shippment_status
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-zinc-100 p-5 mt-4">
                                        <div className="bg-white">
                                            <Table className="text-black">
                                                <THead className="text-black">
                                                    <Tr className="bg-white">
                                                        <Th>Package ID</Th>
                                                        <Th>Package Date</Th>
                                                        <Th>Weight</Th>
                                                        <Th>Dimensions</Th>
                                                        <Th>Shipping Label</Th>
                                                        <Th>Way Bill</Th>
                                                    </Tr>
                                                </THead>
                                                <TBody>
                                                    {package_details?.map(
                                                        (i) => {
                                                            return (
                                                                <Tr>
                                                                    <Td>
                                                                        {
                                                                            i?.package_id
                                                                        }
                                                                    </Td>
                                                                    <Td>
                                                                        {' '}
                                                                        {dayjs(
                                                                            i?.package_date,
                                                                            'YYYY-MM-DD'
                                                                        )?.format(
                                                                            'YYYY-MM-DD'
                                                                        )}
                                                                    </Td>
                                                                    <Td>
                                                                        {
                                                                            i?.net_weight
                                                                        }
                                                                    </Td>
                                                                    <Td>{`${i?.length}x${i?.width}x${i?.height}`}</Td>
                                                                    <Td>
                                                                        <IoMdDownload />
                                                                    </Td>
                                                                    <Td>
                                                                        <IoMdDownload />
                                                                    </Td>
                                                                </Tr>
                                                            )
                                                        }
                                                    )}
                                                </TBody>
                                            </Table>
                                        </div>
                                    </div>
                                    <div className="border-dashed border-t mt-6 mb-6"></div>
                                    <div className="md:grid grid-cols-4 gap-x-2">
                                        <div>
                                            <FormItem
                                                label="Delivery Partner"
                                                invalid={
                                                    errors.delivery_partner &&
                                                    touched.delivery_partner
                                                }
                                                errorMessage={
                                                    errors.delivery_partner
                                                }
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="delivery_partner"
                                                    disabled={true}
                                                    placeholder="Enter Delivery Partner"
                                                    component={Input}
                                                />
                                            </FormItem>
                                        </div>
                                        <div>
                                            <FormItem
                                                label="Vehicle Number"
                                                invalid={
                                                    errors.vehicle_number &&
                                                    touched.vehicle_number
                                                }
                                                errorMessage={
                                                    errors.vehicle_number
                                                }
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="vehicle_number"
                                                    placeholder="Enter Vehicle Number"
                                                    component={Input}
                                                />
                                            </FormItem>
                                        </div>
                                        <div>
                                            <FormItem
                                                label="Driver Name"
                                                invalid={
                                                    errors.driver_name &&
                                                    touched.driver_name
                                                }
                                                errorMessage={
                                                    errors.driver_name
                                                }
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="driver_name"
                                                    placeholder="Enter Driver Name"
                                                    component={Input}
                                                />
                                            </FormItem>
                                        </div>
                                        <div>
                                            <FormItem
                                                label="Contact Number"
                                                invalid={
                                                    errors.mobile_number &&
                                                    touched.mobile_number
                                                }
                                                errorMessage={
                                                    errors.mobile_number
                                                }
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="mobile_number"
                                                    placeholder="Enter Contact Number"
                                                    component={Input}
                                                />
                                            </FormItem>
                                        </div>
                                    </div>
                                    <div className="border-dashed border-t mt-6 mb-6"></div>
                                    <div className="md:grid grid-cols-4">
                                        <div className="col-span-2 row-span-2">
                                            <div className="text-base text-black font-bold decoration-2">
                                                Outgoing Shipment Report:
                                            </div>
                                            <Upload
                                                draggable
                                                className="border-gray-200 w-[500] h-[0] px-6"
                                                style={{ minHeight: '3rem' }}
                                                beforeUpload={beforeUpload}
                                                onChange={(
                                                    updatedFiles,
                                                    files,
                                                    uploadRes,
                                                    filesDetails
                                                ) => {
                                                    // Here, you can update the form values with the uploaded file information.
                                                    // Since we are using static values, this will not be triggered in this example.
                                                }}
                                            >
                                                <div className="my-10 text-center">
                                                    <p className="font-semibold">
                                                        <span className="text-gray-400 dark:text-white"></span>
                                                        <span className="flex flex-row">
                                                            <span className="text-gray-400">
                                                                Upload Your
                                                                Shipping Report
                                                            </span>
                                                            <span className="p-1 mx-2">
                                                                <IoMdCloudUpload />
                                                            </span>
                                                        </span>
                                                    </p>
                                                </div>
                                            </Upload>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 text-right">
                                    <Button
                                        type={'button'}
                                        className="mx-2"
                                        onClick={() => props?.onPrevious()}
                                        variant="solid"
                                        style={{
                                            backgroundColor: '#4D4D4D',
                                        }}
                                    >
                                        {'Previous'}
                                    </Button>
                                    <Button
                                        variant="solid"
                                        type="submit"
                                    >
                                        {'Dispatched'}
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default Dispatch
