import { AdaptableCard, RichTextEditor } from 'components/shared'
import {
    Input,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Checkbox,
    Radio,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { MdOutlineInfo } from 'react-icons/md'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'

export const statusOptions = [
    { label: 'Married', value: 'M' },
    { label: 'Widowed', value: 'W' },
    { label: 'Separated', value: 'S' },
    { label: 'Divorced', value: 'D' },
    { label: 'Single ', value: 'S' },
]


const contractTypeValues = {
    selectUserCategory: [],
    selectTitle: '',
    description: '',
}

const contractTypeValuesValidationSchema = Yup.object().shape({
    selectUserCategory: Yup.string().required('Please Enter Currency'),
    selectTitle: Yup.string().required('Please Enter Language'),
    description: Yup.string().required('Please Enter Display Orientation'),
})

const ContractCreateType = ({ onChange, refId, ...props }) => {

    const parentAccountList = useSelector((state) => state.contractType?.data?.parentAccountList)

    const {
        unq_id, user_type, enterAccount
    } = useSelector((state) => state?.auth?.user)


    const userCatArr = [
        { label: "Provider", value: "Provider" },
        { label: "Partner", value: "Partner" },
        { label: "Enterprise Customer", value: "EnterpriseCustomer" },
    ]

    const { errors, touched, values, setFieldValue } = props
    return (
        <>
            <AdaptableCard className="h-full p-4" bodyClass="h-full">
                <FormContainer>
                    <div className="pt-2 pl-2">
                        <div className='md:grid grid-cols-2 gap-4'>
                            <FormItem
                                label={<p>Operator <span style={{ color: 'red' }}>{'*'}</span></p>}
                                invalid={errors.acc_unq_id && touched.acc_unq_id}
                                errorMessage={errors.acc_unq_id}
                            >
                                <Field name="acc_unq_id" validate={async (passedValue) => {
                                    if (user_type === "GlobalMno") {
                                        try {
                                            await Yup.string().required('Please select operator').validate(passedValue);
                                        } catch (error) {
                                            return error.message;
                                        }
                                    }
                                }}>
                                    {({ field, form }) => (
                                        <Select
                                            isDisabled={user_type !== "GlobalMno" ? true : false}
                                            placeholder="Select Operator"
                                            field={field}
                                            form={form}
                                            options={parentAccountList}
                                            value={user_type !== "GlobalMno" ? parentAccountList?.filter(
                                                (label) =>
                                                    label.acc_unq_id === enterAccount
                                            ) : parentAccountList?.filter(
                                                (label) =>
                                                    label.acc_unq_id === values.acc_unq_id
                                            )}
                                            onChange={(label) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    label.acc_unq_id
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>
                        </div>
                        <div className='md:grid grid-cols-2 gap-4 pt-4'>
                            <FormItem label={<p>Select User Category<span style={{ color: 'red' }}>{'*'}</span></p>}
                                invalid={errors.cust_cat && touched.cust_cat}
                                errorMessage={errors.cust_cat}
                            >
                                <div className='flex gap-6 mt-4'>
                                    {userCatArr.map((item, index) => {
                                        return (
                                            <>
                                                <div className='flex'>
                                                    <Field className='mr-2'
                                                        type="radio"
                                                        autoComplete="off"
                                                        name='cust_cat'
                                                        component={Radio}
                                                        value={item.value}
                                                    />
                                                    <div><label>{item.label}</label></div>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </FormItem>
                        </div>
                        {/* <div className='md:grid grid-cols-6 gap-4 pt-4'>
                        <FormItem>
                            <Checkbox
                                children={<p className="mr-6 color-black">Provider</p>}
                            />
                        </FormItem>
                        <FormItem>
                            <Checkbox
                                children={<p className="mr-6 color-black">Partner</p>}
                            />
                        </FormItem>
                        <FormItem>
                            <Checkbox className='w-48'
                                    children={<p className="mr-6 color-black">Enterprise Customer</p>}
                            />
                        </FormItem>
                    </div>*/}
                        <div className='md:grid grid-cols-2 gap-4 pt-4'>
                            <FormItem label={<p>Title<span style={{ color: 'red' }}>{'*'}</span></p>}
                                classNamew='w-48'
                                invalid={errors.contract_type_title && touched.contract_type_title}
                                errorMessage={errors.contract_type_title}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="contract_type_title"
                                    placeholder="Enter Operator Title"
                                    component={Input}
                                />
                            </FormItem>
                        </div>
                        <div className='md:grid grid-cols-2 gap-4 pt-4'>
                            <FormItem
                                label='Description'
                            >
                                <Field name='contract_type_desc'>
                                    {({ field, form }) => (
                                        <RichTextEditor
                                            field={field}
                                            form={form}
                                            value={field.value}
                                            onChange={(val) => { form.setFieldValue(field.name, val) }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                        </div>
                    </div>
                </FormContainer>
            </AdaptableCard>
        </>
    )
}

export default ContractCreateType
