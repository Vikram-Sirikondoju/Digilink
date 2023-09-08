import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { Button, Dialog, Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getNotificationList, getNotifications, setTableData } from '../store/dataSlice'
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
import { MdModeEdit } from 'react-icons/md'
import { RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri'
import { IoMdSend } from 'react-icons/io'
import { BsPatchCheckFill } from 'react-icons/bs'
import { apiUpdateNotificationStatus } from 'services/NotificationService'
import { OpenNotification, snakeToCamel } from 'views/Servicefile'
import ReactHtmlParser from 'html-react-parser'

const ItemStatusColor = {
    'ACTIVE': {
        label: 'Active',
        dotClass: 'bg-black-500',
        textClass: 'text-black-500',
        backgroundColor: 'bg-[#F5F5F5]'
    },
    'SUBMITTED': {
        label: 'Submitted',
        dotClass: 'bg-blue-500',
        textClass: 'text-black-500',
        backgroundColor: 'bg-[#F0F7FF]'
    },
    'IN_ACTIVE': { label: 'Inactive', dotClass: 'bg-red-500', textClass: 'text-red-500', backgroundColor: 'bg- #F5F5F5' },
}


const NotificationTable = ({actionPermissions}) => {


    const tableRef = useRef(null)

    const [row, setRow] = useState('')
    const [isDeactivate, setDeactivate] = useState(false)


    const dispatch = useDispatch()
    
    const {
        unq_id
    } = useSelector((state) => state?.auth?.user)


    const { pageIndex, pageSize, sort, query, total, sort_field, order } = useSelector(
        (state) => state.notificationsList.data.tableData
    )
    const loading = useSelector((state) => state.notificationsList.data.loading)

    const data = useSelector((state) => state.notificationsList?.data?.notificationList)
    const totalCount = useSelector((state) => state?.notificationsList?.data?.tableData?.total)
    const fetchData = useCallback(() => {
        // dispatch(getNotifications({ page_no: pageIndex - 1, page_size: pageSize, sort_field: 'id' }))
    }, [])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        const fetchData = async () => {
            dispatch(getNotificationList({ page_no: pageIndex - 1, page_size: pageSize, sort_field: sort_field?sort_field:'id', order:order, query,unqId: unq_id }))
        }
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort, isDeactivate, sort_field, order ])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total: totalCount }),
        [pageIndex, pageSize, sort, query, total]
    )



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

        const handleClick = () => {
            setDeactivate(true);
            setRow(row);
        };

        const iconColor = row.ntf_status != "ACTIVE" ? "green" : "rose";
        const IconComponent = row.ntf_status != "ACTIVE" ? RiCheckboxCircleFill : RiCloseCircleFill;


        const onEdit = () => {
            navigate(`/settings-create-template`, { state: { data: row, mode: "EDIT" } })

        }

        const disableIconStyle = { color: 'grey', pointerEvents: 'none' }
        const { canAdd, canEdit, canView, canActivate, canClone, canApprove } =
        actionPermissions



        return (
            <div className="text-lg">
                <Tooltip title="Edit">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                        onClick={onEdit}  style={canEdit ? null : disableIconStyle}

                    >
                        <MdModeEdit />

                    </span>
                </Tooltip>
                <Tooltip title={`${row.ntf_status != 'ACTIVE' ? 'Activate' : 'Deactivate'
                    }`}>
                    <span
                        className={`cursor-pointer p-1 text-${iconColor}-800 hover:text-${iconColor}-800`}
                        onClick={handleClick} style={canActivate ? null : disableIconStyle}
                    >
                        <IconComponent />
                    </span>
                </Tooltip>
                <Tooltip title="Send">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                    // onClick={onView}
                    >
                        <Link to="/settings-menu-send-notifications">
                            <IoMdSend />
                        </Link>

                    </span>
                </Tooltip>
            </div>
        )

    }


    const updateNotificationStatus = async () => {
        let isStatus = row.ntf_status === "ACTIVE" ? "IN_ACTIVE" : "ACTIVE";
        const resp = await apiUpdateNotificationStatus(row.id, isStatus);
        if (resp.data.success && isStatus==='ACTIVE') {
            setDeactivate(false)
          
                OpenNotification("success", 'Activated  successfully')
           
        }
       else if (resp.data.success && isStatus==='IN_ACTIVE') {
            setDeactivate(false)
           
                OpenNotification("success", 'Deactivated successfully')
            
        }
    }


    const columns = useMemo(
        () => [
            {
                header: 'Actions',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
            {
                header: 'Title',
                accessorKey: 'ntf_tp_name',
            },
            {
                header: 'Template',
                accessorKey: 'ntf_tp_info',
                cell: (props) => {
                    const ntf_tp_info = props?.row?.original?.ntf_tp_info
                    return (
                        <p>{ ReactHtmlParser(ntf_tp_info)
                        }</p>
                    )
                },
            },
            {
                header: 'Type',
                accessorKey: 'ntf_tp_type',


            },
            // {
            //     header: 'Description',
            //     accessorKey: 'ntf_tp_info',


            // },
            {
                header: 'Status',
                accessorKey: 'ntf_status',
                flex: 1,
                cell: (props) => {
                    const { ntf_status } = props.row.original
                    return (
                        <div className="flex items-center">
                            <span className={`flex ml-2 rtl:mr-2 capitalize font-semibold rounded-full border ${ItemStatusColor[ntf_status]?.backgroundColor} mt-4 px-2 py-1 text-${ItemStatusColor[ntf_status]?.dotClass}`}>
                                {ntf_status === 'ACTIVE' && <RiCheckboxCircleFill className="mt-1 mr-2 text-[#3B8C59]" />}
                                {ntf_status === 'IN_ACTIVE' && <RiCloseCircleFill className="mt-1 mr-2 text-[#FF0000]" />}
                                {ntf_status === 'SUBMITTED' && <BsPatchCheckFill className="mt-1 mr-2 text-blue-500" />}
                                {ItemStatusColor[ntf_status]?.label}
                            </span>
                        </div>
                    );
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
        const sortfield = snakeToCamel(sort.key)
        newTableData["sort_field"] = sortfield;
        newTableData["order"] = sort.order;
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
                loading={loading}
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
                onClose={() => setDeactivate(false)}
            >
                <h6
                    style={{
                        fontStyle: 'normal',
                        fontSize: 700, fontSize: '18px',
                    }}
                >{row.ntf_status != 'ACTIVE' ? `Activate` : `Deactivate`}</h6>
                <hr className='text-gary-500 mt-4 mb-4' />
                <p>{row.ntf_status != 'ACTIVE'
                    ? `Are you sure you want to activate this account ?`
                    : `Are you sure you want to deactivate this account ?`}</p>
                <div className='mt-6 text-end'>
                    <Button style={{ backgroundColor: "#4D4D4D", color: "white" }} className='mr-3'
                        onClick={() => setDeactivate(false)}
                    >No</Button>
                    <Button variant='solid'
                        onClick={() => updateNotificationStatus()}
                    >Yes</Button>
                </div>
            </Dialog>
        </>
    )
}

export default NotificationTable
