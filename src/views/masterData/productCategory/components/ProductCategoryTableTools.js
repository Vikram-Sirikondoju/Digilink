import React from 'react'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import ProductCategoryTableSearch from './ProductCategoryTableSearch'

import { Link } from 'react-router-dom'
import OperatorsFilter from './ProductCategoryFilters'
import {
    // Input,
    Button,
    // Checkbox,
    // Radio,
    // FormItem,
    // FormContainer,
    // Drawer,
} from 'components/ui'
//import NewOperators from './NewSolutions'


const ProductCategoryTableTools = ({ actionPermissions }) => {
    const { canAdd } = actionPermissions
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <ProductCategoryTableSearch />
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
                to="/masterData-new-product-category"
            >
                <Button block variant="solid"
                    disabled={!canAdd}
                    className='flex justify-center pt-[6px] gap-1'
                    size="sm" >
                    <p className='pt-[2px]'><HiPlusCircle /></p>
                    Add Item Category
                </Button>
            </Link>
        </div>
    )
}

export default ProductCategoryTableTools
