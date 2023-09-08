import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetBrandInfoByUnqid } from 'services/BrandInfoService'
import { apiGetSalesOrders, apiDeleteSalesOrders } from 'services/RetailService'

export const getOrders = createAsyncThunk(
    'brandInfo/data/getOrders',
    async (data) => {
        
        const response = await apiGetSalesOrders()
        return response.data
    }
)

export const deleteOrders = async (data) => {
    const response = await apiDeleteSalesOrders(data)
    return response.data
}


export const GetBrandInfo = createAsyncThunk(
    'brandInfo/data/getBrandInfo',
    async (data) => {
        const response = await apiGetBrandInfoByUnqid(data)
        return response.data.data.response
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
    name: 'brandInfo/data',
    initialState: {
        loading: false,
        accountList: [],
        tableData: initialTableData,
        getBrandData : []
    },
    reducers: {
        setOrderList: (state, action) => {
            state.accountList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setBrandData: (state, action) => {
            state.getBrandData = action.payload
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
        [GetBrandInfo.fulfilled]: (state, action) => {
            state.getBrandData = action.payload
            state.loading = false
        },
        [GetBrandInfo.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setOrderList, setTableData,setBrandData } = dataSlice.actions

export default dataSlice.reducer
