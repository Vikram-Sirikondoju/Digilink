import React, { useState } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import TemplatesTable from './components/TemplatesTable'
import TemplatesTableTools from './components/TemplatesTableTools'
import TemplateDeleteConfirmation from './components/TemplatesDeleteConfirmation'
import { useSelector } from 'react-redux'

injectReducer('templatesList', reducer)

const Templates = () => {
    const { permissionsList } = useSelector((state) => state.auth.user)
    const [canAdd, setCanAdd] = useState(permissionsList.includes('CATTEMADD'))
    const [canEdit, setCanEdit] = useState(
        permissionsList.includes('CATTEMEDI')
    )
    const [canView, setCanView] = useState(permissionsList.includes('CATTEMVIE'))
    const [canActivate, setCanActivate] = useState(permissionsList.includes('CATTEMDEA'))
    const [canClone, setCanClone] = useState(permissionsList.includes('CATTEMCLO'))
    const [canApprove, setCanApprove] = useState(permissionsList.includes('CATTEMAPP'))

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
                <h3 className="mb-4 lg:mb-0">Templates</h3>
                <TemplatesTableTools actionPermissions={actionPermissions}/>
            </div>
            <TemplatesTable actionPermissions={actionPermissions} />
            <TemplateDeleteConfirmation  />
        </AdaptableCard>
    )
}

export default Templates
