import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Upload
} from 'components/ui'
import CloseButton from 'components/ui/CloseButton';
import { Field, Form, Formik } from 'formik'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { apiUploadFiles } from 'services/EnterpriseService';
import { OpenNotification } from 'views/Servicefile';
import * as Yup from "yup";

export const statusOptions = [
    { label: 'Married', value: 'M' },
    { label: 'Widowed', value: 'W' },
    { label: 'Separated', value: 'S' },
    { label: 'Divorced', value: 'D' },
    { label: 'Single ', value: 'S' },
]
const genderOptions = [
    { label: 'Super Admin', value: 1 },
    { label: 'User.', value: 2 },
    { label: 'Admin', value: 3 },
]

const contarctStatus = [
    { label: 'ACTIVE', value: 'ACTIVE' },
    { label: 'IN_ACTIVE', value: 'IN_ACTIVE' },
    { label: 'PENDING_APPROVAL', value: 'PENDING_APPROVAL' }
]

const enterpriseUserContractInitValues = {
    contractType: "",
    signedDate: "",
    enforceDate: "",
    terminateDate: "",
    status: "",

}


const enterpriseValidationSchema = Yup.object().shape({

    contractType: Yup.string().required('Please enter contractType').nullable(),
    signedDate: Yup.string().required('Please select signed date').nullable(),
    enforceDate: Yup.string().required('Please select enforcement date').nullable(),
    terminateDate: Yup.string().required('Please select terminate date').nullable(),
    status: Yup.string().required('Please enter status').nullable(),


})

const saveFilesInCatalog = 1

const EnterpriseMasterAccountInfo = ({ onChange, refId, ...props }) => {

    const { setFieldValue } = props
    const { acc_user_id } = useSelector((state) => state.auth.user)
    const dateFormat = useSelector((state) => state.locale.dateFormat)

    const beforeUpload = async (newFiles, files) => {
        // const ress = await apiUploadFiles(newFiles[0], acc_user_id, saveFilesInAccounts)
        // return ress
        const file = newFiles[0];
        const allowedTypes = ['image/jpeg', 'image/png'];

        if (!allowedTypes.includes(file.type)) {
            OpenNotification('warning', 'JPG/PNG files are allowed only!')
            return false;
        }
        try {
            const ress = await apiUploadFiles(newFiles[0], acc_user_id, saveFilesInCatalog)
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

    const contractTypeList = useSelector((state) => state.enterpriseList?.data?.contractTypeList)

    console.log('contractTypeList',contractTypeList)
    return (
        <>

            <h3 className="mx-4 mb-4 mt-2">CONTRACT INFO</h3>

            <Formik
                innerRef={refId}
                initialValues={props.enterpriseState.userContact}
                validationSchema={enterpriseValidationSchema}
                onSubmit={(values, { setSubmitting }) => {


                    setSubmitting(true)
                    let updatedPayload = { ...props.enterpriseState, ...values }
                    props.setEnterpriseState(updatedPayload)
                    let dataToStore = props.EpIntialValues
                    dataToStore.userContact = values
                    props.setEpIntialValues(dataToStore)
                    props.setStep(props.step + 1)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>


                                <div className="md:grid grid-cols-4 gap-4 mx-4">
                                    <FormItem label={<p>Contract Type<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={
                                            errors.contractType && touched.contractType
                                        }
                                        errorMessage={errors.contractType}
                                    >
                                        <Field name="contractType">
                                            {({ field, form }) => (
                                                <Select
                                                    // isDisabled={true}
                                                    placeholder="Select Type"
                                                    field={field}
                                                    form={form}
                                                    options={contractTypeList}
                                                    value={contractTypeList?.filter(
                                                        (gender) =>
                                                            gender.value ===
                                                            values?.contractType
                                                    )}
                                                    onChange={(gender) =>
                                                        form.setFieldValue(
                                                            field?.name,
                                                            gender?.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        label={<p>File Upload<span style={{ color: 'red' }}>{'*'}</span></p>}
                                    >
                                        <Field name="imageFile">
                                            {({ field, form }) => (
                                                <div>
                                                    <Upload draggable
                                                        beforeUpload={beforeUpload}
                                                        onChange={(updatedFiles, files, uploadRes, filesDetails) => {
                                                            form.setFieldValue(field?.name, uploadRes?.data?.fileUnqId);
                                                        }}

                                                        className='border-gray-200 w-[500] h-[0]' style={{ minHeight: '3rem' }}
                                                    >
                                                        <div className="my-10 text-center">
                                                            <p className="font-semibold">
                                                                <span className="text-gray-400 dark:text-white">{values?.imageFile ? "File uploaded, " : 'No Files Uploaded, '}</span>

                                                                <span className="text-blue-700">
                                                                    Browse
                                                                </span>
                                                            </p>

                                                        </div>
                                                    </Upload>
                                                    {values.imageFile &&
                                                        <div className="upload-file cursor-pointer h-12 w-120" >
                                                            <div className="upload-file-info" onClick={() => onClickView(values.imageFile)}>
                                                                <h6 className="upload-file-name">{values?.imageFile.substring(0, 15)}</h6>
                                                            </div>
                                                            <CloseButton className="upload-file-remove " onClick={() => { form.setFieldValue(field.name, ''); }} />
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
                                        <Field name="signedDate" placeholder="Select Date">
                                            {({ field, form }) => (
                                                <DatePicker
                                                    field={field}
                                                    form={form}
                                                    value={field.value}
                                                    placeholder="Select Date"
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
                                        invalid={errors.enforceDate && touched.enforceDate}
                                        errorMessage={errors.enforceDate}
                                    >
                                        <Field name="enforceDate" placeholder="Select Date">
                                            {({ field, form }) => (
                                                <DatePicker
                                                    field={field}
                                                    form={form}
                                                    placeholder="Select Date"
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
                                        invalid={errors.terminateDate && touched.terminateDate}
                                        errorMessage={errors.terminateDate}
                                    >
                                        <Field name="terminateDate" placeholder="Select Date">
                                            {({ field, form }) => (
                                                <DatePicker
                                                    field={field}
                                                    form={form}
                                                    value={field.value}
                                                    placeholder="Select Date"
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
                                            errors.status && touched.status
                                        }
                                        errorMessage={errors.status}
                                    >
                                        <Field name="status">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder="Select Type"
                                                    field={field}
                                                    form={form}
                                                    options={contarctStatus}
                                                    value={contarctStatus.filter(
                                                        (gender) =>
                                                            gender.value ===
                                                            values.status
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
                                </div>


                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>


        </>
    )
}

export default EnterpriseMasterAccountInfo
