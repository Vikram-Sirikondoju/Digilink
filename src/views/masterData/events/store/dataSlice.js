import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
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
    name: 'CustomerCategoryList/data',
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
        [getItems.fulfilled]: (state, action) => {
            state.ItemList = action.payload
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getItems.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setItemList, setTableData } = dataSlice.actions

export default dataSlice.reducer
