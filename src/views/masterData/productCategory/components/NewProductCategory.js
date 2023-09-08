import React, { useEffect, useRef, useState } from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem, FormContainer, select, Button, Alert, Select, Upload, Dialog } from 'components/ui'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import NewProductCategoryOtherDetails from './NewProductCategoryOtherDetails'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { apiProdCategoryCreateUser, apiUpdateProdCat, apiUploadFiles } from 'services/ProductCategoryService'
import { EditandCopyProdCat } from 'utils/campareandCopy'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile'
import { useDispatch, useSelector } from 'react-redux'
import { getParentAccount } from '../store/dataSlice'
import { HiOutlineCloudUpload } from 'react-icons/hi'

import ReactHtmlParser from 'html-react-parser'
import CloseButton from 'components/ui/CloseButton'
import appConfig from 'configs/app.config'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'


export default function NewProductCategory() {


    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        prodCatTitle: Yup.string().trim().required("Please enter product category title").nullable(),
        // description: Yup.string().required("Please enter description").nullable(),
        // acc_unq_id: Yup.string().required("Please enter opertor").nullable(),
    })

    let initialValues = {
        prodCatTitle: "",
        description: "",
        imageFile: "",
        acc_unq_id: "",

    }

    const parentAccountList = useSelector((state) => state.prodCatList?.data?.parentAccountList)

    const dispatch = useDispatch()

    const { enterAccount, user_type, acc_user_id
    } = useSelector(
        (state) => state.auth.user
    )

    const [message, setMessage] = useTimeOutMessage()
    const formikRef = useRef()
    const location = useLocation();
    const mode = location.state?.mode ? location.state.mode : "ADD";
    const rowForEdit = location.state?.data;
    const [prodCatIntialValues, setUserIntialValues] = useState(EditandCopyProdCat(initialValues, rowForEdit ? rowForEdit : initialValues))

    const submitApi = async (values) => {

        // if (values.imageFile == '') {
        //     OpenNotification('warning', 'Upload file is Mandatory')
        //     return
        // }

        let payload =
        {
            "prod_cat_title": values.prodCatTitle.trim(),
            "prod_cat_img_url": values.imageFile,
            "prod_cat_desc":values?.description,
            "md_pro_cat_status": "ACTIVE",
            // "unq_id": data.acc_unq_id,
            // "dgl_acc_mno_id": data.dgl_acc_mno_id,
            "unq_id": user_type !== "GlobalMno" ? enterAccount : values.acc_unq_id

        }

        if (mode === "ADD") {
            const resp = await apiProdCategoryCreateUser(payload)

            if (resp.status === "success") {
                OpenNotification('success', 'Created successfully')
                navigate('/masterDataMenu-item-view-2')


            }
            else if (resp.status === "failed") {
                setMessage(GetErrorMsg(resp));
            }

        } else if (mode === "EDIT") {
            payload.id = rowForEdit.id
            payload.unq_id = user_type !== "GlobalMno" ? enterAccount : values.acc_unq_id
            // payload.prod_cat_img_url = rowForEdit.prod_cat_img_url
            payload.md_pro_cat_status = rowForEdit.md_pro_cat_status
            //payload.unq_id = user_type !== "GlobalMno" ? enterAccount : values.acc_unq_id
            const resp = await apiUpdateProdCat(payload, rowForEdit.id)
            if (resp.status === "success") {
                OpenNotification('success', 'Updated successfully')
                navigate('/masterDataMenu-item-view-2')


            }
            else if (resp.status === "failed") {
                setMessage(GetErrorMsg(resp));
            }
        }
    }
    useEffect(() => {
        if (rowForEdit) {
            const userEditIntialValues = EditandCopyProdCat(prodCatIntialValues, rowForEdit);
            setUserIntialValues(userEditIntialValues)
        }
    }, [prodCatIntialValues, rowForEdit])

    useEffect(() => {
        dispatch(getParentAccount({ enterAccount }))

    }, [dispatch, enterAccount])


    const saveFilesInCatalog = 2

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

    let  breadCrumbList=[{
        name:'Master Data',
         link:"/home"
    },
    {
        name:'Item Category',
        link:"/masterDataMenu-item-view-2"
    },
    {
        name: `Add Item Category`,
    }]
    
    
    if(mode==="EDIT"){
    breadCrumbList = [
        {
            name:'Master Data',
             link:"/home"
        },
        {
            name:'Item Category',
            link:"/masterDataMenu-item-view-2"
        },
        {
          name: rowForEdit?.prod_cat_title,
          link: '/masterDataMenu-item-view-2',
          state:rowForEdit
      },
        {
            name: `Edit Item Category`,
        },
    
    
    ]
    }

    return (
        <>

            {message && <Alert className="mb-4" type="danger" showIcon>
                {message}
            </Alert>}
            <div>
                {/* Master Data/Product Category/Add Product Category */}
                <CustomBreadcrumbs  list={breadCrumbList} />
                </div>
            <div className='mt-5'>
                <h3 className='mb-4'>{mode === "EDIT" ? "Edit" : "Add"} Item Category</h3>
                <Formik
                    innerRef={formikRef}
                    initialValues={prodCatIntialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        submitApi(values)

                    }}
                >
                    {({ values, touched, errors, isSubmitting, setFieldValue }) => {
                        console.log(values, "values")
                        return (
                            <Form>
                                <div className="p-5" style={{ backgroundColor: "#F5F5F5" }}>
                                    <AdaptableCard className="h-full" bodyClass="h-full" divider>
                                        <FormContainer>
                                            <div className="md:grid gap-4 mx-4 mt-3 pl-2">
                                                <div className='md:grid grid-cols-2 gap-4 '>
                                                    <FormItem
                                                        label={<p>Operator <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                        invalid={errors.acc_unq_id && touched.acc_unq_id}
                                                        errorMessage={errors.acc_unq_id}
                                                    >
                                                        <Field name="acc_unq_id" validate={async (passedValue) => {
                                                            if (user_type === "GlobalMno") {
                                                                try {
                                                                    await Yup.string().required('Please select operator').validate(passedValue);
                                                                } catch (error) {
                                                                    return error.message;
                                                                }
                                                            }
                                                        }}>
                                                            {({ field, form }) => (
                                                                <Select
                                                                    isDisabled={user_type !== "GlobalMno" ? true : false}
                                                                    placeholder="Select Operator"
                                                                    field={field}
                                                                    form={form}
                                                                    options={parentAccountList}
                                                                    value={user_type !== "GlobalMno" ? parentAccountList?.filter(
                                                                        (label) =>
                                                                            label.acc_unq_id === enterAccount
                                                                    ) : parentAccountList?.filter(
                                                                        (label) =>
                                                                            label.acc_unq_id === values.acc_unq_id
                                                                    )}
                                                                    onChange={(label) =>
                                                                        form.setFieldValue(
                                                                            field.name,
                                                                            label.acc_unq_id
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </Field>
                                                    </FormItem>
                                                </div>
                                                <div className='md:grid grid-cols-2 gap-4'>
                                                <FormItem
                                                    label={<p> Item Category Title <span style={{ color: 'red' }}>{'*'}</span></p>}
                                                    className=''
                                                    invalid={errors.prodCatTitle && touched.prodCatTitle}
                                                    errorMessage={errors.prodCatTitle}
                                                >
                                                    <Field
                                                        type="text"
                                                        autoComplete="off"
                                                        name="prodCatTitle"
                                                        placeholder="Enter Title"
                                                        component={Input}
                                                        // className='w-1/3'
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
                                            </div>
                                            {/* <NewProductCategoryOtherDetails /> */}
                                            <div className='p-2'>

                                                <AdaptableCard>
                                                    <h5 className="mb-4 mt-2 mx-4">UPLOAD IMAGE</h5>
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
                                                                                <span className="text-gray-800 dark:text-inherit">
                                                                                    Upload Files Here or{' '}
                                                                                </span>
                                                                                <span className="text-blue-500">
                                                                                    browse
                                                                                </span>
                                                                            </p>
                                                                            <p className="mt-1 opacity-60 dark:text-inherit">
                                                                                JPG/PNG are allowed
                                                                            </p>
                                                                        </div>
                                                                    </Upload>
                                                                </div>
                                                            )}
                                                        </Field>
                                                        {values?.imageFile &&
                                                            <div className="upload-file cursor-pointer w-96 ml-4" >
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

                                    </AdaptableCard>
                                </div>
                                <div className="mt-4 text-right flex justify-end">
                                    <>
                                        <Link
                                            className="block lg:inline-block md:mb-0 mb-4"
                                            to="/masterDataMenu-item-view-2">
                                            <Button
                                                type="button"
                                                className="mx-2"
                                                onClick={"onPrevious"}
                                                variant="solid"
                                                style={{ backgroundColor: "#4D4D4D" }}
                                            >
                                                Cancel
                                            </Button>
                                        </Link>
                                        <Button type="submit" variant='solid' style={{
                                            fontStyle: 'normal',
                                            fontSize: '18px',
                                        }} >
                                            {'Submit'}
                                        </Button>
                                    </>

                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </>
    )
}
