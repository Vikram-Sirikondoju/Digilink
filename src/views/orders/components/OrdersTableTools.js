import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import OrderTableSearch from './OrdersTableSearch'
import { Link } from 'react-router-dom'
import OperatorsFilter from './OrdersFilter'
import {
    Input,
    Button,
    Checkbox,
    Radio,
    FormItem,
    FormContainer,
    Drawer,
} from 'components/ui'
import NewOrders from './NewOrders'


const OrdersTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <OrderTableSearch />
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
            {/* <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/warehouse-new-order"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                   Create
                </Button>
            </Link> */}
        </div>
    )
}

export default OrdersTableTools
