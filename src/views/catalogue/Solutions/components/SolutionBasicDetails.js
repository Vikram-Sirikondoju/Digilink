import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,

} from 'components/ui'
import * as Yup from 'yup'
import { FormItem, FormContainer, Upload, Dialog } from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getProductCategorys } from '../store/dataSlice'
import { useEffect, useState } from 'react'
import { apiUploadFiles } from 'services/EnterpriseService'
import CloseButton from 'components/ui/CloseButton'
import appConfig from 'configs/app.config'
import { OpenNotification } from 'views/Servicefile'
const pCategoryOptions = [
    { label: 'GPS TRACKERS', value: 5 }, //need to use this option only
    { label: 'SMART SECURITY SYSTEMS', value: 6 },
    { label: 'SMART MOBILES', value: 7 },
]



const validatationSchema = Yup.object().shape({
    pCategory: Yup.string().trim().required('Please Select category'),
    solTitle: Yup.string().trim().required('Please Enter Valid Title'),
    solDesc: Yup.string().trim().required('Please Enter Valid Description'),
    solKeywords: Yup.string().trim().required('Please Enter Valid Keywords'),
})


const saveFilesInCatalog = 2
const SolutionBasicDetails = ({ onChange, refId, ...props }) => {
    const productCat = useSelector((state) => state?.solutionsList?.data?.templateProductList)
    const dispatch = useDispatch()
    const { enterAccount, password, rememberMe, usernameOrEmail, user_type, acc_mno_parent_unq_id, acc_user_id } = useSelector(
        (state) => state.auth.user
    )
    useEffect(() => {
        dispatch(getProductCategorys({
            enterAccount: user_type === 'Provider' ? acc_mno_parent_unq_id : enterAccount,
        }))
    }, [dispatch, enterAccount])


    const beforeUpload = async (newFiles, files) => {
        const file = newFiles[0];
        const allowedTypes = ['image/jpeg', 'image/png'];

        if (!allowedTypes.includes(file.type)) {
            OpenNotification('warning', 'JPG/PNG files are allowed only!')
          return false;
        } 
        try { 
          const ress = await apiUploadFiles(file, acc_user_id, saveFilesInCatalog); 
          return ress;
        } catch (error) {
          console.error('Error during file upload:', error);
          return false;
        }
      };
    const [showContent, setShowContent] = useState(false)
    const [content, setContent] = useState(null)
    const onClickView = (fileInfo) => {
        setShowContent(true)
        setContent(fileInfo)
    }
    const SubmitSolBasicDet = async (values) => {
        if(values.imageFile == ''){
            OpenNotification('warning','Upload file is Mandatory')
            return
        }
     

        let body = {
            "acc_id": enterAccount,
            "sol_title": values.solTitle.trim(),
            "sol_desc": values.solDesc,
            "sol_keywords": values.solKeywords,
            "sol_text_banner": values.solTextBanner,
            "sol_img_url": values.imageFile,
            "sol_geo_tag": "",
            "sol_thumbnail": "Sample1.jpg",
            "sol_status": 1,
        }
        let updatedPayload = body
        props.setSolutionState(updatedPayload)
        let dataToStore = props.solutionIntialValues
        dataToStore.basics = values
        props.setSolutionIntialValues(dataToStore)
        props.setStep(props.step + 1)
    }
    return (
        <>

            <Formik
                innerRef={refId}
                initialValues={props?.solutionIntialValues?.basics}
                validationSchema={validatationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true)
                    SubmitSolBasicDet(values)
                }}
            >
                {({ values, touched, handleSubmit, errors, isSubmitting, setFieldValue }) => {
                    return (
                        <Form onSubmit={handleSubmit} autoComplete="off">
                            <FormContainer>
                                <div className='p-2'>
                                    <div className="md:grid grid-cols-3 gap-3 mx-4">
                                        <FormItem
                                            label={<p>Item Category <span style={{ color: 'red' }}>{'*'}</span></p>}
                                            invalid={
                                                errors.pCategory &&
                                                touched.pCategory
                                            }
                                            errorMessage={errors.pCategory}
                                        >
                                            <Field name="pCategory">
                                                {({ field, form }) => (
                                                    <Select
                                                        placeholder="Select Item Category"
                                                        field={field}
                                                        form={form}
                                                        options={productCat || []}
                                                        value={productCat?.filter(
                                                            (category) =>
                                                                category.value ===
                                                                values.pCategory
                                                        )}
                                                        onChange={(category) =>
                                                            form.setFieldValue(
                                                                field.name,
                                                                category.value
                                                            )
                                                        }
                                                    />
                                                )}
                                            </Field>
                                        </FormItem>
                                        <FormItem label={<p>Solution Title <span style={{ color: 'red' }}>{'*'}</span></p>}
                                            invalid={errors.solTitle && touched.solTitle}
                                            errorMessage={errors.solTitle}
                                        >
                                            <Field
                                                value={values?.solTitle}
                                                type="text"
                                                autoComplete="off"
                                                name="solTitle"
                                                placeholder="Enter Solution Title"
                                                component={Input}
                                            />
                                        </FormItem>

                                    </div>
                                    <div className="md:grid grid-cols-2 gap-3 mx-4">
                                        <FormItem label={<p>Description <span style={{ color: "red" }}>{'*'}</span></p>}
                                            invalid={errors.solDesc && touched.solDesc}
                                            errorMessage={errors.solDesc}
                                        >
                                            <Field name="solDesc"  >
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
                                    <div className="md:grid grid-cols-2 gap-3 mx-4">
                                        <FormItem label={<p>Keyword To Search Solution <span style={{ color: "red" }}>{'*'}</span></p>}
                                            invalid={errors.solKeywords && touched.solKeywords}
                                            errorMessage={errors.solKeywords}
                                        >
                                            <Field name="solKeywords"  >
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
                                    <div className="md:grid grid-cols-2 gap-3 mx-4">
                                        <FormItem label={<p>Add Text Banner </p>}
                                            invalid={errors.solTextBanner && touched.solTextBanner}
                                            errorMessage={errors.solTextBanner}
                                        >
                                            <Field name="solTextBanner"  >
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
                                </div>

                                <div className='p-2'>

                                    <AdaptableCard>
                                        <h5 className="mb-4 mt-2 mx-4">UPLOAD IMAGE<span style={{ color: 'red' }}>{' *'}</span></h5>
                                        <FormItem label="">

                                            <Field name="imageFile">
                                                {({ field, form }) => (
                                                    <div className='mx-4'>
                                                        <Upload beforeUpload={beforeUpload} draggable className='border-blue-500 bg-blue-50 w-96 h-36'
                                                            onChange={(updatedFiles, files, uploadRes, filesDetails) => {
                                                                setFieldValue(`imageFile`, uploadRes?.data?.fileUnqId);
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
                                            {values?.imageFile &&
                                                <div className="upload-file cursor-pointer" >
                                                    <div className="upload-file-info" onClick={() => onClickView(values?.imageFile)}>
                                                        <h6 className="upload-file-name">{values?.imageFile.substring(0, 15)}</h6>
                                                    </div>

                                                    <CloseButton
                                                        className="upload-file-remove "
                                                        onClick={() => {
                                                            setFieldValue(`imageFile`, '');
                                                        }}
                                                    />
                                                </div>}
                                        </FormItem>
                                    </AdaptableCard>
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
        </>
    )
}

export default SolutionBasicDetails
