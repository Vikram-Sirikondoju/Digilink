import React from 'react'
import StepControlled from './StepControlled'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem } from 'components/ui'
import { Field } from 'formik'
export default function NewContract() {
   
  return (
    <>
    {/* <div>Accounts/Contract Type/Create Contract Type</div> */}
    <div className='mt-5'>
    <StepControlled />
    </div>
    </>
  )
}
