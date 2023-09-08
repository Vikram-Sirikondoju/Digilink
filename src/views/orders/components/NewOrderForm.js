import React, { useEffect, useCallback, useMemo, useRef } from 'react'
import { Badge, Input, Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlineSearch, HiOutlineTrash } from 'react-icons/hi'
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
import { Link, useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import { BiArrowToRight } from 'react-icons/bi'

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

const NewOrderForm = () => {

    const tableRef = useRef(null)
    const searchInput = useRef()

    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.salesOrderList.data.tableData
    )
    const loading = useSelector((state) => state.salesOrderList.data.loading)

    // const data = useSelector((state) => state.salesOrderList.data.ItemList)
    const data = [
        {
            operatorId: 'CX0001',
            operatorTitle: 'Airtel Inc.'
        },
        {
            operatorId: 'CX0001',
            operatorTitle: 'Airtel Inc.'
        },
        {
            operatorId: 'CX0001',
            operatorTitle: 'Airtel Inc.'
        },
        {
            operatorId: 'CX0001',
            operatorTitle: 'Airtel Inc.'
        },
        {
            operatorId: 'CX0001',
            operatorTitle: 'Airtel Inc.'
        },
    ]

    const fetchData = useCallback(() => {
        dispatch(getOrders({ pageIndex, pageSize, sort, query }))
    }, [dispatch, pageIndex, pageSize, sort, query])

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
            //     header: 'Customer ID',
            //     accessorKey: 'operatorId',
            //     flex:1,
            //     cell: (props) => {
            //         ;
            //         const { operatorId } = props.row.original
            //         return (
            //             <Link className='underline decoration-blue-500 text-blue-500' to="/order-details">
            //                 {operatorId}
            //             </Link>
            //         )
            //     },
                
            // },
            {
                header: 'Customer ID',
                accessorKey: 'operatorId',
                
               
            },
            {
                header: 'Customer Name',
                accessorKey: 'operatorTitle',
               
            },
            // {
            //     header: 'Date of Order',
            //     accessorKey: 'globalMno',
               
            
            // },
            // {
            //     header: 'Payment Method',
            //     accessorKey: 'address',
              
               
            // },
            // {
            //     header: 'Order Value',
            //     accessorKey: 'noOfUsers',
              
                
            // },
            // {
            //     header: 'No. of Contracts',
            //     accessorKey: 'noOfContracts',
              
               
            // },
            {
                header: '',
                accessorKey: 'action',
                flex:1,
                cell: (props) => {
                    const { status } = props.row.original
                    return (
                        <BiArrowToRight></BiArrowToRight>
                    )
                },
            },
            // {
            //     header: 'Actions',
            //     flex:1,
            //     id: 'action',
            //     cell: (props) => <ActionColumn row={props.row.original} />,
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
        <> 
            <Input
                ref={searchInput}
                className="lg:w-52"
                size="sm"
                placeholder="Search Customer/Customer ID"
                prefix={<HiOutlineSearch className="text-lg" />}
                // onChange={onEdit}
            />
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
                onCheckBoxChange={onRowSelect}
                onIndeterminateCheckBoxChange={onAllRowSelect}
                // selectable
            />
        </>
    )
}

export default NewOrderForm
