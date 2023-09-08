import React, { useEffect, useCallback, useMemo, useRef } from 'react'
import { Badge, Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, setTableData } from '../store/dataSlice'
import {
    setSelectedRows,
    addRowOrder,
    removeRowOrder,
    setDeleteMode,
    setSelectedRow,
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'

const OrderStatusColor = {
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


const OrderColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        navigate(`/app/sales/Order-details/${row.id}`)
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

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onDelete = () => {
        dispatch(setDeleteMode('single'))
        dispatch(setSelectedRow([row.id]))
    }

    const onView = useCallback(() => {
        navigate(`/app/sales/Order-details/${row.id}`)
    }, [navigate, row])

    return (
        <div className="flex justify-end text-lg">
            <Tooltip title="View">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onView}
                >
                    <HiOutlineEye />
                </span>
            </Tooltip>
            <Tooltip title="Delete">
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    onClick={onDelete}
                >
                    <HiOutlineTrash />
                </span>
            </Tooltip>
        </div>
    )
}


const orderShipAndDel = [
    {
        workOrderId : "#W023012",
        wareHouse : "Warehouse-1",
        packageDetails : "Amazon Echo Show",
        shippingPatner : "Showzee Retailers",
        trackingId : "#231200001",
        dispatchDate : "24th December 2022(expected)",
        estimatedTimeOfDelivery : "Not Yet Delivered",
        deliveryStatus : "Not Yet Delivered"
    },
    {
        workOrderId : "#W023013",
        wareHouse : "Warehouse-2",
        packageDetails : "Amazon Fire TV Stick Lite",
        shippingPatner : "Hellfire Retailers",
        trackingId : "#231200002",
        dispatchDate : "23rd December 2022",
        estimatedTimeOfDelivery : "Not Yet Delivered",
        deliveryStatus : "shipped"
    }
]

const OrdersShipAndDelivery = () => {
    const location = useLocation()

    const dataItem = location?.state?.rowData;
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.salesOrderList.data.tableData
    )
    const loading = useSelector((state) => state.salesOrderList.data.loading)

    const data = useSelector((state) => state.salesOrderList.data.ItemList)

    const fetchData = useCallback(() => {
        dispatch(getOrders())
    }, [])
    
    useEffect(() => {
        dispatch(setSelectedRows([]))
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const columns = useMemo(
        () => [
            // {
            //     header: 'Actions',
            //     flex:1,
            //     id: 'action',
            //     cell: (props) => <ActionColumn row={props.row.original} />,
            // },
            // {
            //     header: 'Order ID',
            //     accessorKey: 'ordId',
            //     flex:1,
            //     cell: (props) => {
                    
            //         const { ordId } = props.row.original
            //         return (
            //             <Link className='underline decoration-blue-500 text-blue-500' to="/order-details" state={{rowData:props.row.original} }>
            //                 {ordId}
            //             </Link>
            //         )
            //     },
                
            // },
            {
                header: 'Work Order ID',
                accessorKey: 'wo_desc',
                flex:1,
               
            },
            {
                header: 'Warehouse',
                accessorKey: 'wh_id',
                flex:1,
            },
            {
                header: 'Package Details',
                accessorKey: 'package_id',
                flex:1,
                cell: (props) => {
                    const prop = props.row.original
                    return <div>{prop.dgl_work_order_packaging?.map(val => val?.package_id)?.join(",")}</div>
                }
            
            },
            {
                header: 'Shipping Partner',
                accessorKey: 'delivery_partner',
                flex:1,
                cell: (props) => {
                    const prop = props.row.original
                    return <div>{prop.dgl_wo_shippment_details?.delivery_partner}</div>
                }
                
            },
            {
                header: 'Tracking ID',
                accessorKey: 'tracking_number',
                flex:1,
                cell: (props) => {
                    const prop = props.row.original
                    return <div>{prop.dgl_wo_shippment_details?.tracking_number}</div>
                }
               
            },
            {
                header: 'Dispatch Date',
                accessorKey: 'dispatchdate',
                flex:1,
                cell: (props) => {
                    const prop = props.row.original
                    return <div>{prop.dgl_wo_shippment_details?.dispatchdate}</div>
                }
               
            },
            {
                header: 'Estimated Time Of Delivery',
                accessorKey: 'estimatedTimeOfDelivery',
                flex:1,
               
            },{
                header: 'Status',
                accessorKey: 'wo_shippment_status',
                flex:1,
                cell: (props) => {
                    const prop = props.row.original
                    return <div>{prop.dgl_wo_shippment_details?.wo_shippment_status}</div>
                }
            }           
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

    const onRowSelect = (checked, row) => {
        if (checked) {
            dispatch(addRowOrder([row.id]))
        } else {
            dispatch(removeRowOrder(row.id))
        }
    }

    const onAllRowSelect = useCallback(
        (checked, rows) => {
            if (checked) {
                const originalRows = rows.map((row) => row.original)
                const selectedIds = []
                originalRows.forEach((row) => {
                    selectedIds.push(row.id)
                })
                dispatch(setSelectedRows(selectedIds))
            } else {
                dispatch(setSelectedRows([]))
            }
        },
        [dispatch]
    )

    return (
        <DataTable
            ref={tableRef}
            columns={columns}
            data={dataItem?.dgl_wo_infos}
            loading={false}
            pagingData={tableData}
            onPaginationChange={onPaginationChange}
            onSelectChange={onSelectChange}
            onSort={onSort}
        />
    )
}

export default OrdersShipAndDelivery
