

import ApiService from './ApiService'

// export async function getNotificationsTableData(data) {
//     return ApiService.fetchData({
//         url: `account/notifications?page_no=${data.page_no}&page_size=${data.page_size}&sort_field=${data.sort_field}`,
//         method: 'get',
//     })
// }

export async function apiGetNotification(params) {

    return ApiService.fetchData({
        url: '/account/notifications',
        method: 'get',
        params,
    })
}

export async function apiUpdateNotificationStatus(id, status) {
    return ApiService.fetchData({
        url: `/account/notifications?id=${id}&ntf_status=${status}`,
        method: 'patch',

    })
}


export async function apiCreateNotification(data) {
    try {
        const resp = await ApiService.fetchData({
            url: '/account/notifications',
            method: 'post',
            data,
        });
        return {
            status: 'success',
            data: resp,
        };

    } catch (errors) {
        return {
            status: 'failed',
            message: errors?.response?.data || errors.toString(),
        };
    }

}

export async function apiUpdateNotification(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `/account/notifications/${data.id}`,
            method: 'put',
            data,
        });
        return {
            status: 'success',
            data: resp,
        };

    } catch (errors) {
        return {
            status: 'failed',
            message: errors?.response?.data || errors.toString(),
        };
    }
}


export async function apiGetNotificationAccount(data) {
    return ApiService.fetchData({
        url: `/account/acc-operators/dropdown/${data.enterAccount}`,
        method: 'get',
    })
}