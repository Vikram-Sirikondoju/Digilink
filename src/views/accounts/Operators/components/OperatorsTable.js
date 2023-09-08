import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { Button, Dialog, Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, getParentAccount, getUploadFileType, setTableData } from '../store/dataSlice'
import { setSelectedRows, addRowItem, removeRowItem } from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { MdModeEdit } from 'react-icons/md'
import { AiFillCopy } from 'react-icons/ai'
import { RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri'
import { BsPatchCheckFill } from 'react-icons/bs'
import { apiUpdateOpAccStatus } from 'services/OperatorsService'
import GetDropdownLabel, { OpenNotification, snakeToCamel } from 'views/Servicefile'
import { getParenOperator } from 'views/accounts/EnterpriseCustomers/store/dataSlice'
const orderStatusColor = {
    ACTIVE: {
        label: 'Active',
        dotClass: 'bg-black-400',
        textClass: 'text-black-400',
        backgroundColor: 'bg-[#F5F5F5]',
    },
    SUBMITTED: {
        label: 'Submitted',
        dotClass: 'bg-blue-400',
        textClass: 'text-black-400',
        backgroundColor: 'bg-[#F0F7FF]',
    },
    IN_ACTIVE: {
        label: 'Inactive',
        dotClass: 'bg-blue-400',
        textClass: 'text-black-400',
        backgroundColor: 'bg-[#F5F5F5]',
    },
}

const OrdersTable = ({ actionPermissions }) => {
    const { pageIndex, pageSize, sort, query, total,sort_field,order} = useSelector(
        (state) => state.salesOrderList.data.tableData
    )
    
    const loading = useSelector((state) => state.salesOrderList.data.loading)

    const data = useSelector((state) => state.salesOrderList?.data?.orderList?.res)

    const totalCount = useSelector((state) => state.salesOrderList?.data?.orderList?.total)

    const [isDeactivate, setDeactivate] = useState(false)
    const [row, setRow] = useState('')
    const tableRef = useRef(null)
    const dispatch = useDispatch()
    const { enterAccount, password, rememberMe, usernameOrEmail } = useSelector(
        (state) => state.auth.user
    )
    const parentAccountList = useSelector(
        (state) => state.salesOrderList?.data?.parentAccountList
    )

    const updateOperatorStatus = async () => {
        let isStatus = row.acc_status === 'ACTIVE' ? 'IN_ACTIVE' : 'ACTIVE'
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

    const ActionColumn = ({ row }) => {
        const { textTheme } = useThemeClass()

        const navigate = useNavigate()

        const onEdit = () => {
            navigate(`/account-menu-item-view-8/edit`, {
                state: { data: row, mode: 'EDIT' },
            })
        }

        const onClone = () => {
            navigate(`/account-menu-item-view-8`, {
                state: { data: row, mode: 'ADD' },
            })
        }

        const handleClick = () => {
            setDeactivate(true)
            setRow(row)
        }

        const iconColor = row.acc_status != 'ACTIVE' ? 'green' : 'rose'
        const IconComponent =
            row.acc_status != 'ACTIVE'
                ? RiCheckboxCircleFill
                : RiCloseCircleFill

        const disableIconStyle = { color: 'grey', pointerEvents: 'none' }
        const { canAdd, canEdit, canView, canActivate, canClone, canApprove } =
            actionPermissions

        return (
            <div className="text-lg">
                <Tooltip title="Edit">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                        onClick={onEdit}
                        style={canEdit ? null : disableIconStyle}
                    >
                        <MdModeEdit  />
                    </span>
                </Tooltip>

                <Tooltip title="Clone">
                    <span
                        className={`cursor-pointer p-1  hover:${textTheme}`}
                        onClick={onClone}
                        style={canClone ? null : disableIconStyle}
                    >
                        <AiFillCopy />
                    </span>
                </Tooltip>
                <Tooltip title="View">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                        style={canView ? null : disableIconStyle}
                    >
                        <HiOutlineEye />
                    </span>
                </Tooltip>
                <Tooltip
                    title={`${
                        row.acc_status != 'ACTIVE' ? 'Activate' : 'Deactivate'
                    }`}
                >
                    <span
                        className={`cursor-pointer p-1 text-${iconColor}-800 hover:text-${iconColor}-800`}
                        onClick={handleClick}
                        style={canActivate ? null : disableIconStyle}
                    >
                        <IconComponent />
                    </span>
                </Tooltip>
            </div>
        )
    }
    useEffect(() => {
        dispatch(getUploadFileType(enterAccount))
    }, [])
    useEffect(() => {
        const fetchData = async () => {
            dispatch(
                getOrders({
                    page_no: pageIndex - 1,
                    page_size: pageSize,
                    sort_field: sort_field?sort_field:'id',
                    unq_id: enterAccount,
                    order:order
                })
            )
        }

        fetchData()
        //dispatch(getParentAccount({ enterAccount }))
    }, [isDeactivate, dispatch, query, enterAccount, pageIndex, pageSize, sort_field,order])

    useEffect(() => {
      
        dispatch(getParentAccount({ enterAccount }))
    }, [dispatch, enterAccount])
  

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total:totalCount }),
        [pageIndex, pageSize, sort, query, totalCount]
    )
    const columns = useMemo(
        () => [
            {
                header: 'Actions',
                flex: 1,
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
            {
                header: 'Operator ID',
                accessorKey: 'acc_unq_id',
            },
            {
                header: 'Operator Title',
                accessorKey: 'acc_name',
            },
            {
                header: 'Parent',
                accessorKey: 'acc_parent',
                cell: (props) => {
                    const { acc_parent } = props.row.original
                    return (
                        <span>
                            {GetDropdownLabel(acc_parent, parentAccountList)}
                        </span>
                    )
                },
            },

            {
                header: 'Address',
                accessorKey: 'acc_add_l1',
            },

            {
                header: 'Status',
                accessorKey: 'acc_status',
                flex: 1,

                cell: (props) => {
                    const { acc_status } = props.row.original

                    return (
                        <div className="flex items-center">
                            <span
                                className={`flex ml-2 rtl:mr-2 capitalize font-semibold rounded-full border ${orderStatusColor[acc_status]?.backgroundColor} mt-4 px-2 py-1 text-${orderStatusColor[acc_status]?.dotClass}`}
                            >
                                {acc_status === 'ACTIVE' && (
                                    <RiCheckboxCircleFill className="mt-1 mr-2 text-[#3B8C59]" />
                                )}
                                {acc_status === 'IN_ACTIVE' && (
                                    <RiCloseCircleFill className="mt-1 mr-2 text-[#FF0000]" />
                                )}
                                {acc_status === 'SUBMITTED' && (
                                    <BsPatchCheckFill className="mt-1 mr-2 text-blue-500" />
                                )}
                                {orderStatusColor[acc_status]?.label}
                            </span>
                        </div>
                    )
                },
            },
        ],
        [parentAccountList]
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
                        fontWeight: 700,
                        fontSize: '18px',
                    }}
                >
                    {row.acc_status != 'ACTIVE' ? `Activate` : `Deactivate`}
                </h6>
                <hr className="text-gary-500 mt-4 mb-4" />
                <p
                    style={{
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '15px',
                    }}
                >
                    {row.acc_status != 'ACTIVE'
                        ? `Are you sure you want to activate this operator ?`
                        : `Are you sure you want to deactivate this operator ?`}
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

export default OrdersTable
