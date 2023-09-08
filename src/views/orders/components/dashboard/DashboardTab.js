
import React from 'react'
import { Tabs } from 'components/ui'
import TopCustomersTableTool from './TopCustomers/TopCustomersTableTool'
import TopCustomersTable from './TopCustomers/TopCustomersTable'
import TopProvidersTableTools from './TopProviders/TopProvidersTableTools'
import TopProvidersTable from './TopProviders/TopProvidersTable'
import TopWarehousesTableTools from './TopWarehouses/TopWarehousesTableTools'
import TopWarehousesTable from './TopWarehouses/TopWarehousesTable'

const { TabNav, TabList, TabContent } = Tabs

const Default = () => {
    return (
        <div>
            <Tabs defaultValue="topCustomers">
                <TabList>
                    <TabNav value="topCustomers">Top Customers</TabNav>
                    <TabNav value="topProviders">Top Providers</TabNav>
                    <TabNav value="topWarehouses">Top Warehouses</TabNav>
                </TabList>
                <div className="p-4">
                    <TabContent value="topCustomers">
                        <div className="lg:flex items-center justify-between mb-4">
                        <h3 className="mb-4 lg:mb-0"></h3>
                            <TopCustomersTableTool/>
                        </div>
                        <TopCustomersTable/>
                    </TabContent>
                    <TabContent value="topProviders">
                        <div className="lg:flex items-center justify-between mb-4">
                        <h3 className="mb-4 lg:mb-0"></h3>
                            <TopProvidersTableTools />

                        </div>
                        <TopProvidersTable />
                    </TabContent>
                    <TabContent value="topWarehouses">
                        <div className="lg:flex items-center justify-between mb-4">
                        <h3 className="mb-4 lg:mb-0"></h3>
                            <TopWarehousesTableTools />
                        </div>
                        <TopWarehousesTable/>
                    </TabContent>


                </div>
            </Tabs>
        </div>
    )
}

export default Default

