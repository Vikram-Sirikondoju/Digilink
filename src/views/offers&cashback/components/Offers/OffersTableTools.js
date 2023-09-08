import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
 import { Link } from 'react-router-dom'
import {
    Button,
   
} from 'components/ui'
// import NewOperators from './NewOperators'
import OffersTableSearch from './OffersTableSearch'
import OffersFilters from './OffersFilters'


const OffersTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <OffersTableSearch/>
            <OffersFilters/>
            <Link
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                target="_blank"
                download
                
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/offers-create-offers"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                   Add New Offer
                </Button>
            </Link>
        </div>
    )
}

export default OffersTableTools
