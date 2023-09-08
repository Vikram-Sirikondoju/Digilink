import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import {
    Button,
} from 'components/ui'
import CustomerCategoryTableSearch from '../components/CustomerCategoryTableSearch'



const CustomerCategoryTableTools = ({ actionPermissions }) => {
    const { canAdd } = actionPermissions
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            {/* <ItemTableSearch /> */}
            {/* <OperatorsFilter /> */}
            <CustomerCategoryTableSearch />
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
                to="/new-CustomerCategory"
            >
                <Button block variant="solid"
                    disabled={!canAdd}
                    style={{
                        fontStyle: 'normal',
                    }}
                    className='flex justify-center pt-[6px] gap-1'
                    size="sm" >
                    <p className='pt-[2px]'><HiPlusCircle /></p>
                    Add Customer Category
                </Button>
            </Link>
        </div>
    )
}

export default CustomerCategoryTableTools
