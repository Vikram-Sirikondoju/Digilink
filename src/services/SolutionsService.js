import { Await } from 'react-router-dom'
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
        // /api/v1/catalogs/admin/solutions?page=0&size=10&accId=OP1&order=desc
        //url: 'catalogs/dgl-cat-sol-info',
        url: 'catalogs/admin/solutions',
        method: 'get',
        params,
    })
}

export async function apiGetItemsByItemType(catId, itemType) {
    return ApiService.fetchData({
        url: `catalogs/admin/items?rel_prod_cat_id=${catId}&item_type=${itemType}`,
        method: 'get',
    })
}
export async function apiGetVarientsByItem(item) {
    // return await ApiService.fetchData({
    //     url: `catalogs/admin/item/variant/${item}`,
    //     method: 'get',
    // })
    try {
        const resp = await ApiService.fetchData({
            url: `catalogs/admin/item/variant/${item}`,
            method: 'get',
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

export async function apiSubmitSolBasic(data) {
    return ApiService.fetchData({
        url: '/catalog/dgl-cat-sol-items',
        method: 'post',
        data,
    })
}
export async function apiSolFinalSubmit(data) {
    return ApiService.fetchData({
        url: '/catalogs/dgl-cat-sol-info',
        method: 'post',
        data,
    })
}
export async function apiSolFinalUpdateSubmit(data) {
    return ApiService.fetchData({
        url: '/catalogs/dgl-cat-sol-info',
        method: 'put',
        data,
    })
}

export async function apiUpdateSolutionStatus(id, status) {
    return ApiService.fetchData({
        url: `/catalogs/dgl-cat-sol-info/${id}/${status}`,
        method: 'patch',
    })
}