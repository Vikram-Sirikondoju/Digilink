import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { Badge, Tooltip, Dialog, Button } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, getParentAccount, getUploadFileType, setTableData } from '../store/dataSlice'
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
import { RiCheckboxCircleFill, RiCloseCircleFill } from 'react-icons/ri'
import { AiFillCopy } from 'react-icons/ai'
import { MdModeEdit } from 'react-icons/md'
import { BsPatchCheckFill } from 'react-icons/bs'
import { apiUpdateRetailAccStatus } from 'services/RetailService'
import GetDropdownLabel, { OpenNotification, snakeToCamel } from 'views/Servicefile'
import { getParenOperator } from 'views/accounts/EnterpriseCustomers/store/dataSlice'



const orderStatusColor = {
    'ACTIVE': {
        label: 'Active',
        dotClass: 'bg-black-400',
        textClass: 'text-black-400',
        backgroundColor: 'bg-[#F5F5F5]'
    },
    'SUBMITTED': {
        label: 'Submitted',
        dotClass: 'bg-blue-400',
        textClass: 'text-black-400',
        backgroundColor: 'bg-[#F0F7FF]'
    },
    'IN_ACTIVE': { label: 'Inactive', dotClass: 'bg-blue-400', textClass: 'text-black-400', backgroundColor: 'bg-[#F5F5F5]' },
}



// const OrderColumn = ({ row }) => {
//     const { textTheme } = useThemeClass()
//     const navigate = useNavigate()

//     const onView = useCallback(() => {
//         navigate(`/app/sales/order-details/${row.id}`)
//     }, [navigate, row])

//     return (
//         <span
//             className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
//             onClick={onView}
//         >
//             #{row.id}
//         </span>
//     )
// }



const RetailTable = ({actionPermissions}) => {
    // 
    const { pageIndex, pageSize, sort, query, total,sort_field,order } = useSelector(
        (state) => state.retailsList.data.tableData
    )
    const loading = useSelector((state) => state.retailsList.data.loading)

    const data = useSelector((state) => state.retailsList.data.orderList.res)

    const totalCount = useSelector((state) => state.retailsList.data.orderList.total)

    const [isDeactivate, setDeactivate] = useState(false)
    const [row, setRow] = useState('')

    const tableRef = useRef(null)

    const dispatch = useDispatch()
    const {enterAccount, password,rememberMe,usernameOrEmail
    } = useSelector(
     (state) => state.auth.user
 )
    const parentAccountList = useSelector((state) => state.retailsList?.data?.parentAccountList)


    const updateRetailStatus = async () => {

        let isStatus = row.cust_status === "ACTIVE" ? "IN_ACTIVE" : "ACTIVE";
        const resp = await apiUpdateRetailAccStatus(row.id, isStatus);
        if (resp.data.success) {
           
            if(isStatus=== 'ACTIVE'){
                  
                 setDeactivate(false)
                 OpenNotification('success','Activated successfully')
            
            }else{
                 
                 setDeactivate(false)
                 OpenNotification('success','Deactivated successfully')
            
 
            }
             
         }
    }

    const ActionColumn = ({ row }) => {

        const { textTheme } = useThemeClass()

        const navigate = useNavigate()


        const onEdit = () => {

            navigate(`/account-new-retail/edit`, { state: { data: row, mode: "EDIT" } })


        }

        const onClone = () => {

            navigate(`/account-new-retail`,{ state: { data: row, mode:"ADD" } })
        }

        const handleClick = () => {
            setDeactivate(true);
            setRow(row);
        };

        const iconColor = row.cust_status != "ACTIVE" ? "green" : "rose";
        const IconComponent = row.cust_status != "ACTIVE" ? RiCheckboxCircleFill : RiCloseCircleFill;

        const disableIconStyle = { color: 'grey', pointerEvents: 'none' }
        const { canAdd, canEdit, canView, canActivate, canClone, canApprove } =
            actionPermissions

        return (
            <div className="text-lg">
                <Tooltip title="Edit">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                        onClick={onEdit}
                        style={canEdit ? null : disableIconStyle}
                    >
                        <MdModeEdit />
                    </span>
                </Tooltip>

                <Tooltip title="Clone">
                    <span
                        className={`cursor-pointer p-1  hover:${textTheme}`}
                    onClick={onClone}
                    style={canClone ? null : disableIconStyle}
                    >
                        <AiFillCopy />
                    </span>
                </Tooltip>
                <Tooltip title="View">
                    <span
                        className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
                    // onClick={onView}   
                    style={canView ? null : disableIconStyle}
                    >
                        <HiOutlineEye />
                    </span>
                </Tooltip>
                <Tooltip  title={`${
                        row.cust_status != 'ACTIVE' ? 'Activate' : 'Deactivate'
                    }`}>
                    <span
                        className={`cursor-pointer p-1 text-${iconColor}-800 hover:text-${iconColor}-800`}
                        onClick={handleClick}  style={canActivate ? null : disableIconStyle}
                    >
                        <IconComponent />
                    </span>
                </Tooltip>
            </div>
        )
    }

    useEffect(() => {
        dispatch(getUploadFileType(enterAccount))
    }, [])
    useEffect(() => {

        const fetchData = async () => {
            dispatch(getOrders({  page_no:pageIndex-1, page_size: pageSize, sort_field: sort_field?sort_field:'id',unq_id:enterAccount,order:order }))
        }

        fetchData()
        dispatch(getParentAccount({enterAccount}))
    }, [isDeactivate, dispatch, query, enterAccount, pageIndex, pageSize, sort_field,order])


    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total:totalCount }),
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
                header: 'Cust ID',
                accessorKey: 'cust_unq_id',

            },

            {
                header: 'Customer Name',
                accessorKey: 'cust_name',


            },

            {
                header: 'Operator',
                accessorKey: 'cust_parent',
                cell: (props) => {
                    const { cust_parent } = props.row.original
                    return(
                    <span>{GetDropdownLabel(cust_parent,parentAccountList)}</span>
                    )} 

                
            },

         

            {

                header: 'Address',
                accessorKey: 'cust_add_l1',

            },


           
          
            {
                header: 'Status',
                accessorKey: 'cust_status',
                flex: 1,

                cell: (props) => {
                    const { cust_status } = props.row.original

                    return (
                       
                        <div className="flex items-center">
                            <span className={`flex ml-2 rtl:mr-2 capitalize font-semibold rounded-full border ${orderStatusColor[cust_status]?.backgroundColor} mt-4 px-2 py-1 text-${orderStatusColor[cust_status]?.dotClass}`}>
                                {cust_status === 'ACTIVE' && <RiCheckboxCircleFill className="mt-1 mr-2 text-[#3B8C59]" />}
                                {cust_status === 'IN_ACTIVE' && <RiCloseCircleFill className="mt-1 mr-2 text-[#FF0000]" />}
                                {cust_status === 'SUBMITTED' && <BsPatchCheckFill className="mt-1 mr-2 text-blue-500" />}
                                {orderStatusColor[cust_status]?.label}
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
                onClose={() => setDeactivate(false)}
            >
                <h6
                    style={{
                        fontStyle: 'normal',
                        fontSize: '18px'
                    }}
                >{row.cust_status != 'ACTIVE' ? `Activate` : `Deactivate`}</h6>
                <hr className='text-gary-500 mt-4 mb-4' />
                <p>{row.cust_status != 'ACTIVE'
                        ? `Are you sure you want to activate this retail customer ?`
                        : `Are you sure you want to deactivate this retail customer ?`}</p>
                <div className='mt-6 text-end'>
                    <Button style={{ backgroundColor: "#4D4D4D", color: "white" }} className='mr-3'
                        onClick={() => setDeactivate(false)}
                    >No</Button>
                    <Button variant='solid'
                        onClick={() => updateRetailStatus()}
                    >Yes</Button>
                </div>
            </Dialog>
        </>
    )
}

export default RetailTable
