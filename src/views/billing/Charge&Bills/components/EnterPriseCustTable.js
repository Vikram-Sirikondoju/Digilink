import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import {
    Badge,
    Button,
    DatePicker,
    Dialog,
    Input,
    Select,
    TimeInput,
    Tooltip,
} from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { getItems, setTableData, getBillingBill} from '../store/dataSlice'
import {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    setSelectedRow,
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { Link, useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import { MdModeEdit, MdOutlineSend } from 'react-icons/md'
import { AiOutlinePercentage } from 'react-icons/ai'
import { RiCheckboxCircleFill } from 'react-icons/ri'

const ItemStatusColor = {
    0: {
        label: 'Active',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    1: {
        label: 'Submitted',
        dotClass: 'bg-blue-500',
        textClass: 'text-amber-500',
    },
    2: { label: 'Inactive', dotClass: 'bg-red-500', textClass: 'text-red-500' },
}

// const ItemColumn = ({ row }) => {

//     const onView = useCallback(() => {
//         navigate(`/app/sales/Item-details/${row.id}`)
//     }, [navigate, row])

//     return (
//         <span
//             className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
//             onClick={onView}
//         >
//             #{row.id}
//         </span>
//     )
// }

const statusOptions = [
    { label: 'Generated', value: 'generated' },
    { label: 'Paid', value: 'paid' },
]

const EnterPriseCustTable = () => {
    const [changeStatus, setChangeStatus] = useState()
    const [percentPopUp, setPercentPopUp] = useState()
    const [invoicePopUp, setInvoicePopUp] = useState()
    const [actionEdit, setActionEdit] = useState(false)

    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.billing.data.tableData
    )
    const loading = useSelector((state) => state.billing.data.loading)
    const userData = useSelector(
        (state) => state.auth.user
    )
    const data = useSelector((state) => state.billing.data.ItemList)
    const fetchData = useCallback(() => {
        dispatch(getBillingBill({ page: pageIndex - 1, size: pageSize, accId: userData.enterAccount }))
    }, [])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort])

    // useEffect(() => {
    //     if (tableRef) {
    //         tableRef.current?.resetSelected()
    //     }
    // }, [data])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const ActionColumn = ({ row }) => {
        // const dispatch = useDispatch()
        const { textTheme } = useThemeClass()
        // const navigate = useNavigate()

        // const onDelete = () => {
        //     dispatch(setDeleteMode('single'))
        //     dispatch(setSelectedRow([row.id]))
        // }

        // const onView = useCallback(() => {
        //     navigate(`/order-details`)
        // }, [navigate])

        return (
            <div className="flex text-lg">
                <Tooltip title="Edit">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                        onClick={() => setActionEdit(true)}
                    >
                        <MdModeEdit />
                    </span>
                </Tooltip>
                <Tooltip title="Send">
                    <span className={`cursor-pointer p-1 hover:${textTheme}`}>
                        <Link to="/settings-menu-send-notifications">
                            <MdOutlineSend />
                        </Link>
                    </span>
                </Tooltip>
                <Tooltip title="Percentage">
                    <span
                        className={`cursor-pointer p-1 hover:${textTheme}`}
                        onClick={() => setPercentPopUp(true)}
                    >
                        <AiOutlinePercentage />
                    </span>
                </Tooltip>

                <Tooltip title="View">
                    <span
                        className={`cursor-pointer p-1 text-blue-500  hover:${textTheme}`}
                        onClick={() => setInvoicePopUp(true)}
                    >
                        <HiOutlineEye />
                    </span>
                </Tooltip>
            </div>
        )
    }

    

    const columns = useMemo(
        () => [
            {
                header: 'Actions',
                id: 'action',
                flex: 1,
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
            {
                header: 'Customer ID',
                accessorKey: 'relCustId',
            },
            {
                header: 'Customer Category',
                accessorKey: 'relCustId',
            },
            {
                header: 'Bill ID',
                accessorKey: 'id',
                cell: (props) => {
                    return (
                        <div className="d-flex align-items-center">
                            <Link to="/billing-enterprise-invoice" state={{rowData:props.row.original.id}}>
                                <span
                                    className={`ml-2 rtl:mr-2 capitalize font-semibold text-blue-500 cursor-pointer`}
                                >
                                    {props.row.original.id}
                                </span>
                            </Link>
                        </div>
                    )
                }
            },
            {
                header: 'Bill Date & Time',
                accessorKey: 'createdDate',
            },
            {
                header: 'Due Date',
                accessorKey: 'payDttime',
            },
            {
                header: 'Amount',
                accessorKey: 'payAmt',
            },
            {
                header: 'Payment Date & TIme',
                accessorKey: 'payDttime',
            },
            {
                header: 'Reference ID',
                accessorKey: 'relMnoId',
            },
            {
                header: 'Current Status',
                accessorKey: 'billStatus',
                cell: (props) => {
                    return (
                        <div className="flex items-center">
                            {/* <Badge
                                className={ItemStatusColor[0].dotClass}
                            /> */}
                            {props.row.original.billStatus == 'UN_PAID' ? (<span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${ItemStatusColor[2].textClass}`}
                            >
                                {props.row.original.billStatus}
                            </span>):(<span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${ItemStatusColor[0].textClass}`}
                            >
                                {props.row.original.billStatus}
                            </span>
     
      )}
                        </div>
                    )
                },
            },
        ],
        []
    )

    const popupdata = [
        {
            itemId: "#ID567",
            item: "Sensor",
            description: "Counting Steps",
            unitPrice: "12.15 USD",
            qunatity: "100",
            amount: "1214.73 USD",
            taxComponent1: "139.69 USD",
            taxComponent2: "115.40 USD",
            totalItemValue : "1469.82 USD"
        },
        {
            itemId: "#ID567",
            item: "Sensor",
            description: "Counting Steps",
            unitPrice: "12.15 USD",
            qunatity: "100",
            amount: "1214.73 USD",
            taxComponent1: "139.69 USD",
            taxComponent2: "115.40 USD",
            totalItemValue : "1469.82 USD"
        },
        {
            itemId: "#ID567",
            item: "Sensor",
            description: "Counting Steps",
            unitPrice: "12.15 USD",
            qunatity: "100",
            amount: "1214.73 USD",
            taxComponent1: "139.69 USD",
            taxComponent2: "115.40 USD",
            totalItemValue : "1469.82 USD"
        },

    ]

    const popupcolumns = useMemo(
        () => [

            {
                header: 'ITEM ID',
                accessorKey: 'itemId',
            },
            {
                header: 'ITEM',
                accessorKey: 'item',
            },
            {
                header: 'DESCRIPTION',
                accessorKey: 'description',
            },
            {
                header: 'UNIT PRICE',
                accessorKey: 'unitPrice',
            },
            {
                header: 'QUANTITY',
                accessorKey: 'qunatity',
            },
            {
                header: 'AMOUNT',
                accessorKey: 'amount',
            },
            {
                header: 'TAX COMPONENT 1',
                accessorKey: 'taxComponent1',
            },
            {
                header: 'TAX COMPONENT 2',
                accessorKey: 'taxComponent2',
            },
            {
                header: 'TOTAL ITEM VALUE',
                accessorKey: 'totalItemValue',
            },

        ],
        []
    )

    

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    // const onRowSelect = (checked, row) => {
    //     if (checked) {
    //         dispatch(addRowItem([row.id]))
    //     } else {
    //         dispatch(removeRowItem(row.id))
    //     }
    // }

    // const onAllRowSelect = useCallback(
    //     (checked, rows) => {
    //         if (checked) {
    //             const originalRows = rows.map((row) => row.original)
    //             const selectedIds = []
    //             originalRows.forEach((row) => {
    //                 selectedIds.push(row.id)
    //             })
    //             dispatch(setSelectedRows(selectedIds))
    //         } else {
    //             dispatch(setSelectedRows([]))
    //         }
    //     },
    //     [dispatch]
    // )

    const onCloseStatusDialog = () => {
        setChangeStatus('')
        setActionEdit(false)
    }

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
                // onCheckBoxChange={onRowSelect}
                // onIndeterminateCheckBoxChange={onAllRowSelect}
                // selectable
            />

            <Dialog
                isOpen={actionEdit}
                onClose={onCloseStatusDialog}
                width="30%"
            >
                <div>
                    <h5 className="pb-2 border-b-2">Change Status</h5>
                    <div className="mt-4">
                        <label>Update Status</label>
                        <Select
                            className="mt-1"
                            placeholder="Select Parent Account"
                            options={statusOptions}
                            value={statusOptions.filter(
                                (e) => e.value === changeStatus
                            )}
                            onChange={(e) => setChangeStatus(e.value)}
                        />
                    </div>
                    {changeStatus === 'paid' && (
                        <>
                            <div className="mt-4">
                                <div>
                                    <label>Payment Reference ID</label>
                                    <Input
                                        className="mt-1"
                                        placeholder="Enter Reference ID"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label>Payment Mode</label>
                                    <Select
                                        className="mt-1"
                                        placeholder="Enter Mode Of Payment"
                                    />
                                </div>
                                <div className="flex gap-4 mt-4">
                                    <div className="w-48">
                                        <label>Date</label>
                                        <DatePicker
                                            className="mt-1"
                                            placeholder="Select Date"
                                        />
                                    </div>
                                    <div className="w-48">
                                        <label>Time</label>
                                        <TimeInput
                                            className="mt-1"
                                            placeholder="Select Time"
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    <div className="mt-8 flex gap-4 justify-end ">
                        <Button onClick={onCloseStatusDialog}>Cancel</Button>
                        <Button
                            disabled={changeStatus === 'paid' ? false : true}
                            variant="solid"
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </Dialog>
            <Dialog
                isOpen={percentPopUp}
                onClose={() => setPercentPopUp(false)}
                width='30%'
            >
                <div className="mt-12 bg-gray-100 p-4 text-black  font-bold ">
                    Distrubution Of Payement
                </div>
                <div className="p-6">
                    <div className="flex justify-between text-black ">
                        <p>Invoice ID:</p>
                        <p>INV96662</p>
                    </div>

                    <div className="flex justify-between my-2 text-black">
                        <p>Total Amount</p>
                        <p>4824.91 USD</p>
                    </div>

                    <div className="flex justify-between my-2 text-black">
                        <p>Operator</p>
                        <p>2429.46 USD</p>
                    </div>

                    <div className="flex justify-between my-2 text-black">
                        <p>Provider</p>
                        <p>1809.95 USD</p>
                    </div>

                    <div className="flex justify-between my-2 text-black">
                        <p>Partner</p>
                        <p>2.43 USD</p>
                    </div>

                    <div className="flex justify-between my-2 text-black">
                        <p>Tax</p>
                        <p>461.60 USD</p>
                    </div>

                    <div className="flex justify-between my-2 text-black">
                        <p>Cashback</p>
                        <p>121.47USD</p>
                    </div>
                </div>
            </Dialog>
            <Dialog isOpen={invoicePopUp} onClose={() => setInvoicePopUp(false)}
                    width="90%"
                >
                    <div className='mt-4' >
                    <p className='mx-6'> <span className='bg-gray-200 p-4 font-bold text-black'>Bill</span></p>
                    <div className='flex justify-between '>
                        <div className='mt-6 ml-6 text-black'>
                            <p className='text-black font-bold '>Bill Detail</p>
                            <p>Issue Date: June 1,2023</p>
                            <p>Bill ID: IHV93N674</p>
                            <p>Order ID:5967654874504</p>
                        </div>
                        <div className='mt-6 ml-6 text-black'>
                            <p className='text-black font-bold '>Bill To</p>
                            <p>Issue Date: June 1,2023</p>
                            <p>Bill ID: IHV93N674</p>
                            <p>Order ID:5967654874504</p>
                        </div>
                        <div className='mt-6 ml-6 text-black'>
                            <p className='text-black font-bold '>Company Address:</p>
                            <p>Issue Date: June 1,2023</p>
                            <p>Bill ID: IHV93N674</p>
                            <p>Order ID:5967654874504</p>
                        </div>

                    </div>

                    <div>
                        <p className='text-black font-bold m-4 '>Bill Details</p>

                        <div>
                            <DataTable
                                // ref={tableRef}
                                columns={popupcolumns}
                                data={data}
                            loading={loading}
                            pagingData={tableData}
                            onPaginationChange={onPaginationChange}
                            onSelectChange={onSelectChange}
                            onSort={onSort}
                            // onCheckBoxChange={onRowSelect}
                            // onIndeterminateCheckBoxChange={onAllRowSelect}
                            // selectable
                            />
                        </div>
                        <div className='grid grid-cols-3 mt-4'>
                            <div className='col-span-2'>

                            </div>
                            <div>
                                <div className='flex justify-between my-1'>
                                    <p className='text-black font-semibold'>Subtotal </p>
                                    <div className=''>
                                        <p className='text-black font-semibold'>4239.41 USD</p>
                                    </div>
                                </div>
                                <div className='flex justify-between my-1'>
                                    <p className='text-black font-semibold'>Overall Tax Amount </p>
                                    <div className=''>
                                        <p className='text-black font-semibold'>461.60 USD</p>
                                    </div>
                                </div>
                                <div className='flex justify-between my-1'>
                                    <p className='text-black font-semibold'>Discount Amount</p>
                                    <div className=''>
                                        <p className='text-black font-semibold'>- 121.47 USD</p>
                                    </div>
                                </div>
                                <div className='flex justify-between my-1'>
                                    <p className='text-black font-semibold'>Shipping Charges</p>
                                    <div className=''>
                                        <p className='text-black font-semibold'>2.43 USD</p>
                                    </div>
                                </div>
                                <div className='flex justify-between my-1'>
                                    <p className='text-black font-semibold'>Total Payable Amount </p>
                                    <div className=''>
                                        <p className='text-black font-semibold'>4824.91 USD</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className='flex justify-end  p-6 gap-48'>
                            <div className='text-black'>
                                <p>Subtotal</p>
                                <p>Overall Tax Amount</p>
                                <p>Discount Amount</p>
                                <p>Shipping Charges</p>
                                <p>Total Payable Amount</p>
                            </div>
                            <div className='text-black'>
                                <p>4239.41 USD</p>
                                <p>461.60 USD</p>
                                <p>- 121.47 USD</p>
                                <p>2.43 USD</p>
                                <p>4824.91 USD</p>
                            </div>
                        </div> */}
                    </div>
                    </div>
                </Dialog>
        </>
    )
}

export default EnterPriseCustTable
