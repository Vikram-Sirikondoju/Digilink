import React, { useState } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import TaxComponentTableTools from './components/TaxComponentTableTools'
import TaxComponentTable from './components/TaxComponentTable'
import { useSelector } from 'react-redux'


injectReducer('TaxComponentList', reducer)

const  TaxComponent= () => {
    const { permissionsList } = useSelector((state) => state.auth.user)
    const [canAdd, setCanAdd] = useState(permissionsList.includes('MSDTXCADD'))
    const [canEdit, setCanEdit] = useState(
        permissionsList.includes('MSDTXCEDI')
    )
    const [canView, setCanView] = useState(permissionsList.includes('MSDTXCVIE'))
    const [canActivate, setCanActivate] = useState(permissionsList.includes('MSDTXCDEA'))
    const [canClone, setCanClone] = useState(permissionsList.includes('MSDTXCCLO'))
    const [canApprove, setCanApprove] = useState(permissionsList.includes('MSDTXCAPP'))

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
                <h3 className="mb-4 lg:mb-0">Tax Component</h3>
                <TaxComponentTableTools actionPermissions={actionPermissions}/>
            </div>
            <TaxComponentTable actionPermissions={actionPermissions}/>
            {/* <ItemDeleteConfirmation /> */}
        </AdaptableCard>
    )
}

export default TaxComponent
