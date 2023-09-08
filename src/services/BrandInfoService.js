import ApiService from './ApiService'

export async function apiBrandInfoGetData(data) {
    try {
        const resp = await ApiService.fetchData({
            url: '/account/meta-data',
            method: 'post',
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
export async function apiUpdateBrandInfo(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `/account/meta-data/${data.id}`,
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

export async function apiGetBrandInfoByUnqid(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `/account/meta-data/unq-id/${data.acc_mno_unq_id}`,
            method: 'get',

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