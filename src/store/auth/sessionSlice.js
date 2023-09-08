import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
    name: 'auth/session',
    initialState: {
        token: '',
        accUnqId: '',
        signedIn: false,
    },
    reducers: {
        onSignInSuccess: (state, action) => {
            state.signedIn = true
            state.token = action.payload.access_token;
            state.accUnqId = action.payload.acc_unq_id;
        },
        onSignOutSuccess: (state) => {
            state.signedIn = false
            state.token = ''
            state.accUnqId = ''
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        setAccUnqId: (state, action) => {
            state.accUnqId = action.payload
        },
    },
})

export const { onSignInSuccess, onSignOutSuccess, setToken, setAccUnqId } =
    sessionSlice.actions

export default sessionSlice.reducer
