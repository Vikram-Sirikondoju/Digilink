import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import WareHouseOrdersTable from './components/WareHouseOrdersTable'
import WareHouseOrdersTableTools from './components/WareHouseOrdersTableTools'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'

injectReducer('wareHouse', reducer)

const WareHouseOrders = () => {
    const breadCrumbList=[{
        name:'Home',
        link:"/home"
    },{
        name:'WareHouse'
    }]
    return (
        <>
        {/* list={breadCrumbList} */}
        <CustomBreadcrumbs /> 
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="mx-4 my-4">
                <div className="lg:flex items-center justify-between mb-4">
                    <h3 className="mb-4 lg:mb-0 ">WareHouse</h3>
                    <WareHouseOrdersTableTools />
                </div>
                <div>
                    <WareHouseOrdersTable />
                </div>
            </div>
        </AdaptableCard>
        </>
    )
}

export default WareHouseOrders
