import ApiService from './ApiService'




export async function apiGetTaxCompData(params) {
    return ApiService.fetchData({
        url: `/account/tax-comps`,
        method: 'get',
        params
    })

}

export async function apiCreateTaxComp(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `account/tax-comp`,
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

export async function apiUpdateTaxComp(id, status) {
    return ApiService.fetchData({
        // url: `/account/acc-users?id=${id}&userStatus=${status}`,
        url:`/account/tax-comp?id=${id}&md_tax_status=${status}`,
        method: 'patch',
    })
}

export async function apiUpdateTaxCompValue(data,id) {

    try {
        const resp = await ApiService.fetchData({
            url: `/account/tax-comp/${data.id}`,
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

export async function apiGetParentAccountTaxComp(data) {
    return ApiService.fetchData({
        url: `/account/acc-operators/dropdown/${data.enterAccount}`,
        method: 'get',
    })
}