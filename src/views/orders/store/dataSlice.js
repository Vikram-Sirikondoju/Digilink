import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deburr } from 'lodash'
import { apiGetSalesOrders,apiDeleteSalesOrders} from 'services/OrdersService'

export const getOrders = createAsyncThunk(
    'salesProductList/data/getItems',
    async (data) => {  
        const response = await apiGetSalesOrders(data)
        console.log(response.data);
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
        Item: '',
        key: '',
    },
}

const dataSlice = createSlice({
    name: 'salesOrderList/data',
    initialState: {
        loading: false,
        ItemList: [],
        tableData: initialTableData,
    },
    reducers: {
        setItemList: (state, action) => {
            state.ItemList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },
    extraReducers: {
        [getOrders.fulfilled]: (state, action) => {
            state.ItemList = action.payload.res
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getOrders.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setItemList, setTableData } = dataSlice.actions

export default dataSlice.reducer
