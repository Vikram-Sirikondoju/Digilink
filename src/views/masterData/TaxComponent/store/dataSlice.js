import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSalesItems, apiDeleteSalesItems } from 'services/ItemsService'
import {apiGetTaxCompData, apiGetParentAccountTaxComp} from 'services/TaxComponentService'

export const getItems = createAsyncThunk(
    'TaxComponentList/data/getItems',
    async (data) => {
        const response = await apiGetSalesItems()
        return response.data.response
    }
)

export const getTaxCompList = createAsyncThunk(
    'TaxComponentList/data/getTaxCompList',
    async (data) => {
        const response = await apiGetTaxCompData(data)
    
        return response.data
    }
)
export const getParentAccount = createAsyncThunk(
    'TaxComponentList/data/getParentAccount',
    async (data) => {
        const response = await apiGetParentAccountTaxComp(data)
        
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
    name: 'TaxComponentList/data',
    initialState: {
        loading: false,
        ItemList: [],
        tableData: initialTableData,
        taxCompList:[],
        parentAccountList:[],
    },
    reducers: {
        setItemList: (state, action) => {
            state.ItemList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setTaxCompList: (state,action) => {
            state.taxCompList = action.payload
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
        [getTaxCompList.fulfilled]: (state,action) => {

            state.taxCompList = action.payload
            state.loading = false
        },
        [getTaxCompList.pending]: (state,action) => {
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

export const { setItemList, setTableData, setTaxCompList, setParentAccountData } = dataSlice.actions

export default dataSlice.reducer
