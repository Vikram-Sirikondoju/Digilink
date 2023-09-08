import React, { useEffect, useCallback, useMemo, useRef } from 'react'
import { Badge, Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye } from 'react-icons/hi'
import {MdModeEdit} from 'react-icons/md'
import { RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri'
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
                //onClick={onView}
            >
               <RiCloseCircleFill className='text-red-600'/>
               
            </span>
        </Tooltip>

        </div>
    )
}

const ActivityTable = () => {

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
            referenceId:"#126382",
            settlementType:"User Group-1",
            fromAccount:"Loream ipsum is simply dummy text of the printing and type setting industry",
            toAccount:"02/23/2023",
            
        },
        {
            referenceId:"#126382",
            settlementType:"User Group-2",
            fromAccount:"Loream ipsum is simply dummy text of the printing and type setting industry",
            toAccount:"02/23/2023",
        },
        {
            referenceId:"#126382",
            settlementType:"User Group-3",
            fromAccount:"Loream ipsum is simply dummy text of the printing and type setting industry",
            toAccount:"02/23/2023",
        },
        {
            referenceId:"#126382",
            settlementType:"User Group-3",
            fromAccount:"Loream ipsum is simply dummy text of the printing and type setting industry",
            toAccount:"02/23/2023",
        },
        {
            referenceId:"#126382",
            settlementType:"User Group-3",
            fromAccount:"Loream ipsum is simply dummy text of the printing and type setting industry",
            toAccount:"02/23/2023",
        },

    ]

    const columns = useMemo(
        () => [
            {
                header: 'Actions',
                flex: 1,
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
            {
                header: 'Account ID',
                accessorKey: 'referenceId',
            },
            {
                header: 'User',
                accessorKey: 'settlementType',
                
               
            },
            {
                header: 'Activity',
                accessorKey: 'fromAccount',
                
               
            },
            {
                header: 'Date & Time',
                accessorKey: 'toAccount',
                
               
            },
           
            // {
            //     header: 'Status',
            //     accessorKey: 'status',
               
            //     cell: (props) => {
            //         return (
            //             <div className="flex items-center">
            //                 <Badge
            //                     className={ItemStatusColor[0].dotClass}
            //                 />
            //                 <span
            //                     className={`ml-2 rtl:mr-2 capitalize font-semibold ${ItemStatusColor[0].textClass}`}
            //                 >
            //                     {ItemStatusColor[0].label}
            //                 </span>
            //             </div>
            //         )
            //     },
            // }
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

export default ActivityTable

