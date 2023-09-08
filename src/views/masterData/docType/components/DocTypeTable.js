import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { Badge, Tooltip, Dialog, Button } from 'components/ui'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { getDocTypeData, getItems, getParentAccount, setTableData } from '../store/dataSlice'
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
import { RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri'
import { BsPatchCheckFill } from 'react-icons/bs'
import {HiOutlineEye} from 'react-icons/hi'
import { apipdateDocTypeStatus } from 'services/DocType'
import GetDropdownLabel, { OpenNotification, snakeToCamel } from 'views/Servicefile'



const ItemStatusColor = {
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

const ItemColumn = ({ row }) => {
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


const DocTypeTable = ({ actionPermissions }) => {
    const [isDeactivate, setDeactivate] = useState(false)
    const [row, setRow] = useState('')
    const tableRef = useRef(null)

    // const operatorAccountList = useSelector((state) => state.doctypeList?.data?.operatorAccountList)

    const ActionColumn = ({ row }) => {


        const dispatch = useDispatch()
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()

        const onDelete = () => {
            dispatch(setDeleteMode('single'))
            dispatch(setSelectedRow([row.id]))
        }
        const onEdit = () => {
            navigate('/create-document-type', { state: { data: row, mode: "EDIT" } })

        }

        const onView = useCallback(() => {
            navigate(`/app/sales/Item-details/${row.id}`)
        }, [navigate, row])

        const handleClick = () => {
            setDeactivate(true);
            setRow(row);
        };

        const iconColor = row.md_doc_status !== "ACTIVE" ? "green" : "rose";
        const IconComponent = row.md_doc_status !== "ACTIVE" ? RiCheckboxCircleFill : RiCloseCircleFill;

        const disableIconStyle = { color: 'grey', pointerEvents: 'none' }
        const { canAdd, canEdit, canView, canActivate, canClone, canApprove } =
            actionPermissions

        return (
            <div className="text-lg">
                <Tooltip title="Edit">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                        onClick={onEdit} style={canEdit ? null : disableIconStyle}                    >
                        <MdModeEdit />

                    </span>
                </Tooltip>
                <Tooltip title="View">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                        style={canView ? null : disableIconStyle}
                    >
                        <HiOutlineEye />
                    </span>
                </Tooltip>
                <Tooltip title={`${row.md_doc_status !== 'ACTIVE' ? 'Activate' : 'Deactivate'
                    }`}>
                    <span
                        className={`cursor-pointer p-1 text-${iconColor}-800 hover:text-${iconColor}-800`}
                        onClick={handleClick} style={canActivate ? null : disableIconStyle}
                    >
                        <IconComponent />
                    </span>
                </Tooltip>
            </div>
        )
    }


    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total, sort_field, order } = useSelector(
        (state) => state.doctypeList.data.tableData
    )

    const {
        unq_id
    } = useSelector((state) => state?.auth?.user)

    const loading = useSelector((state) => state.doctypeList.data.loading)
    // state.doctypeList.data.DocTypeData 
    const data = useSelector((state) => state.doctypeList.data.DocTypeData)

    const { enterAccount, password, rememberMe, usernameOrEmail
    } = useSelector(
        (state) => state.auth.user
    )

    const parentAccountList = useSelector((state) => state.doctypeList?.data?.parentAccountList)

    const totalCount = useSelector(
        (state) => state.doctypeList.data.tableData.total
    )
    const fetchData = useCallback(() => {
        // dispatch(getItems())
    }, [])

    useEffect(() => {
        dispatch(setSelectedRows([]))

        const fetchData = async () => {
            dispatch(getDocTypeData({
                page_no: pageIndex - 1, page_size: pageSize,
                unqId: unq_id,
                sort_field: sort_field ? sort_field : 'id',
                order: order,

            }))
        };


        fetchData()
        // dispatch(getParentAccount({enterAccount}))
    }, [dispatch, fetchData, pageIndex, pageSize, query, sort, isDeactivate, enterAccount, sort_field, order, unq_id])



    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total: totalCount }),
        [pageIndex, pageSize, sort, query, totalCount]
    )

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])




    const columns = useMemo(
        () => [
            {
                header: 'Actions',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
            // {
            //     // header: 'Operator',
            //     // accessorKey: 'acc_name',
            //     // cell: (props) => {
            //     //     const { acc_unq_id } = props.row.original
            //     //     return(
            //     //     <span>{GetDropdownLabel(acc_unq_id, parentAccountList)}</span>
            //     //     )}  

            // },
            {
                header: 'Document Title',
                accessorKey: 'doc_type_title',


            },
            {
                header: 'Allowed File Formats',
                accessorKey: 'allow_file_format',
                cell: (props) => {
                    const { allow_file_format } = props.row.original
                    let fileFormat = JSON?.parse(allow_file_format)
                    let fileFormatData = Object?.keys(fileFormat).filter(key => fileFormat[key])
                    return (
                        <span>
                            {fileFormatData.join(', ')}
                        </span >
                    )
                }
            },

            {
                header: 'Status',
                accessorKey: 'md_doc_status',
                flex: 1,

                cell: (props) => {
                    const { md_doc_status } = props.row.original


                    return (
                        <div className="flex items-center">
                            <span className={`flex ml-2 rtl:mr-2 capitalize font-semibold rounded-full border ${ItemStatusColor[md_doc_status]?.backgroundColor} mt-4 px-2 py-1 text-${ItemStatusColor[md_doc_status]?.dotClass}`}>
                                {md_doc_status === 'ACTIVE' && <RiCheckboxCircleFill className="mt-1 mr-2 text-[#3B8C59]" />}
                                {md_doc_status === 'IN_ACTIVE' && <RiCloseCircleFill className="mt-1 mr-2 text-[#FF0000]" />}
                                {md_doc_status === 'SUBMITTED' && <BsPatchCheckFill className="mt-1 mr-2 text-blue-500" />}
                                {ItemStatusColor[md_doc_status]?.label}
                            </span>
                        </div>
                    );
                },

            },


        ],
        [parentAccountList]
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
        newTableData["sort_field"] = sortfield
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

    const updateDocTypeStatus = async () => {

        let isStatus = row.md_doc_status === "ACTIVE" ? "IN_ACTIVE" : "ACTIVE";
        const resp = await apipdateDocTypeStatus(row.id, isStatus);
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
                onClose={() => setDeactivate(false)}
            >
                <h6
                    style={{
                        fontStyle: 'normal',
                        fontSize: '18px'
                    }}
                >{row.md_doc_status !== 'ACTIVE' ? `Activate` : `Deactivate`}</h6>
                <hr className='text-gary-500 mt-4 mb-4' />
                <p>{row.md_doc_status !== 'ACTIVE'
                    ? `Are you sure you want to activate this document type ?`
                    : `Are you sure you want to deactivate this document type ?`}</p>
                <div className='mt-6 text-end'>
                    <Button style={{ backgroundColor: "#4D4D4D", color: "white" }} className='mr-3'
                        onClick={() => setDeactivate(false)}
                    >No</Button>
                    <Button variant='solid'
                        onClick={() => updateDocTypeStatus()}
                    >Yes</Button>
                </div>
            </Dialog>


        </>
    )
}

export default DocTypeTable
