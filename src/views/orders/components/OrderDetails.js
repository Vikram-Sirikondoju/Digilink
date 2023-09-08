import React, { useState } from 'react'
import OrderAccountInfo from './OrderAccountInfo'
import OrderContactInfo from './OrderContactInfo'
import OrderAddressInfo from './OrderAddressInfo'
import OrderUploadFiles from './OrderUploadFiles'
import OrderBillingInfo from './OrderBillingInfo'
import { AdaptableCard } from 'components/shared'
import { Card } from 'components/ui'
import { useLocation } from 'react-router-dom'


const OrderDetails = (props) => {
    const location = useLocation()

    const data = location?.state?.rowData;
    // console.log("navya",location?.state?.rowData)
    return (
        <>
        <AdaptableCard className="h-full" bodyClass="h-full" divider >
        <Card className="mb-4">
                <div className="md:grid grid-cols-2 mb-4">
                    <h5 className="mb-4 mt-1 font-bold">
                        ORDER DETAILS{' '}
                    </h5>
                </div>
                <div className="md:grid grid-cols-6">
                    <div >
                        <div className="text-base text-black font-bold decoration-2 mb-2">
                            Order ID:
                        </div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">{data.id}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base text-black font-bold decoration-2 mb-2">
                            Order Value
                        </div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">{data.ord_value}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base text-black font-bold decoration-2 mb-2">
                            Date of Order
                        </div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">{data.ord_dt_of_ord}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base text-black font-bold decoration-2 mb-2">
                            Customer ID:
                        </div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">{data.rel_ord_cust_id}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base text-black font-bold decoration-2 mb-2">
                            Customer Name:
                        </div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">{data.rel_ord_cust_id}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base text-black font-bold decoration-2 mb-2">
                            Preferred Payment Mode:
                        </div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">{data.dgl_ord_payments?.length > 0 ? data.dgl_ord_payments[0]?.pay_mode : ""}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base text-black font-bold decoration-2 mb-2 mt-2">
                            Payment Status:
                        </div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">{data.dgl_ord_payments?.length > 0 ? data.dgl_ord_payments[0]?.pay_status : ""}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base text-black font-bold decoration-2 mb-2 mt-2">
                            Delivery Address:
                        </div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">{data.ord_delivery_add}</p>
                        </div>
                    </div>
                    {/* <div>
                        <div className="text-base text-black font-bold decoration-2 mb-2 mt-2">
                            Solutions Details:
                        </div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">Amazon Echo Show with Fire...</p>
                        </div>
                    </div> */}
                    <div>
                        <div className="text-base text-black font-bold decoration-2 mb-2 mt-2">
                            Quantity of Order:
                        </div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">{data.ord_tot_qty}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base text-black font-bold decoration-2 mb-2 mt-2">
                            Order Status:
                        </div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">{data.ord_status}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base text-black font-bold decoration-2 mb-2 mt-2">
                            Proof of Delivery: 
                        </div>
                            <a className='text-blue-500' href='javascript:void(0)'>{data.ord_proof_of_del_url}</a>
                        {/* <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">Customer 1</p>
                        </div> */}
                    </div>
                </div>
            </Card>
          </AdaptableCard>
          {/* <AdaptableCard className="h-full" bodyClass="h-full" divider >
          <div className="md:grid grid-cols-2 mb-4">
          <h3 className="mx-4 mb-4 mt-2">SOLUTIONS DETAILS</h3>
          </div>
          </AdaptableCard>
          <AdaptableCard className="h-full" bodyClass="h-full" divider >
          <OrderAddressInfo/>
          </AdaptableCard>
          <AdaptableCard className="h-full" bodyClass="h-full" divider >
          <OrderBillingInfo/>
          </AdaptableCard>
          <AdaptableCard className="h-full" bodyClass="h-full" >
          <OrderUploadFiles/>
          </AdaptableCard> */}
        </>
    )
}

export default OrderDetails
