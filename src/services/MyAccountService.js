import ApiService from './ApiService'

export async function apiGetDocPolicyData(params) {
    return ApiService.fetchData({
        url: `/account/doc-pol`,
        method: 'get',
        params,
    })
}
export async function apiUpdateUser(data) {
    try {
        const resp = await ApiService.fetchData({
            url: '/account/acc-users',
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

export async function apiGetUsersData(params) {
    return ApiService.fetchData({
        url: '/account/acc-users',
        method: 'get',
        params,
    })
}
export async function apiCreateUser(data) {
    try {
        const resp = await ApiService.fetchData({
            url: '/account/acc-users',
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

export async function apiUpdateUserAccStatus(id, status) {
    return ApiService.fetchData({
        url: `/account/acc-users?id=${id}&userStatus=${status}`,
        method: 'patch',
    })
}

export async function apiUserRoles(data) {
    return ApiService.fetchData({
        url: `/account/roles/child-roles/drop-down/${data.enterAccount}`,
        method: 'get',
    })
}

export async function apiGetDocTypeDropDown(params) {
    return ApiService.fetchData({
        url: `/account/doc-types/unq-id/${params}`,
        method: 'get',

    })
}

export async function apiCreateDocPolicy(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `account/doc-pol`,
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

export async function apiUpdateDocPolicy(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `account/doc-pol`,
            method: 'put',
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

export async function apiGetAccountDetails(data) {
    return ApiService.fetchData({
        url: `/account/acc-operators/${data.enterAccount}`,
        method: 'get',
    })
}

export async function apiGetPublicRole(data,params) {
    return ApiService.fetchData({
        url: `/account/roles/master-roles/drop-down/${data.acc_mno_parent_unq_id}`,
        method: 'get',
        params
    })
}

export async function apiPostUserRole(data, enterAccount) {
    try {
        const resp = await ApiService.fetchData({
            url: `/account/roles?unqId=${enterAccount}`,
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

export async function apiUpdateUserRole(data,enterAccount) {
    try {
        const resp = await ApiService.fetchData({
            url: `/account/roles?unqId=${enterAccount}`,
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

export async function apiUpdateDocPolicyAccStatus(id, status) {
    return ApiService.fetchData({
        url: `/account/doc-pol?id=${id}&mdDocPolStatus=${status}`,
        method: 'patch',
    })
}

export async function apiGetAllUserRole(params) {
    return ApiService.fetchData({
        url: `/account/roles/unqId/${params.enterAccount}`,
        method: 'get',
        params,
    })
}

export async function apiUpdateChildRoleStatus(id, status) {
    
    return ApiService.fetchData({
        url: `/account/roles?id=${id}&mdRoleStatus=${status}`,
        method: 'patch',
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
