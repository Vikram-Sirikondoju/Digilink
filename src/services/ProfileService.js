import ApiService from './ApiService'

export async function apiGetProfileDetails(data) {
    
    return ApiService.fetchData({
        url: `/account/acc-users/${data?.acc_unq_id}`,
        method: 'get',
        data
    })
}

export async function apiSubmitProfileData(data) {

    try {
        
        const resp = await ApiService.fetchData({
            url: `/account/acc-users`,
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

