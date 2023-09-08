import React, { useRef } from 'react'
import { Input } from 'components/ui'
import { HiOutlineSearch } from 'react-icons/hi'


const PasswordPolicyTableSearch = () => {
   
    return (
        <Input
            ref={{}}
            className="lg:w-52"
            size="sm"
            placeholder="Search Password Policy"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={""}
            style={{"padding-left":"30px"}}
        />
    )
}

export default PasswordPolicyTableSearch
