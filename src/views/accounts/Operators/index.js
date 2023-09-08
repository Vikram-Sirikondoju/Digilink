import React, { useState } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import OrdersTable from './components/OperatorsTable'
import OrdersTableTools from './components/OperatorsTableTools'
import OrderDeleteConfirmation from './components/OperatorsDeleteConfirmation'
import { useSelector } from 'react-redux'

injectReducer('salesOrderList', reducer)

const Operators = () => {
    const { permissionsList } = useSelector((state) => state.auth.user)
    const [canAdd, setCanAdd] = useState(permissionsList.includes('ACCOPRADD'))
    const [canEdit, setCanEdit] = useState(
        permissionsList.includes('ACCOPREDI')
    )
    const [canView, setCanView] = useState(permissionsList.includes('ACCOPRVIE'))
    const [canActivate, setCanActivate] = useState(permissionsList.includes('ACCOPRDEA'))
    const [canClone, setCanClone] = useState(permissionsList.includes('ACCOPRCLO'))
    const [canApprove, setCanApprove] = useState(permissionsList.includes('ACCOPRAPP'))

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
                <h3 className="mb-4 lg:mb-0">Operators</h3>
                <OrdersTableTools actionPermissions={actionPermissions} />
            </div>
            <OrdersTable actionPermissions={actionPermissions} />
            <OrderDeleteConfirmation />
        </AdaptableCard>
    )
}

export default Operators
