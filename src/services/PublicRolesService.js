import ApiService from './ApiService'

export async function apiGetSalesOrders(params) {
    return ApiService.fetchData({
        url: '/warehouse/sales/orders',
        method: 'get',
        params,
    })
}

export async function apiDeleteSalesOrders(data) {
    return ApiService.fetchData({
        url: '/enterprise/sales/orders/delete',
        method: 'delete',
        data,
    })
}
export async function apiGetPublicRoles(params) {
    return ApiService.fetchData({
        // url: '/account/roles',
        url: `/account/roles/master/${params.acc_mno_parent_unq_id}`,
        method: 'get',
        params,
    })
}

export async function apiUpdateOpAccStatus(id, status) {
    return ApiService.fetchData({
        url: `/account/roles?id=${id}&mdRoleStatus=${status}`,
        method: 'patch',
    })
}

export async function apiGetPublicRole(data) {
    return ApiService.fetchData({
        url: `/account/roles/unqId/1`,
        method: 'get',
    })
}
export async function apiGetRolePermissions(data) {
    return ApiService.fetchData({
        url: `/account/role-permissions`,
        method: 'get',
    })
}

export async function apiGetRolePermissionsForEdit(data) {
    return ApiService.fetchData({
        url: `/account/role-permissions/role/${data.roleId}`,
        method: 'get',
    })
}

export async function apiCreateRolePermissions(data, params) {
    return ApiService.fetchData({
        url: `/account/roles`,
        method: 'post',
        params,
        data,
    })
}

export async function apiUpdateRolePermissions(data, params) {
    return ApiService.fetchData({
        url: `/account/roles`,
        method: 'post',
        params,
        data,
    })
}
