import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { Badge, Button, Dialog, Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrList, getItems, setTableData } from '../store/dataSlice'
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
import { RiCheckboxBlankCircleFill, RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri'
import { BsPatchCheckFill } from 'react-icons/bs'
import { apiUpdateCurrAccStatus } from 'services/CurrencyService'
import GetDropdownLabel, { OpenNotification, snakeToCamel } from 'views/Servicefile'


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


const CurrencyTable = ({ actionPermissions }) => {

    const parentAccountList = useSelector((state) => state.CurrencyList?.data?.getCurrAccount)

    const [isDeactivate, setDeactivate] = useState(false)

    const tableRef = useRef(null)
    const [row, setRow] = useState('')

    const dispatch = useDispatch()

    const {
        enterAccount,
        unq_id
    } = useSelector((state) => state?.auth?.user)

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
            navigate(`/create-currency`, { state: { data: row, mode: "EDIT" } })

        }

        const handleClick = () => {
            setDeactivate(true);
            setRow(row);
        };

        const iconColor = row.md_curr_status !== "ACTIVE" ? "green" : "rose";
        const IconComponent = row.md_curr_status !== "ACTIVE" ? RiCheckboxCircleFill : RiCloseCircleFill;
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
                <Tooltip title={`${row.md_curr_status !== 'ACTIVE' ? 'Activate' : 'Deactivate'
                    }`}>
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


    const { pageIndex, pageSize, sort, query, total, sort_field, order } = useSelector(
        (state) => state.CurrencyList.data.tableData
    )
    const loading = useSelector((state) => state?.CurrencyList?.data?.loading)

    const data = useSelector((state) => state?.CurrencyList?.data?.currList)

    const totalCount = useSelector((state) => state?.CurrencyList?.data?.tableData?.total)

    const fetchData = useCallback(() => {
        // dispatch(getItems())
    }, [])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        const fetchData = async () => {
            dispatch(getCurrList({ page_no: pageIndex - 1, page_size: pageSize, sort_field: sort_field ? sort_field : 'id', query, unqId: unq_id, order: order }))
        }
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort, , query, isDeactivate, enterAccount, sort_field, order])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total: totalCount }),
        [pageIndex, pageSize, sort, query, total]
    )

    const updateCurrAccStatus = async () => {
        let isStatus = row.md_curr_status === "ACTIVE" ? "IN_ACTIVE" : "ACTIVE";
        const resp = await apiUpdateCurrAccStatus(row.id, isStatus);
        if (resp.data.success && isStatus === 'ACTIVE') {
            setDeactivate(false)

            OpenNotification("success", 'Activated  successfully')

        }
        else if (resp.data.success && isStatus === 'IN_ACTIVE') {
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
            // {
            //     header: 'Operator',
            //     accessorKey: 'acc_name',
            //     // cell: (props) => {
            //     //     const { operator } = props.row.original
            //     //     return(
            //     //     <span>{GetDropdownLabel(operator, parentAccountList)}</span>
            //     //     )}  

            // },
            {
                header: 'Currency Title',
                accessorKey: 'cur_title',
            },
            {
                header: 'Currency Symbol',
                accessorKey: 'cur_symbol',
            },
            {
                header: 'Conversion Rate',
                accessorKey: 'cur_conv_rate',
            },
            {
                header: 'Status',
                accessorKey: 'md_curr_status',
                flex: 1,
                cell: (props) => {
                    const { md_curr_status } = props.row.original
                    return (
                        <div className="flex items-center">
                            <span className={`flex ml-2 rtl:mr-2 capitalize font-semibold rounded-full border ${ItemStatusColor[md_curr_status]?.backgroundColor} mt-4 px-2 py-1 text-${ItemStatusColor[md_curr_status]?.dotClass}`}>
                                {md_curr_status === 'ACTIVE' && <RiCheckboxCircleFill className="mt-1 mr-2 text-[#3B8C59]" />}
                                {md_curr_status === 'IN_ACTIVE' && <RiCloseCircleFill className="mt-1 mr-2 text-[#FF0000]" />}
                                {md_curr_status === 'SUBMITTED' && <BsPatchCheckFill className="mt-1 mr-2 text-blue-500" />}
                                {ItemStatusColor[md_curr_status]?.label}
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
        newTableData['sort_field'] = sortfield
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
                        fontSize: 700, fontSize: '18px'
                    }}
                >{row.md_curr_status !== 'Active' ? `Activate` : `Deactivate`}</h6>
                <hr className='text-gary-500 mt-4 mb-4' />
                <p>{row.md_curr_status !== 'Active'
                    ? `Are you sure you want to activate this currency ?`
                    : `Are you sure you want to deactivate this currency ?`}</p>
                <div className='mt-6 text-end'>
                    <Button style={{ backgroundColor: "#4D4D4D", color: "white" }} className='mr-3'
                        onClick={() => setDeactivate(false)}
                    >No</Button>
                    <Button variant='solid'
                        onClick={() => updateCurrAccStatus()}
                    >Yes</Button>
                </div>
            </Dialog>
        </>
    )
}

export default CurrencyTable

