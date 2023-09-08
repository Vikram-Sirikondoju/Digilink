import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSalesOrders, apiDeleteSalesOrders, apiGetCurrencyEnterprise, apiGetParentAccountEnterprise, apiGetOperatorAccountEnterprise, apiGetCustomerCatEnterprise, apiGetContractTypeEnterprise, apiGetUploadFileTypes } from 'services/EnterpriseService'

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
    'enterpriseList/data/getOrders',
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
    'enterpriseList/data/getCurrency',
    async (data) => {
        const response = await apiGetCurrencyEnterprise(data)
        
        return response.data
    }
)

export const getParentAccount = createAsyncThunk(
    'enterpriseList/data/getParentAccount',
    async (data) => {
        const response = await apiGetParentAccountEnterprise(data)
        
        return response.data
    }
)

export const getParenOperator = createAsyncThunk(
    'enterpriseList/data/getParentOperatorAccount',
    async (data) => {
        const response = await apiGetOperatorAccountEnterprise(data)
        
        return response.data
    }
)


export const getCustomerCategory = createAsyncThunk(
    'enterpriseList/data/getCustCategory',
    async (data) => {
        const response = await apiGetCustomerCatEnterprise(data)  
        
        return response.data
    }
)


export const getContractType = createAsyncThunk(
    'enterpriseList/data/getContractType',
    async (data) => {
       
        const response = await apiGetContractTypeEnterprise(data)
        
        return response.data
    }
)

export const getUploadFileType = createAsyncThunk(
    'enterpriseList/data/getUploadFileType',
    async (data) => {
        const response = await apiGetUploadFileTypes(data)
        return response.data
    }
)

const dataSlice = createSlice({
    name: 'enterpriseList/data',
    initialState: {
        loading: false,
        orderList: [],
        tableData: initialTableData,

        currencyList:[],
        parentAccountList:[],
        custmoerCatList:[],
        contractTypeList:[],
        operatorAccountList:[],
        selectedParentOperator: null,
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

        setCustmoerCattData: (state, action) => {
            state.custmoerCatList = action.payload
        },

        setContractTypeData: (state, action) => {
            state.contractTypeList = action.payload
        },
        setParentOperatorData: (state, action) => {
            state.operatorAccountList = action.payload
        },
        setSelectedParentOperator: (state, action) => {
            state.selectedParentOperator = action.payload;
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
                label: parent.cust_name,
                
            }))
            state.loading = false
        },
        [getParentAccount.pending]: (state) => {
            state.loading = true
        },

        [getCustomerCategory.fulfilled]: (state, action) => {
                
            
            
            state.custmoerCatList=action.payload.response?.map((customer) => ({
                value: customer.id,
                label: customer.cust_cat_title,
            }));

            state.loading = false
        },
        [getCustomerCategory.pending]: (state) => {
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

        [getParenOperator.fulfilled]: (state, action) => {
                 
            state.operatorAccountList = action.payload?.map((opertor) => ({
                value: opertor.id,
                label: opertor.acc_name,
                acc_unq_id : opertor.acc_unq_id
            }))
           
            state.loading = false
        },
        [getParenOperator.pending]: (state) => {
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


export const { setOrderList, setTableData ,setCurrencyData,setParentAccountData,setCustmoerCattData,setContractTypeData,setParentOperatorData,setSelectedParentOperator} = dataSlice.actions

export default dataSlice.reducer
