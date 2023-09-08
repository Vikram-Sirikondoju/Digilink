import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { DataTable } from 'components/shared'
import { useSelector } from 'react-redux'

const WorkOrderTabTable = () => {
    const tableRef = useRef(null)
    const res = useSelector((state) => state.wareHouse.data)
    const workOrderItem = res?.workOrderItem
    // const productItems = res?.productItems
    const data=workOrderItem?.dgl_wo_intry_allocation

    const columns = useMemo(
        () => [
            {
                header: 'Product Title',
                accessorKey: 'item_var_id',
            },
            {
                header: 'Product ID',
                accessorKey: 'item_var_id',
            },
            {
                header: 'Quantity',
                accessorKey: 'quantity',
            },
            // {
            //     header: 'Description',
            //     accessorKey: 'duration',
            // },
            {
                header: 'Status of processing',
                accessorKey: 'status',
                cell: (props) => {
                    // return (
                    //     <div className="flex items-center">
                    //         <Badge
                    //             className={ItemStatusColor[0].dotClass}
                    //         />
                    //         <span
                    //             className={`ml-2 rtl:mr-2 capitalize font-semibold ${ItemStatusColor[0].textClass}`}
                    //         >
                    //             {ItemStatusColor[0].label}
                    //         </span>
                    //     </div>
                    // )
                    return (
                        <>{workOrderItem?.wo_status}</>
                    )
                },
            }
        ],
        []
    )

  
    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
            />
        </>


    )
}

export default WorkOrderTabTable

