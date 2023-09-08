import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { Badge, Button, Dialog, Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { getItems, getItemsTableData, setTableData } from '../store/dataSlice'
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
import { MdModeEdit } from 'react-icons/md'
import { AiFillCopy } from "react-icons/ai"
import { RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri'
import { BsPatchCheckFill } from 'react-icons/bs'
import NewItems from './NewItems'
import { OpenNotification, snakeToCamel } from 'views/Servicefile'
import { apiUpdateItemAccStatus } from 'services/ItemsService'

const orderStatusColor = {
    "ACTIVE": {
        label: 'Active',
        dotClass: 'bg-black-400',
        textClass: 'text-black-400',
        backgroundColor: 'bg-[#F5F5F5]',
    },
    'SUBMITTED': {
        label: 'Submitted',
        dotClass: 'bg-blue-400',
        textClass: 'text-black-400',
        backgroundColor: 'bg-[#F0F7FF]',
    },
    'IN_ACTIVE': {
        label: 'Inactive',
        dotClass: 'bg-blue-400',
        textClass: 'text-black-400',
        backgroundColor: 'bg-[#F5F5F5]',
    },
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



const ItemsTable = ({actionPermissions}) => {
    const [isDeactivate, setDeactivate] = useState(false)
    const [row, setRow] = useState('')
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total , order} = useSelector(
        (state) => state.itemsList.data.tableData
    )
    const totalCount = useSelector((state) => state.itemsList?.data?.itemTableData?.total)
    const loading = useSelector((state) => state.itemsList.data.loading)
    const { unq_id, role_name, enterAccount } = useSelector((state) => state.auth.user)
    const data = useSelector((state) => state.itemsList?.data?.itemTableData?.res)




    
    const fetchData = useCallback(() => {
        dispatch(getItemsTableData({
            page: pageIndex-1,
            size: pageSize,
            accId:unq_id ,
            order: order,
        }))
    }, [dispatch, pageIndex, pageSize, unq_id, order,isDeactivate])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        fetchData()
    }, [dispatch,isDeactivate, pageIndex, pageSize, sort,order])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total:totalCount }),
        [pageIndex, pageSize, sort, query, totalCount]
    )


    const updateItemStatus = async () => {

        let isStatus = row.item_status === 'ACTIVE' ? 'IN_ACTIVE' : 'ACTIVE';
        const resp = await apiUpdateItemAccStatus(row.id, isStatus);
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
            navigate(`/catalogue-new-items`, { state: { data: row ,mode : "EDIT"} })
        }

        const onClone = () => {
            navigate(`/catalogue-new-items`,{ state: { data: row ,mode:"ADD"} })
        }

        const handleClick = () => {
            setDeactivate(true)
            setRow(row)
        }

        const iconColor = row.item_status != 'ACTIVE' ? 'green' : 'rose'
        const IconComponent = row.item_status != 'ACTIVE' ? RiCheckboxCircleFill : RiCloseCircleFill
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
                        <MdModeEdit />

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
                        // onClick={onView}
                        style={canView ? null : disableIconStyle}
                    >
                        <HiOutlineEye />
                    </span>
                </Tooltip>
                <Tooltip title={`${row.item_status != 'ACTIVE' ? 'Activate' : 'Deactivate'}`}>
                    <span onClick={handleClick} className={`cursor-pointer p-1 text-${iconColor}-800 hover:text-${iconColor}-800`} style={canActivate ? null : disableIconStyle}>
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
                header: 'Item Id',
                accessorKey: 'item_unq_id',
            },
            {
                header: 'Item Title',
                accessorKey: 'item_title',
                cell: (props) => {
                    const { item_title } = props.row.original
                    return (
                        <div className="max-w-sm truncate">{ item_title }</div>
                    )
                },
            },
            {
                header: 'Item Category',
                accessorKey: 'item_type',
                cell: (props) => {
                    const { item_type } = props.row.original
                    return (
                        <>
                        {item_type === "P" && <p>Product</p>}
                        {item_type === "D" && <p>Data Plan</p>}
                        {item_type === "S" && <p>Service Plan</p>}
                        </>
                    )
                },
            },
            {
                header: 'Item Added By',
                accessorKey: 'item_provider_id',
                // cell: (props) => {
                //     return (
                //         <p></p>
                //     )
                // },
            },
            {
                header: 'Template',
                accessorKey: 'tp',
                cell: (props) => {
                    const { dgl_cat_tp_info } = props.row.original
                    return (
                        <p>{dgl_cat_tp_info?.tp_title || ''}</p>
                    )
                },

            },
            {
                header: 'Status',
                accessorKey: 'prefSettleType',
                flex: 1,
                cell: (props) => {
                    const { item_status } = props.row.original

                    return (
                        <div className="flex items-center">
                            <span
                                className={`flex ml-2 rtl:mr-2 capitalize font-semibold rounded-full border ${orderStatusColor[item_status]?.backgroundColor} mt-4 px-2 py-1 text-${orderStatusColor[item_status]?.dotClass}`}
                            >
                                {item_status === "ACTIVE" && (
                                    <RiCheckboxCircleFill className="mt-1 mr-2 text-[#3B8C59]" />
                                )}
                                {item_status === 'IN_ACTIVE' && (
                                    <RiCloseCircleFill className="mt-1 mr-2 text-[#FF0000]" />
                                )}
                                {item_status === 'SUBMITTED' && (
                                    <BsPatchCheckFill className="mt-1 mr-2 text-blue-500" />
                                )}
                                {orderStatusColor[item_status]?.label}
                            </span>
                        </div>
                    )
                },
            }


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
            <Dialog isOpen={isDeactivate} onClose={() => setDeactivate(false)}>
                <h6
                    style={{
                        
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '18px',
                        color: '#212121',
                    }}
                >
                    {row.item_status != 'ACTIVE' ? `Activate` : `Deactivate`}
                </h6>
                <hr className="text-gary-500 mt-4 mb-4" />
                <p
                    style={{
                        
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '15px',
                        color: '#333333',
                    }}
                >
                    {row.item_status != "ACTIVE"
                        ? `Are you sure you want to activate this item ?`
                        : `Are you sure you want to deactivate this item ?`}
                </p>
                <div className="mt-6 text-end">
                    <Button style={{ backgroundColor: '#4D4D4D',color: 'white',borderRadius: '2px',}}
                        className="mr-3"
                        onClick={() => setDeactivate(false)}
                    >
                        No
                    </Button>
                    <Button variant="solid" onClick={() => updateItemStatus()}>
                        Yes
                    </Button>
                </div>
            </Dialog>


        </>
    )
}

export default ItemsTable
