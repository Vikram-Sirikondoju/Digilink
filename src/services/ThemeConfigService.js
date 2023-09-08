import ApiService from "./ApiService"

export async function apiSubmitTheme(data) {
    try {
        const resp = await ApiService.fetchData({
            url: '/account/thm-infos',
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

export async function apiUpdateTheme(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `/account/thm-infos/${data.id}`,
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

export async function apiGetThemeInfoByUnqid(data) {
    return ApiService.fetchData({
        url: `/account/thm-infos/unq-id/${data.unq_id}`,
        method: 'get',
    })
}
