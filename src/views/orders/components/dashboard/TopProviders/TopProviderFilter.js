
import React from 'react'
import { HiOutlineFilter} from 'react-icons/hi'
import {
   
    Button,
  
} from 'components/ui'



const TopProviderFilter = () => {
   

    return (
        <>
            <Button
                size="sm"
                className="block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4"
                icon={<HiOutlineFilter />}
                onClick={() => {}}
            >
                Filter
            </Button>
           
        </>
    )
}

export default TopProviderFilter
