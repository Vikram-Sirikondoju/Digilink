import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Checkbox
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { Upload } from 'components/ui'
import { RichTextEditor } from 'components/shared'
import * as Yup from 'yup'

const validationSchemaF = Yup.object().shape({
    itemColour: Yup.string().required('Item colour is required'),
    itemFeatureDec : Yup.string().required('Feature is required')
})


const ItemFeatures = ({ onChange, refId, ...props }) => {

    return (
      
           
            <Formik
                initialValues={props.itemIntials.itemBasicDetailsOther}
                innerRef={refId}
                validationSchema={validationSchemaF}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    let dataToStore = props.itemIntials
                    dataToStore.itemBasicDetailsOther =values
                    props.setItemInitials(dataToStore)
                    props.setStep(props.step + 1)
                 }}
            >

                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className='p-2'>
                                <h3 className="mx-4 mb-4 mt-2">ITEM FEATUERS</h3>
                                <div className="md:grid grid-cols-4 gap-4 mx-4">

                                    <FormItem label="Item Colour"
                                        invalid={errors.itemColour && touched.itemColour}
                                        errorMessage={errors.itemColour}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="itemColour"
                                            placeholder="Enter Item Colour"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>

                                <div className="mx-4 my-4">
                                    <FormItem label="Features 1"
                                        invalid={errors.itemFeatureDec && touched.itemFeatureDec}
                                        errorMessage={errors.itemFeatureDec}
                                    >
                                        <Field name="itemFeatureDec" >
                                            {({ field, form }) => (
                                                <RichTextEditor
                                                    value={field.value}
                                                    onChange={(val) =>
                                                        form.setFieldValue(field.name, val)
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                </div>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>





       

    )
}

export default ItemFeatures
