import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    apiGetCashBackDetails,
    apiGetCustomerCategoryData,
    apiGetOfferDetails,
} from 'services/OfferService'
import { apiGetProductCategoryData } from 'services/ProductCategoryService'

export const getOffersList = createAsyncThunk(
    'offerCashback/data/getOffersList',
    async (data) => {
        const response = await apiGetOfferDetails(data)
        return response.data
    }
)

export const getCashbacksList = createAsyncThunk(
    'offerCashback/data/getCashbacksList',
    async (data) => {
        const response = await apiGetCashBackDetails(data)
        return response.data
    }
)

export const getProdCatList = createAsyncThunk(
    'offerCashback/data/getProdCatList',
    async (data) => {
        const response = await apiGetProductCategoryData(data)
        return response.data
    }
)
export const getCustCatList = createAsyncThunk(
    'offerCashback/data/getCustCatList',
    async (data) => {
        const response = await apiGetCustomerCategoryData(data)
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
    name: 'offerCashback/data',
    initialState: {
        loading: false,
        offerList: [],
        tableData: initialTableData,
        productCategories: [],
        customerCategories: [],
        //cashbacks
        cashbackTableData: initialTableData,
        cashbackList: [],
    },
    reducers: {
        setOfferList: (state, action) => {
            state.offerList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setCashbackTableData: (state, action) => {
            state.cashbackTableData = action.payload
        },
        setCashbackList: (state, action) => {
            state.cashbackList = action.payload
        },
    },
    extraReducers: {
        [getOffersList.fulfilled]: (state, action) => {
            state.offerList = action.payload.res
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getOffersList.pending]: (state) => {
            state.loading = true
        },
        [getProdCatList.fulfilled]: (state, action) => {
            const modified=action.payload.res?.map((product)=> {
                return {...product,"value":product?.id,"label":product?.prod_cat_title}
            })
        
            state.productCategories = modified
            state.loading = false
        },
        [getProdCatList.pending]: (state) => {
            state.loading = true
        },
        [getCustCatList.fulfilled]: (state, action) => {
            const modified=action.payload.res?.map((customer)=> {
                return {...customer,"value":customer?.id,"label":customer?.cust_cat_title}
            })
            state.customerCategories = modified
            state.loading = false
        },
        [getCustCatList.pending]: (state) => {
            state.loading = true
        },

        //cashback
        [getCashbacksList.fulfilled]: (state, action) => {
            state.cashbackList = action.payload.res
            state.cashbackTableData.total = action.payload.total
            state.loading = false
        },
        [getCashbacksList.pending]: (state) => {
            state.loading = true
        },
    },
})

export const {
    setOfferList,
    setTableData,
    setCashbackTableData,
    setCashbackList,
} = dataSlice.actions

export default dataSlice.reducer
