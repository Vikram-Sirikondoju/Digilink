import ApiService from './ApiService'

export async function apiGetSalesDashboardData(data) {
    return ApiService.fetchData({
        url: '/partner/sales/dashboard',
        method: 'post',
        data,
    })
}

export async function apiGetSalesProducts(data) {
    return ApiService.fetchData({
        url: '/partner/sales/products',
        method: 'post',
        data,
    })
}

export async function apiDeleteSalesProducts(data) {
    return ApiService.fetchData({
        url: '/partner/sales/products/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesProduct(params) {
    return ApiService.fetchData({
        url: '/partner/sales/product',
        method: 'get',
        params,
    })
}

export async function apiPutSalesProduct(data) {
    return ApiService.fetchData({
        url: '/partner/sales/products/update',
        method: 'put',
        data,
    })
}

export async function apiCreateSalesProduct(data) {
    return ApiService.fetchData({
        url: '/partner/sales/products/create',
        method: 'post',
        data,
    })
}

export async function apiGetSalesOrders(params) {
    return ApiService.fetchData({
        //url: `/account/partner?page_no=${params.pageIndex}&page_size=${params.pageSize}&sort_feild=${params.sort.key}`,

        url: `/account/partner`,
        method: 'get',
        params,
    })
}

export async function apiDeleteSalesOrders(data) {
    return ApiService.fetchData({
        url: '/partner/sales/orders/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesOrderDetails(params) {
    return ApiService.fetchData({
        url: '/partner/sales/orders-details',
        method: 'get',
        params,
    })
}

export async function apiSubmitPartner(data) {
    try {
        const resp = await ApiService.fetchData({
            url: '/account/partner',
            method: 'post',
            data,
        })
        return {
            status: 'success',
            data: resp, // Include the response data if needed
        }
    } catch (errors) {
        return {
            status: 'failed',
            message: errors?.response?.data || errors.toString(),
        }
    }
}

export async function apiUpdatePartner(data) {
    try {
        const resp = await ApiService.fetchData({
            url: '/account/partner',
            method: 'put',
            data,
        })

        return {
            status: 'success',
            data: resp, // Include the response data if needed
        }
    } catch (errors) {
        return {
            status: 'failed',
            message: errors?.response?.data || errors.toString(),
        }
    }
}

export async function apiUpdateAccPartnerStatus(id, status) {
    return ApiService.fetchData({
        url: `/account/acc-operators?id=${id}&acc_status=${status}`,
        method: 'patch',
    })
}

export async function apiGetCurrencyPartner(data) {
    return ApiService.fetchData({
        url: `/account/currency/unq-id/drop-down/${data.enterAccount}`,
        method: 'get',
    })
}

export async function apiGetParentAccountPartner(data) {
    return ApiService.fetchData({
        url: `/account/acc-operators/dropdown/${data.enterAccount}`,
        method: 'get',
    })
}

export async function apiGetContractTypePartner(data) {
    return ApiService.fetchData({
        url: `/account/contract-types/unq-id-acc-type/drop-down/${data.enterAccount}/Partner`,
        method: 'get',
    })
}

export async function apiGetPublicRole(data) {
    return ApiService.fetchData({
        url: `/account/roles/master-roles/drop-down/${data.acc_mno_parent_unq_id}`,
        //url: `/account/roles/master-roles/GL1`,
        method: 'get',
    })
}

export async function apiGetUploadFileTypes(data) {
    return ApiService.fetchData({
        url: `/account/doc-pol?page_no=0&page_size=100&sort_feild=id&unq_id=${data}`,
        method: 'get',
    })
}

export async function apiUploadFiles(file,loc1, loc2) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const resp = await ApiService.fetchData({
            url: `/media/${loc1}/${loc2}`,
            method: 'post',
            data: formData,
            headers:{'Content-Type': 'multipart/form-data'}
        })
        return {
            status: 'success',
            data: resp.data,
        };
    } catch (errors) {
        return {
            status: 'failed',
            message: errors?.response?.data || errors.toString(),
        };
    }
}