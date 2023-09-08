import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSalesItems, apiDeleteSalesItems, apiGetItemsByItemType, apiGetVarientsByItem } from 'services/SolutionsService'
import { apiGetProductCategory } from 'services/TemplateService'

export const getSolutions = createAsyncThunk(
    'solutionsList/data/getItems',
    async (data) => {
        
        const response = await apiGetSalesItems(data)
        return response.data
    }
)
export const getProductCategorys = createAsyncThunk(
    'solutionsList/data/getProductCategorys',
    async (data) => {
        const response = await apiGetProductCategory(data)
        return response.data
    }
)
export const getItemsByItemTypeP = createAsyncThunk(
    'solutionsList/data/getItemsByItemTypeP',
    async (data) => {
        const response = await apiGetItemsByItemType(data.catId, data.itemType)
        return response.data
    }
)
export const getItemsByItemTypeD = createAsyncThunk(
    'solutionsList/data/getItemsByItemTypeD',
    async (data) => {
        const response = await apiGetItemsByItemType(data.catId, data.itemType)
        return response.data
    }
)
export const getItemsByItemTypeS = createAsyncThunk(
    'solutionsList/data/getItemsByItemTypeS',
    async (data) => {
        const response = await apiGetItemsByItemType(data.catId, data.itemType)
        return response.data
    }
)
export const getVarientsByItem = createAsyncThunk(
    'solutionsList/data/getVarientsByItem',
    async (data) => {
        const response = await apiGetVarientsByItem(data)
        if (response.status === 'success') {
            return response.data.data
        }
    }
)

export const deleteSolutions = async (data) => {
    const response = await apiDeleteSalesItems(data)
    return response.data
}

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
    name: 'solutionsList/data',
    initialState: {
        loading: false,
        ItemList: [],
        tableData: initialTableData,
        templateProductList:[],
        itemsByItemTypeP : [],
        itemsByItemTypeD : [],
        itemsByItemTypeS : [],

        varients : []

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
        [getSolutions.fulfilled]: (state, action) => {
            
            state.ItemList = action.payload
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getSolutions.pending]: (state) => {
            state.loading = true
        },
        [getProductCategorys.fulfilled]: (state, action) => {
            state.templateProductList = action?.payload?.response?.map((product) => ({
                value: product.id,
                label: product.prod_cat_title,
            }));
            state.loading = false
        },
        [getItemsByItemTypeP.fulfilled]: (state, action) => {
            state.itemsByItemTypeP= action?.payload?.response.map((product) => (
                {
                value: product.id,
                label: product.title,
            }
            ));
            state.loading = false
        },
        [getItemsByItemTypeS.fulfilled]: (state, action) => {
            state.itemsByItemTypeS= action?.payload?.response.map((product) => (
                {
                value: product.id,
                label: product.title,
            }
            ));
            state.loading = false
        },
        [getItemsByItemTypeD.fulfilled]: (state, action) => {
            state.itemsByItemTypeD= action?.payload?.response.map((product) => (
                {
                value: product.id,
                label: product.title,
            }
            ));
            state.loading = false
        },
        [getVarientsByItem.fulfilled]: (state, action) => {
            state.varients= action?.payload?.response.map((product) => (
            {
                value: product.id,
                label: product.item_var_title,
            }
            ));
            state.loading = false
        },
    },
})

export const { setItemList, setTableData } = dataSlice.actions

export default dataSlice.reducer
