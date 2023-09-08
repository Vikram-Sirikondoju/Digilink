import React from 'react'
import ChargeAndBillsTableSearch from './ChargeAndBillsTableSearch'
import ChargeAndBillsFilter from './ChargeAndBillsTableFilter'
import { Link } from 'react-router-dom'
import { HiDownload } from 'react-icons/hi'
import { Button } from 'components/ui'
import { MdOutlineSettings } from 'react-icons/md'

function ChargeAndBillsTableTools() {
  return (
    <>
        <div className="flex flex-col lg:flex-row lg:items-center">
            <ChargeAndBillsTableSearch />
            <ChargeAndBillsFilter />
            <Link
                className="block lg:inline-block ltr:md:ml-2 md:mx-2 md:mb-0 mb-4"
                target="_blank"
                download
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link>
            <Link
                className="block lg:inline-block ltr:md:ml-0 md:mx-2 md:mb-0 mb-4"
                target="_blank"
                download
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Import
                </Button>
            </Link>
            <Link
                className="block lg:inline-block ltr:md:ml-0 md:mx-2 md:mb-0 mb-4"
                target="_blank"
                download
            >
                <Button block size="sm" icon={<MdOutlineSettings />}>
                    Columns
                </Button>
            </Link> 
        </div>
    </>
  )
}

export default ChargeAndBillsTableTools