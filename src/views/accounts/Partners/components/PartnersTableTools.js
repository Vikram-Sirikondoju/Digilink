import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import OrderTableSearch from './PartnersTableSearch'
import { Link } from 'react-router-dom'
import OperatorsFilter from './PartnersFilter'
import {
    Input,
    Button,
    Checkbox,
    Radio,
    FormItem,
    FormContainer,
    Drawer,
} from 'components/ui'
import NewOperators from './NewPartners'
import { MdOutlineSettings } from 'react-icons/md'


const PartnerOrdersTableTools = ({ actionPermissions }) => {
    const { canAdd } = actionPermissions
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <OrderTableSearch />
            <OperatorsFilter />
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
                target="_blank"
                download
            >
                <Button block size="sm" icon={<MdOutlineSettings />}>
                    Columns
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/account-new-partners"
            >
                <Button block variant="solid"

                    style={{
                        color: "white",
                        fontStyle: 'normal',
                        fontSize: '18px',
                    }}
                    className='flex justify-center pt-[6px] gap-1'
                    size="sm" disabled={!canAdd}>
                    <p className='pt-[2px]'><HiPlusCircle /></p>
                    Create
                </Button>
            </Link>
        </div>
    )
}

export default PartnerOrdersTableTools
