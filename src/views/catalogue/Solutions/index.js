import React, { useState } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import SolutionsTable from './components/SolutionsTable'
import SolutionsTableTools from './components/SolutionsTableTools'
import SolutionDeleteConfirmation from './components/SolutionsDeleteConfirmation'
import { useSelector } from 'react-redux'

injectReducer('solutionsList', reducer)


const Solutions = () => {
    const { permissionsList } = useSelector((state) => state.auth.user)
    const [canAdd, setCanAdd] = useState(permissionsList.includes('CATSOLADD'))
    const [canEdit, setCanEdit] = useState(
        permissionsList.includes('CATSOLEDI')
    )
    const [canView, setCanView] = useState(permissionsList.includes('CATSOLVIE'))
    const [canActivate, setCanActivate] = useState(permissionsList.includes('CATSOLDEA'))
    const [canClone, setCanClone] = useState(permissionsList.includes('CATSOLCLO'))
    const [canApprove, setCanApprove] = useState(permissionsList.includes('CATSOLAPP'))

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
                <h3 className="mb-4 lg:mb-0">Solutions</h3>
                <SolutionsTableTools actionPermissions={actionPermissions} />
            </div>
            <SolutionsTable actionPermissions={actionPermissions} />
            <SolutionDeleteConfirmation />
        </AdaptableCard>
    )
}

export default Solutions
