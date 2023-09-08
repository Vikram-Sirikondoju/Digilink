import ApiService from './ApiService'

export async function apiGetAllWorkOrders(params) {
    return ApiService.fetchData({
        url: `/order/dgl-wo-infos`,
        method: 'get',
        params,
    })
}
export async function apiGetWorkOrderById(id) {
    return ApiService.fetchData({
        url: `/order/dgl-wo-infos/${id}`,
        method: 'get',
    })
}


export async function apiCreateWorkOrderLabelling(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `order/dgl-wo-label-infos`,
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

export async function apiCreateWorkOrderLabellingItem(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `order/dgl-wo-label-items`,
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
export async function apiUpdateWorkOrderLabellingItem(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `order/dgl-wo-label-items`,
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
export async function apiDeleteWorkOrderLabellingItem(Id) {
    try {
        const resp = await ApiService.fetchData({
            url: `order/dgl-wo-label-items/${Id}`,
            method: 'delete'
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


export async function apiCreateWorkOrderPackagingItemsBulk(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `order/dgl-wo-package-infos/bulk`,
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
export async function apiGetPickUpTimeSlots(params) {
    return ApiService.fetchData({
        url: `/order/integrate/fedex`,
        method: 'get',
        params,
    })
}


export async function apiCreateWorkOrderShipment(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `order/dgl-wo-ship-infos`,
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

export async function apiUpdateWorkOrderShipment(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `order/dgl-wo-ship-infos`,
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