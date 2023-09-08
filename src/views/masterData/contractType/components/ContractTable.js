import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { Badge, Button, Dialog, Tooltip, } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { getContractData, getOrders, setTableData } from '../store/dataSlice'
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
import dayjs from 'dayjs'
import { RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri'
import { AiFillCopy } from 'react-icons/ai'
import { MdModeEdit } from 'react-icons/md'
import { BsPatchCheckFill } from 'react-icons/bs'
import { apiUpdateContractAccStatus } from 'services/ContractTypeService'
import { OpenNotification } from 'views/Servicefile'




const ItemStatusColor = {
    "ACTIVE": {
        label: 'Active',
        dotClass: 'bg-black-500',
        textClass: 'text-black-500',
        backgroundColor: 'bg-[#F5F5F5]'
    },
    "SUBMITTED": {
        label: 'Submitted',
        dotClass: 'bg-blue-500',
        textClass: 'text-black-500',
        backgroundColor: 'bg-[#F0F7FF]'
    },
    "IN_ACTIVE": { label: 'Inactive', dotClass: 'bg-red-500', textClass: 'text-red-500', backgroundColor: 'bg- #F5F5F5' },
}

const OrderColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        navigate(`/app/sales/order-details/${row.id}`)
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


const ContractTable = ({ actionPermissions }) => {

    const tableRef = useRef(null)
    const dispatch = useDispatch()

    const [isDeactive, setIsDeactivate] = useState(false)
    const [row, setRow] = useState('')

    const ActionColumn = ({ row }) => {
        const dispatch = useDispatch()
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()

        const onDelete = () => {
            dispatch(setDeleteMode('single'))
            dispatch(setSelectedRow([row.id]))
        }

        // const onView = useCallback(() => {
        //     navigate(`/app/sales/order-details/${row.id}`)
        // }, [navigate, row])

        const onEdit = () => {
            navigate(`/masterDataMenu-item-view-8`, {
                state: { data: row, mode: 'EDIT' },
            })
        }

        const handleClick = () => {
            setIsDeactivate(true);
            setRow(row);
        };
        const iconColor = row.md_contr_status !== "ACTIVE" ? "green" : "rose";
        const IconComponent = row.md_contr_status !== "ACTIVE" ? RiCheckboxCircleFill : RiCloseCircleFill;
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
                <Tooltip title="View">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                    // onClick={onView} 
                    style={canView ? null : disableIconStyle}
                    >
                        <HiOutlineEye />
                    </span>
                </Tooltip>
                <Tooltip title={`${row.md_contr_status !== "ACTIVE" ? "Activate" : "Deactivate"}`}>
                    <span
                        className={`cursor-pointer p-1 text-${iconColor}-800 hover:text-${iconColor}-800`}
                        onClick={handleClick} style={canActivate ? null : disableIconStyle}
                    >
                        <IconComponent />
                    </span>
                </Tooltip>
            </div>
        )
    }

    const updateUserAccStatus = async () => {
        let isStatus = row.md_contr_status === "ACTIVE" ? "IN_ACTIVE" : "ACTIVE";
        const resp = await apiUpdateContractAccStatus(row.id, isStatus);
        if (resp.data.success && isStatus === "ACTIVE") {
            setIsDeactivate(false)

            OpenNotification('success', 'Activated successfully')


        }
        else if (resp.data.success && isStatus === "IN_ACTIVE") {
            setIsDeactivate(false)

            OpenNotification('success', 'Deactivated successfully')

        }
    }

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.contractType.data.tableData
    )
    const loading = useSelector((state) => state.contractType.data.loading)

    const data = useSelector((state) => state.contractType?.data?.getAllData)

    const { enterAccount, acc_mno_parent_unq_id, unq_id, user_type } = useSelector((state) => state?.auth?.user)


    const fetchData = useCallback(() => {
        dispatch(getOrders())
    }, [])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        dispatch(getContractData({ page_no: pageIndex - 1, page_size: pageSize, sort_field: 'id', unqId: unq_id }))
        // fetchData()
    }, [dispatch, isDeactive, pageIndex, pageSize, sort])





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
                flex: 1,
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
            // {
            //     header: 'Operator',
            //     accessorKey: 'acc_name',
            // },
            {
                header: 'Contract Type',
                accessorKey: 'contract_type_title',

            },

            // {
            //     header: 'Description',
            //     accessorKey: 'description',


            // },
            {
                header: 'Status',
                accessorKey: 'md_contr_status',
                flex: 1,
                cell: (props) => {
                    const { md_contr_status } = props.row.original
                    return (
                        <div className="flex items-center">
                            <span className={`flex ml-2 rtl:mr-2 capitalize font-semibold rounded-full border ${ItemStatusColor[md_contr_status]?.backgroundColor} mt-4 px-2 py-1 text-${ItemStatusColor[md_contr_status]?.dotClass}`}>
                                {md_contr_status === 'ACTIVE' && <RiCheckboxCircleFill className="mt-1 mr-2 text-[#3B8C59]" />}
                                {md_contr_status === 'IN_ACTIVE' && <RiCloseCircleFill className="mt-1 mr-2 text-[#FF0000]" />}
                                {md_contr_status === 'PENDING_APPROVAL' && <BsPatchCheckFill className="mt-1 mr-2 text-blue-500" />}
                                {ItemStatusColor[md_contr_status]?.label}
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
            <Dialog
                isOpen={isDeactive}
                onClose={() => setIsDeactivate(false)}
            >
                <h6
                    style={{
                        fontStyle: 'normal',
                        fontSize: '18px', 
                    }}
                >{row.md_contr_status !== 'ACTIVE' ? `Activate` : `Deactivate`}</h6>
                <hr className='text-gary-500 mt-4 mb-4' />
                <p>{row.md_contr_status !== 'ACTIVE'
                    ? `Are you sure you want to activate this contract type ?`
                    : `Are you sure you want to deactivate this contract type ?`}</p>
                <div className='mt-6 text-end'>
                    <Button style={{ backgroundColor: "#4D4D4D", color: "white" }} className='mr-3'
                        onClick={() => setIsDeactivate(false)}
                    >No</Button>
                    <Button variant='solid'
                        onClick={() => updateUserAccStatus()}
                    >Yes</Button>
                </div>
            </Dialog>
        </>
    )
}

export default ContractTable
