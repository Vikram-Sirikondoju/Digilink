import { Card } from 'components/ui'
import React from 'react'
import WorkOrderTabTable from './WorkOrderTabTable'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'

const WorkOrderTabDetails = () => {
    const res = useSelector((state) => state.wareHouse.data)
    const workOrderData = res?.workOrderItem
    const qty = workOrderData?.dgl_wo_intry_allocation?.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity,
        0
    )
    return (
        <>
            <Card className="mx-3 mb-6">
                <div className="md:grid grid-cols-4">
                    <div className="md:gird mx-2">
                        <div className="text-base text-black font-bold   decoration-2">
                            Work Order ID
                        </div>
                        <div className="col-span-6 md:grid grid-cols-2 gap-2">
                            <p className="mt-2 text-base">
                                {workOrderData?.wo_unq_id}
                            </p>
                        </div>
                    </div>
                    <div className="md:gird mx-2">
                        <div className="text-base text-black font-bold   decoration-2">
                            Ware House Title
                        </div>
                        <div className=" md:grid grid-cols-2 gap-2">
                            <p className="mt-2 text-base">
                                {workOrderData?.wo_desc}
                            </p>
                        </div>
                    </div>
                    <div className="md:gird mx-2">
                        <div className="text-base text-black font-bold   decoration-2">
                            Order ID
                        </div>
                        <div className="md:grid grid-cols-2 gap-2">
                            <p className="mt-2 text-base">
                                {workOrderData?.dgl_ord_info_id}
                            </p>
                        </div>
                    </div>
                    <div className="md:gird mx-2">
                        <div className="text-base text-black font-bold   decoration-2">
                            Status
                        </div>
                        <div className=" md:grid grid-cols-2 gap-2">
                            <p className="mt-2 text-base">
                                {workOrderData?.wo_status}
                            </p>
                        </div>
                    </div>
                    <div className="md:gird mx-2 mt-6">
                        <div className="text-base text-black font-bold   decoration-2">
                            Work Order Date
                        </div>
                        <div className="md:grid grid-cols-2 gap-2">
                            <p className="mt-2 text-base">
                                {dayjs(
                                    workOrderData?.wo_alltd_dt,
                                    'YYYY-MM-DD'
                                )?.format('YYYY-MM-DD')}
                            </p>
                        </div>
                    </div>
                    <div className=" md:gird mx-2 mt-6">
                        <div className="text-base text-black font-bold   decoration-2">
                            Items Quantity
                        </div>
                        <div className=" md:grid grid-cols-2 gap-2">
                            <p className="mt-2 text-base">{qty}</p>
                        </div>
                    </div>
                    <div className="md:gird mx-2 mt-6">
                        <div className="text-base text-black font-bold   decoration-2">
                            Work Orders Due Date
                        </div>
                        <div className="md:grid grid-cols-2 gap-2">
                            <p className="mt-2 text-base">--</p>
                        </div>
                    </div>
                    <div className="md:gird mx-2 mt-6">
                        <div className="text-base text-black font-bold   decoration-2">
                            Order Description
                        </div>
                        <div className="md:grid grid-cols-2 gap-2">
                            <p className="mt-2 text-base">
                                {workOrderData?.wo_desc}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
            <div className="mt-6">
                <WorkOrderTabTable />
            </div>
        </>
    )
}

export default WorkOrderTabDetails
