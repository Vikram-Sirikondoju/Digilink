import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
 import { Link } from 'react-router-dom'
import {
    Button,
   
} from 'components/ui'
import WorkOrderRaise from './WorkOrderRaise'
import WorkOrderClose from './WorkOrderClose'



const WorkTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            {/* <SettlementTableIdSearch/> */}
            <WorkOrderRaise/>
            {/* <SettlementIdFilters/>      */}
         <WorkOrderClose/>     
        </div>
    )
}

export default WorkTableTools
