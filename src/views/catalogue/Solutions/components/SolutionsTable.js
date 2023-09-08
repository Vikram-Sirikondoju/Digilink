import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { Badge, Button, Dialog, Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { getSolutions, setTableData } from '../store/dataSlice'
import {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    setSelectedRow,
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import { MdModeEdit } from 'react-icons/md'
import { AiFillCopy } from 'react-icons/ai'
import { RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri'
import { BsPatchCheckFill } from 'react-icons/bs'
import { OpenNotification, snakeToCamel } from 'views/Servicefile'
import { apiUpdateSolutionStatus } from 'services/SolutionsService'

import ReactHtmlParser from 'html-react-parser'



const SolutionColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        navigate(`/app/sales/Item-details/${row.id}`)
    }, [navigate, row])

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            onClick={onView}
        >
            #{row.id}
        </span>
    )
}

const orderStatusColor = {
    ACTIVE: {
        label: 'Active',
        dotClass: 'bg-black-400',
        textClass: 'text-black-400',
        backgroundColor: 'bg-[#F5F5F5]',
    },
    SUBMITTED: {
        label: 'Submitted',
        dotClass: 'bg-blue-400',
        textClass: 'text-black-400',
        backgroundColor: 'bg-[#F0F7FF]',
    },
    IN_ACTIVE: {
        label: 'Inactive',
        dotClass: 'bg-blue-400',
        textClass: 'text-black-400',
        backgroundColor: 'bg-[#F5F5F5]',
    },
}


const SolutionsTable = ({ actionPermissions }) => {
    const { pageIndex, pageSize, sort, query, total, sort_field, order } = useSelector(
        (state) => state.solutionsList.data.tableData
    )

    const [isDeactivate, setDeactivate] = useState(false)

    const [row, setRow] = useState('')
    const tableRef = useRef(null)

    const dispatch = useDispatch()


    const loading = useSelector((state) => state.solutionsList.data.loading)

    const data = useSelector((state) => state.solutionsList.data.ItemList.res)

    const totalCount = useSelector((state) => state.solutionsList.data.ItemList.total)
    const { enterAccount, password, rememberMe, usernameOrEmail } = useSelector(
        (state) => state.auth.user
    )

    // const fetchData = useCallback(() => {
    //     dispatch(getSolutions())
    // }, [])

    const fetchData = useCallback(() => {
        //catalogs/admin/templates?page=0&size=100&accId=OP1&order=desc
        dispatch(getSolutions({
            page: pageIndex - 1,
            size: pageSize,
            sort_field: sort_field ? sort_field : 'id',
            accId: enterAccount,
            order: order ? order : 'desc'
        }))
    }, [dispatch, pageIndex, pageSize, sort_field, enterAccount, order, isDeactivate])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort, isDeactivate])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])



    const updateOperatorStatus = async () => {
        let isStatus = row.sol_status === 'ACTIVE' ? 'IN_ACTIVE' : 'ACTIVE'
        const resp = await apiUpdateSolutionStatus(row.id, isStatus);

        if (resp.data) {

            if (isStatus === 'ACTIVE') {

                setDeactivate(false)
                OpenNotification('success', 'Activated successfully')

            } else {

                setDeactivate(false)
                OpenNotification('success', 'Deactivated successfully')


            }

        }
    }
    const ActionColumn = ({ row }) => {
        const dispatch = useDispatch()
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()


        const IconComponent = row.sol_status != 'ACTIVE' ? RiCheckboxCircleFill : RiCloseCircleFill;
        const iconColor = row.sol_status != 'ACTIVE' ? "green" : "rose";
        const disableIconStyle = { color: 'grey', pointerEvents: 'none' }
        const { canAdd, canEdit, canView, canActivate, canClone, canApprove } =
            actionPermissions


        const onClone = () => {
            navigate(`/catalogue-new-solutions`, {
                state: { data: row, mode: 'ADD' },
            })
        }
        const onEdit = () => {
            navigate(`/catalogue-new-solutions`, {
                state: { data: row, mode: 'EDIT' },
            })
        }
        const handleClick = () => {
            setDeactivate(true);
            setRow(row);
        };
        return (
            <div className="flex justify-end text-lg">
                <span
                    className={`cursor-pointer p-1  hover:${textTheme}`}
                    onClick={onEdit}
                    style={canClone ? null : disableIconStyle}
                >
                    <MdModeEdit />
                </span>

                <span
                    className={`cursor-pointer p-1  hover:${textTheme}`}
                    onClick={onClone}
                    style={canClone ? null : disableIconStyle}
                >
                    <AiFillCopy />
                </span>

                <Tooltip title={`${row.sol_status != 'ACTIVE' ? "Activate" : "Deactivate"}`}>
                    <span onClick={handleClick} style={canActivate ? null : disableIconStyle} className={`cursor-pointer p-1 text-${iconColor}-800 hover:text-${iconColor}-800`}>
                        <IconComponent />
                    </span>
                </Tooltip>
            </div>
        )
    }

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total: totalCount }),
        [pageIndex, pageSize, sort, query, totalCount]
    )
    const columns = useMemo(


        () => [
            {
                header: 'Actions',
                flex: 1,
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
            {
                header: 'Solution ID',
                accessorKey: 'sol_unq_id',
                // cell: (props) => {
                //     const { sol } = props.row.original
                //     return (
                //         <p>{sol?.solId}</p>
                //     )
                // },

            },
            {
                header: 'Solution Title',
                accessorKey: 'sol_title',
            },
            // {
            //     header: 'Product Category',
            //     accessorKey: 'sol',
            //     flex: 1,
            //     cell: (props) => {
            //         const { sol } = props.row.original
            //         return (
            //             <p>{sol?.relProdCat?.prodCatTitle}</p>
            //         )
            //     },
            // },
            {
                header: 'No. Of Items',
                accessorKey: 'sol',
                flex: 1,
                cell: (props) => {
                    const sol = props?.row?.original
                    return (
                        <p>{sol?.dgl_cat_sol_items.length}</p>
                    )
                },
            },
            {
                header: 'Solution Price In USD',
                accessorKey: 'solDisplayItemPrice',
                flex: 1,
                cell: (props) => {
                    const sol = props?.row?.original
                    return (
                        <p>{sol?.sol_base_price} {` $`}</p>
                    )
                },

            },
            {
                header: 'Description',
                accessorKey: 'sol_desc',


                cell: (props) => {
                    const sol = props?.row?.original
                    const sol_desc = ReactHtmlParser(sol?.sol_desc)
                    return (
                        <p>{sol_desc}</p>
                    )
                },
            },
            {
                header: 'Status',
                accessorKey: 'sol_status',
                flex: 1,
                cell: (props) => {
                    const { sol_status } = props.row.original
                    return (
                        <div className="flex items-center">
                            <span
                                className={`flex ml-2 rtl:mr-2 capitalize font-semibold rounded-full border ${orderStatusColor[sol_status]?.backgroundColor} mt-4 px-2 py-1 text-${orderStatusColor[sol_status]?.dotClass}`}
                            >
                                {sol_status === 'ACTIVE' && (<RiCheckboxCircleFill className="mt-1 mr-2 text-[#3B8C59]" />)}
                                {sol_status === 'IN_ACTIVE' && (<RiCloseCircleFill className="mt-1 mr-2 text-[#FF0000]" />)}
                                {sol_status === 'SUBMITTED' && (<BsPatchCheckFill className="mt-1 mr-2 text-blue-500" />)}
                                {orderStatusColor[sol_status]?.label}
                            </span>
                        </div>
                    )
                },
            },

        ],
        []
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
        const sortfield = snakeToCamel(sort.key)
        newTableData["sort_field"] = sortfield;
        newTableData["order"] = sort.order;
        dispatch(setTableData(newTableData))
    }

    const onRowSelect = (checked, row) => {
        if (checked) {
            dispatch(addRowItem([row.id]))
        } else {
            dispatch(removeRowItem(row.id))
        }
    }

    const onAllRowSelect = useCallback(
        (checked, rows) => {
            if (checked) {
                const originalRows = rows.map((row) => row.original)
                const selectedIds = []
                originalRows.forEach((row) => {
                    selectedIds.push(row.id)
                })
                dispatch(setSelectedRows(selectedIds))
            } else {
                dispatch(setSelectedRows([]))
            }
        },
        [dispatch]
    )

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
                onCheckBoxChange={onRowSelect}
                onIndeterminateCheckBoxChange={onAllRowSelect}
                selectable
            />

            <Dialog
                isOpen={isDeactivate}
                onClose={() => setDeactivate(false)}>
                <h6 style={{  fontStyle: 'normal', fontSize: 700, fontSize: '18px', color: '#212121' }}>
                    {row.sol_status != 'ACTIVE' ? `Activate` : `Deactivate`}</h6>
                <hr className='text-gary-500 mt-4 mb-4' />
                <p>{row.sol_status != 'ACTIVE'
                    ? ` Are you sure you want to activate this solution ?`
                    : ` Are you sure you want to deactivate this solution ?`}</p>
                <div className='mt-6 text-end'>
                    <Button style={{ backgroundColor: "#4D4D4D", color: "white" }} className='mr-3'
                        onClick={() => setDeactivate(false)}
                    >No</Button>
                    <Button variant='solid'
                        onClick={() => updateOperatorStatus()}
                    >Yes</Button>
                </div>
            </Dialog>
        </>
    )
}

export default SolutionsTable
