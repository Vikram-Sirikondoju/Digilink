import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSalesItems, apiDeleteSalesItems } from 'services/ItemsService'
import { apiGetPagesData, apiGetParentAccountPages } from 'services/PagesService'

export const getItems = createAsyncThunk(
    'Pages/data/getItems',
    async (data) => {
        const response = await apiGetSalesItems()
        return response.data.response
    }
)

export const getPagesList = createAsyncThunk(
    'Pages/data/getPagesList',
    async (data) => {
        const response = await apiGetPagesData(data)
        return response.data
    }
)

export const getParentAccount = createAsyncThunk(
    'Pages/data/getParentAccount',
    async (data) => {
        const response = await apiGetParentAccountPages(data)
        
        return response.data
    }
)

export const deleteItems = async (data) => {
    const response = await apiDeleteSalesItems(data)
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
    name: 'Pages/data',
    initialState: {
        loading: false,
        ItemList: [],
        pagesList:[],
        tableData: initialTableData,
        parentAccountList:[],
    },
    reducers: {
        setItemList: (state, action) => {
            state.ItemList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setPagesList: (state,action) => {
            state.pagesList = action.payload
        },
        setParentAccountData: (state, action) => {
            state.parentAccountList = action.payload
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
        [getPagesList.fulfilled]: (state,action) => {

            state.pagesList = action.payload
            state.loading = false
        },
        [getPagesList.pending]: (state,action) => {
            state.loading = true
        },
        [getParentAccount.fulfilled]: (state, action) => {
            
            state.parentAccountList = action.payload?.map((parent) => ({
                value: parent.id,
                label: parent.acc_name,
                acc_unq_id:parent.acc_unq_id
            }))
           
            state.loading = false
        },
        [getParentAccount.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setItemList, setTableData, setPagesList, setParentAccountData } = dataSlice.actions

export default dataSlice.reducer
