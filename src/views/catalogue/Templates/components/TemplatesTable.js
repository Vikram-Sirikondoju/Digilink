import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { Badge, Tooltip, Dialog, Button } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { getTemplates, setTableData, } from '../store/dataSlice'
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
import { AiFillCopy } from "react-icons/ai";
import { RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri'
import { BsPatchCheckFill } from 'react-icons/bs'
import GetDropdownLabel, { OpenNotification, snakeToCamel } from 'views/Servicefile'
import { apiUpdateTemplateAccStatus } from 'services/TemplateService'
import ReactHtmlParser from 'html-react-parser'


// const TemplateStatusColor = {
//     1: {
//         label: 'Active',
//         dotClass: 'bg-emerald-500',
//         textClass: 'text-emerald-500',
//     },
//     2: {
//         label: 'Submitted',
//         dotClass: 'bg-blue-500',
//         textClass: 'text-amber-500',
//     },
//     0: { label: 'Inactive', dotClass: 'bg-red-500', textClass: 'text-red-500' },
// }
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
export const templateTypeOptions = [
    { label: 'Product', value: 'P' },
    { label: 'Data Plan', value: 'D' },
    { label: 'Service Plan', value: 'S' }
]

const TemplateColumn = ({ row }) => {
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



const TemplatesTable = ({ actionPermissions }) => {
    const [isDeactivate, setDeactivate] = useState(false)
    const [row, setRow] = useState('')
    const tableRef = useRef(null)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total, sort_field, order } = useSelector(
        (state) => state.templatesList.data.tableData
    )
    const loading = useSelector((state) => state.templatesList.data.loading)
    const data = useSelector((state) => state.templatesList.data.ItemList.res)
    const totalCount = useSelector((state) => state.templatesList.data.ItemList.total)

    const { enterAccount, password, rememberMe, usernameOrEmail } = useSelector(
        (state) => state.auth.user
    )
   
    const ActionColumn = ({ row }) => {
        const dispatch = useDispatch()
        const { textTheme } = useThemeClass()
        const navigate = useNavigate()


        const IconComponent = row.tp_status != 'ACTIVE' ? RiCheckboxCircleFill : RiCloseCircleFill;
        const iconColor = row.tp_status  != 'ACTIVE' ? "green" : "rose";
        const disableIconStyle = { color: 'grey', pointerEvents: 'none' }
        const { canAdd, canEdit, canView, canActivate, canClone, canApprove } =
        actionPermissions
        const onEdit = () => {
            navigate(`/catalogue-new-templates/edit`, { state: { data: row, mode: "EDIT" } })
        }

        const onClone = () => {
            navigate(`/catalogue-new-templates`, {
                state: { data: row, mode: 'ADD' },
            })
        }
        const handleClick = () => {
            setDeactivate(true);
            setRow(row);
        };
        return (
            <div className="flex justify-end text-lg">


                {/* <Tooltip title="Edit">
                    <span className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`} onClick={onEdit}>
                        <MdModeEdit />
                    </span>
                </Tooltip> */}

                <span
                    className={`cursor-pointer p-1  hover:${textTheme}`}
                    onClick={onClone}
                    style={canClone ? null : disableIconStyle}
                >
                    <AiFillCopy />
                </span>

                <Tooltip title={`${row.tp_status != 'ACTIVE' ? "Activate" : "Deactivate"}`}>
                    <span onClick={handleClick} className={`cursor-pointer p-1 text-${iconColor}-800 hover:text-${iconColor}-800`} style={canActivate ? null : disableIconStyle}>
                        <IconComponent />
                    </span>
                </Tooltip>
            </div>
        )
    }
    const fetchData = useCallback(() => {
        
        dispatch(getTemplates({
            page: pageIndex - 1,
            size: pageSize,
            //sort_field: sort_field ? sort_field : 'id',
            accId: enterAccount,
            order: order
        }))
    }, [dispatch, pageIndex, pageSize, sort_field, enterAccount, order,isDeactivate])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total: totalCount }),
        [pageIndex, pageSize, sort, query, totalCount]
    )
    //console.log("datadatadatadata", data)
    const columns = useMemo(
        () => [
            {
                header: 'Actions',
                flex: 1,
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
            {
                header: 'Template ID',
                accessorKey: 'tp_unq_id',
            },

            {
                header: 'Template Type',
                accessorKey: 'tp_type',
                cell: (props) => {
                   
                    const { tp_type   } = props.row.original
                    return(
                        
                    <span>{GetDropdownLabel(tp_type,templateTypeOptions)}</span>
                    )} 
            },
            {
                header: 'Template Title',
                accessorKey: 'tp_title',
            },
            {
                header: 'Item Category',
                accessorKey: 'rel_prod_cat_name',
            },
            {
                header: 'Description',
                accessorKey: 'tp_desc',
                cell: (props) => {
                    const { tp_desc } = props.row.original;
                    const htmlString = typeof tp_desc === "string" ? tp_desc : String(tp_desc);
                    return (
                      <span>{ReactHtmlParser(htmlString)}</span>
                    );
                  }
            },
            {
                header: 'Status',
                accessorKey: 'tp_status',
                flex: 1,
                cell: (props) => {
                    const { tp_status } = props.row.original
                    return (
                        <div className="flex items-center">
                            <span
                                className={`flex ml-2 rtl:mr-2 capitalize font-semibold rounded-full border ${orderStatusColor[tp_status]?.backgroundColor} mt-4 px-2 py-1 text-${orderStatusColor[tp_status]?.dotClass}`}
                            >
                                {tp_status === 'ACTIVE' && (<RiCheckboxCircleFill className="mt-1 mr-2 text-[#3B8C59]" />)}
                                {tp_status  === 'IN_ACTIVE' && (<RiCloseCircleFill className="mt-1 mr-2 text-[#FF0000]" />)}
                                {tp_status === 'SUBMITTED' && (<BsPatchCheckFill className="mt-1 mr-2 text-blue-500" />)}
                                {orderStatusColor[tp_status]?.label}
                            </span>
                        </div>
                    )
                },
            },

        ],
        []
    )


    const updateOperatorStatus = async () => {
        let isStatus = row.tp_status === 'ACTIVE' ? 'IN_ACTIVE' : 'ACTIVE'
        const resp = await apiUpdateTemplateAccStatus(row.id, isStatus);

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
                    {row.tp_status != 'ACTIVE' ? `Activate` : `Deactivate`}</h6>
                <hr className='text-gary-500 mt-4 mb-4' />
                <p>{row.tp_status != 'ACTIVE'
                    ? `Are you sure you want to activate this Template ?`
                    : `Are you sure you want to deactivate this Template ?`}</p>
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

export default TemplatesTable
