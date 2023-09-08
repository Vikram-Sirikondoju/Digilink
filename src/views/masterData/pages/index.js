import React, { useState } from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import PagesTable from './components/PagesTable'
import PagesTableTools from './components/PagesTableTools'
import { useSelector } from 'react-redux';



injectReducer('Pages', reducer)

const Pages = () => {
    const { permissionsList } = useSelector((state) => state.auth.user)
    const [canAdd, setCanAdd] = useState(permissionsList.includes('MSDPGEADD'))
    const [canEdit, setCanEdit] = useState(
        permissionsList.includes('MSDPGEEDI')
    )
    const [canView, setCanView] = useState(permissionsList.includes('MSDPGEVIE'))
    const [canActivate, setCanActivate] = useState(permissionsList.includes('MSDPGEDEA'))
    const [canClone, setCanClone] = useState(permissionsList.includes('MSDPGECLO'))
    const [canApprove, setCanApprove] = useState(permissionsList.includes('MSDPGEAPP'))


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
        {/* <div>Master Data / Pages</div> */}
        <AdaptableCard className="h-full mt-4" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Pages</h3>
                {/* <ProductCategoryTableTools/> */}
                <PagesTableTools actionPermissions={actionPermissions}/>
            </div>
            {/* <ProductCategoryTable /> */}
            <PagesTable actionPermissions={actionPermissions}/>
        </AdaptableCard>
        </>
    )
}

export default Pages