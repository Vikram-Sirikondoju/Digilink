
import React from 'react'
import { Tabs } from 'components/ui'
import OrdersTable from './OrdersTable'
import OrdersTableTools from './OrdersTableTools'
import CancelledOrdersTable from './CancelledOrdersTable'
import ReplacedOrdersTable from './ReplacedOrdersTable'
import OrderDeleteConfirmation from './OrdersDeleteConfirmation'
import OrderDetails from './OrderDetails'
import { AdaptableCard } from 'components/shared'
import OrderOverviewHeaderActions from './OrderOverviewHeaderActions'
import OrdersSolutionTable from './OrdersSolutionDetails'
import OrdersShipAndDelivery from './OrderShipAndDelivery'
import OrderPaymentDetails from './OrdersPaymentDetails'
// import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'

const { TabNav, TabList, TabContent } = Tabs

const Default = () => {
    const breadCrumbList=[{
        name:'Home',
        link:"/home"
        },{
            name:'Orders',
            link:"/orders"
        },{
          name:'Order Details'
        }]
    return (
        <>

            {/* <CustomBreadcrumbs /> */}
            {/* <div>Home/Orders/Order Details</div> */}
                <AdaptableCard className="h-full" bodyClass="h-full">
                    <div>
                        <Tabs defaultValue="orderDetails">
                            <TabList>
                                <TabNav value="orderDetails">Order Details</TabNav>
                                <TabNav value="workOrders">Work Orders</TabNav>
                                <TabNav value="orderFulfillment">Order Fulfillment</TabNav>
                                <TabNav value="conflicts">Conflicts</TabNav>
                            </TabList>
                            <div className="p-4">
                                <TabContent value="orderDetails">
                                <div className="lg:flex items-center justify-between mb-4">
                                    <h3 className="mb-4 lg:mb-0">Order Details</h3>
                                        <OrderOverviewHeaderActions/>
                                </div>
                                <OrderDetails />
                                <div className='my-4 pb-6 border-b'>
                                    <h5 className="mb-4 mx-4 font-bold">SOLUTION DETAILS</h5>
                                    <OrdersSolutionTable />
                                </div>
                                <div className='mb-8 pb-6 border-b'>
                                    <h5 className="mb-4 mx-4 font-bold">SHIPMENT & DELIVERY</h5>
                                    <OrdersShipAndDelivery />
                                </div>
                                <OrderPaymentDetails />
                                    {/* <OrdersTable /> */}
                                    {/* <OrderDeleteConfirmation /> */}
                                </TabContent>
                                <TabContent value="workOrders">
                                    <div className="lg:flex items-center justify-between mb-4">
                                        <h3 className="mb-4 lg:mb-0">Work Orders</h3>
                                        <OrdersTableTools />
                                    </div>
                                    <CancelledOrdersTable />
                                    <OrderDeleteConfirmation />
                                </TabContent>
                                <TabContent value="orderFulfillment">
                                    <div className="lg:flex items-center justify-between mb-4">
                                        <h3 className="mb-4 lg:mb-0">Order Fulfillment</h3>
                                        <OrdersTableTools />
                                    </div>
                                    <ReplacedOrdersTable />
                                    <OrderDeleteConfirmation />
                                </TabContent>
                                <TabContent value="conflicts">
                                    <div className="lg:flex items-center justify-between mb-4">
                                        <h3 className="mb-4 lg:mb-0">Conflicts</h3>
                                        <OrdersTableTools />
                                    </div>
                                    <ReplacedOrdersTable />
                                    <OrderDeleteConfirmation />
                                </TabContent>
                            </div>
                        </Tabs>
                    </div>
                </AdaptableCard>
            </>
    )
}

export default Default

