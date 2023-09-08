import { useSelector, useDispatch } from 'react-redux'
import { setUser, initialState } from 'store/auth/userSlice'
import {
    apiSignIn,
    apiSignOut,
    apiSignUp,
    apiGetRolePermissions,
    apiGetThemeInfoByUnqid,
    apiGetOperaterSettingsID,
    apiGetBrandInfo,
} from 'services/AuthService'
import { onSignInSuccess, onSignOutSuccess } from 'store/auth/sessionSlice'
import appConfig from 'configs/app.config'
import { REDIRECT_URL_KEY } from 'constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import navigationConfigFile from 'configs/navigation.config'
import _ from 'lodash'
import { OpenNotification } from 'views/Servicefile'
import useDarkMode from 'utils/hooks/useDarkMode'
import useDirection from './useDirection'
import { setDateFormat, setLang, setLargeLogo, setSmallLogo, setThemeLargeLogo, setThemeSmallLogo } from 'store/locale/localeSlice'


function useAuth() {

    const [isDark, setIsDark] = useDarkMode()
    const [direction, updateDirection] = useDirection()
   

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn, accUnqId } = useSelector((state) => state.auth.session)

    const getUserSpecificMenus = async (permissions) => {
        // const { permissions } = useSelector((state) => state.auth.user)

        console.log(navigationConfigFile)
        const allPermissions = _.flatMap(permissions?.module_dto, (module) => {
            return _.flatMap(module.sub_module_dto, (subModule) => {
                return {
                    module: module.code,
                    subModule: subModule.code,
                    permission: subModule.dgl_permissions_resp_dto,
                }
            })
        })

        const enabledPermissions = _.filter(allPermissions, (modulerow) => {
            if (
                modulerow.permission.filter((f) => f.enabled === true).length >
                0
            ) {
                modulerow.permission = modulerow.permission.filter(
                    (f) => f.enabled === true
                )
                return true
            } else {
                return false
            }
        })
        let moduleList = enabledPermissions.map((e) => e.module)
        let submoduleList = enabledPermissions.map((e) => e.subModule)
        moduleList.push('DASHBOARD')
        //submoduleList.push('PBR')

        //needed this as there was a problem with menus not loading.
        let file = _.cloneDeep(navigationConfigFile)

        let listOfModulesFiltered = file.filter((module) => {
            if (moduleList.includes(module.code)) {
                module.subMenu = module.subMenu.filter((sub) => {
                    return submoduleList.includes(sub.code)
                })

                return true
            } else {
                return false
            }
        })

        let permissionsList = enabledPermissions.map((e) =>
            e.permission.map((x) => x.code)
        )
        permissionsList = permissionsList ? permissionsList.flat() : []

        return { navigationConfig: listOfModulesFiltered, permissionsList }
    }

    // const signIn = async (values) => {
    //     try {
    //         const resp = await apiSignIn(values)

    //         if (resp.data) {
    //             const { access_token, user_name, acc_unq_id, role_name } =
    //                 resp.data
    //             dispatch(onSignInSuccess(access_token))
    //             const permissions = await apiGetRolePermissions({
    //                 //roleId: values.unq_id,

    //                 roleId: acc_unq_id,
    //             })

    //             let menuObject = await getUserSpecificMenus(permissions.data)

    //             //  if (resp.data.user) {
    //             dispatch(
    //                 setUser({
    //                     ...values,
    //                     user_name,
    //                     role_name,
    //                     permissionsList: menuObject.permissionsList,
    //                     navigationConfig: menuObject.navigationConfig,
    //                 })
    //             )

    //             //  }
    //             const redirectUrl = query.get(REDIRECT_URL_KEY)
    //             navigate(
    //                 redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
    //             )
    //             return {
    //                 status: 'success',
    //                 message: '',
    //             }
    //         }
    //     } catch (errors) {
    //         return {
    //             status: 'failed',
    //             message: errors?.response?.data?.message || errors.toString(),
    //         }
    //     }
    // }

    const signIn = async (values) => {
        try {
            const resp = await apiSignIn(values)
            if (resp.data) {
                const {
                    access_token,
                    user_name,
                    acc_unq_id,
                    role_name,
                    acc_mno_id,
                    acc_user_id,
                    acc_mno_parent_unq_id,
                    acc_mno_parent_id,
                    user_type,
                    unq_id,
                    profile_img_url,
                    acc_mno_unq_id
                } = resp.data

                // Dispatch the onSignInSuccess action
                await dispatch(
                    onSignInSuccess({
                        access_token: access_token,
                        acc_unq_id: acc_unq_id
                    })
                );
                
               
             
               const permissions = await apiGetRolePermissions({
                    roleId: acc_unq_id,
                })

                let menuObject = await getUserSpecificMenus(permissions.data)


                let themeSettings = await apiGetThemeInfoByUnqid(unq_id)
                // SET THE THEMES
               
                let genSettings = await apiGetOperaterSettingsID(unq_id)
               
                //check if there is atleast one record , then only apply settings..
                if(themeSettings.data.response.length>0)
                {
                    let darkMode=themeSettings.data.response[themeSettings.data.response.length-1].thm_mode;

                    setIsDark(darkMode ? 'dark' : 'light')
                }
                
                //applying direction
                if(themeSettings.data.response.length>0){
                    let direction=themeSettings.data.response[themeSettings.data.response.length-1].thm_orientation;
                    updateDirection(direction)
                }
                let dateFormat;
                if(genSettings?.data?.response.length>0){
                    let lang = genSettings?.data.response[genSettings?.data.response.length-1].gen_set_lang_pref
                    dispatch(setLang(lang))
                    dateFormat = genSettings?.data.response[genSettings?.data.response.length-1].gen_set_date_format
                    dispatch(setDateFormat(dateFormat))
                }

                //brand info logos
                let brandInfo = await apiGetBrandInfo(acc_mno_unq_id)
                if(brandInfo?.data?.response.length>0){
                    let logo=brandInfo.data.response[brandInfo.data.response.length-1];
                    dispatch(setLargeLogo(logo.large_logo_url))
                    dispatch(setSmallLogo(logo.small_logo_url))
                    dispatch(setThemeLargeLogo(logo.thm_large_logo_url))
                    dispatch(setThemeSmallLogo(logo.thm_small_logo_url))
                }

                // Dispatch the setUser action
                await dispatch(
                    setUser({
                        ...values,
                        user_name,
                        role_name,
                        acc_mno_id,
                        acc_user_id,
                        acc_unq_id,
                        acc_mno_parent_unq_id,
                        acc_mno_parent_id,
                        profile_img_url,
                        permissionsList: menuObject.permissionsList,
                        navigationConfig: menuObject.navigationConfig,
                        user_type,
                        acc_mno_unq_id
                    })
                )
                let redirectUrl
                setTimeout(() => {
                    const redirectUrl = query.get(REDIRECT_URL_KEY)
                }, 2000)

                await navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )

               
                return {
                    status: 'success',
                    message: '',
                }
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signUp = async (values) => {
        try {
            const resp = await apiSignUp(values)
            if (resp.data) {
                
                const { token} = resp.data
                dispatch(onSignInSuccess(token))
                if (resp.data.user) {
                    dispatch(
                        setUser(
                            resp.data.user || {
                                avatar: '',
                                userName: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const handleSignOut = () => {
        dispatch(onSignOutSuccess())
        dispatch(setUser(initialState))
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        // await apiSignOut()
        handleSignOut()
    }

    return {
        authenticated: token && accUnqId && signedIn,
        signIn,
        signUp,
        signOut,
    }
}

export default useAuth
