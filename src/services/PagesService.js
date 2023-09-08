
import ApiService from './ApiService'


export async function apiGetPagesData(params) {
    return ApiService.fetchData({
        url: `/account/pages`,
        method: 'get',
        params
    })

}

export async function apiCreatePages(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `account/pages`,
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

export async function apiUpdatePages(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `/account/pages`,
            method: 'put',
            data,
        })
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

export async function apiUpdatePageStatus(id, status) {
    return ApiService.fetchData({
        // url:`/account/tax-comp?id=${id}&md_tax_status=${status}`,
        url: `/account/pages?id=${id}&page_status=${status}`,
        method: 'patch',
    })
}


export async function apiGetParentAccountPages(data) {
    return ApiService.fetchData({
        url: `/account/acc-operators/dropdown/${data.enterAccount}`,
        method: 'get',
    })
}