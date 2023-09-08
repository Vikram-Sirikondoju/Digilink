import ApiService from './ApiService'

export async function apiGetCustData(params) {

    return ApiService.fetchData({
        url: '/account/cust-cats',
        method: 'get',
        params,
    })
}

export async function apiUpdateCustAccStatus(id, status) {
    return ApiService.fetchData({
        url: `/account/cust-cats?id=${id}&md_cus_status=${status}`,
        method: 'patch',

    })
}


export async function apiCreateCategory(data) {
    try {
        const resp = await ApiService.fetchData({
            url: '/account/cust-cats',
            method: 'post',
            data,
        });
        return {
            status: 'success',
            data: resp,
        };

    } catch (errors) {
        return {
            status: 'failed',
            message: errors?.response?.data || errors.toString(),
        };
    }

}


export async function apiUpdatcust(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `/account/cust-cats/${data.id}`,
            method: 'put',
            data,
        });
        return {
            status: 'success',
            data: resp,
        };

    } catch (errors) {
        return {
            status: 'failed',
            message: errors?.response?.data || errors.toString(),
        };
    }
}

export async function apiGetCustAccount(data) {
    return ApiService.fetchData({
        url: `/account/acc-operators/dropdown/${data.enterAccount}`,
        method: 'get',
    })
}