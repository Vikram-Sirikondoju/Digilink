import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'

import { Link } from 'react-router-dom'
import {
    Button,
   
} from 'components/ui'
import PendingAppTableSearch from './PendingAppTableSearch'
import PendingAppFilter from './PendingAppFilter'
import { MdOutlineSettings } from 'react-icons/md'



const PendingApprovalsTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
           <PendingAppTableSearch />
             <PendingAppFilter />
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
        </div>
    )
}

export default PendingApprovalsTableTools
