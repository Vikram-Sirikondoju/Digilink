import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { Button } from 'components/ui'
import NotificationTableSearch from './NotificationTableSearch'
import NotificationFilter from './NotificationFilter'


const NotificationTableTools = ({ actionPermissions }) => {
    const { canAdd } = actionPermissions
    return (

        <div className="flex flex-col lg:flex-row lg:items-center">
            <NotificationTableSearch />
            <NotificationFilter />
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
                to="/settings-create-template"
            >
                <Button block variant="solid"

                    style={{
                        fontStyle: 'normal',
                        fontSize: '18px',
                    }}
                    className='flex justify-center pt-[6px] gap-1'
                    size="sm" disabled={!canAdd}>
                    <p className='pt-[2px]'><HiPlusCircle /></p>
                    Create Template
                </Button>
            </Link>


        </div>
    )
}

export default NotificationTableTools
