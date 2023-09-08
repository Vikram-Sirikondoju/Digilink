import React, { useEffect, useState } from 'react'
import { AdaptableCard } from 'components/shared'
import { Field, FieldArray, Form, Formik } from 'formik'
import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Checkbox,
    Radio,
    Dialog,
    Alert,
} from 'components/ui'
import SolutionBasicDetailsOther from './SolutionBasicDetailsOther'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { getItemsByItemTypeD, getItemsByItemTypeP, getItemsByItemTypeS, getVarientsByItem } from '../store/dataSlice'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { apiGetVarientsByItem } from 'services/SolutionsService'

const proCategoryOptions = [
    { label: 'Product', value: 'P' },
    { label: 'Data Plan', value: 'D' },
    { label: 'Service Plan', value: 'S' },
]


const emiOptions = [
    { label: '3', value: 3 },
    { label: '6', value: 6 },
]


const validatationSchema = Yup.object().shape({
    initialValues: Yup.array().of(
        Yup.object().shape({
            solItemType: Yup.string().required('Please select item type'),
            cItemType: Yup.string().required('Please select item'),

            solItems: Yup.array().of(
                Yup.object().shape({
                    solVariant: Yup.string().required('Please select variant'),
                    solPrice: Yup.string().required('Enter variant Price'),
                }),

            ),
        })

    ),
});
const SolutionCreateStep2 = ({ onChange, refId, ...props }) => {

    const dispatch = useDispatch()
    const [addNewFields, setAddNewField] = useState(false)
    const [provApplicablePopup, setProvApplicablePopup] = useState({ bool: false, field: '', index: '' })
    const { enterAccount, password, rememberMe, usernameOrEmail } = useSelector(
        (state) => state.auth.user
    )
    const itemsByItemTypeP = useSelector((state) => state?.solutionsList?.data?.itemsByItemTypeP)
    const itemsByItemTypeD = useSelector((state) => state?.solutionsList?.data?.itemsByItemTypeD)
    const itemsByItemTypeS = useSelector((state) => state?.solutionsList?.data?.itemsByItemTypeS)

    const varientsByItem = useSelector((state) => state?.solutionsList?.data?.varients)
    const [varients, setVarients] = useState([])
    const [solMessage, setSolMessage] = useTimeOutMessage()

    const SubmitData = (values) => {
        let dataToStore = props.solutionIntialValues
        dataToStore.solCreate.initialValues = values.initialValues
        props.setSolutionIntialValues(dataToStore)
        let body = {
            "dgl_rel_prod_cat_ids": [{
                "rel_prod_cat_id": props?.solutionIntialValues?.basics?.pCategory,
                "prod_cat_status": 0
            },],
            "dgl_cat_sol_items": [
                {

                    "sol_display_item_var_price": values.solPrice,
                    "sol_item_parent_item": values.solParentVariant,
                    "sol_item_is_dep": true,
                    "is_paid_provider": false,
                    "dgl_cat_sol_info": null,
                    "item": {
                        "id": values.cItemType
                    },
                    "item_var": {
                        "id": values.solVariant
                    }
                },
            ],
            "dgl_cat_sol_configs": [{
                "sol_config_title": "SolConfig3",
                "sol_config_details": "json string3"
            }]
        }
        let datq = { ...props.solutionState, ...body }
        props.setSolutionState(datq)
        props.setStep(props.step + 1)
    }

    const onCheck = (value, field, form, values, solIndex) => {
        form.setFieldValue(field.name, value)
    }

    const onCheckPay = (form) => {
        form.setFieldValue(provApplicablePopup.field, true)
    }

    const onChangeEmidd = (value, form, setFieldValue, values, solIndex, emiIndex, field) => {
        setFieldValue(field, value)
    }

    const onClickAddNewField = () => {
        setAddNewField(true)
    }

    useEffect(() => {
        dispatch(getItemsByItemTypeP({ catId: props?.solutionIntialValues?.basics?.pCategory, itemType: "P" }))
        dispatch(getItemsByItemTypeD({ catId: props?.solutionIntialValues?.basics?.pCategory, itemType: "D" }))
        dispatch(getItemsByItemTypeS({ catId: props?.solutionIntialValues?.basics?.pCategory, itemType: "S" }))
    }, [])

    const onClickDeleteNewField = () => {
        setAddNewField(false)
    }
    const onChangeItemType = (form, field, solItemType, solIndex, values) => {
        form.setFieldValue(field.name, solItemType.value)

    }
    const onChangeItem = async (form, field, cItemType, values, solIndex) => {

        let data = getOptionsForChooseItem(values, solIndex)
        form.setFieldValue(
            `initialValues[${solIndex}].chooseItems`, data

        )
        form.setFieldValue(
            field.name,
            cItemType.value
        )
        const response = await apiGetVarientsByItem(cItemType.value)
        let ddValues = []
        if (response.status === 'success') {
            ddValues = response.data.data.response.map((product) => (
                {
                    value: product.id,
                    label: product.item_var_title,
                }
            ));
        }

        form.setFieldValue(
            `initialValues[${solIndex}].chooseVarients`,
            ddValues
        )
        // form.setFieldValue(
        //     `initialValues[${solIndex}].itemPrice`,
        //     response?.data?.data?.response[0]?.var_def_price
        // )
        // form.setFieldValue(
        //     `initialValues[${solIndex}].solItems`,
        //     [{ solVariant: "", solParentVariant: "", solPrice: response?.data?.data?.response[0]?.var_def_price, solDiscount: "" }]
        // )
        form.setFieldValue(
            `initialValues[${solIndex}].solItems`,
            [{ solVariant: "", solParentVariant: "", solPrice: "", solDiscount: "", isDep:true, defaultSolPrice:"" }]
        )
    }

    const onChangeVarient = async (form, field, cItem, values, solIndex, index, ddList) => {
        let flag = values?.initialValues[solIndex]?.solItems?.some(item => item.solVariant === cItem.value)
        if (!flag) {
            form.setFieldValue(field.name, cItem.value)
            const response = await apiGetVarientsByItem(values.initialValues[solIndex].cItemType)
            let priceDefault
            response?.data?.data?.response?.map((e, ind) => {
                if (e.id == cItem.value) {
                    priceDefault = e.var_def_price
                }
            })
            form.setFieldValue(
                `initialValues[${solIndex}].solItems[${index}].defaultSolPrice`,
                Number(priceDefault)
            )
            form.setFieldValue(
                `initialValues[${solIndex}].solItems[${index}].solPrice`,
                Number(priceDefault)
            )
            form.setFieldValue(
                `initialValues[${solIndex}].solItems[${index}].solDiscount`,
                0
            )
        }
    }

    const onChangeVarientPrice = (field, form ,index, solIndex, e , values) =>{
        form.setFieldValue(
            `initialValues[${solIndex}].solItems[${index}].solPrice`,
            e.target.value
        )
        form.setFieldValue(
            `initialValues[${solIndex}].solItems[${index}].solDiscount`,
           (-((values?.initialValues[solIndex]?.solItems[index]?.defaultSolPrice - Number(e.target.value)) / 100 )*100)
        )
    }

    const getOptionsForChooseItem = (values, solIndex) => {
        if (values.initialValues[solIndex].solItemType == "P") {
            return itemsByItemTypeP
        } else if (values.initialValues[solIndex].solItemType == "D") {
            return itemsByItemTypeD
        } else if (values.initialValues[solIndex].solItemType == "S") {
            return itemsByItemTypeS
        } else {
            return []
        }

    }

    const onChangeDepRadio = (e, values, solIndex, index, form, field) => {
        form.setFieldValue(field.name, true)
        values?.initialValues[solIndex]?.solItems?.map((f, index2) => {
            if (index != index2) {
                form.setFieldValue(`initialValues[${solIndex}].solItems[${index2}].isDep`, false)
            }
        })
    }


    


    return (
        <>
            <div className="bg-gray-50 p-5" style={{ backgroundColor: "#f5f5f5" }}>
                <Formik
                    innerRef={refId}
                    initialValues={props.solutionIntialValues.solCreate}
                    validationSchema={validatationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true)
                        SubmitData(values)
                    }}
                >
                    {({ values, touched, errors, isSubmitting, setFieldValue }) => {
                        return (
                            <Form>
                                <FormContainer>
                                    <FieldArray name='initialValues'>
                                        {({ push: pushSol, remove: removeSol }) => (
                                            <div>
                                                {values.initialValues?.map((solItem, solIndex) => {
                                                    return (
                                                        <>
                                                            <AdaptableCard className="h-full" bodyClass="h-full" divider>
                                                                <div className='md:grid grid-cols-3 gap-6 mx-4 mt-4'>
                                                                    <FormItem
                                                                        label={<p> Item Type <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                                    >
                                                                        <Field name={`initialValues[${solIndex}].solItemType`}>
                                                                            {({ field, form }) => (
                                                                                <Select placeholder="Select Item Type" field={field} form={form}
                                                                                    options={proCategoryOptions}
                                                                                    value={proCategoryOptions?.filter((solItemType) => solItemType.value === values.initialValues[solIndex].solItemType)}
                                                                                    onChange={(solItemType) => onChangeItemType(form, field, solItemType, solIndex, values)}
                                                                                />
                                                                            )}
                                                                        </Field>

                                                                        {errors.initialValues?.[solIndex]?.solItemType && touched.initialValues?.[solIndex]?.solItemType && (
                                                                            <div className="error-message"  style={{color:'red'}}>{errors.initialValues[solIndex].solItemType}</div>
                                                                        )}
                                                                    </FormItem>
                                                                    <FormItem
                                                                        label={<p> Item <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                                        invalid={errors.cItemType && touched.cItemType}
                                                                        errorMessage={errors.cItemType}
                                                                    >
                                                                        <Field name={`initialValues[${solIndex}].cItemType`}>
                                                                            {({ field, form }) => (
                                                                                <Select placeholder="Select Item" field={field} form={form}
                                                                                    options={getOptionsForChooseItem(values, solIndex)}
                                                                                    value={getOptionsForChooseItem(values, solIndex)?.filter((cItemType) => cItemType.value === values.initialValues[solIndex].cItemType)}
                                                                                    onChange={(cItemType) => onChangeItem(form, field, cItemType, values, solIndex)}
                                                                                />
                                                                            )}
                                                                        </Field>
                                                                        {errors.initialValues?.[solIndex]?.cItemType && touched.initialValues?.[solIndex]?.cItemType && (
                                                                            <div className="error-message"  style={{color:'red'}}>{errors.initialValues[solIndex].cItemType}</div>
                                                                        )}
                                                                    </FormItem>
                                                                </div>
                                                                {values?.initialValues[solIndex]?.cItemType && <FieldArray name={`initialValues[${solIndex}].solItems`}>
                                                                    {({ push, remove }) => (
                                                                        <div>
                                                                            {values.initialValues[solIndex]?.solItems?.map((item, index) => {
                                                                                return (
                                                                                    <>
                                                                                        <div className="md:grid grid-cols-6 gap-6 mx-4 mt-4">
                                                                                            <div className='flex col-start-1 col-end-3'>
                                                                                                <FormItem className='w-24' style={{ paddingTop: '35%' }} >
                                                                                                    <Field name={`initialValues[${solIndex}].solItems[${index}].isDep`}>

                                                                                                        {({ field, form }) => (
                                                                                                            <Radio style={{ marginRight: "-100px" }} value={`initialValues[${solIndex}].solItems[${index}].isDep`}
                                                                                                                id={`initialValues[${solIndex}].solItems[${index}].isDep`}
                                                                                                                key={`initialValues[${solIndex}].solItems[${index}].isDep`}
                                                                                                                checked={values.initialValues[solIndex].solItems[index].isDep}
                                                                                                                onChange={(e) => onChangeDepRadio(e, values, solIndex, index, form, field)}
                                                                                                            >
                                                                                                            </Radio>
                                                                                                        )}
                                                                                                    </Field>

                                                                                                </FormItem>
                                                                                                <FormItem className='w-44'
                                                                                                    label={<p> Variant <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                                                                >
                                                                                                    <Field name={`initialValues[${solIndex}].solItems[${index}].solVariant`}>
                                                                                                        {({ field, form }) => (
                                                                                                            <Select
                                                                                                                placeholder="Select variant" field={field} form={form}
                                                                                                                // options={varients || []}
                                                                                                                options={values.initialValues[solIndex]?.chooseVarients || []}

                                                                                                                value={values.initialValues[solIndex]?.chooseVarients?.filter((cItem) => cItem.value === values.initialValues[solIndex]?.solItems[index].solVariant)}
                                                                                                                onChange={(cItem) => onChangeVarient(form, field, cItem, values, solIndex, index, values.initialValues[solIndex]?.chooseVarients)}
                                                                                                            />
                                                                                                        )}
                                                                                                    </Field>

                                                                                                    {errors.initialValues?.[solIndex]?.solItems?.[index]?.solVariant && touched.initialValues?.[solIndex]?.solItems?.[index]?.solVariant && (
                                                                                                        <div style={{ color: 'red' }}>{errors.initialValues[solIndex].solItems[index].solVariant}</div>
                                                                                                    )}
                                                                                                </FormItem>
                                                                                            </div>
                                                                                            {/* <FormItem className='col-start-2 col-end-3 w-44'
                                                                                                    label={<p className='whitespace-nowrap'>Applicable Parent Variant <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                                                                    invalid={errors.solParentVariant && touched.solParentVariant}
                                                                                                    errorMessage={errors.solParentVariant}
                                                                                                >
                                                                                                    <Field name={`initialValues[${solIndex}].solItems[${index}].solParentVariant`}>
                                                                                                        {({ field, form }) => (
                                                                                                            <Select isDisabled={true} placeholder="Select" field={field} form={form} options={values.initialValues[solIndex]?.chooseVarients || []}
                                                                                                                value={values.initialValues[solIndex]?.chooseVarients.filter((cItem) => cItem.value === values.initialValues[solIndex]?.solItems[index].solParentVariant)}
                                                                                                                onChange={(cItem) => form.setFieldValue(field.name, cItem.value)}
                                                                                                            />
                                                                                                        )}
                                                                                                    </Field>
                                                                                                </FormItem> */}


                                                                                            {/* <FormItem className='ml-2 w-40' label={<p>Price in USD <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                                                            // errorMessage={errors.solPrice}
                                                                                            >
                                                                                                <Field type="number" autoComplete="off" placeholder="Enter Price" component={Input}
                                                                                                    name={`initialValues[${solIndex}].solItems[${index}].solPrice`} />

                                                                                                {errors.initialValues?.[solIndex]?.solItems?.[index]?.solPrice && touched.initialValues?.[solIndex]?.solItems?.[index]?.solPrice && (
                                                                                                    <div style={{color:'red'}}>{errors.initialValues[solIndex].solItems[index].solPrice}</div>
                                                                                                )}
                                                                                            </FormItem> */}

                                                                                            <FormItem className='ml-2 w-40' label={<p>Price In USD <span style={{ color: 'red' }}>{'*'}</span></p>}>
                                                                                                <Field name={`initialValues[${solIndex}].solItems[${index}].solPrice`}>
                                                                                                    {({ field, form }) => (
                                                                                                       <Input
                                                                                                       placeholder="Price"
                                                                                                       value = {values?.initialValues[solIndex]?.solItems[index]?.solPrice}
                                                                                                       onChange={(e)=>onChangeVarientPrice(field, form ,index, solIndex,e,values)}
                                                                                                   />
                                                                                                    )}
                                                                                                </Field>

                                                                                                {errors.initialValues?.[solIndex]?.solItems?.[index]?.solPrice && touched.initialValues?.[solIndex]?.solItems?.[index]?.solPrice && (
                                                                                                    <div style={{color:'red'}}>{errors.initialValues[solIndex].solItems[index].solPrice}</div>
                                                                                                )}
                                                                                            </FormItem>




                                                                                            <FormItem label="Price Variation">
                                                                                                <Field type="text" disabled autoComplete="off" placeholder="Enter Price" component={Input}
                                                                                                    name={`initialValues[${solIndex}].solItems[${index}].solDiscount`} />
                                                                                            </FormItem>
                                                                                            <div className="mt-6">
                                                                                                <Button className='border-cyan-500' shape="circle" size="md" icon={<HiPlus />} type={'button'}
                                                                                                    onClick={() => push({ solVariant: "", solParentVariant: "", solPrice: values.initialValues[solIndex].itemPrice, solDiscount: "", isDep: '' })} />
                                                                                                {values.initialValues[solIndex].solItems.length > 1 &&
                                                                                                    <Button className='ml-4 border-red-500' shape="circle" size="md" icon={<HiMinus />} type={'button'}
                                                                                                        onClick={() => remove(index)} />}
                                                                                            </div>
                                                                                        </div>
                                                                                    </>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                    )}
                                                                </FieldArray>}
                                                                {/* <div className="md:grid grid-cols-1 gap-6 mx-4 mt-4">
                                                                    <FormItem label="Is Payement to Provider applicable">
                                                                        <Field name={`initialValues[${solIndex}].paymentProvAvailable`}>
                                                                            {({ field, form }) => (
                                                                                <>
                                                                                    <Checkbox
                                                                                        disabled
                                                                                        checked={values?.initialValues[solIndex]?.paymentProvAvailable}
                                                                                        // onChange={e => setProvApplicablePopup({bool : true , field : `initialValues[${solIndex}]?.paymentProvAvailable`, index:solIndex, value:values.initialValues[solIndex]?.paymentProvAvailable})}
                                                                                        onChange={e => onCheck(e, field, form, setFieldValue, values, solIndex)}
                                                                                    />
                                                                                    <Dialog isOpen={provApplicablePopup.bool} onClose={() => setProvApplicablePopup({ bool: false, field: '', index: '' })}>
                                                                                        <div>
                                                                                            <h5 className="pb-2 border-b-2">Split Payment Confirmation</h5>
                                                                                            <div className="mt-4">
                                                                                                <label>Are you sure you want to {values?.initialValues[solIndex]?.paymentProvAvailable ? 'deactivate' : 'activate'} this Split Payment</label>
                                                                                            </div>
                                                                                            <div className="mt-8 flex gap-4 justify-end ">
                                                                                                <Button onClick={() => setProvApplicablePopup({ bool: false, field: '', index: '' })}>No</Button>
                                                                                                <Button
                                                                                                    onClick={() => onCheckPay(form)}
                                                                                                    variant="solid"
                                                                                                >
                                                                                                    Yes
                                                                                                </Button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </Dialog>
                                                                                </>
                                                                            )}
                                                                        </Field>
                                                                    </FormItem>
                                                                    <div className="md:grid grid-cols-1 gap-6">
                                                                        <FormItem label="EMI">
                                                                            <Field name={`initialValues[${solIndex}].emiCheck`}>
                                                                                {({ field, form }) => (
                                                                                    <Checkbox
                                                                                        disabled
                                                                                        checked={values.initialValues[solIndex].emiCheck}
                                                                                        onChange={e => onCheck(e, field, form, setFieldValue, values, solIndex)}
                                                                                    />
                                                                                )}
                                                                            </Field>
                                                                        </FormItem>
                                                                    </div>
                                                                    {values.initialValues[solIndex].emiCheck == true &&
                                                                        <div className=''>
                                                                            <FieldArray name={`initialValues[${solIndex}].emiArr`}>
                                                                                {({ push: pushEmiArr, remove: removeEmiArr }) => (
                                                                                    <div>
                                                                                        {values.initialValues[solIndex].emiArr?.map((emiEl, emiIndex) => {
                                                                                            return (
                                                                                                <>
                                                                                                    <div className='md:grid grid-cols-4 gap-4 mx-4 '>
                                                                                                        <FormItem label='No of Months'>
                                                                                                            <Field name={`initialValues[${solIndex}].emiArr[${emiIndex}].noOfEmis`}>
                                                                                                                {({ field, form }) => (
                                                                                                                    <Select placeholder="Select" field={field} form={form}
                                                                                                                        options={emiOptions}
                                                                                                                        value={emiOptions.filter((cItem) => cItem.value === values.initialValues[solIndex]?.emiArr[emiIndex]?.noOfEmis)}
                                                                                                                        onChange={(cItem) => onChangeEmidd(cItem.value, form, setFieldValue, values, solIndex, emiIndex, field.name)}
                                                                                                                    />
                                                                                                                )}
                                                                                                            </Field>
                                                                                                        </FormItem>
                                                                                                        <FormItem label='Emi Value per month'>
                                                                                                            <Field type="text" autoComplete="off" placeholder="Enter Emi Value per month" component={Input}
                                                                                                                name={`initialValues[${solIndex}].emiArr[${emiIndex}].emiValuePerMonth`} />
                                                                                                        </FormItem>
                                                                                                        <div className='mt-7'>
                                                                                                            <Button type='button' className=' border-cyan-500' shape="circle" size="md" icon={<HiPlus />}
                                                                                                                onClick={() => pushEmiArr({
                                                                                                                    noOfEmis: '',
                                                                                                                    emiValuePerMonth: ''
                                                                                                                })} />
                                                                                                            {values.initialValues[solIndex].emiArr.length > 1 &&
                                                                                                                <Button type='button' className='mx-4  border-red-500' shape="circle" size="md" icon={<HiMinus />}
                                                                                                                    onClick={() => removeEmiArr(emiIndex)} />}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </>
                                                                                            )
                                                                                        })}
                                                                                    </div>
                                                                                )}
                                                                            </FieldArray>
                                                                        </div>}
                                                                </div> */}
                                                            </AdaptableCard>
                                                            <div className="mt-4 text-right lg:flex items-center justify-end">
                                                                <Button variant="plain" type='button' className='font-bold mb-4' style={{ color: "#004D99" }} icon={<BsFillPlusCircleFill fill='#004D99' />}
                                                                    onClick={() => pushSol({
                                                                        solItemType: "",
                                                                        cItemType: "",
                                                                        solItems: [{ solVariant: "", solParentVariant: "", solPrice: "", solDiscount: "" }],
                                                                        paymentProvAvailable: false,
                                                                        emiCheck: false,
                                                                        emiArr: [{ noOfEmis: '', emiValuePerMonth: '' }],
                                                                        chooseItems: [],
                                                                        chooseVarients: []
                                                                    })}
                                                                >ADD NEW ITEM</Button>
                                                                {values.initialValues.length > 1 &&
                                                                    <Button variant="plain" type='button' className='font-bold mb-4' style={{ color: "#990000" }} icon={<BsFillPlusCircleFill fill='#990000' />}
                                                                        onClick={() => removeSol(solIndex)}
                                                                    >DELETE</Button>}
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </FieldArray>
                                </FormContainer>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </>
    )
}

export default SolutionCreateStep2
