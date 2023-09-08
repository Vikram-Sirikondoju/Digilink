import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Checkbox,
    Dialog
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { Upload } from 'components/ui'
import * as Yup from 'yup'
import { apiUploadFiles } from 'services/ProvidersService'
import { OpenNotification } from 'views/Servicefile'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import CloseButton from 'components/ui/CloseButton'
import appConfig from 'configs/app.config'

const onCheck = (value, field, form) => {
    form.setFieldValue(field.name, value)
}


const provSettlementInitValues = {
    prefSettleType: "",
    billCycle: "",
    billDate: "",
    billDueTenor: "",
    bankAccNum: "",
    bankName: "",
    bankBranchName: "",
    ifscCode: "",
    micrCode: "",
}

const provSettlementValidationSchema = Yup.object().shape({
    billCycle: Yup.string().required('Please select a settlement cycle ').nullable(),
    // billDate: Yup.string().required('Please select a settlement date').nullable(),
    billDueTenor: Yup.string().min(1,"Offset days must me 1 characters").max(2,'Max 2 characters allowed').required('Enter a valid number of offset days').nullable(),
    prefSettleType:Yup.string().required("Please select a preferred settlement type ").nullable(),
    ifscCode : Yup.string().min(3,"mini. 3 characters required").max(20,"max. 20 characters allowed").required("Please enter IFSC Code"),
    bankName : Yup.string().min(3,"mini. 3 characters required").max(100,"max. 100 characters allowed").required("Please enter Bank Name"),
    bankAccNum : Yup.string().min(1,"mini. 1 characters required").max(20,"max. 20 characters allowed").required("Please enter Bank Account no."),
    bankBranchName : Yup.string().min(3,"mini. 3 characters required").max(100,"max. 100 characters allowed").required("Please enter Bank Branch Name"),
    micrCode : Yup.string().min(3,"mini. 3 characters required").max(20,"max. 20 characters allowed").required("Please enter MICR Code"),
})

const settlementType = [
    { label: 'Automatic', value: 'AUTOMATIC' },
    { label: 'Manual', value: 'MANUAL' },
  ];

  const settelementCycle = [
    { label: 'Daily', value: 'DAILY' },
    { label: 'Weekly', value: 'WEEKLY' },
    { label: 'Monthly', value: 'MONTHLY' },
    { label: 'Quarterly', value: 'QUARTERLY' },
    { label: 'Half-Yearly', value: 'HALFYEARLY' },
    { label: 'Yearly', value: 'YEARLY' },
  ];

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

const genderOptions = [
    { label: 'Airtel Inc.', value: 0 },
    { label: 'Airtel Inc.', value: 1 },
    { label: 'Airtel India', value: 2 },
]

const saveFilesInProvSettlement = 1
const ProviderSettlementInfo = ({ onChange, refId, ...props }) => {

    const { enterAccount, acc_user_id, rememberMe, usernameOrEmail } = useSelector(
        (state) => state.auth.user
    )

    const beforeUpload = async (newFiles, files) => {
        const file = newFiles[0];
        const allowedTypes = ['image/jpeg', 'image/png'];
    
        if (!allowedTypes.includes(file.type)) {
            OpenNotification('warning', 'JPG/PNG files are allowed only!')
          return false;
        } 
        try { 
            const ress = await apiUploadFiles(newFiles[0], acc_user_id, saveFilesInProvSettlement)
            return ress
        } catch (error) {
          console.error('Error during file upload:', error);
          return false;
        }
    }
    const [showContent, setShowContent] = useState(false)
    const [content, setContent] = useState(null)
    const dateFormat = useSelector((state) => state.locale.dateFormat)

    const onClickView = (fileInfo) => {
        setShowContent(true)
        setContent(fileInfo)
    }

    console.log('ProviderState',props)
    return (
        <>  

            <h3 className="mx-4 mb-4 mt-2">SETTLEMENT INFO</h3>

            <Formik innerRef={refId}
                initialValues={props.provideIntialValues.settlementInfo}
                validationSchema={provSettlementValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    let updatedPayload = { ...props.providerState, ...values }
                    props.setProviderState(updatedPayload)
                    let dataToStore = props.provideIntialValues
                    dataToStore.settlementInfo = values
                    props.setProviderIntialValues(dataToStore)

                    
                }}
            >
                {({ values, touched, errors, isSubmitting, setFieldValue }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className="md:grid grid-cols-4 gap-4 mx-4">
                                    <FormItem
                                        label={<p>Select preferred settlement type<span style={{ color: 'red' }}>{'*'}</span></p>}
                                                    invalid={errors.prefSettleType && touched.prefSettleType}
                                                    errorMessage={errors.prefSettleType}

                                    >
                                        <Field name="prefSettleType">
                                            {({ field, form }) => (
                                                <Select
                                                    value={settlementType.filter(
                                                        (sType) =>
                                                        sType.value ===
                                                            values.prefSettleType
                                                    )}
                                                    placeholder="Select Settlement Type"
                                                    field={field}
                                                    form={form}
                                                    options={settlementType}
                                                    onChange={(sType) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            sType.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                      label={<p>Settlement Cycle<span style={{color: 'red'}}>{'*'}</span></p>}
                                        invalid={errors.billCycle && touched.billCycle}
                                        errorMessage={errors.billCycle}
                                    >
                                        <Field name="billCycle">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select Settlement Cycle"
                                                    field={field}
                                                    form={form}
                                                    options={settelementCycle}
                                                    value={settelementCycle.filter(
                                                        (sCycle) =>
                                                        sCycle.value ===
                                                            values.billCycle
                                                    )}
                                                    onChange={(sCycle) =>{
                                                        form.setFieldValue("billWeek",'')
                                                        form.setFieldValue("billCycleMonth",'')
                                                        form.setFieldValue("billDate",'')
                                                        form.setFieldValue(field.name,sCycle.value)
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    {values.billCycle === "WEEKLY" && 
                                    <FormItem
                                      label={<p>Settlement Week<span style={{color: 'red'}}>{'*'}</span></p>}
                                        invalid={errors.billWeek && touched.billWeek}
                                        errorMessage={errors.billWeek}
                                    >
                                        <Field name="billWeek" validate = {async(v) => {
                                                if(values.billCycle === "WEEKLY"){
                                                    try{await Yup.string().required("Please select week").validate(v)}
                                                    catch(error){return error.message}
                                            }}}
                                        >
                                            {({ field, form }) => (
                                                <Select options={billWeekOpt} placeholder="Select Settlement Week" field={field} form={form}
                                                value={billWeekOpt.filter((week) =>week.value ===values.billWeek)}
                                                onChange={(week) => form.setFieldValue(field.name,week.value)}
                                            />
                                            )}
                                        </Field>
                                    </FormItem>}
                                    {(values.billCycle === "QUARTERLY" || values.billCycle === "HALFYEARLY" ||values.billCycle === "YEARLY") && 
                                    <FormItem
                                      label={<p>Settlement Month<span style={{color: 'red'}}>{'*'}</span></p>}
                                        invalid={errors.billCycleMonth && touched.billCycleMonth}
                                        errorMessage={errors.billCycleMonth}
                                    >
                                        <Field name="billCycleMonth" validate = {async(v) => {
                                                if(values.billCycle === "QUARTERLY" || values.billCycle === "HALFYEARLY" ||values.billCycle === "YEARLY"){
                                                    try{await Yup.string().required("Please select month").validate(v)}
                                                    catch(error){return error.message}
                                            }}}
                                        >
                                            {({ field, form }) => (
                                                <Select options={billCycleMonthOpt} placeholder="Select Settlement Month" field={field} form={form}
                                                value={billCycleMonthOpt.filter((week) =>week.value ===values.billCycleMonth)}
                                                onChange={(week) => form.setFieldValue(field.name,week.value)}
                                            />
                                            )}
                                        </Field>
                                    </FormItem>}
                                    {(values.billCycle === "MONTHLY"|| values.billCycle === "QUARTERLY" || values.billCycle === "HALFYEARLY" ||values.billCycle === "YEARLY") && 
                                    <FormItem
                                      label={<p>Settlement Date<span style={{color: 'red'}}>{'*'}</span></p>}
                                        invalid={errors.billDate && touched.billDate}
                                        errorMessage={errors.billDate}
                                    >
                                        <Field name="billDate" validate = {async(v) => {
                                                if(values.billCycle === "MONTHLY" || values.billCycle === "QUARTERLY" || values.billCycle === "HALFYEARLY" || values.billCycle === "YEARLY"){
                                                    try{await Yup.string().required("Please select date").validate(v)}
                                                    catch(error){return error.message}
                                            }}}
                                        >
                                            {({ field, form }) => {
                                                console.log('monthOptions',monthOptions,field,values,form)
                                                return(
                                                <Select options={monthOptions} placeholder="Select Settlement Date" field={field} form={form}
                                                value={monthOptions.filter((week) =>week.value === values.billDate)}
                                                onChange={(week) => form.setFieldValue(field.name,week.value)}
                                            />
                                            )}}
                                        </Field>
                                    </FormItem>}
                                    {/* <FormItem
                                      label={<p>Settlement Date<span style={{color: 'red'}}>{'*'}</span></p>}
                                        invalid={errors.billDate && touched.billDate}
                                        errorMessage={errors.billDate}
                                    >
                                        <Field name="billDate">
                                            {({ field, form }) => (
                                                <DatePicker
                                                    placeholder="Select Date"
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
                                    </FormItem> */}
                                    <FormItem
                                      label={<p>{'Offset Days'}<span style={{color: 'red'}}>{'*'}</span></p>}

                                        invalid={errors.billDueTenor && touched.billDueTenor}
                                        errorMessage={errors.billDueTenor}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="billDueTenor"
                                            placeholder="Enter Number Of Offset Days"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>Bank Account Number<span style={{color: 'red'}}>{'*'}</span></p>}
                                        invalid={errors.bankAccNum && touched.bankAccNum}
                                        errorMessage={errors.bankAccNum}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="bankAccNum"
                                            placeholder="Enter Account Number"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>Bank Name<span style={{color: 'red'}}>{'*'}</span></p>}
                                        invalid={errors.bankName && touched.bankName}
                                        errorMessage={errors.bankName}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="bankName"
                                            placeholder="Enter Bank Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>Branch Name<span style={{color: 'red'}}>{'*'}</span></p>}
                                        invalid={errors.bankBranchName && touched.bankBranchName}
                                        errorMessage={errors.bankBranchName}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="bankBranchName"
                                            placeholder="Enter Branch Name"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>IFSC Code<span style={{color: 'red'}}>{'*'}</span></p>}
                                        invalid={errors.ifscCode && touched.ifscCode}
                                        errorMessage={errors.ifscCode}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="ifscCode"
                                            placeholder="Enter IFSC Code"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem
                                        label={<p>MICR Code<span style={{color: 'red'}}>{'*'}</span></p>}
                                        invalid={errors.micrCode && touched.micrCode}
                                        errorMessage={errors.micrCode}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="micrCode"
                                            placeholder="Enter Code"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem label="Upload Cancelled Cheque">
                                        <Field name='uploadCancelledCheque'>
                                        {({field,form}) => (
                                        <div className="">
                                            <Upload beforeUpload={beforeUpload} draggable className='border-gray-200 w-[500] h-[0]' style={{ minHeight: "3rem"}}
                                                onChange={(updatedFiles, files, uploadRes, filesDetails) => {form.setFieldValue(field.name,uploadRes?.data?.fileUnqId)}}>
                                                <div className="my-10 text-center">
                                                    <p className="font-semibold">
                                                        <span className="text-gray-400 dark:text-white">{values.uploadCancelledCheque ? "File uploaded, " : 'No Files Uploaded, '}</span>
                                                        <span className="text-blue-700">Browse</span>
                                                    </p>
                                                </div>
                                            </Upload>
                                            {values.uploadCancelledCheque &&
                                            <div className="upload-file cursor-pointer h-12 w-120" >
                                                <div className="upload-file-info" onClick={() => onClickView(values.uploadCancelledCheque)}>
                                                    <h6 className="upload-file-name">{values.uploadCancelledCheque.substring(0, 15)}</h6>
                                                </div>
                                                <CloseButton className="upload-file-remove " onClick={() => {form.setFieldValue(field.name, '');}}/>
                                            </div>}
                                        </div>
                                        )}
                                        </Field>
                                    </FormItem>
                                </div>

                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
            <Dialog isOpen={showContent}
                    onClose={() => setShowContent(false)}>
                    <div className='p-5'>
                        <img src={`${appConfig.apiPrefix}/media/uniqid/${content}`} alt="Content" />
                        <Button onClick={() => window.open(`${appConfig.apiPrefix}/media/uniqid/${content}`, '_blank')} className='mt-2' variant='solid'>Download</Button>
                    </div>
            </Dialog>

        </>
    )
}

export default ProviderSettlementInfo
