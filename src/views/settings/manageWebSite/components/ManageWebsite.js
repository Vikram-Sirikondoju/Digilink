
import React, { useEffect } from 'react'
import RichTextEditor from 'components/shared/RichTextEditor'
import {
    Input,
    Button,
    FormItem,
    FormContainer,
    Select,
    DatePicker,
    Dialog,
    Alert,
} from 'components/ui'

import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { Upload } from 'components/ui'
import { HiMinus, HiOutlineCloudUpload, HiPlus } from 'react-icons/hi'
import { useState } from 'react'
// import { date } from 'yup'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { getManageWebSite, getProductCategory } from '../store/dataSlice'
import { injectReducer } from 'store'
import reducer from '../store'
import { apiManagewebSite, apiUploadFiles } from 'services/ManageWebsiteServicefile'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile'
import CloseButton from 'components/ui/CloseButton'
import appConfig from 'configs/app.config'
import CreatableSelect from 'react-select/creatable'
import { cloneDeep, values } from 'lodash'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { defaultBaseSortFn } from 'match-sorter'
import dayjs from 'dayjs'
import { AdaptableCard } from 'components/shared'

const validationSchema = Yup.object().shape({
    // slider_img_id:Yup.string().trim().required("Please upload slider image").nullable(),
    resolution:Yup.string().trim().required("Please enter resolution").nullable(),
    // description:Yup.string().trim().required("Please enter description").nullable(),
    // category:Yup.string().trim().required("Please select category").nullable(),
    // best_seller:Yup.string().trim().required("Please select best seller").nullable(),
    // recommended_solution:Yup.string().trim().required("Please select recommend solution").nullable(),
    // recently_added_solutions:Yup.string().trim().required("Please select recently added solution").nullable(),
    // commercial_iot_products: Yup.string().trim().required("Please select commercial solutions").nullable(),
    sponsored_solutions:Yup.string().trim().required("Start date required").nullable(),
    // select_sponsored_solutions:Yup.string().trim().required("Please select sponsored solutions").nullable(),
    // top_offers:Yup.string().trim().required("Please select top offers").nullable(),
})

const initValues = {
    slider_img_id:"",
    resolution:"",
    description:"",
    category:[],
    best_seller:[],
    recommended_solution:[],
    recently_added_solutions:[],
    commercial_iot_products: [],
    sponsored_solutions:"",
    select_sponsored_solutions:[],
    top_offers:[],
    unq_id:"",
    id : ""
}

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

const optionList = [
    { value: "Tag1", label: "Tag1" },
    { value: "Tag2", label: "Tag2" },
    { value: "tag3", label: "tag3" },
    { value: "Tag4", label: "Tag4" },
    { value: "Tag5", label: "Tag5" }
];
injectReducer('manageWebsite',reducer)
const saveFilesInManageWebSite = 1
function ManageWebsite() {
    const [multiDropDown, setMultiDropDown] = useState()
    const [initialValues, setInitialValues] = useState(initValues)

    function handleSelect(data) {
        setMultiDropDown(data);
    }

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { enterAccount,acc_user_id,acc_unq_id} = useSelector((state) => state.auth.user)
    const productCategoryList = useSelector((state) => state.manageWebsite?.data?.productCatList)
    const getManageWebSiteData = useSelector((state) => state.manageWebsite?.data?.getManageWebSiteData)

    useEffect(()=>{
        dispatch(getProductCategory({ enterAccount }))
    },[dispatch])

    const beforeUpload = async (newFiles, files) => {
        const file = newFiles[0];
        const allowedTypes = ['image/jpeg', 'image/png'];

        if (!allowedTypes.includes(file.type)) {
            OpenNotification('warning', 'JPG/PNG files are allowed only!')
            return false;
        }
        try {
            const ress = await apiUploadFiles(newFiles[0], acc_user_id, saveFilesInManageWebSite)
            return ress
        } catch (error) {
            console.error('Error during file upload:', error);
            return false;
        }
    }

    const [showContent, setShowContent] = useState(false)
    const [content, setContent] = useState(null)
    const [message, setMessage] = useTimeOutMessage()

    const onClickView = (fileInfo) => {
        setShowContent(true)
        setContent(fileInfo)
    }

    const onSaveValues = async(values) => {
        let payload = cloneDeep(values)
        payload.category = values.category?.map(e => e.value).join(",")
        payload.best_seller = values.best_seller?.map(e =>  e.value).join(",")
        payload.recommended_solution = values.recommended_solution?.map(e => e.value).join(",")
        payload.recently_added_solutions = values.recently_added_solutions?.map(e => e.value).join(",")
        payload.commercial_iot_products = values.commercial_iot_products?.map(e => e.value).join(",")
        payload.select_sponsored_solutions = values.select_sponsored_solutions?.map(e => e.value).join(",")
        payload.top_offers = values.top_offers?.map(e => e.value).join(",")
        payload.id = getManageWebSiteData[0].id
        payload.unq_id = enterAccount
        let isValid  = true
        if(payload.slider_img_id === ""){
            isValid = false
        }
        if(isValid){
            const resp = await apiManagewebSite(payload)
            if (resp.status=== 'success') {
            OpenNotification("success", 'Updated  successfully')
                setInitialValues(values)
            }else if (resp.status === 'failed') {
            setMessage(GetErrorMsg(resp));
              setInitialValues(values)
            }
        }else{
            OpenNotification("warning","Please upload image")
            setInitialValues(values)
        }
    }

    const fetchingByfilter = (a,b) => {
        let filterArr = a.filter(e => {
            return b.find(f => {
                return e.value === f
            })
        })
        return filterArr
    }

    useEffect(()=>{
        dispatch(getManageWebSite({enterAccount:enterAccount}))
    },[dispatch,enterAccount])

    useEffect(()=>{
        if(getManageWebSiteData){
            let obj = {...getManageWebSiteData[0]}
            let bsNumArr = getManageWebSiteData[0]?.best_seller?.split(",").map(Number)
            obj.best_seller = fetchingByfilter(productCategoryList,bsNumArr)

            let categoryNumArr = getManageWebSiteData[0]?.category?.split(",").map(Number)
            obj.category = fetchingByfilter(productCategoryList,categoryNumArr)

            let crsNumArr = getManageWebSiteData[0]?.recommended_solution?.split(",").map(Number)
            obj.recommended_solution = fetchingByfilter(productCategoryList,crsNumArr)

            let rasNumArr = getManageWebSiteData[0]?.recently_added_solutions?.split(",").map(Number)
            obj.recently_added_solutions = fetchingByfilter(productCategoryList,rasNumArr)

            let ccsNumArr = getManageWebSiteData[0]?.commercial_iot_products?.split(",").map(Number)
            obj.commercial_iot_products = fetchingByfilter(productCategoryList,ccsNumArr)

            let sssNumArr = getManageWebSiteData[0]?.select_sponsored_solutions?.split(",").map(Number)
            obj.select_sponsored_solutions = fetchingByfilter(productCategoryList,sssNumArr)

            let offerNumArr = getManageWebSiteData[0]?.top_offers?.split(",").map(Number)
            obj.top_offers = fetchingByfilter(productCategoryList,offerNumArr)

            obj.sponsored_solutions = dayjs(getManageWebSiteData[0]?.sponsored_solutions, 'YYYY-MM-DD')?.toDate()

            setInitialValues(obj)
        }
    },[getManageWebSiteData])

    return (
        <>
        {message && 
                <Alert className="mb-4" type="danger" showIcon>
                {message}
                </Alert>}
            <div className='mt-5'>
                <h3>Manage Website</h3> {/* form table start here  */}
                <div>
               {initialValues?.best_seller?.length  &&
                <Formik initialValues={initialValues} validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true)
                        onSaveValues(values)
                    }}
                >
                    {({ values, touched, errors, isSubmitting, handleSubmit }) => {
                    return (
                        <>
                            <Form onSubmit={handleSubmit}>
                                    <div style={{ backgroundColor: "#F5F5F5", padding: "15px ", marginTop: "10px" }}>
                                <FormContainer>
                                <AdaptableCard className="h-full p-4" bodyClass="h-full">
                                        {/* <div style={{ backgroundColor: "white", padding: "15px 15px" }} className=" gap-4 mx-4"> */}
                                        <h5>CHOOSE SLIDER IMAGE</h5>
                                        <div style={{ widows: "auto", display: "flex", gap: "10px", marginTop: "10px" }}>
                                            <div className='h-20 w-24 border-2 '></div>
                                            <div className='h-20 w-24 border-2 '></div>
                                            <div className='h-20 w-24 border-2 '></div>
                                            <div className='h-20 w-24 border-2 '></div>
                                            <div className='h-20 w-24 border-2 '></div>
                                        </div>
                                        <div className='mt-4'>
                                            <Button className=" bg-gray-100" type='button'>Set As Slider</Button>
                                        </div>
                                        <h6 className='mt-6'>OR</h6>
                                        <div className='mt-4'>
                                            <FormItem label={<p>UPLOAD IMAGE <span style={{ color: "red" }}>{'*'}</span></p>}>
                                                <Field name='slider_img_id'>
                                                    {({field,form}) => (
                                                    <div className='w-96 h-40  '>
                                                    <Upload className="h-28 " draggable
                                                        beforeUpload={beforeUpload}
                                                        onChange={(updatedFiles, files, uploadRes, filesDetails) => {
                                                            form.setFieldValue(field.name, uploadRes?.data?.fileUnqId);
                                                        }}>
                                                    <div className=" text-center p-4">
                                                        <div className="text-6xl mt-4 flex justify-center ">
                                                            <HiOutlineCloudUpload />
                                                        </div>
                                                        <p className="font-semibold">
                                                            <span className="text-gray-800 dark:text-inherit">
                                                                Drop your image here, or{' '}
                                                            </span>
                                                            <span className="text-blue-500">browse</span>
                                                        </p>
                                                        <p className="pb-6">
                                                            Support: jpeg, png, gif
                                                        </p>
                                                    </div>
                                                    </Upload>
                                                    {values.slider_img_id &&
                                                    <div className="upload-file cursor-pointer h-12 w-120" >
                                                        <div className="upload-file-info" onClick={() => onClickView(values.slider_img_id)}>
                                                            <h6 className="upload-file-name">{values.slider_img_id.substring(0, 15)}</h6>
                                                        </div>
                                                        <CloseButton className="upload-file-remove " onClick={() => { form.setFieldValue(field.name, ''); }} />
                                                    </div>}
                                                    </div>
                                                    )}
                                                </Field>
                                            </FormItem>
                                            {/* <div className="mb-4 "><h6>UPLOAD IMAGE</h6></div>
                                            <div className='w-96 h-28  '>
                                                
                                            </div>*/}
                                        </div> 
                                        <div className='mt-6 card md:grid grid-cols-2 gap-4  mt-6 '>
                                            <FormItem label={<p>Resolution <span style={{ color: "red" }}>{'*'}</span></p>}>
                                                <Field type="text" autoComplete="off" placeholder="Enter resolution" component={Input}
                                                    name="resolution"/>
                                                <ErrorMessage name={'resolution'}>{e => <div style={{color:"red"}}>{e}</div>}</ErrorMessage>
                                            </FormItem>
                                        </div>
                                        <div style={{ width: "70%" }}>
                                            <FormItem label={<p>Description</p>}>
                                                <Field name="description"  >
                                                    {({ field, form }) => (
                                                        <RichTextEditor
                                                            value={field.value} 
                                                            onChange={(val) =>form.setFieldValue(field.name, val)}
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage name={'description'}>{e => <div style={{color:"red"}}>{e}</div>}</ErrorMessage>
                                            </FormItem>
                                        </div>
                                        <div className='mt-6 card md:grid grid-cols-2 grid-rows-4 mt-6 '>
                                            <FormItem label={<p>Choose Category<span style={{ color: 'red' }}>{'*'}</span></p>}>
                                                <Field name="category" validate={async (v) => {
                                                    if (values.category.length < 1) {
                                                        try{await Yup.string().required('Please select category').validate(v[0]?.label)}
                                                        catch (error) {return error.message}
                                                    }}}
                                                    >
                                                    {({ field, form }) => (
                                                        <Select className="w-2/3" placeholder="Select Category" field={field} form={form}
                                                            options={productCategoryList} componentAs={CreatableSelect} isMulti
                                                            onChange={(operator) => form.setFieldValue(field.name,operator)}
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage name={'category'}>{e => <div style={{color:"red"}}>{e}</div>}</ErrorMessage>
                                            </FormItem>
                                            <FormItem label={<p>Choose Best Seller<span style={{ color: 'red' }}>{'*'}</span></p>}>
                                                <Field name="best_seller" validate={async (v) => {
                                                    if (values.best_seller.length < 1) {
                                                        try{await Yup.string().required('Please select best seller').validate(v[0]?.label)}
                                                        catch (error) {return error.message;}
                                                    }}}>
                                                    {({ field, form }) => (
                                                        <Select className="w-2/3" placeholder="Select Best Seller" field={field} form={form}
                                                            options={productCategoryList} componentAs={CreatableSelect} isMulti
                                                            onChange={(operator) => form.setFieldValue(field.name,operator)}
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage name={'best_seller'}>{e => <div style={{color:"red"}}>{e}</div>}</ErrorMessage>
                                            </FormItem>
                                            <FormItem label={<p>Choose Recommended Solutions<span style={{ color: 'red' }}>{'*'}</span></p>}>
                                                <Field name="recommended_solution" validate={async (v) => {
                                                    if (values.recommended_solution.length < 1) {
                                                        try{await Yup.string().required('Please select recommended solution').validate(v[0]?.label)}
                                                        catch (error) {return error.message;}
                                                    }}}>
                                                    {({ field, form }) => (
                                                        <Select className="w-2/3" placeholder="Select Recommended Solutions" field={field} form={form}
                                                            options={productCategoryList} componentAs={CreatableSelect} isMulti
                                                            onChange={(operator) => form.setFieldValue(field.name,operator)}
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage name={'recommended_solution'}>{e => <div style={{color:"red"}}>{e}</div>}</ErrorMessage>
                                            </FormItem>
                                            <FormItem label={<p>Recently Added Solutions<span style={{ color: 'red' }}>{'*'}</span></p>}>
                                                <Field name="recently_added_solutions" validate={async (v) => {
                                                    if (values.recently_added_solutions.length < 1) {
                                                        try{await Yup.string().required('Please select added solution').validate(v[0]?.label)}
                                                        catch (error) {return error.message;}
                                                    }}}>
                                                    {({ field, form }) => (
                                                        <Select className="w-2/3" placeholder="Select Recently Added Solutions" field={field} form={form}
                                                            options={productCategoryList} componentAs={CreatableSelect} isMulti
                                                            onChange={(operator) => form.setFieldValue(field.name,operator)}
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage name={'recently_added_solutions'}>{e => <div style={{color:"red"}}>{e}</div>}</ErrorMessage>
                                            </FormItem>
                                            <FormItem label={<p>Choose Commercial Solutions<span style={{ color: 'red' }}>{'*'}</span></p>}>
                                                <Field name="commercial_iot_products" validate={async (v) => {
                                                    if (values.commercial_iot_products.length < 1) {
                                                        try{await Yup.string().required('Please select Commercial solution').validate(v[0]?.label)}
                                                        catch (error) {return error.message;}
                                                    }}}>
                                                    {({ field, form }) => (
                                                        <Select className="w-2/3" placeholder="Select Commercial Solutions" field={field} form={form}
                                                            options={productCategoryList} componentAs={CreatableSelect} isMulti
                                                            onChange={(operator) => form.setFieldValue(field.name,operator)}
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage name={'commercial_iot_products'}>{e => <div style={{color:"red"}}>{e}</div>}</ErrorMessage>
                                            </FormItem>
                                            
                                            <div className='md:grid grid-cols-3'>
                                                <FormItem label={<p>Sponsored Solution<span style={{ color: "red" }}>{'*'}</span></p>}>
                                                    <Field name="sponsored_solutions" >
                                                        {({ field, form }) => (
                                                            <DatePicker  className="w-40"
                                                                value={values.sponsored_solutions} placeholder="Start Date" field={field}form={form}
                                                                onChange={(date) => {form.setFieldValue(field.name,date)}}
                                                            />
                                                        )}
                                                    </Field>
                                                    <ErrorMessage name={'sponsored_solutions'}>{e => <div style={{color:"red"}}>{e}</div>}</ErrorMessage>
                                                </FormItem>
                                                <FormItem style={{marginTop:"30px"}}>
                                                    <Field name="">
                                                        {({ field, form }) => (
                                                            <DatePicker className="w-40 ml-4" 
                                                                value={''} placeholder="End Date" field={field}form={form}
                                                                // onChange={(date) => {form.setFieldValue(field.name,date)}}
                                                            />
                                                        )}
                                                    </Field>
                                                </FormItem>
                                            </div>
                                            <FormItem label={<p>Select Sponsered Solution<span style={{ color: 'red' }}>{'*'}</span></p>}>
                                                <Field name="select_sponsored_solutions" validate={async (v) => {
                                                    if (values.select_sponsored_solutions.length < 1) {
                                                        try{await Yup.string().required('Please select sponsered solution').validate(v[0]?.label)}
                                                        catch (error) {return error.message;}
                                                    }}}>
                                                    {({ field, form }) => (
                                                        <Select className="w-2/3" placeholder="Select Sponsored Solution" field={field} form={form}
                                                            options={productCategoryList} componentAs={CreatableSelect} isMulti
                                                            onChange={(operator) => form.setFieldValue(field.name,operator)}
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage name={'select_sponsored_solutions'}>{e => <div style={{color:"red"}}>{e}</div>}</ErrorMessage>
                                            </FormItem>
                                            <FormItem label={<p>Top Offers<span style={{ color: 'red' }}>{'*'}</span></p>}>
                                                <Field name="top_offers" validate={async (v) => {
                                                    if (values.top_offers.length < 1) {
                                                        try{await Yup.string().required('Please select offers').validate(v[0]?.label)}
                                                        catch (error) {return error.message;}
                                                    }}}>
                                                    {({ field, form }) => (
                                                        <Select className="w-2/3" placeholder="Select Offers" field={field} form={form}
                                                            options={productCategoryList} componentAs={CreatableSelect} isMulti
                                                            onChange={(operator) => form.setFieldValue(field.name,operator)}
                                                        />
                                                    )}
                                                </Field>
                                                <ErrorMessage name={'top_offers'}>{e => <div style={{color:"red"}}>{e}</div>}</ErrorMessage>
                                            </FormItem>
                                        </div>
                                    {/* </div> */}
                                    </AdaptableCard>
                                </FormContainer>
                                    </div>
                            <div className="mt-4 text-right">
                            <>
                                <Link className="block lg:inline-block md:mb-0 mb-4"
                                    //  to="/settings-menu-manage-web-site"
                                    to='/home'
                                >
                                    <Button className="mx-2" type='button' style={{backgroundColor: "#4D4D4D",  fontStyle: 'normal',fontSize: '18px'}} variant="solid">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button variant="solid" type="submit" style={{color: "white",  fontStyle: 'normal',fontSize: '18px'}}>
                                    Save
                                </Button>
                                {/* <Button
                                    className="mx-2"
                                    style={{ background: "linear-gradient(90deg, #725CF8 0%, #1ED4D4 100%)", color:"white" }}
                                    type="submit"
                                >
                                    Save
                                </Button> */}
                            </>

                            </div>
                        </Form>
                    </>
                )}}
            </Formik>}
            <Dialog isOpen={showContent}
                onClose={() => setShowContent(false)}>
                <div className='p-5'>
                    <img src={`${appConfig.apiPrefix}/media/uniqid/${content?.file_url}`} alt="Content" />
                    <Button onClick={() => window.open(`${appConfig.apiPrefix}/media/uniqid/${content?.file_url}`, '_blank')} className='mt-2' variant='solid'>Download</Button>
                </div>
            </Dialog>
            </div>
        </div >
        </>
    )
}

export default ManageWebsite