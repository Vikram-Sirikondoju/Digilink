import ApiService from './ApiService'

export async function apiGetSalesDashboardData(data) {
    return ApiService.fetchData({
        url: '/retails/sales/dashboard',
        method: 'post',
        data,
    })
}

export async function apiGetSalesProducts(data) {
    return ApiService.fetchData({
        url: '/retails/sales/products',
        method: 'post',
        data,
    })
}

export async function apiDeleteSalesProducts(data) {
    return ApiService.fetchData({
        url: '/retails/sales/products/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesProduct(params) {
    return ApiService.fetchData({
        url: '/retails/sales/product',
        method: 'get',
        params,
    })
}

export async function apiPutSalesProduct(data) {
    return ApiService.fetchData({
        url: '/retails/sales/products/update',
        method: 'put',
        data,
    })
}

export async function apiSubmitRetail(data) {
    
    try {
        const resp = await ApiService.fetchData({
            url: `/account/retail-customers`,
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
            message: errors?.response?.data|| errors.toString(),
        };
    }

}

export async function apiUpdateRetail(data) {
    
    try {
        const resp = await ApiService.fetchData({
            url: `/account/retail-customers`,
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
            message: errors?.response?.data|| errors.toString(),
        };
    }
   

}

export async function apiUpdateOperator(data) {

    return ApiService.fetchData({
        url: '/account/acc-operators',
        method: 'put',
        data,
    })

}



// export async function apiGetSalesOrders(params) {
//     return ApiService.fetchData({
//         url: '/retails/sales/orders',
//         method: 'get',
//         params,
//     })
// }

export async function apiGetSalesOrders(params) {

    return ApiService.fetchData({
        //url: `/account/retail-customers?page_no=${params.pageIndex}&page_size=${params.pageSize}&sort_field=${params.sort.key}`,

        url: `/account/retail-customers`,

        method: 'get',
        params

    })
}

export async function apiDeleteSalesOrders(data) {
    return ApiService.fetchData({
        url: '/retails/sales/orders/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesOrderDetails(params) {
    return ApiService.fetchData({
        url: '/retails/sales/orders-details',
        method: 'get',
        params,
    })
}

export async function apiUpdateRetailAccStatus(id, status) {

    return ApiService.fetchData({
        url: `/account/retail-customers?id=${id}&cust_status=${status}`,
        method: 'patch',

    })
}

export async function apiGetCurrency(data) {
    return ApiService.fetchData({
        url: `/account/currency/unq-id/drop-down/${data.enterAccount}`,
        method: 'get',

    })
}

export async function apiGetParentAccount(data) {

    return ApiService.fetchData({
        url: `/account/acc-operators/dropdown/${data.enterAccount}`,
        method: 'get',

    })
}
export async function apiGetCustomerCatRetail(data) {

    return ApiService.fetchData({

        url: `/account/cust-cats/unq-id-acc-type/drop-down/${data.enterAccount}/RetailCustomer`,
        method: 'get',

    })
}
export async function apiGetUploadFileTypes(data) {
    return ApiService.fetchData({
        url: `/account/doc-pol?page_no=0&page_size=100&sort_feild=id&unq_id=${data}`,
        method: 'get',
    })
}