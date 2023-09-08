import React, { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Accordion from 'components/shared/Accordion'
import DataPlanActivation from './DataPlanActivation'
import AccordionSteps from './AccordionSteps'
const ReplacedOrdersTable = () => {
    const location = useLocation()

    const data = location?.state?.rowData;
    const AccordionItems = data.dgl_wo_infos.map((val,index) => {
        if(val.wo_desc === "Product WorkOrder"){
            return {
                title: <>Product<h4>{val.wo_number}</h4></>,
                component: <AccordionSteps woIndex={index}/>,
            }
        }
        if(val.wo_desc === "SP WorkOrder" || val.wo_desc === "DP WorkOrder"){
            return {
                title: <>Data Plan<h4>{val.wo_number}</h4></>,
                component: <DataPlanActivation woIndex={index}/>,
            }
        }
    })
    return (
        <div className="mt-5">
            <Accordion Items={AccordionItems} />  
        </div>
    )
}

export default ReplacedOrdersTable