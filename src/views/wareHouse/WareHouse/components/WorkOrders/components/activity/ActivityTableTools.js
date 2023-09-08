import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
 import { Link } from 'react-router-dom'
import {
    Button,
   
} from 'components/ui'

import { BiRefresh } from 'react-icons/bi'
import ActivityTableSearch from './ActivityTableSearch'
import ActivityTableFilter from './ActivityTableFilter'
// import ActivityTableSearch from './ActivityTableSearch'
// import ActivityTableFilter from './ActivityTableFilter'





const ActivityTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            {/* <SettlementTableIdSearch/>
            <SettlementIdFilters/>
         */}
         <ActivityTableSearch/>
         <ActivityTableFilter/>
            
            <Link
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
            // target="_blank"
            // to="/warehouse-new-add-inventory" 
            >
                <Button block size="sm" style={{ backgroundColor: "gray", color: "white" }} icon={<BiRefresh />}>
                    Sync
                </Button>

            </Link>
        </div>
    )
}

export default ActivityTableTools
