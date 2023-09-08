import ApiService from "./ApiService";


export async function apiGetBillingInvoices(params) {
    return ApiService.fetchData({
        url: '/billing/invoice/paging',
        method: 'get',
        params,
    })
}

export async function apiGetBillingBill(params) {
    return ApiService.fetchData({
        url: '/billing/bill/paging',
        method: 'get',
        params,
    })
}

export async function apiGetOrderPayment(params) {
    return ApiService.fetchData({
        url: '/billing/order-payment',
        method: 'get',
        params,
    })
}

export async function apiGetBillingInvoice(id) {
    return ApiService.fetchData({
        url: `/billing/billing-invoice/${id}`,
        method: 'get',
    })
}