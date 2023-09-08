import React from 'react'
import GeneralSettingsDetails from './components/GeneralSettingsDetails'
import { injectReducer } from 'store'
import reducer from './store'

injectReducer("genSettings",reducer)

function GeneralSettings() {
  return (
    <>
    <div></div>
    <GeneralSettingsDetails/>
    </>
  )
}

export default GeneralSettings