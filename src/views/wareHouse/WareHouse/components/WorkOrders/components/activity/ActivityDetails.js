import React from 'react'

import { AdaptableCard } from 'components/shared'
import ActivityTableTools from './ActivityTableTools'
import ActivityTable from './ActivityTable'
// import ActivityTableTools from './ActivityTableTools'
// import ActivityTable from './ActivityTable'


function ActivityDetails() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
             <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Activity Log</h3>
                {/* <SettlementIdTableTools/> */}
                <ActivityTableTools/>
            </div>
            {/* <SettlementIdTable/> */}
            <div className='mt-6'>
            <ActivityTable/>
            </div>
        </AdaptableCard>
   
  )
}

export default ActivityDetails