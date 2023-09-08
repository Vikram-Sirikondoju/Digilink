import React from 'react'
import { AdaptableCard } from 'components/shared'
import PublicRolesTableTools from './components/PublicRolesTableTools'
import PublicRolesTable from './components/PublicRolesTable'
import reducer from './store'
import { injectReducer } from 'store/index'


injectReducer('publicRoles', reducer)
const PublicRoles = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Master Roles</h3>
                <PublicRolesTableTools />
            </div>
            <PublicRolesTable />
        </AdaptableCard>
    )
}

export default PublicRoles