import React from 'react'
import StepControlled from './StepControlled'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem } from 'components/ui'
import { Field } from 'formik'
import { injectReducer } from 'store/index'
import reducer from '../store'

export default function NewItems() {
  injectReducer('itemsCreateList', reducer)

  return (
    <>
      {/* <div>Catalogue/Items/Create Item</div> */}
      <div className='mt-5'>
        <StepControlled />
      </div>
    </>
  )
}
