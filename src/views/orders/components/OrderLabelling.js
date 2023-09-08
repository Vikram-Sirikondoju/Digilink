import React, {useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Badge, Tooltip,Button,Dialog } from 'components/ui'
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
import useThemeClass from 'utils/hooks/useThemeClass'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import { MdModeEdit } from 'react-icons/md'
import {HiDatabase} from 'react-icons/hi'
import {FiDatabase} from 'react-icons/fi'
import { AiFillCopy } from "react-icons/ai"
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { getItems } from 'views/accounts/PendingApproval/store/dataSlice'
import { BiRefresh } from 'react-icons/bi'
import { Link, useNavigate, useLocation } from 'react-router-dom'
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



const OrderLabelling = ({woIndex}) => {

    const [isOpenRefresh, setIsOpen] = useState(false)
    const location = useLocation()
    const rawdata = location?.state?.rowData;

    const wo_info = rawdata?.dgl_wo_infos[woIndex]
    const data = wo_info.map(function(item, index) {
        return {wo_status: item.wo_status, item_var_id: wo_info[index].dgl_wo_intry_allocation[index].dgl_work_order_labelling.item_var_id};
    });

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
                <Tooltip title="Edit">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                        //  onClick={onView}
                    >
                        <div style={{ display: "flex" }}>
                            <MdModeEdit />
                            <BiRefresh className='ml-2'style={{color:"gray"}} onClick={()=>setIsOpen(true)}/>
                        </div>
    
    
                    </span>
                </Tooltip>
            </div>
        )
    
    }

    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.salesOrderList.data.tableData
    )
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

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    // const data = [
    //     {
    //         itemId: '#ID23012',
    //         itemTitle: 'Amazon Echo Show 5',
    //         skuCode: "WB1234567",
    //         conflictRaisedBy: "N/A",
    //         barCode: "5448548",
    //         status: "Proceeded to Package",
    //         action: "1",
    //     },
    //     {
    //         itemId: '#ID23013',
    //         itemTitle: 'Amazon Fire TV Stick Lite',
    //         skuCode: "WB1234756",
    //         conflictRaisedBy: "Raju Warehouse Manger,#ID6596",
    //         barCode: "2598712",
    //         status: "Conflict Raised By Warehouse, Conflict ID - #196781",
    //         action: "2",
    //     },
    // ]

    const columns = useMemo(
        () => [
            {
                header: 'Item Id',
                accessorKey: 'item_var_id',
            },
            {
                header: 'Item Title',
                accessorKey: 'item_var_id',


            },
            {
                header: 'SKU Code',
                accessorKey: 'item_var_id',


            },
            {
                header: 'Conflict Raised By',
                accessorKey: 'item_var_id',


            },
            {
                header: 'Bar Code',
                accessorKey: 'item_var_id',


            },
            {
                header: 'Status',
                accessorKey: 'wo_status',


            },
            {
                header: 'Action',
                accessorKey: 'action',
                cell: (props) => {
                    console.log(props.row.id);
                    return (
                        <div className="flex items-center">
                            {props.row.id == '0' ? (<Button variant="solid">
                                Download QC Report
                            </Button>):(<Button variant="solid">
                                View Conflict
                            </Button>
                            )}
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
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

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
            data={data}
            // loading={loading}
            pagingData={tableData}
            onPaginationChange={onPaginationChange}
            onSelectChange={onSelectChange}
            onSort={onSort}
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
                    <hr style={{color: "1px solid gray"}} />   
                    <div style={{display:"flex",justifyContent:"center",marginTop:"20px"}}>
                        <div className='flex flex-col ml-5 text-green-800 h-14'>
                            <HiDatabase/>
                            <p>Sync Database-1</p>
                        </div>
                        <div className='flex flex-col ml-6'>
                            <BiRefresh/>
                            <p style={{color:"gray"}}>and</p>
                        </div>
                        <div className='flex flex-col ml-6 text-blue-800'>
                            <FiDatabase/>
                            <p>OD-1 DB</p>
                        </div>
                    </div>
                    <div className="text-center mt-5">
                    <button className="text-blue-800" style={{border:"2px solid blue", height:"30px", width:"70px"}}>Sync</button>
                    </div>
                    <div>
                        <h6>Syncing in progress</h6>
                        <div className='flex mt-4'>
                            <RiCheckboxCircleFill className='mt-1 mr-3 text-green-800'/>
                            <p>Lorem Ipsum dolar sit amet consectetur</p>
                        </div>
                        <div className='flex mt-4'>
                            <RiCheckboxCircleFill  className='mt-1 mr-3 text-green-800'/>
                            <p>Lorem Ipsum dolar sit amet consectetur</p>
                        </div>
                        <div className='flex mt-4'>
                            <RiCheckboxCircleFill  className='mt-1 mr-3 text-green-800'/>
                            <p>Lorem Ipsum dolar sit amet consectetur</p>
                        </div>
                        <div className='flex mt-4'>   
                            <RiCheckboxCircleFill  className='mt-1 mr-3 text-green-800'/>
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
                        <Button variant="solid" onClick={() =>setIsOpen(false)}>
                            Done
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default OrderLabelling
