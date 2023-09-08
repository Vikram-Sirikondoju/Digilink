import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import ItemTableSearch from './ItemsTableSearch'
import { Link } from 'react-router-dom'
import OperatorsFilter from './ItemsFilter'
import {
    Input,
    Button,
    Checkbox,
    Radio,
    FormItem,
    FormContainer,
    Drawer,
} from 'components/ui'
import NewOperators from './NewItems'


const ItemsTableTools = ({ actionPermissions }) => {
    const { canAdd } = actionPermissions
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <ItemTableSearch />
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
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/catalogue-new-items"
            >
                <Button block variant='solid' size="sm" disabled={!canAdd} icon={<HiPlusCircle />}>
                   Add Item
                </Button>
            </Link>
        </div>
    )
}

export default ItemsTableTools
