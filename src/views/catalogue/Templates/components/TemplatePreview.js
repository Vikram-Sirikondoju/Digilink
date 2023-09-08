import { Card } from 'components/ui'
import React from 'react'
import ReactHtmlParser from 'html-react-parser'
import GetDropdownLabel from 'views/Servicefile'
import { MdModeEdit } from 'react-icons/md'
import { useSelector } from 'react-redux'
// export const templateTypeOptions = [
//     { label: 'Product', value: 'M' },
//     { label: 'Data Plan', value: 'W' },
//     { label: 'Service Plan', value: 'S' }
// ]

export const templateTypeOptions = [
    { label: 'Product', value: 'P' },
    { label: 'Data Plan', value: 'D' },
    { label: 'Service Plan', value: 'S' }
]
function TemplatePreview(props) {
    const { operaterState } = props
    const productCat = useSelector((state) => state?.templateCreate?.data?.templateProductList)
    return (
        <>
            <Card cclassName="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2">
                    <h6 className="mx-2 mb-4 mt-1 font-bold text-cyan-500">
                        BASIC DETAILS{' '}
                    </h6>
                    {/* <div className=" text-base text-black font-bold flex justify-end">
                        <p>--</p>
                        <p>EDIT</p>
                    </div> */}
                    <button className=" text-base text-black font-bold flex justify-end" onClick={() => { props.setStep(0) }} >
                        <div className='flex'>
                            <MdModeEdit className="mt-1" />
                            <p className='ml-2'>EDIT</p>
                        </div>
                    </button>
                </div>
                <div className="md:grid grid-cols-12">
                    <div className='col-span-3 md:gird mx-2'>
                        <p className='text-base text-black font-bold mb-2'>Item Category</p>
                        <p className='text-base'>{GetDropdownLabel(operaterState?.category,productCat )}</p>
                        
                    </div>
                    <div className='col-span-3 md:gird mx-2'>
                        <p className='text-base text-black font-bold mb-2'>Template Title</p>
                        <p className='text-base'>{operaterState?.title}</p>
                    </div>
                    <div className='col-span-3 md:gird mx-2'>
                        <p className='text-base text-black font-bold mb-2'>Template Type</p>
                        <p className='text-base'>{GetDropdownLabel(operaterState?.type, templateTypeOptions)}</p>
                    </div>
                    <div className='col-span-3 md:gird mx-2'>
                        <p className='text-base text-black font-bold mb-2'>Description</p>
                        <p className='text-base'>{ReactHtmlParser(
                            operaterState?.description
                        )} </p>
                    </div>
                </div>

            </Card>

        </>
    )
}

export default TemplatePreview
