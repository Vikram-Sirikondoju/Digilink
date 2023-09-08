import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import AccountTabs from './components/AccountTabs'

injectReducer('myaccountList', reducer)
const MyAccount = () => {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <AccountTabs />
    </AdaptableCard>
  )
}

export default MyAccount