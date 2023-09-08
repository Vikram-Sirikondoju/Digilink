import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import  OfferCashBackTab from "./components/OfferCashBackTab"


injectReducer('salesOrderList', reducer)

const OffersAndCashBack = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <OfferCashBackTab />
        </AdaptableCard>
    )
}

export default OffersAndCashBack
