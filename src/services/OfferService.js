import ApiService from './ApiService'

export async function apiGetOfferDetails(params) {
    return ApiService.fetchData({
        url: '/order/offr-info',
        method: 'get',
        params,
    })
}

export async function apiGetCustomerCategoryData(params) {
    return ApiService.fetchData({
        url: '/account/cust-cats',
        method: 'get',
        params,
    })
}

export async function apiGetCashBackDetails(params) {
    return ApiService.fetchData({
        url: '/order/offr-info',
        method: 'get',
        params,
    })
}

export async function apiCreateOfferCashback(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `order/offr-info`,
            method: 'post',
            data,
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
export async function apiUpdateOfferCashback(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `order/offr-info`,
            method: 'put',
            data,
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

export async function apiUpdateOfferStatus(id, status) {
    try {
        const resp = await ApiService.fetchData({
            url: `order/offr-info?id=${id}&offr_status=${status}`,
            method: 'patch',
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
export async function apiUpdateCashbackStatus(id, status) {
    // try {
    //     const resp = await ApiService.fetchData({
    //         url: `catalogs/dgl-wh-info/${id}/${status}`,
    //         method: 'patch',
    //     })
    //     return {
    //         status: 'success',
    //         data: resp,
    //     }
    // } catch (errors) {
    //     return {
    //         status: 'failed',
    //         message: errors?.response?.data || errors.toString(),
    //     }
    // }
}