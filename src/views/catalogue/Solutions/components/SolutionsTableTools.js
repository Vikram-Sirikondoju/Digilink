import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import SolutionTableSearch from './SolutionsTableSearch'
import { Link } from 'react-router-dom'
import OperatorsFilter from './SolutionsFilter'
import {
    Input,
    Button,
    Checkbox,
    Radio,
    FormItem,
    FormContainer,
    Drawer,
} from 'components/ui'
import NewOperators from './NewSolutions'


const SolutionsTableTools = ({ actionPermissions }) => {
    const { canAdd } = actionPermissions
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <SolutionTableSearch />
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
                to="/catalogue-new-solutions"
            >
                <Button block variant='solid' disabled={!canAdd} size="sm" icon={<HiPlusCircle />}>
                    Add Solution
                </Button>
            </Link>
        </div>
    )
}

export default SolutionsTableTools
