import React, { useState } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import CustomerCategoryTableTools from './components/CustomerCategoryTableTools'
import CustomerCategoryTable from './components/CustomerCategoryTable'
import { useSelector } from 'react-redux'


injectReducer('CustomerCategoryList', reducer)

const CustomerCategory = () => {
    const { permissionsList } = useSelector((state) => state.auth.user)
    const [canAdd, setCanAdd] = useState(permissionsList.includes('MSDCUSTCADD'))
    const [canEdit, setCanEdit] = useState(permissionsList.includes('MSDCUSTCEDI'))
    const [canView, setCanView] = useState(permissionsList.includes('MSDCUSTCVIE'))
    const [canActivate, setCanActivate] = useState(permissionsList.includes('MSDCUSTCDEA'))
    const [canClone, setCanClone] = useState(permissionsList.includes('MSDCUSTCCLO'))
    const [canApprove, setCanApprove] = useState(permissionsList.includes('MSDCUSTCAPP'))


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
                <h3 className="mb-4 lg:mb-0">Customer Category</h3>
                <CustomerCategoryTableTools actionPermissions={actionPermissions} />
            </div>
            <CustomerCategoryTable actionPermissions={actionPermissions} />
            {/* <ItemDeleteConfirmation /> */}
        </AdaptableCard>
    )
}

export default CustomerCategory
