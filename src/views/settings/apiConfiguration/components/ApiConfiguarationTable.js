import React, { useEffect, useCallback, useMemo, useRef } from 'react'
import { Badge, Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { setTableData } from '../store/dataSlice'
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
import { MdModeEdit } from 'react-icons/md'
import { AiFillCopy } from "react-icons/ai"
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { getItems } from 'views/accounts/PendingApproval/store/dataSlice'

const ItemStatusColor = {
    0: {
        label: 'Active',
        dotClass: 'bg-black-500',
        textClass: 'text-black-500',
        backgroundColor: 'bg-[#F5F5F5]'
    },
    2: {
        label: 'Submitted',
        dotClass: 'bg-blue-500',
        textClass: 'text-black-500',
        backgroundColor: 'bg-[#F0F7FF]'
    },
    1: { label: 'Inactive', dotClass: 'bg-red-500', textClass: 'text-red-500', backgroundColor: 'bg- #F5F5F5' },
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



const ApiConfigurationTable = ({ actionPermissions }) => {

    // const tableRef = useRef(null)

    // const dispatch = useDispatch()

    // const { pageIndex, pageSize, sort, query, total } = useSelector(
    //     (state) => state.prodCatList.data.tableData
    // )
    // const loading = useSelector((state) => state.prodCatList.data.loading)

    // const data = useSelector((state) => state.prodCatList.data.ItemList)
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
        const disableIconStyle = { color: 'grey', pointerEvents: 'none' }
        const { canAdd, canEdit, canView, canActivate, canClone, canApprove } =
            actionPermissions


        return (
            <div className="text-lg">
                <Tooltip title="Edit" >
                    <span style={canEdit ? null : disableIconStyle} >
                        <Link to="/settings-menu-update-api-configuration" >  <MdModeEdit style={canEdit ? null : disableIconStyle}  className='text-blue-500' /></Link>
                    </span>


                </Tooltip>
            </div>
        )

    }

    const data = [
        {
            apiTitle: 'Configuration1',
            modifiedBy: 'Admin ABC',
            modifiedDate: "21/6/23",
            description: "Lorem ipsum dolor sit amet amet adipiscing vestibulum"
        },
        {
            apiTitle: 'Configuration1',
            modifiedBy: 'Admin ABC',
            modifiedDate: "21/6/23",
            description: "Lorem ipsum dolor sit amet amet adipiscing vestibulum"
        },
        {
            apiTitle: 'Configuration1',
            modifiedBy: 'Admin ABC',
            modifiedDate: "21/6/23",
            description: "Lorem ipsum dolor sit amet amet adipiscing vestibulum"
        },
        {
            apiTitle: 'Configuration1',
            modifiedBy: 'Admin ABC',
            modifiedDate: "21/6/23",
            description: "Lorem ipsum dolor sit amet amet adipiscing vestibulum"
        },
        {
            apiTitle: 'Configuration1',
            modifiedBy: 'Admin ABC',
            modifiedDate: "21/6/23",
            description: "Lorem ipsum dolor sit amet amet adipiscing vestibulum"
        },
        {
            apiTitle: 'Configuration1',
            modifiedBy: 'Admin ABC',
            modifiedDate: "21/6/23",
            description: "Lorem ipsum dolor sit amet amet adipiscing vestibulum"
        },
        {
            apiTitle: 'Configuration1',
            modifiedBy: 'Admin ABC',
            modifiedDate: "21/6/23",
            description: "Lorem ipsum dolor sit amet amet adipiscing vestibulum"
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
                header: 'API Title',
                accessorKey: 'apiTitle',
            },
            {
                header: 'Modified By',
                accessorKey: 'modifiedBy',


            },
            {
                header: 'Modified Date',
                accessorKey: 'modifiedDate',


            },
            {
                header: 'Description',
                accessorKey: 'description',


            },

            {
                header: 'Status',
                accessorKey: 'prefSettleType',
                flex: 1,
                cell: (props) => {

                    return (
                        <div className="flex items-center">

                            <span
                                className={`flex ml-2 rtl:mr-2 capitalize font-semibold rounded-full border bg-gray-50 mt-4 px-2 py-1 ${ItemStatusColor[0].backgroundColor}`}
                            >
                                {ItemStatusColor[0].label === "Active" &&
                                    <RiCheckboxCircleFill className='mt-1 mr-2 text-[#3B8C59]' />
                                }

                                {/* {ItemStatusColor[1].label === "Inactive" &&
                                        <RiCloseCircleFill className='mt-1 mr-2 text-[#FF0000]' />}

                                    {ItemStatusColor[2].label === "Submitted" &&
                                        <BsPatchCheckFill className='mt-1 mr-2 text-blue-500'/>}  */}


                                {ItemStatusColor[0].label}

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

export default ApiConfigurationTable
