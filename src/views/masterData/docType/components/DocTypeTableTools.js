import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import DocTypeTableSearch from './DocTypeTableSearch'
import { Link } from 'react-router-dom'
// import OperatorsFilter from './ItemsFilter'
import {
    Input,
    Button,
    Checkbox,
    Radio,
    FormItem,
    FormContainer,
    Drawer,
} from 'components/ui'
import DocTypeFilter from './DocTypeFilter'
// import NewOperators from './NewItems'


const DocTypeTableTools = ({ actionPermissions }) => {
    const { canAdd } = actionPermissions
    return (

        <div className="flex flex-col lg:flex-row lg:items-center">
            <DocTypeTableSearch />
            <DocTypeFilter />
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
                to="/create-document-type"
            >
                <Button block
                    disabled={!canAdd}
                    className='flex justify-center pt-[6px] gap-1' variant="solid"
                    size="sm" >
                    <p className='pt-[2px]'><HiPlusCircle /></p>
                    Add Doc Type
                </Button>

            </Link>


        </div>
    )
}

export default DocTypeTableTools
