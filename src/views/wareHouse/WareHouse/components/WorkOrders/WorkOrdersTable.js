import React, { useEffect, useCallback, useMemo, useRef } from 'react'
import { Badge, Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import { getAllWorkOrders, setWorkOrderTableData } from '../../store/dataSlice'
import { cloneDeep } from 'lodash'

const ActionColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()


    const onView = useCallback(() => {
        navigate(`/workorder-details/${row?.id}`)
    }, [navigate, row])

    return (
        <div className="text-lg">
            <Tooltip title="Edit">
                <span
                    className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                    onClick={onView}
                >
                   <HiOutlineEye />

                </span>
            </Tooltip>
        </div>
    )
}

const WorkOrdersTable = () => {

     const tableRef = useRef(null)

     const dispatch = useDispatch()
     const { pageIndex, pageSize, sort, query, total } = useSelector(
         (state) => state.wareHouse?.data?.workOrderTableData
     );
     const loading = useSelector((state) => state.wareHouse.data.loading)
 
     const data = useSelector((state) => state.wareHouse.data.allWorkOrdersList)
     
     const fetchData = useCallback(() => {
         dispatch(getAllWorkOrders({ page_no: pageIndex - 1, page_size: pageSize, sort_field: 'id' }))
     }, [dispatch, pageIndex, pageSize, sort, query])
 
     useEffect(() => {
         fetchData()
     }, [dispatch, fetchData, pageIndex, pageSize, sort])
 
     const tableData = useMemo(
         () => ({ pageIndex, pageSize, sort, query, total }),
         [pageIndex, pageSize, sort, query, total]
     )
    // const data = [
    //     {
    //         workOrderId:"WO_762365",
    //         Assignee:"John Depp",
    //         createDate:"14/2/2023",
    //         productTitle:"Amazon Echo5",
    //         productQty:"200",
    //         estimatedTimeOfDelivery:"5 Days"
    //     },
    //     {
    //         workOrderId:"WO_762365",
    //         Assignee:"John Depp",
    //         createDate:"14/2/2023",
    //         productTitle:"Amazon Echo5",
    //         productQty:"200",
    //         estimatedTimeOfDelivery:"5 Days"
    //     },
    //     {
    //         workOrderId:"WO_762365",
    //         Assignee:"John Depp",
    //         createDate:"14/2/2023",
    //         productTitle:"Amazon Echo5",
    //         productQty:"200",
    //         estimatedTimeOfDelivery:"5 Days"
    //     }
    // ]

    const columns = useMemo(
        () => [
            {
                header: 'Actions',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
            {
                header: 'WORK ORDER ID',
                accessorKey: 'wo_unq_id',
            },
            // {
            //     header: 'ASSIGNEE',
            //     accessorKey: 'Assignee',
            // },
            {
                header: 'CREATED DATE',
                accessorKey: 'wo_alltd_dt',
            },
            {
                header: 'PRODUCT TITLE',
                accessorKey: 'wo_desc',
            },
            {
                header: 'PRODUCT QTY',
                accessorKey: 'productQty',
                cell: (props) => {
                    const prodQtyArray = props.row.original.dgl_wo_intry_allocation
                    let qty=0
                    if(prodQtyArray?.length > 0){
                        qty=prodQtyArray.reduce(
                            (accumulator, currentValue) => accumulator + currentValue.quantity,
                            0
                          );
                    }
                    return (
                        <>{qty}</>
                    )
                },
            },
            {
                header: 'ESTIMATED TIME OF DELIVERY',
                accessorKey: 'dgl_wo_shippment_details.dispatchdate',
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
            }
        ],
        []
    )
    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setWorkOrderTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setWorkOrderTableData(newTableData))
    }

    const onSort = (sort) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setWorkOrderTableData(newTableData))
    }

    console.log(data)
    return (
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
    )
}

export default WorkOrdersTable

