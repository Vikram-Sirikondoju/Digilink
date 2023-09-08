import React from 'react'
import { HiOutlineFilter} from 'react-icons/hi'
import {
   
    Button,
  
} from 'components/ui'
import { AiOutlineClose } from 'react-icons/ai'



const WorkOrderClose = () => {
   

    return (
        <>
            <Button
                size="sm"
                className="block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4 border-none text-black-700"
                icon={<AiOutlineClose />}
                onClick={() => {}}
            >
                CLOSE
            </Button>
           
        </>
    )
}

export default WorkOrderClose
