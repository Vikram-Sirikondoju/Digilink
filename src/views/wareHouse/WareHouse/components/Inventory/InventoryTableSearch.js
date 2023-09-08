import React, { useRef } from 'react'
import { Input } from 'components/ui'
import { HiOutlineSearch } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, setTableData } from '../../store/dataSlice'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'

const InventoryTableSearch = () => {
    // const dispatch = useDispatch()

    const searchInput = useRef()

    return (
        <Input
            ref={searchInput}
            className="lg:w-52"
            size="sm"
            placeholder="Search"
            prefix={<HiOutlineSearch className="text-lg" />}
            // onChange={onEdit}
        />
    )
}

export default InventoryTableSearch
