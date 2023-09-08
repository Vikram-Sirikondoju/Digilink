import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Checkbox,
    Radio
} from 'components/ui'
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'

import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Upload } from 'components/ui'
import { useSelector } from 'react-redux'

const genderOptions = [
    { label: 'Airtel Inc.', value: 'M' },
    { label: 'Airtel Inc.', value: 'F' },
    { label: 'Airtel India', value: 'O' },
]


const placementList = [
    { name: 'Prepaid', value: 'Prepaid' },
    { name: 'Postpaid', value: 'Postpaid' },

]

const billCycle = [
    { label: 'Daily', value: 'DAILY' },
    { label: 'Weekly', value: 'WEEKLY' },
    { label: 'Monthly', value: 'MONTHLY' },
    { label: 'Quarterly', value: 'QUARTERLY' },
    { label: 'Half-Yearly', value: 'HALFYEARLY' },
    { label: 'Yearly', value: 'YEARLY' }
]

const enterpriseBillingInitValues = {
    billCycle: "",
    billDate: "",
    billDueTenor: "",
    creditLimit: "",
    payAmount:''
}

  const billWeekOpt = [
    {label:'Sunday',value:"sunday"},
    {label:'Monday',value:"monday"},
    {label:'Tuesday',value:"tuesday"},
    {label:'Wednesday',value:"wednesday"},
    {label:'Thursday',value:"thursday"},
    {label:'Friday',value:"friday"},
    {label:'Saturday',value:"saturday"},
  ]

  const monthOptions = [
    {label : "1",value : 1},{label : "2",value : 2},
    {label : "3",value : 3},{label : "4",value : 4},
    {label : "5",value : 5},{label : "6",value : 6},
    {label : "7",value : 7},{label : "8",value : 8},
    {label : "9",value : 9},{label : "10",value : 10},
    {label : "11",value : 11},{label : "12",value : 12},
    {label : "13",value : 13},{label : "14",value : 14},
    {label : "15",value : 15},{label : "16",value : 16},
    {label : "17",value : 17},{label : "18",value : 18},
    {label : "19",value : 19},{label : "20",value : 20},
    {label : "21",value : 21},{label : "22",value : 22},
    {label : "23",value : 23},{label : "24",value : 24},
    {label : "25",value : 25},{label : "26",value : 26},
    {label : "27",value : 27},{label : "28",value : 28},
  ]

  const billCycleMonthOpt = [
    {label:'January',value:"january"},
    {label:'February',value:"february"},
    {label:'March',value:"march"},
    {label:'April',value:"april"},
    {label:'May',value:"may"},
    {label:'June',value:"june"},
    {label:'July',value:"july"},
    {label:'August',value:"august"},
    {label:'September',value:"september"},
    {label:'October',value:"october"},
    {label:'November',value:"november"},
    {label:'December',value:"december"}
  ]

const payAmount = [
    {label:'PayPal',value:'PayPal'},
]

const enterpriseBillingValidationSchema = Yup.object().shape({
    //providerId : Yup.string().required('Please Enter Provider Id'),


    /*     billCycle: Yup.string().required('Please select a billing cycle'),
        billDate: Yup.string().required('Please select a billing date'),
        billDueTenor: Yup.string().min(1).max(2,"DueTenor must be at most 2 characters").required('Please enter due tenor days'),
        creditLimit: Yup.string().min(2,"Credit Limit must be at least 3 characters").max(20).required('Please enter a valid credit limit'),
       
        */
    //IncorpDate : Yup.string().required('Please Select Corporate Date'),
    //taxId : Yup.string().required('Please Enter Tax Id'),
    // prodCategory : Yup.string().required('Please Enter Prduct Category'),
    // timeZone : Yup.string().required('Please Enter Time Zone'),
    // currnecy : Yup.string().required('Please Enter Currency'),
    // language: Yup.string().required('Please Enter Language'),
    //displayOrientation : Yup.string().required('Please Enter Display Orientation')
})

const EnterpriseBillingInfo = ({ onChange, refId, ...props }) => {
    const [placement, setPlacement] = useState(placementList[1].value)
    const dateFormat = useSelector((state) => state.locale.dateFormat)


    const onPlacementChange = (val) => {
        setPlacement(val)
    }

    const onCheck = (value, field, form) => {
        form.setFieldValue(field.name, value)
    }


    console.log(props, "propspropspropsprops",placement)
    
    return (
        <>

            <h3 className="mx-4 mb-4 mt-2">BILLING INFO</h3>

            <Formik
                innerRef={refId}
                initialValues={props.EpIntialValues.billing}
                validationSchema={enterpriseBillingValidationSchema}
                onSubmit={(values, actions) => {
                    actions.setSubmitting(true)
                    let updatedPayload = { ...props.enterpriseState, ...values }
                    props.setEnterpriseState(updatedPayload)
                    let dataToStore = props.EpIntialValues
                    dataToStore.billing = values
                    props.setEpIntialValues(dataToStore)
                }}
            >
                {({ values, touched, errors, isSubmitting, setFieldValue }) => {
                    console.log(values)
                    return (
                        <Form>
                            <FormContainer>
                                <div className="md:grid grid-cols-4 gap-3 mx-4">
                                    <FormItem
                                        label="Business Unit"
                                    >
                                        <Field name="sameCorrespondenceAddress">
                                            {({ field, form }) => (
                                                <Checkbox
                                                    checked={
                                                        values.sameCorrespondenceAddress
                                                    }
                                                    // onChange={(val) =>
                                                    //     onCheck(
                                                    //         val,p
                                                    //         field,
                                                    //         form,
                                                    //         setFieldValue
                                                    //     )
                                                    // }
                                                    onChange={(val) =>
                                                        onCheck(val, field, form, setFieldValue)
                                                    }
                                                >

                                                </Checkbox>
                                            )}
                                        </Field>
                                    </FormItem>

                                    {values.sameCorrespondenceAddress === true &&
                                        <FormItem
                                            label={<p>Type<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        >
                                             <Radio.Group value={placement} onChange={onPlacementChange}>
                                                {placementList?.map((item) => (
                                                <Radio value={item.value} id={item.value} key={item.value}>
                                                    {item.name}
                                                </Radio>
                                            ))}
                                        </Radio.Group>  
                                        </FormItem>}


                                </div>
                                {values.sameCorrespondenceAddress === true && placement ==='Postpaid' && (<div className="md:grid grid-cols-4 gap-4 mx-4">
                                    <FormItem
                                        label={<p>Credit Limit<span style={{ color: 'red' }}>{'*'}</span></p>}
                                    // invalid={errors.creditLimit && touched.creditLimit}
                                    //     errorMessage={errors.creditLimit}

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="creditLimit"
                                            placeholder="Enter credit limit"
                                            component={Input}
                                            validate = {async(v) => {
                                                if(values.sameCorrespondenceAddress){
                                                    try{
                                                        await Yup.string().required("Please enter credit limit").validate(v)
                                                    }catch(error){
                                                        return error.message
                                                    }
                                                }
                                            }}
                                        />
                                        <ErrorMessage name= {`creditLimit`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>
                                        
                                    </FormItem>




                                    <FormItem
                                        label={<p>Billing Cycle<span style={{ color: 'red' }}>{'*'}</span></p>}
                                    // invalid={errors.billCycle && touched.billCycle}
                                    // errorMessage={errors.billCycle}
                                    >
                                        <Field name="billCycle" validate = {async(v) => {
                                                if(values.sameCorrespondenceAddress){
                                                    try{
                                                        await Yup.string().required("Please select billing cycle").validate(v)
                                                    }catch(error){
                                                        return error.message
                                                    }
                                                }
                                            }}>
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select billing cycle"
                                                    field={field}
                                                    form={form}
                                                    options={billCycle}
                                                    value={billCycle.filter(
                                                        (gender) =>
                                                            gender.value ===
                                                            values.billCycle
                                                    )}
                                                    onChange={(gender) =>{
                                                        form.setFieldValue("billWeek",'')
                                                        form.setFieldValue("billCycleMonth",'')
                                                        form.setFieldValue("billDate",'')
                                                        form.setFieldValue(field.name,gender.value)
                                                    }}


                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage name= {`billCycle`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>


                                    </FormItem>
                                    {values.billCycle === "WEEKLY" && 
                                    <FormItem label={<p>Billing Week<span style={{color: 'red'}}>{'*'}</span></p>}>
                                        <Field name="billWeek" validate = {async(v) => {
                                                if(values.billCycle === "WEEKLY"){
                                                    try{await Yup.string().required("Please select week").validate(v)}
                                                    catch(error){return error.message}
                                            }}}
                                        >
                                            {({ field, form }) => (
                                                <Select options={billWeekOpt} placeholder="Select settlement week" field={field} form={form}
                                                value={billWeekOpt.filter((week) =>week.value ===values.billWeek)}
                                                onChange={(week) => form.setFieldValue(field.name,week.value)}
                                            />
                                            )}
                                        </Field>
                                        <ErrorMessage name= {`billWeek`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>
                                    </FormItem>}
                                    {(values.billCycle === "QUARTERLY" || values.billCycle === "HALFYEARLY" || values.billCycle === "YEARLY") && 
                                    <FormItem label={<p>Billing Month<span style={{color: 'red'}}>{'*'}</span></p>}>
                                        <Field name="billCycleMonth" validate = {async(v) => {
                                                if(values.billCycle === "QUARTERLY" || values.billCycle === "HALFYEARLY" ||values.billCycle === "YEARLY"){
                                                    try{await Yup.string().required("Please select month").validate(v)}
                                                    catch(error){return error.message}
                                            }}}
                                        >
                                            {({ field, form }) => (
                                                <Select options={billCycleMonthOpt} placeholder="Select settlement month" field={field} form={form}
                                                value={billCycleMonthOpt.filter((week) =>week.value ===values.billCycleMonth)}
                                                onChange={(week) => form.setFieldValue(field.name,week.value)}
                                            />
                                            )}
                                        </Field>
                                        <ErrorMessage name= {`billCycleMonth`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>
                                    </FormItem>}
                                    {(values.billCycle === "MONTHLY"|| values.billCycle === "QUARTERLY" || values.billCycle === "HALFYEARLY" || values.billCycle === "YEARLY") && 
                                    <FormItem label={<p>Billing Date<span style={{color: 'red'}}>{'*'}</span></p>}>
                                        <Field name="billDate" validate = {async(v) => {
                                                if(values.billCycle === "MONTHLY" || values.billCycle === "QUARTERLY" || values.billCycle === "HALFYEARLY" || values.billCycle === "YEARLY"){
                                                    try{await Yup.string().required("Please select date").validate(v)}
                                                    catch(error){return error.message}
                                            }}}
                                        >
                                            {({ field, form }) => (
                                                <Select options={monthOptions} placeholder="Select settlement date" field={field} form={form}
                                                value={monthOptions.filter((week) =>week.value === values.billDate)}
                                                onChange={(week) => form.setFieldValue(field.name,week.value)}
                                            />
                                            )}
                                        </Field>
                                        <ErrorMessage name= {`billDate`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>
                                    </FormItem>}


                                    {/* <FormItem
                                        label={<p>Billing Date<span style={{ color: 'red' }}>{'*'}</span></p>}


                                    // invalid={errors.billDate && touched.billDate}
                                    // errorMessage={errors.billDate}
                                    >
                                        <Field name="billDate" 
                                            validate = {async(v) => {
                                                if(values.sameCorrespondenceAddress){
                                                    try{
                                                        await Yup.string().required("Please select billing date").validate(v)
                                                    }catch(error){
                                                        return error.message
                                                    }
                                                }
                                            }}
                                        >
                                            {({ field, form }) => (
                                                <DatePicker placeholder="Select billing date"
                                                    field={field}
                                                    form={form}
                                                    value={field.value}
                                                    onChange={(date) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            date
                                                        )
                                                    }}
                                                    inputFormat= {dateFormat}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage name= {`billDate`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>
                                    </FormItem> */}



                                    <FormItem
                                        label={<p>{'Due Tenor (Days)'}<span style={{ color: 'red' }}>{'*'}</span></p>}
                                    // invalid={errors.billDueTenor && touched.billDueTenor}
                                    // errorMessage={errors.billDueTenor}

                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="billDueTenor"
                                            placeholder="Enter Tenor"
                                            component={Input}
                                            validate = {async(v) => {
                                                if(values.sameCorrespondenceAddress){
                                                    try{
                                                        await Yup.string().required("Please enter due tenor").validate(v)
                                                    }catch(error){
                                                        return error.message
                                                    }
                                                }
                                            }}
                                        />
                                        <ErrorMessage name= {`billDueTenor`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>
                                      
                                    </FormItem>



                                </div>)}

                                {values.sameCorrespondenceAddress === true && placement ==='Prepaid' &&(<div className='mx-4 grid grid-cols-3'>
                                       
                                    <FormItem
                                        label={<p>Preferred Payment Gateway<span style={{ color: 'red' }}>{'*'}</span></p>}
                                    
                                    >
                                        <Field name="payAmount" validate = {async(v) => {
                                            }}>
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select Payamount"
                                                    field={field}
                                                    form={form}
                                                    options={payAmount}
                                                    value={payAmount.filter(
                                                        (gender) =>
                                                            gender.value ===
                                                            values.payAmount
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
                                        {/* <ErrorMessage name= {`payAmount`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage> */}


                                    </FormItem>
                                </div>)}

                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>


        </>
    )
}

export default EnterpriseBillingInfo
