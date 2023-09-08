import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import OrderTableSearch from './WareHousOrderTableSearch'
import { Link } from 'react-router-dom'
import OperatorsFilter from './WarehouseProductFilter'
import {
    Input,
    Button,
    Checkbox,
    Radio,
    FormItem,
    FormContainer,
    Drawer,
} from 'components/ui'


const WareHouseOrdersTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <OrderTableSearch />
            <OperatorsFilter />
            <Link
                className="block lg:inline-block  ltr:md:ml-2 md:mx-2 md:mb-0 mb-4"
                target="_blank"
                download
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link>
            <Link
                className="block lg:inline-block ltr:md:ml-0 md:mx-2 md:mb-0 mb-4"
                target="_blank"
                download
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Sync
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/warehouse-new-warehouse"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                   Add Warehouse
                </Button>
            </Link>
        </div>
    )
}

export default WareHouseOrdersTableTools
