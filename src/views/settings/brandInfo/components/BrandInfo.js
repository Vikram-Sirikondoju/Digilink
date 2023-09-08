import React, { useState, useEffect } from 'react'
import RichTextEditor from 'components/shared/RichTextEditor'
import {
    Input,
    Button,
    FormItem,
    FormContainer,
    Select,
    Dialog,
} from 'components/ui'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { Link, useLocation } from 'react-router-dom'
import { Upload } from 'components/ui'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { AdaptableCard } from 'components/shared'
import CreatableSelect from 'react-select/creatable'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile'
import { apiBrandInfoGetData, apiUpdateBrandInfo } from 'services/BrandInfoService'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import CloseButton from 'components/ui/CloseButton'
import { apiUploadFiles } from 'services/MyAccountService'
import { useDispatch, useSelector } from 'react-redux';
import appConfig from 'configs/app.config'
import { getProfileDetails } from 'views/profile/store/dataSlice'
import { GetBrandInfo } from '../store/dataSlice'
import { setLargeLogo, setSmallLogo, setThemeLargeLogo, setThemeSmallLogo } from 'store/locale/localeSlice'
const brandInfoInitValues = {
    siteTitle: "",
    metaTitle: "",
    description: "",
    large_logo_url: "",
    small_logo_url:'',
    thm_large_logo_url:"",
    thm_small_logo_url:"",
    tags: [],
    unq_id: "",
}

function BrandInfo(props) {

 
    const dispatch = useDispatch()
   

    const { acc_unq_id, enterAccount, user_type, acc_user_id,unq_id,acc_mno_unq_id
    } = useSelector(
        (state) => state.auth.user
    )


    const [message, setMessage] = useTimeOutMessage()
    const [showContent, setShowContent] = useState(false)
    const [content, setContent] = useState(null)
    const saveFilesInCatalog = 1

 

    const brandInfo = useSelector((state) => state.brandInfo.data.getBrandData?.[state.brandInfo.data.getBrandData.length - 1]);


   
    const brandInfoValidationSchema = Yup.object().shape({
        siteTitle: Yup.string().min(2, "Site Title must be at least 2 characters").max(100).required('Please enter site title').nullable(),
        metaTitle: Yup.string().min(2, "Meta Title must be at least 2 characters").max(100).required('Please enter meta title').nullable(),
    })

    const preValuesToBrand = (brandInfoInitValues,brandInfo) => {
        const values = brandInfo?.meta_tags.split(', ');
        const jsonArray = values?.map((value) => ({
          label: value,
          value,
          __isNew__: true,
        }));
    
            brandInfoInitValues.siteTitle = brandInfo?.site_name
            brandInfoInitValues.metaTitle = brandInfo?.meta_title
            brandInfoInitValues.description = brandInfo?.meta_desc
            brandInfoInitValues.large_logo_url = brandInfo?.large_logo_url
            brandInfoInitValues.small_logo_url = brandInfo?.small_logo_url
            brandInfoInitValues.thm_large_logo_url = brandInfo?.thm_large_logo_url
            brandInfoInitValues.thm_small_logo_url = brandInfo?.thm_small_logo_url
            brandInfoInitValues.tags = jsonArray
            return brandInfoInitValues
        }

    const [initialValues, setInitialValues] = useState(brandInfoInitValues)


    const submitApi = async (values) => {
        console.log(values, "values")
        const metaTags = values.tags?.map(item => item.value);
        const commaSeparatedValues = Array.isArray(metaTags) ? metaTags.join(", ") : values.meta_tags;

        const payload = {
            "site_name": values.siteTitle,
            "meta_title": values.metaTitle,
            "meta_desc": values.description,
            "meta_tags": commaSeparatedValues,
            "large_logo_url": values.large_logo_url,
            "small_logo_url":values.small_logo_url,
            "thm_large_logo_url": values.thm_large_logo_url,
            "thm_small_logo_url": values.thm_small_logo_url,
            "unq_id": enterAccount
        };

        let response;

        if (brandInfo == undefined) {
            response = await apiBrandInfoGetData(payload);
        } else   {
            payload.id = brandInfo?.id
            response = await apiUpdateBrandInfo(payload);
        }

        if (response.status === 'success') {
            const action = brandInfo && brandInfo.length > 0 && brandInfo.id ? 'Updated' : 'Created';
            dispatch(setLargeLogo(values.large_logo_url))
            dispatch(setSmallLogo(values.small_logo_url))
            dispatch(setThemeLargeLogo(values.thm_large_logo_url))
            dispatch(setThemeSmallLogo(values.thm_small_logo_url))
            OpenNotification('success', `${action} successfully`);

        } else if (response.status === 'failed') {
            setMessage(GetErrorMsg(response));
        }
    }


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

    const onClickView = (fileInfo) => {
        setShowContent(true)
        setContent(fileInfo)
    }


    useEffect(() => {
        dispatch(GetBrandInfo({ acc_mno_unq_id: acc_mno_unq_id }))
    }, [dispatch, acc_mno_unq_id])

    useEffect(() => {
        if (brandInfo) {
          const values = preValuesToBrand(brandInfoInitValues, brandInfo);
          setInitialValues(values);
        }
      }, [brandInfo]);

      
    return (
        <>
            {/* <div>Setings / Brand Info</div> */}
            <div className='mt-5'>
                <h3>Brand Info</h3>
                <div>

                   <Formik
                        initialValues={initialValues}

                        validationSchema={brandInfoValidationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(true)
                            submitApi(values)
                            // saveProfileData(values)
                        }}
                    >
                        {({ values, touched, errors, isSubmitting, setFieldValue, resetForm }) => {
                            return (
                                <>

                                    {/* <div style={{ backgroundColor: "#F5F5F5", padding: "22px 6px ", marginTop: "10px" }}> */}
                                    <Form>
                                        <div className="p-5" style={{ backgroundColor: "#F5F5F5" }}>
                                                <FormContainer>
                                            <AdaptableCard className="h-full p-4" bodyClass="h-full" divider>
                                                        <FormItem
                                                            label={<p>Site Title <span style={{ color: "red" }}>*</span></p>}
                                                            invalid={
                                                                errors.siteTitle && touched.siteTitle
                                                            }
                                                            errorMessage={errors.siteTitle}
                                                        >
                                                            <Field
                                                                style={{ width: "40%" }}
                                                                type="text"
                                                                autoComplete="off"
                                                                name="siteTitle"
                                                                placeholder="prweb.com"
                                                                component={Input}
                                                            />
                                                        </FormItem>
                                                        {/* <FormItem
                                                            label="Logo"
                                                        >
                                                            <div className='h-14 border-solid border-2 w-24 rounded-full'>

                                                            </div>
                                                            <h6 className='mt-4'>OR</h6>

                                                        </FormItem> */}
                                                        <>
                                                            {/* <FormItem label="Logo">
                                                                <Field name={'profile_img'}>
                                                                    {({ field, form }) => (
                                                                        <Upload
                                                                            className="cursor-pointer"
                                                                            beforeUpload={beforeUpload}
                                                                            onChange={(updatedFiles, files, uploadRes, filesDetails) => {
                                                                                setFieldValue(field.name, uploadRes?.data.fileUnqId);
                                                                            }}
                                                                        >
                                                                            <div className="relative">
                                                                                {field.value ? (
                                                                                    <img className="h-24 w-24 rounded-full" src={`${appConfig.apiPrefix}/media/uniqid/${field.value}`} />
                                                                                ) : (
                                                                                    <img className="h-24 w-24 rounded-full" src={'/img/avatars/profileimage.png'} />
                                                                                )}
                                                                                <div className="absolute top-1/2 right-0 transform -translate-y-1/4 translate-x-1/2">
                                                                                    <MdModeEdit className="colo bg-white rounded-full h-9 w-9 p-2 text-sky-600 text-8xl border border-sky-600" />
                                                                                </div>
                                                                            </div>
                                                                        </Upload>
                                                                    )}
                                                                </Field>
                                                            </FormItem>
                                                            <FormItem label="OR" className='ml-8 bold'>
                                                                
                                                            </FormItem> */}
                                                       <div className='grid grid-cols-2'>
                                                       <FormItem label="Upload Large Logo">
                                                                <Field name="large_logo_url">
                                                                    {({ field, form }) => (
                                                                        <div className=''>
                                                                            <Upload
                                                                                beforeUpload={beforeUpload}
                                                                                draggable
                                                                                className="border-blue-500 bg-blue-50 w-96 h-36"
                                                                                onChange={(updatedFiles, files, uploadRes, filesDetails) => {
                                                                                    setFieldValue(`large_logo_url`, uploadRes?.data?.fileUnqId);
                                                                                }}
                                                                            >
                                                                                <div className="my-10 text-center">
                                                                                    <div className="text-6xl mb-4 flex justify-center">
                                                                                        <HiOutlineCloudUpload className="h-10" style={{ color: "#2563eb" }} />
                                                                                    </div>
                                                                                    <p className="font-semibold">
                                                                                        <span className="text-gray-800 dark:text-inherit">Upload Files Here or{' '}</span>
                                                                                        <span className="text-blue-500">browse</span>
                                                                                    </p>
                                                                                    <p className="mt-1 opacity-60 dark:text-inherit">JPG/PNG are allowed</p>
                                                                                </div>
                                                                            </Upload>
                                                                            {values.large_logo_url && (
                                                                                <div className="upload-file cursor-pointer h-12 w-96">
                                                                                    <div className="upload-file-info" onClick={() => onClickView(values.large_logo_url)}>
                                                                                        <h6 className="upload-file-name">{values.large_logo_url.substring(0, 15)}</h6>
                                                                                    </div>
                                                                                    <CloseButton className="upload-file-remove" onClick={() => { form.setFieldValue(field.name, ''); }} />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </Field>
                                                            </FormItem>
                                                            <FormItem label="Upload Small Logo">
                                                                <Field name="small_logo_url">
                                                                    {({ field, form }) => (
                                                                        <div className=''>
                                                                            <Upload
                                                                                beforeUpload={beforeUpload}
                                                                                draggable
                                                                                className="border-blue-500 bg-blue-50 w-96 h-36"
                                                                                onChange={(updatedFiles, files, uploadRes, filesDetails) => {
                                                                                    setFieldValue(`small_logo_url`, uploadRes?.data?.fileUnqId);
                                                                                }}
                                                                            >
                                                                                <div className="my-10 text-center">
                                                                                    <div className="text-6xl mb-4 flex justify-center">
                                                                                        <HiOutlineCloudUpload className="h-10" style={{ color: "#2563eb" }} />
                                                                                    </div>
                                                                                    <p className="font-semibold">
                                                                                        <span className="text-gray-800 dark:text-inherit">Upload Files Here or{' '}</span>
                                                                                        <span className="text-blue-500">browse</span>
                                                                                    </p>
                                                                                    <p className="mt-1 opacity-60 dark:text-inherit">JPG/PNG are allowed</p>
                                                                                </div>
                                                                            </Upload>
                                                                            {values.small_logo_url && (
                                                                                <div className="upload-file cursor-pointer h-12 w-96">
                                                                                    <div className="upload-file-info" onClick={() => onClickView(values.small_logo_url)}>
                                                                                        <h6 className="upload-file-name">{values.small_logo_url.substring(0, 15)}</h6>
                                                                                    </div>
                                                                                    <CloseButton className="upload-file-remove" onClick={() => { form.setFieldValue(field.name, ''); }} />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </Field>
                                                            </FormItem>
                                                            <FormItem label="Upload Theme Large Logo">
                                                                <Field name="thm_large_logo_url">
                                                                    {({ field, form }) => (
                                                                        <div className=''>
                                                                            <Upload
                                                                                beforeUpload={beforeUpload}
                                                                                draggable
                                                                                className="border-blue-500 bg-blue-50 w-96 h-36"
                                                                                onChange={(updatedFiles, files, uploadRes, filesDetails) => {
                                                                                    setFieldValue(`thm_large_logo_url`, uploadRes?.data?.fileUnqId);
                                                                                }}
                                                                            >
                                                                                <div className="my-10 text-center">
                                                                                    <div className="text-6xl mb-4 flex justify-center">
                                                                                        <HiOutlineCloudUpload className="h-10" style={{ color: "#2563eb" }} />
                                                                                    </div>
                                                                                    <p className="font-semibold">
                                                                                        <span className="text-gray-800 dark:text-inherit">Upload Files Here or{' '}</span>
                                                                                        <span className="text-blue-500">browse</span>
                                                                                    </p>
                                                                                    <p className="mt-1 opacity-60 dark:text-inherit">JPG/PNG are allowed</p>
                                                                                </div>
                                                                            </Upload>
                                                                            {values.thm_large_logo_url && (
                                                                                <div className="upload-file cursor-pointer h-12 w-96">
                                                                                    <div className="upload-file-info" onClick={() => onClickView(values.thm_large_logo_url)}>
                                                                                        <h6 className="upload-file-name">{values.thm_large_logo_url.substring(0, 15)}</h6>
                                                                                    </div>
                                                                                    <CloseButton className="upload-file-remove" onClick={() => { form.setFieldValue(field.name, ''); }} />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </Field>
                                                            </FormItem>
                                                            <FormItem label="Upload Theme Small Logo">
                                                                <Field name="thm_small_logo_url">
                                                                    {({ field, form }) => (
                                                                        <div className=''>
                                                                            <Upload
                                                                                beforeUpload={beforeUpload}
                                                                                draggable
                                                                                className="border-blue-500 bg-blue-50 w-96 h-36"
                                                                                onChange={(updatedFiles, files, uploadRes, filesDetails) => {
                                                                                    setFieldValue(`thm_small_logo_url`, uploadRes?.data?.fileUnqId);
                                                                                }}
                                                                            >
                                                                                <div className="my-10 text-center">
                                                                                    <div className="text-6xl mb-4 flex justify-center">
                                                                                        <HiOutlineCloudUpload className="h-10" style={{ color: "#2563eb" }} />
                                                                                    </div>
                                                                                    <p className="font-semibold">
                                                                                        <span className="text-gray-800 dark:text-inherit">Upload Files Here or{' '}</span>
                                                                                        <span className="text-blue-500">browse</span>
                                                                                    </p>
                                                                                    <p className="mt-1 opacity-60 dark:text-inherit">JPG/PNG are allowed</p>
                                                                                </div>
                                                                            </Upload>
                                                                            {values.thm_small_logo_url && (
                                                                                <div className="upload-file cursor-pointer h-12 w-96">
                                                                                    <div className="upload-file-info" onClick={() => onClickView(values.thm_small_logo_url)}>
                                                                                        <h6 className="upload-file-name">{values.thm_small_logo_url.substring(0, 15)}</h6>
                                                                                    </div>
                                                                                    <CloseButton className="upload-file-remove" onClick={() => { form.setFieldValue(field.name, ''); }} />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </Field>
                                                            </FormItem>
                                                       </div>
                                                        </>




                                                        <div className='mt-6 card md:grid grid-cols-2 gap-4  mt-6 '>
                                                            <FormItem
                                                                label={<p>Meta Title <span style={{ color: "red" }}>*</span></p>}
                                                                invalid={
                                                                    errors.metaTitle && touched.metaTitle
                                                                }
                                                                errorMessage={errors.metaTitle}
                                                            >
                                                                <Field
                                                                    type="text"
                                                                    autoComplete="off"
                                                                    name="metaTitle"
                                                                    placeholder=" Title ABC"
                                                                    component={Input}
                                                                />
                                                            </FormItem>
                                                        </div>

                                                        <FormItem
                                                            label="Description"
                                                            className=''
                                                        // invalid={errors.description && touched.description}
                                                        // errorMessage={errors.description}
                                                        >
                                                            <Field name="description"  >
                                                                {({ field, form }) => (
                                                                    <RichTextEditor style={{ width: "60%" }}
                                                                        value={field.value}
                                                                        onChange={(val) =>
                                                                            form.setFieldValue(field.name, val)
                                                                        }
                                                                    />
                                                                )}
                                                            </Field>
                                                        </FormItem>
                                                        {/* <div className='mt-6 card md:grid grid-cols-2 gap-4  mt-6 '>
                                                        <FormItem
                                                            label="Meta Tags"
                                                        >
                                                            <Select
                                                                options={optionList}
                                                                placeholder=""
                                                                value={multiDropDown}
                                                                onChange={handleSelect}
                                                                isSearchable={true}
                                                                isMulti
                                                            />
                                                        </FormItem>
                                                    </div> */}
                                                        <div className="col-span-1">
                                                            <FormItem
                                                                label="Meta Tags"
                                                                invalid={errors.tags && touched.tags}
                                                                errorMessage={errors.tags}
                                                            >
                                                                <Field name="tags">
                                                                    {({ field, form }) => (
                                                                        <Select
                                                                            componentAs={CreatableSelect}
                                                                            isMulti
                                                                            field={field}
                                                                            form={form}
                                                                            //options={tags}
                                                                            value={values.tags}
                                                                            onChange={(option) =>
                                                                                form.setFieldValue(field.name, option)
                                                                            }
                                                                        />
                                                                    )}
                                                                </Field>
                                                            </FormItem>
                                                        </div>
                                                    </AdaptableCard>
                                                </FormContainer>
                                                <Dialog isOpen={showContent}
                                                    onClose={() => setShowContent(false)}>
                                                    <div className='p-5'>
                                                        <img src={`${appConfig.apiPrefix}/media/uniqid/${content}`} alt="Content" />
                                                        <Button onClick={() => window.open(`${appConfig.apiPrefix}/media/uniqid/${content}`, '_blank')} className='mt-2' variant='solid'>Download</Button>
                                                    </div>

                                                </Dialog>
                                        </div>
                                        <div className=" pt-4 text-right w-full" >
                                            <Link
                                                className="block lg:inline-block md:mb-0 mb-4"
                                            // to="/masterDataMenu-pages"
                                            >
                                                <Button
                                                    type='button'
                                                    onClick={() => resetForm({ values: brandInfoInitValues, touched: {}, errors: {} })}
                                                    className="mx-2"
                                                    style={{
                                                        backgroundColor: "#4D4D4D",
                                                        fontStyle: 'normal',
                                                        fontSize: '18px'
                                                    }}
                                                    variant="solid"
                                                >
                                                    Reset
                                                </Button>
                                            </Link>

                                            <Button type='submit' variant='solid' style={{
                                                fontStyle: 'normal',
                                                fontSize: '18px',
                                            }} >
                                                Publish
                                            </Button>
                                        </div>
                                    </Form>
                                    {/* </div> */}
                                </>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default BrandInfo