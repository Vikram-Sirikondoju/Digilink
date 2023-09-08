import React, { useEffect, useCallback, useMemo, useRef } from 'react'
import { Badge, Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
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

const ActionColumn = ({ row }) => {
   

    return (
        <div className="text-lg">
        <Tooltip title="Edit">
            <span
                className={`cursor-pointer p-1 text-blue-500 hover:${"textTheme"}`}
                // onClick={onView}
            >
                <MdModeEdit />
               
            </span>
        </Tooltip>

        <Tooltip title="Assign">
            <span
                className={`cursor-pointer p-1  hover:${"textTheme"}`}
                // onClick={onView}
            >
                <AiFillCopy/>
            </span>
        </Tooltip>
        <Tooltip title="View">
            <span
                className={`cursor-pointer p-1 text-blue-500 hover:${"textTheme"}`}
                // onClick={onView}
            >
                <HiOutlineEye />
            </span>
        </Tooltip>
        <Tooltip title="Delete">
            <span
                className="cursor-pointer p-1 text-green-800 hover:text-green-800" 
                // onClick={onDelete}
            >
                <RiCheckboxCircleFill />
            </span>
        </Tooltip>
    </div>
    )
}

const TopProvidersTable = () => {

    // const tableRef = useRef(null)

    // const dispatch = useDispatch()

    // const { pageIndex, pageSize, sort, query, total } = useSelector(
    //     (state) => state.doctypeList.data.tableData
    // )
    // const loading = useSelector((state) => state.doctypeList.data.loading)

    // const data = useSelector((state) => state.doctypeList.data.ItemList)
    // const fetchData = useCallback(() => {
    //     // dispatch(getItems())
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

    const columns = useMemo(
        () => [
            {
                header: 'Company Name',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
          
            {
                header: 'Contact Person Name ',
                accessorKey: 'itemTitle',
                
               
            },
            
           
            {
                header: 'Number Of Contracts',
                accessorKey: 'tp',
               
                cell: (props) => {
                    const { tp } = props.row.original
                    return (
                        <p>{tp?.tpTitle}</p>
                    )
                },
               
            },
            {
                header: 'Commision generated ',
                accessorKey: 'itemTitle',
                
               
            },
            {
                header: 'Email ID ',
                accessorKey: 'itemTitle',
                
               
            },
            {
                header: 'Phone Number ',
                accessorKey: 'itemTitle',
                
               
            },
            {
                header: 'Current Status',
                accessorKey: 'solItemType',
               
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
            },
            {
                header: 'Actions ',
                accessorKey: 'itemTitle',
                
               
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
            // data={data}
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

export default TopProvidersTable


























// TopProvidersTable