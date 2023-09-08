import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetProfileDetails } from 'services/ProfileService'


export const getProfileDetails = createAsyncThunk(
    'profile/data/getProfileDetails',
    async (data) => {
        const response = await apiGetProfileDetails(data)
        
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
    name: 'profile/data',
    initialState: {
        loading: false,
        profileData: [],
        
    },
    reducers: {
         setProfileData: (state, action) => {
            state.profileData = action.payload
        },
    },
    extraReducers: {
        
        [getProfileDetails.fulfilled]: (state, action) => {
            
            state.profileData = action.payload
            state.loading = false
        },
        [getProfileDetails.pending]: (state, action) => {
            state.loading = true
        },
    },
})

export const {
    setProfileData
} = dataSlice.actions

export default dataSlice.reducer
