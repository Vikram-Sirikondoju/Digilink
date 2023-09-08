import React from 'react'
import {
    HiDownload,
    HiPlusCircle,
    HiOutlineDocumentDownload,
} from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import { BiRefresh } from 'react-icons/bi'

import { Button } from 'components/ui'
import InventoryTableSearch from './InventoryTableSearch'
import InventoryFilter from './InventoryFilter'

const InventoryTableTools = ({ warehouseData }) => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col lg:flex-row lg:items-center">
            <InventoryTableSearch />
            <InventoryFilter />
            <Link
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                target="_blank"
                download
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                target="_blank"
                download
            >
                <Button block size="sm" icon={<HiOutlineDocumentDownload />}>
                    Import
                </Button>
            </Link>
            <Link
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                // target="_blank"
                // to="/warehouse-new-add-inventory"
            >
                <Button
                    block
                    size="sm"
                    style={{ backgroundColor: 'gray', color: 'white' }}
                    icon={<BiRefresh />}
                >
                    Sync
                </Button>
            </Link>
            {/* <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/warehouse-new-add-inventory" > */}
            <Button
                // block
                variant="solid"
                onClick={() =>
                    navigate(`/warehouse-new-add-inventory`, {
                        state: { data: warehouseData },
                    })
                }
                // style={{
                //     color: "white",fontFamily: 'Roboto',
                //     fontStyle: 'normal',
                //     fontSize: '18px',
                // }}
                // className='flex justify-center pt-[6px] gap-1'
                size="sm"
                icon={<HiPlusCircle />}
            >
                {/* <p className='pt-[2px]'><HiPlusCircle /></p> */}
                Add Item
            </Button>
            {/* </Link> */}
        </div>
    )
}

export default InventoryTableTools
