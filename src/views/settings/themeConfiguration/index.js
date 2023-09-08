import React from 'react'
import ThemeConfigurationDetails from './components/ThemeConfigurationDetails'
import reducer from './store'
import { injectReducer } from 'store'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'

injectReducer('themeInfo', reducer)
function ThemeConfiguration() {
  let  breadCrumbList=[{
    name:'Settings',
    link:'settings'
},{
    name:'Theme Configuration',
    link:"/settings-menu-theme-configuraion"
}]
  return (
    <>
    {/* <div>Settings / Theme Configuration</div> */}
    <CustomBreadcrumbs  list={breadCrumbList} />

    <div className='mt-4'>
      {/* <h3>Theme Configuration</h3> */}
    <ThemeConfigurationDetails/>
    </div>
    </>
  )
}

export default ThemeConfiguration