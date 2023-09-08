import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import EnterPriseTableSearch from './EnterPriseTableSearch'
import { Link } from 'react-router-dom'
import EnterPriseFilter from './EnterPriseFilter'
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


const EnterpriseTableTools = ({ actionPermissions }) => {
    const { canAdd } = actionPermissions
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <EnterPriseTableSearch />
            <EnterPriseFilter />
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
                to="/account-new-enterprise"
            >
                <Button block variant="solid"

                    style={{
                        fontStyle: 'normal',
                        fontSize: '18px'
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

export default EnterpriseTableTools
