import ApiService from './ApiService'

export async function apiGetCurrencyData(params) {

    return ApiService.fetchData({
        url: '/account/currency',
        method: 'get',
        params,
    })
}

export async function apiUpdateCurrAccStatus(id, status) {
    return ApiService.fetchData({
        url:`/account/currency?id=${id}&mdCurrStatus=${status}`,
        method: 'patch',

    })
}

export async function apiCreateCurrency(data) {
    try {
        const resp = await ApiService.fetchData({
            url: '/account/currency',
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


export async function apiUpdateCurrency(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `/account/currency/${data.id}`,
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

export async function apiGetCurrAccount(data) {
    return ApiService.fetchData({
        url: `/account/acc-operators/dropdown/${data.enterAccount}`,
        method: 'get',
    })
}