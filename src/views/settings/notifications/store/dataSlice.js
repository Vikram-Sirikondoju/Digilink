import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSalesItems, apiDeleteSalesItems } from 'services/ItemsService'
import { apiGetNotification, apiGetNotificationAccount } from 'services/NotificationService'



export const getItems = createAsyncThunk(
    'notificationList/data/getItems',
    async (data) => {
        const response = await apiGetSalesItems()
        return response.data.response
    }
)

export const deleteItems = async (data) => {
    const response = await apiDeleteSalesItems(data)
    return response.data
}

export const getNotificationList = createAsyncThunk(
    'notificationList/data/getNotificationList',
    async (data) => {
        const response = await apiGetNotification(data)
        return response.data
    }
)

export const getNotificationAccount = createAsyncThunk(
    'notificationList/data/getNotificationAccount',
    async (data) => {
        const response = await apiGetNotificationAccount(data)
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
        key: 'id',
    },
}

const dataSlice = createSlice({
    name: 'notificationsList/data',
    initialState: {
        loading: false,
        // ItemList: [],
        tableData: initialTableData,
        notificationList: [],
        notificationAccList: []

    },
    reducers: {
        setItemList: (state, action) => {
            state.ItemList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setNotificationList: (state, action) => {
            state.notificationList = action.payload
        },
        setNotificationAccountData: (state, action) => {
            state.notificationAccList = action.payload
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
        [getNotificationList.fulfilled]: (state, action) => {
            state.notificationList = action.payload.res
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getNotificationList.pending]: (state, action) => {
            state.loading = true
        },
        [getNotificationAccount.fulfilled]: (state, action) => {
            
            state.notificationAccList = action.payload?.map((parent) => ({
                value: parent.id,
                label: parent.acc_name,
                acc_unq_id:parent.acc_unq_id
            }))
           
            state.loading = false
        },
        [getNotificationAccount.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setOrderList, setTableData, setNotificationList, setNotificationAccountData } = dataSlice.actions

export default dataSlice.reducer
