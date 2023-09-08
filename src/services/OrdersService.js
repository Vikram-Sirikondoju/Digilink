import ApiService from './ApiService'

export async function apiGetSalesDashboardData(data) {
    return ApiService.fetchData({
        url: '/provider/sales/dashboard',
        method: 'post',
        data,
    })
}

export async function apiGetSalesProducts(data) {
    return ApiService.fetchData({
        url: '/provider/sales/products',
        method: 'post',
        data,
    })
}

export async function apiDeleteSalesProducts(data) {
    return ApiService.fetchData({
        url: '/provider/sales/products/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesProduct(params) {
    return ApiService.fetchData({
        url: '/provider/sales/product',
        method: 'get',
        params,
    })
}

export async function apiPutSalesProduct(data) {
    return ApiService.fetchData({
        url: '/provider/sales/products/update',
        method: 'put',
        data,
    })
}

export async function apiCreateSalesProduct(data) {
    return ApiService.fetchData({
        url: '/provider/sales/products/create',
        method: 'post',
        data,
    })
}

export async function apiGetSalesOrders(params) {
    return ApiService.fetchData({
        url: 'order/ord-info',
        method: 'get',
        params,
    })
}

export async function apiDeleteSalesOrders(data) {
    return ApiService.fetchData({
        url: '/provider/sales/orders/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesOrderDetails(params) {
    return ApiService.fetchData({
        url: '/provider/sales/orders-details',
        method: 'get',
        params,
    })
}
