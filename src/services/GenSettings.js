import ApiService from "./ApiService";

export async function apiGetOperaters(data) {
    return ApiService.fetchData({
        url: `/account/acc-operators/dropdown/${data.enterAccount}`,
        method: 'get',
    })
}

export async function apiGetOperaterByID(data) {
    return ApiService.fetchData({
        url: `/account/set-gens/unq-id/${data}`,
        method: 'get',
    })
}

export async function apiGetCurrency(data) {
    return ApiService.fetchData({
        url: `/account/currency/unq-id/${data.enterAccount}`,
        method: 'get',
    })
}

export async function apiUpdateGenSettings(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `/account/set-gens/${data.id}`,
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

export async function apiCreateGenSettings(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `/account/set-gens`,
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