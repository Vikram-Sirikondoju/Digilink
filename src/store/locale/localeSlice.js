import { createSlice } from '@reduxjs/toolkit'
import appConfig from 'configs/app.config'

const initialState = {
    currentLang: appConfig.locale,
    dateFormat : appConfig.dateFormat,
    largeLogo : "",
    smallLogo : "",
    themeLargeLogo : "",
    themeSmallLogo:"",
}

export const localeSlice = createSlice({
    name: 'locale',
    initialState,
    reducers: {
        setLang: (state, action) => {
            state.currentLang = action.payload
        },
        setDateFormat: (state, action) => {
            if(action.payload){
                state.dateFormat = action.payload
            }
        },
        setLargeLogo : (state, action) => {
            state.largeLogo = action.payload
        },
        setSmallLogo : (state, action) => {
            state.smallLogo = action.payload
        },
        setThemeLargeLogo : (state, action) => {
            state.themeLargeLogo = action.payload
        },
        setThemeSmallLogo : (state, action) => {
            state.themeSmallLogo = action.payload
        },
    },
})

export const { setLang ,setDateFormat , setLargeLogo, setSmallLogo, setThemeLargeLogo, setThemeSmallLogo} = localeSlice.actions

export default localeSlice.reducer
