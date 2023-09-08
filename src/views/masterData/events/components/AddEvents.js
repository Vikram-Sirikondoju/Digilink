import { AdaptableCard, RichTextEditor } from 'components/shared'
import React from 'react'
import {
  Input,
  FormItem,
  FormContainer,

} from 'components/ui'
import { Field, Form, Formik } from 'formik'

const AddEvents = () => {
  return (
    <div className="p-5" style={{backgroundColor:"#F5F5F5"}}>
      <AdaptableCard className="h-full" bodyClass="h-full" divider>
        <Formik
          initialValues={{}}
          validationSchema={{}}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true)

          }}
        >
          {({ values, touched, errors, isSubmitting }) => {
            return (
              <Form>
                <FormContainer>
                  <div className="md:grid grid-cols-3 gap-3 mx-4 pt-2 pl-2">
                    <FormItem
                      label="Event Title"
                    >
                      <Field
                        type="text"
                        autoComplete="off"
                        name="eventTitle"
                        placeholder="Enter Title"
                        component={Input}
                      />
                    </FormItem>
                  </div>
                  <div className="md:grid grid-cols-2 gap-3 mx-4 pl-2">
                    <FormItem
                      label='Description'
                      // className='mx-4 w-100'
                    >
                      <RichTextEditor
                      ></RichTextEditor>
                    </FormItem>
                  </div>
                </FormContainer>
              </Form>)
          }}
        </Formik>
      </AdaptableCard>
    </div>
  )
}

export default AddEvents