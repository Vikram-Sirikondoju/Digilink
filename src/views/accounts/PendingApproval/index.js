import React from 'react'
import { AdaptableCard } from 'components/shared'
import reducer from './store'
import { injectReducer } from 'store/index'
import PendingApprovalsTableTools from './components/PendingApprovalsTableTools'
import PendindApprovalsTable from './components/PendindApprovalsTable'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'


injectReducer('PendingArrovalsList', reducer)
const PendingApprovals = () => {
  let  breadCrumbList=[{
    name:'Accounts',
    // link:"/home"
},{
    name:'Pending Approvals',
    link:"/account-menu-item-view-7"
}]
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <CustomBreadcrumbs  />
    <div className="lg:flex items-center justify-between mb-4 mt-3">
        <h3 className="mb-4 lg:mb-0">Pending Approvals</h3>
        <PendingApprovalsTableTools />
    </div>
    <PendindApprovalsTable />
    
</AdaptableCard>
  )
}

export default PendingApprovals