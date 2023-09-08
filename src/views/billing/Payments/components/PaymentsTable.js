import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { Badge, Button, DatePicker, Dialog, Input, Select, Steps, TimeInput, Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye } from 'react-icons/hi'
import { MdModeEdit } from 'react-icons/md'
import { RiPercentFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import cloneDeep from 'lodash/cloneDeep'

import { getOrders, setTableData, getOrderPayment } from '../store/dataSlice'
// import {
//     setSelectedRows,
//     addRowItem,
//     removeRowItem,
//     setDeleteMode,
//     setSelectedRow,
// } from '../../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { Link, useNavigate } from 'react-router-dom'

import {
    setSelectedRows,
    addRowOrder,
    removeRowOrder,
    setDeleteMode,
    setSelectedRow,
} from '../store/stateSlice'
import StepItem from 'components/ui/Steps/StepItem'

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

const ItemColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        navigate(`/app/sales/Item-details/${row.id}`)
    }, [navigate, row])

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            onClick={onView}
        >
            #{row.id}
        </span>
    )
}
const PaymentsTable = () => {
    const [open, setOpen] = useState(false);
    const [percentPopUp, setePrcentPopUp] = useState(false)
    const [edit, setEdit] = useState(false)
    const [invoicePopUp, setInvoicePopUp] = useState(false)
    const [showPaid, setShowPaid] = useState()
    const handleToClose = () => {
        setOpen(false);
    };
    const tableRef = useRef(null)
    const ActionColumn = ({ row }) => {

        const dispatch = useDispatch()

        const { textTheme } = useThemeClass()
        const navigate = useNavigate()

        const onDelete = () => {
            dispatch(setDeleteMode('single'))
            dispatch(setSelectedRow([row.id]))
        }


        const onView = useCallback(() => {
            navigate(`/app/sales/Item-details/${row.id}`)
        }, [navigate, row])



        return (
            <div className="flex text-lg">
                <Tooltip title="Edit">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                        onClick={() => setOpen(true)}
                    >
                        <HiOutlineEye />
                    </span>
                </Tooltip>
                <Tooltip title="Edit">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                        onClick={() => setePrcentPopUp(true)}
                    >
                        <RiPercentFill style={{ color: "gray" }} />

                    </span>
                </Tooltip>
                <Tooltip title="Edit">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                        onClick={() => setEdit(true)}
                    >
                        <MdModeEdit />
                    </span>
                </Tooltip>

            </div>
        )
    }

    const dispatch = useDispatch()
    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.paymentList.data.tableData
        )
        const loading = useSelector((state) => state.paymentList.data.loading)
        
        const data = useSelector((state) => state.paymentList.data.ItemList)

    const fetchData = useCallback(() => {
        dispatch(getOrderPayment())
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
            totalItemValue: "1469.82 USD"
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
            totalItemValue: "1469.82 USD"
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
            totalItemValue: "1469.82 USD"
        },

    ]

    const columns = useMemo(
        () => [
            {
                header: 'Actions',
                id: 'action',
                flex: 1,
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
            {
                header: 'CUSTOMER ID',
                accessorKey: 'relCustId',
            },
            {
                header: 'PAYMENT MODE',
                accessorKey: 'payMode',


            },
            {
                header: 'CUSTOMER NAME',
                accessorKey: 'relCustId',


            },
            {
                header: 'DATE & TIME',
                accessorKey: 'payDttime',


            },
            {
                header: 'INVOICE ID',
                accessorKey: 'invoicesId',
                cell: (props) => {
                    
                    console.log(props)
                    return (
                        <div>
                            <span className='text-blue-500 text-sm'
                                onClick={() => setInvoicePopUp(true)}
                            >{props.row.original.invoicesId}

                            </span>
                        </div>
                    )
                }

            },
            {
                header: 'AMOUNT',
                accessorKey: 'payAmt',


            },
            {
                header: 'REFERENCE ID',
                accessorKey: 'relMnoId',


            },
            {
                header: 'STATUS',
                accessorKey: 'payStatus',

                cell: (props) => {
                    return (
                        <div className="flex items-center">
                            <Badge
                                className={ItemStatusColor[0].dotClass}
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${ItemStatusColor[0].textClass}`}
                            >
                                {ItemStatusColor[0].label}
                            </span>
                        </div>
                    )
                },
            }
        ],
        []
    )


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
    const statusOptions = [
        {
            label: "Generated",
            value: "generated"
        },
        {
            label: "Paid",
            value: "paid"
        }
    ]
    const closeStatusDialog = () => {
        setShowPaid('')
        setEdit(false)
    }

    return (
        <>
            <div>
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
                    selectable
                />
            </div>

            {/* edit popup start here  */}

            <div className='bg-scroll '>
                <Dialog isOpen={open} onClose={() => setOpen(false)}
                    height="90%"
                    width="50%"
                >
                    <div >
                        <h6 className='mt-12 bg-gray-100 p-4 text-black  font-bold'>Payment Info</h6>

                        <Steps className=' p-4' vertical current={"step"}>

                            <Steps.Item title="payment Started" />
                            <Steps.Item title="Payment Received by Operator Name" />
                            <Steps.Item title="Purchase Confirmed" />
                        </Steps>


                    </div>
                    <div className='px-6 text-black'>
                        <div className='flex justify-between'>
                            <p>Trnsaction ID</p>
                            <p>308217987455</p>
                        </div>

                        <div className='flex justify-between mt-2'>
                            <p>Transaction To: Operator Name /ID</p>
                            <p>367430974235@fbe</p>
                        </div>
                        <div className='flex justify-between  mt-2'>
                            <p>Status:</p>
                            <p>Success</p>
                        </div>
                    </div>

                    <div className='mt-6'>
                        <h6 className='bg-gray-100 p-4 text-black  font-bold'>Order Details</h6>


                        <div className='px-6 mt-6 text-black'>
                            <div className='flex justify-between'>
                                <p>Order ID:</p>
                                <p>#OD101567</p>
                            </div>

                            <div className='flex justify-between mt-2'>
                                <p>Order Details:</p>
                                <p>Amazon Echo show with Fire TV...</p>
                            </div>
                            <div className='flex justify-between  mt-2'>
                                <p>Order value:</p>
                                <p>16058.75 USD</p>
                            </div>
                            <div className='flex justify-between  mt-2'>
                                <p>Quantity of order:</p>
                                <p>300 units</p>
                            </div>
                            <div className='flex justify-between  mt-2'>
                                <p>Date of order:</p>
                                <p>22/12/2022</p>
                            </div>
                            <div className='flex justify-between  mt-2'>
                                <p>Delivery address:</p>
                                <p>2972 Westheimer Rd. Santa Ana, Illinois 85486 </p>
                            </div>
                        </div>

                    </div>
                </Dialog>
            </div>



            <div>
                <Dialog isOpen={percentPopUp} onClose={() => setePrcentPopUp(false)}
                >
                    <div className='mt-12 bg-gray-100 p-4 text-black  font-bold '>         Distrubution Of Payement          </div>

                    <div className=' p-6  '>

                        <div className='flex justify-between text-black ' >
                            <p>Invoice ID:</p>
                            <p>INV96662</p>

                        </div>

                        <div className='flex justify-between my-2 text-black'>
                            <p>Total Amount:</p>
                            <p>4824.91 USD</p>
                        </div>

                        <div className='flex justify-between my-2 text-black'>
                            <p>Operator:</p>
                            <p>2429.46 USD</p>
                        </div>

                        <div className='flex justify-between my-2 text-black'>
                            <p>Provider:</p>
                            <p>1809.95 USD</p>
                        </div>

                        <div className='flex justify-between my-2 text-black'>
                            <p>Partner:</p>
                            <p>2.43 USD</p>
                        </div>

                        <div className='flex justify-between my-2 text-black'>
                            <p>Tax:</p>
                            <p>461.60 USD</p>
                        </div>

                        <div className='flex justify-between my-2 text-black'>
                            <p>Cashback:</p>
                            <p>121.47USD</p>
                        </div>

                    </div>
                </Dialog>

            </div>

            {/* edit popup start here  */}



            <Dialog
                isOpen={edit}
                onClose={() => setEdit(false)}


            >
                <div className='text-slate-900'>
                    <h6>Change Status</h6>
                    <hr className='text-gray mb-3 mt-3' />
                    <label className='mb-2'>Update Status</label>
                    <Select className='mt-2 text-slate-900'
                        // placeholder="Select Parent Account"
                        options={statusOptions}
                        value={statusOptions.filter(e => e.value === showPaid)}
                        onChange={(e) => setShowPaid(e.value)}
                    />
                </div>
                {showPaid === "paid" &&
                    <>
                        <div className='mb-4 mt-6 text-slate-900'>
                            <label>Payement Reference ID</label>
                            <Input placeholder="Enter Reference Id" className='mt-2' />
                        </div>
                        <div className='mb-4 mt-6 text-slate-900'>
                            <label>Payement Mode</label>
                            <Input placeholder="Selet Mode Of Payment" className='mt-2' />
                        </div>

                        <div className='flex mt-6 text-slate-900'>
                            <div>
                                <label> Date</label>
                                <DatePicker className='mt-2' />
                            </div>
                            <div className='w-56 ml-3 text-slate-900'>
                                <label> Time</label>
                                <TimeInput className='mt-2' />
                            </div>
                        </div>


                    </>
                }
                <hr className='1px solid gray mt-6 mb-5' />
                <div className='text-end mt-3'>
                    <Button className='mr-3' onClick={closeStatusDialog}>Cancel</Button>
                    <Button variant='solid'>Update</Button>

                </div>


            </Dialog>


            {/* invoice id popup start here  */}



            <div>
                <Dialog className='snap-y' isOpen={invoicePopUp} onClose={() => setInvoicePopUp(false)}
                    // height={"70%"}
                    width="w-98vw"
                >
                    <p className='mt-16 mx-6'> <span className='bg-gray-200 p-4 font-bold text-black'>Bill</span></p>

                    <div className='flex justify-between '>
                        <div className='mt-6 ml-6 text-black'>
                            <p className='text-black font-bold '>Bill Detail</p>
                            <p>Issue Date: June 1,2023</p>
                            <p>Bill ID: IHV93N674</p>
                            <p>Order ID:5967654874504</p>
                        </div>
                        <div className='mt-6 ml-6 text-black truncate'>
                            <p className='text-black font-bold '>Bill To</p>
                            <p>16/6 Gandhi Street 4,Block E..   </p>
                            <p>Hughing way</p>
                            <p>New city, woland-90067</p>
                        </div>
                        <div className='mt-6 ml-6 text-black'>
                            <p className='text-black font-bold '>Company Address:</p>
                            <p>+129876543345</p>
                            <p>Company@info.com</p>
                            <p>www.Company.com</p>
                        </div>

                    </div>

                    <div>
                        <p className='text-black font-bold m-4  '>Bill  Details</p>

                        <div>
                            <DataTable
                                // ref={tableRef}
                                columns={popupcolumns}
                                data={popupdata}
                            // loading={loading}
                            // pagingData={tableData}
                            // onPaginationChange={onPaginationChange}
                            // onSelectChange={onSelectChange}
                            // onSort={onSort}
                            // onCheckBoxChange={onRowSelect}
                            // onIndeterminateCheckBoxChange={onAllRowSelect}
                            // selectable
                            />
                        </div>


                        {/* <div className='flex justify-end gap-48 p-6 font-bold '>
                            <div className='grid text-black gap-4'>
                                <p>Subtotal</p>
                                <p>Overall Tax Amount</p>
                                <p>Discount Amount</p>
                                <p>Shipping Charges</p>
                                <p>Total Payable Amount</p>


                            </div>
                            <div className='text-black grid gap-4'>
                                <p>4239.41 USD</p>
                                <p>461.60 USD</p>
                                <p>- 121.47 USD</p>
                                <p>2.43 USD</p>
                                <p>4824.91 USD</p>

                            </div>

                        </div> */}



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

                    </div>

                </Dialog>

            </div>


        </>

    )
}

export default PaymentsTable

