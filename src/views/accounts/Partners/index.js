import React,{useState} from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import PartnersTable from './components/PartnersTable'
import PartnersTableTools from './components/PartnersTableTools'
import PartnersDeleteConfirmation from './components/PartnersDeleteConfirmation'
import { useSelector } from 'react-redux'

injectReducer('partnerList', reducer)

const Partners = () => {

    const { permissionsList } = useSelector((state) => state.auth.user)
    const [canAdd, setCanAdd] = useState(permissionsList.includes('ACCPTRADD'))
    const [canEdit, setCanEdit] = useState(
        permissionsList.includes('ACCPTREDI')
    )
    const [canView, setCanView] = useState(permissionsList.includes('ACCPTRVIE'))
    const [canActivate, setCanActivate] = useState(permissionsList.includes('ACCPTRDEA'))
    const [canClone, setCanClone] = useState(permissionsList.includes('ACCPTRCLO'))
    const [canApprove, setCanApprove] = useState(permissionsList.includes('ACCPTRAPP'))

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
                <h3 className="mb-4 lg:mb-0">Partners</h3>
                <PartnersTableTools actionPermissions={actionPermissions} />
               
            </div>
            <PartnersTable actionPermissions={actionPermissions} />
            <PartnersDeleteConfirmation />
        </AdaptableCard>
    )
}


export default Partners
