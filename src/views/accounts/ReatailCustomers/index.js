import React,{useState} from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import RetailTableTools from './components/RetailTableTools'
import RetailTable from './components/RetailTable'
import { useSelector } from 'react-redux'


injectReducer('retailsList', reducer)

const RetailCustomers = () => {
    const { permissionsList } = useSelector((state) => state.auth.user)
    const [canAdd, setCanAdd] = useState(permissionsList.includes('ACCRECADD'))
    const [canEdit, setCanEdit] = useState(
        permissionsList.includes('ACCRECEDI')
    )
    const [canView, setCanView] = useState(permissionsList.includes('ACCRECVIE'))
    const [canActivate, setCanActivate] = useState(permissionsList.includes('ACCRECDEA'))
    const [canClone, setCanClone] = useState(permissionsList.includes('ACCRECCLO'))
    const [canApprove, setCanApprove] = useState(permissionsList.includes('ACCRECAPP'))

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
                <h3 className="mb-4 lg:mb-0">Retail Customers</h3>
                <RetailTableTools actionPermissions={actionPermissions} />
            </div>
            <RetailTable actionPermissions={actionPermissions} />
        </AdaptableCard>
    )
}

export default RetailCustomers
