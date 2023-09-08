import React from 'react'
import BrandInfo from './components/BrandInfo'
import { injectReducer } from 'store'
import reducer from './store'


injectReducer('brandInfo', reducer)


function BrandInfoIndex() {
  return (
    <>
    <div>

      <BrandInfo/>
      

    </div>
    </>
  )
}

export default BrandInfoIndex