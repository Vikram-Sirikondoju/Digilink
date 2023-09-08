import {
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Upload,
    Dialog,
    Button,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { getContractType } from '../store/dataSlice'
import { apiUploadFiles } from 'services/ProvidersService'
import { OpenNotification } from 'views/Servicefile'
import appConfig from 'configs/app.config'
import CloseButton from 'components/ui/CloseButton'

export const statusOptions = [
    { label: 'Married', value: 'M' },
    { label: 'Widowed', value: 'W' },
    { label: 'Separated', value: 'S' },
    { label: 'Divorced', value: 'D' },
    { label: 'Single ', value: 'S' },
]
const genderOptions = [
    { label: 'Airtel Inc.', value: 0 },
    { label: 'Airtel Inc.', value: 1 },
    { label: 'Airtel India', value: 2 },
]

const contarctStatus = [
    { label: 'ACTIVE', value: 'ACTIVE' },
    { label: 'INACTIVE', value: 'IN_ACTIVE' },
    { label: 'PENDING APPROVAL', value: 'PENDING_APPROVAL' }
]

const userContractValidationSchema = Yup.object().shape({
    contractType: Yup.string().required('Please Select contract type').nullable(),
    signedDate: Yup.string().required('Please select signed date').nullable(),
    enforcementDate: Yup.string().required('Please select enforcement date').nullable(),
    terminationDate: Yup.string().required('Please select termination date').nullable(),
    contractStatus: Yup.string().required('Please select contract status').nullable(),
})
const saveFilesInProvContract = 1
const ProviderContractInfo = ({ onChange, refId, ...props }) => {
    const dispatch = useDispatch()
    const contractTypeList = useSelector((state) => state.providerList?.data?.contractTypeList)
    const dateFormat = useSelector((state) => state.locale.dateFormat)
    const {enterAccount, acc_user_id,rememberMe,usernameOrEmail
    } = useSelector(
     (state) => state.auth.user
 )
useEffect(() => {

    
    dispatch(getContractType({enterAccount}))

   

}, [dispatch])

const beforeUpload = async (newFiles, files) => {
    const file = newFiles[0];
    const allowedTypes = ['image/jpeg', 'image/png'];

    if (!allowedTypes.includes(file.type)) {
        OpenNotification('warning', 'JPG/PNG files are allowed only!')
      return false;
    } 
    try { 
        const ress = await apiUploadFiles(newFiles[0], acc_user_id, saveFilesInProvContract)
        return ress
    } catch (error) {
      console.error('Error during file upload:', error);
      return false;
    }
}
const [showContent, setShowContent] = useState(false)
const [content, setContent] = useState(null)
const onClickView = (fileInfo) => {
    setShowContent(true)
    setContent(fileInfo)
}
    return (
        <>

            <h3 className="mx-4 mb-4 mt-2">CONTRACT INFO</h3>

            <Formik
                innerRef={refId}
                initialValues={props.provideIntialValues.contractInfo}
                validationSchema={userContractValidationSchema}
                onSubmit={(values, { setSubmitting }) => {

                    setSubmitting(true)
                    let updatedPayload = { ...props.providerState, ...values }
                    let dataToStore = props.provideIntialValues
                    dataToStore.contractInfo = values
                    props.setProviderIntialValues(dataToStore)
                    props.setProviderState(updatedPayload)
                    props.setStep(props.step + 1)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <div className="md:grid grid-cols-4 gap-4 mx-4">
                                    <FormItem
                                       label={<p>Contract Type<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.contractType && touched.contractType}
                                        errorMessage={errors.contractType}
                                    >
                                        <Field name="contractType">
                                            {({ field, form }) => (
                                                <Select
                                                    // isDisabled={true}
                                                    placeholder="Select Contract Type,...."
                                                    field={field}
                                                    form={form}
                                                    options={contractTypeList}
                                                    value={contractTypeList?.filter(
                                                        (gender) =>
                                                            gender.value ===
                                                            values.contractType
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
                                    <FormItem label="File Upload">
                                        <Field name='contractFile'>
                                        {({field,form}) => (
                                        <div className="">
                                                <Upload beforeUpload={beforeUpload} draggable className='border-gray-200 w-[500] h-[0]' style={{ minHeight: "3rem"}}
                                                    onChange={(updatedFiles, files, uploadRes, filesDetails) => {form.setFieldValue(field.name,uploadRes?.data?.fileUnqId)}}>
                                                    <div className="my-10 text-center">
                                                        <p className="font-semibold">
                                                            <span className="text-gray-400 dark:text-white">{values.contractFile ? "File uploaded, " : 'No Files Uploaded, '}</span>
                                                            <span className="text-blue-700">Browse</span>
                                                        </p>
                                                    </div>
                                                </Upload>
                                            {values.contractFile &&
                                            <div className="upload-file cursor-pointer h-12 w-120" >
                                                <div className="upload-file-info" onClick={() => onClickView(values.contractFile)}>
                                                    <h6 className="upload-file-name">{values.contractFile.substring(0, 15)}</h6>
                                                </div>
                                                <CloseButton className="upload-file-remove " onClick={() => {form.setFieldValue(field.name, '');}}/>
                                            </div>}
                                        </div>
                                        )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        label={<p>Signed Date<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.signedDate && touched.signedDate}
                                        errorMessage={errors.signedDate}
                                    >
                                        <Field name="signedDate">
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
                                    </FormItem>
                                    <FormItem
                                        label={<p>Enforcement Date<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.enforcementDate && touched.enforcementDate}
                                        errorMessage={errors.enforcementDate}
                                    >
                                        <Field name="enforcementDate" >
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
                                    </FormItem>
                                    <FormItem
                                        label={<p>Termination date<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.terminationDate && touched.terminationDate}
                                        errorMessage={errors.terminationDate}
                                    >
                                        <Field name="terminationDate" >
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
                                    </FormItem>
                                    <FormItem
                                         label={<p>Contract Status<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={
                                            errors.contractStatus && touched.contractStatus
                                        }
                                        errorMessage={errors.contractStatus}
                                    >
                                        <Field name="contractStatus">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select Type"
                                                    field={field}
                                                    form={form}
                                                    options={contarctStatus}
                                                    value={contarctStatus.filter(
                                                        (contarctStatus) =>
                                                            contarctStatus.value ===
                                                            values.contractStatus
                                                    )}
                                                    onChange={(contarctStatus) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            contarctStatus.value
                                                        )
                                                    }
                                                />
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

export default ProviderContractInfo
