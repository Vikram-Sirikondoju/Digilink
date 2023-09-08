import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiCreateUser,
    apiGetDocPolicyData,
    apiGetUsersData,
    apiGetDocTypeDropDown,
    apiGetAccountDetails,
    apiGetPublicRole,
    apiUserRoles,
    apiGetAllUserRole,
} from 'services/MyAccountService'
import { apiGetSalesOrders, apiDeleteSalesOrders } from 'services/RetailService'
import { apiGetRolePermissions } from 'services/OperatorsService'

export const getOrders = createAsyncThunk(
    'myaccountList/data/getOrders',
    async (data) => {
        const response = await apiGetAllUserRole(data)
        return response.data
    }
)

export const getDocPolicyList = createAsyncThunk(
    'myaccountList/data/getDocPolicyList',
    async (data) => {
        const response = await apiGetDocPolicyData(data)
        return response.data
    }
)

export const getUsersList = createAsyncThunk(
    'myaccountList/data/getUsersList',
    async (data) => {
        const response = await apiGetUsersData(data)

        return response.data
    }
)

export const getUserRoles = createAsyncThunk(
    'myaccountList/data/getUserRoles',
    async (data) => {
        const response = await apiUserRoles(data)
        return response.data
    }
)

export const getDocTypeDropdown = createAsyncThunk(
    'myaccountList/data/getDocTypeDropdown',
    async (data) => {
        const response = await apiGetDocTypeDropDown(data)
        return response.data.response
    }
)

export const getPublicRoles = createAsyncThunk(
    'myaccountList/data/getPublicRoles',
    async (data) => {
        const response = await apiGetPublicRole(data)
        return response.data
    }
)

export const getRolePermissions = createAsyncThunk(
    'myaccountList/data/getRolePermissions',
    async (data) => {
        const response = await apiGetRolePermissions(data)
        return response.data
    }
)

export const getAccountDetails = createAsyncThunk(
    'myaccountList/data/getAccountDetails',
    async (data) => {
        const response = await apiGetAccountDetails(data)
        return response.data
    }
)

export const deleteOrders = async (data) => {
    const response = await apiDeleteSalesOrders(data)
    return response.data
}

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

const dataSlice = createSlice({
    name: 'myaccountList/data',
    initialState: {
        loading: false,
        accountList: [],
        tableData: initialTableData,
        docPolicyList: [],
        usersList: [],
        docTypeDropdownList: [],
        publicRolesList: [],
        rolePermissions: {},
        userRoles: [],
        userRoleAndPermitList: [],
    },
    reducers: {
        setOrderList: (state, action) => {
            state.userRoleAndPermitList = action.payload.res
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setDocPolicyList: (state, action) => {
            state.docPolicyList = action.payload
        },
        setUsersList: (state, action) => {
            state.usersList = action.payload
        },
        setDocTypeDropdownList: (state, action) => {
            state.docTypeDropdownList = action.payload
        },
        setPublicRole: (state, action) => {
            state.publicRolesList = action.payload
        },

        setRolePermissions: (state, action) => {
            state.rolePermissions = action.payload
        },
        setUserRoles: (state, action) => {
            state.userRoles = action.payload
        },
    },
    extraReducers: {
        [getOrders.fulfilled]: (state, action) => {
            state.userRoleAndPermitList = action.payload
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getOrders.pending]: (state) => {
            state.loading = true
        },

        [getDocPolicyList.fulfilled]: (state, action) => {
            state.docPolicyList = action.payload
            state.loading = false
        },
        [getDocPolicyList.pending]: (state, action) => {
            state.loading = true
        },
        [getUsersList.fulfilled]: (state, action) => {
            state.usersList = action.payload
            state.loading = false
        },
        [getUsersList.pending]: (state, action) => {
            state.loading = true
        },
        [getDocTypeDropdown.fulfilled]: (state, action) => {
            state.docTypeDropdownList = action.payload?.map((parent) => ({
                value: parent.id,
                label: parent.doc_type_title,
            }))
            state.loading = false
        },
        [getDocTypeDropdown.pending]: (state, action) => {
            state.loading = true
        },
        [getPublicRoles.fulfilled]: (state, action) => {
            state.publicRolesList = action.payload?.res?.map((parent) => ({
                value: parent.id,
                label: parent.name,
            }))
        },
        [getPublicRoles.pending]: (state, action) => {
            state.loading = true
        },
        [getRolePermissions.fulfilled]: (state, action) => {
            state.rolePermissions = action.payload

            state.loading = false
        },
        [getRolePermissions.pending]: (state) => {
            state.loading = true
        },
        [getAccountDetails.fulfilled]: (state, action) => {
            state.accountList = action.payload
            state.loading = false
        },
        [getAccountDetails.pending]: (state, action) => {
            state.loading = true
        },
        [getUserRoles.fulfilled]: (state, action) => {
            state.userRoles = action.payload.res?.map((userRoles) => ({
                value: userRoles.id,
                label: userRoles.name,
            }))
            state.loading = false
        },
        [getUserRoles.pending]: (state, action) => {
            state.loading = true
        },
    },
})

export const {
    setOrderList,
    setTableData,
    setDocPolicyList,
    setUsersList,
    setDocTypeDropdownList,
    setPublicRole,
    setRolePermissions,
    setUserRoles,
} = dataSlice.actions

export default dataSlice.reducer
