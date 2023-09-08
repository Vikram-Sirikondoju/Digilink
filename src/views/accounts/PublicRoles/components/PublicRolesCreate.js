import React, { useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'components/ui'
import PublicRolesInfo from './PublicRolesInfo'
// import UserRolePermissionInfo from './UserRolePermissionInfo'
import MasterPermissionBox from './MasterPermissionBox'
import { apiPostUserRole } from 'services/MyAccountService'
import { apiCreateRolePermissions, apiUpdateRolePermissions } from 'services/PublicRolesService'
import { useSelector } from 'react-redux'
import { OpenNotification } from 'views/Servicefile'
import CustomBreadcrumbs from 'components/template/CustomBreadCrumb'

const PublicRolesCreate = () => {

    const navigate = useNavigate()
    
    const childRef = useRef()
    const { enterAccount, password, rememberMe, usernameOrEmail, acc_mno_id, acc_mno_parent_unq_id
    } = useSelector((state) => state.auth.user)

    const location = useLocation();
    const mode = location.state?.mode ? location.state.mode : "ADD";
    const onSubmitPublicRole = async (payload) => {
        
        const childState = childRef.current.getChildValues()
        let validationErrors = false;
        await childState.fomikRef.current?.validateForm().then(errors => {
            if (errors && Object.keys(errors).length > 0) {
                childState.fomikRef.current.setTouched(errors, true);
                validationErrors = true;
            }
        });
        if (!validationErrors) {
            let body = {
                "dgl_roles_dto": {
                    "role_name": childState.fomikRef.current.values.userRole,
                    "status": "ACTIVE",
                    "role_desc": childState.fomikRef.current.values.description,
                    "permissions": "json string",
                    "dgl_acc_mno_id": acc_mno_id,
                },
                "dgl_role_permission_request_dto": childState.rolePermitArr
            }


            if (childState.fomikRef.current.isValid === true) {
                if (childState.edit === false) {
                    const response = await apiCreateRolePermissions(body, { unqId: acc_mno_parent_unq_id })
                    if (response.data.success) {
                        childState.fomikRef.current.resetForm()
                        OpenNotification('success', 'Created successfully ')
                        navigate('/account-menu-item-view-11')
                    }
                } else if (childState.edit === true) {
                    body.dgl_roles_dto.id = childState.rowData.id
                    const response = await apiUpdateRolePermissions(body, { unqId: acc_mno_parent_unq_id })
                    if (response.data.success) {
                        childState.fomikRef.current.resetForm()
                        OpenNotification('success', 'Updated successfully ')
                        navigate('/account-menu-item-view-11')
                    }
                }
            } else {
                childState.fomikRef.current.handleSubmit()
            }
        }
    }
    let  breadCrumbList=[{
        name:'Account',
         link:"/home"
    },
    {
        name:'My Account',
        link:"/account-menu-item-view-11"
    },
    {
        name: `Create Master Roles & Permissions`,
    }]

    
if(mode==="EDIT"){
    breadCrumbList = [
        {
            name:'Account',
             link:"/home"
        },
        {
            name:'My Account',
            link:"/account-menu-item-view-11"
        },
        {
            name: `Edit Master Roles & Permissions`,
        },
        // {
        //     name: rowForEdit?.role_name,
        //     link: '/warehouse-view-warehouse',
        //     state:rowForEdit
        // },

    ]
}


    return (
        <div>
            {/* <div>Account / My Account / Create Master Roles & Permissions</div> */}
            <CustomBreadcrumbs  list={breadCrumbList} />
            <div className='mt-5'>
                <h3>{mode == "ADD" ? 'Create Master Roles & Permissions' : 'Update Master Roles & Permissions'}</h3>
            </div>
            <div className="mt-6  bg-gray-50 dark:bg-gray-700 rounded ">
                <MasterPermissionBox ref={childRef} />
                {/* <PublicRolesInfo /> */}
                {/* <UserRolePermissionInfo /> */}
            </div>
            <div className="mt-4 text-right">
                <>
                    <Link
                        className="block lg:inline-block md:mb-0 mb-4"
                        to="/account-menu-item-view-11">
                        <Button
                            className="mx-2"
                            variant="solid"
                            style={{ backgroundColor: "#4D4D4D" }}
                        >
                            Cancel
                        </Button>
                    </Link>
                    {/* <Link
                        className="block lg:inline-block md:mb-0 mb-4"
                        to="/account-menu-item-view-1"> */}
                    <Button
                        className="mx-2"
                        variant='solid'
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

export default PublicRolesCreate
