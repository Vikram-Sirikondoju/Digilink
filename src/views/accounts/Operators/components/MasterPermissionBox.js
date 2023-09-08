import { Card, Checkbox, FormContainer, FormItem, Input, Select } from 'components/ui'
import React, { useEffect, useState } from 'react'
import MasterPermissionBoxOtherDetails from './MasterPermissionBoxOtherDetails'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Field, Formik } from 'formik'
import { Form } from 'react-router-dom'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { getRolePermissions } from '../store/dataSlice'

const tHeading  = ["VIEW","ADD","CLONE","EDIT","DEACT.","APPR."]

const arrMain = {
    "module_dto": [
        {
            "title": "ACCOUNT",
            "code": "ACC",
            "sub_module_dto": [
                {
                    "title": "My Account",
                    "code": "MYA",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Operators",
                    "code": "OPR",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": true
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": true
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Providers",
                    "code": "PRO",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Partners",
                    "code": "PTR",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Enterprise Customers",
                    "code": "ENC",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Retail Customers",
                    "code": "REC",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Pending Approvals",
                    "code": "PEA",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                }
            ]
        },
        {
            "title": "CATALOGUE",
            "code": "CAT",
            "sub_module_dto": [
                {
                    "title": "Templates",
                    "code": "TEM",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Items",
                    "code": "ITM",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Solutions",
                    "code": "SOL",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                }
            ]
        },
        {
            "title": "WAREHOUSE",
            "code": "WRH",
            "sub_module_dto": [
                {
                    "title": "Dashboard",
                    "code": "DASW",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "warehouse",
                    "code": "WRH",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Work Orders",
                    "code": "WRO",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                }
            ]
        },
        {
            "title": "ORDERS",
            "code": "ORD",
            "sub_module_dto": [
                {
                    "title": "Orders",
                    "code": "ORD",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                }
            ]
        },
        {
            "title": "OFFERS & CASHBACK",
            "code": "OFR",
            "sub_module_dto": [
                {
                    "title": "Offers and Cashbacks",
                    "code": "OFC",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                }
            ]
        },
        {
            "title": "BILLING",
            "code": "BIL",
            "sub_module_dto": [
                {
                    "title": "Charges & Bills",
                    "code": "CRBS",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Payments",
                    "code": "PAY",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Settlements",
                    "code": "SET",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                }
            ]
        },
        {
            "title": "REPORTS",
            "code": "RPT",
            "sub_module_dto": [
                {
                    "title": "Reports",
                    "code": "REP",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                }
            ]
        },
        {
            "title": "SETTINGS",
            "code": "SET",
            "sub_module_dto": [
                {
                    "title": "General Settings",
                    "code": "GES",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Api Configuration",
                    "code": "APIC",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Theme Configuration",
                    "code": "THMC",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Brand Info",
                    "code": "BRN",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Notifications",
                    "code": "NOT",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Manage Website",
                    "code": "WSE",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                }
            ]
        },
        {
            "title": "MASTERDATA",
            "code": "MSD",
            "sub_module_dto": [
                {
                    "title": "Doc Type",
                    "code": "DOCT",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": true
                        },
                        {
                            "title": "VIEW",
                            "enabled": true
                        },
                        {
                            "title": "ADD",
                            "enabled": true
                        },
                        {
                            "title": "CLONE",
                            "enabled": true
                        },
                        {
                            "title": "EDIT",
                            "enabled": true
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": true
                        },
                        {
                            "title": "APPROVE",
                            "enabled": true
                        }
                    ]
                },
                {
                    "title": "Product Catagory",
                    "code": "PRDC",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Customer Catagory",
                    "code": "CUSTC",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Tax Component",
                    "code": "TXC",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Currency",
                    "code": "CUR",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Contract Type",
                    "code": "CNRT",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                },
                {
                    "title": "Events",
                    "code": "EVNTS",
                    "dgl_permissions_resp_dto": [
                        {
                            "title": "MENU",
                            "enabled": false
                        },
                        {
                            "title": "VIEW",
                            "enabled": false
                        },
                        {
                            "title": "ADD",
                            "enabled": false
                        },
                        {
                            "title": "CLONE",
                            "enabled": false
                        },
                        {
                            "title": "EDIT",
                            "enabled": false
                        },
                        {
                            "title": "DEACTIVATE",
                            "enabled": false
                        },
                        {
                            "title": "APPROVE",
                            "enabled": false
                        }
                    ]
                }
            ]
        }
    ]
}





const MasterPermissionBox=(props)=> {
    const dispatch = useDispatch()
  
    const [selectedRole,setSelectedRole] = useState(false)
    const [roleId, setRoleId] = useState(props?.operatorIntialValues?.permissionInfo?.publicRole)
    const publicRolesList = useSelector((state) => state.salesOrderList?.data?.publicRolesList)
    const rolePermissions = useSelector((state) => state.salesOrderList?.data?.rolePermissions)

    
   

    const onChangeCheckBox = (e,index,mi,ci) => {
        // 
        // arrMain.module_dto[index].sub_module_dto[mi].dgl_permissions_resp_dto[ci].enabled = e
    }


    useEffect(() => {
        dispatch(getRolePermissions({roleId}))
    },[dispatch, roleId])


    const onChangeRole = (label,form,field) => {
        form.setFieldValue(field.name, label.value)
        setRoleId(label.value)
        setSelectedRole(true)
    }


    const { errors, touched ,values} = props


    return (
        <>
            {/* <MasterPermissionBoxOtherDetails/> */}
            <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded ">
                <div className="bg-gray-50 p-5">
                    <AdaptableCard className="h-full" bodyClass="h-full" divider>
                        <FormContainer>
                            <div className="md:grid gap-4 mx-4">
                                <div className='md:grid grid-cols-2 gap-4'>
                                    <FormItem 
                                        label = {<p>Master Role <span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.publicRole && touched.publicRole}
                                        errorMessage={errors.publicRole}
                                    >
                                       
                                        <Field name="permissionInfo.publicRole">
                                            {({ field, form }) => (
                                                <Select
                                                    placeholder=" Select master role"
                                                    field={field} 
                                                    form={form}   
                                                    options={publicRolesList}
                                                    value={publicRolesList?.filter( label => label.value===values.publicRole)}
                                                    onChange={(label) => onChangeRole(label,form,field)}
                                                />
                                            )}
                                        </Field>
                                    </FormItem> 
                                    <FormItem
                                        label={<p>User Role Title <span style={{ color: 'red' }}>{'*'}</span></p>}
                                        invalid={errors.userRole && touched.userRole}
                                        errorMessage={errors.userRole}
                                    >
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="permissionInfo.userRole"
                                            placeholder="Enter user role title"
                                            component={Input}
                                        />
                                    </FormItem>
                                </div>
                                <FormItem label="Description">
                                    <Field name="permissionInfo.description" >
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
                        </FormContainer>
                    </AdaptableCard>
                </div>
            </div>
            
            {rolePermissions &&  roleId &&
            <div className="bg-gray-50 p-5">
                <div className="md:grid grid-cols-2 gap-4">
                    {rolePermissions?.module_dto?.map((item,index) => {
                            return (
                                <>
                                <Card
                                    className={`rounded-none border-t-4 border-indigo-500 border-r-0 border-b-0 border-l-0`}>
                                    <div className="flex justify-between">
                                        <p className="text-base text-black font-bold">{item.title}</p>
                                        <div className="flex">
                                            <Checkbox className="" />
                                            <p className='text-base font-medium'>Select All</p>
                                        </div>
                                    </div>
                                    <div className='flex'>
                                    <table className='w-full mt-4'>
                                        <thead className="flex md:grid grid-cols-4  h-8 border-b-2 border-zinc-300">
                                            <div className='col-span-1'>
                                                    <th className=''></th>
                                                </div>
                                                <div className='col-span-3 md:grid grid-cols-6'>
                                                {tHeading.map((e) => {
                                                    return(
                                                        <><th className='col-span-1' >{e}</th></>
                                                    )
                                                })}
                                                </div>
                                        </thead>
                                        <tbody>
                                            {item.sub_module_dto.map((i,mi )=> {
                                                return(
                                                    <>
                                                    <tr className='flex justify-between md:grid grid-cols-4 mt-4 border-b-2 border-zinc-300 h-14'>
                                                        <div className='col-span-1'>
                                                            <td className='w-24 mr-3'>{i.title}</td>
                                                        </div>
                                                        <div  className='col-span-3 md:grid grid-cols-6'>
                                                        {i.dgl_permissions_resp_dto.map((c,ci) => {
                                                                return (
                                                                    <>
                                                                       { (ci>0)?  <Checkbox className='col-span-1 ml-5' 
                                                                            checked = {c.enabled} 
                                                                            onChange={(e)=> {onChangeCheckBox(e,index,mi,ci)}}
                                                                        /> : <></>}
                                                                    </>
                                                                )
                                                        })}
                                                        </div>
                                                    </tr>
                                                    </>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                    </div>
                                </Card>
                                </>
                            )
                        })
                    }
                </div>
            </div>}
        </>
    )
}

export default MasterPermissionBox
