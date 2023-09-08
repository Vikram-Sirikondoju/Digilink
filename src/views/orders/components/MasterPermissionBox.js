import { Card, Checkbox } from 'components/ui'
import React from 'react'

var randomColor = Math.floor(Math.random() * 16777215).toString(16)

function MasterPermissionBox() {
    return (
        <>
            <div className="bg-gray-50 p-5">
                <div className="md:grid grid-cols-3 ">
                    <Card
                        className="rounded-none border-t-4 border-indigo-500 border-r-0 border-b-0 border-l-0"
                        
                    >
                        <div className="flex justify-between">
                            <p className="text-base text-black font-bold">
                                Account Management
                            </p>
                            <div className="flex">
                                <Checkbox className="" />
                                <p className='text-base font-medium'>Select All</p>
                            </div>
                        </div>
                        <div className="flex flex-row-reverse gap-4 mt-6 " >
                            <p className='text-base font-medium'>Approve</p>
                            <p className='text-base font-medium'>Deactivate</p>
                            <p className='text-base font-medium'>Edit</p>
                            <p className='text-base font-medium'>Add</p>
                            <p className='text-base font-medium'>View</p>
                        </div>
                        <div className='flex mt-5'>
                            <p className='mr-6'>Operaters</p>
                            <Checkbox className="mx-3"/>
                            <Checkbox className="mx-4"/>
                            <Checkbox className="mx-4"/>
                            <Checkbox className="mx-6 mr-8"/>
                            <Checkbox className="mx-6 ml-8"/>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default MasterPermissionBox
