import { AdaptableCard } from 'components/shared'
import {
    Button,
    Checkbox,
    FormContainer,
    FormItem,
    Input,
    Select,
    Radio,
    Upload,
} from 'components/ui'
import { Field, FieldArray, Form, Formik } from 'formik'
import React from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { HiMinus, HiOutlineCloudUpload, HiPlus } from 'react-icons/hi'
import RichTextEditor from 'components/shared/RichTextEditor'
import { MdDelete } from 'react-icons/md'
import * as yup from "yup";

const formFieldsType = [
    { label: 'Text Field', value: 'TF' },
    { label: 'Text Area', value: 'TA' },
    { label: 'Drop Down', value: 'DD' },
    { label: 'Radio Button', value: 'RB' },
    { label: 'Check Boxes', value: 'CB' },
    { label: 'CK Editor', value: 'CK' },
    { label: 'Upload File', value: 'UF' },
]

const fileSizeOptions = [
    { label: '5 MB', value: '5' },
    { label: '10 MB', value: '10' },
    { label: '15 MB', value: '15' },
    { label: '20 MB', value: '20' },
    { label: '25 MB', value: '25' },

]


const formInitValues = {
    initialValues: [{
        sectionTitle: '',
        sectionValues: [{
            title: '',
            formType: '',
            isMandatery: false,
            textAreaMaxLength: '',
            // dropdownOptions: [{ option: '' }],
            // radioBtnOptions: [{ option: '' }],
            // checkBoxOptions: [{ option: '' }],
            // textEditor: '',
            // maxFileSize: '',
            // fileType: [
            //     { label: 'Document', status: false },
            //     { label: 'Image', status: false },
            //     { label: 'Pdf', status: false },
            //     { label: 'Video', status: false }
            // ]
        }]
    }]
}

const handleValidation = yup.object().shape({
    initialValues: yup.array().of(
        yup.object().shape({
            sectionTitle: yup.string().required("Section Title is required"),
            title: yup.string().required("Title is required"),
            formType: yup.string().required("FormType is required")
        })
    )
});

const TemplateCreation = (props) => {



    const onChangeFieldType = (field, form, type, setFieldValue, i, fi, values) => {
        form.setFieldValue(field.name, type.value);

        const sectionValues = values.initialValues[i].sectionValues[fi];

        // sectionValues.dropdownOptions = [{ option: '' }];
        // sectionValues.checkBoxOptions = [{ option: '' }];
        // sectionValues.radioBtnOptions = [{ option: '' }];
        // sectionValues.fileType.forEach(e => e.status = false);
        sectionValues.textAreaMaxLength = '';
        // sectionValues.maxFileSize = '';
        // sectionValues.textEditor = '';
    };

    const { errors, touched, values, setFieldValue } = props
    console.log(props, "props", values)
    console.log(values.tempDetails
        .type)
    return (
        <>
            <AdaptableCard className="h-full pb-1" bodyClass="h-full">
                <h3 className="mb-4 mt-2">Template Creation</h3>
            </AdaptableCard>
            <div className="bg-gray-100 py-1">
                {values?.tempDetails?.type === 'P' ? <FormContainer>
                    <div style={{ backgroundColor: "#f5f5f5", padding: "20px 20px" }}>
                        <div className='card p-5'>
                            <div className=" flex gap-4  ">
                                <FormItem className="w-96 " label="Variant Title"
                                    invalid={errors.itemTitle && touched.itemTitle}
                                    errorMessage={errors.itemTitle}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="itemTitle"
                                        placeholder="Enter Variant Title"
                                        component={Input}
                                        disabled
                                    />
                                </FormItem>

                                <FormItem className="w-96  " label="Variant Price"
                                    invalid={errors.itemActualPrice && touched.itemActualPrice}
                                    errorMessage={errors.itemActualPrice}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="itemActualPrice"
                                        placeholder="Enter Variant Price"
                                        component={Input}
                                        disabled
                                    />
                                </FormItem>

                            </div>
                            <div style={{ width: "70%" }} className="pt-2">

                                <FormItem label="Variant Description"
                                    invalid={errors.variantDesc && touched.variantDesc}
                                    errorMessage={errors.variantDesc}
                                >


                                    <Field className=" h-28"
                                        type="text"
                                        autoComplete="off"
                                        name="shortDescription"
                                        placeholder=""
                                        component={Input}
                                        disabled
                                    />
                                </FormItem>
                                <Upload draggable  className='border-blue-500 bg-blue-50 w-96 h-36'
                                    disabled
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
                        </div>
                    </div>
                </FormContainer> : null}

                {values?.tempDetails?.type === 'D' ? <FormContainer>
                    <div style={{ backgroundColor: "#f5f5f5", padding: "20px 20px" }}>
                        <div className='card p-5'>
                            <div className=" grid grid-cols-4 gap-4  ">
                                <FormItem className=" border-" label="Variant Title"
                                    invalid={errors.variantTitleTwo && touched.variantTitleTwo}
                                    errorMessage={errors.variantTitleTwo}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="variantTitleTwo"
                                        placeholder="Enter Variant Title"
                                        component={Input}
                                        disabled
                                    />
                                </FormItem>

                                <FormItem label="Variant Price"
                                    invalid={errors.variantPriceTwo && touched.variantPriceTwo}
                                    errorMessage={errors.variantPriceTwo}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="variantPriceTwo"
                                        placeholder="Enter Price"
                                        component={Input}
                                        disabled
                                    />
                                </FormItem>

                                <FormItem label="Validity"
                                    invalid={errors.validity && touched.validity}
                                    errorMessage={errors.validity}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="validity"
                                        placeholder="Enter Validity"
                                        component={Input}
                                        disabled
                                    />
                                </FormItem>

                            </div>
                            <div style={{ width: "70%" }} className="">
                                <FormItem label="Feature list"
                                    invalid={errors.variantFeatureDesc && touched.variantFeatureDesc}
                                    errorMessage={errors.variantFeatureDesc}
                                >
                                    <Field name="variantFeatureDesc" >
                                        {({ field, form }) => (
                                            <RichTextEditor readOnly
                                                value={field.value}
                                                onChange={(val) =>
                                                    form.setFieldValue(field.name, val)
                                                }
                                            />
                                        )}
                                    </Field>
                                </FormItem>
                                
                            </div>
                        </div>
                    </div>
                </FormContainer> : null}

                {values?.tempDetails?.type === 'S' ? <FormContainer>
                    <div style={{ backgroundColor: "#f5f5f5", padding: "20px 20px" }}>
                        <div className='card p-5'>
                            <div className="md:grid grid-cols-4 gap-3  ">
                                <FormItem label="Variant Title"
                                    invalid={errors.variantTitleThree && touched.variantTitleThree}
                                    errorMessage={errors.variantTitleThree}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="variantTitleThree"
                                        placeholder="Enter Variant Title"
                                        component={Input}
                                        disabled
                                    />
                                </FormItem>

                                <FormItem label="Monthly Price"
                                    invalid={errors.monthlyPrice && touched.monthlyPrice}
                                    errorMessage={errors.monthlyPrice}
                                >
                                    <Field
                                        type="text"
                                        autoComplete="off"
                                        name="monthlyPrice"
                                        placeholder="Enter Price "
                                        component={Input}
                                        disabled
                                    />
                                </FormItem>




                            </div>
                            <div className='grid grid-cols-2 '>
                                <FormItem label="Short Description"
                                    invalid={errors.shortDescription && touched.shortDescription}
                                    errorMessage={errors.shortDescription}
                                >
                                    <Field className=" h-28"
                                        type="text"
                                        autoComplete="off"
                                        name="shortDescription"
                                        placeholder=""
                                        component={Input}
                                        disabled
                                    />
                                </FormItem></div>
                            <div style={{ width: "70%" }} className="   ">
                                <FormItem label="Feature List"
                                    invalid={errors.variantFeatureDescThird && touched.variantFeatureDescThird}
                                    errorMessage={errors.variantFeatureDescThird}
                                >
                                    <Field className=" h-28"
                                        type="text"
                                        autoComplete="off"
                                        name="shortDescription"
                                        placeholder=""
                                        component={Input}
                                        disabled
                                    />

                                </FormItem>
                            </div>
                        </div>
                    </div>
                </FormContainer> : null}



                <FieldArray name={values?.initialValues}>
                    {({ push: pushSection, remove: removeSection }) => (
                        <div>
                            {values?.initialValues?.map((item, i) => {
                                return (
                                    <>
                                        <FormContainer>
                                            <div className="md:grid grid-cols-3 mt-8 gap-4 mx-4">
                                                <FormItem label="Section Title" className="text-black">
                                                    <Field type="text" autoComplete="off" name={`initialValues[${i}].sectionTitle`} placeholder="Enter Section Title" component={Input} />
                                                </FormItem>
                                            </div>
                                            <div className="card  mx-4 p-4">
                                                <FieldArray name={`sectionValues`}>
                                                    {({ push: pushField, remove: removeField }) => (
                                                        <div>
                                                            {item?.sectionValues?.map((f, fi) => {
                                                                return (
                                                                    <div key={fi}>
                                                                        <div className='md:grid grid-cols-2 gap-4 p-4'>
                                                                            <FormItem label="Title">
                                                                                <Field type="text" autoComplete="off" name={`initialValues[${i}].sectionValues[${fi}].title`} placeholder="Enter Title" component={Input} />
                                                                            </FormItem>
                                                                            <FormItem label="Select Form Field Type"
                                                                                invalid={errors.type && touched.type}
                                                                                errorMessage={errors.type}>
                                                                                <Field name={`initialValues[${i}].sectionValues[${fi}].formType`}>
                                                                                    {({ field, form }) => (
                                                                                        <Select placeholder="Select Field Type" field={field} form={form} options={formFieldsType}
                                                                                            value={formFieldsType.filter((type) => type.value === values.initialValues[i].sectionValues[fi].formType)}
                                                                                            onChange={(type) => onChangeFieldType(field, form, type, setFieldValue, i, fi, values)}
                                                                                        />
                                                                                    )}
                                                                                </Field>
                                                                            </FormItem>
                                                                            {values.initialValues[i].sectionValues[fi].formType === 'TA' &&
                                                                                <FormItem label="Max Length" >
                                                                                    <Field type="text" autoComplete="off" name={`initialValues[${i}].sectionValues[${fi}].textAreaMaxLength`} placeholder="Enter Max Length" component={Input} />
                                                                                </FormItem>
                                                                            }
                                                                            {/* {values.initialValues[i].sectionValues[fi].formType === 'DD' &&
                                                                                <FieldArray name={`values.initialValues[${i}].sectionValues[${fi}].dropdownOptions`}>
                                                                                    {({ push: pushOption, remove: removeOption }) => (
                                                                                        <div>
                                                                                            {f?.dropdownOptions?.map((options, id) => {
                                                                                                return (
                                                                                                    <div key={id} className='flex mt-4'>
                                                                                                        <h6 className='my-4 mr-2'>{id + 1}.</h6>
                                                                                                        <FormItem className='w-80'>
                                                                                                            <Field type="text" autoComplete="off" name={`initialValues[${i}].sectionValues[${fi}].dropdownOptions[${id}].option`} placeholder={`options ${id + 1}`} component={Input} />
                                                                                                        </FormItem>
                                                                                                        <div className='flex'>
                                                                                                            <Button className='ml-4 border-cyan-500'
                                                                                                                shape="circle"
                                                                                                                size="md"
                                                                                                                icon={<HiPlus />}
                                                                                                                onClick={() => values.initialValues[i].sectionValues[fi].dropdownOptions.push({ option: '' })}
                                                                                                            />
                                                                                                            {values.initialValues[i].sectionValues[fi].dropdownOptions.length > 1 &&
                                                                                                                <Button className='ml-4 border-red-500'
                                                                                                                    shape="circle"
                                                                                                                    size="md"
                                                                                                                    icon={<HiMinus />}
                                                                                                                    onClick={() => removeOption(id)}
                                                                                                                />}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )
                                                                                            })}
                                                                                        </div>
                                                                                    )}
                                                                                </FieldArray>
                                                                            }
                                                                            {values.initialValues[i].sectionValues[fi].formType === 'RB' &&
                                                                                <FieldArray name={`values.initialValues[${i}].sectionValues[${fi}].radioBtnOptions`}>
                                                                                    {({ push: pushOptionR, remove: removeOptionR }) => (
                                                                                        <div>
                                                                                            {f.radioBtnOptions.map((options, id) => {
                                                                                                return (
                                                                                                    <div key={id} className='flex mt-4'>
                                                                                                        <div className='mx-4 mt-3'>
                                                                                                            <Radio disabled />
                                                                                                        </div>
                                                                                                        <FormItem className='w-80'>
                                                                                                            <Field type="text" autoComplete="off" name={`initialValues[${i}].sectionValues[${fi}].radioBtnOptions[${id}].option`} placeholder={`options ${id + 1}`} component={Input} />
                                                                                                        </FormItem>
                                                                                                        <div className='flex'>
                                                                                                            <Button className='ml-4 border-cyan-500'
                                                                                                                shape="circle"
                                                                                                                size="md"
                                                                                                                icon={<HiPlus />}
                                                                                                                onClick={() => values.initialValues[i].sectionValues[fi].radioBtnOptions.push({ option: '' })}
                                                                                                            />
                                                                                                            {values.initialValues[i].sectionValues[fi].radioBtnOptions.length > 1 &&
                                                                                                                <Button className='ml-4 border-red-500'
                                                                                                                    shape="circle"
                                                                                                                    size="md"
                                                                                                                    icon={<HiMinus />}
                                                                                                                    onClick={() => removeOptionR(id)}
                                                                                                                />}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )
                                                                                            })}
                                                                                        </div>
                                                                                    )}
                                                                                </FieldArray>
                                                                            }
                                                                            {values.initialValues[i].sectionValues[fi].formType === 'CB' &&
                                                                                <FieldArray name={`values.initialValues[${i}].sectionValues[${fi}].checkBoxOptions`}>
                                                                                    {({ push: pushOptionC, remove: removeOptionC }) => (
                                                                                        <div>
                                                                                            {f.checkBoxOptions.map((options, id) => {
                                                                                                return (
                                                                                                    <div key={id} className='flex mt-4'>
                                                                                                        <div className='mx-4 mt-3'>
                                                                                                            <Checkbox disabled />
                                                                                                        </div>
                                                                                                        <FormItem className='w-80'>
                                                                                                            <Field type="text" autoComplete="off" name={`initialValues[${i}].sectionValues[${fi}].checkBoxOptions[${id}].option`} placeholder={`options ${id + 1}`} component={Input} />
                                                                                                        </FormItem>
                                                                                                        <div className='flex'>
                                                                                                            <Button className='ml-4 border-cyan-500'
                                                                                                                shape="circle"
                                                                                                                size="md"
                                                                                                                icon={<HiPlus />}
                                                                                                                onClick={() => values.initialValues[i].sectionValues[fi].checkBoxOptions.push({ option: '' })}
                                                                                                            />
                                                                                                            {values.initialValues[i].sectionValues[fi].checkBoxOptions.length > 1 &&
                                                                                                                <Button className='ml-4 border-red-500'
                                                                                                                    shape="circle"
                                                                                                                    size="md"
                                                                                                                    icon={<HiMinus />}
                                                                                                                    onClick={() => removeOptionC(id)}
                                                                                                                />}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )
                                                                                            })}
                                                                                        </div>
                                                                                    )}
                                                                                </FieldArray>
                                                                            }
                                                                            {values.initialValues[i].sectionValues[fi].formType === 'CK' &&
                                                                                <FormItem>
                                                                                    <Field name={`initialValues[${i}].sectionValues[${fi}].textEditor`}>
                                                                                        {({ field, form }) => (
                                                                                            <RichTextEditor
                                                                                                value={values.initialValues[i].sectionValues[fi].textEditor}
                                                                                                onChange={(val) => form.setFieldValue(field.name, val)}
                                                                                            />
                                                                                        )}
                                                                                    </Field>
                                                                                </FormItem>
                                                                            } */}
                                                                            {values.initialValues[i].sectionValues[fi].formType === 'UF' &&
                                                                                <>
                                                                                    <FormContainer>
                                                                                        <FormItem label='Select Max File Size'>
                                                                                            <Field name={`initialValues[${i}].sectionValues[${fi}].maxFileSize`}>
                                                                                                {({ field, form }) => (
                                                                                                    <Select placeholder="Select Max File Size" field={field} form={form} options={fileSizeOptions}
                                                                                                        value={fileSizeOptions?.filter((type) => type?.value === values?.initialValues[i]?.sectionValues[fi]?.maxFileSize)}
                                                                                                        onChange={(type) => form.setFieldValue(field.name, type.value)}
                                                                                                    />
                                                                                                )}
                                                                                            </Field>
                                                                                        </FormItem>
                                                                                        <FormItem label='Select File Type' >
                                                                                            {values?.initialValues[i]?.sectionValues[fi]?.fileType?.map((ft, fti) => {
                                                                                                return (
                                                                                                    <Field name={`initialValues[${i}].sectionValues[${fi}].fileType[${fti}].status`}>
                                                                                                        {({ field, form }) => (
                                                                                                            <div className='my-2 flex'>
                                                                                                                <Checkbox checked={values?.initialValues[i]?.sectionValues[fi]?.fileType[fti]?.status}
                                                                                                                    onChange={(val) => form.setFieldValue(field.name, val)} className='mt-4' />
                                                                                                                <label className='mt-4'>{ft?.label}</label>
                                                                                                            </div>
                                                                                                        )}
                                                                                                    </Field>
                                                                                                )
                                                                                            })
                                                                                            }
                                                                                        </FormItem>
                                                                                    </FormContainer>
                                                                                </>
                                                                            }
                                                                            <FormItem className='mt-7'>
                                                                                <Field name={`initialValues[${i}].sectionValues[${fi}].isMandatery`} >
                                                                                    {({ field, form }) => (
                                                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                            <Checkbox checked={values.initialValues[i].sectionValues[fi].isMandatery}
                                                                                                onChange={(val) => form.setFieldValue(field.name, val)} />
                                                                                            <label>Is Mandatory</label>
                                                                                        </div>
                                                                                    )}
                                                                                </Field>
                                                                            </FormItem>
                                                                        </div>
                                                                        <div className="mt-4 text-right lg:flex items-center justify-end">
                                                                            <Button type="button"  variant="plain" className="font-bold" style={{ color: '#004D99' }}
                                                                                icon={<BsFillPlusCircleFill fill="#004D99" />}
                                                                                onClick={() => {values?.initialValues[i].sectionValues.push({

                                                                                    title: '', formType: '', isMandatery: false, textAreaMaxLength: '',
                                                                                    // dropdownOptions: [{ option: '' }], radioBtnOptions: [{ option: '' }],
                                                                                    // checkBoxOptions: [{ option: '' }], textEditor: '', maxFileSize: '',
                                                                                    fileType: [{ label: 'Document', status: false },
                                                                                    { label: 'Image', status: false },
                                                                                    { label: 'Pdf', status: false },
                                                                                    { label: 'Video', status: false }]

                                                                                })
                                                                                setFieldValue(`initialValues[${i}].sectionValues`, values?.initialValues[i].sectionValues);}
                                                                                }
                                                                            >
                                                                                ADD NEW FIELD
                                                                            </Button>
                                                                            {item.sectionValues.length > 1 &&
                                                                                <Button type="button"  variant="plain" className="font-bold" style={{ color: '#990000' }}
                                                                                    icon={<MdDelete fill="#99000f" />}
                                                                                    onClick={() => {
                                                                                        const updatedArray = values?.initialValues[i].sectionValues.filter(
                                                                                            (item, ind) => fi !== ind
                                                                                        );
                                                                                        setFieldValue(`initialValues[${i}].sectionValues`, updatedArray);
                                                                                    }}
                                                                                >
                                                                                    DELETE
                                                                                </Button>}
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    )}
                                                </FieldArray>
                                            </div>
                                        </FormContainer>
                                        <div className='card' style={{ display: 'flex', paddingTop: '10px', marginTop: "20px", marginBottom: "-20px", borderRadius: '0px' }}>
                                            <div className='mb-6'>
                                                <Button 
                                                    variant="plain"
                                                    type="button"
                                                    className="font-bold"
                                                    style={{ color: '#004D99', fontSize: '20px', }}
                                                    icon={<BsFillPlusCircleFill fill="#004D99" />}
                                                    onClick={(e) => {values?.initialValues.push({
                                                        sectionTitle: '',
                                                        sectionValues: [{
                                                            title: '', formType: '', isMandatery: false, textAreaMaxLength: '',
                                                            // dropdownOptions: [{ option: '' }], radioBtnOptions: [{ option: '' }],
                                                            // checkBoxOptions: [{ option: '' }], textEditor: '', maxFileSize: '',
                                                            fileType: [{ label: 'Document', status: false }, { label: 'Image', status: false },
                                                            { label: 'Pdf', status: false }, { label: 'Video', status: false }]
                                                        }]
                                                    })
                                                    setFieldValue(`initialValues`, values?.initialValues);
                                                    
                                                    }}>
                                                    ADD NEW SECTION
                                                </Button>
                                                {values.initialValues.length > 1 &&
                                                    <Button 
                                                        onClick={() => {
                                                            const updatedArray = values?.initialValues?.filter(
                                                                (item, ind) => i !== ind
                                                            );
                                                            setFieldValue(`initialValues`, updatedArray);
                                                        }}
                                                        variant="plain"
                                                        type="button"
                                                        className="font-bold"
                                                        style={{ color: '#990000', fontSize: '20px', }}
                                                        icon={<MdDelete fill="#99000f" />}
                                                    >
                                                        DELETE SECTION
                                                    </Button>}
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    )}
                </FieldArray >
            </div >
        </>
    )
}
export default TemplateCreation
