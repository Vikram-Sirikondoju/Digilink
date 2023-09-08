import { RichTextEditor } from 'components/shared'
import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Upload,
    Card,
    Dialog,
} from 'components/ui'
import { Field, FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
import TaxComponents from './TaxComponents'
import { HiMinus, HiOutlineCloudUpload, HiPlus } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { useMemo, useState } from 'react'
import { apiUploadFiles } from 'services/ProvidersService'
import CloseButton from 'components/ui/CloseButton'
import appConfig from 'configs/app.config'
import { cloneDeep } from 'lodash'
import { OpenNotification } from 'views/Servicefile'
export const statusOptions = [
    { label: 'Married', value: 'M' },
    { label: 'Widowed', value: 'W' },
    { label: 'Separated', value: 'S' },
    { label: 'Divorced', value: 'D' },
    { label: 'Single ', value: 'S' },
]
const genderOptions = [
    { label: 'Airtel Inc.', value: 'M' },
    { label: 'Airtel Inc.', value: 'F' },
    { label: 'Airtel India', value: 'O' },
]

const itemTypeOptions = [
    { label: 'Item', value: '1' },
    { label: 'Date Plan', value: '2' },
    { label: 'Service Plan', value: '3' },
]

const taxComponentsOptions = [
    { label: 'Tax 1', value: '1' },
    { label: 'Tax 2', value: '2' },
    { label: 'Tax 3', value: '3' },
]

const InitValues = {
    itemType: '',
    itemTitle: '',
}

const validationSchemaB = Yup.object().shape({
    itemDesc: Yup.string().trim().max(1000,"Description allowed 1000 characters only").required('Please enter item description'),
    itemTitle: Yup.string().trim().required('Please Enter Valid Item Title'),
    taxData : Yup.array().of(
        Yup.object().shape({
            taxComponents : Yup.string().trim().required('Please select tax component'),
            taxAmount : Yup.string().trim().required('Please enter  tax value'),
        })
    ),
})
const saveFilesInCatalog = 2
const ItemBasicDetails = ({ onChange, refId, ...props }) => {
    const itemsTaxComponents = useSelector((state) => state?.itemsCreateList?.data?.setTemplateComponents)
    const itemMemoTaxComponentOptiosn = useMemo(() => {
        if (Array.isArray(itemsTaxComponents) && itemsTaxComponents.length > 0) {
            return itemsTaxComponents?.map((vl) => {
                return { ...vl, value: vl?.tax_comp_title, label: vl?.tax_comp_title }
            })
        }
    }, [itemsTaxComponents?.length])
    const { enterAccount, password, rememberMe, usernameOrEmail, user_type, acc_mno_parent_unq_id, acc_user_id } = useSelector(
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

    const setTaxDrpdown = (values,form,field,label,i) => {
        let flag = values?.taxData?.some(item => item.taxComponents === label.id)
        if(!flag){
         form.setFieldValue(field.name, label.id)
         form.setFieldValue(`taxData[${i}].taxType`, label.tax_comp_ded_type)
        }
    }


    return (



        <Formik
            initialValues={props.itemIntials.itemBasicDetails}
            validationSchema={validationSchemaB}
            innerRef={refId}
            onSubmit={(values, { setSubmitting }) => {
                if(!values.uploadImageUrl){
                    OpenNotification("warning","Please upload required fields")
                }else{
                    setSubmitting(true)
                    let dataToStore = props.itemIntials
                    dataToStore.itemBasicDetails = values
                    props.setItemInitials(dataToStore)
                    props.setStep(props.step + 1)
                }
            }}
        >
            {({ values, touched, errors, isSubmitting, setFieldValue }) => {
                return (
                    <Form>
                        <FormContainer>
                            <div className='p-2'>
                                <h3 className="mx-4 mb-4 mt-2">BASIC DETAILS</h3>
                                <div className="md:grid grid-cols-4 gap-4 mx-4">
                                    <FormItem label={<p>Item Title<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.itemTitle && touched.itemTitle}
                                        errorMessage={errors.itemTitle}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="itemTitle"
                                            placeholder="Enter Item Title"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <div className="mx-4 my-4">
                                    <FormItem label={<p>Item Description<span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.itemDesc && touched.itemDesc}
                                        errorMessage={errors.itemDesc}
                                    >
                                        <Field name="itemDesc">
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
                                <div className="md:grid grid-cols-2">
                                    <div className='mx-4 w-500'>
                                        <h6 className="mx-4 mb-4 mt-2">Sop File Uploads</h6>

                                        <FormItem label="">

                                            <Field name="sopFileUrl">
                                                {({ field, form }) => (
                                                    <div className='mx-4'>
                                                        <Upload beforeUpload={beforeUpload} draggable className='border-blue-500 bg-blue-50 w-96 h-36'
                                                            onChange={(updatedFiles, files, uploadRes, filesDetails) => {
                                                                setFieldValue(`sopFileUrl`, uploadRes?.data?.fileUnqId);
                                                            }
                                                            }
                                                        >
                                                            <div className="my-10 text-center">
                                                                <div className="text-6xl mb-4 flex justify-center">
                                                                    <HiOutlineCloudUpload className="h-10" style={{ color: "#2563eb" }} />
                                                                </div>
                                                                <p className="font-semibold">
                                                                    <span className="text-gray-800 dark:text-white">
                                                                        Upload Files Here or{' '}
                                                                    </span>
                                                                    <span className="text-blue-500">
                                                                        browse
                                                                    </span>
                                                                </p>
                                                                <p className="mt-1 opacity-60 dark:text-white">
                                                                    JPG/PNG are allowed
                                                                </p>
                                                            </div>
                                                        </Upload>
                                                    </div>
                                                )}
                                            </Field>
                                            {values?.sopFileUrl &&
                                                <div className="upload-file cursor-pointer" >
                                                    <div className="upload-file-info" onClick={() => onClickView(values?.sopFileUrl)}>
                                                        <h6 className="upload-file-name">{values?.sopFileUrl.substring(0, 15)}</h6>
                                                    </div>

                                                    <CloseButton
                                                        className="upload-file-remove "
                                                        onClick={() => {
                                                            setFieldValue(`sopFileUrl`, '');
                                                        }}
                                                    />
                                                </div>}
                                        </FormItem>
                                    </div>


                                    <div className='mx-4 w-500'>
                                        <h6 className="mx-4 mb-4 mt-2">Upload Image<span style={{ color: 'red' }}>{'*'}</span></h6>
                                        <FormItem label="">

                                            <Field name="uploadImageUrl">
                                                {({ field, form }) => (
                                                    <div className='mx-4'>
                                                        <Upload beforeUpload={beforeUpload} draggable className='border-blue-500 bg-blue-50 w-96 h-36'
                                                            onChange={(updatedFiles, files, uploadRes, filesDetails) => {
                                                                setFieldValue(`uploadImageUrl`, uploadRes?.data?.fileUnqId);
                                                            }
                                                            }
                                                        >
                                                            <div className="my-10 text-center">
                                                                <div className="text-6xl mb-4 flex justify-center">
                                                                    <HiOutlineCloudUpload className="h-10" style={{ color: "#2563eb" }} />
                                                                </div>
                                                                <p className="font-semibold">
                                                                    <span className="text-gray-800 dark:text-white">
                                                                        Upload Files Here or{' '}
                                                                    </span>
                                                                    <span className="text-blue-500">
                                                                        browse
                                                                    </span>
                                                                </p>
                                                                <p className="mt-1 opacity-60 dark:text-white">
                                                                    JPG/PNG are allowed
                                                                </p>
                                                            </div>
                                                        </Upload>
                                                    </div>
                                                )}
                                            </Field>
                                            {values?.uploadImageUrl &&
                                                <div className="upload-file cursor-pointer" >
                                                    <div className="upload-file-info" onClick={() => onClickView(values?.uploadImageUrl)}>
                                                        <h6 className="upload-file-name">{values?.uploadImageUrl.substring(0, 15)}</h6>
                                                    </div>

                                                    <CloseButton
                                                        className="upload-file-remove "
                                                        onClick={() => {
                                                            setFieldValue(`uploadImageUrl`, '');
                                                        }}
                                                    />
                                                </div>}
                                        </FormItem>
                                    </div>
                                </div>

                                <Card className="bg-zinc-100 m-4">
                                    <Card>
                                        <h6 className="mx-4 mb-4 mt-2">TAX COMPONENTS</h6>
                                        <FieldArray name="taxData">
                                            {({ push: pushSection, remove: removeSection }) => (
                                                <div>
                                                    {values?.taxData?.map((item, i) => {
                                                        return (
                                                            <>
                                                                <div className="md:grid grid-cols-4 gap-4 mx-4">
                                                                    <FormItem 
                                                                        label={<p>Tax Components<span style={{ color: 'red' }}>{'*'}</span></p>}
                                                                        invalid={errors.taxComponents && touched.taxComponents}
                                                                        errorMessage={errors.taxComponents}
                                                                    >
                                                                        <Field name={`taxData[${i}].taxComponents`}>
                                                                            {({ field, form }) => (
                                                                                <Select
                                                                                    placeholder="Select Tax Component"
                                                                                    field={field}
                                                                                    form={form}
                                                                                    options={itemMemoTaxComponentOptiosn}
                                                                                    value={itemMemoTaxComponentOptiosn?.filter((label) => label.id === item.taxComponents)}
                                                                                    onChange={(label) => setTaxDrpdown(values,form,field,label,i)}
                                                                                />
                                                                            )}
                                                                        </Field>
                                                                        {touched.taxData && touched.taxData[i] && errors.taxData && errors.taxData[i]?.taxComponents && (
                                                                            <div style={{color:"red"}}>{errors.taxData[i]?.taxComponents}</div>)}
                                                                    </FormItem>
                                                                    <FormItem
                                                                        label={<p>Type</p>}
                                                                        invalid={errors.taxType && touched.taxType}
                                                                        errorMessage={errors.taxType}
                                                                    >
                                                                        <Field disabled
                                                                            type="text"
                                                                            autoComplete="off"
                                                                            name={`taxData[${i}].taxType`} placeholder=""
                                                                            component={Input}
                                                                        />
                                                                        {touched.taxData && touched.taxData[i] && errors.taxData && errors.taxData[i]?.taxType && (
                                                                            <div style={{color:"red"}}>{errors.taxData[i]?.taxType}</div>)}
                                                                    </FormItem>
                                                                    <FormItem 
                                                                        label={<p>Tax Value<span style={{ color: 'red' }}>{'*'}</span></p>}
                                                                        invalid={errors.taxAmount && touched.taxAmount}
                                                                        errorMessage={errors.taxAmount}
                                                                    >
                                                                        <Field
                                                                            type="number"
                                                                            autoComplete="off"
                                                                            name={`taxData[${i}].taxAmount`} placeholder="Enter Tax Value"
                                                                            component={Input}
                                                                        />
                                                                        {touched.taxData && touched.taxData[i] && errors.taxData && errors.taxData[i]?.taxAmount && (
                                                                            <div style={{color:"red"}}>{errors.taxData[i]?.taxAmount}</div>)}
                                                                    </FormItem>
                                                                    <div className='mt-8'>

                                                                        <Button className=' border-cyan-500'
                                                                            // disabled
                                                                            shape="circle"
                                                                            size="md"
                                                                            icon={<HiPlus />}
                                                                            onClick={() => pushSection({
                                                                                taxComponents: '',
                                                                                taxAmount: '',taxType : ""
                                                                            })}
                                                                            type='button'
                                                                        />

                                                                        {values?.taxData.length > 1 && <Button className='mx-4  border-red-500'
                                                                            // disabled
                                                                            shape="circle"
                                                                            size="md"
                                                                            icon={<HiMinus />}
                                                                            onClick={() => removeSection(i)}
                                                                            type='button'
                                                                        />}
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </FieldArray>

                                    </Card>
                                </Card>
                            </div>
                        </FormContainer>
                        <Dialog isOpen={showContent}
                            onClose={() => setShowContent(false)}>
                            <div className='p-5'>
                                <img src={`${appConfig.apiPrefix}/media/uniqid/${content}`} alt="Content" />
                                <Button onClick={() => window.open(`${appConfig.apiPrefix}/media/uniqid/${content}`, '_blank')} className='mt-2' variant='solid'>Download</Button>
                            </div>

                        </Dialog>
                    </Form>
                )
            }}
        </Formik>

    )
}

export default ItemBasicDetails
