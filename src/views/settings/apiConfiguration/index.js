import React, { useState } from 'react'
//import ApiConfigurationTable from './components/ApiConfiguarationTable'
import ApiConfiguarationTableTools from './components/ApiConfiguarationTableTools'
import ApiConfigurationTable from './components/ApiConfiguarationTable'

import { AdaptableCard } from 'components/shared'
import { useSelector } from 'react-redux';

function APIConfiguration() {

  const { permissionsList } = useSelector((state) => state.auth.user)
  const [canAdd, setCanAdd] = useState(permissionsList.includes('SETAPICADD'))
  const [canEdit, setCanEdit] = useState(permissionsList.includes('SETAPICEDI'))
  const [canView, setCanView] = useState(permissionsList.includes('SETAPICVIE'))
  const [canActivate, setCanActivate] = useState(permissionsList.includes('SETAPICDEA'))
  const [canClone, setCanClone] = useState(permissionsList.includes('SETAPICCLO'))
  const [canApprove, setCanApprove] = useState(permissionsList.includes('SETAPICAPP'))


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
      {/* <div>Settings / API Configuration</div> */}
      <AdaptableCard className="h-full" bodyClass="h-full">
        <div className="lg:flex items-center justify-between mb-4">
          <h3 className="mb-4 lg:mb-0 mt-3">API Configuration</h3>
          {/* <ProductCategoryTableTools/> */}
          <ApiConfiguarationTableTools  />
        </div>
        <ApiConfigurationTable actionPermissions={actionPermissions}/>
      </AdaptableCard>


    </>
  )
}

export default APIConfiguration      