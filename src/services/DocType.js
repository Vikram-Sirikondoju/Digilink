
import ApiService from './ApiService'

export async function apiGetSalesItems(params) {
    return ApiService.fetchData({
        url: '/catalogs/cat-items-info',
        method: 'get',
        params,
    })
}

export async function apiGetDocType(params) {
    return ApiService.fetchData({
        url: `/account/doc-types`,
        method: 'get',
        params
    })

}



export async function apiCreateDocType(data) {
    try {
        const resp = await ApiService.fetchData({
            url: '/account/doc-types',
            method: 'post',
            data,
        })
        return {
            status: 'success',
            data: resp, // Include the response data if needed
        };

    } catch (errors) {
        return {
            status: 'failed',
            message: errors?.response?.data || errors.toString(),
        };
    }

}


export async function apiUpdateDocType(data) {
    
    try {
        const resp = await ApiService.fetchData({
            url: `/account/doc-types/${data.id}`,
            method: 'put',
            data,
        })
        return {
            status: 'success',
            data: resp, // Include the response data if needed
        };

    } catch (errors) {
        return {
            status: 'failed',
            message: errors?.response?.data || errors.toString(),
        };
    }

}
export async function apipdateDocTypeStatus(id, status) {

    return ApiService.fetchData({
        url: `/account/doc-types?id=${id}&mdDocTypeStatus=${status}`,
        method: 'patch',

    })
}


export async function apiGetParentAccountDocType(data) {
    return ApiService.fetchData({
        url: `/account/acc-operators/dropdown/${data.enterAccount}`,
        method: 'get',
    })
}
