import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import {
    Badge,
    Button,
    Dialog,
    Notification,
    Tooltip,
    toast,
} from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye,HiPlus } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import {
    getWarehouseDetails,
    setSelectedItem,
    setTableData,
    setWareHouseList,
} from '../store/dataSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri'
import { MdModeEdit } from 'react-icons/md'
import { apiUpdateWarehouseStatus } from 'services/WareHouseService'
import { GetErrorMsg } from 'views/Servicefile';
import { BsPatchCheckFill } from 'react-icons/bs'


const warehouseStatusColor = {
    'ACTIVE': {
        label: 'Active',
        dotClass: 'bg-black-500',
        textClass: 'text-black-500',
        backgroundColor: 'bg-[#F5F5F5]'

    },
    'SUBMITTED': {
        label: 'Submitted',
        dotClass: 'bg-blue-500',
        textClass: 'text-amber-500',
    },
    'IN_ACTIVE': { label: 'Inactive', dotClass: 'bg-red-500', textClass: 'text-red-500', backgroundColor: 'bg- #F5F5F5' },
}

const WareHouseOrdersTable = ({}) => {
    const [isDeactivate, setDeactivate] = useState(false)
    const [row, setRow] = useState('')
    const tableRef = useRef(null)
    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.wareHouse.data.tableData
    )

    const loading = useSelector((state) => state.wareHouse.data.loading)

    const data = useSelector((state) => state.wareHouse.data.wareHouseList)

    const fetchData = useCallback(() => {
        dispatch(getWarehouseDetails({ page: pageIndex - 1, size: pageSize }))
    }, [dispatch, pageIndex, pageSize, sort, query])

    useEffect(() => {
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )
    const ActionColumn = ({ row }) => {
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()

        const handleClick = () => {
            setDeactivate(true)
            setRow(row)
        }
        const onView = useCallback(() => {
            dispatch(setSelectedItem(row))
            navigate(`/warehouse-view-warehouse`, { state: { data: row } })
        }, [navigate, row])
        const onEdit = useCallback(() => {
            navigate(`/warehouse-new-warehouse`, {
                state: { data: row, mode: 'EDIT' },
            })
        }, [navigate, row])
        
        const onAddInventory = useCallback(() => {
            navigate(`/warehouse-new-add-inventory`, { state: { data: row } })
        }, [navigate, row])

        const iconColor = row.wh_status !== "ACTIVE" ? 'green' : 'rose'
        const IconComponent = row.wh_status !== "ACTIVE"  ? RiCheckboxCircleFill : RiCloseCircleFill

        const disableIconStyle = { color: 'grey', pointerEvents: 'none' }
       
            

        return (
            <div className="flex justify-end text-lg">
                <Tooltip title="View">
                    <span
                        className={`cursor-pointer text-blue-500 p-1 hover:${textTheme}`}
                        onClick={onView}
                    >
                        <HiOutlineEye />
                    </span>
                </Tooltip>
                <Tooltip title="Edit">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                        onClick={onEdit}
                    >
                        <MdModeEdit />
                    </span>
                </Tooltip>
                <Tooltip title="Add Inventory">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                        onClick={onAddInventory}
                    >
                        <HiPlus />
                    </span>
                </Tooltip>
                <Tooltip
                    title={`${row.status != 'ACTIVE' ? 'Activate' : 'Deactivate'}`}
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
                flex: 1,
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
            {
                header: 'WareHouse Title',
                accessorKey: 'wh_title',
            },
            {
                header: 'Location',
                accessorKey: 'wh_location',
            },
            {
                header: 'Actual Capacity',
                accessorKey: 'wh_total_capacity',
            },
            {
                header: 'Used Capacity',
                accessorKey: 'wh_allotted_capacity',
            },
            {
                header: 'Contact Person',
                accessorKey: 'wh_contact_person',
            },

            {
                header: 'Status',
                accessorKey: 'wh_status',
                flex: 1,
                cell: (props) => {
                    const { wh_status } = props.row.original
                    return (
                        <div className="flex items-center">
                        <span className={`flex ml-2 rtl:mr-2 capitalize font-semibold rounded-full border ${warehouseStatusColor[wh_status]?.backgroundColor} mt-4 px-2 py-1 text-${warehouseStatusColor[wh_status]?.dotClass}`}>
                            {wh_status === 'ACTIVE' && <RiCheckboxCircleFill className="mt-1 mr-2 text-[#3B8C59]" />}
                            {wh_status === 'IN_ACTIVE' && <RiCloseCircleFill className="mt-1 mr-2 text-[#FF0000]" />}
                            {wh_status === 'SUBMITTED' && <BsPatchCheckFill className="mt-1 mr-2 text-blue-500" />}
                            {warehouseStatusColor[wh_status]?.label}
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

    const updateWarehouseStatus = async () => {
        let isStatus = row.wh_status === 0 ? 2 : 0
        const resp = await apiUpdateWarehouseStatus(row.id, isStatus)
        setDeactivate(false)
        if (resp.status === 'success') {
            const warehouseData = cloneDeep(data)
            const index = warehouseData.findIndex((val) => val.id === row.id)
            warehouseData[index].wh_status = isStatus
            dispatch(setWareHouseList(warehouseData))
            toast.push(
                <Notification
                    title={'Warehouse Status'}
                    type="success"
                    duration={2500}
                >
                    {isStatus === 2
                        ? `Deactivated Successfully`
                        : `Activated Successfully`}
                </Notification>,
                {
                    placement: 'top-end',
                }
            )
        } else if (resp.status === 'failed') {
            const errorMsg = GetErrorMsg(resp) || 'Error'
            toast.push(
                <Notification title={'Failed'} type="danger" duration={2500}>
                    {errorMsg}
                </Notification>,
                {
                    placement: 'top-end',
                }
            )
        }
    }
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
            />
            <Dialog isOpen={isDeactivate} onClose={() => setDeactivate(false)}>
                <h6
                    style={{
                       
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '17px',
                        // color: '#212121',
                    }}
                >
                    {row.wh_status === 0 ? `Deactivate` : `Activate`}
                </h6>
                <hr className="text-gary-500 mt-4 mb-4" />
                <p
                    style={{
                        fontFamily: 'normal',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '17px',
                       
                    }}
                >
                    {row.wh_status === 0
                        ? `Are you sure you want to deactivate this WareHouse ?`
                        : `Are you sure you want to Activate this WareHouse ?`}
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
                        onClick={() => updateWarehouseStatus()}
                    >
                        Yes
                    </Button>
                </div>
            </Dialog>
        </>
    )
}

export default WareHouseOrdersTable
