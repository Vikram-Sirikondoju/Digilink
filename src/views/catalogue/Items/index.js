import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import ItemsTable from './components/ItemsTable'
import ItemsTableTools from './components/ItemsTableTools'
import ItemDeleteConfirmation from './components/ItemsDeleteConfirmation'
import { useSelector } from 'react-redux'
import { useState } from 'react'

injectReducer('itemsList', reducer)

const Items = () => {
    const { permissionsList } = useSelector((state) => state.auth.user)
    const [canAdd, setCanAdd] = useState(permissionsList.includes('CATITMADD'))
    const [canEdit, setCanEdit] = useState(
        permissionsList.includes('CATITMEDI')
    )
    const [canView, setCanView] = useState(permissionsList.includes('CATITMVIE'))
    const [canActivate, setCanActivate] = useState(permissionsList.includes('CATITMDEA'))
    const [canClone, setCanClone] = useState(permissionsList.includes('CATITMCLO'))
    const [canApprove, setCanApprove] = useState(permissionsList.includes('CATITMAPP'))


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
                <h3 className="mb-4 lg:mb-0">Items</h3>
                <ItemsTableTools actionPermissions={actionPermissions}/>
            </div>
            <ItemsTable actionPermissions={actionPermissions}/>
            <ItemDeleteConfirmation />
        </AdaptableCard>
    )
}

export default Items
