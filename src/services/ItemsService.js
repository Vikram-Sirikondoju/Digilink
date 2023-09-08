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

export async function apiGetSalesItems(params) {
    return ApiService.fetchData({
        url: '/catalogs/dgl-cat-items-info',
        method: 'get',
        params,
    })
}

export async function apiGetSalesItemVariants(id) {
    return ApiService.fetchData({
        url: `catalogs/admin/items/${id}`,
        method: 'get',
    })
}

export async function apiGetSalesItemVariantsByItemId(id) {
    return ApiService.fetchData({
        url: `catalogs/admin/item/variant/${id}`,
        method: 'get',
    })
}


export async function apiDeleteSalesItems(data) {
    return ApiService.fetchData({
        url: '/sales/orders/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesItemDetails(params) {
    return ApiService.fetchData({
        url: '/sales/orders-details',
        method: 'get',
        params,
    })
}

export async function apiCreateItem(data) {
    try {
        const resp = await ApiService.fetchData({
            url: '/catalogs/dgl-cat-items-info',
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

export async function apiGetTemplates(params) {
    return ApiService.fetchData({
        url: '/catalogs/cat-tp-info',
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
        url: `/account/prod-cats?page_no=1&page_size=4`,
        method: 'get',
        data
    })
}

export async function apiUpdateItemAccStatus(params,status) {
    return ApiService.fetchData({
        url: `/catalogs/dgl-cat-items-info/${params}/${status}`,
        method: 'patch',
    })
}

export async function apiGetItemsTableData(params) {
    return ApiService.fetchData({
        url: `/catalogs/admin/items-pageable`,
        method: 'get',
        params
    })
}

export async function apiGetProductCategoryData(params) {
    
    return ApiService.fetchData({
        url: `/account/prod-cats/unq-id/drop-down/${params.unq_id}`,
        method: 'get',
    })
}

export async function apiGetTemplatesInItems(params) {
    return ApiService.fetchData({
        url: `/catalogs/admin/templates/${params.unq_id}/${params.category}/${params.type}?tpStatus=ACTIVE`,
        method: 'get',
    })
}

export async function apiGetItemsTemplateComponents(params) {
    return ApiService.fetchData({
        url: `/catalogs/admin/items-tax/${params}`,
        method: 'get',
    })
}

export async function apiGetProductCategoryDataForProvider(params) {
    
    return ApiService.fetchData({
        url: `/account/provider/get-prod-cat/${params.unq_id}`,
        method: 'get',
    })
}