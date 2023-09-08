import React, { useState } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import DocTypeTableTools from './components/DocTypeTableTools'
import DocTypeTable from './components/DocTypeTable'
import { useSelector } from 'react-redux'


injectReducer('doctypeList', reducer)

const DocType = () => {
    const { permissionsList } = useSelector((state) => state.auth.user)
    const [canAdd, setCanAdd] = useState(permissionsList.includes('MSDDOCTADD'))
    const [canEdit, setCanEdit] = useState(
        permissionsList.includes('MSDDOCTEDI')
    )
    const [canView, setCanView] = useState(permissionsList.includes('MSDDOCTVIE'))
    const [canActivate, setCanActivate] = useState(permissionsList.includes('MSDDOCTDEA'))
    const [canClone, setCanClone] = useState(permissionsList.includes('MSDDOCTCLO'))
    const [canApprove, setCanApprove] = useState(permissionsList.includes('MSDDOCTAPP'))


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
                <h3 className="mb-4 lg:mb-0">Doc Type</h3>
                <DocTypeTableTools actionPermissions={actionPermissions} />
            </div>
            <DocTypeTable actionPermissions={actionPermissions}/>
            {/* <ItemDeleteConfirmation /> */}
        </AdaptableCard>
    )
}

export default DocType
