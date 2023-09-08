import React from 'react'
import { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import { Button, Dialog, Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { useDispatch, useSelector } from 'react-redux'
import { setTableData, getItems, getPagesList } from '../store/dataSlice'
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
import { MdModeEdit } from 'react-icons/md'
import { RiCheckboxCircleFill, RiCloseCircleFill, RiCheckboxBlankCircleFill } from 'react-icons/ri'
// import { getItems } from 'views/accounts/PendingApproval/store/dataSlice'
import { BsPatchCheckFill } from 'react-icons/bs'
import GetDropdownLabel, { OpenNotification, snakeToCamel } from 'views/Servicefile'
import { apiUpdatePageStatus } from 'services/PagesService'

const ItemStatusColor = {
  'ACTIVE': {
    label: 'Active',
    dotClass: 'bg-black-500',
    textClass: 'text-black-500',
    backgroundColor: 'bg-[#F5F5F5]'
  },
  'SUBMITTED': {
    label: 'Submitted',
    dotClass: 'bg-blue-500',
    textClass: 'text-black-500',
    backgroundColor: 'bg-[#F0F7FF]'
  },
  'IN_ACTIVE': { label: 'Inactive', dotClass: 'bg-blue-500', textClass: 'text-black-500', backgroundColor: 'bg- [#F5F5F5]' },
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


function PagesTable({ actionPermissions }) {


  const [isDeactivate, setDeactivate] = useState(false)


  const tableRef = useRef(null)

  const dispatch = useDispatch()


  const { pageIndex, pageSize, sort, query, total, sort_field, order } = useSelector(
    (state) => state.Pages.data.tableData
  )
  const loading = useSelector((state) => state.Pages.data.loading)

  const [row, setRow] = useState('')

  const data = useSelector((state) => state.Pages.data.pagesList.res)

  const totalCount = useSelector((state) => state.Pages.data.pagesList.total)


  const fetchData = useCallback(() => {
    dispatch(getItems())
  }, [])

  const ActionColumn = ({ row }) => {

    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = useCallback(() => {
      navigate(`/masterDataMenu-pages-add`, { state: { data: row, mode: "EDIT" } })
    }, [navigate, row])


    const handleClick = () => {
      setDeactivate(true);
      setRow(row);
    };

    const iconColor = row.page_status !== "ACTIVE" ? "green" : "rose";
    const IconComponent = row.page_status !== "ACTIVE" ? RiCheckboxCircleFill : RiCloseCircleFill;

    const disableIconStyle = { color: 'grey', pointerEvents: 'none' }
    const { canAdd, canEdit, canView, canActivate, canClone, canApprove } =
      actionPermissions

    return (
      <div className="text-lg">
        <Tooltip title="Edit">
          <span
            className={`cursor-pointer p-1 text-blue-500 hover:${textTheme}`}
            onClick={onEdit} style={canEdit ? null : disableIconStyle}
          >
            <MdModeEdit />

          </span>
        </Tooltip>
        <Tooltip title={`${row.page_status !== "ACTIVE" ? "Activate" : "Deactivate"}`}>
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

  //   const {
  //     acc_mno_id
  // } = useSelector((state) => state?.auth?.user)


  const updatePagesStatus = async () => {


    let isStatus = row.page_status === "ACTIVE" ? "IN_ACTIVE" : "ACTIVE";
    const resp = await apiUpdatePageStatus(row.id, isStatus);
    if (resp.data.success && isStatus === "ACTIVE") {
      setDeactivate(false)
      OpenNotification('success', 'Activated successfully')

    }
    else if (resp.data.success && isStatus === "IN_ACTIVE") {
      setDeactivate(false)

      OpenNotification('success', 'Deactivated successfully')

    }
  }

  const parentAccountList = useSelector((state) => state.Pages?.data?.parentAccountList)


  useEffect(() => {
    // dispatch(setSelectedRows([]))

    const fetchData = async () => {
      dispatch(getPagesList({ page_no: pageIndex - 1, page_size: pageSize, sort_field: sort_field ? sort_field : 'id', order: order }))
    };


    fetchData()
  }, [dispatch, fetchData, pageIndex, pageSize, sort, query, isDeactivate, sort_field, order])

  useEffect(() => {
    if (tableRef) {
      tableRef.current?.resetSelected()
    }
  }, [data])

  const tableData = useMemo(
    () => ({ pageIndex, pageSize, sort, query, total: totalCount }),
    [pageIndex, pageSize, sort, query, totalCount]
  )

  const columns = useMemo(
    () => [
      {
        header: 'Actions',
        id: 'action',

        cell: (props) => <ActionColumn row={props.row.original} />,
      },
      // {
      //   header: 'Operator',
      //   accessorKey: 'acc_name',
        // cell:(props) => {
        //     const {operator} = props.row.original
        //     return(
        //         <span>{GetDropdownLabel(operator, parentAccountList)}</span>
        //     )
        // }
      // },
      {
        header: 'Page Title',
        accessorKey: 'meta_title',
      },
      {
        header: 'Current Status',
        accessorKey: 'page_status',

        cell: (props) => {
          const { page_status } = props.row.original


          return (
            <div className="flex items-center">
              <span className={`flex ml-2 rtl:mr-2 capitalize font-semibold rounded-full border ${ItemStatusColor[page_status]?.backgroundColor} mt-4 px-2 py-1 text-${ItemStatusColor[page_status]?.dotClass}`}>
                {page_status === 'ACTIVE' && <RiCheckboxCircleFill className="mt-1 mr-2 text-[#3B8C59]" />}
                {page_status === 'IN_ACTIVE' && <RiCloseCircleFill className="mt-1 mr-2 text-[#FF0000]" />}
                {page_status === 'SUBMITTED' && <BsPatchCheckFill className="mt-1 mr-2 text-blue-500" />}
                {ItemStatusColor[page_status]?.label}
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
        onClose={() => setDeactivate(false)}
      >
        <h6
          style={{
            fontStyle: 'normal',
            fontSize: '18px',
          }}
        >{row.page_status !== 'ACTIVE' ? `Activate` : `Deactivate`}</h6>
        <hr className='text-gary-500 mt-4 mb-4' />
        <p>{row.page_status !== 'ACTIVE'
          ? `Are you sure you want to activate this page ?`
          : `Are you sure you want to deactivate this page ?`}</p>
        <div className='mt-6 text-end'>
          <Button style={{ backgroundColor: "#4D4D4D", color: "white" }} className='mr-3'
            onClick={() => setDeactivate(false)}
          >No</Button>
          <Button variant='solid'
            onClick={() => updatePagesStatus()}
          >Yes</Button>
        </div>
      </Dialog>
    </>
  )
}

export default PagesTable