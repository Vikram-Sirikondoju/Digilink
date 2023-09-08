import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetManageWebSiteData, apiGetProductCatProvider } from 'services/ManageWebsiteServicefile'
import { apiGetSalesOrders, apiDeleteSalesOrders } from 'services/RetailService'

export const getOrders = createAsyncThunk(
    'manageWebsite/data/getOrders',
    async (data) => {
        
        const response = await apiGetSalesOrders()
        return response.data
    }
)

export const deleteOrders = async (data) => {
    const response = await apiDeleteSalesOrders(data)
    return response.data
}


export const getProductCategory = createAsyncThunk(
    'manageWebsite/data/getProductCategory',
    async (data) => {
        const response = await apiGetProductCatProvider(data)
        
        return response.data
    }
)

export const getManageWebSite = createAsyncThunk(
    'manageWebsite/data/getManageWebSite',
    async (data) => {
        const response = await apiGetManageWebSiteData(data)
        return response.data.response
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
    name: 'manageWebsite/data',
    initialState: {
        loading: false,
        accountList: [],
        tableData: initialTableData,
        productCatList:[],
        getManageWebSiteData : []
    },
    reducers: {
        setOrderList: (state, action) => {
            state.accountList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setProductCattData: (state, action) => {
            state.productCatList = action.payload
        },
        setManageWebsiteData: (state,action) => {
            state.getManageWebSiteData = action.payload
        }
    },
    extraReducers: {
        [getOrders.fulfilled]: (state, action) => {
            state.accountList = action.payload
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getOrders.pending]: (state) => {
            state.loading = true
        },
        [getProductCategory.fulfilled]: (state, action) => {            
            state.productCatList=action.payload.response?.map((product) => ({
                value: product.id,
                label: product.prod_cat_title,
            }));
            state.loading = false
        },
        [getProductCategory.pending]: (state) => {
            state.loading = true
        },
        [getManageWebSite.fulfilled]: (state, action) => {   
            state.getManageWebSiteData=action.payload
            state.loading = false
        },
        [getManageWebSite.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setOrderList, setTableData ,setManageWebsiteData} = dataSlice.actions

export default dataSlice.reducer
