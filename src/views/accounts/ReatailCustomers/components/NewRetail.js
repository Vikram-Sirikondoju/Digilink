import React from 'react'
import StepControlled from './StepControlled'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem } from 'components/ui'
import { Field } from 'formik'
export default function NewOperators() {

  return (
    <>
      {/* <div>Accounts/Reatil Customers/Create Reatil Customers</div> */}
      <div>
        <StepControlled />
      </div>
    </>
  )
}
