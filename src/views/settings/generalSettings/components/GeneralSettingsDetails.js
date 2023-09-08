import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AdaptableCard, DataTable, RichTextEditor } from 'components/shared'
import { Input, FormItem, FormContainer, select, Button, Dialog, Select, InputGroup } from 'components/ui'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { MdModeEdit, MdNavigateNext } from 'react-icons/md'
import SettingsDialog from './settingsDialog'
import { useDispatch, useSelector } from 'react-redux'
import { getByOperaterId, getOperaters ,setTableData} from '../store/dataSlice'
import { addRowItem, removeRowItem, setSelectedRows } from '../store/stateSlice'
import GetDropdownLabel, { snakeToCamel } from 'views/Servicefile'
import { cloneDeep } from 'lodash'
import { HiArrowRight, HiOutlineSearch } from 'react-icons/hi'
import { timeZone } from 'mock/data/timezones'
import { solPriceOptions } from './GeneralSettingsEdit'

const language = [
    { label: 'English', value: 'en' },  
    { label: 'Spanish', value: 'es'},
    { label: 'Arabic', value: 'ar'},
    { label: 'Portuguese', value: 'pt'},
]

export default function GeneralSettingsDetails() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [operater,setOperater] = useState({selectedOperator : ""})

    const { enterAccount, acc_mno_id,user_type, acc_mno_unq_id} = useSelector((state) => state.auth.user)
    const operatorsList = useSelector((state) => state.genSettings?.data?.operatorsList)
    const { pageIndex, pageSize, sort, query, total ,sort_field,order} = useSelector((state) => state.genSettings?.data?.tableData)
    const loading = useSelector((state) => state.genSettings?.data?.loading)
    const getOpInfoId = useSelector((state) => state.genSettings?.data?.opInfoByID)
    const currencyList = useSelector((state) => state.genSettings?.data?.currencyList)
    const totalCount = operatorsList.length

    useEffect(() => {
        dispatch(getOperaters({enterAccount}))
    },[dispatch,enterAccount])

    useEffect(()=>{
        if(user_type!== "GlobalMno"){
            setOperater({selectedOperator : acc_mno_unq_id})
            dispatch(getByOperaterId(acc_mno_unq_id))
        }
    },[operatorsList])
    const tableData = useMemo(  
        () => ({ pageIndex, pageSize, sort, query, total:totalCount }),
        [pageIndex, pageSize, sort, query, totalCount]
    )

    const onSeletOperator = useCallback((form,field,label) => {
        form.setFieldValue(field.name,label.value)
        setOperater({selectedOperator : label.value})
        dispatch(getByOperaterId(label.value))
    },[dispatch])  

    const onClickEdit = () => {
        navigate(`/settings-menu-general-settings-edit`, {
            state: { data : getOpInfoId[0] ,account :  operater.selectedOperator, mode: 'EDIT' },
        })
    }
    const GetValueTimeZone = (key,arr) =>{
        let a = arr.find(e => e?.id == key)
        return  a
    }

    return (
        <>
            <div className='mt-5'>
                <h3>General Settings</h3>
                <div className="mt-6  bg-gray-50 dark:bg-gray-700 rounded">
                    <div className="p-5" style={{ backgroundColor: "#f5f5f5" }}>
                    
                        <Formik
                            initialValues={operater}
                            // validationSchema={}
                            onSubmit={(values) => {
                                console.log('submit', values);
                            }}
                        >
                            {({values, touched, errors, isSubmitting, handleSubmit}) => {
                                return(
                                <Form>
                                    <AdaptableCard className="h-full p-5" bodyClass="h-full" divider>
                                    <FormContainer>
                                        <FormItem label='Select Operator'>
                                            <div className='md:grid grid-cols-3 gap-4'>
                                            <Field name="selectedOperator">
                                                {({ field, form }) => (
                                                    <Select placeholder="Select Operater" field={field} form={form}
                                                        options={operatorsList} isDisabled={user_type !== "GlobalMno" ? true : false}
                                                        // value={operatorsList.filter((label) => (label.value === values.selectedOperator))}
                                                        value={user_type !== "GlobalMno" ? 
                                                              operatorsList?.filter((label) =>label.value === enterAccount) 
                                                            : operatorsList?.filter((label) =>label.value === values.selectedOperator)}
                                                        onChange={(label) =>onSeletOperator(form,field,label)}
                                                />)}
                                            </Field>
                                            </div>
                                        </FormItem>
                                    </FormContainer>
                                    </AdaptableCard>
                                    {(operater?.selectedOperator || values?.selectedOperator) && 
                                    <AdaptableCard className="h-full p-5 mt-4" bodyClass="h-full" divider>
                                            <div className="md:grid grid-cols-2">
                                                <h6 className=" mb-4 mt-1 font-bold">BASIC DETAILS{' '}</h6>
                                                <div className=" text-base  font-bold flex justify-end cursor-pointer">
                                                        <div style={{display:"flex"}} onClick={onClickEdit}>
                                                            <MdModeEdit className='mr-2 h-6'/>
                                                            <p>EDIT</p>
                                                        </div>
                                                </div>
                                            </div>
                                            <div className="md:grid grid-cols-5 mt-4">
                                                <div style={{ display: "flex", flexDirection: "column" }} >
                                                    <h6 className='mb-3'>Roundoff Values</h6>
                                                    <p className='mb-3'>{getOpInfoId[0]?.gen_set_rndoff_val === true ? "Up" : 'Down'}</p>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "column" }} >
                                                    <h6 className='mb-3'>Solution Price</h6>
                                                    <p className='mb-3'>{solPriceOptions.find(val => val.value == getOpInfoId[0]?.gen_set_sol)?.label}</p>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <h6 className='mb-3'>Language Preferences</h6>
                                                    <p className='mb-3'>{GetDropdownLabel(getOpInfoId[0]?.gen_set_lang_pref,language)}</p>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <h6 className='mb-3'>Time Zone</h6>
                                                    <p className='mb-3'>{GetValueTimeZone(getOpInfoId[0]?.gen_set_timezone,timeZone)?.value}</p>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <h6 className='mb-3'>Date Format</h6>
                                                    <p className='mb-3'>{getOpInfoId[0]?.gen_set_date_format}</p>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <h6 className='mb-3'>Time Format</h6>
                                                    <p className='mb-3'>{getOpInfoId[0]?.gen_set_time_format}</p>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
                                                    <h6 className='mb-3'>Currency Preferance</h6>
                                                    <p className='mb-3'>{GetDropdownLabel(getOpInfoId[0]?.rel_gen_set_curncy_pref,currencyList)}</p>
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
                                                    <h6 className='mb-3'>Select Measurement</h6>
                                                    <p className='mb-3'>{getOpInfoId[0]?.gen_set_measr_unit === true ? "CI" : "SI"}</p>
                                                </div>
                                            </div>
                                    </AdaptableCard>}
                                </Form>
                            )}}
                        </Formik>                    
                    </div>
                </div>
            </div>
        </>
    )
}
