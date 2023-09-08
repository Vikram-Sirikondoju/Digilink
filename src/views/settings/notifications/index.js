import React, { useState } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'

import NotificationTableTools from './components/NotificationTableTools'
import NotificationTable from './components/NotificationTable'
// import ItemsTableTools from './components/ItemsTableTools'
// import ItemDeleteConfirmation from './components/ItemsDeleteConfirmation'
import { useSelector } from 'react-redux';

injectReducer('notificationsList', reducer)

const Notifications = () => {
    const { permissionsList } = useSelector((state) => state.auth.user)
    const [canAdd, setCanAdd] = useState(permissionsList.includes('SETNOTADD'))
    const [canEdit, setCanEdit] = useState(
        permissionsList.includes('SETNOTEDI')
    )
    const [canView, setCanView] = useState(permissionsList.includes('SETNOTVIE'))
    const [canActivate, setCanActivate] = useState(permissionsList.includes('SETNOTDEA'))
    const [canClone, setCanClone] = useState(permissionsList.includes('SETNOTCLO'))
    const [canApprove, setCanApprove] = useState(permissionsList.includes('SETNOTAPP'))


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
            <AdaptableCard className="h-full" bodyClass="h-full">
                <div className="lg:flex items-center mt-4 justify-between mb-4">
                    <h3 className="mb-4 lg:mb-0">Notifications</h3>
                    <NotificationTableTools actionPermissions={actionPermissions} />
                </div>
                <NotificationTable actionPermissions={actionPermissions} />
            </AdaptableCard>
        </>
    )
}

export default Notifications









// Notifications