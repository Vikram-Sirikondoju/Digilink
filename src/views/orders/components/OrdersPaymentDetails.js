import React, { useState } from 'react'
import OrderAccountInfo from './OrderAccountInfo'
import OrderContactInfo from './OrderContactInfo'
import OrderAddressInfo from './OrderAddressInfo'
import OrderUploadFiles from './OrderUploadFiles'
import OrderBillingInfo from './OrderBillingInfo'
import { AdaptableCard } from 'components/shared'
import { Card } from 'components/ui'
import { useLocation } from 'react-router-dom'


const OrderPaymentDetails = (props) => {
    const location = useLocation()

    const data = location?.state?.rowData;
    const paymentDetails = data?.dgl_ord_payments?.[0];
    // console.log("navya",location?.state?.rowData)
    return (
        <>
        <AdaptableCard className="h-full" bodyClass="h-full" >
        <Card className="mb-4">
                <div className="md:grid grid-cols-2 mb-4">
                    <h5 className="mb-4 mt-1 font-bold">
                        PAYMENT DETAILS{' '}
                    </h5>
                </div>
                <div className="md:grid grid-cols-4">
                    <div className='mb-4 mr-2'>
                        <p className="text-base text-black font-bold decoration-2 mb-0">Bundle Name:</p>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base break-words mr-2">Amazon Echo show with Fire TV Stick Lite, data & subscription plans</p>
                        </div>
                    </div>
                    <div className='mb-4 mr-2'>
                        <p className="text-base text-black font-bold decoration-2 mb-0">Payment Date & Time:</p>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 mr-2 text-base">{paymentDetails?.pay_dttime}</p>
                        </div>
                    </div>
                    <div className='mb-4 mr-2'>
                        <p className="text-base text-black font-bold decoration-2 mb-0">Payment Status:</p>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 mr-2 text-base">{paymentDetails?.pay_status}</p>
                        </div>
                    </div>
                    <div className='mb-4 mr-2'>
                        <p className="text-base text-black font-bold decoration-2 mb-0">Mode of payment:</p>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 mr-2 text-base">{paymentDetails?.pay_mode}</p>
                        </div>
                    </div>
                    <div className='mb-4 mr-2'>
                        <p className="text-base text-black font-bold decoration-2 mb-0">Totla amount payable:</p>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 mr-2 text-base">{data?.ord_cart_tot_amount}</p>
                        </div>
                    </div>
                    <div className='mb-4 mr-2'>
                        <p className="text-base text-black font-bold decoration-2 mb-0">Transaction ID:</p>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 mr-2 text-base">{paymentDetails?.transaction_id}</p>
                        </div>
                    </div>
                </div>
            </Card>
          </AdaptableCard>
        </>
    )
}

export default OrderPaymentDetails
