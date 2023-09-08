import React, { useState } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import ProvidersTable from './components/ProvidersTable'
import ProvidersTableTools from './components/ProvidersTableTools'
import ProvidersDeleteConfirmation from './components/ProvidersDeleteConfirmation'
import { useSelector } from 'react-redux'

injectReducer('providerList', reducer)

const Providers = () => {

    const { permissionsList } = useSelector((state) => state.auth.user)
    const [canAdd, setCanAdd] = useState(permissionsList.includes('ACCPROADD'))
    const [canEdit, setCanEdit] = useState(
        permissionsList.includes('ACCPROEDI')
    )
    const [canView, setCanView] = useState(permissionsList.includes('ACCPROVIE'))
    const [canActivate, setCanActivate] = useState(permissionsList.includes('ACCPRODEA'))
    const [canClone, setCanClone] = useState(permissionsList.includes('ACCPROCLO'))
    const [canApprove, setCanApprove] = useState(permissionsList.includes('ACCPROAPP'))

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
                <h3 className="mb-4 lg:mb-0">Providers</h3>
                <ProvidersTableTools actionPermissions={actionPermissions} />
            </div>
            <ProvidersTable actionPermissions={actionPermissions}  />
            <ProvidersDeleteConfirmation />
        </AdaptableCard>
    )
}

export default Providers
