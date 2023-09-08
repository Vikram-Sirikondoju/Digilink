import {
    Input,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Dialog,
    Tooltip,
    Avatar
} from 'components/ui'
import { Field, FieldArray } from 'formik'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { timeZone } from '../../../../mock/data/timezones'
import { useState } from 'react'
import { RiCloseCircleFill } from 'react-icons/ri'

export const statusOptions = [
    { label: 'Married', value: '1' },
    { label: 'Widowed', value: '2' },
    { label: 'Separated', value: '3' },
    { label: 'Divorced', value: '3' },
    { label: 'Single ', value: '4' },
]

const language = [
    { label: 'English', value: 1 },
    { label: 'Spanish', value: 2 },
    { label: 'Arabic', value: 3 },
    { label: 'Portugese', value: 4 },

]

const orientationtype = [
    { label: 'Right to Left', value: "RTL" },
    { label: 'Left to Right', value: "LTR" },
]


const OperatorAccountInfo = ({ onChange, ...props }) => {

    const dateFormat = useSelector((state) => state.locale.dateFormat)
    const currencyList = useSelector((state) => state.salesOrderList?.data?.currencyList)
    const parentAccountList = useSelector((state) => state.salesOrderList?.data?.parentAccountList)
    const timeZoneList = timeZone?.map((timezone) => ({
        value: timezone.id,
        label: timezone.value,
    }))
    const { errors, touched, values } = props

    const [dialogIsOpen, setIsOpen] = useState(false)
    const [newLabel, setNewLabel] = useState('');
    const [value,   ] = useState('')
    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e) => {
        setIsOpen(false)
    }
    const onDialogOk = (push, values) => {
        if (newLabel !== '') {
            push(
                { field_title: newLabel, field_value: '', field_type:"ACCOUNT"},
            )
            setNewLabel('')
            setIsOpen(false)
            console.log(newLabel)
        }
    }

    const DeleteToolTip = (remove, index) => {
        return (
            <Tooltip
                title={`Remove`}
            >

                <span
                    className={`cursor-pointer  text-${'rose'}-800 hover:text-${'rose'}-800`}
                    onClick={() => remove(index)}
                >
                    <RiCloseCircleFill />
                </span>
            </Tooltip>
        )
    }
    return (
        <>
            <h3 className="mx-4 mb-4 pt-4">ACCOUNT INFO</h3>
            <FormContainer>
                <div className="md:grid grid-cols-4 gap-4 mx-4">
                    <FormItem
                        label={<p>Operator Title <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={errors.accName && touched.accName}
                        errorMessage={errors.accName}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="accInfo.accName"
                            placeholder="Enter Operator Title"
                            component={Input}
                        />
                    </FormItem>
                    <FormItem
                     label={<p>Parent Account <span style={{ color: 'red' }}>{'*'}</span></p>}
                       
                        invalid={errors.accMnoParentId && touched.accMnoParentId}
                         errorMessage={errors.accMnoParentId}
                    >
                        <Field name="accInfo.accMnoParentId">
                            {({ field, form }) => (
                                <Select
                                    placeholder="Select Parent Account"
                                    field={field}
                                    form={form}
                                    options={parentAccountList}
                                    value={parentAccountList.filter(label => label.value === values.accMnoParentId)}
                                    onChange={(label) => form.setFieldValue(field.name, label.value)}
                                />
                            )}
                        </Field>
                    </FormItem>
                    <FormItem
                        label={<p>Company Name <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={errors.accCompName && touched.accCompName}
                        errorMessage={errors.accCompName}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="accInfo.accCompName"
                            placeholder="Enter Company Name."
                            component={Input}
                        />
                    </FormItem>
                    <FormItem
                        label={<p>Incorporation Date <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={errors.accIncorpDt && touched.accIncorpDt}
                        errorMessage={errors.accIncorpDt}
                    >
                        <Field name="accInfo.accIncorpDt" >
                            {({ field, form }) => (



                                <DatePicker
                                    placeholder="Select Incorporation Date"
                                    field={field}
                                    form={form}
                                    value={field.value}
                                    onChange={(date) => {
                                        form.setFieldValue(
                                            field.name,
                                            date
                                        )
                                    }}
                                    maxDate={new Date()}
                                    inputFormat= {dateFormat}
                                />



                            )}
                        </Field>
                    </FormItem>
                    <FormItem
                        label={<p>Tax ID <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={errors.accTaxId && touched.accTaxId}
                        errorMessage={errors.accTaxId}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="accInfo.accTaxId"
                            placeholder="Enter Tax ID"
                            component={Input}
                        />
                    </FormItem>
                    <FormItem
                        label={<p>Time zone <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={errors.accTimeZone && touched.accTimeZone}
                        errorMessage={errors.accTimeZone}
                    >
                        <Field name="accInfo.accTimeZone">
                            {({ field, form }) => (
                                <Select
                                    placeholder="Select Time Zone"
                                    field={field}
                                    form={form}
                                    options={timeZoneList}
                                    value={timeZoneList.filter(label => label.value === values.accTimeZone)}
                                    onChange={(label) => form.setFieldValue(field.name, label.value)}
                                />
                            )}
                        </Field>


                    </FormItem>
                    <FormItem
                        label={<p>Currency <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={errors.accCurrency && touched.accCurrency}
                        errorMessage={errors.accCurrency}
                    >
                        <Field name="accInfo.accCurrency">
                            {({ field, form }) => (
                                <Select
                                    placeholder="Select Currency"
                                    field={field}
                                    form={form}
                                    options={currencyList}
                                    value={currencyList.filter(label => label.value === values.accCurrency)}
                                    onChange={(label) => form.setFieldValue(field.name, label.value)}
                                />
                            )}
                        </Field>
                    </FormItem>
                    <FormItem
                        label={<p>Language <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={errors.accLang && touched.accLang}
                        errorMessage={errors.accLang}
                    >
                        <Field name="accInfo.accLang">
                            {({ field, form }) => (
                                <Select
                                    placeholder="Select Language"
                                    field={field}
                                    form={form}
                                    options={language}
                                    value={language.filter(
                                        (label) =>
                                            label.value ===
                                            values.accLang
                                    )}
                                    onChange={(label) =>
                                        form.setFieldValue(
                                            field.name,
                                            label.value
                                        )
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                    <FormItem
                        label={<p>Display Orientation <span style={{ color: 'red' }}>{'*'}</span></p>}
                        invalid={errors.accOrient && touched.accOrient}
                        errorMessage={errors.accOrient}
                    >
                        <Field name="accInfo.accOrient">
                            {({ field, form }) => (
                                <Select
                                    placeholder="Select Display Orientation"
                                    field={field}
                                    form={form}
                                    options={orientationtype}
                                    value={orientationtype.filter(
                                        (gender) =>
                                            gender.value ===
                                            values.accOrient
                                    )}
                                    onChange={(gender) =>
                                        form.setFieldValue(
                                            field.name,
                                            gender.value
                                        )
                                    }
                                />
                            )}
                        </Field>

                    </FormItem>
                    <FieldArray name="accInfo.fields">
                        {({ push, remove }) => (
                            <>

                                {values.fields.map((item, index) => {
                                    
                                    return (


                                        <FormItem
                                            label={
                                                <div style={{ display: 'flex', alignItems: 'center',flexWrap:'wrap' }}>
                                                    <p style={{ marginRight: '20px' }}>{item.field_title}</p>
                                                    <Tooltip title={`Remove`}>
                                                        <span
                                                            className={`cursor-pointer  text-${'rose'}-800 hover:text-${'rose'}-800`}
                                                            onClick={() => remove(index)}
                                                            style={{ marginLeft: 'auto' }}
                                                        >
                                                            <RiCloseCircleFill />
                                                        </span>
                                                    </Tooltip>
                                                </div>

                                            }
                                        >

                                            <Field
                                                type="text"
                                                autoComplete="off"
                                                placeholder=""
                                                component={Input}
                                                name={`accInfo.fields[${index}].field_value`}
                                            />

                                        </FormItem>

                                    )
                                })}



                                <Dialog
                                    isOpen={dialogIsOpen}
                                    onClose={onDialogClose}
                                    onRequestClose={onDialogClose}
                                    shouldCloseOnOverlayClick={false}
                                    shouldCloseOnEsc={false}
                                >
                                    <FormItem
                                        label="Field Title"
                                    >
                                        <Field
                                            type="text"
                                            name="title"
                                            placeholder="Enter Field Title"
                                            component={Input}
                                            value={newLabel}
                                            onChange={(e) => setNewLabel(e.target.value)}
                                        />
                                    </FormItem>
                                    <div className="text-right mt-6">
                                        <Button
                                            className="ltr:mr-2 rtl:ml-2"
                                            variant="plain"
                                            onClick={onDialogClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button variant="solid" onClick={() => onDialogOk(push, values,)}>
                                            Okay
                                        </Button>
                                    </div>
                                </Dialog>

                            </>
                        )}
                    </FieldArray>
                </div >


            </FormContainer >

            <div className="mt-2">
                <Button
                    type="button"
                    variant="plain"
                    className="font-bold"
                    style={{ color: '#004D99' }}
                    onClick={() => openDialog()}
                    icon={<BsFillPlusCircleFill fill="#004D99" className='' />}
                    disabled = {values.fields[values.fields.length - 1 ]?.field_value == '' ? true : false}
                >
                    ADD CUSTOM FIELD
                </Button>
            </div>

        </>
    )
}

export default OperatorAccountInfo
