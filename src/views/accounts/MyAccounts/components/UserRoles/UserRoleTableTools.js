import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import AccountFilter from './UserRoleFilter'
import AccountTableSearch from './UserRoleTableSearch'
import {
   Button,
 
} from 'components/ui'
import { MdOutlineSettings } from 'react-icons/md'



const UserRoleTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <AccountTableSearch />
            <AccountFilter />
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
            <Link to='/accounts-new-user-roles'
                className="block lg:inline-block md:mb-0 mb-4"  >
                <Button block variant='solid' size="sm" icon={<HiPlusCircle />}>
                   Create
                </Button>
            </Link>
        </div>
    )
}

export default UserRoleTableTools
