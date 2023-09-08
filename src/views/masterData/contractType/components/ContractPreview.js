import { Card } from 'components/ui'
import HTMLReactParser from 'html-react-parser'
import React from 'react'
import { MdModeEdit } from 'react-icons/md'

function ContractPreview({...props}) {

    const {values}=props

    return (
        <>
            <Card className="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2">
                    <h6 className="mx-2 mb-4 mt-1 font-bold ">
                    CONTRACT TYPE DETAILS{' '}
                    </h6>
                    <div className=" text-base text-black font-bold flex justify-end cursor-pointer">
                    <MdModeEdit className="mt-1"/>
                    <p>EDIT</p>
                    </div>
                </div>
                <div className="md:grid grid-cols-6">
                    <div className="col-span-2 md:gird mx-2">
                        <div className="text-base text-black font-bold decoration-2 mb-2">
                            Select User Category:
                        </div>
                        <div className="col-span-6 md:grid grid-cols-2 gap-2">
                            <p className="mt-2 text-base">{values.cust_cat}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base text-black font-bold decoration-2 mb-2">
                            Title
                        </div>
                        <div className='md:grid grid-cols-1 gap-2'>
                            <p className="mt-2 text-base">{values.contract_type_title}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base text-black font-bold decoration-2 mb-2">
                            Description
                        </div>
                        <div className='md:grid grid-cols-1 gap-2'>
                            <p className="mt-2 text-base">{HTMLReactParser(values.contract_type_desc)}</p>
                        </div>
                    </div>
                </div>
            </Card>
            {/* <Card className="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2">
                    <h6 className="mx-2 mb-4 mt-1 font-bold">
                        CONFIG DETAILS{' '}
                    </h6>
                    <div className=" text-base text-black font-bold flex justify-end cursor-pointer">
                        <MdModeEdit className="mt-1"/>
                        <p>EDIT</p>
                    </div>
                </div>
                <div className='md:grid grid-cols-2'>
                {values?.dgl_md_contract_type_configs?.map((e,i) => {
                    return(
                        <>
                        <div className="md:grid grid-cols-1">
                            <div className='mx-2'>
                                <p className='text-base text-black font-bold mb-2'>Title</p>
                                <p className='text-base'>{values.dgl_md_contract_type_configs[i].config_title}</p>
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
                        </div>
                        </>
                    )
                })}
                </div>
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
                        <p className='text-base'>Contract ABC</p>
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
                    <div className='col-span-2 md:gird mx-2'>
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
                </div> 
            </Card> */}
        </>
    )
}

export default ContractPreview
