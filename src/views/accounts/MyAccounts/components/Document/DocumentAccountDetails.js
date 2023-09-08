import React, { useEffect, useRef, useState } from 'react'
// import StepControlled from './StepControlled'
// import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Input, FormItem, FormContainer, Select, Button, Radio, Alert } from 'components/ui'
// import { NAV_MODE_THEMED } from 'constants/theme.constant'


import { Formik, Form, Field, FieldArray, useFormikContext } from 'formik'
import * as yup from 'yup'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDocTypeDropdown } from '../../store/dataSlice'
import { apiCreateDocPolicy, apiUpdateDocPolicy } from 'services/MyAccountService'
import { EditValuesToFields } from 'utils/campareandCopy'
import { GetErrorMsg } from 'views/Servicefile'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { OpenNotification } from 'views/Servicefile'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'
import { AdaptableCard } from 'components/shared'

const accTypeOptions = [
  {label: "Operator",value:"Operator"},
  {label: "Provider",value:"Provider"},
  {label: "Partner",value:"Partner"},
  {label: "Enterprise Customer",value:"Enterprise Customer"},
  {label: "Retail Customer",value:"Retail Customer"},
]

const fileSizeOptions = [
  {label : '5 MB',value  : 5},
  {label : '10 MB',value  : 10},
  {label : '15 MB',value  : 15},
  {label : '20 MB',value  : 20},
]

const noOfFilesAllowed = [
  {label : '1',value : 1},
  {label : '2',value : 2},
  {label : '3',value : 3},
  {label : '4',value : 4},
  {label : '5',value : 5},
]

const docPolicyInitValues =  {
  policyTitle : "",
  accountType : "",
  filesToBeUploaded : [{
    docType : "",
    mandatoryOrOptional : ""
  }],
  maxFileSize : "",
  maxNoOfFiles : ""
}

const docPolicyValidSchema = yup.object().shape({
  policyTitle : yup.string().required("Please enter policy title").trim().nullable(),
  accountType : yup.string().required("Please select an account type").nullable(),
  maxFileSize : yup.string().required("Please select a max file size").nullable(),
  maxNoOfFiles : yup.string().required("Please select max no.of files allowed").nullable(),
  filesToBeUploaded : yup.array().of(
    yup.object().shape({
      docType : yup.string().required("Please select a document type"),
      // mandatoryOrOptional : yup.string().required("Select Mandatory/Optional")
    })
  )
})


const DocumentAccountDetails = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formikRef = useRef()
  const location = useLocation();
  const mode = location.state?.mode ? location.state.mode : "ADD";
  const rowForEdit = location.state?.data;
  const [initialState,setInitValues] =  useState(rowForEdit?EditValuesToFields(docPolicyInitValues, rowForEdit):docPolicyInitValues)
  const [message, setMessage] = useTimeOutMessage()
  const [docMessage, setDocMessage] = useTimeOutMessage()

  const docTypeOptions = useSelector(state => state.myaccountList?.data?.docTypeDropdownList)
  
  const { enterAccount, password, rememberMe, usernameOrEmail,acc_mno_id} = useSelector((state) => state.auth.user)

  const [filteredDrp,setFilteredDrp] = useState(docTypeOptions) 

  const submitApi = async(values) => {
      let payload = {
        "policy_name": values.policyTitle.trim(),
        "acc_type":values.accountType,
        "doc_type":JSON.stringify(values.filesToBeUploaded.map(e => {
          let obj = {}
          obj.doc_type_id = e.docType
          obj.doc_type_name = docTypeOptions.find(type => type.value === e.docType)?.label;
          obj.is_mandatory = e.mandatoryOrOptional === 'mandatory' ? true : false
          // obj.doc_name = docTypeOptions.find( f => f.value === e.docType).label
          return obj
        })),
        "dgl_acc_mno":acc_mno_id,
        "status":"ACTIVE",
        "maximum_file_size": values.maxFileSize,
        "mximunm_no_of_files" : values.maxNoOfFiles
      }
    if(mode === "ADD"){
      const resp = await apiCreateDocPolicy(payload)
      if (resp.status=== 'success') {
       
        OpenNotification('success','Created successfully ')
          navigate('/account-menu-item-view-1/documents')
         
     
      }else if (resp.status === 'failed') {
        // setMessage(GetErrorMsg(resp));
        let data = GetErrorMsg(resp)
        let mess = Array.isArray(data)? data.join(", "): data
        OpenNotification('danger',mess)
      }
    } else if(mode === "EDIT"){
      payload.id = rowForEdit.id
      const resp = await apiUpdateDocPolicy(payload)
      if (resp.status=== 'success') {
      
        OpenNotification('success', 'Updated successfully')
          navigate('/account-menu-item-view-1/documents')
         
      
      }else if (resp.status === 'failed') {
        // setMessage(GetErrorMsg(resp));
        let data = GetErrorMsg(resp)
        let mess = Array.isArray(data)? data.join(", "): data
        OpenNotification('danger',mess)
      }
    }
  }

  const onRadioChange = (e,i,v) => {
    v.filesToBeUploaded[i].mandatoryOrOptional = e
  }

  useEffect(() => {
    dispatch(getDocTypeDropdown(enterAccount))
  },[])
  useEffect(()=>{
    if(docTypeOptions?.length){
      setFilteredDrp(docTypeOptions)
    }
  },[docTypeOptions])

  const onAdding = (values,index,push) => {
    if((docTypeOptions.length > values.filesToBeUploaded.length)){ 
      if(values.filesToBeUploaded[index].docType !== ""){
        let filteredArr = filteredDrp.filter(e => e.value != values.filesToBeUploaded[index].docType)
        setFilteredDrp(filteredArr)
        push({docType : "",mandatoryOrOptional : "optional", isChecked:"true"})
      }else {
        setDocMessage(`Select ${index+1} Document Type`)
      }
    }else{
      setDocMessage(`Choosen ${docTypeOptions.length} Document Types`)
    }
  }

  const onRemove = (values,index,remove) => {
      docTypeOptions.find(e => e.value === values.filesToBeUploaded[index].docType)
      remove(index)
  }

  const setDropdownValue = (values,form,field,v)=>{
    let flag = values.filesToBeUploaded.some(item => item.docType === v.value)
    if(!flag){
      form.setFieldValue(field.name,v.value)
     }
  }

  let breadCrumbList = [{
    name: 'Accounts',
    // link:"/account-menu-item-view-1/accounts"
}, {
    name: 'My Account',
    link: "/account-menu-item-view-1/documents"
}, {
    name: `Create Document Policy`,
}]

if (mode === "EDIT") {
    breadCrumbList = [
        {
            name: 'Accounts',
            // link:"/account-menu-item-view-1/accounts",
        },
        {
            name: 'My Account',
            link: "/account-menu-item-view-1/documents",
        },
        {
          name: rowForEdit?.policy_name,
          link: '/account-menu-item-view-1/documents',
          state:rowForEdit
      },
        
        {
            name: "Edit Document Policy"
        },
    ]
}


  return (
    <>
      <div> 
        {/* Account/My Accounts/{mode === "EDIT" ? "Edit" : "Create"}  */}
        <CustomBreadcrumbs list={breadCrumbList} />
        </div>
      <div className='mt-3'>
        <h3>{mode === "EDIT" ? "Edit" : "Create"} Document Policy</h3>
        {message && 
        <Alert className="mb-4" type="danger" showIcon>
          {message}
        </Alert>}
        <div>
          <Formik innerRef={formikRef}
            initialValues={initialState}
            validationSchema={docPolicyValidSchema}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true)
              submitApi(values)
            }}
          >
            {({ values, touched, errors, isSubmitting }) => {
              return (
                <>
                    <Form>
                  <div style={{ backgroundColor: "#F5F5F5", padding: "15px 15px 15px 15px", marginTop: "10px" }}>
                      <FormContainer>
                      <AdaptableCard className="h-full p-4" bodyClass="h-full">
                          <h5 className='mb-2 ml-4 mb-5'>BASIC DETAILS</h5>

                          <div className='md:grid grid-cols-4 gap-6 mx-4 '>
                            <FormItem
                              label={<p>Policy Title <span style={{color:"red"}}>*</span></p>}
                              invalid={errors.policyTitle && touched.policyTitle}
                              errorMessage={errors.policyTitle}
                            >
                              <Field
                                type="text"
                                autoComplete="off"
                                name="policyTitle"
                                placeholder="Enter Policy Title"
                                component={Input}
                              />
                            </FormItem>
                            <FormItem
                              label={<p>Account Type <span style={{color:"red"}}>*</span></p>}
                              invalid={errors.accountType && touched.accountType}
                              errorMessage={errors.accountType}
                            >
                              <Field name="accountType">
                                {({ field, form }) => (
                                  <Select
                                    placeholder="Select Account Type"
                                    field={field}
                                    form={form}
                                    options = {accTypeOptions}
                                    value = {accTypeOptions?.filter((type) => type.value === values.accountType)}
                                    onChange = {(v) => form.setFieldValue(field.name,v.value)}
                                  />
                                )}
                              </Field>
                            </FormItem>

                          </div>
                          <hr style={{ border: "dotted 1px solid gray", marginLeft: "13px", marginRight: "13px" }} />
                          <h5 className='ml-4 mt-4 mb-5'>FILES TO BE UPLOADED</h5>
                          <FieldArray name='filesToBeUploaded'>
                            {({ push, remove }) => (
                              <div>
                                {values.filesToBeUploaded.map((item,index) => {
                                  return (
                                    <>
                                    <FormContainer>
                                    <div className='md:grid grid-cols-4 gap-4 mx-4 mt-2'>
                                    <FormItem label={<p>Document Type <span style={{color:"red"}}>*</span></p>}
                                      invalid={errors.docType && touched.docType}
                                      errorMessage={errors.docType}
                                    >
                                      <Field name={`filesToBeUploaded[${index}].docType`}>
                                        {({ field, form }) => (
                                          <Select
                                            placeholder="Select Document Type"
                                            field={field}
                                            form={form}
                                            options={docTypeOptions}
                                            //isDisabled = {(index < values.filesToBeUploaded.length-1) ? true : false}
                                            value={docTypeOptions?.filter(obj => obj.value === values.filesToBeUploaded[index].docType)}
                                            onChange={(v) => setDropdownValue(values,form,field,v)}

                                          />
                                        )}
                                      </Field>
                                      {touched.filesToBeUploaded && touched.filesToBeUploaded[index] && errors.filesToBeUploaded && errors.filesToBeUploaded[index]?.docType && (
                                          <div style={{color:"red"}}>{errors.filesToBeUploaded[index]?.docType}</div>)}
                                    </FormItem>
                                    <FormItem
                                      invalid={errors.mandatoryOrOptional && touched.mandatoryOrOptional}
                                      errorMessage={errors.mandatoryOrOptional}
                                    >
                                      <Field name={`filesToBeUploaded[${index}].mandatoryOrOptional`}>
                                        {({field,form}) => {
                                          return (
                                            <div className='mt-10'>
                                              <Radio.Group 
                                                value={field.value}
                                                onChange={(val) =>form.setFieldValue(field.name, val)}
                                              >
                                                <Radio value="mandatory" >Mandatory</Radio>
                                                <Radio value="optional">Optional</Radio>
                                              </Radio.Group>
                                            </div>
                                          )
                                        }}
                                      {/* <Radio.Group className='ml-8' 
                                        value={`filesToBeUploaded[${index}].mandatoryOrOptional`} 
                                        onChange = {(e)=>onRadioChange(e,index,values)}>
                                        <Radio value="mandatory" >Mandatory</Radio>
                                        <Radio value="optional" >Optional</Radio>
                                      </Radio.Group> */}
                                      </Field>
                                      {/* {touched.filesToBeUploaded && touched.filesToBeUploaded[index] && errors.filesToBeUploaded && errors.filesToBeUploaded[index]?.mandatoryOrOptional && (
                                          <div style={{color:"red"}}>{errors.filesToBeUploaded[index]?.mandatoryOrOptional}</div>)} */}
                                      </FormItem>
                                      <div >
                                        <Button className='mt-8 border-cyan-500'
                                          shape="circle"
                                          size="md"
                                          type="button"
                                          icon={<HiPlus  />}
                                          onClick={() => onAdding(values,index,push)}
                                          disabled = {(index < values.filesToBeUploaded.length-1) ? true : false}
                                        
                                        />
                                        {values.filesToBeUploaded.length > 1 &&
                                        <Button className='mx-4 mt-8 border-red-500'
                                          shape="circle"
                                          size="md"
                                          type="button"
                                          icon={<HiMinus />}
                                          onClick={() => onRemove(values,index,remove)}
                                        />}
                                      </div>
                                    </div>
                                    </FormContainer>
                                    </>
                                  )
                                })}
                              </div>
                            )}
                          </FieldArray>
                          {docMessage && 
                          <Alert className="mb-4" type="info" showIcon>
                            {docMessage}
                          </Alert>}
                          <hr style={{ border: "dotted 1px solid gray", marginLeft: "13px", marginRight: "13px" }} />
                          <div className='mt-6'>
                            <h5 className='mb-2 ml-4 mb-5'>ADDITIONAL FILE SETTINGS</h5>
                            <div className='md:grid grid-cols-4 gap-6 mx-4 '>
                              <FormItem
                                label={<p>Maximum File Size Allowed <span style={{color:"red"}}>*</span></p>}
                                invalid={errors.maxFileSize && touched.maxFileSize}
                                errorMessage={errors.maxFileSize}
                              >
                                <Field name="maxFileSize">
                                  {({ field, form }) => (
                                    <Select
                                      placeholder="Select Maximum File Size"
                                      field={field}
                                      form={form}
                                      options={fileSizeOptions}
                                      value = {fileSizeOptions?.filter(obj => obj.value=== values.maxFileSize)}
                                      onChange = {(obj) => form.setFieldValue(field.name,obj.value)}
                                    />
                                  )}
                                </Field>
                              </FormItem>
                              <FormItem
                                label={<p>Maximum No. of Files Allowed <span style={{color:"red"}}>*</span></p>}
                                invalid={errors.maxNoOfFiles && touched.maxNoOfFiles}
                                errorMessage={errors.maxNoOfFiles}
                              >
                                <Field name="maxNoOfFiles">
                                  {({ field, form }) => (
                                    <Select
                                      placeholder="Select Maximum No. Of File "
                                      field={field}
                                      form={form}
                                      options={noOfFilesAllowed}
                                      value = {noOfFilesAllowed?.filter(obj => obj.value=== values.maxNoOfFiles)}
                                      onChange = {(obj) => form.setFieldValue(field.name,obj.value)}
                                    />
                                  )}
                                </Field>
                              </FormItem>

                            </div>
                          </div>
                        </AdaptableCard>
                      </FormContainer>
                      </div>
                        <div className="mt-4 text-right" >
                            <Link
                                className="block lg:inline-block md:mb-0 mb-4"
                                to='/account-menu-item-view-1/documents'
                                >
                            <Button 
                                className="mx-2"
                                variant="solid"
                                style={{ backgroundColor: "#4D4D4D" }}
                                >
                                Cancel
                            </Button>
                            </Link>
                            <Button  type='submit'
                                className="mx-2"
                                variant='solid'
                                >
                                Submit For Approval
                            </Button>
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

export default DocumentAccountDetails;