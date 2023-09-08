import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import ProvidersTableSearch from './ProvidersTableSearch'
import { Link } from 'react-router-dom'
import ProvidersFilter from './ProvidersFilter'
import {
    Input,
    Button,
    Checkbox,
    Radio,
    FormItem,
    FormContainer,
    Drawer,
} from 'components/ui'
import { MdOutlineSettings } from 'react-icons/md'



const ProvidersTableTools = ({actionPermissions}) => {
    const { canAdd } = actionPermissions
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <ProvidersTableSearch />
            <ProvidersFilter />
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
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                target="_blank"
                download
            >
                <Button block size="sm" icon={<MdOutlineSettings />}>
                    Columns
                </Button>
            </Link> 
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/account-new-providers"
            >
                <Button block variant='solid' style={{
                    fontStyle: 'normal',
                    fontSize: 500, fontSize: '18px', 
                }} size="sm" icon={<HiPlusCircle />}
                disabled={!canAdd}
                >
                   Create
                </Button>
            </Link>
        </div>
    )
}

export default ProvidersTableTools
