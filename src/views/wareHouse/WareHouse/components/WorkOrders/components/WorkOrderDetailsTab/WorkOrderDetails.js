import React from 'react'
import { AdaptableCard } from 'components/shared'
import WorkOrderTabs from './WorkOrderTabs'
import WorkTableTools from './WorkTableTools'


function WorkOrderDetails() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
    <div>Ware House / Work Orders / WorkOrderDetails</div>
       <div className="lg:flex items-center justify-between mb-4">
           <h3 className="mb-4 lg:mb-0 mt-6">W0_762365</h3>
           <WorkTableTools/>
       </div>
       <WorkOrderTabs/>
   </AdaptableCard>
  
  )
}

export default WorkOrderDetails