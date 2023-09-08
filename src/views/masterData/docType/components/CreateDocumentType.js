import React, { useEffect, useRef, useState } from 'react'
import RichTextEditor from 'components/shared/RichTextEditor'
import {
  Input,
  Button,
  Select,
  FormItem,
  FormContainer,
  Checkbox,
  Alert,
} from 'components/ui'
import { getParentAccount, } from '../store/dataSlice'


import { Field, Form, Formik } from 'formik'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { apiCreateDocType, apiUpdateDocType } from 'services/DocType'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import * as Yup from 'yup';
import { EditandCopydocType } from 'utils/campareandCopy'
import { useDispatch, useSelector } from 'react-redux'

import ReactHtmlParser from 'html-react-parser'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'
import { AdaptableCard } from 'components/shared'

export default function CreateDocumentType() {
  const DocSchema = Yup.object().shape({
    title: Yup.string().trim().required("Please enter document title").nullable(),
    // acc_unq_id: Yup.string().required("Please enter operator").nullable(),
  });

  const validationSchemaforCheckbox = Yup.object().shape({
    pdf: Yup.boolean(),
    image: Yup.boolean(),
    document: Yup.boolean(),
    video: Yup.boolean(),
    audio: Yup.boolean(),
    spreadsheet: Yup.boolean(),
  }).test('checkbox-required', 'Please select at least one file type', function (value) {

    const isPdfSeleceted = value.pdf;
    const isImageSelected = value.image;
    const isDocumentSelected = value.document;
    const isVideoSelected = value.video;
    const isAudioSelected = value.audio;
    const isSpreadsheetSelected = value.spreadsheet;
    const isAtLeastOneSelected = isPdfSeleceted || isImageSelected || isDocumentSelected || isVideoSelected || isAudioSelected || isSpreadsheetSelected;
    return isAtLeastOneSelected;

  }).nullable()


  const formFieldsType = [
    { label: 'Text Field', value: 'TF' },
    { label: 'Text Area', value: 'TA' },
    { label: 'Drop Down', value: 'DD' },
    { label: 'Radio Button', value: 'RB' },
    { label: 'Check Boxes', value: 'CB' },
    { label: 'CK Editor', value: 'CK' },
  ]
  const onCheck = (value, field, form) => {
    form.setFieldValue(field.name, value)
  }
  let fileFormats = {
    pdf: false,
    image: false,
    document: false,
    video: false,
    audio: false,
    spreadsheet: false,
  }

  let intialValues = {
    title: "",
    allow_file_format: {
      pdf: false,
      image: false,
      document: false,
      video: false,
      audio: false,
      spreadsheet: false,
    },
    description: "",
    acc_unq_id: ""
  }

  const dispatch = useDispatch()

  const { enterAccount, user_type, unq_id
  } = useSelector(
    (state) => state.auth.user
  )

  const [message, setMessage] = useTimeOutMessage()
  const navigate = useNavigate()
  const formikRef = useRef()
  const location = useLocation();
  const mode = location.state?.mode ? location.state.mode : "ADD";
  const rowForEdit = location.state?.data;
  const checkBoxString = rowForEdit && rowForEdit.allow_file_format ? JSON.parse(rowForEdit.allow_file_format) : fileFormats;

  const [checkboxValues, setCheckboxValues] = useState(checkBoxString);
  const [docTypeIntialValues, setdocTypeIntialValues] = useState(EditandCopydocType(intialValues, rowForEdit ? rowForEdit : intialValues))

  const parentAccountList = useSelector((state) => state.doctypeList?.data?.parentAccountList)

  useEffect(() => {
    if (rowForEdit) {
      const docTypeEditIntialValues = EditandCopydocType(docTypeIntialValues, rowForEdit);

      setdocTypeIntialValues(docTypeEditIntialValues)
    }

  }, [docTypeIntialValues, rowForEdit])

  // useEffect(() => {
  //   if(rowForEdit) {
  //     dispatch(getParentAccount)
  //   }
  // })

  useEffect(() => {
    dispatch(getParentAccount({ enterAccount }))

  }, [dispatch, enterAccount])

  const handleCheckboxChange = async (event, name) => {
    // const { name, checked } = event.target;

    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: event.target.checked
    }));
  };


  const submitApi = async (values) => {
    let intialValues = {
      title: values.title,
      allow_file_format: checkboxValues,
      description: values.description,
    }
    setdocTypeIntialValues(intialValues)
    //const doc_type_desc = ReactHtmlParser(values?.description);

    if (mode === "ADD") {
      let data = formikRef.current.values
      let createPayload = {

        "doc_type_title": data.title.trim(),
        "allow_file_format": JSON.stringify(intialValues.allow_file_format),
        "doc_type_desc": values.description,
        "md_tax_status": "ACTIVE",
        "md_doc_status": "ACTIVE",
        "unq_id": user_type !== "GlobalMno" ? enterAccount : data.acc_unq_id

      }
      const resp = await apiCreateDocType(createPayload)
      if (resp.status === 'success') {
        OpenNotification('success', 'Created successfully')
        navigate('/masterDataMenu-item-view-1')
      }

      if (resp.status === 'failed') {
        setMessage(GetErrorMsg(resp));
      }

    } else if (mode === "EDIT") {
      let data = formikRef.current.values
      let updatePayload = {
        "id": rowForEdit?.id,
        "doc_type_title": data.title.trim(),
        "allow_file_format": JSON.stringify(intialValues.allow_file_format),
        "doc_type_desc": values.description,
        "md_doc_status": rowForEdit?.md_doc_status,
        "unq_id": user_type !== "GlobalMno" ? enterAccount : data.acc_unq_id
      }
      const resp = await apiUpdateDocType(updatePayload)

      if (resp.status === 'success') {
        OpenNotification('success', 'Updated successfully')
        navigate('/masterDataMenu-item-view-1')
      }

      if (resp.status === 'failed') {
        setMessage(GetErrorMsg(resp));
      }
    }
  }

  const validateCheckBox = async (passedValue) => {

    try {
      await validationSchemaforCheckbox.validate({ ...checkboxValues });
    } catch (error) {
      return error.message;
    }

  }

  let breadCrumbList = [{
    name: 'Master Data',
     link:"/home"
  },
  {
    name: 'Doc Type',
    link: "/masterDataMenu-item-view-1"
  },
  {
    name: `Add Doc Type`,
  }]


  if (mode === "EDIT") {
    breadCrumbList = [
      {
        name: 'Master Data',
         link:"/home"
      },
      {
        name: 'Doc Type',
        link: "/masterDataMenu-item-view-1"
      },
      {
        name: rowForEdit?.doc_type_title,
        link: '/masterDataMenu-item-view-1',
        state: rowForEdit
      },
      {
        name: `Edit Doc Type`,
      },


    ]
  }

  return (
    <>

      {message && <Alert className="mb-4" type="danger" showIcon>
        {message}
      </Alert>}

      <div>
        {/* Master Data/Doc Type/Create Document Type */}
        <CustomBreadcrumbs list={breadCrumbList} />
      </div>
      <div className='mt-5'>
        <h3>{mode === "EDIT" ? "Edit" : "Create"} Document Type</h3>
        <div>
          <Formik
            innerRef={formikRef}
            initialValues={docTypeIntialValues}

            validationSchema={DocSchema}
            onSubmit={
              submitApi}
          >
            {({ values, touched, errors, isSubmitting, handleSubmit }) => {
              return (
                <>
                  <Form onSubmit={handleSubmit}>
                    <div style={{ backgroundColor: "#F5F5F5", padding: "15px", marginTop: "10px" }}>
                      <FormContainer>
                        <AdaptableCard className="h-full p-4" bodyClass="h-full">
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
                              label={<p>Document Title <span style={{ color: 'red' }}>{'*'}</span></p>}
                              invalid={errors.title && touched.title}
                              errorMessage={errors.title}
                            >
                              <Field
                                // className='w-1/3'
                                type="text"
                                autoComplete="off"
                                name="title"
                                placeholder="Enter Document Title"
                                component={Input}
                              />
                            </FormItem>

                          </div>
                          <FormItem
                            label={<p>Allow File Format <span style={{ color: 'red' }}>{'*'}</span></p>}
                            invalid={touched.allow_file_format && (checkboxValues["pdf"] || checkboxValues["image"] || checkboxValues["document"] || checkboxValues["video"] || checkboxValues["audio"] || checkboxValues["spreadsheet"]) !== true}
                            errorMessage={"Please select at least one file type"}
                          >
                            <div style={{ display: "flex", marginTop: "7px", marginLeft: "3px" }}>
                              <p className='flex'>
                                <Field
                                  className='h-5 w-5'
                                  type="checkbox"
                                  name="allow_file_format.pdf"
                                  checked={checkboxValues["pdf"]}
                                  onChange={(e) => handleCheckboxChange(e, "pdf")}
                                  validate={validateCheckBox}
                                />
                                <label htmlFor="allow_file_format.pdf" className='mr-4 ml-2'>Pdf</label>
                              </p>
                              <p className='flex'>
                                <Field
                                  className='h-5 w-5'
                                  type="checkbox"
                                  name="allow_file_format.image"
                                  checked={checkboxValues["image"]}
                                  onChange={(e) => handleCheckboxChange(e, "image")}
                                  validate={validateCheckBox}
                                />
                                <label htmlFor="allow_file_format.image" className='mr-4 ml-2'>Image</label>
                              </p>
                              <p className='flex'>
                                <Field className='h-5 w-5'
                                  type="checkbox"
                                  name="allow_file_format.document"
                                  checked={checkboxValues["document"]}
                                  onChange={(e) => handleCheckboxChange(e, "document")}
                                  validate={validateCheckBox}
                                />
                                <label htmlFor="allow_file_format.document" className='mr-4 ml-2'>Document</label>
                              </p>

                            </div>
                            <div style={{ display: "flex", marginTop: "2%", marginLeft: "3px" }}>
                              <p className='flex'>
                                <Field
                                  className='h-5 w-5 '
                                  type="checkbox"
                                  name="allow_file_format.video"
                                  checked={checkboxValues["video"]}
                                  onChange={(e) => handleCheckboxChange(e, "video")}
                                  validate={validateCheckBox}
                                />
                                <label htmlFor="allow_file_format.video" className='mr-4 ml-2'>Video</label>
                              </p>
                              <p className='flex'>
                                <Field
                                  className='h-5 w-5'
                                  type="checkbox"
                                  name="allow_file_format.audio"
                                  checked={checkboxValues["audio"]}
                                  onChange={(e) => handleCheckboxChange(e, "audio")}
                                  validate={validateCheckBox}
                                />
                                <label htmlFor="allow_file_format.audio" className='mr-4 ml-2'>Audio</label>
                              </p>
                              <p className='flex'>
                                <Field
                                  className='h-5 w-5'
                                  type="checkbox"
                                  name="allow_file_format.spreadsheet"
                                  checked={checkboxValues["spreadsheet"]}
                                  onChange={(e) => handleCheckboxChange(e, "spreadsheet")}
                                  validate={validateCheckBox}
                                />
                                <label htmlFor="allow_file_format.spreadsheet" className='ml-2'>Spreadsheet</label>
                              </p>
                            </div>
                          </FormItem>
                          <div className="card md:grid grid-cols-2 gap-4  mt-6 ml-2">


                            {/* <FormItem label="Max no. of Files">
                              <Field
                                type="text"
                                autoComplete="off"
                                name="title"
                                placeholder="Enter the No."
                                component={Input}
                              />
                            </FormItem>
                            <FormItem
                              label="Max File Size(in MB)">
                              <Field
                                type="text"
                                autoComplete="off"
                                name="title"
                                placeholder="Enter the file size"
                                component={Input}
                              />


                            </FormItem> */}
                          </div>

                          <div style={{ width: "70%" }} className="ml-2">
                            <FormItem label="Description"
                            >
                              <Field name="description" >
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
                        </AdaptableCard>
                      </FormContainer>
                    </div>
                    <div className="mt-4 text-right flex justify-end">
                      <>
                        <Link
                          className="block lg:inline-block md:mb-0 mb-4"
                          to="/masterDataMenu-item-view-1"
                        >
                          <Button
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

                        <Button onClick={submitApi} variant='solid' style={{
                          fontStyle: 'normal',
                          fontSize: '18px',
                        }} >
                          {'Submit'}
                        </Button>
                      </>
                    </div>
                  </Form>

                </>
              )
            }}
          </Formik>
        </div>
      </div>
    </>
  )
}
