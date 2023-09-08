import { AdaptableCard, RichTextEditor } from 'components/shared'
import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Upload,
    Dialog,
} from 'components/ui'
import { HiMinus, HiPlus } from 'react-icons/hi'

import { Field, FieldArray, Form, Formik,ErrorMessage  } from 'formik'
import { cloneDeep } from 'lodash'
import { useEffect, useState } from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { MdDelete } from 'react-icons/md'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import appConfig from 'configs/app.config'
import { apiUploadFiles } from 'services/EnterpriseService'
import CloseButton from 'components/ui/CloseButton'
import { OpenNotification } from 'views/Servicefile'

const validationSchemaV = Yup.object().shape({
    itemVarients: Yup.array().of(
        Yup.object().shape({
            item_var_title: Yup.string().trim().required('Please enter variant title').nullable(),
            item_var_desc: Yup.string().trim().max(1000,"Description allowed 1000 characters only").required('Please enter varient descripttion').nullable(),
            var_def_price: Yup.string().trim().required('Please enter variant price').nullable(),
        })
    ),
})

const initialValues = {
    itemVarients: [{
        item_var_title: "",
        var_def_price: '',
        item_var_desc: "",
        img_url: "",
        media_url: '',
        tp_struc_info: "",
        srt_desc: "",
        dataPlanValidity: ""
    }]
}
const saveFilesInCatalog = 2
const ItemVariantDetails = ({ onChange, refId, ...props }) => {
    let dynamicFields = cloneDeep(props.itemIntials.itemVarients[0]?.emptyTempSections)

    const [selectedTempArr, setSelectedTempArr] = useState([])
    const [itemType, setItemType] = useState(props.itemIntials?.itemTemplate?.tempItemType)
    const { enterAccount, password, rememberMe, usernameOrEmail, user_type, acc_mno_parent_unq_id, acc_user_id } = useSelector(
        (state) => state.auth.user
    )
    const beforeUpload = async (newFiles, files) => {
        const ress = await apiUploadFiles(newFiles[0], acc_user_id, saveFilesInCatalog)
        return ress
    }

    const uploadTempField = async (newFiles, file, obj) => {
        let arr = []
        obj.fileType.map(e => {
            if (e.status === true) {
                arr.push(e.label)
            }
        })
        const trueStatusKeys = obj.fileType.filter(item => item.status === true).map(item => item.label);
        const concatenatedKeys = trueStatusKeys.join('/');
        let flag = false;
        if (newFiles[0]?.type?.includes('image')) {
            if (arr.includes("Image")) {
                flag = true
            }
        }
        else if (newFiles[0].type == "application/pdf") {
            if (arr.includes("Pdf")) {
                flag = true
            }
        }
        else if (newFiles[0].type == "video/mp4") {
            if (arr.includes("Video")) {
                flag = true
            }
        }
        else if (newFiles[0].type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || newFiles[0].type == "application/msword") {
            if (arr.includes("Document")) {
                flag = true
            }
        }
        else {
            OpenNotification("warning", "files is not supported")
        }
        if (flag) {
            const ress = await apiUploadFiles(newFiles[0], acc_user_id, saveFilesInCatalog)
            return ress
        } else {
            OpenNotification("warning", "files is not supported")
        }
    }
    const [showContent, setShowContent] = useState(false)
    const [content, setContent] = useState(null)
    const onClickView = (fileInfo) => {
        setShowContent(true)
        setContent(fileInfo)
    }

    // React.useEffect(() => {
    //     const dynamicValidationSchema = Yup.string().required('SOP file is required');

    //     attachValidationSchema('sopFileUrl', dynamicValidationSchema);
    //   }, []);
    // const templatesArr = useSelector((state) => state?.itemsCreateList?.data?.setTemplatesForItems)
    // const [stateInitialsValues, setInitialValues] = useState(initialValues)
    // const [optionalValues, setOptinalValues] = useState({})

    // useEffect(() => {
    //     if (templatesArr.length) {
    //         let a = templatesArr.find(e => e.id === props.itemIntials?.itemTemplate?.selectedTemplate)
    //         let selectedTemp = cloneDeep(a)
    //         let t = JSON.parse(selectedTemp.tp_struc)
    //         selectedTemp.tp_struc = t
    //         // setSelectedTempArr(selectedTemp)
    //         const initials = stateInitialsValues?.itemVarients
    //         const manipulateData = selectedTemp?.tp_struc?.map((vl) => {
    //             if (Array.isArray(vl?.sectionValues) && vl?.sectionValues?.length > 0) {
    //                 vl.sectionValues = vl?.sectionValues?.map((sec) => {
    //                     if (["DD", "CB", "RB"].includes(sec?.formType)) {
    //                         sec.options = [{ option: '' }]
    //                     }
    //                     return sec
    //                 })
    //             }
    //             return vl
    //         })
    //         initials[0].section = manipulateData
    //         setInitialValues((prev) => ({ ...prev, itemVarients: initials }))
    //         setOptinalValues(initials[0])
    //     }
    // }, [templatesArr])
    return (
        <>
            <Formik
                initialValues={props?.itemIntials}
                validationSchema={validationSchemaV}
                innerRef={refId}
                onSubmit={(values, { setSubmitting }) => {
                    let isUploadedImage = false
                    let isTemplateUploadedFiles = false
                    let isTemplateUploadedFilesArr = []
                    if (itemType === "P") {
                        values.itemVarients.map((e, i) => {
                            if (e.img_url !== "") {
                                isUploadedImage = true
                            } else {
                                isUploadedImage = false
                            }
                        })
                    } else {
                        isUploadedImage = true
                    }
                    values.itemVarients.map((e,i) => {
                        e.section.map((f,fi)=>{
                            f.sectionValues.map((g,gi)=>{
                                if(g.formType === "UF" && g.isMandatery === true){
                                    isTemplateUploadedFilesArr.push(g)
                                }
                            })
                        })
                    })
                    if(isTemplateUploadedFilesArr.length > 0){
                        isTemplateUploadedFiles = isTemplateUploadedFilesArr.every(e => e.fileUrl && e.fileUrl !== "")
                    }else{
                        isTemplateUploadedFiles=true;
                    }
                    if (isUploadedImage) {
                        if(isTemplateUploadedFiles){
                        setSubmitting(true)
                        let dataToStore = props.itemIntials
                        dataToStore.itemVarients = values.itemVarients
                        props.setItemInitials(dataToStore)
                        props.setStep(props.step + 1)
                        }else{
                            OpenNotification("warning","Please upload template files")
                        }
                    } else {
                        OpenNotification("warning", "Please upload image")
                    }
                }}
            >
                {({ values, touched, errors, isSubmitting, setFieldValue }) => {
                    return (
                        <>
                            <Form>
                                <FormContainer>
                                    <div style={{ backgroundColor: "#f5f5f5", padding: "20px 20px 0px 20px" }}>
                                        <FieldArray name='itemVarients'>
                                            {({ push: pushVarient, remove: removeVarient }) => (
                                                <>
                                                    {values?.itemVarients?.map((variant, variantIndex) => {
                                                        return (
                                                            <>
                                                                <AdaptableCard className="h-full p-5" bodyClass="h-full" >
                                                                    <div className="grid grid-cols-4 flex gap-4  ">
                                                                        <FormItem className="" label={<p>Variant Title<span style={{ color: "red" }}>*</span></p>}
                                                                            invalid={errors.item_var_title && touched.item_var_title}
                                                                            errorMessage={errors.item_var_title}
                                                                        >
                                                                            <Field type="text" autoComplete="off" placeholder="Enter Variant Title" component={Input}
                                                                                name={`itemVarients[${variantIndex}].item_var_title`}
                                                                            />
                                                                            <ErrorMessage name= {`itemVarients[${variantIndex}].item_var_title`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>
                                                                        </FormItem>
                                                                        {!(itemType === "S") &&
                                                                            <FormItem label={<p>Variant Price<span style={{ color: "red" }}>*</span></p>}
                                                                                invalid={errors.var_def_price && touched.var_def_price}
                                                                                errorMessage={errors.var_def_price}>
                                                                                <Field type="number" autoComplete="off" placeholder="Enter Variant Price" component={Input}
                                                                                    name={`itemVarients[${variantIndex}].var_def_price`} />
                                                                                <ErrorMessage name= {`itemVarients[${variantIndex}].var_def_price`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>
                                                                            </FormItem>}
                                                                        {(itemType === "D") &&
                                                                            <FormItem label={<p>Validity<span style={{ color: "red" }}>*</span></p>}
                                                                                invalid={errors.validity && touched.validity}
                                                                                errorMessage={errors.validity}>
                                                                                <Field type="number" autoComplete="off" placeholder="Enter Validity" component={Input}
                                                                                    name={`itemVarients[${variantIndex}].validity`}
                                                                                    validate={async (passedValue) => {
                                                                                        if (itemType === "D") {
                                                                                            try {
                                                                                                await Yup.string().required('Please Enter Valid Validity').validate(passedValue);
                                                                                            } catch (error) {
                                                                                                return error.message;
                                                                                            }
                                                                                        }
                                                                                    }}
                                                                                />
                                                                                <ErrorMessage name= {`itemVarients[${variantIndex}].validity`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>
                                                                            </FormItem>}
                                                                        {(itemType === "S") &&
                                                                            <FormItem label={<p>Monthly Price<span style={{ color: "red" }}>*</span></p>}
                                                                                invalid={errors.var_def_price && touched.var_def_price}
                                                                                errorMessage={errors.var_def_price}>
                                                                                <Field type="number" autoComplete="off" placeholder="Enter Variant Price" component={Input}
                                                                                    name={`itemVarients[${variantIndex}].var_def_price`} />
                                                                                <ErrorMessage name= {`itemVarients[${variantIndex}].var_def_price`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>
                                                                            </FormItem>}
                                                                    </div>
                                                                    <div style={{ width: "70%" }} className="pt-2">
                                                                        <FormItem label={<p>Variant Description<span style={{ color: "red" }}>*</span></p>}
                                                                            invalid={errors.item_var_desc && touched.item_var_desc}
                                                                            errorMessage={errors.item_var_desc}
                                                                        >
                                                                            <Field name={`itemVarients[${variantIndex}].item_var_desc`}  >
                                                                                {({ field, form }) => (
                                                                                    <RichTextEditor value={field.value}
                                                                                        onChange={(val) => form.setFieldValue(field.name, val)}
                                                                                    />
                                                                                )}
                                                                            </Field>
                                                                            <ErrorMessage name= {`itemVarients[${variantIndex}].item_var_desc`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>
                                                                        </FormItem>
                                                                    </div>
                                                                    {(itemType === "P") && <div className="md:grid grid-cols-1 gap-3">
                                                                        <AdaptableCard>
                                                                            <h6 className="mx-4 mb-4 mt-2">Upload Image<span style={{ color: "red" }}>*</span></h6>
                                                                            <FormItem label="">

                                                                                <Field name={`itemVarients[${variantIndex}].img_url`}>

                                                                                    {({ field, form }) => (

                                                                                        <div className='mx-4'>
                                                                                            <Upload beforeUpload={beforeUpload} draggable className='border-blue-500 bg-blue-50 w-96 h-36'
                                                                                                onChange={(updatedFiles, files, uploadRes, filesDetails) => {
                                                                                                    form.setFieldValue(`itemVarients[${variantIndex}].img_url`, uploadRes?.data?.fileUnqId);
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
                                                                                {values.itemVarients[variantIndex].img_url &&
                                                                                    <div className="upload-file cursor-pointer w-2/5" >
                                                                                        <div className="upload-file-info" onClick={() => onClickView(values.itemVarients[variantIndex].img_url)}>
                                                                                            <h6 className="upload-file-name">{values.itemVarients[variantIndex].img_url.substring(0, 15)}</h6>
                                                                                        </div>

                                                                                        <CloseButton
                                                                                            className="upload-file-remove "
                                                                                            onClick={() => {
                                                                                                setFieldValue(`itemVarients[${variantIndex}].img_url`, '');
                                                                                            }}
                                                                                        />
                                                                                    </div>}
                                                                            </FormItem>
                                                                        </AdaptableCard>
                                                                    </div>}
                                                                    <div>
                                                                        <FieldArray name={`itemVarients[${variantIndex}].section`}>
                                                                            {() => (
                                                                                <div>
                                                                                    {(values?.itemVarients[variantIndex]?.section?.tpStructInfo || values?.itemVarients[variantIndex]?.section).map((section, sectionIndex) => {
                                                                                        let copySection = section
                                                                                        return (
                                                                                            <div key={sectionIndex}>
                                                                                                <h5>{section?.sectionTitle.toUpperCase()}</h5>
                                                                                                {/* Render fields for section properties here */}
                                                                                                <FieldArray name={`itemVarients[${variantIndex}].section[${sectionIndex}].sectionValues`}>
                                                                                                    {() => (
                                                                                                        <div>
                                                                                                            {section?.sectionValues?.map((value, valueIndex) => (
                                                                                                                <div key={valueIndex}>
                                                                                                                    <>
                                                                                                                        <div className='grid grid-cols-2 mt-4'>
                                                                                                                            <div>
                                                                                                                                <h6> {value?.title.charAt(0).toUpperCase() + value?.title.slice(1)} <span style={{ color: "red" }}>{value?.isMandatery ? '*' : ''}</span></h6>
                                                                                                                                {value?.formType === 'TF' && (
                                                                                                                                    <FormItem>
                                                                                                                                        <Field
                                                                                                                                            type="text"
                                                                                                                                            autoComplete="off"
                                                                                                                                            //  errorMessage={errors.item_var_desc}
                                                                                                                                            name={`itemVarients[${variantIndex}].section[${sectionIndex}].sectionValues[${valueIndex}].value`}
                                                                                                                                            validate={async (passedValue) => {
                                                                                                                                                if (value?.isMandatery) {
                                                                                                                                                    try {
                                                                                                                                                        await Yup.string().required('Value is required').validate(passedValue);
                                                                                                                                                    } catch (error) {
                                                                                                                                                        return error.message;
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            }}
                                                                                                                                            placeholder="Enter Title"
                                                                                                                                            component={Input}

                                                                                                                                        />
                                                                                                                                        <ErrorMessage name= {`itemVarients[${variantIndex}].section[${sectionIndex}].sectionValues[${valueIndex}].value`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>
                                                                                                                                    </FormItem>)}
                                                                                                                                {value?.formType === 'TA' &&
                                                                                                                                    <FormItem >
                                                                                                                                        <Field type="text" autoComplete="off" maxLength={parseInt(value?.textAreaMaxLength)}
                                                                                                                                            // name={`itemVarients[${valueIndex}].dataPlan[${valueIndex}].item_plan_textarea`}
                                                                                                                                            name={`itemVarients[${variantIndex}].section[${sectionIndex}].sectionValues[${valueIndex}].value`}
                                                                                                                                            placeholder="Enter Value" component={Input}
                                                                                                                                            validate={async (passedValue) => {
                                                                                                                                                if (value?.isMandatery) {
                                                                                                                                                    try {
                                                                                                                                                        await Yup.string().required('Value is required').validate(passedValue);
                                                                                                                                                    } catch (error) {
                                                                                                                                                        return error.message;
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            }}
                                                                                                                                        />
                                                                                                                                        <ErrorMessage name= {`itemVarients[${variantIndex}].section[${sectionIndex}].sectionValues[${valueIndex}].value`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>
                                                                                                                                    </FormItem>
                                                                                                                                }
                                                                                                                                {['DD', 'CB', 'RB'].includes(value?.formType) &&
                                                                                                                                    <FieldArray name={`itemVarients[${variantIndex}].section[${sectionIndex}].sectionValues[${valueIndex}].options`}>
                                                                                                                                        {({ push: pushOption, remove: removeOption }) => (
                                                                                                                                            <div>
                                                                                                                                                {value?.options?.map((dropVal, dropIndex) => (
                                                                                                                                                    <div key={dropIndex}>
                                                                                                                                                        <div key={'id'} className='flex mt-4'>
                                                                                                                                                            {/* <h6 className='my-4 mr-2'>Option {dropIndex + 1}.</h6> */}
                                                                                                                                                            <FormItem className='w-80'>
                                                                                                                                                                <Field type="text" autoComplete="off"
                                                                                                                                                                    name={`itemVarients[${variantIndex}].section[${sectionIndex}].sectionValues[${valueIndex}].options[${dropIndex}].option`}
                                                                                                                                                                    placeholder={`option ${dropIndex + 1}`} component={Input}
                                                                                                                                                                    validate={async (passedValue) => {
                                                                                                                                                                        if (value?.isMandatery) {
                                                                                                                                                                            try {
                                                                                                                                                                                await Yup.string().required("Option is required").validate(passedValue)
                                                                                                                                                                            } catch (error) {
                                                                                                                                                                                return error.message;
                                                                                                                                                                            }
                                                                                                                                                                        }
                                                                                                                                                                    }}
                                                                                                                                                                />
                                                                                                                                                                <ErrorMessage name= {`itemVarients[${variantIndex}].section[${sectionIndex}].sectionValues[${valueIndex}].options[${dropIndex}].option`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>
                                                                                                                                                            </FormItem>
                                                                                                                                                            <div className='flex'>
                                                                                                                                                                <Button type='button' className='ml-4 border-cyan-500' shape="circle" size="md" icon={<HiPlus />}
                                                                                                                                                                    onClick={() => pushOption({
                                                                                                                                                                        "option": ""
                                                                                                                                                                    })}
                                                                                                                                                                />
                                                                                                                                                                {value?.options.length > 1 &&
                                                                                                                                                                    <Button className='ml-4 border-red-500'
                                                                                                                                                                        shape="circle"
                                                                                                                                                                        size="md"
                                                                                                                                                                        icon={<HiMinus />}
                                                                                                                                                                        onClick={() => removeOption(dropIndex)}
                                                                                                                                                                        type='button'
                                                                                                                                                                    />}

                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                    </div>
                                                                                                                                                ))}
                                                                                                                                            </div>
                                                                                                                                        )}
                                                                                                                                    </FieldArray>
                                                                                                                                }
                                                                                                                                {value?.formType === 'CK' &&
                                                                                                                                    <FormItem>
                                                                                                                                        <Field
                                                                                                                                            name={`itemVarients[${variantIndex}].section[${sectionIndex}].sectionValues[${valueIndex}].value`}
                                                                                                                                            validate={async (passedValue) => {
                                                                                                                                                if (value?.isMandatery) {
                                                                                                                                                    try {
                                                                                                                                                        await Yup.string().required('Value is required').validate(passedValue);
                                                                                                                                                    } catch (error) {
                                                                                                                                                        return error.message;
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            }}
                                                                                                                                        >
                                                                                                                                            {({ field, form }) => (
                                                                                                                                                <RichTextEditor
                                                                                                                                                    value={field.value}
                                                                                                                                                    onChange={(val) =>
                                                                                                                                                        form.setFieldValue(field.name, val)
                                                                                                                                                    }
                                                                                                                                                />
                                                                                                                                            )}
                                                                                                                                        </Field>
                                                                                                                                        <ErrorMessage name= {`itemVarients[${variantIndex}].section[${sectionIndex}].sectionValues[${valueIndex}].value`}>{errMsg => <div style={{color:"red"}}>{errMsg}</div>}</ErrorMessage>
                                                                                                                                    </FormItem>
                                                                                                                                }{value?.formType === 'UF' &&
                                                                                                                                    <FormItem>
                                                                                                                                        <Field name={`itemVarients[${variantIndex}].section[${sectionIndex}].sectionValues[${valueIndex}].fileUrl`}>
                                                                                                                                            {({ field, form }) => (
                                                                                                                                                <div className='mx-4 mt-4'>
                                                                                                                                                    <Upload beforeUpload={(e, i) => uploadTempField(e, i, values?.itemVarients[variantIndex]?.section[sectionIndex]?.sectionValues[valueIndex])} draggable className='border-gray-200 w-96 h-[0] mt-3' style={{ minHeight: '3rem' }}
                                                                                                                                                        onChange={(updatedFiles, files, uploadRes, filesDetails) => {
                                                                                                                                                            form.setFieldValue(`itemVarients[${variantIndex}].section[${sectionIndex}].sectionValues[${valueIndex}].fileUrl`, uploadRes?.data?.fileUnqId);
                                                                                                                                                        }}>
                                                                                                                                                        <div className="my-10 text-center">
                                                                                                                                                            <div className="my-10 text-center">
                                                                                                                                                                <p className="font-semibold">
                                                                                                                                                                    <span className="text-gray-400 dark:text-white">{values?.itemVarients[variantIndex]?.section[sectionIndex]?.sectionValues[valueIndex]?.fileUrl && 'File Uploaded' || "No Files Uploaded"} ,{' '}</span>
                                                                                                                                                                    <span className="text-blue-700">Browse</span>
                                                                                                                                                                </p>
                                                                                                                                                            </div>
                                                                                                                                                        </div>
                                                                                                                                                    </Upload>
                                                                                                                                                    <div className='flex'>
                                                                                                                                                    <p>{'Allowed files'} {':'}</p>
                                                                                                                                                    <div className='flex'>
                                                                                                                                                        {
                                                                                                                                                            values?.itemVarients[variantIndex]?.section[sectionIndex]?.sectionValues[valueIndex]?.fileType.map((f) => {
                                                                                                                                                                if (f?.status == true) {
                                                                                                                                                                    return (<p>{f?.label}{'     ,'}</p>)
                                                                                                                                                                }
                                                                                                                                                            })
                                                                                                                                                        }
                                                                                                                                                    </div>
                                                                                                                                                    </div>
                                                                                                                                                   

                                                                                                                                                </div>
                                                                                                                                            )}
                                                                                                                                        </Field>
                                                                                                                                        {values?.itemVarients[variantIndex]?.section[sectionIndex]?.sectionValues[valueIndex]?.fileUrl &&
                                                                                                                                            <div className="upload-file cursor-pointer h-12 w-96 ml-4" >
                                                                                                                                                <div className="upload-file-info" onClick={() => onClickView(values?.itemVarients[variantIndex]?.section[sectionIndex]?.sectionValues[valueIndex]?.fileUrl)}>
                                                                                                                                                    <h6 className="upload-file-name">{values?.itemVarients[variantIndex]?.section[sectionIndex]?.sectionValues[valueIndex]?.fileUrl.substring(0, 15)}</h6>
                                                                                                                                                </div>
                                                                                                                                                <CloseButton className="upload-file-remove "
                                                                                                                                                    onClick={() => { setFieldValue(`itemVarients[${variantIndex}].section[${sectionIndex}].sectionValues[${valueIndex}].fileUrl`, ''); }}
                                                                                                                                                />
                                                                                                                                            </div>}
                                                                                                                                    </FormItem>}
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </>
                                                                                                                </div>
                                                                                                            ))}
                                                                                                        </div>
                                                                                                    )}
                                                                                                </FieldArray>
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                        </FieldArray>
                                                                    </div>

                                                                </AdaptableCard>
                                                                <div className="mx-4 mt-4 flex justify-end">
                                                                    <Button type='button' variant="plain" size="sm" className="font-bold-800 mb-4" style={{ color: '#004D99' }}
                                                                        icon={<BsFillPlusCircleFill fill="#004D99" />}
                                                                        onClick={() => pushVarient({
                                                                            item_var_title: "", var_def_price: '', item_var_desc: "", img_url: "", media_url: '',
                                                                            tp_struc_info: "", srt_desc: "", dataPlanValidity: "", section: dynamicFields
                                                                        })}
                                                                    >
                                                                        ADD NEW VARIANT
                                                                    </Button>
                                                                    {values?.itemVarients.length > 1 &&
                                                                        <Button type='button' variant="plain" size="sm" className="font-bold-800" style={{ color: '#FF0000' }}
                                                                            icon={<MdDelete fill="#FF0000" />}
                                                                            onClick={() => removeVarient(variantIndex)}
                                                                        >
                                                                            DELETE
                                                                        </Button>}
                                                                </div>
                                                            </>
                                                        )
                                                    })}
                                                </>
                                            )}
                                        </FieldArray>
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
                        </>
                    )
                }}
            </Formik>
        </>
    )
}

export default ItemVariantDetails