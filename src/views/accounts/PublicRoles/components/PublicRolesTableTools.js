import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
// import AccountFilter from './UserRoleFilter'
// import AccountTableSearch from './UserRoleTableSearch'
import {
    Button,

} from 'components/ui'
import { MdOutlineSettings } from 'react-icons/md'
import PublicRolesTableSearch from './PublicRolesTableSearch'
import PublicRolesFilter from './PublicRolesFilter'
import { useDispatch } from 'react-redux'
import { getRolePermissions } from '../store/dataSlice'



const PublicRolesTableTools = () => {
    const dispatch = useDispatch()


    const handleClick =  () => {
        // Perform the desired action here
        // For example, you can navigate to a new page using history.push('/some-route')
       
         dispatch(getRolePermissions())

        
      };

    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <PublicRolesTableSearch />
            <PublicRolesFilter />
            <Link
                className="block lg:inline-block ltr:md:ml-2  md:mx-2 md:mb-0 mb-4"
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
            <Link to='/accounts-new-public-roles'
                className="block lg:inline-block md:mb-0 mb-4"  onClick={handleClick}>
                <Button block variant='solid' size="sm" icon={<HiPlusCircle />}>
                    Create
                </Button>
            </Link>
        </div>
    )
}

export default PublicRolesTableTools
