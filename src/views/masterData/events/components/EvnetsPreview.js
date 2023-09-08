import { Card } from 'components/ui'
import React from 'react'
import { MdModeEdit } from 'react-icons/md'

function EventsPreview() {
    return (
        <>
            <Card className="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2">
                    <h6 className=" mb-4 mt-1 font-bold ">
                    EVENT DETAILS{' '}
                    </h6>
                    <div className=" text-base text-black font-bold flex justify-end cursor-pointer">
                    <MdModeEdit className="mt-1"/>
                    <p>EDIT</p>
                    </div>
                </div>
                <div className="md:grid grid-cols-6">
                    <div>
                        <div className="text-base text-black font-bold decoration-2 mb-2">
                            Event Title
                        </div>
                        <div className='md:grid grid-cols-1 gap-2'>
                            <p className="mt-2 text-base">Event ABC</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base text-black font-bold decoration-2 mb-2">
                            Description
                        </div>
                        <div className='md:grid grid-cols-1 gap-2'>
                            <p className="mt-2 text-base">Lorem ipsum dolor sit...</p>
                        </div>
                    </div>
                </div>
            </Card>
            <Card className="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2">
                    <h6 className="mx-2 mb-4 mt-1 font-bold">
                        CONFIG DETAILS{' '}
                    </h6>
                    <div className=" text-base text-black font-bold flex justify-end cursor-pointer">
                        <MdModeEdit className="mt-1"/>
                        <p>EDIT</p>
                    </div>
                </div>
                <div className="md:grid grid-cols-1">

                    <div className='mx-2'>
                        <p className='text-base text-black font-bold mb-2'>Title</p>
                        <p className='text-base'>Config ABC</p>
                    </div>
                    <div className='mx-2 my-4'>
                        <p className='text-base text-black font-bold mb-2'>IF</p>
                        <ul>
                            <li className='my-4'>1.  Customer Type    Greater Than or Equal to 1000.00 INR <span className='text-sm text-black font-bold'>AND</span></li>
                            <li className='my-4'>2.  Customer Type    Equal to Enterprise Customer </li>
                        </ul>
                    </div>

                    <div className='mx-2 my-4'>
                        <p className='text-base text-black font-bold mb-2'>THEN</p>
                        <ul>
                            <li className='my-4'>1.  Price    Equal to 500.00 INR </li>
                        </ul>
                    </div>


                    {/* <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base text-black font-bold mb-2'>FirstName</p>
                        <p className='text-base'>Ajay</p>
                    </div>
                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base text-black font-bold mb-2'>LastName</p>
                        <p className='text-base'>Kumar</p>
                    </div>
                  
                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base text-black font-bold mb-2'>Email ID:</p>
                        <p className='text-base'>ajjas@gmail.com</p>
                    </div>
                    <div className='col-span-4 md:gird mx-2'>
                        <p className='text-base text-black font-bold mb-2'>Phone Number</p>
                        <p className='text-base'>080 73278223</p>
                    </div>
                   */}
                   
                    
                </div>
              
              
            </Card>
          
        </>
    )
}

export default EventsPreview
