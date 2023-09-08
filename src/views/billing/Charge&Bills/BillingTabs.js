import React from 'react'
import { Tabs } from 'components/ui'
import ChargeAndBillsTableTools from './components/ChargeAndBillsTableTools'
import ChargeAndBillsTable from './components/ChargeAndBillsTable'
import EnterPriseTableTools from './components/EnterPriseTableTools'
import EnterPriseCustTable from './components/EnterPriseCustTable'
import RetailCustTableTools from './components/RetailCustTableTools'
import RetaiCustTable from './components/RetaiCustTable'
import { injectReducer } from 'store'
import reducer from './store'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'
import { useNavigate, useParams } from 'react-router-dom'

const { TabNav, TabList, TabContent } = Tabs
injectReducer('billing', reducer)
const BillingTab = () => {
    const {name}=useParams()
    const navigate= useNavigate()
    const breadCrumbList=[{
        name:'Home',
        link:"/home"
    },{
        name:'billing'
    }]
    return (
        <div>
            {/* <CustomBreadcrumbs list={breadCrumbList}/> */}
            {/* <div className='mb-4'>Billing/ChargeAndBills</div> */}
            <Tabs defaultValue={name || "unbilled-invoice"} onChange={(val)=>navigate(`/billing/${val}`)}>
                <TabList>
                    <TabNav value="unbilled-invoice">Unbilled Invoice</TabNav>
                    <TabNav value="enterprise-customers">Enterprise Customer</TabNav>
                    <TabNav value="retail-customers">Retail Customer</TabNav>
                </TabList>
                <div>
                    <TabContent value="unbilled-invoice">
                        <div className="lg:flex items-center justify-between mt-6 mb-6">
                            <h3 className="mb-4 lg:mb-0">Unbilled Invoice</h3>
                            <ChargeAndBillsTableTools />
                        </div>
                        <ChargeAndBillsTable />
                    </TabContent>
                    <TabContent value="enterprise-customers">
                        <div className="lg:flex items-center justify-between mt-6 mb-6">
                            <h3 className="mb-4 lg:mb-0">Enterprise Customer</h3>
                            <EnterPriseTableTools />
                        </div>
                        <EnterPriseCustTable />
                    </TabContent>
                    <TabContent value="retail-customers">
                        <div className="lg:flex items-center justify-between mt-6 mb-6">
                            <h3 className="mb-4 lg:mb-0">Retails Customer</h3>
                            <RetailCustTableTools />
                        </div>
                        <RetaiCustTable />
                    </TabContent>
                </div>

            </Tabs>
        </div>
    )
}

export default BillingTab

