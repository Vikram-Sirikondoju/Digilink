import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Steps, Button } from 'components/ui'
import NewOperators from './NewItems'
import ItemDetails from './ItemDetails'
import { AdaptableCard } from 'components/shared'
import MasterPermissionBox from './MasterPermissionBox'
import ItemTemplate from './ItemTemplate'
import ItemPreview from './ItemPreview'
import ItemVariant from './ItemVariants'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { apiCreateItem } from 'services/ItemsService'
import { BiArrowBack } from 'react-icons/bi'
import { itemEditFieldsToState } from 'utils/campareandCopy'
import { setTemplatesForItems, getTemplateComponents } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import { cloneDeep } from 'lodash'
import ReactHtmlParser from 'html-react-parser'
import { OpenNotification } from 'views/Servicefile'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'
const Controlled = () => {

    const location = useLocation();
    const rowForEdit = location.state?.data;
    const mode = location.state?.mode ? location.state.mode : 'ADD'
    const [step, setStep] = useState(0)
    const [chooseTemplate, setChooseTemplate] = useState()
    const [itemDetails, setDetails] = useState()
    const [itemVarients, setItemVarients] = useState()
    const [itemCreate, setItemCreate] = useState()


    const { unq_id, role_name, enterAccount, acc_mno_unq_id } = useSelector((state) => state.auth.user)

    const childRef1 = useRef()
    const childRef2 = useRef()
    const childRef3 = useRef()
    const navigate = useNavigate()

    useEffect(() => {

        return () => {
            dispatch(setTemplatesForItems([]))
        };
    }, []);

    let intials = {
        itemTemplate: {
            productCat: '',
            tempItemType: '',
            selectedTemplate: ''
        },
        selectedTemplate: {
            selectedTemplate: ''
        },
        itemBasicDetails: {
            itemId: '',
            itemTitle: "",
            itemDesc: "",
            taxData: [{
                taxComponents: '',
                taxAmount: '',
                taxType : '',
            }],
            sopFileUrl: '',
            uploadImageUrl: '',
        },
        itemBasicDetailsOther: {
            itemColour: '',
            itemFeatureDec: ""
        },
        varientDetails: {
            itemTitle: "",
            itemActualPrice: '',
            itemId: '',
            variantID: '',
            variantDesc: '',
            variantTitleTwo: '',
            variantPriceTwo: '',
            validity: '',
            variantFeatureDesc: '',
            variantTitleThree: '',
            monthlyPrice: '',
            shortDescription: '',
            variantFeatureDescThird: ''
        },
        itemVarients: [{
            item_var_title: "",
            var_def_price: '',
            item_var_desc: "",
            img_url: "",
            media_url: '',
            tp_struc_info: "",
            srt_desc: "",
            validity: ""
        }]

    }
    let breadCrumbList = [ {
        name: 'Catalogue',
        link:'cataloguue'
    }, {
        name: 'Items',
        link: "/catalouge-menu-item-view-2"
      }, {
        name: `Create Item`,
      }]
     
      if(mode==="EDIT"){
        breadCrumbList = [
            {
                name: 'Catalouge',
                link:'cataloguue'
            },
            {
                name: 'Item',
                link: '/catalouge-menu-item-view-2',
            },
            {
                name: rowForEdit?.item_title,
                link: '/catalouge-menu-item-view-2',
                state:rowForEdit
            },
            {
                name : "Edit"
            },
        ]
    }
    const [itemState, setItemState] = useState({})
    const [itemIntials, setItemInitials] = useState(intials)

    const templatesArr = useSelector((state) => state?.itemsCreateList?.data?.setTemplatesForItems)
    const [optionalValues, setOptinalValues] = useState({})
    const itemsTaxComponents = useSelector((state) => state?.itemsCreateList?.data?.setTemplateComponents)
    const itemMemoTaxComponentOptiosn = useMemo(() => {
        if (Array.isArray(itemsTaxComponents) && itemsTaxComponents.length > 0) {
            return itemsTaxComponents?.map((vl) => {
                return { ...vl, value: vl?.tax_comp_title, label: vl?.tax_comp_title }
            })
        }
    }, [itemsTaxComponents?.length])
    const dispatch = useDispatch()
    const onChange = (nextStep) => {
        if (nextStep < 0) {
            setStep(0)
        } else if (nextStep > 3) {
            setStep(3)
        } else {
            setStep(nextStep)
        }
    }

    const onNext = () => {
        if (step == 0) {
            childRef1.current?.handleSubmitFromParent()
        }
        if (step == 1) {
            childRef2.current.handleSubmitFromParent();
        }
        if (step == 2) {
            childRef3.current.handleSubmitFromParent();
        }
    }
    const onPrevious = () => onChange(step - 1)

    const submitApi = async () => {

        if (itemIntials) {
            let array1 = cloneDeep(itemMemoTaxComponentOptiosn)
            let array2 = cloneDeep(itemIntials.itemBasicDetails.taxData)
            const taxComponentsMap = new Map();
            array2.forEach(item => taxComponentsMap.set(item.taxComponents, item.taxAmount));
            array1 = array1.filter(item => taxComponentsMap.has(item.id));
            array1.forEach(item => {
                const taxAmount = taxComponentsMap.get(item.id);
                if (taxAmount !== undefined) {
                    item.tax_value = taxAmount;
                    item.tax_id = item.id
                    item.tax_comp_ded_type = item.tax_comp_ded_type == null ? "Percentage" : item.tax_comp_ded_type

                }
            });
            const tpStrucInfo = itemIntials?.itemVarients?.map(obj => {
                let a = JSON.stringify(obj.section)
                obj.tp_struc_info = a;
                delete obj.media_url;
                return obj;
            });
           
            const item_desc = ReactHtmlParser(itemIntials?.itemBasicDetails?.itemDesc)
    
            let bodyforApi = {
                "rel_prod_cat_id": itemIntials?.itemTemplate?.productCat,
                "item_type": itemIntials?.itemTemplate?.tempItemType,
                "item_title": itemIntials?.itemBasicDetails?.itemTitle.trim(),
                "item_actual_price": 0,
                "item_desc": itemIntials?.itemBasicDetails?.itemDesc,
                "item_sop_url": itemIntials?.itemBasicDetails?.sopFileUrl,
                "item_thumbnail": itemIntials?.itemBasicDetails?.uploadImageUrl,
                "item_status": "ACTIVE",
                "rel_api_config_id": null,
                "time_period": null,
                "acc_id": acc_mno_unq_id,
                "acc_type": role_name,
                "item_provider_id": unq_id,
                "dgl_cat_tp_info": { "id": itemIntials?.itemTemplate?.selectedTemplate },
                "dgl_cat_item_vars": tpStrucInfo,
                "dgl_cat_item_taxes": array1
            }
            console.log(bodyforApi)
            
            const resp = await apiCreateItem(bodyforApi)

            if (resp.status === "success") {
                OpenNotification('success','Item Created Successfully')
                navigate('/catalouge-menu-item-view-2')
            }
            if(resp.status === "failed"){
                OpenNotification('danger',resp.message?.message)
            }
        }
    }

    useEffect(() => {
        dispatch(getTemplateComponents(enterAccount))
    }, [dispatch])

    useEffect(() => {
        if (rowForEdit) {
            const a = itemEditFieldsToState(intials, rowForEdit)
            setItemState(a);
        }
    }, [])


    const navigateItemTable = () => {
        dispatch(setTemplatesForItems([]))
        navigate('/catalouge-menu-item-view-2')
    }

    useEffect(() => {
        if (templatesArr.length && itemIntials && itemIntials?.itemTemplate?.selectedTemplate) {
            let a = templatesArr.find(e => e.id === itemIntials?.itemTemplate?.selectedTemplate)
            if(a != undefined){
                let selectedTemp = cloneDeep(a)
                let t = JSON.parse(selectedTemp.tp_struc)
                selectedTemp.tp_struc = t
                // setSelectedTempArr(selectedTemp)
                const initials = cloneDeep(itemIntials?.itemVarients) 
                const manipulateData = selectedTemp?.tp_struc?.map((vl) => {
                    if (Array.isArray(vl?.sectionValues) && vl?.sectionValues?.length > 0) {
                        vl.sectionValues = vl?.sectionValues?.map((sec) => {
                            if (["DD", "CB", "RB"].includes(sec?.formType)) {
                                sec.options = [{ option: '' }]
                            }
                            return sec
                        })
                    }
                    return vl
                })
                if(rowForEdit){
                    initials[0].emptyTempSections = cloneDeep(manipulateData)
                }
                else{
                    initials[0].section = cloneDeep(manipulateData)
                    initials[0].emptyTempSections = cloneDeep(manipulateData)
                }
                setItemInitials((prev) => ({ ...prev, itemVarients: initials }))
                setOptinalValues(initials)
            }
        }
    }, [templatesArr, itemIntials?.itemTemplate?.selectedTemplate])
    return (
        <div>
            <CustomBreadcrumbs  list={breadCrumbList} />
            <Steps current={step}>
                <Steps.Item title="CHOOSE TEMPLATE" />
                <Steps.Item title="ITEM DETAILS" />
                <Steps.Item title="ITEM VARIANTS" />
                <Steps.Item title="PREVIEW" />
            </Steps>

            <div className="mt-6 rounded ">
                {step == 0 &&
                    <>
                        <h3 className="mx-4 mb-4 mt-2">Choose Template</h3>
                        <ItemTemplate
                            itemIntials={itemIntials} setItemInitials={setItemInitials}
                            step={step} setStep={setStep}
                            ref={childRef1} />
                    </>}
                {step == 1 &&
                    <ItemDetails
                        itemIntials={itemIntials} setItemInitials={setItemInitials}
                        step={step} setStep={setStep}
                        ref={childRef2} />}
                {step == 2 &&
                    <ItemVariant
                        itemIntials={itemIntials} setItemInitials={setItemInitials}
                        step={step} setStep={setStep}
                        ref={childRef3}
                        optionalValues={optionalValues} />}
                {step == 3 && <ItemPreview itemIntials={itemIntials} step={step} setStep={setStep} />}
            </div>
            <div className="flex justify-between mt-4">
                <div>
                    {step > 0 && <Button
                        className="mx-2   "
                        style={{
                            backgroundColor: "#4D4D4D", 
                            fontStyle: 'normal',
                            fontSize: 500, fontSize: '18px',
                            color: "white"
                        }}
                        onClick={onPrevious}
                        type="button"

                    >
                        Previous
                    </Button>}
                </div>

                <div className='flex'>
                    {step >= 0 &&
                        <>
                            <Button
                                className="mx-2"
                                onClick={() => navigateItemTable()}
                                variant="solid"
                                style={{ backgroundColor: "#4D4D4D" }}
                            >
                                Cancel
                            </Button>
                        </>}
                    {step < 3 && (
                        <Button
                            onClick={onNext}
                            disabled={step === 3}
                            variant='solid'
                        >
                            {step === 3 ? 'Completed' : 'Next'}
                        </Button>
                    )}
                    {step === 3 && (
                        <Button onClick={submitApi} variant='solid'>
                            {'Submit for approval'}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Controlled
