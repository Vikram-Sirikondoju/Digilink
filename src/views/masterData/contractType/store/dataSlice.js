import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAllContractType, apiGetParentAccount } from 'services/ContractTypeService'
import { apiGetSalesOrders, apiDeleteSalesOrders } from 'services/RetailService'

export const getOrders = createAsyncThunk(
    'contractType/data/getOrders',
    async (data) => {

        const response = await apiGetSalesOrders()
        return response.data
    }
)

export const deleteOrders = async (data) => {
    const response = await apiDeleteSalesOrders(data)
    return response.data
}

export const getContractData = createAsyncThunk(
    'contractType/data/getAllData',
    async (data) => {
        const response = await apiGetAllContractType(data)
        
        return response.data
    }
)

export const getParentAccount = createAsyncThunk(
    'contractType/data/getParentAccount',
    async (data) => {
        const response = await apiGetParentAccount(data)

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
    name: 'contractType/data',
    initialState: {
        loading: false,
        orderList: [],
        tableData: initialTableData,
        getAllData: [],
        parentAccountList: [],
    },
    reducers: {
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setGetAllData: (state, action) => {
            state.getAllData = action.payload
        },
        setParentAccountData: (state, action) => {
            state.parentAccountList = action.payload
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
        [getContractData.fulfilled]: (state, action) => {
            state.getAllData = action.payload.res
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getContractData.pending]: (state) => {
            state.loading = true
        },
        [getParentAccount.fulfilled]: (state, action) => {

            state.parentAccountList = action.payload?.map((parent) => ({
                value: parent.id,
                label: parent.acc_name,
                acc_unq_id: parent.acc_unq_id
            }))

            state.loading = false
        },
        [getParentAccount.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setOrderList, setTableData, setGetAllData, setParentAccountData } = dataSlice.actions

export default dataSlice.reducer
