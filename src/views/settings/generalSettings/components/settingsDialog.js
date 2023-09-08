import { DataTable } from 'components/shared'
import { Input } from 'components/ui'
import { cloneDeep } from 'lodash'
import React, { useCallback, useMemo, useRef } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { MdNavigateNext } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

function SettingsDialog() {

    const columns = useMemo(() => [
        {
            header: 'Operator ID',
            accessorKey: 'operaterId',
        },
        {
            header: 'Operator Name',
            accessorKey: 'operaterName',
        },
        
    ])

    const data = [
      {
        operaterId : "#000001",
        operaterName : 'Operater 1'
      },
      {
        operaterId : "#000001",
        operaterName : 'Operater 1'
      },
      {
        operaterId : "#000001",
        operaterName : 'Operater 1'
      },
      {
        operaterId : "#000001",
        operaterName : 'Operater 1'
      },
      {
        operaterId : "#000001",
        operaterName : 'Operater 1'
      },
      {
        operaterId : "#000001",
        operaterName : 'Operater 1'
      },
      {
        operaterId : "#000001",
        operaterName : 'Operater 1'
      },      
    ]


    return (
        <div className="p-3">
            <h3>Settings For</h3>
            <Input
                className="w-72 mt-4"
                size="sm"
                placeholder="Search Operater / Operater ID"
                prefix={<HiOutlineSearch className="text-lg" />}
                onChange={''}
            />
            <div className='mt-4'>
              <DataTable
                columns={columns}
                data={data}
                
                />
            </div>
        </div>
    )
}

export default SettingsDialog