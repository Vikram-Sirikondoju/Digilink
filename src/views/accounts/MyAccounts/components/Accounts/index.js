import { Button } from 'components/ui'
import React, { useCallback, useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { HiPlus } from 'react-icons/hi'
import {
    MdModeEdit,
    MdSubtitles,
    MdEmail,
    MdPhone,
    MdOutlineDateRange,
} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri'
import { TiDeleteOutline } from 'react-icons/ti'
import { BsPatchCheck } from 'react-icons/bs'
import { Avatar } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import {
    getAccountDetails,
    getOrders,
    getUserRoles,
    getUsersList,
} from '../../store/dataSlice'
import dayjs from 'dayjs'
import GetDropdownLabel from 'views/Servicefile'

const Account = (props) => {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const {
        enterAccount,
        password,
        rememberMe,
        usernameOrEmail,
        acc_mno_parent_unq_id,
    } = useSelector((state) => state.auth.user)
    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.myaccountList.data.tableData
    )
    const userRoles = useSelector((state) => state.myaccountList?.data?.userRoles)
    const accountList = useSelector(
        (state) => state.myaccountList.data.accountList?.response
    )
    const data = useSelector(
        (state) => state.myaccountList.data.userRoleAndPermitList?.response?.res
    )
    const userDetailsArr = useSelector(
        (state) => state.myaccountList?.data?.usersList.res
    )

    const parentAccountList = useSelector(
        (state) => state.salesOrderList?.data?.parentAccountList
    )
    const dateFormat = useSelector((state) => state.locale.dateFormat)

    useEffect(() => {
        dispatch(getUserRoles({ enterAccount }))
      }, [dispatch, enterAccount])

    useEffect(() => {
        dispatch(getAccountDetails({ enterAccount }))
        dispatch(
            getOrders({
                enterAccount: enterAccount,
                page_no: pageIndex - 1,
                page_size: 3,
            })
        )
        dispatch(
            getUsersList({
                page_no: pageIndex - 1,
                page_size: 6,
                sort_field: 'id',
                unq_id: enterAccount,
            })
        )
    }, [dispatch, enterAccount, pageIndex, pageSize, sort, query])


    const clicked = () => {
        navigate(`/account-menu-item-view-1/${'userRoles'}`)
    }
    return (
        <>
            <div
                style={{ backgroundColor: '#F5F5F5' }}
                className=" grid grid-cols-3 p-5"
            >
                <div className="col-span-2">
                    <div className="card mb-4">
                        <div className="flex gap-4 mx-4 p-4">
                            {/* <img className='bg-gray-50 w-16 h-16 rounded border' onClick={() => console.log('1')} /> */}
                            {/* <div className="bg-gray-50 w-16 h-16 rounded border">
                                <img
                                    src={'/img/avatars/airtellogo.png'}
                                    alt="airtelLogo"
                                    className="mt-2 ml-2 mr-2"
                                />
                            </div> */}
                            <div className="mt-2 ml-2 pb-2">
                                <div className='mt-2 ml-2 pb-2'>
                                    <h3 className='font-bold '>{accountList?.acc_name}</h3>
                                    <p>{accountList?.acc_unq_id} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mt-2 p-4">
                        <h5>ACCOUNT DETAILS</h5>
                        <div className="grid grid-cols-3 mt-4">
                            {/* <div className="flex gap-4 p-2 mb-4">
                                <div className="bg-gray-50 rounded border h-8 w-8 p-2 mt-2">
                                    <CgProfile className="h-4 w-4" />
                                </div>
                                <div>
                                    <h6>Account ID</h6>
                                    <p>{accountList?.id}</p>
                                </div>
                            </div> */}
                            {/* <div className="flex gap-4 p-2">
                                <div className=" bg-gray-50 rounded border h-8 w-8 p-2 mt-2">
                                    <CgProfile className="h-4 w-4" />
                                </div>
                                <div>
                                    <h6>Account Title</h6>
                                    <p>{accountList?.acc_name}</p>
                                </div>
                            </div> */}
                            <div className="flex gap-4 p-2">
                                <div className=" bg-gray-50 rounded border h-8 w-8 p-2 mt-2">
                                    <CgProfile className="h-4 w-4" />
                                </div>
                                <div>
                                    <h6>Parent Account</h6>
                                    <p>{accountList?.acc_name}</p>
                                    {/* <p>  {GetDropdownLabel(accountList?.acc_parent, parentAccountList)}</p> */}
                                </div>
                            </div>
                            <div className="flex gap-4 p-2 mb-4">
                                <div className=" bg-gray-50 rounded border h-8 w-8 p-2 mt-2">
                                    <BsPatchCheck className="h-4 w-4" />
                                </div>
                                <div>
                                    <h6>Tax ID</h6>
                                    <p>{accountList?.acc_tax_id}</p>
                                </div>
                            </div>
                            <div className=" flex gap-4 p-2">
                                <div className=" bg-gray-50 rounded border h-8 w-8 p-2 mt-2">
                                    <MdEmail className="h-4 w-4" />
                                </div>
                                <div>
                                    <h6>Email ID</h6>
                                    <p>{accountList?.acc_email_id}</p>
                                </div>
                            </div>
                            <div className=" flex gap-4 p-2">
                                <div className="bg-gray-50 rounded border h-8 w-8 p-2 mt-2">
                                    <CgProfile className="h-4 w-4" />
                                </div>
                                <div>
                                    <h6>Global MNO</h6>
                                    
                                    <p>{acc_mno_parent_unq_id}</p>
                                    {/* <p>{accountList?.acc_mno_parent}</p> */}
                                </div>
                            </div>
                            <div className=" flex gap-4 p-2 mb-4">
                                <div className="bg-gray-50 rounded border h-8 w-8 p-2 mt-2">
                                    <CgProfile className="h-4 w-4" />
                                </div>
                                <div>
                                    <h6>Company Name</h6>
                                    <p>{accountList?.acc_comp_name}</p>
                                </div>
                            </div>
                            <div className=" flex gap-4 p-2">
                                <div className="bg-gray-50 rounded border h-8 w-8 p-2 mt-2">
                                    <MdPhone className="h-4 w-4" />
                                </div>
                                <div>
                                    <h6>Phone Number</h6>
                                    <p>{accountList?.acc_phone}</p>
                                </div>
                            </div>
                            <div className=" flex gap-4 p-2">
                                <div className=" bg-gray-50 rounded border h-8 w-8 p-2 mt-2">
                                    <MdOutlineDateRange className="h-4 w-4" />
                                </div>
                                <div>
                                    <h6>InCorporation Date</h6>
                                    <p>
                                        {dayjs(
                                            accountList?.acc_incorp_dt,
                                            dateFormat
                                        )?.format(dateFormat)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {data && (
                        <div className="card mt-4 mb-2">
                            <h5 className="mx-4 pt-4">
                                USER ROLE AND PERIMSSIONS
                            </h5>
                            {data?.map((j, i) => {
                                return (
                                    <>
                                        <div className="mt-2 pb-2 border-b-2" key={`account-${i}`}>
                                            <div className="p-2 flex justify-between">
                                                <div className="flex">
                                                    <Avatar className="ml-2 mt-1 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-100">
                                                        {j.role_name.charAt(0).toUpperCase()}
                                                    </Avatar>
                                                    <div className="mx-4">
                                                        <h6>{j.role_name}</h6>
                                                        <div className="flex gap-2">
                                                            {j.role_unq_id}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-base text-black font-bold flex mr-4 mt-3 gap-1">
                                                    {/* <Link to="/accounts-new-user-roles">
                                                        <div className="flex">
                                                            <MdModeEdit className="mt-1" />
                                                            <p className="ml-2">
                                                                EDIT
                                                            </p>
                                                        </div>
                                                    </Link> */}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    )}
                </div>
                {userDetailsArr && (
                    <div className="card ml-4 p-4">
                        <h5>USER DETAILS</h5>
                        {userDetailsArr &&
                            userDetailsArr?.map((e) => {
                                return (
                                    <>
                                        <div className="my-4 pb-4 flex justify-between border-b-2">
                                            <div className="grid gap-1">
                                                {/* <img className='h-8 w-8 rounded-full border' /> */}
                                                {/* <img
                                                        src={
                                                            '/img/avatars/profileimage.png'
                                                        }
                                                        alt="airtelLogo"
                                                        className="bg-gray-50 w-8 h-8 rounded-full border"
                                                    /> */}
                                                <div className="flex pt-4">
                                                    <div className="flex flex-col">
                                                        <h6 className="mr-3">
                                                            {e?.first_name}{' '}
                                                            {e?.middle_name === null
                                                                ? e.middle_name
                                                                : null}{' '}
                                                            {e?.last_name}
                                                        </h6>
                                                        <h6>
                                                            {GetDropdownLabel(e.dgl_roles_id, userRoles)}
                                                        </h6>

                                                    </div>
                                                    <p
                                                        style={{
                                                            marginTop: '2px',
                                                        }}
                                                    >
                                                        {e.phone}
                                                    </p>

                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <div className="text-base text-black font-bold flex justify-end mr-2">
                                                    {/* <Link to="/accounts-new-users">
                                                        <div className="flex">
                                                            <MdModeEdit className="mt-1" />
                                                            <p className="ml-2">
                                                                EDIT
                                                            </p>
                                                        </div>
                                                    </Link> */}
                                                </div>
                                                <div className="mt-2 px-2 py-1 flex rounded-full border  bg-gray-50">
                                                    {e.status === 'ACTIVE' ? (
                                                        <RiCheckboxCircleFill className="mt-1 mr-1 text-green-700" />
                                                    ) : (
                                                        <RiCloseCircleFill className="mt-1 mr-1 text-rose-700" />
                                                    )}
                                                    <p className="text-sm font-black">
                                                        {e.status === 'ACTIVE'
                                                            ? 'Active'
                                                            : 'Inactive'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        <Link
                            className="block lg:inline-block md:mb-0 mb-4 w-full"
                            to="/account-menu-item-view-1/users"
                            onClick={clicked}
                        >
                            <Button
                                className="w-full flex justify-center"
                                variant="solid"
                            >
                                See All
                                <AiOutlineArrowRight className="ml-4 mt-1" />
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}

export default Account
