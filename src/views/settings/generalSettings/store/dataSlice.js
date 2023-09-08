import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCurrency, apiGetOperaterByID, apiGetOperaters } from 'services/GenSettings'
import { apiGetSalesOrders, apiDeleteSalesOrders } from 'services/RetailService'

export const getOrders = createAsyncThunk(
    'genSettings/data/getOrders',
    async (data) => {
        
        const response = await apiGetSalesOrders()
        return response.data
    }
)

export const deleteOrders = async (data) => {
    const response = await apiDeleteSalesOrders(data)
    return response.data
}

export const getOperaters = createAsyncThunk(
    'genSettings/data/getOperater',
    async (data) => {
        const response = await apiGetOperaters(data)
        return response.data
    }
)

export const getByOperaterId = createAsyncThunk(
    "genSettings/data/getOperaterById",
    async (data) => {
        const response = await apiGetOperaterByID(data)
        return response.data?.response
    }
)

export const getCurrency = createAsyncThunk(
    'genSettings/data/getCurrency',
    async (data) => {
        const response = await apiGetCurrency(data)
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
    name: 'genSettings/data',
    initialState: {
        loading: false,
        accountList: [],
        tableData: initialTableData,
        operatorsList : [],
        opInfoByID : [],
        currencyList:[],
    },
    reducers: {
        setOrderList: (state, action) => {
            state.accountList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setOperaterList: (state, action) => {
            state.operatorsList = action.payload
        },
        setOpInfoByID: (state, action) => {
            state.opInfoByID = action.payload
        },
        setCurrencyData: (state, action) => {
            state.currencyList = action.payload
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
        [getOperaters.fulfilled]: (state, action) => {
            state.operatorsList = action.payload?.map((parent) => ({
                value: parent.acc_unq_id,
                label: parent.acc_name,
            }))
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getOperaters.pending]: (state) => {
            state.loading = true
        },
        [getByOperaterId.fulfilled]: (state, action) => {
            state.opInfoByID = action.payload
            state.loading = false
        },
        [getByOperaterId.pending]: (state) => {
            state.loading = true
        },
        [getCurrency.fulfilled]: (state, action) => {
            state.currencyList=action.payload.response?.map((currency) => ({
                value: currency.id,
                label: currency.cur_title,
            }));
            state.loading = false
        },
    },
})

export const { setOrderList, setTableData ,setOperaterList,setOpInfoByID} = dataSlice.actions

export default dataSlice.reducer
