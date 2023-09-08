import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
 import { Link } from 'react-router-dom'
import {
    Button,
   
} from 'components/ui'

import CashbackSettlementsTableSearch from './CashbackSettlementsTableSearch'
import CashbackSettlementsFilters from './CashbackSettlementsFilters'


const CashbackSettlementsTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
         <CashbackSettlementsTableSearch/>
         <CashbackSettlementsFilters/>
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

export default CashbackSettlementsTableTools
