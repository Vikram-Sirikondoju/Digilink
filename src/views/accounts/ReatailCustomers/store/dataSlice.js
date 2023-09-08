import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSalesOrders, apiDeleteSalesOrders, apiGetCurrency, apiGetParentAccount, apiGetCustomerCatRetail, apiGetUploadFileTypes } from 'services/RetailService'

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

export const getOrders = createAsyncThunk(
    'retailsList/data/getOrders',
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
export const getCustomerCategory = createAsyncThunk(
    'salesProductList/data/getCustCategory',
    async (data) => {
        const response = await apiGetCustomerCatRetail(data)

        return response.data
    }
)

export const deleteOrders = async (data) => {
    const response = await apiDeleteSalesOrders(data)
    return response.data
}
export const getUploadFileType = createAsyncThunk(
    'retailsList/data/getUploadFileType',
    async (data) => {
        const response = await apiGetUploadFileTypes(data)
        return response.data
    }
)


const dataSlice = createSlice({
    name: 'retailsList/data',
    initialState: {
        loading: false,
        orderList: [],
        tableData: initialTableData,
        currencyList: [],
        custmoerCatList: [],
        parentAccountList: []
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
        setCustmoerCattData: (state, action) => {
            state.custmoerCatList = action.payload
        },
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


            state.currencyList = action.payload.response?.map((currency) => ({
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
        [getCustomerCategory.fulfilled]: (state, action) => {



            state.custmoerCatList = action.payload.response?.map((customer) => ({
                value: customer.id,
                label: customer.cust_cat_title,
            }));

            state.loading = false
        },
        [getCustomerCategory.pending]: (state) => {
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

export const { setOrderList, setTableData, setCurrencyData, setParentAccountData, setCustmoerCattData } = dataSlice.actions

export default dataSlice.reducer
