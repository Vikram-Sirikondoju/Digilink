import React, { useEffect, useCallback, useMemo, useRef } from 'react'
import { Badge, Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye } from 'react-icons/hi'
import {MdModeEdit} from 'react-icons/md'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import {IoMdDownload} from 'react-icons/io'

import {AiFillCopy} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
// import { getOrders, setTableData } from '../../store/dataSlice'
// import {
//     setSelectedRows,
//     addRowItem,
//     removeRowItem,
//     setDeleteMode,
//     setSelectedRow,
// } from '../../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { Link, useNavigate } from 'react-router-dom'


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



const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()


    const onView = useCallback(() => {
        navigate(`/app/sales/Item-details/${row.id}`)
    }, [navigate, row])

    return (
        <div className="text-lg">
            <Tooltip title="Edit">
                <span
                    className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                >
                    <MdModeEdit />
                </span>
            </Tooltip>
            <Tooltip title="Edit">
            <span
                className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                //onClick={onView}
            >
               <IoMdDownload className='text-red-800'/>
               
            </span>
        </Tooltip>

        </div>
    )
}

const SettlementIdTable = () => {

     const tableRef = useRef(null)

    // const dispatch = useDispatch()

    // const { pageIndex, pageSize, sort, query, total } = useSelector(
    //     (state) => state.myaccountList.data.tableData
    // )
    // const loading = useSelector((state) => state?.myaccountList?.data?.loading)

    // const data = useSelector((state) => state?.myaccountList?.data?.ItemList)
    // const fetchData = useCallback(() => {
    //     dispatch(getOrders())
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

    const data = [
        {
            referenceId:"REF3681655",
            settlementType:"online",
            fromAccount:"ABC3451655",
            toAccount:"def3454681655",
            settlementDateTime:"15 May 2020, 10pm",
            paymentDateTime:"15 May 2020, 10pm",
            listOfBills:"BID2345, BID3456, BID6789,+",
            amount:"242.9 USD"
        },
        {
            referenceId:"REF3681655",
            settlementType:"online",
            fromAccount:"ABC3451655",
            toAccount:"def3454681655",
            settlementDateTime:"15 May 2020, 10pm",
            paymentDateTime:"15 May 2020, 10pm",
            listOfBills:"BID2345, BID3456, BID6789,+",
            amount:"242.9 USD"
        },
        {
            referenceId:"REF3681655",
            settlementType:"online",
            fromAccount:"ABC3451655",
            toAccount:"def3454681655",
            settlementDateTime:"15 May 2020, 10pm",
            paymentDateTime:"15 May 2020, 10pm",
            listOfBills:"BID2345, BID3456, BID6789,+",
            amount:"242.9 USD"
        },
        {
            referenceId:"REF3681655",
            settlementType:"online",
            fromAccount:"ABC3451655",
            toAccount:"def3454681655",
            settlementDateTime:"15 May 2020, 10pm",
            paymentDateTime:"15 May 2020, 10pm",
            listOfBills:"BID2345, BID3456, BID6789,+",
            amount:"242.9 USD"
        },
        {
            referenceId:"REF3681655",
            settlementType:"online",
            fromAccount:"ABC3451655",
            toAccount:"def3454681655",
            settlementDateTime:"15 May 2020, 10pm",
            paymentDateTime:"15 May 2020, 10pm",
            listOfBills:"BID2345, BID3456, BID6789,+",
            amount:"242.9 USD"
        },
        {
            referenceId:"REF3681655",
            settlementType:"online",
            fromAccount:"ABC3451655",
            toAccount:"def3454681655",
            settlementDateTime:"15 May 2020, 10pm",
            paymentDateTime:"15 May 2020, 10pm",
            listOfBills:"BID2345, BID3456, BID6789,+",
            amount:"242.9 USD"
        },
        
    ]

    const columns = useMemo(
        () => [
            {
                header: 'REFERENCE ID',
                accessorKey: 'referenceId',
            },
            {
                header: 'SETTLEMENT TYPE',
                accessorKey: 'settlementType',
                
               
            },
            {
                header: 'FROM ACCOUNT',
                accessorKey: 'fromAccount',
                
               
            },
            {
                header: 'TO ACCOUNT',
                accessorKey: 'toAccount',
                
               
            },
            {
                header: 'SETTLEMENT DATE & TIME',
                accessorKey: 'settlementDateTime',
                
               
            },
            {
                header: 'PAYMENT DATE AND TIME',
                accessorKey: 'paymentDateTime',
                
               
            },
            {
                header: 'LIST OF BILLS',
                accessorKey: 'listOfBills',
                
               
            },
            {
                header: 'AMOUNT',
                accessorKey: 'amount',
                
               
            },
            {
                header: 'Status',
                accessorKey: 'status',
               
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
            ref={tableRef}
            columns={columns}
            data={data}
            // loading={loading}
            // pagingData={tableData}
            // onPaginationChange={onPaginationChange}
            // onSelectChange={onSelectChange}
            // onSort={onSort}
            // onCheckBoxChange={onRowSelect}
            // onIndeterminateCheckBoxChange={onAllRowSelect}
            // selectable
        />
    )
}

export default SettlementIdTable

