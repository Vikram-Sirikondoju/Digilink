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
import CashBackTableSearch from './CashBackTableSearch'
import CashBackFilter from './CashBackFilter'


const CashBackTableTools = () => {
    return (
        
        <div className="flex flex-col lg:flex-row lg:items-center">
            <CashBackTableSearch />
           <CashBackFilter/>
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
                to="/create-cashback"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                   Add Cashbacks
                </Button>
            </Link>

          
        </div>
    )
}

export default CashBackTableTools
