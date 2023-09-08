import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSalesOrders, apiDeleteSalesOrders } from 'services/RetailService'

export const getOrders = createAsyncThunk(
    'myaccountList/data/getOrders',
    async (data) => {
        
        const response = await apiGetSalesOrders()
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
    },
    reducers: {
        setOrderList: (state, action) => {
            state.accountList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
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
    },
})

export const { setOrderList, setTableData } = dataSlice.actions

export default dataSlice.reducer
