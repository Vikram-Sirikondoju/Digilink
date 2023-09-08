import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { Badge, Tooltip, Dialog,Button } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
// import { getOrders, setTableData } from '../../store/dataSlice'
// import {
//     setSelectedRows,
//     addRowItem,
//     removeRowItem,
//     setDeleteMode,
//     setSelectedRow,
// } from '../../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
// import cloneDeep from 'lodash/cloneDeep'
import { MdModeEdit } from 'react-icons/md'
import { AiFillCopy } from "react-icons/ai"
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { getInventoryDetails, setInventoryTableData } from '../../store/dataSlice'
import { cloneDeep } from 'lodash'

const ItemStatusColor = {
    0: {
        label: 'Active',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    1: {
        label: 'Submitted',
        dotClass: 'bg-blue-500',
        textClass: 'text-amber-500',
    },
    2: { label: 'Inactive', dotClass: 'bg-red-500', textClass: 'text-red-500' },
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



const InventoryTable = ({warehouseData}) => {
    const warehouseId=warehouseData?.id
    const [isDeactivate, setDeactivate] = useState(false)
    const [row, setRow] = useState('')
    const tableRef = useRef(null)
    const [exportValue, setExportValue] = useState(false)

    const dispatch = useDispatch()
    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.wareHouse?.data?.inventoryTableData
    );
    const loading = useSelector((state) => state.wareHouse.data.loading)

    const data = useSelector((state) => state.wareHouse.data.inventoryList)


    
    const fetchData = useCallback(() => {
        dispatch(getInventoryDetails({ page: pageIndex - 1, size: pageSize, whId: warehouseId }))
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
    
    
        const onEdit = useCallback(() => {
            navigate(`/warehouse-new-add-inventory`, {state: { data: row, warehouseData:warehouseData, mode: 'EDIT'} })
        }, [navigate, row])
    
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
                <Tooltip title="Delete">
                    <span
                        className="cursor-pointer p-1 text-green-800 hover:text-green-800"
                        // onClick={onDelete}
                    >
                        <RiCheckboxCircleFill onClick = {() =>setExportValue(true)}/>
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
                header: 'Product',
                accessorKey: 'cat_items_info',
            },
            {
                header: 'Product Variant',
                accessorKey: 'cat_item_var',
            },
            // {
            //     header: 'Category',
            //     accessorKey: 'category',
            // },
            {
                header: 'SKU Code',
                accessorKey: 'sku_code',
            },
            // {
            //     header: 'Shelf Location',
            //     accessorKey: 'shelfLocation',
            // },
            {
                header: 'Shelf Area',
                accessorKey: 'shelf_area',
            },
            {
                header: 'Shelf Code',
                accessorKey: 'shelf_code',
            },
            // {
            //     header: 'Bin',
            //     accessorKey: 'bin',
            // },
            // {
            //     header: 'Unit',
            //     accessorKey: 'unit',
            // },
            {
                header: 'Manufacturer',
                accessorKey: 'manufacturer',
            },
            {
                header: 'Moving Quantity',
                accessorKey: 'moving_qty',
            },
            {
                header: 'Holding Quantity',
                accessorKey: 'holding_qty',
            },
            // {
            //     header: 'Total Quantity',
            //     accessorKey: 'totalQuantity',
               
            // },
           
        ],
        []
    )
    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setInventoryTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setInventoryTableData(newTableData))
    }

    const onSort = (sort) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setInventoryTableData(newTableData))
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
        <Dialog isOpen={exportValue} onClose={() =>setExportValue(false)}>
            <div>
                    <h6>Deactivate </h6>
                    <hr className='text-gray mb-3 mt-3' />
                    <p className='mb-4'>Are you sure you want to deactivate this inventory ?</p>
                    <div className='text-end'>
                        <Button className='mr-3' onClick={() =>setExportValue(false)}>No</Button>
                        <Button variant="solid">Yes</Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default InventoryTable

