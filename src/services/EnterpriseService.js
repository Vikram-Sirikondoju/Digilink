import ApiService from './ApiService'

export async function apiGetSalesDashboardData(data) {
    return ApiService.fetchData({
        url: '/enterprise/sales/dashboard',
        method: 'post',
        data,
    })
}

export async function apiGetSalesProducts(data) {
    return ApiService.fetchData({
        url: '/enterprise/sales/products',
        method: 'post',
        data,
    })
}

export async function apiDeleteSalesProducts(data) {
    return ApiService.fetchData({
        url: '/enterprise/sales/products/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesProduct(params) {
    return ApiService.fetchData({
        url: '/enterprise/sales/product',
        method: 'get',
        params,
    })
}

export async function apiPutSalesProduct(data) {
    return ApiService.fetchData({
        url: '/enterprise/sales/products/update',
        method: 'put',
        data,
    })
}

export async function apiCreateSalesProduct(data) {
    return ApiService.fetchData({
        url: '/enterprise/sales/products/create',
        method: 'post',
        data,
    })
}

/* export async function apiGetSalesOrders(params) {
    return ApiService.fetchData({
        url: '/enterprise/sales/orders',
        method: 'get',
        params,
    })
} */

export async function apiGetSalesOrders(params) {

    return ApiService.fetchData({
        //url: `account/enterprise-customers?page_no=${params.pageIndex}&page_size=${params.pageSize}&sort_field=${params.sort.key}`,
        // url: '/sales/orders',
        url: `/account/enterprise-customers`,

        method: 'get',
        params
    })
}

export async function apiDeleteSalesOrders(data) {
    return ApiService.fetchData({
        url: '/enterprise/sales/orders/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetSalesOrderDetails(params) {
    return ApiService.fetchData({
        url: '/enterprise/sales/orders-details',
        method: 'get',
        params,
    })
}

export async function apiSubmitEnterprise(data) {
    try {
        const resp = await ApiService.fetchData({
            url: '/account/enterprise-customers',
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

export async function apiUpdateEnterpriseAccStatus(id, status) {

    return ApiService.fetchData({
        url: `/account/enterprise-customers?id=${id}&cust_status=${status}`,
        method: 'patch',

    })
}

export async function apiUpdateEnterprise(data) {
    try {
        const resp = await ApiService.fetchData({
            url: '/account/enterprise-customers',
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

export async function apiGetParentAccountEnterprise(data) {

    return ApiService.fetchData({
        url: `/account/enterprise-customers/parent/${data.accMnoParentId}`,
        //url: `/account/acc-operators/dropdown/${data.enterAccount}`,    
        method: 'get',

    })
}


export async function apiGetOperatorAccountEnterprise(data) {

    return ApiService.fetchData({
        //url: `/account/enterprise-customers/parent/${data.accMnoParentId}`,   
        url: `/account/acc-operators/dropdown/${data.enterAccount}`,
        method: 'get',

    })
}


export async function apiGetCurrencyEnterprise(data) {

    return ApiService.fetchData({
        url: `/account/currency/unq-id/drop-down/${data.enterAccount}`,
        method: 'get',
    })
}



export async function apiGetCustomerCatEnterprise(data) {

    return ApiService.fetchData({

        url: `/account/cust-cats/unq-id-cust-type/drop-down/${data.enterAccount}/EnterpriseCustomer`,
        method: 'get',

    })
}


export async function apiGetContractTypeEnterprise(data) {

    return ApiService.fetchData({
        url: `/account/contract-types/unq-id-acc-type/drop-down/${data.enterAccount}/EnterpriseCustomer`,
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