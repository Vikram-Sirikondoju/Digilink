import {
    Input,
    FormItem,
    FormContainer,
    Checkbox,
    Dialog,
    Button
} from 'components/ui'
import { ErrorMessage, Field } from 'formik'
import { Upload } from 'components/ui'
import { useState } from 'react'
import { AdaptableCard } from 'components/shared'
import { OpenNotification } from 'views/Servicefile'
import * as Yup from 'yup'
import { apiUploadFiles } from 'services/OperatorsService'
import { useSelector } from 'react-redux'
import appConfig from 'configs/app.config'
import CloseButton from 'components/ui/CloseButton'

const saveFilesInOperator = 1
const OperatorSettlementInfo = ({ onChange, ...props }) => {
    // const [checkTrue, setCheckTrue] = useState(false)

    const { enterAccount, acc_user_id } = useSelector((state) => state.auth.user)
    const onCheck = (value, field, form) => {
        form.setFieldValue(field.name, value)
        //setCheckTrue(value);
    }

    const [showContent, setShowContent] = useState(false)
    const [content, setContent] = useState(null)

    const beforeUpload = async (newFiles, files) => {
        const file = newFiles[0];
        const allowedTypes = ['text/csv', 'application/xml'];

        if (!allowedTypes.includes(file.type)) {
            OpenNotification('warning', 'CSV/XML files are allowed only!');
            return false;
        }else{
            const ress = await apiUploadFiles(newFiles[0], acc_user_id, saveFilesInOperator)
            return ress
        }
    };


    const onClickView = (fileInfo) => {
        setShowContent(true)
        setContent(fileInfo)
    }

    const { errors, touched, values, setFieldValue } = props


    return (
        <>
            <h3 className="mx-4 mb-4 mt-2">BILLING SYSTEM INTEGRATION</h3>
            <FormContainer>
                <div className="md:grid grid-cols-4 gap-4 mx-4">
                    <FormItem
                        label="Contains Billing System"
                    >
                        <Field name="billing.sameCorrespondenceAddress">
                            {({ field, form }) => (
                                <Checkbox
                                    checked={values.sameCorrespondenceAddress}
                                    onChange={(val) =>
                                        onCheck(val, field, form, setFieldValue)
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                    <FormItem
                        label="Is Business Unit"
                    >
                        <Field name="billing.sameCorrespondenceAddress">
                            {({ field, form }) => (
                                <Checkbox
                                    
                                />
                            )}
                        </Field>
                    </FormItem>


                    {values.sameCorrespondenceAddress === true &&
                        <>    <FormItem
                            label={<p>End Point URL <span style={{ color: 'red' }}>{'*'}</span></p>}
                        // invalid={checkTrue && errors.accEndPointUrl && touched.accEndPointUrl}
                        // errorMessage={checkTrue ? errors.accEndPointUrl : null}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="billing.accEndPointUrl"
                                placeholder="Enter End Point URL"
                                component={Input}
                                validate = {async(v) => {
                                    if(values.sameCorrespondenceAddress){
                                        try{
                                            await Yup.string().required("Please enter end point url").validate(v)

                                        }catch(error){
                                            return error.message
                                        }
                                    }
                                }}
                            />
                            <ErrorMessage name= {`billing.accEndPointUrl`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>
                        </FormItem>

                            <FormItem
                                label="Upload CSV"

                            >
                                <Field name='billing.csvFileUrl'>
                                {({field,form}) => (
                                <div className="md:grid grid-cols-1 gap-3">
                                    <AdaptableCard>
                                        <div>
                                            <Upload beforeUpload={beforeUpload} draggable className='border-gray-200 w-[500] h-[0]' style={{ minHeight: "3rem" }}
                                                onChange={(updatedFiles, files, uploadRes, filesDetails) => {form.setFieldValue(field.name,uploadRes?.data?.fileUnqId)}}>
                                                <div className="my-10 text-center">
                                                    <p className="font-semibold">
                                                        <span className="text-gray-400 dark:text-white">{values.csvFileUrl ? "File uploaded, " : 'No Files Uploaded, '}</span>
                                                        <span className="text-blue-700">Browse</span>
                                                    </p>
                                                </div>
                                            </Upload>
                                        </div>
                                    </AdaptableCard>
                                    {values.csvFileUrl &&
                                    <div className="upload-file cursor-pointer h-12 w-120" >
                                        <div className="upload-file-info" onClick={() => onClickView(values.csvFileUrl)}>
                                            <h6 className="upload-file-name">{values.csvFileUrl.substring(0, 15)}</h6>
                                        </div>
                                        <CloseButton className="upload-file-remove " onClick={() => {form.setFieldValue(field.name, '');}}/>
                                    </div>}
                                </div>
                                )}
                                </Field>
                            </FormItem>
                        </>
                    }
                </div>

                {values.sameCorrespondenceAddress === true && <div className="md:grid grid-cols-4 gap-4 mx-4">
                    <FormItem
                        label={<p>SFTP Address or URL <span style={{ color: 'red' }}>{'*'}</span></p>}
                    //   invalid={checkTrue && errors.accSftpAdd && touched.accSftpAdd}
                    //     errorMessage={checkTrue ? errors.accSftpAdd : null}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="billing.accSftpAdd"
                            placeholder="Enter URL"
                            component={Input}
                            validate = {async(v) => {
                                if(values.sameCorrespondenceAddress){
                                    try{
                                        await Yup.string().required("Please enter SFTP address or url").validate(v)
                                    }catch(error){
                                        return error.message
                                    }
                                }
                            }}
                        />
                        <ErrorMessage name= {`billing.accSftpAdd`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>
                    </FormItem>
                    <FormItem
                        label={<p>Port Number <span style={{ color: 'red' }}>{'*'}</span></p>}
                    // invalid={checkTrue && errors.accPortNo && touched.accPortNo}
                    // errorMessage={checkTrue ? errors.accPortNo : null}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="billing.accPortNo"
                            placeholder="Enter Port Number"
                            component={Input}
                            validate = {async(v) => {
                                if(values.sameCorrespondenceAddress){
                                    try{
                                        await Yup.string().required("Please enter port number").validate(v)
                                    }catch(error){
                                        return error.message
                                    }
                                }
                            }}
                        />
                        <ErrorMessage name= {`billing.accPortNo`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>
                    </FormItem>
                    <FormItem
                        label={<p>User Name <span style={{ color: 'red' }}>{'*'}</span></p>}
                    // invalid={checkTrue && errors.accUsername && touched.accUsername}
                    // errorMessage={checkTrue ? errors.accUsername : null}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="billing.accUsername"
                            placeholder="Enter User Name"
                            component={Input}
                            validate = {async(v) => {
                                if(values.sameCorrespondenceAddress){
                                    try{
                                        await Yup.string().required("Please enter user name").validate(v)
                                    }catch(error){
                                        return error.message
                                    }
                                }
                            }}
                        />
                        <ErrorMessage name= {`billing.accUsername`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>
                    </FormItem>
                    <FormItem
                        label={<p>Password <span style={{ color: 'red' }}>{'*'}</span></p>}
                    // invalid={checkTrue && errors.accPassword && touched.accPassword}
                    // errorMessage={checkTrue ? errors.accPassword : null}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="billing.accPassword"
                            placeholder="Password"
                            component={Input}
                            validate = {async(v) => {
                                if(values.sameCorrespondenceAddress){
                                    try{
                                        await Yup.string().required("Please enter password").validate(v)
                                    }catch(error){
                                        return error.message
                                    }
                                }
                            }}
                        />
                        <ErrorMessage name= {`billing.accPassword`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>
                    </FormItem>
                </div>}
            </FormContainer>
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

export default OperatorSettlementInfo
