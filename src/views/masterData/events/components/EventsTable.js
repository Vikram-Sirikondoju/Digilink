import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { Badge, Button, Dialog, Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getItems, setTableData } from '../store/dataSlice'
import {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    setSelectedRow,
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { MdModeEdit } from 'react-icons/md'
import { AiFillCopy } from "react-icons/ai"
import { RiCheckboxCircleFill } from 'react-icons/ri'

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


/* const ItemColumn = ({ row }) => {
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
} */


const EventsTable = ({actionPermissions}) => {

    const [isDeactivate, setIsDeactivate] = useState(false)

    const tableRef = useRef(null)

    const dispatch = useDispatch()

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

        const onEdit = useCallback(() => {
            navigate(`/add-event`)
        }, [navigate, row])

        const disableIconStyle = { color: 'grey', pointerEvents: 'none' }
        const { canAdd, canEdit, canView, canActivate, canClone, canApprove } =
            actionPermissions

        return (
            <div className="text-lg">
                <Tooltip title="Edit">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                        onClick={onEdit} style={canEdit ? null : disableIconStyle}    
                    >
                        <MdModeEdit />
                    </span>
                </Tooltip>
                <Tooltip title="Activate">
                    <span
                        className="cursor-pointer p-1 text-green-800 hover:text-green-800"
                        onClick={onDelete} style={canActivate ? null : disableIconStyle}    
                    >
                        <RiCheckboxCircleFill onClick={() => setIsDeactivate(true)} />
                    </span>
                </Tooltip>
                <Tooltip title="View">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                        onClick={onView} style={canView ? null : disableIconStyle} 
                    >
                        <HiOutlineEye />
                    </span>
                </Tooltip>
            </div>
        )
    }


    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.EventsList.data.tableData
    )
    const loading = useSelector((state) => state?.EventsList?.data?.loading)

    //const data = useSelector((state) => state?.EventsList?.data?.ItemList)
    const data = [
        {
            event: "Event ABC",
            // description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed lorem sed sapien ultrices ultrices sed s",
            status: "Active",
            id: '1'
        },
        {
            event: "Event ABC",
            // description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed lorem sed sapien ultrices ultrices sed s",
            status: "Active",
            id: '2'
        },
        {
            event: "Event ABC",
            // description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed lorem sed sapien ultrices ultrices sed s",
            status: "Active",
            id: '3'
        },
        {
            event: "Event ABC",
            // description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed lorem sed sapien ultrices ultrices sed s",
            status: "Active",
            id: '4'
        },
        {
            event: "Event ABC",
            // description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed lorem sed sapien ultrices ultrices sed s",
            status: "Active",
            id: '5'
        },
        {
            event: "Event ABC",
            // description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed lorem sed sapien ultrices ultrices sed s",
            status: "Active",
            id: '6'
        },
        {
            event: "Event ABC",
            // description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed lorem sed sapien ultrices ultrices sed s",
            status: "Active",
            id: '7'
        },
    ]

    const fetchData = useCallback(() => {
        dispatch(getItems())
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
            {
                header: 'Actions',
                id: 'action',
                flex: 1,
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
            {
                header: 'Event',
                accessorKey: 'event',
            },
            // {
            //     header: 'Description',
            //     accessorKey: 'description',
            //     flex: 1,
            // },
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
            dispatch(addRowItem([row.id]))
        } else {
            dispatch(removeRowItem(row.id))
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
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                // loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
                onCheckBoxChange={onRowSelect}
                onIndeterminateCheckBoxChange={onAllRowSelect}
            selectable
            />
            <Dialog
                isOpen={isDeactivate}
                onClose={() => setIsDeactivate(false)}
            >
                <div>
                    <h6 style={{
                        fontStyle: 'normal',
                        fontSize: '18px', 
                    }}>Deactivate</h6>
                    <hr className='text-gray mt-4 mb-4' />
                    <p style={{
                        fontStyle: 'normal',
                         fontSize: '15px',
                    }}>Are you sure you want to deactivate this events ?</p>
                    <div className='text-end mt-5'>
                        <Button className='mr-3' onClick={() => setIsDeactivate(false)} style={{ backgroundColor: "#4D4D4D", color: "white" }}
                        >No</Button>
                        <Button variant="solid" onClick={() => setIsDeactivate(false)} >Yes</Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default EventsTable

