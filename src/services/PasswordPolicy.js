import ApiService from './ApiService'

export async function apiGetSalesItems(data) {
    return ApiService.fetchData({
        url: '/partner/sales/dashboard',
        method: 'post',
        data,
    })
}

export async function apiGetAllData(params) {
    return ApiService.fetchData({
        url: '/account/password-policies',
        method: 'get',
        params,
    })
}

export async function apiUserRoles(data) {
    return ApiService.fetchData({
        url: `/account/roles/child-roles/drop-down//${data.enterAccount}`,
        method: 'get',
    })
}

export async function apiCreatePassPolicy(data) {
    try {
        const resp = ApiService.fetchData({
            url: `/account/password-policies`,
            method: 'post',
            data
        })
        return {
            status: 'success',
            data: resp,
        }
    } catch (errors) {
        return {
            status: 'failed',
            message: errors?.response?.data || errors.toString(),
        }
    }
}


export async function apiUpdatePassPolicy(data) {
    try {
        const resp = ApiService.fetchData({
            url: `/account/password-policies/${data.id}`,
            method: 'put',
            data
        })
        return {
            status: 'success',
            data: resp,
        }
    } catch (errors) {
        return {
            status: 'failed',
            message: errors?.response?.data || errors.toString(),
        }
    }
}

export async function apiUpdatePassPolicyAccStatus(id, status) {
    return ApiService.fetchData({
        url: `/account/password-policies?id=${id}&passStatus=${status}`,
        method: 'patch',
        
    })
}