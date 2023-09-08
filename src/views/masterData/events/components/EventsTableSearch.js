import React, { useRef } from 'react'
import { Input } from 'components/ui'
import { HiOutlineSearch } from 'react-icons/hi'

const EventsTableSearch = () => {
  return (
    <Input
            className="lg:w-52"
            size="sm"
            placeholder="Search"
            prefix={<HiOutlineSearch className="text-lg" />}
            style={{"padding-left":"30px"}}
        />
  )
}

export default EventsTableSearch
