import ApiService from './ApiService'

export async function apiGetProductCategoryData(params) {
    
    return ApiService.fetchData({
        url: '/account/prod-cats',
        method: 'get',
        params,
    })
}


export async function apiProdCategoryCreateUser(data) {
    try {
        const resp = await ApiService.fetchData({
            url: '/account/prod-cats',
            method: 'post',
            data,
        })
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

export async function apiUpdateProdCatAccStatus(id, status) {

    return ApiService.fetchData({
        url:`/account/prod-cats?id=${id}&mdProdCatStatus=${status}`,
        // url: `/account/prod-cats?id=${id}&userStatus=${status}`,
        method: 'patch',

    })
}

export async function apiUpdateProdCat(data) {
    try {
        const resp = await ApiService.fetchData({
            url: `/account/prod-cats/${data.id}`,
            method: 'put',
            data,
        })
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



export async function apiGetParentAccountProduct(data) {
    return ApiService.fetchData({
        url: `/account/acc-operators/dropdown/${data.enterAccount}`,
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