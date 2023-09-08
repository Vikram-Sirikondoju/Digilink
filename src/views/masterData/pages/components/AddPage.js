import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem, FormContainer, select, Button, Alert, Select } from 'components/ui'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { apiCreatePages, apiUpdatePages } from 'services/PagesService'
import { useDispatch, useSelector } from 'react-redux'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import ReactHtmlParser from 'html-react-parser'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile'
import { EditandCopyPages } from 'utils/campareandCopy'
import { getParentAccount } from '../store/dataSlice'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'


function AddPage() {

    const navigate = useNavigate()

    const validationSchema = Yup.object().shape({

        pageName: Yup.string().required("Please enter page name").nullable(),
        description: Yup.string().required("Please enter description").nullable(),
        metaTitle: Yup.string().required("Please enter meta title").nullable(),
        metaKeywords: Yup.string().required("Please enter meta keywords").nullable(),
        metaDescription: Yup.string().required("Please enter meta description").nullable(),
    })

    let initialValues = {
        pageName: "",
        description: "",
        metaTitle: "",
        metaKeywords: "",
        metaDescription: "",
        acc_unq_id: ""
    }

    const dispatch = useDispatch()

    const [message, setMessage] = useTimeOutMessage()
    const formikRef = useRef()
    const location = useLocation();
    const mode = location.state?.mode ? location.state.mode : "ADD";

    const rowForEdit = location.state?.data;

    const [pagesIntialValues, setPagesIntialValues] = useState(EditandCopyPages(initialValues, rowForEdit ? rowForEdit : initialValues))

    const { enterAccount, acc_mno_id, user_type } = useSelector((state) => state.auth.user)

    const parentAccountList = useSelector((state) => state.Pages?.data?.parentAccountList)


    useEffect(() => {
        if (rowForEdit) {
            const pagesEditIntialValues = EditandCopyPages(pagesIntialValues, rowForEdit);
            setPagesIntialValues(pagesEditIntialValues)
        }
    }, [pagesIntialValues, rowForEdit])

    useEffect(() => {
        dispatch(getParentAccount({ enterAccount }))

    }, [dispatch, enterAccount])


    const submitApi = async (values) => {
        let payload =
        {
            "page_name": values.pageName,
            "page_content": ReactHtmlParser(values?.description).props.children,
            "meta_title": values.metaTitle,
            "meta_data": values.metaKeywords,
            "meta_description": ReactHtmlParser(values.metaDescription).props.children,
            "page_status": "IN_ACTIVE",
            "dgl_acc_mno": acc_mno_id,
            // acc_unq_id:values.acc_unq_id
            "unq_id": user_type !== "GlobalMno" ? enterAccount : values.acc_unq_id
        }
        if (mode === "ADD") {
            const resp = await apiCreatePages(payload)
            if (resp.status === "success") {
                navigate('/masterDataMenu-pages')
                OpenNotification('success', 'Created successfully')
            }
            else if (resp.status === "failed") {
                setMessage(GetErrorMsg(resp));
            }
        }
        else if (mode === "EDIT") {
            payload.id = rowForEdit.id
            payload.dgl_acc_mno = rowForEdit?.dgl_acc_mno
            payload.unq_id = user_type !== "GlobalMno" ? enterAccount : values.acc_unq_id
            const resp = await apiUpdatePages(payload, rowForEdit.id)
            if (resp.status === "success") {
                navigate('/masterDataMenu-pages')
                OpenNotification('success', 'Updated successfully')
            }
            else if (resp.status === "failed") {
                setMessage(GetErrorMsg(resp));
            }
        }
    }

    let  breadCrumbList=[{
        name:'Master Data',
         link:"/home"
    },
    {
        name:'Pages',
        link:"/masterDataMenu-pages"
    },
    {
        name: `Add Page`,
    }]
    
    
    if(mode==="EDIT"){
    breadCrumbList = [
        {
            name:'Master Data',
             link:"/home"
        },
        {
            name:'Pages',
            link:"/masterDataMenu-pages"
        },
        {
          name: rowForEdit?.meta_title,
          link: '/masterDataMenu-pages',
          state:rowForEdit
      },
        {
            name: `Edit Page`,
        },
    
    
    ]
    }

    return (
        <>
            {message && <Alert className="mb-4" type="danger" showIcon>
                {message}
            </Alert>}
            <div>
                {/* Master Data /Pages / Add Page  */}
                <CustomBreadcrumbs  list={breadCrumbList} />
                </div>
            <div className='mt-5'>
                {/* <h3 className='mb-4'>Add Page</h3> */}
                <h3 className='mb-4'>{mode === "EDIT" ? "Edit" : "Add"} Page </h3>

                <Formik
                    innerRef={formikRef}
                    initialValues={pagesIntialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        submitApi(values)

                    }}
                >
                    {({ values, touched, errors, isSubmitting }) => {
                        return (
                            <Form>
                                <div className=" p-5" style={{ backgroundColor: "#F5F5F5" }}>
                                    <AdaptableCard className="h-full" bodyClass="h-full" divider>
                                        <FormContainer>
                                            <div className="md:grid gap-4 mx-4 mt-3 pl-2">
                                                <div className='md:grid grid-cols-2 gap-4'>
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
                                                                    // isDisabled = {user_type !== "GlobalMno" ? true : false}
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
                                                <FormItem
                                                    label={<p> Page Name<span style={{ color: 'red' }}>{'*'}</span></p>}
                                                    className=' mr-6'
                                                    invalid={errors.pageName && touched.pageName}
                                                    errorMessage={errors.pageName}
                                                >
                                                    <Field
                                                        type="text"
                                                        autoComplete="off"
                                                        name="pageName"
                                                        placeholder="Enter Name"
                                                        component={Input}
                                                        // className='w-2/5'
                                                        style={{ width: "48%" }}
                                                    />
                                                </FormItem>
                                                <FormItem
                                                    label={<p>Page Content<span style={{ color: 'red' }}>{'*'}</span></p>}
                                                    className=''
                                                    invalid={errors.description && touched.description}

                                                    errorMessage={errors.description}
                                                >
                                                    <Field name="description"  >
                                                        {({ field, form }) => (
                                                            <RichTextEditor
                                                                value={field.value}
                                                                placeholder="Enter description"
                                                                onChange={(val) =>
                                                                    form.setFieldValue(field.name, val)
                                                                }
                                                            />
                                                        )}
                                                    </Field>
                                                </FormItem>
                                                <div className='md:grid grid-cols-2'>
                                                    <FormItem
                                                        label={<p> Meta Title<span style={{ color: 'red' }}>{'*'}</span></p>}
                                                        className=' mr-6'
                                                        invalid={errors.metaTitle && touched.metaTitle}
                                                        errorMessage={errors.metaTitle}
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="metaTitle"
                                                            placeholder="Enter Name"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                        label={<p> Meta Keywords<span style={{ color: 'red' }}>{'*'}</span></p>}
                                                        className=' ml-6'
                                                        invalid={errors.metaKeywords && touched.metaKeywords}
                                                        errorMessage={errors.metaKeywords}
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="metaKeywords"
                                                            placeholder="Enter Page Tag"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                </div>
                                                <FormItem
                                                    label={<p>Meta Description<span style={{ color: 'red' }}>{'*'}</span></p>}
                                                    className=''
                                                    invalid={errors.metaDescription && touched.metaDescription}

                                                    errorMessage={errors.metaDescription}
                                                >
                                                    <Field name="metaDescription"  >
                                                        {({ field, form }) => (
                                                            <RichTextEditor
                                                                value={field.value}
                                                                placeholder="Enter description"
                                                                onChange={(val) =>
                                                                    form.setFieldValue(field.name, val)
                                                                }
                                                            />
                                                        )}
                                                    </Field>
                                                </FormItem>
                                            </div>
                                        </FormContainer>
                                    </AdaptableCard>
                                </div>
                                <div className=" pt-4 text-right w-full flex justify-end" >
                                    <Link
                                        className="block lg:inline-block md:mb-0 mb-4"
                                        to="/masterDataMenu-pages"
                                    >
                                        <Button
                                            type='button'
                                            className="mx-2"
                                            style={{
                                                backgroundColor: "#4D4D4D", 
                                                fontStyle: 'normal',
                                                fontSize: '18px'
                                            }}
                                            variant="solid"
                                        >
                                            Cancel
                                        </Button>
                                    </Link>

                                    <Button type='submit' variant='solid' style={{
                                        fontStyle: 'normal',
                                        fontSize: '18px',
                                    }} >
                                        {'Submit for Approval'}
                                    </Button>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </>
    )
}

export default AddPage