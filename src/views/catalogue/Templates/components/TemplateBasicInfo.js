import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
} from 'components/ui'
import RichTextEditor from 'components/shared/RichTextEditor'
import { Field, Form, Formik } from 'formik'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductCategorys } from '../store/dataSlice'

export const templateTypeOptions = [
    { label: 'Item', value: 'P' },
    { label: 'Data Plan', value: 'D' },
    { label: 'Service Plan', value: 'S' }
]
const productCategoryOptions = [
    { label: 'Airtel Inc.', value: 'M' },
    { label: 'Airtel Inc.', value: 'F' },
    { label: 'Airtel India', value: 'O' },
]


const TemplateBasicInfo = (props) => {
    const { errors, touched, values } = props

    // const { pageIndex, pageSize, sort, query, total,sort_field,order} = useSelector(
    //     (state) => state.templatesList.data.tableData
    // )

    const { enterAccount, password, rememberMe, usernameOrEmail, user_type, acc_mno_parent_unq_id } = useSelector(
        (state) => state.auth.user
    )
    console.log(user_type, "user_type")
    const productCat = useSelector((state) => state?.templateCreate?.data?.templateProductList)
    const staesss = useSelector((state) => state)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProductCategorys({

            enterAccount: user_type === 'Provider' ? acc_mno_parent_unq_id : enterAccount,
        }))
    }, [acc_mno_parent_unq_id, dispatch, enterAccount, user_type])
    return (
        <>
            <FormContainer>
                <div className="md:grid grid-cols-2 pl-5  ">
                    <FormItem className=""
                        label={<p>Item Type <span style={{ color: 'red' }}>{'*'}</span></p>}
                      
                        invalid={
                            errors.type && touched.type
                        }
                        errorMessage={errors.type}
                    >
                        <Field name="tempDetails.type">
                            {({ field, form }) => (
                                <Select
                                    placeholder="Select Item Type"
                                    field={field}
                                    form={form}
                                    options={templateTypeOptions}
                                    value={templateTypeOptions.filter(
                                        (type) =>
                                            type.value ===
                                            values.type
                                    )}
                                    onChange={(type) =>
                                        form.setFieldValue(
                                            field.name,
                                            type.value
                                        )
                                    }
                                />
                            )}
                        </Field>

                    </FormItem>
                    <FormItem className="ml-6 mr-4"
                        label={<p>Item Category <span style={{ color: 'red' }}>{'*'}</span></p>}
                       
                        invalid={
                            errors.category && touched.category
                        }
                        errorMessage={errors.category}
                    >
                        <Field name="tempDetails.category">
                            {({ field, form }) => (
                                <Select
                                    placeholder="Select Item Category"
                                    field={field}
                                    form={form}
                                    options={productCat || []}
                                    value={productCat?.filter(
                                        (category) =>
                                            category.value ===
                                            values.category
                                    )}
                                    onChange={(category) =>
                                        form.setFieldValue(
                                            field.name,
                                            category.value
                                        )
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>

                    <FormItem className=""
                        label={<p>Template Title <span style={{ color: 'red' }}>{'*'}</span></p>}
                      
                        invalid={errors.title && touched.title}
                        errorMessage={errors.title}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="tempDetails.title"
                            placeholder="Enter Template Title"
                            component={Input}
                        />
                    </FormItem>

                </div>
                <div className="md:grid grid-cols-1 pl-4 gap-1 mx-1">
                    <FormItem label="Description"
                        invalid={errors.description && touched.description}
                        errorMessage={errors.description}
                    >
                        <Field name="tempDetails.description" >
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
            </FormContainer>
        </>
    )
}

export default TemplateBasicInfo
