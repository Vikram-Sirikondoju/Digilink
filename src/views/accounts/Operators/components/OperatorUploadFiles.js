import React, { useEffect, useState } from 'react'
import {
    AdaptableCard,
} from 'components/shared'
import {
    FormItem,
    FormContainer,
    Input,
    Upload,
    Button,
    Dialog
} from 'components/ui'
import { Field, FieldArray, Formik, Form } from 'formik'
import { BsFillDashCircleFill, BsFillPlusCircleFill } from 'react-icons/bs'
import { apiUploadFiles } from 'services/OperatorsService'
import { useSelector } from 'react-redux'
import appConfig from 'configs/app.config'
import CloseButton from 'components/ui/CloseButton'

const saveFilesInAccounts = 1
const OperatorUploadFiles = ({ ...props }) => {
    const { errors, touched, values, setFieldValue } = props
    const { enterAccount, acc_user_id } = useSelector((state) => state.auth.user)
    const beforeUpload = async (newFiles, files) => {
        const ress = await apiUploadFiles(newFiles[0], acc_user_id, saveFilesInAccounts)
        return ress
    }
    console.log('valuesvalues',values,setFieldValue)
    console.log('valuesvalues',setFieldValue)
    const [showContent, setShowContent] = useState(false)
    const [content, setContent] = useState(null)
    const onClickView = (fileInfo) => {
        setShowContent(true)
        setContent(fileInfo)
    }
    return (
        <>
            <div className='py-5' style={{ backgroundColor: "#f5f5f5" }}>
                <div className="md:grid grid-cols-2 gap-4">
                    <AdaptableCard>
                        <h3 className="mb-4 mt-4 mx-4">UPLOAD FILES</h3>
                        <FormContainer>
                            <div className="md:grid grid-cols-2 gap-4 mx-4">
                                {values?.uploadFiles?.map((fil, i) => {
                                    let doc_type;
                                    try {
                                        doc_type = fil?.doc_type
                                    } catch (error) {
                                        console.error('Invalid JSON:', fil.doc_type);
                                    }
                                    return <FormItem
                                        label={<p>{fil?.doc_name} <span style={{ color: "red" }}>{doc_type?.is_mandatory ? '*' : ''}</span></p>}
                                        key={i}
                                    >
                                        <div className="md:grid grid-cols-1 gap-3">
                                            <AdaptableCard>
                                                <div>
                                                    <Upload
                                                        draggable
                                                        beforeUpload={beforeUpload}
                                                        onChange={(updatedFiles, files, uploadRes, filesDetails) => {
                                                            setFieldValue(`uploadFiles[${i}].file_url`, uploadRes?.data.fileUnqId);
                                                            setFieldValue(`uploadFiles[${i}].file_name`, uploadRes?.data.fileName);
                                                            setFieldValue(`uploadFiles[${i}].file_type`, "upload");
                                                            setFieldValue(`uploadFiles[${i}].doc_name`, fil?.doc_name);
                                                            setFieldValue(`uploadFiles[${i}].id`, fil?.id);
                                                        }
                                                        }

                                                        className='border-gray-200 w-[500] h-[0]' style={{ minHeight: '3rem' }} name={`uploadFiles[${i}].file_url`}>
                                                        <div className="my-10 text-center">
                                                            <p className="font-semibold">
                                                                <span className="text-gray-400 dark:text-white">
                                                                    {values.uploadFiles[i].file_url && 'File Uploaded' || "No Files Uploaded"} ,{' '}
                                                                </span>
                                                                <span className="text-blue-700">
                                                                    Browse
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </Upload>
                                                    {values.uploadFiles[i].file_url &&
                                                        <div className="upload-file" >
                                                            <div className="upload-file-info" onClick={() => onClickView(values.uploadFiles[i])}>
                                                                <h6 className="upload-file-name">{values.uploadFiles[i].file_name.substring(0, 15)}</h6>
                                                            </div>

                                                            <CloseButton
                                                                className="upload-file-remove "
                                                                onClick={() => {
                                                                    setFieldValue(`uploadFiles[${i}].file_url`, '');
                                                                    setFieldValue(`uploadFiles[${i}].file_name`, '');
                                                                    setFieldValue(`uploadFiles[${i}].file_type`, "upload");
                                                                    setFieldValue(`uploadFiles[${i}].doc_name`, fil?.doc_name);
                                                                }}
                                                            />
                                                        </div>}
                                                </div>
                                            </AdaptableCard>
                                        </div>
                                    </FormItem>
                                })}
                            </div>

                        </FormContainer>
                    </AdaptableCard>
                    <AdaptableCard>
                        <h3 className=" mb-4 mt-4 mx-4">ADDITIONAL FILES</h3>
                        <FormContainer>
                            <FieldArray name="additionalFiles">
                                {({ push, remove }) => (
                                    <>
                                        {values.additionalFiles && values.additionalFiles.map((file, index) => (
                                            <>
                                                <div className="md:grid grid-cols-2 gap-2 mx-4 my-1" key={index}>
                                                    <div>
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name={`additionalFiles[${index}].doc_name`}
                                                            placeholder="Enter Title"
                                                            component={Input}
                                                            // className="w-64"
                                                        />
                                                    </div>
                                                    <div className='grid grid-cols-1'>
                                                        <Upload
                                                            draggable
                                                            className="border-gray-200 w-[500] h-[0] px-6"
                                                            style={{ minHeight: "3rem" }}
                                                            beforeUpload={beforeUpload}
                                                            onChange={(updatedFiles, files, uploadRes, filesDetails) => {
                                                                setFieldValue(`additionalFiles[${index}].file_url`, uploadRes?.data?.fileUnqId);
                                                                setFieldValue(`additionalFiles[${index}].file_name`, uploadRes?.data?.fileName);
                                                                setFieldValue(`additionalFiles[${index}].file_type`, "additional");
                                                            }}
                                                        >
                                                            <div className="my-10 text-center">
                                                                <p className="font-semibold">
                                                                    <span className="text-gray-400 dark:text-white">
                                                                        {values.additionalFiles[index].file_name ? "File Uploaded" : "No Files Uploaded"} ,{' '}
                                                                    </span>
                                                                    <span className="text-blue-700">
                                                                        Browse
                                                                    </span>
                                                                </p>

                                                            </div>
                                                        </Upload>
                                                        {values.additionalFiles[index].file_url &&
                                                            <div className="upload-file truncate " >

                                                                <div className="upload-file-info" onClick={() => onClickView(values.additionalFiles[index])}>
                                                                    <h6 className="upload-file-name">{values.additionalFiles[index].file_name.substring(0, 15)}</h6>
                                                                </div>
                                                                <CloseButton
                                                                    className="upload-file-remove"
                                                                    onClick={() => {
                                                                        setFieldValue(`additionalFiles[${index}].file_url`, '');
                                                                        setFieldValue(`additionalFiles[${index}].file_name`, '');
                                                                        setFieldValue(`additionalFiles[${index}].file_type`, "additional");
                                                                    }}
                                                                />
                                                            </div>}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2">
                                                    <Button
                                                        variant="plain"
                                                        type="button"
                                                        className="font-bold m-2"
                                                        style={{ color: "#004D99" }}
                                                        icon={<BsFillPlusCircleFill fill="#004D99" />}
                                                        onClick={() => push({ file_name: "" })}
                                                    >
                                                        ADD FILE
                                                    </Button>
                                                    {
                                                        values ?.additionalFiles.length>1 && <Button
                                                        variant="plain"
                                                        type="button"
                                                        className="font-bold m-2"
                                                        style={{ color: "#FF0000" }}
                                                        // disabled={index === 0 ? true : false}

                                                        icon={<BsFillDashCircleFill fill="#FF0000" />}
                                                        onClick={() => remove(index)}
                                                         
                                                    >
                                                        DELETE FILE
                                                    </Button>
                                                    }

                                                   
                                                </div>
                                            </>
                                        ))}
                                    </>
                                )}
                            </FieldArray>
                        </FormContainer>


                    </AdaptableCard>
                    <Dialog isOpen={showContent}
                        onClose={() => setShowContent(false)}>
                        <div className='p-5'>
                            <img src={`${appConfig.apiPrefix}/media/uniqid/${content?.file_url}`} alt="Content" />
                            <Button onClick={() => window.open(`${appConfig.apiPrefix}/media/uniqid/${content?.file_url}`, '_blank')} className='mt-2' variant='solid'>Download</Button>
                        </div>

                    </Dialog>
                </div>
            </div>
        </>
    )
}
export default OperatorUploadFiles
