import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSalesItems, apiDeleteSalesItems, apiGetItemsTableData, apiGetProductCategoryData, apiGetTemplatesInItems, apiGetProductCategoryDataForProvider } from 'services/ItemsService'
import { apiGetTemplates,apiGetItemsTemplateComponents } from 'services/ItemsService'

export const getItems = createAsyncThunk(
    'salesProductList/data/getItems',
    async (data) => {
        const response = await apiGetSalesItems()
        return response.data
    }
)

export const deleteItems = async (data) => {
    const response = await apiDeleteSalesItems(data)
    return response.data
}

// export const getProductCatgeory = async (data) => {
//     const response = await apiProductCategoryItems(data)
//     return response.data
// }

export const getProductCatgeory = createAsyncThunk(
    'itemsList/data/getProductCategory',
    async (data) => {
        if(data.user_type === "Provider"){
            const response = await apiGetProductCategoryData({
                unq_id: data.acc_mno_unq_id
            });
            const providerResponse = await apiGetProductCategoryDataForProvider(data);
            console.log(providerResponse);
            if(providerResponse.data) {
                return response.data.response.filter(val => providerResponse.data.includes(val.id))
            }
        }else {
            const response = await apiGetProductCategoryData(data);
            return response.data.response
        }
    }
)

export const getItemsTemplates = createAsyncThunk(
    'salesProductList/data/getAllTemplattes',
    async (data) => {
        const response = await apiGetTemplates(data)
        return response.data
    }
)

export const getItemsTableData = createAsyncThunk(
    'itemsList/data/getItemTableData',
    async (data) => {
        const response = await apiGetItemsTableData(data)
        return response.data
    }
)

export const apiGetTemplateByItemType = createAsyncThunk(
    'itemsList/data/getTemplatesInItem',
    async (data) => {
        const response = await apiGetTemplatesInItems(data)
        return response?.data?.response
    }
)

export const getTemplateComponents = createAsyncThunk(
    'itemsList/data/getTemplateComponents',
    async (data) => {
        const response = await apiGetItemsTemplateComponents(data)
        return response?.data?.response || []
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
    name: 'itemsList/data',
    initialState: {
        loading: false,
        ItemList: [],
        tableData: initialTableData,
        itemsProductCatList: [],
        itemTableData : [],
        setTemplatesForItems:[],
        setTemplateComponents:[]
    },
    reducers: {
        setItemList: (state, action) => {
            state.ItemList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setItemTableData : (state,action) => {
            state.itemTableData=action.payload;
        },
        setProdCatListToDrp : (state,action) => {
            state.itemsProductCatList = action.payload
        },
        setTemplatesForItems : (state,action) => {
            state.setTemplatesForItems = action.payload
        }
    },
    extraReducers: {
        [getItems.fulfilled]: (state, action) => {
            state.ItemList = action.payload
            state.tableData.total = action?.payload?.total || 0
            state.loading = false
        },
        [getItems.pending]: (state) => {
            state.loading = true
        },
        [getProductCatgeory.fulfilled]: (state, action) => {
            state.itemsProductCatList = action?.payload?.map((product) => ({
                value: product.id,
                label: product.prod_cat_title,
            }));
            state.loading = false
        },
        [getProductCatgeory.pending]: (state) => {
            state.loading = true
        },
        [getItemsTemplates.fulfilled]: (state, action) => {
            state.itemsAllTemplateList = action?.payload
            state.loading = false
        },
        [getItemsTemplates.pending]: (state) => {
            state.loading = true
        },
        [getItemsTableData.fulfilled]: (state, action) => {
            state.itemTableData = action?.payload
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getItemsTableData.pending]: (state) => {
            state.loading = true
        },
        [apiGetTemplateByItemType.fulfilled]: (state, action) => {
            state.setTemplatesForItems = action?.payload
            state.loading = false
        },
        [apiGetTemplateByItemType.pending]: (state) => {
            state.loading = true
        },
        [getTemplateComponents.fulfilled]: (state,action) => {
            state.setTemplateComponents = action?.payload
            state.loading = false
        },
        [getTemplateComponents.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setItemList, setTableData,setItemTableData,setProdCatListToDrp,setTemplatesForItems} = dataSlice.actions

export default dataSlice.reducer
