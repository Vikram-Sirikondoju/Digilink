import React from 'react'
import StepControlled from './StepControlled'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem } from 'components/ui'
import { Field } from 'formik'
export default function NewOrders() {
   
  return (
    <>
    <div>Orders/Create Order</div>
    <div className='mt-5'>
    <StepControlled />
    </div>
    </>
  )
}
