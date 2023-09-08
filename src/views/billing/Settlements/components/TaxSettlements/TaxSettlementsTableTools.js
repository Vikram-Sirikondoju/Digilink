import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
 import { Link } from 'react-router-dom'
import {
    Button,
   
} from 'components/ui'

import TaxSettlementsTableSearch from './TaxSettlementsTableSearch'
import TaxSettlementsFilters from './TaxSettlementsFilters'


const TaxSettlementsTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
        <TaxSettlementsTableSearch/>
        <TaxSettlementsFilters/>
            <Link
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                target="_blank"
                download
                
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link>
            
        </div>
    )
}

export default TaxSettlementsTableTools
