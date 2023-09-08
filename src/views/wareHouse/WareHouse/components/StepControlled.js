import React, { useState } from 'react'
import { Steps, Button } from 'components/ui'
import NewOperators from './NewWareHouse'
import WareHouseDetails from './WareHouseDetails'
import { AdaptableCard } from 'components/shared'
import PartnersMainUserInfo from './WarehouseMainUserInfo'
import PartnersPreview from './WarehousePreview'
import { Link } from 'react-router-dom'

const Controlled = () => {
    return (
        <div>
            <WareHouseDetails />
        </div>
    )
}

export default Controlled
