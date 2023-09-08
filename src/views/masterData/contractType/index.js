import React, { useState } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import ContractTableTools from './components/ContractTableTools'
import ContractTable from './components/ContractTable'
import { useSelector } from 'react-redux';


injectReducer('contractType', reducer)

const ContractType = () => {
    const { permissionsList } = useSelector((state) => state.auth.user)
    const [canAdd, setCanAdd] = useState(permissionsList.includes('MSDCNRTADD'))
    const [canEdit, setCanEdit] = useState(
        permissionsList.includes('MSDCNRTEDI')
    )
    const [canView, setCanView] = useState(permissionsList.includes('MSDCNRTVIE'))
    const [canActivate, setCanActivate] = useState(permissionsList.includes('MSDCNRTDEA'))
    const [canClone, setCanClone] = useState(permissionsList.includes('MSDCNRTCLO'))
    const [canApprove, setCanApprove] = useState(permissionsList.includes('MSDCNRTAPP'))


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
                <h3 className="mb-4 lg:mb-0">Contract</h3>
                <ContractTableTools actionPermissions={actionPermissions}/>
            </div>
            <ContractTable actionPermissions={actionPermissions}/>
        </AdaptableCard>
    )
}

export default ContractType
