import ApiService from './ApiService'

export async function apiGetSalesDashboardData(data) {
    return ApiService.fetchData({
        url: '/sales/dashboard',
        method: 'post',
        data,
    })
}

export async function apiGetSalesProducts(data) {
    return ApiService.fetchData({
        url: '/sales/products',
        method: 'post',
        data,
    })
}

export async function apiDeleteSalesProducts(data) {
    return ApiService.fetchData({
        url: '/sales/products/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesProduct(params) {
    return ApiService.fetchData({
        url: '/sales/product',
        method: 'get',
        params,
    })
}

export async function apiPutSalesProduct(data) {
    return ApiService.fetchData({
        url: '/sales/products/update',
        method: 'put',
        data,
    })
}

export async function apiCreateSalesProduct(data) {
    return ApiService.fetchData({
        url: '/sales/products/create',
        method: 'post',
        data,
    })
}

export async function apiGetSalesOrders(params) {

    return ApiService.fetchData({
        url: `/account/acc-operators`,
        //url: `/account/acc-operators?page_no=0&page_size=1000&sort_field=id`,    

        method: 'get',
        params
    })
}

export async function apiDeleteSalesOrders(data) {
    return ApiService.fetchData({
        url: '/sales/orders/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesOrderDetails(params) {
    return ApiService.fetchData({
        url: '/sales/orders-details',
        method: 'get',
        params,
    })
}

export async function apiSubmitOperator(data) {
    return ApiService.fetchData({
        url: '/catalogs/dgl-cat-tp-info',
        method: 'post',
        data,
    })
}

export async function apiUpdateOperator(data) {
    return ApiService.fetchData({
        url: '/catalogs/dgl-cat-tp-info',
        method: 'put',
        data,
    })
}

export async function apiUpdateOpAccStatus(id, status) {

    return ApiService.fetchData({
        url: `/account/acc-operators?id=${id}&acc_status=${status}`,
        method: 'patch',

    })
}


export async function apiGetCurrency(params) {
    return ApiService.fetchData({
        url: `/account/currency/unq-id/1`,
        method: 'get',
        params
    })
}


export async function apiGetParentAccount(data) {

    return ApiService.fetchData({
        url: `/account/acc-operators/dropdown/${data.enterAccount}`,
        method: 'get',

    })
}

export async function apiGetPublicRole(params) {
    return ApiService.fetchData({
        url: `/account/roles`,
        method: 'get',
        params
    })
}


export async function apiGetRolePermissions(data) {

    return ApiService.fetchData({
        url: `/account/role-permissions/role/${data.roleId}`,
        method: 'get',

    })
}

export async function apiGetTemplates(params) {
    return ApiService.fetchData({
        
        //url: '/catalogs/dgl-cat-tp-info',
        url: '/catalogs/admin/templates',
        method: 'get',
        params,
    })
}

export async function apiProductCategoryItems(params) {
    return ApiService.fetchData({
        url: '/catalogs/cat-items-info/items',
        method: 'get',
        params,
    })
}

export async function apiGetProductCategory(data) {
    return ApiService.fetchData({
        url: `/account/prod-cats/unq-id/drop-down/${data.enterAccount}`,
        method: 'get',
        

    })
}

export async function apiUpdateTemplateAccStatus(id, status) {
    return ApiService.fetchData({
        url: `/catalogs/dgl-cat-tp-info/${id}/${status}`,
        method: 'patch',
    })
}

