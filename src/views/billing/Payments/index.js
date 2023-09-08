import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import PaymentsTable from './components/PaymentsTable'
import PaymentsTableTools from './components/PaymentsTableTools'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'

injectReducer('paymentList', reducer)

function Payments() {
  const breadCrumbList=[{
    name:'Home',
    link:"/home"
    },{
        name:'billing',
        link:"/billing-payments"
    },{
      name:'Payments'
    }]
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
          {/* <div>Billing/Payments</div> */}
          <CustomBreadcrumbs list={breadCrumbList}/>

      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0 mt-3">Payments</h3>
        <PaymentsTableTools/>
      </div>
      <PaymentsTable/>
    </AdaptableCard>
  )
}

export default Payments