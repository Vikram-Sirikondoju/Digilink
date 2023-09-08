import {
    Card,
    Checkbox,
    FormContainer,
    FormItem,
    Input,
    Select,
} from 'components/ui'
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react'
import { AdaptableCard, RichTextEditor } from 'components/shared'
import { Field, Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { getPublicRoles, getRolePermissions } from '../../store/dataSlice'
import { useLocation } from 'react-router'
import { RolePermitEditValuesToFields } from 'utils/campareandCopy'
import _ from 'lodash'

const tHeading = ['VIEW', 'ADD', 'CLONE', 'EDIT', 'DEACT.', 'APPR.']

const initValues = {
    publicRole: '',
    userRole: '',
    description: '',
}

const validationSchema = Yup.object().shape({
    publicRole: Yup.string().required('Please select master role ').nullable(),
    userRole: Yup.string().required('Please enter user role').nullable(),
})

const MasterPermissionBox = forwardRef((props, ref) => {
    const dispatch = useDispatch()

    const fomikRef = useRef()

    const location = useLocation()
    const mode = location.state?.mode ? location.state.mode : 'ADD'
    const rowForEdit = location.state?.data

    // const { pageIndex, pageSize, sort, query, total } = useSelector(
    //     (state) => state?.myaccountList?.data?.tableData
    // )

    const [rolePermitArr,setRolePermitArr]= useState()
    const [rolePermitInitValues, setRolePermitInitValues] = useState(rowForEdit ? RolePermitEditValuesToFields(initValues,rowForEdit) : initValues)

    const [selectedRole, setSelectedRole] = useState(false)
    const [roleId, setRoleId] = useState('')

    const publicRolesList = useSelector(
        (state) => state.myaccountList?.data?.publicRolesList
    )
    const rolePermissions = useSelector(
        (state) => state.myaccountList?.data?.rolePermissions
    )
    const {
        enterAccount,
        password,
        rememberMe,
        usernameOrEmail,
        acc_mno_parent_unq_id,
    } = useSelector((state) => state.auth.user)
    const onChangeCheckBox = (e, index, mi, ci) => {
        // arrMain.module_dto[index].sub_module_dto[mi].dgl_permissions_resp_dto[ci].enabled = e
    }

    useEffect(() => {
        dispatch(getRolePermissions({ roleId }))
        dispatch(getPublicRoles({ acc_mno_parent_unq_id }))
    }, [dispatch, roleId,rowForEdit])

    const onChangeRole = (label, form, field) => {
        form.setFieldValue(field.name, label.value)
        setRoleId(label.value)
        setSelectedRole(true)
    }

    useImperativeHandle(ref, () => ({
        getChildValues: () => {
            let payload = {
                fomikRef,
                rolePermissions,
                rowData: rowForEdit,
                edit: rowForEdit ? true : false,
            }
            return payload
        },
    }))

    // const onChangeSelectAll = (item,index,e) =>{
    //     let temp = _.cloneDeep(item);
    //     temp.module_dto[index].sub_module_dto.forEach(function(subModule) {
    //         subModule.dgl_permissions_resp_dto.forEach(function(permission) {
    //           permission.enabled = e; 
    //         });
    //       });
    //     temp.module_dto[index].enabled = e
    //     setRolePermitArr(temp)  
    // } 

    useEffect(() => {
        if(mode==="EDIT"){
            // rolePermitInitValues.publicRole = rowForEdit.public_role_id
            // rolePermitInitValues.userRole = rowForEdit.role_name
            // rolePermitInitValues.description =  rowForEdit.role_desc
            // setRolePermitInitValues(rolePermitInitValues)
            setRoleId(rolePermitInitValues.publicRole)
            setSelectedRole(true)
        }
    }, [mode])

    return (
        <>
            {/* <MasterPermissionBoxOtherDetails/> */}
            <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded ">
                <div className="bg-gray-50 p-5">
                    <AdaptableCard
                        className="h-full"
                        bodyClass="h-full"
                        divider
                    >
                        <Formik
                            innerRef={fomikRef}
                            initialValues={rolePermitInitValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(true)
                            }}
                        >
                            {({ errors, touched, values, setFieldValue }) => (
                                <FormContainer>
                                    <div className="md:grid gap-4 mx-4">
                                        <div className="md:grid grid-cols-2 gap-4">
                                            <FormItem
                                                label={
                                                    <p>
                                                        Master Role{' '}
                                                        <span
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        >
                                                            {'*'}
                                                        </span>
                                                    </p>
                                                }
                                                invalid={
                                                    errors.publicRole &&
                                                    touched.publicRole
                                                }
                                                errorMessage={errors.publicRole}
                                            >
                                                <Field name="publicRole">
                                                    {({ field, form }) => (
                                                        <Select
                                                            placeholder="Select Master Role"
                                                            field={field}
                                                            form={form}
                                                            options={
                                                                publicRolesList
                                                            }
                                                            value={publicRolesList?.filter(
                                                                (label) =>
                                                                    label.value ===
                                                                    values.publicRole
                                                            )}
                                                            onChange={(label) =>
                                                                onChangeRole(
                                                                    label,
                                                                    form,
                                                                    field
                                                                )
                                                            }
                                                        />
                                                    )}
                                                </Field>
                                            </FormItem>
                                            <FormItem
                                                label={
                                                    <p>
                                                        User Role Title{' '}
                                                        <span
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        >
                                                            {'*'}
                                                        </span>
                                                    </p>
                                                }
                                                invalid={
                                                    errors.userRole &&
                                                    touched.userRole
                                                }
                                                errorMessage={errors.userRole}
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="userRole"
                                                    placeholder="Enter Role"
                                                    component={Input}
                                                />
                                            </FormItem>
                                        </div>
                                        <FormItem label="Description">
                                            <Field name="description">
                                                {({ field, form }) => (
                                                    <RichTextEditor
                                                        style={{ width: '60%' }}
                                                        value={field.value}
                                                        onChange={(val) =>
                                                            form.setFieldValue(
                                                                field.name,
                                                                val
                                                            )
                                                        }
                                                    />
                                                )}
                                            </Field>
                                        </FormItem>
                                    </div>
                                </FormContainer>
                            )}
                        </Formik>
                    </AdaptableCard>
                </div>
            </div>

            {selectedRole && (
                <div className="bg-gray-50 p-5">
                    <div className="md:grid grid-cols-2 gap-4">
                        {rolePermissions?.module_dto?.map((item, index) => {
                            return (
                                <>
                                    <Card
                                        className={`rounded-none border-t-4 border-indigo-500 border-r-0 border-b-0 border-l-0`}
                                    >
                                        <div className="flex justify-between">
                                            <p className="text-base font-bold">
                                                {item.title}
                                            </p>
                                            <div className="flex">
                                                <Checkbox className="" disabled/>
                                                <p className="text-base font-medium">
                                                    Select All
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <table className="w-full mt-4">
                                                <thead className="flex md:grid grid-cols-4  h-8 border-b-2 border-zinc-300">
                                                    <div className="col-span-1">
                                                        <th className=""></th>
                                                    </div>
                                                    <div className="col-span-3 md:grid grid-cols-6">
                                                        {tHeading.map((e) => {
                                                            return (
                                                                <>
                                                                    <th className="col-span-1">
                                                                        {e}
                                                                    </th>
                                                                </>
                                                            )
                                                        })}
                                                    </div>
                                                </thead>
                                                <tbody>
                                                    {item.sub_module_dto.map(
                                                        (i, mi) => {
                                                            return (
                                                                <>
                                                                    <tr className="flex justify-between md:grid grid-cols-4 mt-4 border-b-2 border-zinc-300 h-14">
                                                                        <div className="col-span-1">
                                                                            <td className="w-24 mr-3">
                                                                                {
                                                                                    i.title
                                                                                }
                                                                            </td>
                                                                        </div>
                                                                        <div className="col-span-3 md:grid grid-cols-6">
                                                                            {i.dgl_permissions_resp_dto.map(
                                                                                (
                                                                                    c,
                                                                                    ci
                                                                                ) => {
                                                                                    return (
                                                                                        <>
                                                                                            {ci >
                                                                                            0 ? (
                                                                                                <Checkbox
                                                                                                    className="col-span-1 ml-5"
                                                                                                    checked={
                                                                                                        c.enabled
                                                                                                    }
                                                                                                    onChange={(
                                                                                                        e
                                                                                                    ) => {
                                                                                                        onChangeCheckBox(
                                                                                                            e,
                                                                                                            index,
                                                                                                            mi,
                                                                                                            ci
                                                                                                        )
                                                                                                    }}
                                                                                                />
                                                                                            ) : (
                                                                                                <>

                                                                                                </>
                                                                                            )}
                                                                                        </>
                                                                                    )
                                                                                }
                                                                            )}
                                                                        </div>
                                                                    </tr>
                                                                </>
                                                            )
                                                        }
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Card>
                                </>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
})

export default MasterPermissionBox
