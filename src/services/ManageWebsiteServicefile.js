import ApiService from "./ApiService";

export async function apiGetProductCatProvider(data) {
    return ApiService.fetchData({
        url: `/account/prod-cats/unq-id/drop-down/${data.enterAccount}`,
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

export async function apiManagewebSite(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `/account/web-set/${data.id}`,
            method: 'put',
            data
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

export async function apiGetManageWebSiteData(data) {
    return ApiService.fetchData({
        url: `/account/web-set/unq-id/${data.enterAccount}`,
        method: 'get',
    })
}