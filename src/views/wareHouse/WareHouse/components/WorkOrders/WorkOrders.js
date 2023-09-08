import React from 'react'
import { AdaptableCard } from 'components/shared'
import WorkOrdersTableTools from './WorkOrdersTools'
import WorkOrdersTable from './WorkOrdersTable'
import { injectReducer } from 'store'
import reducer from '../../store'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'
injectReducer('wareHouse', reducer)
const WorkOrders = () => {
    const breadCrumbList = [
        {
            name: 'Home',
            link: '/home',
        },
        {
            name: 'Work Orders',
        },
    ]
    return (
        <div>
            {/* list={breadCrumbList} */}
            <CustomBreadcrumbs  />
            <AdaptableCard className="h-full" bodyClass="h-full">
                <div className="lg:flex items-center justify-between mb-4">
                    <h3 className="mb-4 lg:mb-0 mt-4">Work Orders</h3>
                    <WorkOrdersTableTools />
                </div>
                <WorkOrdersTable />
            </AdaptableCard>
        </div>
    )
}

export default WorkOrders
