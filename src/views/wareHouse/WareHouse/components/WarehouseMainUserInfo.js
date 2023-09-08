import React, { useState } from 'react'
import { AdaptableCard } from 'components/shared'
import PartnerUserInfo from './WarehouseUserInfo'
import PartnerContractInfo from './WareHouseContractInfo'


const WarehouseMainUserInfo = (props) => {


    return (
        <>
        <div className="bg-gray-50 p-5">
          <AdaptableCard className="h-full" bodyClass="h-full" divider >
            <PartnerUserInfo />
          </AdaptableCard>
          <AdaptableCard className="h-full" bodyClass="h-full" divider >
            <PartnerContractInfo />
          </AdaptableCard>
          </div>
        </>
    )
}

export default WarehouseMainUserInfo
