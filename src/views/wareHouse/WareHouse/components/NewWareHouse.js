import React from 'react'
import StepControlled from './StepControlled'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem } from 'components/ui'
import { Field } from 'formik'
export default function NewPartners() {
   
  return (
    <>
    <div>Accounts/WareHouse/Create WareHouse</div>
    <div className='mt-5'>
      <h3>Create WareHouse</h3>
      <StepControlled />
    </div>
    </>
  )
}
