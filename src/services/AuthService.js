import ApiService from './ApiService'

export async function apiSignIn(data) {
    return ApiService.fetchData({
        url: '/account/user-login',
        method: 'post',
        data,
    })
}





export async function apiSignUp(data) {
    return ApiService.fetchData({
        url: '/sign-up',
        method: 'post',
        data,
    })
}

export async function apiSignOut(data) {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
        data,
    })
}

export async function apiForgotPasswordOld(data) {
    return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })
}




export async function apiForgotPassword(data) {

    try {
        
        const resp = await ApiService.fetchData({
            url: '/account/acc-user/forgot-pwd/initiate',
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



export async function apiResetPasswordOld(data) {
    return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })
}




export async function apiResetPassword(data) {
    try {
        const resp = await ApiService.fetchData({
            url: '/account/acc-user/forgot-pwd/confirm',
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



export async function apiGetRolePermissions(data) {
    const headers = {
         'USER': data.roleId,
    };
    
    return ApiService.fetchData({
        url: `/account/role-permissions/user/${data.roleId}`,
        method: 'get',
        data,
        headers
    })
}


//GET DATA FOR THEME...
export async function apiGetThemeInfoByUnqid(data) {
    return ApiService.fetchData({
        url: `/account/thm-infos/unq-id/${data}`,
        method: 'get',
    })
}

export async function apiGetOperaterSettingsID(data) {
    return ApiService.fetchData({
        url: `/account/set-gens/unq-id/${data}`,
        method: 'get',
    })
}

export async function apiChangePassword(data) {
    try {
        const resp = await ApiService.fetchData({
            url: '/account/acc-user/reset-pwd',
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

export async function apiGetBrandInfo(data) {
    return ApiService.fetchData({
        url: `/account/meta-data/unq-id/${data}`,
        method: 'get',
    })
}