
import React from 'react'
import { Tabs } from 'components/ui'
import OrdersTable from './OrdersTable'
import OrdersTableTools from './OrdersTableTools'
import CancelledOrdersTable from './CancelledOrdersTable'
import ReplacedOrdersTable from './ReplacedOrdersTable'
import OrderDeleteConfirmation from './OrdersDeleteConfirmation'
import OrderOverview from './OrderOverview'
import OrderOverviewHeaderActions from './OrderOverviewHeaderActions'
import Dashboard from './dashboard/Dashboard'

const { TabNav, TabList, TabContent } = Tabs

const Default = () => {
    return (
        <div>
            <Tabs defaultValue="dashboard">
                <TabList>
                    <TabNav value="dashboard">Dashboard</TabNav>
                    <TabNav value="orders">Orders</TabNav>
                    <TabNav value="cancelledOrders">Cancelled Orders</TabNav>
                    <TabNav value="replacedOrders">Replaced Orders</TabNav>
                </TabList>
                <div className="p-4">
                <TabContent value="dashboard">
                        <div className="lg:flex items-center justify-between mb-4">
                            {/* <h3 className="mb-4 lg:mb-0">Dashboard</h3> */}
                            {/* <OrdersTableTools /> */}
                        </div>
                        <Dashboard/>
                        
                    </TabContent>
                    <TabContent value="orders">
                        <div className="lg:flex items-center justify-between mb-4">
                            <h3 className="mb-4 lg:mb-0">Orders</h3>
                            <OrdersTableTools />
                        </div>
                        <OrdersTable />
                        <OrderDeleteConfirmation />
                    </TabContent>
                    <TabContent value="cancelledOrders">
                        <div className="lg:flex items-center justify-between mb-4">
                            <h3 className="mb-4 lg:mb-0">Cancelled Orders</h3>
                            <OrdersTableTools />
                        </div>
                        <CancelledOrdersTable />
                        <OrderDeleteConfirmation />
                    </TabContent>
                    <TabContent value="replacedOrders">
                        <div className="lg:flex items-center justify-between mb-4">
                            <h3 className="mb-4 lg:mb-0">Replaced Orders</h3>
                            <OrdersTableTools />
                        </div>
                        <ReplacedOrdersTable />
                        <OrderDeleteConfirmation />
                    </TabContent>
                </div>
            </Tabs>
        </div>
    )
}

export default Default

