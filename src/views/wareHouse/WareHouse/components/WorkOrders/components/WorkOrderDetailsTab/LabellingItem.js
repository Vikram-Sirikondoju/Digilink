import { AdaptableCard, DataTable } from 'components/shared'
import {
    Button,
    Card,
    Checkbox,
    Dialog,
    FormContainer,
    FormItem,
    Input,
    Tooltip,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { useCallback, useMemo, useRef, useState } from 'react'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
    apiCreateWorkOrderLabellingItem,
    apiDeleteWorkOrderLabellingItem,
    apiUpdateWorkOrderLabellingItem,
} from 'services/WorkOrderService'
import useThemeClass from 'utils/hooks/useThemeClass'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { GetErrorMsg } from 'views/Servicefile'
import { getWorkOrderById } from 'views/wareHouse/WareHouse/store/dataSlice'

const LabellingItem = (props) => {
    const tableRef = useRef(null)
    const dispatch = useDispatch()
    const data = useSelector((state) => state.wareHouse.data)
    const workOrderItem = data?.workOrderItem
    const [message, setMessage] = useTimeOutMessage()
    const [showDialog, setShowDialog] = useState(false)
    const { dataItem } = props
    const ActionColumn = ({ row }) => {
        const { textTheme } = useThemeClass()

        const onDelete = useCallback(async () => {
            const Id = row?.id
            const res = await apiDeleteWorkOrderLabellingItem(Id)
            if (res.status === 'success') {
                dispatch(getWorkOrderById(workOrderItem?.id))
            } else if (res.status === 'failed') {
                setMessage(GetErrorMsg(res))
            }
        }, [row])
        const onEdit = useCallback(() => {
            setShowDialog(true)
            setInitValues(row)
        }, [row])

        return (
            <div className="flex justify-end text-lg">
                <Tooltip title="Edit">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                        onClick={onEdit}
                    >
                        <MdModeEdit />
                    </span>
                </Tooltip>
                <Tooltip title="Delete">
                    <span
                        className={`cursor-pointer text-red-500 p-1 hover:${textTheme}`}
                        onClick={onDelete}
                    >
                        <MdDelete />
                    </span>
                </Tooltip>
            </div>
        )
    }
    const columns = useMemo(
        () => [
            {
                header: 'SIM No.',
                accessorKey: 'sim_number',
            },
            {
                header: 'IMEI No.',
                accessorKey: 'imei_number',
            },
            {
                header: 'SIM Sl.No.',
                accessorKey: 'sim_serial_number',
            },
            {
                header: 'Barcode',
                accessorKey: 'bar_code',
            },
            {
                header: 'GTIN Number',
                accessorKey: 'gst_number',
            },
            {
                header: 'Actions',
                flex: 1,
                accessorKey: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )

    const initialValues = {
        bar_code: '',
        gst_number: '',
        sim_number_check: false,
        sim_number: '',
        imei_number: '',
        sim_serial_number: '',
        wo_label_id: dataItem?.dgl_work_order_labelling?.id,
    }
    const [initialState, setInitValues] = useState(initialValues)
    const handleAddNewLabel = async (values, setSubmitting) => {
        let resp
        if (values?.id) {
            const req = {
                ...values,
                wo_label_id: dataItem?.dgl_work_order_labelling?.id,
            }
            resp = await apiUpdateWorkOrderLabellingItem(req)
        } else {
            resp = await apiCreateWorkOrderLabellingItem(values)
        }
        if (resp.status === 'success') {
            dispatch(getWorkOrderById(workOrderItem?.id))
            setShowDialog(false)
        } else if (resp.status === 'failed') {
            setMessage(GetErrorMsg(resp))
        }
    }
    return (
        <>
            <Card className="mx-3 mb-6">
                <div className="md:grid grid-cols-4 pb-2">
                    <div className="md:gird mx-2">
                        <div className="text-base text-black font-bold   decoration-2">
                            Product Id:
                        </div>
                        <div className="col-span-6 md:grid grid-cols-2 gap-2">
                            <p className="mt-2 text-base">
                                {dataItem?.item_var_id}
                            </p>
                        </div>
                    </div>
                    <div className="md:gird mx-2">
                        <div className="text-base text-black font-bold   decoration-2">
                            Product Type:
                        </div>
                        <div className=" md:grid grid-cols-2 gap-2">
                            <p className="mt-2 text-base">
                                {dataItem?.item_type}
                            </p>
                        </div>
                    </div>
                    <div className="md:gird mx-2">
                        <div className="text-base text-black font-bold   decoration-2">
                            Sku Code:
                        </div>
                        <div className="md:grid grid-cols-2 gap-2">
                            <p className="mt-2 text-base">{'--'}</p>
                        </div>
                    </div>
                    <div className="md:gird mx-2">
                        <div className="text-base text-black font-bold   decoration-2">
                            Allocated Quantity
                        </div>
                        <div className=" md:grid grid-cols-2 gap-2">
                            <p className="mt-2 text-base">
                                {dataItem?.quantity}
                            </p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="py-2 flex justify-end">
                    <Button variant="solid" onClick={() => setShowDialog(true)}>
                        {'Add New'}
                    </Button>
                </div>
                <DataTable
                    ref={tableRef}
                    columns={columns}
                    data={dataItem?.dgl_work_order_labelling?.labelling_items}
                />
            </Card>
            <Dialog isOpen={showDialog} onClose={() => setShowDialog(false)}>
                <h6
                    style={{
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '18px',
                        color: '#212121',
                    }}
                >
                    {initialState?.id ? `Update` : `Add`}
                </h6>
                <hr className="text-gary-500 mt-4 mb-4" />
                <Formik
                    initialValues={initialState}
                    // validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true)
                        handleAddNewLabel(values, setSubmitting)
                    }}
                >
                    {({
                        values,
                        touched,
                        errors,
                        handleSubmit,
                        isSubmitting,
                    }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <FormContainer>
                                    <div className="mt-3 dark:bg-gray-700 rounded ">
                                        <div
                                            className="p-1"
                                            // style={{
                                            //     backgroundColor: '#F5F5F5',
                                            // }}
                                        >
                                            <AdaptableCard
                                                className="h-full"
                                                bodyClass="h-full"
                                                // divider
                                            >
                                                <div className="md:grid grid-cols-1 gap-2 mx-1 ">
                                                    <FormItem
                                                        label="Bar Code"
                                                        invalid={
                                                            errors.bar_code &&
                                                            touched.bar_code
                                                        }
                                                        errorMessage={
                                                            errors.bar_code
                                                        }
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="bar_code"
                                                            placeholder="Enter Bar Code"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                </div>
                                                <div className="md:grid grid-cols-2 gap-2 mx-1 ">
                                                    <FormItem
                                                        label="GSTIN Number"
                                                        invalid={
                                                            errors.gst_number &&
                                                            touched.gst_number
                                                        }
                                                        errorMessage={
                                                            errors.gst_number
                                                        }
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="gst_number"
                                                            placeholder="Enter GSTIN Number"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                        label="SIM Number"
                                                        invalid={
                                                            errors.sim_number_check &&
                                                            touched.sim_number_check
                                                        }
                                                        errorMessage={
                                                            errors.sim_number_check
                                                        }
                                                    >
                                                        <Field
                                                            name="sim_number_check"
                                                            component={Checkbox}
                                                        />
                                                    </FormItem>
                                                    {values?.sim_number_check && (
                                                        <>
                                                            <FormItem
                                                                label="SIM Number"
                                                                invalid={
                                                                    errors.sim_number &&
                                                                    touched.sim_number
                                                                }
                                                                errorMessage={
                                                                    errors.sim_number
                                                                }
                                                            >
                                                                <Field
                                                                    type="number"
                                                                    autoComplete="off"
                                                                    name="sim_number"
                                                                    placeholder="Enter SIM Number"
                                                                    component={
                                                                        Input
                                                                    }
                                                                />
                                                            </FormItem>
                                                            <FormItem
                                                                label="IMEI Number"
                                                                invalid={
                                                                    errors.imei_number &&
                                                                    touched.imei_number
                                                                }
                                                                errorMessage={
                                                                    errors.imei_number
                                                                }
                                                            >
                                                                <Field
                                                                    type="number"
                                                                    autoComplete="off"
                                                                    name="imei_number"
                                                                    placeholder="Enter IMEI Number"
                                                                    component={
                                                                        Input
                                                                    }
                                                                />
                                                            </FormItem>
                                                            <FormItem
                                                                label="SIM Serial Number"
                                                                invalid={
                                                                    errors.sim_serial_number &&
                                                                    touched.sim_serial_number
                                                                }
                                                                errorMessage={
                                                                    errors.sim_serial_number
                                                                }
                                                            >
                                                                <Field
                                                                    type="number"
                                                                    autoComplete="off"
                                                                    name="sim_serial_number"
                                                                    placeholder="Enter SIM Serial Number"
                                                                    component={
                                                                        Input
                                                                    }
                                                                />
                                                            </FormItem>
                                                        </>
                                                    )}
                                                </div>
                                            </AdaptableCard>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mt-2 text-right">
                                            <>
                                                <Button
                                                    style={{
                                                        backgroundColor:
                                                            '#4D4D4D',
                                                        color: 'white',
                                                        borderRadius: '2px',
                                                    }}
                                                    type={'button'}
                                                    className="mr-3"
                                                    onClick={() =>
                                                        setShowDialog(false)
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    className="mx-2"
                                                    variant="solid"
                                                    type={'submit'}
                                                    disabled={isSubmitting}
                                                >
                                                    {values?.id
                                                        ? 'Update'
                                                        : 'Add'}
                                                </Button>
                                            </>
                                        </div>
                                    </div>
                                </FormContainer>
                            </Form>
                        )
                    }}
                </Formik>
            </Dialog>
        </>
    )
}

export default LabellingItem
