import React, { useState } from 'react'
import { AdaptableCard } from 'components/shared'
import AddTaxComponent from './AddTaxComponent'

const TaxComponentForm = (props) => {
    return (
        <>
        <div className="bg-gray-50 p-5">
            <AdaptableCard className="h-full" bodyClass="h-full" divider>
                <AddTaxComponent />
            </AdaptableCard>
          </div>
        </>
    )
}

export default TaxComponentForm
