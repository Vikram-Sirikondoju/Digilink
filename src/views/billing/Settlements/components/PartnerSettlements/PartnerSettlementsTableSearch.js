import React, { useRef } from 'react'
import { Input } from 'components/ui'
import { HiOutlineSearch } from 'react-icons/hi'

const PartnerSettlementsTableSearch = () => {
    // const dispatch = useDispatch()

    const searchInput = useRef()

   
    // // const onEdit = (e) => {
    //     debounceFn(e.target.value)
    // }

    return (
        <Input
            ref={searchInput}
            className="lg:w-52"
            size="sm"
            placeholder="Search"
            prefix={<HiOutlineSearch className="text-lg" />}
            style={{"padding-left":"30px"}}
            // onChange={onEdit}
        />
    )
}

export default PartnerSettlementsTableSearch
