import React from 'react'
import { HiDownload } from 'react-icons/hi'

import { Link } from 'react-router-dom'
import OperatorsFilter from './ApiConfigurationFilters'
import {
    // Input,
     Button,
    
} from 'components/ui'
import ApiConfigurationTableSearch from './ApiConfigurationTableSearch'
//import NewOperators from './NewSolutions'


const ApiConfigurationTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
           <ApiConfigurationTableSearch/>
            <OperatorsFilter />
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

export default ApiConfigurationTableTools
