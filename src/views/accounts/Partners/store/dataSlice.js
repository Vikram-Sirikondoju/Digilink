import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSalesOrders, apiDeleteSalesOrders, apiGetCurrencyPartner, apiGetProductCatPartner,apiGetContractTypePartner, apiGetParentAccountPartner, apiGetPublicRole, apiGetUploadFileTypes} from 'services/PartnersService'

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

export const getOrders = createAsyncThunk(
    'partnerList/data/getOrders',
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
    'partnerList/data/getCurrency',
    async (data) => {
        const response = await apiGetCurrencyPartner(data)
        
        return response.data
    }
)

export const getParentAccount = createAsyncThunk(
    'partnerList/data/getParentAccount',
    async (data) => {
        const response = await apiGetParentAccountPartner(data)
        
        return response.data
    }
)


export const getContractType = createAsyncThunk(
    'partnerList/data/getContractType',
    async (data) => {
       
        const response = await apiGetContractTypePartner(data)
        
        return response.data
    }
)


export const getPublicRoles = createAsyncThunk(
    'partnerList/data/getPublicRoles',
    
    async (data) => {
        const response = await apiGetPublicRole(data)
        
        
        return response.data
    }
)

export const getUploadFileType = createAsyncThunk(
    'partnerList/data/getUploadFileType',
    async (data) => {
        const response = await apiGetUploadFileTypes(data)
        return response.data
    }
)
const dataSlice = createSlice({
    name: 'partnerList/data',
    initialState: {
        loading: false,
        orderList: [],
        tableData: initialTableData,
        currencyList:[],
        parentAccountList:[],
         contractTypeList:[],
         publicRolesList : [],
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

export const { setOrderList, setTableData,setCurrencyData,setParentAccountData,setContractTypeData,setPublicRole } = dataSlice.actions

export default dataSlice.reducer
