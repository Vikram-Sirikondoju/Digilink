import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { Badge, Tooltip, Dialog, Button, Alert } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { setTableData, getUsersList, getUserRoles } from '../../store/dataSlice'
import {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    setSelectedRow,
} from './../../store/stateSlice'

import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import { MdModeEdit } from 'react-icons/md'
import { AiFillCopy } from 'react-icons/ai'
import {
    RiCheckboxBlankCircleFill,
    RiCheckboxCircleFill,
    RiCloseCircleFill,
} from 'react-icons/ri'
import { BsPatchCheckFill } from 'react-icons/bs'
import { apiUpdateUserAccStatus } from 'services/MyAccountService'
import GetDropdownLabel, { snakeToCamel } from 'views/Servicefile'
import { OpenNotification } from 'views/Servicefile'

const ItemStatusColor = {
    ACTIVE: {
        label: 'Active',
        dotClass: 'bg-black-500',
        textClass: 'text-black-500',
        backgroundColor: 'bg-[#F5F5F5]',
    },
    SUBMITTED: {
        label: 'Submitted',
        dotClass: 'bg-blue-500',
        textClass: 'text-black-500',
        backgroundColor: 'bg-[#F0F7FF]',
    },
    IN_ACTIVE: {
        label: 'Inactive',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
        backgroundColor: 'bg- #F5F5F5',
    },
}

const ItemColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = () => {
        navigate(`/accounts-users-preview`,{state: { data: row, mode: 'EDIT' },})
    }

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            onClick={onView}
        >
            #{row.id}
        </span>
    )
}

const UserTable = () => {
    const [isDeactivate, setDeactivate] = useState(false)
    const tableRef = useRef(null)
    const [row, setRow] = useState('')

    const dispatch = useDispatch()
    const { pageIndex, pageSize, sort, query, total, sort_field, order } = useSelector(
        (state) => state.myaccountList.data.tableData
    )
    const loading = useSelector((state) => state.myaccountList.data.loading)
    const data = useSelector(
        (state) => state.myaccountList?.data?.usersList?.res
    )

    const totalCount = useSelector(
        (state) => state.myaccountList.data.usersList.total
    )

    const { enterAccount, unq_id,acc_user_id, acc_unq_id } = useSelector((state) => state.auth.user)
    const userRoles = useSelector((state) => state.myaccountList?.data?.userRoles)

    const fetchData = useCallback(() => {
        //dispatch(getItems())
    }, [])
    const ActionColumn = ({ row }) => {
        const dispatch = useDispatch()
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()

        const onDelete = () => {
            dispatch(setDeleteMode('single'))
            dispatch(setSelectedRow([row.id]))
        }

        const onView = () => {
            if(acc_unq_id ===  row?.acc_user_unq_id) {
                OpenNotification("warning", "you can not view this user") 
            }
        }

        const onEdit = () => {
            if(acc_unq_id ===  row?.acc_user_unq_id) {
                OpenNotification("warning", "you can not edit this user") 
            }
            else{
            navigate(`/accounts-new-users`, {
                state: { data: row, mode: 'EDIT'},
            })
        }
        }
        const handleClick = () => {
            if(acc_unq_id ===  row?.acc_user_unq_id) {
                OpenNotification("warning", "you can not deactivate this user") 
                setDeactivate(false)
                setRow(row)
            } else {
                setDeactivate(true)
                setRow(row)
            }
           
        }

        const iconColor = row.status !== 'ACTIVE' ? 'green' : 'rose'
        const IconComponent =
            row.status !== 'ACTIVE' ? RiCheckboxCircleFill : RiCloseCircleFill

        return (
            <div className="text-lg">
                <Tooltip title="Edit">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                        onClick={onEdit}
                    >
                        <MdModeEdit />
                    </span>
                </Tooltip>

                <Tooltip title="View">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                        onClick={onView}
                    >
                        <HiOutlineEye />
                    </span>
                </Tooltip>
                <Tooltip
                    title={`${row.status != 'ACTIVE' ? 'Activate' : 'Deactivate'
                        }`}
                >
                    <span
                        className={`cursor-pointer p-1 text-${iconColor}-800 hover:text-${iconColor}-800`}
                        onClick={handleClick}
                    >
                        <IconComponent />
                    </span>
                </Tooltip>
            </div>
        )
    }
    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total: totalCount }),
        [pageIndex, pageSize, sort, query, totalCount]
    )

    const updateUserAccStatus = async () => {
        let isStatus = row.status === 'ACTIVE' ? 'IN_ACTIVE' : 'ACTIVE'
        const resp = await apiUpdateUserAccStatus(row.id, isStatus)
        if (resp.data.success) {

            if (isStatus === 'ACTIVE') {
               
                    setDeactivate(false)
                    OpenNotification('success', 'Activated successfully')
               
            } else {
              
                    setDeactivate(false)
                    OpenNotification('success', 'Deactivated successfully')
                

            }
        }
    }

    useEffect(() => {
        dispatch(setSelectedRows([]))

        const fetchData = async () => {
            dispatch(
                getUsersList({
                    page_no: pageIndex - 1,
                    page_size: pageSize,
                    sort_field: sort_field ? sort_field : 'id',
                    order:order,
                    unq_id: enterAccount,
                })
            )
        }

        fetchData()
        dispatch(getUserRoles({ enterAccount }))
    }, [isDeactivate, dispatch, query, enterAccount, pageIndex, pageSize, sort_field, order])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])

    const columns = useMemo(
        () => [
            {
                header: 'Actions',
                id: 'action',
                cell: (props) => <ActionColumn row={props?.row?.original} />,
            },
            {
                header: 'User Id',
                accessorKey: 'acc_user_unq_id',
            },
            {
                header: 'User Role',
                accessorKey: 'dgl_roles_id',
                cell: (props) => {
                    const { dgl_roles_id } = props.row.original
                    return (
                        <span>
                            {GetDropdownLabel(dgl_roles_id, userRoles)}
                        </span>
                    )
                },
            },
            {
                header: 'Email Id',
                accessorKey: 'email',
            },
            {
                header: 'Phone Number',
                accessorKey: 'phone',
            },
            {
                header: 'Status',
                accessorKey: 'status',
                flex: 1,

                cell: (props) => {
                    const { status } = props.row.original

                    return (
                        <div className="flex items-center">
                            <span
                                className={`flex ml-2 rtl:mr-2 capitalize font-semibold rounded-full border ${ItemStatusColor[status]?.backgroundColor} mt-4 px-2 py-1 text-${ItemStatusColor[status]?.dotClass}`}
                            >
                                {status === 'ACTIVE' && (
                                    <RiCheckboxCircleFill className="mt-1 mr-2 text-[#3B8C59]" />
                                )}
                                {status === 'IN_ACTIVE' && (
                                    <RiCloseCircleFill className="mt-1 mr-2 text-[#FF0000]" />
                                )}
                                {status === 'SUBMITTED' && (
                                    <BsPatchCheckFill className="mt-1 mr-2 text-blue-500" />
                                )}
                                {ItemStatusColor[status]?.label}
                            </span>
                        </div>
                    )
                },
            },
        ],
        [userRoles]
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
            <Dialog isOpen={isDeactivate} onClose={() => setDeactivate(false)}>
                <h6
                    style={{
                        fontStyle: 'normal',
                        fontSize: 700,
                        fontSize: '18px',
                    }}
                >
                    {row.status != 'ACTIVE' ? `Activate` : `Deactivate`}
                </h6>
                <hr className="text-gary-500 mt-4 mb-4" />
                <p>
                    {row.status != 'ACTIVE'
                        ? `Are you sure you want to activate this user ? `
                        : `Are you sure you want to deactivate this user ? `}
                </p>
                <div className="mt-6 text-end">
                    <Button
                        style={{ backgroundColor: '#4D4D4D', color: 'white' }}
                        className="mr-3"
                        onClick={() => setDeactivate(false)}
                    >
                        No
                    </Button>
                    <Button
                        variant="solid"
                        onClick={() => updateUserAccStatus()}
                    >
                        Yes
                    </Button>
                </div>
            </Dialog>
        </>
    )
}

export default UserTable
