import { AdaptableCard } from 'components/shared'
import React, { useState } from 'react'
import reducer from './store';
import { injectReducer } from 'store/index';
import PasswordPolicyTable from './components/PasswordPolicyTable'
import PasswordPolicyTableTools from './components/PasswordPolicyTableTools'
import { useSelector } from 'react-redux';

injectReducer('passwordPolicy', reducer)
function PasswordPolicy() {

    const { permissionsList } = useSelector((state) => state.auth.user)
    const [canAdd, setCanAdd] = useState(permissionsList.includes('SETPPCADD'))
    const [canEdit, setCanEdit] = useState(
        permissionsList.includes('SETPPCEDI')
    )
    const [canView, setCanView] = useState(permissionsList.includes('SETPPCVIE'))
    const [canActivate, setCanActivate] = useState(permissionsList.includes('SETPPCDEA'))
    const [canClone, setCanClone] = useState(permissionsList.includes('SETPPCCLO'))
    const [canApprove, setCanApprove] = useState(permissionsList.includes('SETPPCAPP'))


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
                <div className="lg:flex items-center justify-between mb-4">
                    <h3 className="mb-4 lg:mb-0">Password Policy</h3>
                    <PasswordPolicyTableTools actionPermissions={actionPermissions} />
                </div>
                <PasswordPolicyTable actionPermissions={actionPermissions} />
                {/* <ItemDeleteConfirmation /> */}
            </AdaptableCard>
        </>
    )
}


export default PasswordPolicy