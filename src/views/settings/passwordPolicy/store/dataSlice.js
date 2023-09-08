import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAllData, apiGetSalesItems, apiUserRoles } from 'services/PasswordPolicy'



export const getItems = createAsyncThunk(
    'passwordPolicy/data/getItems',
    async (data) => {
        const response = await apiGetSalesItems()
        return response.data.response
    }
)

export const getAllData = createAsyncThunk(
    "passwordPolicy/data/getAllData",
    async (data) => {
        const response = await apiGetAllData(data)
        return response.data
    }
)

export const getUserRoles = createAsyncThunk(
    'passwordPolicy/data/getUserRoles',
    async (data) => {
        const response = await apiUserRoles(data)
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
        key: '',
    },
}


const dataSlice = createSlice({
    name: 'passwordPolicy/data',
    initialState: {
        loading: false,
        ItemList: [],
        tableData: initialTableData,
        getAllData : [],
        usersList: [],
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
        setGetAllData: (state, action) => {
            state.getAllData = action.payload
        },
        setUsersList: (state, action) => {
            state.usersList = action.payload
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
        [getAllData.fulfilled]: (state, action) => {
            state.getAllData = action.payload
            state.loading = false
        },
        [getAllData.pending]: (state) => {
            state.loading = true
        },
        [getUserRoles.fulfilled]: (state, action) => {
            state.usersList = action.payload.res?.map((parent) => ({
                value: parent.id,
                label: parent.name,
            }))
            state.loading = false
        },
        [getUserRoles.pending]: (state, action) => {
            state.loading = true
        },
    },
})

export const { setItemList,setTableData,setGetAllData,setUsersList} = dataSlice.actions

export default dataSlice.reducer
