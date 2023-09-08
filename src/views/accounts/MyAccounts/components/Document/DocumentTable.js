import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { Badge, Button, Dialog, Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getDocPolicyList, getItems, setTableData } from '../../store/dataSlice'
import {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    setSelectedRow,
} from '../../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { MdModeEdit } from 'react-icons/md'
import { AiFillCopy } from "react-icons/ai"
import { RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri'
import { BsPause } from 'react-icons/bs'
import { apiUpdateDocPolicyAccStatus } from 'services/MyAccountService'
import { OpenNotification, snakeToCamel } from 'views/Servicefile'

const orderStatusColor = {
    'ACTIVE': {
        label: 'Active',
        dotClass: 'bg-black-400',
        textClass: 'text-black-400',
        backgroundColor: 'bg-[#F5F5F5]'
    },
    'PENDING_APPROVAL': {
        label: 'Pending Approval',
        dotClass: 'bg-blue-400',
        textClass: 'text-black-400',
        backgroundColor: 'bg-[#F0F7FF]'
    },
    'IN_ACTIVE': { label: 'Inactive', dotClass: 'bg-blue-400', textClass: 'text-black-400', backgroundColor: 'bg-[#F5F5F5]' },
}

const DocumentTable = () => {

    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const [isDeactivate, setDeactivate] = useState(false)
    const [row, setRow] = useState('')

    const { pageIndex, pageSize, sort, query, total,sort_field, order } = useSelector(
        (state) => state.myaccountList.data.tableData
    )
    const { enterAccount, password, rememberMe, usernameOrEmail} = useSelector((state) => state.auth.user)
    const loading = useSelector((state) => state.myaccountList.data.loading)

    const data = useSelector((state) => state.myaccountList.data.docPolicyList?.res)

    const totalCount = useSelector((state) => state.myaccountList.data.docPolicyList?.total)

    const fetchData = useCallback(() => {
       // dispatch(getItems())
    }, [])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        dispatch(getDocPolicyList({ page_no: pageIndex-1, page_size: pageSize, sort_field: sort_field?sort_field:'id',unq_id:enterAccount, order}))
        fetchData()
    }, [isDeactivate, dispatch, query, enterAccount, pageIndex, pageSize, sort_field, fetchData, order])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])


    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total:totalCount }),
        [pageIndex, pageSize, sort, query, totalCount]
    )

    const updateDocPolicyStatus = async () => {

        let isStatus = row.status === "ACTIVE" ? "IN_ACTIVE" : "ACTIVE";
        const resp = await apiUpdateDocPolicyAccStatus(row.id, isStatus);
        if (resp.data.success) {
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
    
        const onDelete = () => {
            dispatch(setDeleteMode('single'))
            dispatch(setSelectedRow([row.id]))
        }
    
        const onView = useCallback(() => {
            navigate(`/app/sales/Item-details/${row.id}`)
        }, [navigate, row])
    
        const onEdit = useCallback(() => {
            navigate(`/accounts-new-document`,{state: { data: row, mode: "EDIT" } })
        }, [navigate, row])

        const onClone = useCallback(() => {
            navigate(`/accounts-new-document`,{state: { data: row, mode: "ADD" } })
        })
    
        const handleClick = () => {
            setDeactivate(true);
            setRow(row);
        };
    
        const iconColor = row.status != "ACTIVE" ? "green" : "rose";
        const IconComponent = row.status != "ACTIVE" ? RiCheckboxCircleFill : RiCloseCircleFill;
    
        return (
            <div className="text-lg">
            <Tooltip title="Edit">
                <span
                    className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                    onClick={onEdit}
                >
                    <MdModeEdit />
               
                </span>
            </Tooltip>
    
            {/* <Tooltip title="Clone">
                <span
                    className={`cursor-pointer p-1  hover:${textTheme}`}
                    onClick={onClone}
                >
                    <AiFillCopy/>
                </span>
            </Tooltip> */}
            <Tooltip title="View">
                <span
                    className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                    onClick={onView}
                >
                    <HiOutlineEye />
                </span>
            </Tooltip>
            <Tooltip title={`${row.status != "ACTIVE" ? "Activate" : "Deactivate"}`}>
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
                header: 'Policy Title',
                accessorKey: 'policy_name',
            },
            {
                header: 'Applied to',
                accessorKey: 'acc_type',
            },
            {
                header: 'Current Status',
                accessorKey: 'status',
               
                cell: (props) => {
                    const { status } = props.row.original

                    return (
                        <div className="flex items-center">
                            <span className={`flex whitespace-nowrap ml-2 rtl:mr-2 capitalize font-semibold rounded-full border ${orderStatusColor[status]?.backgroundColor} mt-4 px-2 py-1 text-${orderStatusColor[status]?.dotClass}`}>
                                {status === 'ACTIVE' && <RiCheckboxCircleFill className="mt-1 mr-2 text-[#3B8C59]" />}
                                {status === 'IN_ACTIVE' && <RiCloseCircleFill className="mt-1 mr-2 text-[#FF0000]" />}
                                {status === 'PENDING_APPROVAL' && <BsPause className="mt-1 mr-2 text-blue-500" />}
                                {orderStatusColor[status]?.label}
                            </span>
                        </div>
                    );
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
            <h6 style={{
                fontStyle: 'normal',
                fontWeight: 700, fontSize: '18px'
            }}>{row.status === "ACTIVE" ? `Deactivate` : `Activate`}</h6>
            <hr className='text-gary-500 mt-4 mb-4' />
            <p style={{
                fontStyle: 'normal',
                fontWeight: 400, fontSize: '15px'
            }}>{row.status === "ACTIVE" ? `Are you sure you want to deactivate this document policy ?` : `Are you sure you want to Activate this document policy  ?`}</p>
            <div className='mt-6 text-end'>
                <Button style={{ backgroundColor: "#4D4D4D", color: "white", borderRadius: "2px" }} className='mr-3'
                    onClick={() => setDeactivate(false)}
                >No</Button>
                <Button variant='solid'
                    onClick={() => updateDocPolicyStatus()}
                >Yes</Button>
            </div>
        </Dialog>
        </>
    )
}

export default DocumentTable
