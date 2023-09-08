import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSalesItems, apiDeleteSalesItems, apiGetParentAccountDocType, apiGetDocType } from 'services/DocType'

export const getItems = createAsyncThunk(
    'doctypeList/data/getItems',
    async (data) => {
        const response = await apiGetSalesItems()
        return response.data.response
    }
)

export const getDocTypeData = createAsyncThunk(
    'doctypeList/data/getDocTypeData',
    async (data) => {
        const response = await apiGetDocType(data)
        
        return response.data
    }
)

export const getParentAccount = createAsyncThunk(
    'doctypeList/data/getParentAccount',
    async (data) => {
        const response = await apiGetParentAccountDocType(data)
        
        return response.data
    }
)

// export const deleteItems = async (data) => {
//     const response = await apiDeleteSalesItems(data)
//     return response.data
// }

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
    name: 'doctypeList/data',
    initialState: {
        loading: false,
        ItemList: [],
        tableData: initialTableData,
        DocTypeData: [],
        parentAccountList:[],
    },
    reducers: {
        setItemList: (state, action) => {
            state.ItemList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setDocTypeData: (state, action) => {
            state.DocTypeData = action.payload
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
        [getDocTypeData.fulfilled]: (state, action) => {

            state.DocTypeData = action.payload.res
            state.tableData.total = action.payload.total
            state.loading = false
            
        },
        [getDocTypeData.pending]: (state) => {
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

export const { setItemList, setTableData, setDocTypeData, setParentAccountData } = dataSlice.actions

export default dataSlice.reducer
