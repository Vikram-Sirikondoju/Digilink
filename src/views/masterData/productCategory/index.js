import React, { useState } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import ProductCategoryTableTools from './components/ProductCategoryTableTools'

import ProductCategoryTable from './components/ProductCategoryTable'
import { useSelector } from 'react-redux';


injectReducer('prodCatList', reducer)

const ProductCategory = () => {
    const { permissionsList } = useSelector((state) => state.auth.user)
    const [canAdd, setCanAdd] = useState(permissionsList.includes('MSDPRDCADD'))
    const [canEdit, setCanEdit] = useState(permissionsList.includes('MSDPRDCEDI'))
    const [canView, setCanView] = useState(permissionsList.includes('MSDPRDCVIE'))
    const [canActivate, setCanActivate] = useState(permissionsList.includes('MSDPRDCDEA'))
    const [canClone, setCanClone] = useState(permissionsList.includes('MSDPRDCCLO'))
    const [canApprove, setCanApprove] = useState(permissionsList.includes('MSDPRDCAPP'))


    const actionPermissions = {
        canAdd,
        canEdit,
        canClone,
        canView,
        canActivate,
        canApprove,
    }
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Item Category</h3>
                <ProductCategoryTableTools actionPermissions={actionPermissions} />
            </div>
            <ProductCategoryTable actionPermissions={actionPermissions}/>
        </AdaptableCard>
    )
}

export default ProductCategory
