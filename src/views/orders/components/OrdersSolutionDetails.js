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
export const orderSolutionsOrdersData = [
    {
        itemName: 'Amazon Echo Show 5',
        itemId: '#ID23012',
        quantity: '100 pcs.',
        price:'5,499.00',
        discountCode :'GYUTEW',
        discountInr :'1200.00',
        taxAmount :'5,499.00',
        taxPercApplicable :'2.5% CGST + 2.5% SGST',
        taxAmountPayableInr :'5,44,401.00',
        status: 'In Transit',
       
    },
    {
        itemName: 'Amazon Fire TV Stick Lite',
        itemId: '#ID23013',
        quantity: '200 pcs',
        price:'2,299.00',
        discountCode :'JUYQQW',
        discountInr :'1200.00',
        taxAmount :'4,598.00',
        taxPercApplicable :'2.5% CGST + 2.5% SGST',
        taxAmountPayableInr :'4,59,800.00',
        status: 'In-progress',
       
    },   
    {
        itemName: '2,999 INR Jio data plan',
        itemId: '#ID23014',
        quantity: '100 plans',
        price:'2,999.00',
        discountCode :'N/A',
        discountInr :'1200.00',
        taxAmount :'120.00',
        taxPercApplicable :'2.5% CGST + 2.5% SGST',
        taxAmountPayableInr :'2,99,900.00',
        status: 'Not Activated',
    },   
    {
        itemName: 'Prime Monthly subscriptions',
        itemId: '#ID23015',
        quantity: '100 plans',
        price:'179.00',
        discountCode :'N/A',
        discountInr :'1200.00',
        taxAmount :'30.00',
        taxPercApplicable :'2.5% CGST + 2.5% SGST',
        taxAmountPayableInr :'17,900.00',
        status: 'Not Activated',
       
    },     
]

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

const OrdersSolutionTable = () => {
    const location = useLocation()

    const data = location?.state?.rowData;
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.salesOrderList.data.tableData
    )
    const loading = useSelector((state) => state.salesOrderList.data.loading)

    //const data = useSelector((state) => state.salesOrderList.data.ItemList)

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
    }, [orderSolutionsOrdersData])

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
                header: 'Solution Name',
                accessorKey: 'rel_itemid',
                flex:1,
                cell: () => {
                    return <span>Solution Name</span>
                }
            },
            {
                header: 'Item Name',
                accessorKey: 'rel_itemid',
                flex:1,
               
            },
            {
                header: 'Item ID',
                accessorKey: 'rel_itemid',
                flex:1,
            },
            {
                header: 'Quantity',
                accessorKey: 'ord_sol_qty',
                flex:1,
                cell: (props) => {
                    return <span>{data?.dgl_ord_sols[0]?.ord_sol_qty}</span>
                }
            
            },
            {
                header: 'Price(INR)',
                accessorKey: 'ord_var_amt',
                flex:1,
                
            },
            {
                header: 'Discount Code',
                accessorKey: 'discountCode',
                flex:1,
               
            },
            {
                header: 'Discount (INR)',
                accessorKey: 'discountInr',
                flex:1,
               
            },
            {
                header: 'Tax amount (INR)',
                accessorKey: 'ord_var_tax_amt',
                flex:1,
               
            },{
                header: 'Tax Percentage applicable',
                accessorKey: 'taxPercApplicable',
                flex:1,
               
            },
            {
                header: 'Tax Amount payable(INR)',
                accessorKey: 'taxAmountPayableInr',
                flex:1,
               
            },
            // {
            //     header: 'Status',
            //     accessorKey: 'ord_status',
            //     flex:1,
            //     cell: (props) => {
            //         return <span>{data?.ord_status}</span>
            //     }
            //     // cell: cell => {
            //     //     return (
            //     //         <div className=''>
            //     //             <p>In Transit</p>
            //     //         </div>
            //     //     )
            //     // }
               
            // },
         
           
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
            data={data.dgl_ord_sols?.map(val => val.dgl_ord_solitems)?.flat(1)}
            loading={false}
            pagingData={tableData}
            onPaginationChange={onPaginationChange}
            onSelectChange={onSelectChange}
            onSort={onSort}
        />
    )
}

export default OrdersSolutionTable
