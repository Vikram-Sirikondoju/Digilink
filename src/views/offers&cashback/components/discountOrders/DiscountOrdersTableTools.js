import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import {
    Input,
    Button,
    Checkbox,
    Radio,
    FormItem,
    FormContainer,
    Drawer,
} from 'components/ui'
import DiscOrderFilter from './DiscountOrdersFilters'
import DiscountOrdersTableSearch from './DiscountOrdersTableSearch'


const DiscountOrdersTableTools = () => {
    return (
        
        <div className="flex flex-col lg:flex-row lg:items-center">
            <DiscountOrdersTableSearch />
            <DiscOrderFilter />
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

export default DiscountOrdersTableTools
