import {
    Input,
    InputGroup,
    Button,
    DatePicker,
    Select,
    FormItem,
    FormContainer,
    Card,
    Radio,
} from 'components/ui'
import { Field, Form, Formik } from 'formik'
import { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { apiGetTemplateByItemType, getProductCatgeory, setTableData, } from '../store/dataSlice'
import { OpenNotification } from 'views/Servicefile'
import { HiOutlineFilter, HiOutlineSearch } from 'react-icons/hi'
import { AdaptableCard } from 'components/shared'
import { useLocation } from 'react-router-dom'

export const productCategoryOptions = [
    { label: 'GPS TRACKERS', value: '1' },
    { label: 'SMART SECURITY SYSTEMS', value: '2' },
    { label: 'SMART MOBILES', value: '3' },

]
export const tempItemTypeOptions = [
    { label: "Product", value: 'P' },
    { label: "Data Plan", value: 'D' },
    { label: "Service Plan", value: 'S' }
]
const genderOptions = [
    { label: 'Airtel Inc.', value: 'M' },
    { label: 'Airtel Inc.', value: 'F' },
    { label: 'Airtel India', value: 'O' },
]

const validateSchemaP = Yup.object().shape({
    productCat: Yup.string().required('Please Select Product category').nullable(),
    tempItemType: Yup.string().required('Please Select Item type').nullable(),
})

const initialValues = {
    productCat : "",
    selectedTemplate: "",
    tempItemType: "",
}

const ItemProductCategorySelection = ({ onChange, refId, ...props }) => {
    const location = useLocation();
    const rowForEdit = location.state?.data
    const dispatch = useDispatch()
    const itemsProductcat = useSelector((state) => state?.itemsCreateList?.data?.itemsProductCatList)
    const templatesArr = useSelector((state) => state?.itemsCreateList?.data?.setTemplatesForItems)
    const {unq_id, enterAccount, password, rememberMe, usernameOrEmail, user_type, acc_mno_unq_id} = useSelector((state) => state.auth.user)
    const { pageIndex, pageSize, sort, query, total, sort_field } = useSelector(
        (state) => state.itemsCreateList.data.tableData
    )
    const [category,setCategory] = useState(props.itemIntials.itemTemplate.productCat)
    const [itemType,setItemType] = useState(props.itemIntials.itemTemplate.tempItemType)
    const [templates,setTemplates] = useState(templatesArr)
    const [itemTypeOpt,setItemTypeOpt] = useState()

    const [itemInitValues,setItemInitValues] = useState(initialValues)

    const fetchProductCategory = () => {
        dispatch(getProductCatgeory({unq_id: unq_id,user_type: user_type, acc_mno_unq_id: acc_mno_unq_id})) // remove acc_mno_unq_id if api changes done
    }

    useEffect(() => {
        fetchProductCategory()
    }, [dispatch])

    useEffect(() => {
        if(category && itemType) {
            setTemplates(templatesArr)
        }
    },[templatesArr,itemType])

    useEffect(()=>{
        if(rowForEdit){
            let a = {}
            a.category = props.itemIntials?.itemTemplate?.productCat
            a.type = props.itemIntials?.itemTemplate?.tempItemType
            a.unq_id = unq_id
            if(a.type !== ""){
                dispatch(apiGetTemplateByItemType(a))
            }
            setCategory(rowForEdit.rel_prod_cat_id)
            setItemType(rowForEdit.item_type)
        }
    },[])

    const onChangeDropdown = (form,field,obj,bool,values) => {
        form.setFieldValue(field.name, obj.value)
        if(bool){
            setItemType(obj.value)
            let a = {}
            a.category = values.productCat
            a.type = obj.value
            a.unq_id = unq_id
            if(obj.value !== ""){
                values.selectedTemplate = ''
                dispatch(apiGetTemplateByItemType(a))
            }
        }else{
            setCategory(obj.value)
            form.setFieldValue('tempItemType', '')
            form.setFieldValue('selectedTemplate', '')
            setTemplates([])
        }
    }

    const onChangeTemplateRadio =(form,field,e,values) => {
        form.setFieldValue(field.name,e)
        let selectedTemplateName 
        templates.map((ele,inde)=>{
            if(ele.id == e){
                selectedTemplateName = ele.tp_title
            }
        })
        values.selectedTemplateName = selectedTemplateName
    }

    const onChangeSearch = (e)=>{
        let str = e.target.value.toLowerCase()
        if(e.target.value != ''){
            let temps = []
            templates.map((i)=>{
                let flag = i?.tp_title?.toLowerCase().includes(str)
                if(flag){
                    temps.push(i)
                }
            })
            setTemplates(temps)
        }else{
            setTemplates(templatesArr)
        }
    }



    return (
        <>
            <Formik
                initialValues={props.itemIntials.itemTemplate}
                innerRef={refId}
                validationSchema={validateSchemaP}
                onSubmit={(values, { setSubmitting }) => {
                    if(!values.selectedTemplate){
                        OpenNotification("warning", "Please select a template")
                    }else{
                        setSubmitting(true)
                        let dataToStore = props.itemIntials
                        if(rowForEdit){
                            let selectedTemplateName = ''
                            templates.map((ele)=>{
                                if(values.selectedTemplate === ele.id){
                                    selectedTemplateName = ele.tp_title
                                }
                            })
                            values.selectedTemplateName = selectedTemplateName
                        }
                        dataToStore.itemTemplate = values
                        props.setItemInitials(dataToStore)
                        props.setStep(props.step + 1)
                    }
                }}
            >
                {({ values, touched, errors, isSubmitting }) => {
                    return (
                        <Form>
                            <FormContainer>
                                <AdaptableCard className="h-full mb-6" bodyClass="h-full" divider >
                                <div className="md:grid grid-cols-3 gap-4 mx-3">
                                    <FormItem
                                        label={<p>Item Category<span style={{ color: 'red' }}>*</span></p>}
                                        invalid={errors.productCat && touched.productCat}
                                        errorMessage={errors.productCat}
                                    >
                                        <Field name="productCat">
                                            {({ field, form }) => (
                                                <Select placeholder="Select Item Category" field={field} form={form}
                                                    options={itemsProductcat}
                                                    value={itemsProductcat?.filter((category) =>category.value ===values.productCat)}
                                                    onChange={(category) => onChangeDropdown(form,field,category,false,values)}
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        label={<p>Item Type<span style={{ color: 'red' }}>*</span></p>}
                                        invalid={errors.tempItemType && touched.tempItemType}
                                        errorMessage={errors.tempItemType}
                                    >
                                        <Field name="tempItemType">
                                            {({ field, form }) => (
                                                <Select placeholder="Select Item Type" field={field} form={form}
                                                    options={values.productCat !== "" ? tempItemTypeOptions : []}
                                                    value={tempItemTypeOptions?.filter((itemType) => itemType.value === values.tempItemType)}
                                                    onChange={(itemType) => onChangeDropdown(form,field,itemType,true,values)}
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                </div> 
                                </AdaptableCard>
                                <div className="flex justify-between mx-6">
                                    <Input
                                        // ref={searchInput}
                                        className="lg:w-52"
                                        size="sm"
                                        placeholder="Search Templates"
                                        prefix={<HiOutlineSearch className="text-lg" />}
                                        onChange={(e) => onChangeSearch(e) }
                                    />
                                    <Button
                                        size="sm"
                                        className="w-32"
                                        icon={<HiOutlineFilter />}
                                        onClick={() => { }}
                                        disabled
                                    >
                                        Filter
                                    </Button>
                                </div>
                                <div className="md:grid grid-cols-3 gap-3 mx-3">
                                    {templates?.map((item,index) => (
                                        <Card className="mx-3 mb-4 mt-4" key={item.id}>
                                        <div className="md:grid grid-cols-2">
                                            <h6 className="mx-2 mb-4 mt-1 font-bold text-cyan-500">
                                                {item.tp_title}{' '}
                                            </h6>
                                            <div className=" text-base text-black font-bold flex justify-end" >
                                            <FormItem>
                                                <Field name ='selectedTemplate'>
                                                    {({field,form}) => (
                                                        <Radio value={item.id} type='radio' key={index} 
                                                        onChange={(e)=> {onChangeTemplateRadio(form,field,e,values)}}
                                                        checked = {values.selectedTemplate === item.id ? true : false}
                                                        />
                                                    )}
                                                </Field>
                                            </FormItem>
                                            </div>
                                        </div>
                                        <div className="md:grid grid-cols-1">
                                            <div className="col-span-2 md:gird mx-2">
                                                <div className="col-span-1 md:grid grid-cols-1 gap-1">
                                                    <div className='flex flex-col'>
                                                        {/* <p className="mt-2 text-black font-bold text-base">{item.tp_desc}</p> */}
                                                        <p className="mt-2 text-base">{item.tp_desc}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </Card>
                                        
                                    ))}
                                    </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>


        </>
    )
}

export default ItemProductCategorySelection
