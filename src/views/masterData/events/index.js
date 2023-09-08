import React, { useState } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import EventsTableTools from './components/EventsTableTools'
import EventsTable from './components/EventsTable'
import { useSelector } from 'react-redux'



injectReducer('EventsList', reducer)

const TaxComponent = () => {
    const { permissionsList } = useSelector((state) => state.auth.user)
    const [canAdd, setCanAdd] = useState(permissionsList.includes('MSDEVNTSADD'))
    const [canEdit, setCanEdit] = useState(
        permissionsList.includes('MSDEVNTSEDI')
    )
    const [canView, setCanView] = useState(permissionsList.includes('MSDEVNTSVIE'))
    const [canActivate, setCanActivate] = useState(permissionsList.includes('MSDEVNTSDEA'))
    const [canClone, setCanClone] = useState(permissionsList.includes('MSDEVNTSCLO'))
    const [canApprove, setCanApprove] = useState(permissionsList.includes('MSDEVNTSAPP'))


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
                <h3 className="mb-4 lg:mb-0">Events</h3>
                <EventsTableTools actionPermissions={actionPermissions}/>
            </div>
            <EventsTable actionPermissions={actionPermissions}/>
            {/* <ItemDeleteConfirmation /> */}
        </AdaptableCard>
    )
}

export default TaxComponent