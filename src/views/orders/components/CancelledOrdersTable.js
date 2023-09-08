import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { Badge, Tooltip, Dialog, Button } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { setTableData } from '../store/dataSlice'
import {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    setSelectedRow,
} from '../store/stateSlice'
import { HiDatabase } from 'react-icons/hi'
import { FiDatabase } from 'react-icons/fi'
import useThemeClass from 'utils/hooks/useThemeClass'
import { Link, useLocation, useNavigate } from 'react-router-dom'
// import cloneDeep from 'lodash/cloneDeep'
// import dayjs from 'dayjs'
import { MdModeEdit } from 'react-icons/md'
import { AiFillCopy } from "react-icons/ai"
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { BiRefresh } from 'react-icons/bi'
import { getItems } from 'views/accounts/PendingApproval/store/dataSlice'

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


const CancelledOrdersTable = () => { 

    const [isOpenRefresh, setIsOpen] = useState(false)

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



        return (
            <div className="text-lg">
                <Tooltip title="Delete">
                    <span
                        className="cursor-pointer p-2 hover:text-red-500"
                    //  onClick={onDelete}
                    >
                        <MdModeEdit />
                    </span>
                </Tooltip>
                <Tooltip title="Opendialogue">
                    <span
                        className="cursor-pointer p-2 hover:text-green-500"
                    //  onClick={onDelete}
                    >
                        <BiRefresh onClick={() => setIsOpen(true)} />
                    </span>
                </Tooltip>
            </div>
        )

    }


    // const tableRef = useRef(null)

    // const dispatch = useDispatch()

    // const { pageIndex, pageSize, sort, query, total } = useSelector(
    //     (state) => state.prodCatList.data.tableData
    // )
    // const loading = useSelector((state) => state.prodCatList.data.loading)

    // const data = useSelector((state) => state.prodCatList.data.ItemList)
    // const fetchData = useCallback(() => {
    //     dispatch(getItems())
    // }, [])

    // useEffect(() => {
    //     dispatch(setSelectedRows([]))
    //     fetchData()
    // }, [dispatch, fetchData, pageIndex, pageSize, sort])

    // useEffect(() => {
    //     if (tableRef) {
    //         tableRef.current?.resetSelected()
    //     }
    // }, [data])

    // const tableData = useMemo(
    //     () => ({ pageIndex, pageSize, sort, query, total }),
    //     [pageIndex, pageSize, sort, query, total]
    // )

    const location = useLocation()

    const data = location?.state?.rowData;

    const wo_info = data?.dgl_wo_infos
    const columns = useMemo(
        () => [
            // {
            //     header: 'Actions',
            //     id: 'action',
            //     cell: (props) => <ActionColumn row={props.row.original} />,
            // },
            {
                header: 'Work Order Id',
                accessorKey: 'id',
            },
            {
                header: 'Date of creation',
                accessorKey: 'wo_alltd_dt',


            },
            {
                header: 'Item Name',
                accessorKey: 'item_id',


            },
            {
                header: 'Item Qty',
                accessorKey: 'quantity',


            },
            {
                header: 'Estimated Time of delivery',
                accessorKey: 'description',


            },
            {
                header: 'Delivery to',
                accessorKey: 'description',


            },


            {
                header: 'Status',
                accessorKey: 'wo_status',

                // cell: (props) => {
                //     return (
                //         <div className="flex items-center">
                //             <Badge
                //                 className={ItemStatusColor[0].dotClass}
                //             />
                //             <span
                //                 className={`ml-2 rtl:mr-2 capitalize font-semibold ${ItemStatusColor[0].textClass}`}
                //             >
                //                 {ItemStatusColor[0].label}
                //             </span>
                //         </div>
                //     )
                // },
            },
        ],
        []
    )

    // const onPaginationChange = (page) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.pageIndex = page
    //     dispatch(setTableData(newTableData))
    // }

    // const onSelectChange = (value) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.pageSize = Number(value)
    //     newTableData.pageIndex = 1
    //     dispatch(setTableData(newTableData))
    // }

    // const onSort = (sort) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.sort = sort
    //     dispatch(setTableData(newTableData))
    // }

    // const onRowSelect = (checked, row) => {
    //     if (checked) {
    //         dispatch(addRowItem([row.id]))
    //     } else {
    //         dispatch(removeRowItem(row.id))
    //     }
    // }

    // const onAllRowSelect = useCallback(
    //     (checked, rows) => {
    //         if (checked) {
    //             const originalRows = rows.map((row) => row.original)
    //             const selectedIds = []
    //             originalRows.forEach((row) => {
    //                 selectedIds.push(row.id)
    //             })
    //             dispatch(setSelectedRows(selectedIds))
    //         } else {
    //             dispatch(setSelectedRows([]))
    //         }
    //     },
    //     [dispatch]
    // )
    return (
        <>
            <DataTable
                // ref={tableRef}
                columns={columns}
                data={wo_info?.map(val => {
                    return [...[val], ...val.dgl_wo_intry_allocation]
                })?.flat(1)}
            // loading={loading}
            // pagingData={tableData}
            // onPaginationChange={onPaginationChange}
            // onSelectChange={onSelectChange}
            // onSort={onSort}
            // onCheckBoxChange={onRowSelect}
            // onIndeterminateCheckBoxChange={onAllRowSelect}
            // selectable
            />
            <Dialog
                isOpen={isOpenRefresh}
            // onClose={onDialogClose}
            // onRequestClose={onDialogClose}
            // width={800}
            // height={450}
            >

                <div className="flex flex-col h-full justify-between">
                    <h5 className="mb-4">Sync API</h5>
                    <hr style={{ color: "1px solid gray" }} />
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                        <div className='flex flex-col ml-5 text-green-800'>
                            <HiDatabase />
                            <p>Sync Database-1</p>
                        </div>
                        <div className='flex flex-col ml-6'>
                            <BiRefresh />
                            <p style={{ color: "gray" }}>and</p>
                        </div>
                        <div className='flex flex-col ml-6 text-blue-800'>
                            <FiDatabase />
                            <p>OD-1 DB</p>
                        </div>
                    </div>
                    <div className="text-center mt-5">
                        <button className="text-blue-800" style={{ border: "2px solid blue", height: "30px", width: "70px" }}>Sync</button>
                    </div>
                    <div>
                        <h6>Syncing in progress</h6>
                        <div className='flex mt-4'>
                            <RiCheckboxCircleFill className='mt-1 mr-3 text-green-800' />
                            <p>Lorem Ipsum dolar sit amet consectetur</p>
                        </div>
                        <div className='flex mt-4'>
                            <RiCheckboxCircleFill className='mt-1 mr-3 text-green-800' />
                            <p>Lorem Ipsum dolar sit amet consectetur</p>
                        </div>
                        <div className='flex mt-4'>
                            <RiCheckboxCircleFill className='mt-1 mr-3 text-green-800' />
                            <p>Lorem Ipsum dolar sit amet consectetur</p>
                        </div>
                        <div className='flex mt-4'>
                            <RiCheckboxCircleFill className='mt-1 mr-3 text-green-800' />
                            <p>Lorem Ipsum dolar sit amet consectetur</p>
                        </div>
                    </div>
                    <div className="text-right mt-6">
                        <Button
                            className="mr-2"
                            variant="plain"
                        >
                            Cancel
                        </Button>
                        <Button variant="solid" onClick={() => setIsOpen(false)}>
                            Done
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default CancelledOrdersTable
