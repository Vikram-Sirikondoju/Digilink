import React, { useRef } from 'react'
import { Button, Input } from 'components/ui'
import {BsFillFlagFill} from 'react-icons/bs'

const WorkOrderRaise = () => {
    // const dispatch = useDispatch()

    const searchInput = useRef()

   
    // // const onEdit = (e) => {
    //     debounceFn(e.target.value)
    // }

    return (
        <Button
        size="sm"
        className="block md:inline-block ltr:md:ml-2  md:mb-0 mb-4 "
        icon={<BsFillFlagFill />}
        onClick={() => {}}
    >
        Raise A Conflict
    </Button>
   
    )
}

export default WorkOrderRaise