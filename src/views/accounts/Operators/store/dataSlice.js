import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSalesOrders, apiDeleteSalesOrders, apiGetCurrency, apiGetParentAccount, apiGetPublicRole, apiGetRolePermissions, apiGetUploadFileTypes } from 'services/OperatorsService'

export const getOrders = createAsyncThunk(
    'salesProductList/data/getOrders',
    async (data) => {
        const response = await apiGetSalesOrders(data)
        return response.data
    }
)

export const getCurrency = createAsyncThunk(
    'salesProductList/data/getCurrency',
    async (data) => {
        const response = await apiGetCurrency(data)
        return response.data
    }
)

export const getParentAccount = createAsyncThunk(
    'salesProductList/data/getParentAccount',
    async (data) => {
        const response = await apiGetParentAccount(data)
        
        return response.data
    }
)

export const getPublicRoles = createAsyncThunk(
    'salesProductList/data/getPublicRoles',
    async (data) => {
        const response = await apiGetPublicRole(data)
        
        return response.data
    }
)

export const deleteOrders = async (data) => {
    const response = await apiDeleteSalesOrders(data)
    return response.data
}


export const getRolePermissions = createAsyncThunk(
    'salesProductList/data/getRolePermissions',
    async (data) => {
        const response = await apiGetRolePermissions(data)
        return response.data
    }
)

export const getUploadFileType = createAsyncThunk(
    'salesProductList/data/getUploadFileType',
    async (data) => {
        const response = await apiGetUploadFileTypes(data)
        return response.data
    }
)
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
    name: 'salesOrderList/data',
    initialState: {
        loading: false,
        orderList: [],
        tableData: initialTableData,
        currencyList:[],
        parentAccountList:[],
        publicRolesList : [],
        rolePermissions:{},
        fileList:[]
    },
    reducers: {
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setCurrencyData: (state, action) => {
            state.currencyList = action.payload
        },
        setParentAccountData: (state, action) => {
            state.parentAccountList = action.payload
        },
        setPublicRole : (state,action) => {
            state.publicRolesList = action.payload
        },

        setRolePermissions : (state,action) => {
            state.rolePermissions = action.payload
        }
    },
    extraReducers: {
        [getOrders.fulfilled]: (state, action) => {
            state.orderList = action.payload
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getOrders.pending]: (state) => {
            state.loading = true
        },

        [getCurrency.fulfilled]: (state, action) => {
           
           
            state.currencyList=action.payload.response?.map((currency) => ({
                value: currency.id,
                label: currency.cur_title,
            }));

            state.loading = false
        },
        [getCurrency.pending]: (state) => {
            state.loading = true
        },

        [getParentAccount.fulfilled]: (state, action) => {
            state.parentAccountList = action.payload?.map((parent) => ({
                value: parent.id,
                label: parent.acc_name,
            }))
           
            state.loading = false
        },
        [getParentAccount.pending]: (state) => {
            state.loading = true
        },
        [getPublicRoles.fulfilled]: (state,action) => {
            state.publicRolesList = action.payload?.res?.map((parent) => ({
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
        [getUploadFileType.fulfilled]: (state, action) => {
            state.fileList = action.payload
          
            state.loading = false
        },
        [getUploadFileType.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setOrderList, setTableData,setCurrencyData,setParentAccountData,setPublicRole,setRolePermissions } = dataSlice.actions

export default dataSlice.reducer
