import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSalesOrders, apiDeleteSalesOrders, apiGetCurrencyProvider, apiGetParentAccountProvider, apiGetProductCatProvider, apiGetContractTypeProvider, apiGetPublicRole, apiGetUploadFileTypes } from 'services/ProvidersService'

export const getOrders = createAsyncThunk(
    'providerList/data/getOrders',
    async (data) => {
        const response = await apiGetSalesOrders(data)
        return response.data
    }
)

export const deleteOrders = async (data) => {
    const response = await apiDeleteSalesOrders(data)
    return response.data
}

export const getCurrency = createAsyncThunk(
    'providerList/data/getCurrency',
    async (data) => {
        const response = await apiGetCurrencyProvider(data)
        return response.data
    }
)

export const getParentAccount = createAsyncThunk(
    'providerList/data/getParentAccount',
    async (data) => {
        const response = await apiGetParentAccountProvider(data)
        
        return response.data
    }
)

export const getProductCategory = createAsyncThunk(
    'providerList/data/getProductCategory',
    async (data) => {
        const response = await apiGetProductCatProvider(data)
        
        return response.data
    }
)


export const getContractType = createAsyncThunk(
    'providerList/data/getContractType',
    async (data) => {
       
        const response = await apiGetContractTypeProvider(data)
        
        return response.data
    }
)

export const getPublicRoles = createAsyncThunk(
    'providerList/data/getPublicRoles',
    async (data) => {
        const response = await apiGetPublicRole(data)
        
        return response.data
    }
)
export const getUploadFileType = createAsyncThunk(
    'providerList/data/getUploadFileType',
    async (data) => {
        const response = await apiGetUploadFileTypes(data)
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
    
    name: 'providerList/data',
    initialState: {
        loading: false,
        orderList: [],
        tableData: initialTableData,
        currencyList:[],
        parentAccountList:[],
        productCatList:[],
        contractTypeList:[],
        publicRolesList:[]
    },
    reducers: {
        
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setCurrencyData: (state, action) => {
            state.currencyList = action.payload
        },
        setParentAccountData: (state, action) => {
            state.parentAccountList = action.payload
        },

        setProductCattData: (state, action) => {
            state.productCatList = action.payload
        },

        setContractTypeData: (state, action) => {
            state.contractTypeList = action.payload
        },
        setPublicRole : (state,action) => {
            state.publicRolesList = action.payload
        },
    },
    extraReducers: {
        
        [getOrders.fulfilled]: (state, action) => {
            state.orderList = action.payload
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getOrders.pending]: (state) => {
            state.loading = true
        },
        [getCurrency.fulfilled]: (state, action) => {
           
           
            state.currencyList=action.payload.response?.map((currency) => ({
                value: currency.id,
                label: currency.cur_title,
            }));

            state.loading = false
        },
        [getCurrency.pending]: (state) => {
            state.loading = true
        },

        [getParentAccount.fulfilled]: (state, action) => {
            state.parentAccountList = action.payload?.map((parent) => ({
                value: parent.id,
                label: parent.acc_name,
            }))
           
            state.loading = false
        },
        [getParentAccount.pending]: (state) => {
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
       
        [getContractType.fulfilled]: (state, action) => {
         
           
            state.contractTypeList=action.payload.response?.map((contract) => ({
                value: contract.id,
                label: contract.contract_type_title,
            }));
            
            state.loading = false
        },
        [getContractType.pending]: (state) => {
            state.loading = true
        },

        [getPublicRoles.fulfilled]: (state,action) => {
            state.publicRolesList = action.payload?.res?.map((parent) => ({
                value: parent.id,
                label: parent.name,
            }))
        },
        [getPublicRoles.pending]:(state,action)=> {
            state.loading = true
        },
        [getUploadFileType.fulfilled]: (state, action) => {
            state.fileList = action.payload
            state.loading = false
        },
        [getUploadFileType.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setOrderList, setTableData ,setCurrencyData,setParentAccountData,setProductCattData,setContractTypeData,setPublicRole} = dataSlice.actions

export default dataSlice.reducer
