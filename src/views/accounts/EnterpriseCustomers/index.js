import React,{useState} from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import EnterPriseTable from './components/EnterPriseTable'
import EnterPriseTableTools from './components/EnterPriseTableTools'
import EnterPriseDeleteConfirmation from './components/EnterPriseDeleteConfirmation'
import { useSelector } from 'react-redux'

injectReducer('enterpriseList', reducer)

const EnterPriseCustomers = () => {

    const { permissionsList } = useSelector((state) => state.auth.user)
    const [canAdd, setCanAdd] = useState(permissionsList.includes('ACCENCADD'))
    const [canEdit, setCanEdit] = useState(
        permissionsList.includes('ACCENCEDI')
    )
    const [canView, setCanView] = useState(permissionsList.includes('ACCENCVIE'))
    const [canActivate, setCanActivate] = useState(permissionsList.includes('ACCENCDEA'))
    const [canClone, setCanClone] = useState(permissionsList.includes('ACCENCCLO'))
    const [canApprove, setCanApprove] = useState(permissionsList.includes('ACCENCAPP'))

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
                <h3 className="mb-4 lg:mb-0">Enterprise Customers</h3>
                <EnterPriseTableTools  actionPermissions={actionPermissions}/>
            </div>
            <EnterPriseTable  actionPermissions={actionPermissions}/>
            <EnterPriseDeleteConfirmation />
        </AdaptableCard>
    )
}

export default EnterPriseCustomers
