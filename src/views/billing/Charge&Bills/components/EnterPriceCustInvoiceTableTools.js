import { Button, DatePicker, Input } from 'components/ui'
import React from 'react'
import { HiDownload, HiOutlineFilter, HiOutlineSearch } from 'react-icons/hi'
import { MdOutlineSettings } from 'react-icons/md'
import { Link } from 'react-router-dom'

function EnterPriceCustInvoiceTableTools() {
  return (
    <>
        <div className="flex flex-col lg:flex-row lg:items-center">
            <Input
                ref={{}}
                className="lg:w-60"
                size="sm"
                placeholder="Search Invoice List"
                prefix={<HiOutlineSearch className="text-lg" />}
                onChange={''}
                style={{"padding-left":"30px"}}
            />
            <DatePicker 
                placeholder= 'Enter Start Date'
                className='w-48 mx-2'
            />
             <DatePicker 
                placeholder= 'Enter End Date'
                className='w-48'
            />
            <Button
                size="sm"
                className="block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4"
                icon={<HiOutlineFilter />}
                onClick={() => {}}
            >
                Filter
            </Button>
            <Link
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                target="_blank"
                download
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link>
        </div>
    </>
  )
}

export default EnterPriceCustInvoiceTableTools