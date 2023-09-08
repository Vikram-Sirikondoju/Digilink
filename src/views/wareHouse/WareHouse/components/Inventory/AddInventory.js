import React, { useCallback, useEffect, useState } from 'react'

import {
    Input,
    FormItem,
    FormContainer,
    Select,
    Button,
    toast,
    Notification,
} from 'components/ui'
import { AdaptableCard } from 'components/shared'

import { Formik, Form, Field } from 'formik'
// import * as Yup from 'yup'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    getItemVariants,
    getItems,
    getWareHouseList,
} from '../../store/dataSlice'
import * as Yup from 'yup'
import { ApiToUiConversionInventory, UiToApiConversionInventory } from 'utils/campareandCopy'
import { apiCreateInventory, apiUpdateInventory } from 'services/InventoryService'
import { GetErrorMsg } from 'views/Servicefile'
import { injectReducer } from 'store'
import reducer from '../../store'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'

const validationSchema = Yup.object({
    whWarehouse: Yup.string().required('Please Enter Valid Warehouse'),
    catItemsInfo: Yup.string().required('Please Enter Valid  Item'),
    catItemVar: Yup.string().required('Please Enter Valid  Item Variant '),
    skuCode: Yup.string().required('Please Enter Valid SKU Code '),
    shelfCode: Yup.string().required('Please Enter Valid  Shelf Code'),
    shelfArea: Yup.string().required('Please Enter Valid Shelf Area'),
    holdingQty: Yup.number()
        .required('Please Enter Valid Holding Qty')
        .integer('Holding Qty should be number')
        .positive('Holding Qty should not be in negative'),
})
injectReducer('wareHouse', reducer)
const AddInventory = () => {
    const location = useLocation();
    const warehouseData = location.state.data || {};
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wareHouseList = useSelector((state) => state.wareHouse?.data?.whList)
    const itemsList = useSelector((state) => state.wareHouse?.data?.itemList)
    const itemVariants = useSelector(
        (state) => state.wareHouse?.data?.itemVariants
    )

    const fetchData = useCallback(() => {
        dispatch(getWareHouseList())
        dispatch(getItems())
    }, [dispatch])

    useEffect(() => {
        fetchData()
    }, [dispatch])

    let initialValues = {
        whWarehouse: warehouseData.id,
        catItemsInfo: '',
        catItemVar: '',
        skuCode: '',
        shelfCode: '',
        shelfArea: '',
        holdingQty: 0,
    }
    

    const mode = location.state?.mode === 'EDIT' ? location.state?.mode : 'ADD'
    const [selectedMode, setSelectedMode] = useState(mode)
    const rowForEdit = location.state?.data
    let warehouseItem=location.state?.data
    if(mode === "EDIT"){
        warehouseItem=location.state?.warehouseData
    }
    if (rowForEdit && mode === "EDIT") {
        initialValues = ApiToUiConversionInventory(initialValues, rowForEdit)
    }
    const [initialState, setInitValues] = useState(initialValues);

    const { acc_mno_id } = useSelector((state) => state.auth.user);

    useEffect(() => {
        if(selectedMode === "EDIT" && rowForEdit.cat_items_info) {
            dispatch(
                getItemVariants(
                    rowForEdit.cat_items_info
                )
            )
        }
    }, [selectedMode])
    const submitApi = async (values, setSubmitting) => {
        let submittedValues = { ...values, accId: acc_mno_id }
        let payload = {}
        if (selectedMode === 'ADD') {
            const reqAddPayload = UiToApiConversionInventory(
                payload,
                submittedValues
            )
            const resp = await apiCreateInventory(reqAddPayload)
            if (resp.status === 'success') {
                toast.push(
                    <Notification
                        title={'Inventory Creation'}
                        type="success"
                        duration={2500}
                    >
                        Inventory Added Successfuly
                    </Notification>,
                    {
                        placement: 'top-end',
                    }
                )

                navigate('/wareHouse-menu-item-view-2')
            } else if (resp.status === 'failed') {
                const errorMsg = GetErrorMsg(resp) || 'Error'
                toast.push(
                    <Notification
                        title={'Failed'}
                        type="danger"
                        duration={2500}
                    >
                        {errorMsg}
                    </Notification>,
                    {
                        placement: 'top-end',
                    }
                )
            }
        } else if (selectedMode === 'EDIT') {
            const reqEditPayload = UiToApiConversionInventory(
                payload,
                submittedValues,
                true
            )
            const resp = await apiUpdateInventory(reqEditPayload)
            if (resp.status === 'success') {
                toast.push(
                    <Notification
                        title={'Inventory Updation'}
                        type="success"
                        duration={2500}
                    >
                        Inventory Updated Successfuly
                    </Notification>,
                    {
                        placement: 'top-end',
                    }
                )
                navigate('/wareHouse-menu-item-view-2')
            } else if (resp.status === 'failed') {
                const errorMsg = GetErrorMsg(resp) || 'Error'
                toast.push(
                    <Notification
                        title={'Failed'}
                        type="danger"
                        duration={2500}
                    >
                        {errorMsg}
                    </Notification>,
                    {
                        placement: 'top-end',
                    }
                )
            }
        }
        setSubmitting(false);
    }
    const breadCrumbList = [
            {
                name: 'Home',
                link: '/home',
            },
            {
                name: 'WareHouse',
                link: '/wareHouse-menu-item-view-2',
            },
            {
                name: warehouseItem?.wh_title,
                link: '/warehouse-view-warehouse',
                state:warehouseItem
            },
            {
               
                name : selectedMode === 'EDIT' ? "Edit Inventory": "Add Inventory"
            },
        ]
    return (
        <>
            <CustomBreadcrumbs list={breadCrumbList} />
            <br />
            <div className="mt-5">
                <h3>{selectedMode === 'EDIT' ? "Edit Inventory": "Add Inventory"}</h3>
                <Formik
                    initialValues={initialState}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(true);
                        submitApi(values, setSubmitting);
                    }}
                >
                    {({
                        values,
                        touched,
                        errors,
                        handleSubmit,
                        isSubmitting,
                    }) => {
                        return (
                            <Form onSubmit={handleSubmit}>
                                <FormContainer>
                                    <div className="mt-6 dark:bg-gray-700 rounded ">
                                        <div
                                            className=" p-5"
                                            style={{
                                                backgroundColor: '#F5F5F5',
                                            }}
                                        >
                                            <AdaptableCard
                                                className="h-full"
                                                bodyClass="h-full"
                                                divider
                                            >
                                                <div className="md:grid grid-cols-2 gap-4 mx-4 ">
                                                    <FormItem
                                                        
                                                        label="Warehouse "
                                                        invalid={
                                                            errors.whWarehouse &&
                                                            touched.whWarehouse
                                                        }
                                                        errorMessage={
                                                            errors.whWarehouse
                                                        }
                                                        disabled
                                                    >
                                                        <Field name="whWarehouse" disabled>
                                                            {({
                                                                field,
                                                                form,
                                                            }) => (
                                                                <>
                                                                    <Select
                                                                        placeholder="Select Warehouse"
                                                                        field={
                                                                            field
                                                                        }
                                                                        form={
                                                                            form
                                                                        }
                                                                        isDisabled
                                                                        options={
                                                                            wareHouseList
                                                                        }
                                                                        value={wareHouseList?.filter(
                                                                            (
                                                                                wh
                                                                            ) =>
                                                                                wh.value ===
                                                                                values.whWarehouse
                                                                        )}
                                                                        onChange={(
                                                                            wh
                                                                        ) =>
                                                                            form.setFieldValue(
                                                                                field.name,
                                                                                wh.value
                                                                            )
                                                                        }
                                                                    />
                                                                </>
                                                            )}
                                                        </Field>
                                                    </FormItem>
                                                    <FormItem
                                                        label={
                                                            <span>Item<span style={{color:'red',paddingLeft:2}}> {"*"}</span></span>
                                                        }
                                                        invalid={
                                                            errors.catItemsInfo &&
                                                            touched.catItemsInfo
                                                        }
                                                        errorMessage={
                                                            errors.catItemsInfo
                                                        }
                                                    >
                                                        <Field name="catItemsInfo">
                                                            {({
                                                                field,
                                                                form,
                                                            }) => (
                                                                <>
                                                                    <Select
                                                                        placeholder="Select Item"
                                                                        field={
                                                                            field
                                                                        }
                                                                        form={
                                                                            form
                                                                        }
                                                                        options={
                                                                            itemsList
                                                                        }
                                                                        value={itemsList?.filter(
                                                                            (
                                                                                wh
                                                                            ) =>
                                                                                wh.value ===
                                                                                values.catItemsInfo
                                                                        )}
                                                                        onChange={(
                                                                            wh
                                                                        ) => {
                                                                            dispatch(
                                                                                getItemVariants(
                                                                                    wh.value
                                                                                )
                                                                            )
                                                                            form.setFieldValue(
                                                                                field.name,
                                                                                wh.value
                                                                            )
                                                                        }}
                                                                    />
                                                                </>
                                                            )}
                                                        </Field>
                                                    </FormItem>
                                                    <FormItem
                                                     label={
                                                        <span>Item Variant<span style={{color:'red',paddingLeft:2}}> {"*"}</span></span>
                                                    }
                                                        invalid={
                                                            errors.catItemVar &&
                                                            touched.catItemVar
                                                        }
                                                        errorMessage={
                                                            errors.catItemVar
                                                        }
                                                    >
                                                        <Field name="catItemVar">
                                                            {({
                                                                field,
                                                                form,
                                                            }) => (
                                                                <>
                                                               
                                                                    <Select
                                                                        placeholder="Select Item Variant"
                                                                        field={
                                                                            field
                                                                        }
                                                                        form={
                                                                            form
                                                                        }
                                                                        options={
                                                                            itemVariants
                                                                        }
                                                                        value={itemVariants?.filter(
                                                                            (
                                                                                wh
                                                                            ) =>
                                                                                wh.value ===
                                                                                values[
                                                                                    field
                                                                                        .name
                                                                                ]
                                                                        )}
                                                                        onChange={(
                                                                            wh
                                                                        ) => {
                                                                            form.setFieldValue(
                                                                                field.name,
                                                                                wh.value
                                                                            )
                                                                        }}
                                                                    />
                                                                </>
                                                            )}
                                                        </Field>
                                                    </FormItem>
                                                    <FormItem
                                                      label={
                                                        <span>SKU Code<span style={{color:'red',paddingLeft:2}}> {"*"}</span></span>
                                                    }
                                                        invalid={
                                                            errors.skuCode &&
                                                            touched.skuCode
                                                        }
                                                        errorMessage={
                                                            errors.skuCode
                                                        }
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="skuCode"
                                                            placeholder="Enter SKU Code"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                  label={
                                                    <span>Shelf Code<span style={{color:'red',paddingLeft:2}}> {"*"}</span></span>
                                                }
                                                        invalid={
                                                            errors.shelfCode &&
                                                            touched.shelfCode
                                                        }
                                                        errorMessage={
                                                            errors.shelfCode
                                                        }
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="shelfCode"
                                                            placeholder="Enter Shelf Code"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                   label={
                                                    <span>Shelf Area<span style={{color:'red',paddingLeft:2}}> {"*"}</span></span>
                                                }
                                                        invalid={
                                                            errors.shelfArea &&
                                                            touched.shelfArea
                                                        }
                                                        errorMessage={
                                                            errors.shelfArea
                                                        }
                                                    >
                                                        <Field
                                                            type="text"
                                                            autoComplete="off"
                                                            name="shelfArea"
                                                            placeholder="Enter Shelf Area"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                    <FormItem
                                                     label={
                                                        <span>Quantity<span style={{color:'red',paddingLeft:2}}> {"*"}</span></span>
                                                    }
                                                        invalid={
                                                            errors.holdingQty &&
                                                            touched.holdingQty
                                                        }
                                                        errorMessage={
                                                            errors.holdingQty
                                                        }
                                                    >
                                                        <Field
                                                            type="number"
                                                            autoComplete="off"
                                                            name="holdingQty"
                                                            placeholder="Enter Quantity"
                                                            component={Input}
                                                        />
                                                    </FormItem>
                                                </div>
                                            </AdaptableCard>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mt-6  bg-gray-50 dark:bg-gray-700 rounded "></div>
                                        <div className="mt-4 text-right">
                                            <>
                                                <Link
                                                    className="block lg:inline-block md:mb-0 mb-4"
                                                    to="/wareHouse-menu-item-view-2"
                                                >
                                                    <Button
                                                type={'button'}
                                                className="mx-2"
                                                onClick={() =>
                                                    console.log('cancel')
                                                }
                                                variant="solid"
                                                style={{
                                                    backgroundColor: '#4D4D4D',
                                                }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </Link>
                                                <Button
                                                    className="mx-2"
                                                    variant="solid"
                                                    type={'submit'}
                                                    disabled={isSubmitting}
                                                >
                                                    Submit For Approval
                                                </Button>
                                            </>
                                        </div>
                                    </div>
                                </FormContainer>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </>
    )
}

export default AddInventory
