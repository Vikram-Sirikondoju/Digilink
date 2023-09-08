import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import TemplateTableSearch from './TemplatesTableSearch'
import { Link } from 'react-router-dom'
import OperatorsFilter from './TemplatesFilter'
import {
    Input,
    Button,
    Checkbox,
    Radio,
    FormItem,
    FormContainer,
    Drawer,
} from 'components/ui'
import NewOperators from './NewTemplates'


const TemplatesTableTools = ({ actionPermissions }) => {
    const { canAdd } = actionPermissions
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <TemplateTableSearch />
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
                to="/catalogue-new-templates"
            >
                <Button block variant='solid' disabled={!canAdd} size="sm" icon={<HiPlusCircle />}>
                   Create
                </Button>
            </Link>
        </div>
    )
}

export default TemplatesTableTools
