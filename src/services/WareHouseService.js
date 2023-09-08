import ApiService from './ApiService'

export async function apiGetWarehouseData(params) {
    return ApiService.fetchData({
        url: '/catalogs/dgl-wh-info',
        method: 'get',
        params,
    })
}

export async function apiGetWarehouseDetails(params) {
    return ApiService.fetchData({
        url: `/catalogs/admin/dgl-wh-info-pageable`,
        method: 'get',
        params,
    })
}

export async function apiCreateWarehouse(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `catalogs/dgl-wh-info`,
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
export async function apiUpdateWarehouse(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `catalogs/dgl-wh-info`,
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

export async function apiUpdateWarehouseStatus(id, status) {
    try {
        const resp = await ApiService.fetchData({
            url: `catalogs/dgl-wh-info/${id}/${status}`,
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