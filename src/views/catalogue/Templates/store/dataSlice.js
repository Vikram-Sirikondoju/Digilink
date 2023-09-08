import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { apiGetSalesItems, apiDeleteSalesItems,  } from 'services/ItemsService'
import { apiGetProductCategory,apiGetTemplates,apiDeleteSalesProducts} from 'services/TemplateService'

export const getTemplates = createAsyncThunk(
    'salesProductList/data/getItems',
    async (data) => {
        const response = await apiGetTemplates(data)
        return response.data
    }
)

export const deleteTemplates = async (data) => {
    const response = await apiDeleteSalesProducts(data)
    return response.data
}

export const getProductCategorys = createAsyncThunk(
    'templatesList/data/getProductCategorys',
    async (data) => {
        const response = await apiGetProductCategory(data)
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
    name: 'templatesList/data',
    initialState: {
        loading: false,
        ItemList: [],
        tableData: initialTableData,
        templateProductList:[]
    },
    reducers: {
        setItemList: (state, action) => {
            console.log("action.payload", action.payload)
            state.ItemList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },
    extraReducers: {
        [getTemplates.fulfilled]: (state, action) => {
            state.ItemList = action.payload
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getTemplates.pending]: (state) => {
            state.loading = true
        },
        [getProductCategorys.fulfilled]: (state, action) => {
            console.log("sttess",action)
            
            state.templateProductList = action?.payload?.response?.map((product) => ({
                value: product.id,
                label: product.prod_cat_title,
            }));
            state.loading = false
        },
    },
})

export const { setItemList, setTableData } = dataSlice.actions

export default dataSlice.reducer
