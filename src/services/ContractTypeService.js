import ApiService from './ApiService'

export async function apiGetAllContractType(params) {
    return ApiService.fetchData({
        url: '/account/contract-types',
        method: 'get',
        params,
    })
}


export async function apiGetParentAccount(data) {
    return ApiService.fetchData({
        url: `/account/acc-operators/dropdown/${data.enterAccount}`,
        method: 'get',
    })
}



export async function apiCreateContractType(data) {
    try {
        const resp = ApiService.fetchData({
            url: `/account/contract-types`,
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


export async function apiUpdateContractType(data) {
    try {
        const resp = ApiService.fetchData({
            url: `/account/contract-types`,
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

export async function apiUpdateContractAccStatus(id, status) {
    return ApiService.fetchData({
        url: `/account/contract-types?id=${id}&md_contr_status=${status}`,
        method: 'patch',
        
    })
}