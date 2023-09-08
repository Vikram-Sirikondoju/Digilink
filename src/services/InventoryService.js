import ApiService from './ApiService'

export async function apiGetInventoryDataForWarehouse(params) {
    return ApiService.fetchData({
        url: '/catalogs/admin/product/inventories',
        method: 'get',
        params,
    })
}

export async function apiCreateInventory(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `catalogs/dgl-prod-intry-info`,
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
export async function apiUpdateInventory(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `catalogs/dgl-prod-intry-info`,
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

export async function apiUpdateInventoryStatus(id, status) {
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