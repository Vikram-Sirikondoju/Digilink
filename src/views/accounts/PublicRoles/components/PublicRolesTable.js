import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Badge, Button, Dialog, Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import {
    setTableData,
    getPublicRoles,
    getRolePermissionsForEdit,
} from '../store/dataSlice'
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
import {
    RiCheckboxBlankCircleFill,
    RiCheckboxCircleFill,
    RiCloseCircleFill,
} from 'react-icons/ri'
import { BsPatchCheckFill } from 'react-icons/bs'
import { apiUpdateOpAccStatus } from 'services/PublicRolesService'
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

const PublicRolesTable = () => {
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.publicRoles.data.tableData
    )
    const loading = useSelector((state) => state?.publicRoles?.data?.loading)

    const data = useSelector(
        (state) => state?.publicRoles?.data?.publicRoles.res
    )
    const totalCount = useSelector(
        (state) => state?.publicRoles?.data?.publicRoles.total
    )
    const {
        enterAccount,
        password,
        rememberMe,
        usernameOrEmail,
        acc_mno_parent_unq_id,
    } = useSelector((state) => state.auth.user)

    const fetchData = useCallback(() => {
        // dispatch(getItems())
    }, [])
    const [isDeactivate, setDeactivate] = useState(false)
    const [row, setRow] = useState('')
    const updateOperatorStatus = async () => {
        let isStatus = row.status === 'ACTIVE' ? 'IN_ACTIVE' : 'ACTIVE'
        const resp = await apiUpdateOpAccStatus(row.id, isStatus)
        if (resp.data.success) {
           
            if(isStatus=== 'ACTIVE'){
                   
                 setDeactivate(false)
                 OpenNotification('success','Activated successfully')
           
            }else{
                   
                 setDeactivate(false)
                 OpenNotification('success','Deactivated successfully')
          
 
            }
        }
    }

    useEffect(() => {
        dispatch(setSelectedRows([]))

        const fetchData = async () => {
            dispatch(
                getPublicRoles({
                    acc_mno_parent_unq_id,
                    page_no: pageIndex - 1,
                    page_size: pageSize,
                    sort: 'id',
                })
            )
        }

        fetchData()
    }, [
        dispatch,
        fetchData,
        pageIndex,
        pageSize,
        sort,
        query,
        isDeactivate,
        enterAccount,
    ])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, total: totalCount }),
        [pageIndex, pageSize, sort, totalCount]
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

        const onEdit = () => {
            dispatch(getRolePermissionsForEdit({ roleId: row.id }))

            navigate(`/accounts-new-public-roles`, {
                state: { data: row, mode: 'EDIT' },
            })
        }
        const handleClick = () => {
            setDeactivate(true)
            setRow(row)
        }

        const iconColor = row.status != 'ACTIVE' ? 'green' : 'rose'
        const IconComponent =
            row.status != 'ACTIVE' ? RiCheckboxCircleFill : RiCloseCircleFill

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
                <Tooltip
                    title={`${
                        row.status != 'ACTIVE' ? 'Activate' : 'Deactivate'
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

    const columns = useMemo(
        () => [
            {
                header: 'Actions',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
            {
                header: 'Role Title',
                accessorKey: 'role_name',
            },
            {
                header: 'Status',
                accessorKey: 'status',

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
                        fontWeight: 700,
                        fontSize: '18px',
                    }}
                >
                    {row.status != 'ACTIVE' ? `Activate` : `Deactivate`}
                </h6>
                <hr className="text-gary-500 mt-4 mb-4" />
                <p
                    style={{
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '15px',
                    }}
                >
                    {row.status != 'ACTIVE'
                        ? `Are you sure you want to activate this master role ?`
                        : `Are you sure you want to deactivate this master role ?`}
                </p>
                <div className="mt-6 text-end">
                    <Button
                        style={{
                            backgroundColor: '#4D4D4D',
                            color: 'white',
                            borderRadius: '2px',
                        }}
                        className="mr-3"
                        onClick={() => setDeactivate(false)}
                    >
                        No
                    </Button>
                    <Button
                        variant="solid"
                        onClick={() => updateOperatorStatus()}
                    >
                        Yes
                    </Button>
                </div>
            </Dialog>
        </>
    )
}

export default PublicRolesTable
