import React from 'react'
import { Tabs } from 'components/ui'
// import DiscountOrdersTableTools from './discountOrders/DiscountOrdersTableTools'
// import DiscOrdersTable from './discountOrders/DiscountOrdersTables'
import OffersTableTools from './Offers/OffersTableTools'
import OffersTable from './Offers/OffersTable'
import CashBackTable from './cashbacks/CashBackTable'
import CashBackTableTools from './cashbacks/CashBackTableTool'
import { injectReducer } from 'store'
import reducer from '../store'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'
import { AdaptableCard } from 'components/shared'
import { useNavigate, useParams } from 'react-router-dom'

const { TabNav, TabList, TabContent } = Tabs
injectReducer('offerCashback', reducer)
const OfferCashBackTab = () => {
    const {name}=useParams()
    const navigate= useNavigate()
    const breadCrumbList = [
        {
            name: 'Home',
            link: '/home',
        }, 
        {
            name: 'Offers & Cashback',
        },
    ]
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
        <div>
        {/* list={breadCrumbList}  */}
            <CustomBreadcrumbs />
            <Tabs defaultValue={name} onChange={(val)=>navigate(`/offers-and-cashbacks/${val}`)}>
                <TabList>
                    <TabNav value="offers">Offers</TabNav>
                    <TabNav value="cashbacks">Cashbacks</TabNav>
                    {/* <TabNav value="discountorder">Discounted Orders</TabNav> */}
                </TabList>
                <div>
                    <TabContent value="offers">
                        <div className="lg:flex items-center justify-between mt-6 mb-6">
                            <h3 className="mb-4 lg:mb-0">Offers</h3>
                            <OffersTableTools />
                        </div>
                        <OffersTable />
                    </TabContent>
                    <TabContent value="cashbacks">
                        <div className="lg:flex items-center justify-between mt-6 mb-6">
                            <h3 className="mb-4 lg:mb-0">Cashbacks</h3>
                            <CashBackTableTools />
                        </div>
                        <CashBackTable />
                    </TabContent>
                    {/* <TabContent value="discountorder">
                        <div className="lg:flex items-center justify-between mt-6 mb-6">
                            <h3 className="mb-4 lg:mb-0">Discount Orders</h3>
                            <DiscountOrdersTableTools />
                        </div>
                        <DiscOrdersTable />
                    </TabContent> */}
                </div>
            </Tabs>
        </div>
        </AdaptableCard>
    )
}

export default OfferCashBackTab
