import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import OrdersTabs from './components/OrdersTabs'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'

injectReducer('salesOrderList', reducer)

const Orders = () => {
    const breadCrumbList=[{
        name:'Home',
        link:"/home"
        },{
            name:'Orders'
        }]
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
             {/* list={breadCrumbList} */}
            <CustomBreadcrumbs/>
            <OrdersTabs />
        </AdaptableCard>
    )
}

export default Orders
