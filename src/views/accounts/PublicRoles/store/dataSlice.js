import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSalesOrders, apiDeleteSalesOrders, apiGetPublicRoles, apiGetRolePermissions, apiGetPublicRole, apiGetRolePermissionsForEdit } from 'services/PublicRolesService'


export const getOrders = createAsyncThunk(
    'publicRoles/data/getOrders',
    async (data) => {
        const response = await apiGetSalesOrders(data)
        return response.data
    }
)

export const getPublicRoles = createAsyncThunk(
    'publicRoles/data/getPublicRoles',
    async (data) => {
        const response = await apiGetPublicRoles(data)
        return response.data
    }
)
//RolesDropdown
export const getPublicRolesData = createAsyncThunk(
    'publicRoles/data/getPublicRolesData',
    async (data) => {
        const response = await apiGetPublicRole(data)
        return response.data
    }
)

export const getRolePermissions = createAsyncThunk(
    'publicRoles/data/getRolePermissions',
    async (data) => {
        const response = await apiGetRolePermissions(data)
        return response.data
    }
)

export const getRolePermissionsForEdit = createAsyncThunk(
    'publicRoles/data/getRolePermissionsForEdit',
    async (data) => {
        const response = await apiGetRolePermissionsForEdit(data)
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
    name: 'publicRoles/data',
    initialState: {
        loading: false,
        orderList: [],
        tableData: initialTableData,
        publicRoles:[],
        publicRolesList:[],
        rolePermissions:{},
        rolePermissionsForEdit:{}
    },
    reducers: {
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setPublicRoles: (state, action) => {
            state.tableData = action.payload
        },
        setPublicRolesData : (state,action) => {
            state.publicRolesList = action.payload
        },
        setRolePermissions : (state,action) => {
            state.rolePermissions = action.payload
        },   
        setRolePermissionsForEdit : (state,action) => {
            state.rolePermissionsForEdit = action.payload
        },
    },
    extraReducers: {
        [getOrders.fulfilled]: (state, action) => {
            state.orderList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getOrders.pending]: (state) => {
            state.loading = true
        },
        [getPublicRoles.fulfilled]: (state, action) => {
            state.publicRoles = action.payload;
            state.loading = false
        },
        [getPublicRolesData.pending]: (state) => {
            state.loading = true
        },
        [getPublicRolesData.fulfilled]: (state,action) => {
            state.publicRolesList = action.payload?.response?.map((parent) => ({
                value: parent.id,
                label: parent.name,
            }))
        },
        [getPublicRoles.pending]:(state,action)=> {
            state.loading = true
        },
        [getRolePermissions.fulfilled]: (state, action) => {
            state.rolePermissions = action.payload
          
            state.loading = false
        },
        [getRolePermissions.pending]: (state) => {
            state.loading = true
        },
        [getRolePermissionsForEdit.fulfilled]: (state, action) => {
            state.rolePermissionsForEdit = action.payload
          
            state.loading = false
        },
        [getRolePermissionsForEdit.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setOrderList, setTableData,setPublicRoles,setPublicRolesData,setRolePermissions,setRolePermissionsForEdit } = dataSlice.actions

export default dataSlice.reducer
