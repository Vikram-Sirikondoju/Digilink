import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCurrAccount, apiGetCurrAccountPartner, apiGetCurrencyData } from 'services/CurrencyService'
import { apiGetSalesItems, apiDeleteSalesItems } from 'services/ItemsService'

export const getItems = createAsyncThunk(
    'CustomerCategoryList/data/getItems',
    async (data) => {
        const response = await apiGetSalesItems()
        return response.data.response
    }
)

export const deleteItems = async (data) => {
    const response = await apiDeleteSalesItems(data)
    return response.data
}


export const getCurrList = createAsyncThunk(
    'currList/data/getCurrList',   
    async (data) => {
        const response = await apiGetCurrencyData(data)
        return response.data
    }
)
export const  getCurrAccount = createAsyncThunk(
    'currList/data/getCurrAccount',
    async (data) => {
        const response = await apiGetCurrAccount(data)
        
        return response.data
    }
)

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        Item: '',
        key: 'id',
    },
}

const dataSlice = createSlice({
    name: 'CustomerCategoryList/data',
    initialState: {
        loading: false,
        ItemList: [],
        tableData: initialTableData,
        currList:[],
        currAccountList:[],
    },
    reducers: {
        setItemList: (state, action) => {
            state.ItemList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setCurrList: (state,action) => {
            state.currList = action.payload
        },
        setCurrAccountData: (state, action) => {
            state.currAccountList = action.payload
        },
    },
    extraReducers: {
        [getItems.fulfilled]: (state, action) => {
            state.ItemList = action.payload
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getItems.pending]: (state) => {
            state.loading = true
        },
        [getCurrList.fulfilled]: (state,action) => {
            state.currList = action.payload.res
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getCurrList.pending]: (state,action) => {
            state.loading = true
        },
        [getCurrAccount.fulfilled]: (state, action) => {
            
            state.currAccountList = action.payload?.map((parent) => ({
                value: parent.id,
                label: parent.acc_name,
                acc_unq_id:parent.acc_unq_id
            }))
           
            state.loading = false
        },
        [getCurrAccount.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setItemList, setTableData,setCurrList } = dataSlice.actions

export default dataSlice.reducer
