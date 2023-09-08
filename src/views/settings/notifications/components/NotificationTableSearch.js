import React, { useRef } from 'react'
import { Input } from 'components/ui'
import { HiOutlineSearch } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getItems, getNotificationList, setTableData } from '../store/dataSlice'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'

const NotificationTableSearch = () => {
    const dispatch = useDispatch()

    const searchInput = useRef()

    const tableData = useSelector(
        (state) => state.notificationsList.data.tableData
    )
    const { enterAccount, password, rememberMe, usernameOrEmail } = useSelector(
        (state) => state.auth.user
    )
    const debounceFn = debounce(handleDebounceFn, 500)

 
 
   function handleDebounceFn(val) {
        const newTableData = cloneDeep(tableData)  
        newTableData.page_no = tableData.pageIndex-1
        newTableData.page_size = tableData.pageSize
        newTableData.unq_id=enterAccount
        newTableData.sort_field=tableData.sort_field

     
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data) => {
        dispatch(setTableData(data))
        dispatch(getNotificationList(data))
    }

    const onEdit = (e) => {
        debounceFn(e.target.value)
    }
    return (
        <Input
            ref={searchInput}
            className="lg:w-52"
            size="sm"
            placeholder="Search Notification"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={onEdit}
            style={{"padding-left":"30px"}}
        />
    )
}

export default NotificationTableSearch
