import React from 'react'

import { AdaptableCard } from 'components/shared'
import SettlementIdTableTools from './SettlementIdTableTools'
import SettlementIdTable from './SettlementIdTable'

function SettlementId() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
         <div>Billing / Settlements / Settlement ID</div>
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0 mt-4">Settlement</h3>
                <SettlementIdTableTools/>
            </div>
            <SettlementIdTable/>
        </AdaptableCard>
   
  )
}

export default SettlementId