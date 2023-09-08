import React, { useEffect, useCallback, useMemo, useRef } from 'react'
import { Badge, Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { getItems, setTableData } from '../../store/dataSlice'
import {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    setSelectedRow,
} from '../../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import { MdModeEdit } from 'react-icons/md'
import { AiFillCopy } from "react-icons/ai"
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



const DiscOrdersTable = () => {

    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    // const tableRef = useRef(null)

    // const dispatch = useDispatch()

    // const { pageIndex, pageSize, sort, query, total } = useSelector(
    //     (state) => state.doctypeList.data.tableData
    // )
    // const loading = useSelector((state) => state.doctypeList.data.loading)

    // const data = useSelector((state) => state.doctypeList.data.ItemList)
    // const fetchData = useCallback(() => {
    //     dispatch(getItems())
    // }, [])

    // useEffect(() => {
    //     dispatch(setSelectedRows([]))
    //     fetchData()
    // }, [dispatch, fetchData, pageIndex, pageSize, sort])

    // useEffect(() => {
    //     if (tableRef) {
    //         tableRef.current?.resetSelected()
    //     }
    // }, [data])

    // const tableData = useMemo(
    //     () => ({ pageIndex, pageSize, sort, query, total }),
    //     [pageIndex, pageSize, sort, query, total]
    // )

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
            <div className="text-lg">
            <Tooltip title="View">
                <span
                    className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                    onClick={''}
                >
                    <HiOutlineEye />
                </span>
            </Tooltip>
        </div>
        )
    }

    const data = [
        {
            orderId : '7543211565121',
            prodTitle : 'I Phone 13 pro',
            discType : 'CashBack',
            appLiedCode : 'AUTO 10% OFF',
            discAmountCreds : '$15,50,000.00',
            status : 'Delivered'
        },
        {
            orderId : '7895565464666',
            prodTitle : 'I Phone 13 pro',
            discType : 'Offers',
            appLiedCode : 'AUTO 10% OFF',
            discAmountCreds : '$15,50,000.00',
            status : 'In Transit'
        },
        {
            orderId : '7852165456515',
            prodTitle : 'I Phone 13 pro',
            discType : 'CashBack',
            appLiedCode : 'AUTO 10% OFF',
            discAmountCreds : '$15,50,000.00',
            status : 'Delivered'
        },
        {
            orderId : '7895565464666',
            prodTitle : 'I Phone 13 pro',
            discType : 'Offers',
            appLiedCode : 'AUTO 10% OFF',
            discAmountCreds : '$15,50,000.00',
            status : 'In Transit'
        },
        {
            orderId : '7852165456515',
            prodTitle : 'I Phone 13 pro',
            discType : 'CashBack',
            appLiedCode : 'AUTO 10% OFF',
            discAmountCreds : '$15,50,000.00',
            status : 'Delivered'
        },
        {
            orderId : '7895565464666',
            prodTitle : 'I Phone 13 pro',
            discType : 'Offers',
            appLiedCode : 'AUTO 10% OFF',
            discAmountCreds : '$15,50,000.00',
            status : 'In Transit'
        },
    ]

    const columns = useMemo(
        () => [
            {
                header: 'Actions',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        
          
            {
                header: 'Order ID',
                accessorKey: 'orderId',
                
               
            },
            {
                header: 'Product Title',
                accessorKey: 'prodTitle',
            },
            
            
           
            {
                header: 'Discount Type',
                accessorKey: 'discType',
               
            },
            {
                header: 'Applied Code',
                accessorKey: 'appLiedCode',
               
            },
            {
                header: 'Discounted Amount/Credits',
                accessorKey: 'discAmountCreds',
               
            },
            {
                header: 'Current Status',
                accessorKey: 'status',
               
                cell: (props) => {
                    return (
                        <div className="flex items-center">
                            {/* <Badge
                                className={ItemStatusColor[0].dotClass}
                            /> */}
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${ItemStatusColor[0].textClass}`}
                            >
                                {props.row.original.status}
                            </span>
                        </div>
                    )
                },
            },
         
          
        ],
        []
    )

    // const onPaginationChange = (page) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.pageIndex = page
    //     dispatch(setTableData(newTableData))
    // }

    // const onSelectChange = (value) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.pageSize = Number(value)
    //     newTableData.pageIndex = 1
    //     dispatch(setTableData(newTableData))
    // }

    // const onSort = (sort) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.sort = sort
    //     dispatch(setTableData(newTableData))
    // }

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

    return (
        <DataTable
            // ref={tableRef}
            columns={columns}
            data={data}
            // loading={loading}
            // pagingData={tableData}
            // onPaginationChange={onPaginationChange}
            // onSelectChange={onSelectChange}
            // onSort={onSort}
            // onCheckBoxChange={onRowSelect}
            // onIndeterminateCheckBoxChange={onAllRowSelect}
            selectable
        />
    )
}

export default DiscOrdersTable
