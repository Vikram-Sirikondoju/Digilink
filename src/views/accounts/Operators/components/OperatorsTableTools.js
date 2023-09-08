import React, { useState } from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import OrderTableSearch from './OperatorsTableSearch'
import { Link } from 'react-router-dom'
import OperatorsFilter from './OperatorsFilter'
import {
    Input,
    Button,
    Checkbox,
    Radio,
    FormItem,
    FormContainer,
    Drawer,
} from 'components/ui'
import NewOperators from './NewOperators'
import { MdOutlineSettings } from 'react-icons/md'

const OrdersTableTools = ({ actionPermissions }) => {
    const { canAdd } = actionPermissions

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
                <Button block size="sm" icon={<MdOutlineSettings />}>
                    Columns
                </Button>
            </Link>
            <Link
                // className="block lg:inline-block md:mb-0 "
                to="/account-menu-item-view-8"
            >
                <Button
                    block
                    style={{
                        fontStyle: 'normal',
                        fontSize: 500,
                        fontSize: '18px',
                    }}
                    className="flex justify-center pt-[6px] gap-1"
                    variant="solid"
                    size="sm"
                    disabled={!canAdd}
                >
                    <p className="pt-[2px]">
                        <HiPlusCircle />
                    </p>
                    Create
                </Button>
            </Link>
        </div>
    )
}

export default OrdersTableTools
