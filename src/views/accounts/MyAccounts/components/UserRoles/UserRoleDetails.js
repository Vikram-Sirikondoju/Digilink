import React, { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'components/ui'
import UserRoleInfo from './UserRoleInfo'
import UserRolePermissionInfo from './UserRolePermissionInfo'
import MasterPermissionBox from './MasterPermissionBox'
import { apiPostUserRole, apiUpdateUserRole } from 'services/MyAccountService'
import { useSelector } from 'react-redux'
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage'
import { GetErrorMsg, OpenNotification } from 'views/Servicefile'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'

const UserRoleDetails = () => {
    const location = useLocation()

    const { enterAccount, password, rememberMe, usernameOrEmail } = useSelector(
        (state) => state.auth.user
    )
    const rowForEdit = location.state?.data

    const navigate = useNavigate()
    const [message, setMessage] = useTimeOutMessage()
    const childRef = useRef()
    const mode = location?.state?.mode ? location?.state?.mode : 'ADD'

    const onSubmitPublicRole = async (payload) => {
        const childState = childRef.current.getChildValues()
        let validationErrors = false;
        await childState.fomikRef.current?.validateForm().then(errors => {
            if (errors && Object.keys(errors).length > 0) {
                childState.fomikRef.current.setTouched(errors, true);
              validationErrors = true;
            }
          });
          if(!validationErrors){
            let body = {
                dgl_roles_dto: {
                    role_name: childState.fomikRef.current.values.userRole,
                    status: 'ACTIVE',
                    role_desc: childState.fomikRef.current.values.description,
                    dgl_acc_mno_id: 1,
                    public_role_id: childState.fomikRef.current.values.publicRole,
                    permissions: 'json string',
                },
                dgl_role_permission_request_dto: childState.rolePermissions,
            }
            if (childState.fomikRef.current.isValid === true) {
                if (childState.edit === false) {
                    const response = await apiPostUserRole(body, enterAccount)
                    if (response.status === 'success') {
                        OpenNotification('success', 'Created successfully ')
                            navigate('/account-menu-item-view-1/userRoles')
                    }
                    if (response.status === 'failed') {
                        // setMessage(GetErrorMsg(response))
                        let data = GetErrorMsg(response)
                        let mess = Array.isArray(data)? data.join(", "): data
                        OpenNotification('danger',mess)
                    }
                } else if (childState.edit === true) {
                    body.dgl_roles_dto.id = childState.rowData.id
                    const response = await apiUpdateUserRole(body, enterAccount)
                    if (response.status === 'success') {
                        OpenNotification('success', 'Updated successfully')
                            navigate('/account-menu-item-view-1/userRoles')
                        
                    
                    }
                    if (response.status === 'failed') {
                        // setMessage(GetErrorMsg(response))
                        let data = GetErrorMsg(response)
                        let mess = Array.isArray(data)? data.join(", "): data
                        OpenNotification('danger',mess)
                    }
                }
            } else {
                childState.fomikRef.current.handleSubmit()
            }
    }
    }

    let breadCrumbList = [{
        name: 'Accounts',
        // link:"/account-menu-item-view-1/accounts"
    }, {
        name: 'My Account',
        link: "/account-menu-item-view-1/userRoles"
    }, {
        name: `Create User Roles & Permissions`,
    }]

    if (mode === "EDIT") {
        breadCrumbList = [
            {
                name: 'Accounts',
                // link:"/account-menu-item-view-1/accounts",
            },
            {
                name: 'My Account',
                link: "/account-menu-item-view-1/userRoles",
            },
            {
                name: rowForEdit?.role_unq_id,
                link: '/account-menu-item-view-1/userRoles',
                state:rowForEdit
            },
            {
                name: "Edit User Roles & Permissions"
            },
        ]
    }


    return (
        <div>
            <div>
                {/* Account / My Account / {mode === 'EDIT' ? 'Edit' : 'Create'}{' '}
                User Roles & Permissions */}
                <CustomBreadcrumbs list={breadCrumbList} />
            </div>
            <div className="mt-5">
                <h3>
                    {mode === 'EDIT' ? 'Edit' : 'Create'} User Roles &
                    Permissions
                </h3>
            </div>
            <div className="mt-6  bg-gray-50 dark:bg-gray-700 rounded ">
                <MasterPermissionBox ref={childRef} />
                {/* <UserRoleInfo /> */}
                {/* <UserRolePermissionInfo /> */}
            </div>
            <div className="mt-4 text-right">
                <>
                    <Link
                        className="block lg:inline-block md:mb-0 mb-4"
                        to="/account-menu-item-view-1/userRoles"
                    >
                        <Button
                            className="mx-2"
                            variant="solid"
                            style={{ backgroundColor: '#4D4D4D' }}
                        >
                            Cancel
                        </Button>
                    </Link>
                    {/* <Link
                        className="block lg:inline-block md:mb-0 mb-4"
                        to="/account-menu-item-view-1"> */}
                    <Button
                        className="mx-2"
                        variant="solid"
                        onClick={onSubmitPublicRole}
                    >
                        Submit For Approval
                    </Button>
                    {/* </Link> */}
                </>
            </div>
        </div>
    )
}

export default UserRoleDetails
