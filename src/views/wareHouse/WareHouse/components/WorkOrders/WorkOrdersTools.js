import React from 'react'
import { HiDownload } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import {BiRefresh} from 'react-icons/bi'

import {
   Button,
 
} from 'components/ui'
import WorkOrdersTableSearch from './WorkOrdersTableSearch'
 import WorkOrdersFilter from './WorkOrdersFilter'



const WorkOrdersTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            {/* <InventoryTableSearch/>
            <InventoryFilter/> */}
            <WorkOrdersTableSearch/>
            <WorkOrdersFilter/>
            <Link
                className="block lg:inline-block ltr:md:ml-2 md:mx-2 md:mb-0 mb-4"
                target="_blank"
                download
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link>
            <Link
                className="block lg:inline-block ltr:md:ml-0 md:mx-2 md:mb-0 mb-4"
                // target="_blank"
                // to="/warehouse-new-add-inventory" 
                >
                    <Button block size="sm" style={{backgroundColor:"gray", color:"white"}} icon={<BiRefresh />}>
                    Sync
                </Button>
               
            </Link>
        </div>
    )
}

export default WorkOrdersTableTools
