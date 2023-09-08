import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetInventoryDataForWarehouse } from 'services/InventoryService'
import { apiGetSalesItemVariants, apiGetSalesItemVariantsByItemId, apiGetSalesItems } from 'services/ItemsService'
import {  apiGetWarehouseData, apiGetWarehouseDetails } from 'services/WareHouseService'
import { apiGetAllWorkOrders, apiGetWorkOrderById } from 'services/WorkOrderService'

export const getWarehouseDetails = createAsyncThunk(
    'wareHouse/data/getWarehouseDetails',
    async (data) => {
        const response = await apiGetWarehouseDetails(data)
        return response.data
    }
)

export const getInventoryDetails = createAsyncThunk(
    'wareHouse/data/getInventoryDetails',
    async (data) => {
        const response = await apiGetInventoryDataForWarehouse(data)
        return response.data
    }
)

export const getWareHouseList = createAsyncThunk(
    'wareHouse/data/getWareHouseList',
    async (data) => {
        const response = await apiGetWarehouseData(data);
        return response.data
    }
)

export const getItems = createAsyncThunk(
    'wareHouse/data/getItems',
    async (data) => {
        const response = await apiGetSalesItems()
        return response.data
    }
)

export const getItemVariants = createAsyncThunk(
    'wareHouse/data/getItemVariants',
    async (id) => {
        const response = await apiGetSalesItemVariants(id)
        return response.data
    }
)
export const getSalesItemVariantsByItemId = createAsyncThunk(
    'wareHouse/data/ItemVariantsByItemId',
    async (id) => {
        const response = await apiGetSalesItemVariantsByItemId(id)
        return response.data
    }
)
//work orders
export const getAllWorkOrders = createAsyncThunk(
    'wareHouse/data/getAllWorkOrders',
    async (data) => {
        const response = await apiGetAllWorkOrders(data)
        return response.data
    }
)
export const getWorkOrderById = createAsyncThunk(
    'wareHouse/data/getWorkOrderById',
    async (id) => {
        const response = await apiGetWorkOrderById(id)
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
    name: 'wareHouse/data',
    initialState: {
        loading: false,
        wareHouseList: [],
        tableData: initialTableData,
        inventoryList: [],
        inventoryTableData: initialTableData,
        whList: [],
        itemList: [],
        productItems: [],//similar to itemList
        itemVariants: [],
        selectedItem: {},
        workOrderTableData:initialTableData,
        allWorkOrdersList:[],
        workOrderItem:null
    },
    reducers: {
        setWareHouseList: (state, action) => {
            state.wareHouseList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setInventoryTableData: (state, action) => {
            state.inventoryTableData = action.payload
        },
        setWorkOrderTableData: (state, action) => {
            state.workOrderTableData = action.payload
        },
        setWhList: (state, action) => {
            state.whList = action.payload
        },
        setSelectedItem: (state, action) => {
            state.selectedItem = action.payload;
        }
    },
    extraReducers: {
        [getWarehouseDetails.fulfilled]: (state, action) => {
            state.wareHouseList = action.payload.content
            state.tableData.total = action.payload.total_elements
            state.loading = false
        },
        [getWarehouseDetails.pending]: (state) => {
            state.loading = true
        },
        [getInventoryDetails.fulfilled]: (state, action) => {
            state.inventoryList = action.payload.content
            state.inventoryTableData.total = action.payload.total_elements
            state.loading = false
        },
        [getInventoryDetails.pending]: (state) => {
            state.loading = true
        },
        [getWareHouseList.fulfilled]: (state, action) => {
            state.whList = action.payload?.response?.map((wh) => ({
                value: wh.id,
                label: wh.wh_title,
            }));
            state.loading = false
        },
        [getWareHouseList.pending]: (state) => {
            state.loading = true
        },
        [getItems.fulfilled]: (state, action) => {
            state.itemList = action.payload?.response?.map((itm) => ({
                value: itm.id,
                label: itm.item_title,
            }));
            state.loading = false
        },
        [getItems.pending]: (state) => {
            state.loading = true
        },
        [getItemVariants.fulfilled]: (state, action) => {
            state.itemVariants = action.payload?.response?.map((itm) => ({
                value: itm.id,
                label: itm.item_var_title,
            }));
            // state.productItems=action.payload?.response
            state.loading = false
        },
        [getItemVariants.pending]: (state) => {
            state.loading = true
        },
        [getAllWorkOrders.fulfilled]: (state, action) => {
            state.allWorkOrdersList = action.payload.res
            state.workOrderTableData.total = action.payload.total
            state.loading = false
        },
        [getAllWorkOrders.pending]: (state) => {
            state.loading = true
        },
        [getWorkOrderById.fulfilled]: (state, action) => {
            state.workOrderItem = action.payload.response
            state.loading = false
        },
        [getWorkOrderById.pending]: (state) => {
            state.loading = true
        },
    },
})



export const { setOrderList, setTableData, setInventoryTableData,  setWhList, setWareHouseList, setSelectedItem,setWorkOrderTableData } = dataSlice.actions

export default dataSlice.reducer
