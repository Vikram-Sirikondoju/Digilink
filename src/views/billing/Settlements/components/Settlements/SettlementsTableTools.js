import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
 import { Link } from 'react-router-dom'
import {
    Button,
   
} from 'components/ui'
import SettlementsTableSearch from './SettlementsTableSearch'
import SettlementsFilters from './SettlementsFilters'


const SettlementsTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            {/* <SettlementsTableSearch/>
            <SettlementsFilters/> */}
            <SettlementsTableSearch/>
            <SettlementsFilters/>
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

export default SettlementsTableTools
