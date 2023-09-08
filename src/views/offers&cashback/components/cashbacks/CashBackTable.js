import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import {
    Badge,
    Button,
    Dialog,
    Notification,
    Tooltip,
    toast,
} from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye } from 'react-icons/hi'
import { MdModeEdit } from 'react-icons/md'
import { RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import {
    getCustCatList,
    getCashbacksList,
    getProdCatList,
    setTableData,
} from 'views/offers&cashback/store/dataSlice'
import { cloneDeep } from 'lodash'
import { apiUpdateCashbackStatus, apiUpdateOfferStatus } from 'services/OfferService'
import { GetErrorMsg } from 'views/Servicefile'
import { BsPatchCheckFill } from 'react-icons/bs'

const ItemStatusColor = {
    ACTIVE: {
        label: 'Active',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
        backgroundColor: 'bg-[#F5F5F5]',
    },
    SUBMITTED: {
        label: 'Submitted',
        dotClass: 'bg-blue-500',
        textClass: 'text-amber-500',
        backgroundColor: 'bg-[#F5F5F5]',
    },
    IN_ACTIVE: {
        label: 'Inactive',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
        backgroundColor: 'bg-[#F5F5F5]',
    },
}

const CashBackTable = () => {
    const [isDeactivate, setDeactivate] = useState(false)
    const [row, setRow] = useState('')
    const tableRef = useRef(null)
    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.offerCashback.data.cashbackTableData
    )
    const { loading, productCategories, cashbackList } = useSelector(
        (state) => state.offerCashback.data
    )
    const data = cashbackList
    const { unq_id } = useSelector((state) => state.auth.user)

    const fetchData = useCallback(() => {
        dispatch(getProdCatList({ page_no: 0, page_size: 100, unqId: unq_id }))
        dispatch(getCustCatList({ page_no: 0, page_size: 100, unqId: unq_id }))
        dispatch(
            getCashbacksList({
                page_no: pageIndex - 1,
                page_size: pageSize,
                offer_type: 'CASHBACK',
            })
        )
    }, [dispatch, pageIndex, pageSize])

    useEffect(() => {
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )
    const ActionColumn = ({ row }) => {
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()

        const handleClick = () => {
            setDeactivate(true)
            setRow(row)
        }
        const onView = useCallback(() => {
            navigate(`/cashback-view`, { state: { data: row } })
        }, [navigate, row])
        const onEdit = useCallback(() => {
            navigate(`/create-cashback`, {
                state: { data: row, mode: 'EDIT' },
            })
        }, [navigate, row])
        const iconColor = row.offr_info_status != 'ACTIVE' ? 'green' : 'rose'
        const IconComponent =
            row.offr_info_status != 'ACTIVE'
                ? RiCheckboxCircleFill
                : RiCloseCircleFill
        return (
            <div className="flex text-lg">
                <Tooltip title="View">
                    <span
                        className={`cursor-pointer text-blue-500 p-1 hover:${textTheme}`}
                        onClick={onView}
                    >
                        <HiOutlineEye />
                    </span>
                </Tooltip>
                <Tooltip title="Edit">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                        onClick={onEdit}
                    >
                        <MdModeEdit />
                    </span>
                </Tooltip>
                <Tooltip
                            title={`${row.offr_info_status !=  'ACTIVE'  ? 'Activate' : 'Deactivate'}`}
                >
                    <span
                        className={`cursor-pointer p-1 text-${iconColor}-800 hover:text-${iconColor}-800`}
                        onClick={handleClick}
                    >
                        <IconComponent />
                    </span>
                </Tooltip>
            </div>
        )
    }

    const columns = useMemo(
        () => [
            {
                header: 'Actions',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
            {
                header: 'Cashback Title',
                accessorKey: 'offr_name',
            },
            {
                header: 'Offer Type ',
                accessorKey: 'offr_type',
            },
            {
                header: 'Product Category',
                accessorKey: 'product_category',
                cell: (props) => {
                    return (
                        <div className="flex items-center">
                            <span>
                                {
                                    productCategories?.filter(
                                        (i) =>
                                            i?.id ==
                                            props?.row.original
                                                .rel_offr_prod_cat
                                    )?.[0]?.prod_cat_title
                                }
                            </span>
                        </div>
                    )
                },
            },
            {
                header: 'Cashback Code',
                accessorKey: 'offr_code',
            },
            {
                header: 'Status',
                accessorKey: 'status',

                cell: (props) => {
                    const { offr_info_status } = props.row.original
                    return (
                        <div className="flex items-center">
                        <span className={`flex ml-2 rtl:mr-2 capitalize font-semibold rounded-full border ${ItemStatusColor[offr_info_status]?.backgroundColor} mt-4 px-2 py-1 text-${ItemStatusColor[offr_info_status]?.dotClass}`}>
                            {offr_info_status === 'ACTIVE' && <RiCheckboxCircleFill className="mt-1 mr-2 text-[#3B8C59]" />}
                            {offr_info_status === 'IN_ACTIVE' && <RiCloseCircleFill className="mt-1 mr-2 text-[#FF0000]" />}
                            {offr_info_status === 'SUBMITTED' && <BsPatchCheckFill className="mt-1 mr-2 text-blue-500" />}
                            {ItemStatusColor[offr_info_status]?.label}
                        </span>
                    </div>
                    )
                },
            },
        ],
        [productCategories]
    )

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    const updateOfferStatus = async () => {
        let isStatus =
        row.offr_info_status === 'IN_ACTIVE' ? 'ACTIVE' : 'IN_ACTIVE'
    const resp = await apiUpdateOfferStatus(row.id, isStatus)
        setDeactivate(false)
        if (resp.status === 'success') {
            console.log(isStatus)
            fetchData()
            toast.push(
                <Notification
                    title={'Cashback Status'}
                    type="success"
                    duration={2500}
                >
                  {isStatus == "IN_ACTIVE" ? "Deactivated Successfully": "Activated Successfully"}
                </Notification>,
                {
                    placement: 'top-end',
                }
            )
        } else if (resp.status === 'failed') {
            const errorMsg = GetErrorMsg(resp) || 'Error'
            toast.push(
                <Notification title={'Failed'} type="danger" duration={2500}>
                    {errorMsg}
                </Notification>,
                {
                    placement: 'top-end',
                }
            )
        }
    }
    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <Dialog isOpen={isDeactivate} onClose={() => setDeactivate(false)}>
                <h6
                    style={{
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        fontSize: '18px',
                        // color: '#212121',
                    }}
                >
                          {row.offr_info_status === 'ACTIVE'
                        ? `Deactivate`
                        : `Activate`}
                </h6>
                <hr className="text-gary-500 mt-4 mb-4" />
                <p
                    style={{
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '15px',
                        // color: '#333333',
                    }}
                >
                     {row.offr_info_status == 'ACTIVE'
                        ? `Are you sure you want to deactivate this account ?`
                        : `Are you sure you want to Activate this account ?`}
                </p>
                <div className="mt-6 text-end">
                    <Button
                        style={{
                            backgroundColor: '#4D4D4D',
                            color: 'white',
                            borderRadius: '2px',
                        }}
                        className="mr-3"
                        onClick={() => setDeactivate(false)}
                    >
                        No
                    </Button>
                    <Button variant="solid" onClick={() => updateOfferStatus()}>
                        Yes
                    </Button>
                </div>
            </Dialog>
        </>
    )
}

export default CashBackTable
