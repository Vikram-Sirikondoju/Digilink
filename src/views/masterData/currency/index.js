import React, { useState } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import CurrencyTableTools from './components/CurrencyTableTools'
import CurrencyTable from './components/CurrencyTable'
import { useSelector } from 'react-redux'


injectReducer('CurrencyList', reducer)

const CurrencyComponent = () => {

    const { permissionsList } = useSelector((state) => state.auth.user)
    const [canAdd, setCanAdd] = useState(permissionsList.includes('MSDCURADD'))
    const [canEdit, setCanEdit] = useState(
        permissionsList.includes('MSDCUREDI')
    )
    const [canView, setCanView] = useState(permissionsList.includes('MSDCURVIE'))
    const [canActivate, setCanActivate] = useState(permissionsList.includes('MSDCURDEA'))
    const [canClone, setCanClone] = useState(permissionsList.includes('MSDCURCLO'))
    const [canApprove, setCanApprove] = useState(permissionsList.includes('MSDCURAPP'))


    const actionPermissions = {
        canAdd,
        canEdit,
        canClone,
        canView,
        canActivate,
        canApprove,
    }
    return (
        <>
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Currency</h3>
                <CurrencyTableTools actionPermissions={actionPermissions}/>
            </div>
            <CurrencyTable actionPermissions={actionPermissions}/>
        </>
    )
}
export default CurrencyComponent