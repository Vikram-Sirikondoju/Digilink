import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSalesItems, apiDeleteSalesItems } from 'services/ItemsService'
import {apiGetProductCategoryData, apiGetParentAccountProduct} from 'services/ProductCategoryService'

export const getItems = createAsyncThunk(
    'prodCatList/data/getItems',
    async (data) => {
        const response = await apiGetSalesItems()
        return response.data.response
    }
)

export const getProdCatList = createAsyncThunk(
    'prodCatList/data/getProdCatList',
    async (data) => {
        const response = await apiGetProductCategoryData(data)
        return response.data
    }
)


export const getParentAccount = createAsyncThunk(
    'prodCatList/data/getParentAccount',
    async (data) => {
        const response = await apiGetParentAccountProduct(data)
        
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
        key: 'id',
    },
}

const dataSlice = createSlice({
    name: 'prodCatList/data',
    initialState: {
        loading: false,
        ItemList: [],
        tableData: initialTableData,
        productCatList: [],
        parentAccountList:[]
    },
    reducers: {
        setItemList: (state, action) => {
            state.ItemList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setProdCatList: (state,action) => {
            state.productCatList = action.payload
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
        [getProdCatList.fulfilled]: (state,action) => {

            state.productCatList = action.payload.res
            state.tableData.total = action.payload.total
            state.loading = false
            
        },
        [getProdCatList.pending]: (state,action) => {
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

export const { setItemList, setTableData,setProdCatList, setParentAccountData } = dataSlice.actions

export default dataSlice.reducer
