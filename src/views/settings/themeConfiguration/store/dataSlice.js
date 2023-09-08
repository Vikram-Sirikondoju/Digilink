import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSalesOrders, apiDeleteSalesOrders } from 'services/RetailService'
import { apiGetThemeInfoByUnqid } from 'services/ThemeConfigService'

export const getOrders = createAsyncThunk(
    'themeInfo/data/getOrders',
    async (data) => {
        
        const response = await apiGetSalesOrders()
        return response.data
    }
)

export const GetThemeInfo = createAsyncThunk(
    'themeInfo/data/getOrders',
    async (data) => {
        const response = await apiGetThemeInfoByUnqid(data)
        return response.data.response
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
    name: 'themeInfo/data',
    initialState: {
        loading: false,
        accountList: [],
        tableData: initialTableData,
        getThemeData : []
    },
    reducers: {
        setOrderList: (state, action) => {
            state.accountList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setThemeData: (state, action) => {
            state.getThemeData = action.payload
        }
    },
    extraReducers: {
        [getOrders.fulfilled]: (state, action) => {
            state.accountList = action.payload
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getOrders.pending]: (state) => {
            state.loading = true
        },
        [GetThemeInfo.fulfilled]: (state, action) => {
            state.getThemeData = action.payload
            state.loading = false
        },
        [GetThemeInfo.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setOrderList, setTableData ,setThemeData} = dataSlice.actions

export default dataSlice.reducer
