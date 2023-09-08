import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCustAccount, apiGetCustData } from 'services/CustCategoryService'
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

export const getCustList = createAsyncThunk(
    'custList/data/getCustList',   
    async (data) => {
        const response = await apiGetCustData(data)
        return response.data
    }
)
export const  getCustAccount = createAsyncThunk(
    'custList/data/getCustAccount',
    async (data) => {
        const response = await apiGetCustAccount(data)
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
        custList:[],
        custAccountList:[]
    },
    reducers: {
        setItemList: (state, action) => {
            state.ItemList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setCustList: (state,action) => {
            state.custList = action.payload
        },
        setCustAccountData: (state, action) => {
            state.custAccountList = action.payload
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
        [getCustList.fulfilled]: (state,action) => {
            state.custList = action.payload.res
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getCustList.pending]: (state,action) => {
            state.loading = true
        },
        [getCustAccount.fulfilled]: (state, action) => {
            
            state.custAccountList = action.payload?.map((parent) => ({
                value: parent.id,
                label: parent.acc_name,
                acc_unq_id:parent.acc_unq_id
            }))
            state.loading = false
        },
        [getCustAccount.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setItemList, setTableData,setCustList } = dataSlice.actions

export default dataSlice.reducer
