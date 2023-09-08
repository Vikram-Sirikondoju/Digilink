import { Card } from 'components/ui'
import React from 'react'
import { Link } from 'react-router-dom'
import { MdModeEdit } from 'react-icons/md'
import GetDropdownLabel from 'views/Servicefile'
import { useSelector } from 'react-redux'


const proCategoryOptions = [
    { label: 'Product', value: 'P' },
    { label: 'Data Plan', value: 'D' },
    { label: 'Service Plan', value: 'S' },
]


function SolutionPreview({ solutionIntialValues, setStep, solutionState }) {
    const productCat = useSelector((state) => state?.solutionsList?.data?.templateProductList)


    return (
        <>
            <h3 className="mx-4 mb-4 mt-2">Preview</h3>
                
              <Card>
                    <div className='md:grid grid-cols mb-4'>
                                <h6 className="mx-2 mb-4 mt-1 font-bold justify-start">
                                   BASIC DETAILS
                                </h6>
                                <div className=" text-base text-black font-bold flex justify-end">
                                    <Link onClick={() => { setStep(0) }} >
                                        <div className='flex'>
                                            <MdModeEdit className="mt-1" />
                                            <p className='ml-2'>EDIT</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                <div className="md:grid grid-cols-7 mt-3">
                    <div className="col-span-1 md:gird mx-2">
                        <div className="md:grid grid-cols-1 text-base text-black font-bold decoration-2 mb-2">
                            Item  Category
                        </div>
                        <div className="col-span-6 md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">{GetDropdownLabel(solutionIntialValues?.basics?.pCategory, productCat)}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base text-black font-bold decoration-2 mb-2">
                            Solution Title
                        </div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">{solutionIntialValues.basics.solTitle}</p>
                        </div>
                    </div>
                    <div className="col-span-1 md:gird mx-2">
                        <div className="text-base text-black font-bold decoration-2 mb-2">
                            Description
                        </div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">
                                {solutionIntialValues.basics.solDesc.replace(/<[^>]*>?/gm, '')}
                            </p>
                        </div>
                    </div>
                </div>
              </Card>
                

                {solutionIntialValues?.solCreate?.initialValues.map((element, index) => {
                    return (
                        GetDropdownLabel(element?.cItemType, element?.chooseItems) &&  <>
                        <Card className='mt-4'>
                            <div className='md:grid grid-cols mb-4'>
                                <h6 className="mx-2 mb-4 mt-1 font-bold justify-start">
                                     CREATE SOLUTION
                                </h6>
                                <div className=" text-base text-black font-bold flex justify-end">
                                    <Link onClick={() => { setStep(1) }} >
                                        <div className='flex'>
                                            <MdModeEdit className="mt-1" />
                                            <p className='ml-2'>EDIT</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="md:grid grid-cols-7 mt-5">

                                <div className="col-span-1 md:gird mx-2">
                                    <div className="text-base text-black font-bold decoration-2 mb-2">
                                        Item Type
                                    </div>
                                    <div className="md:grid grid-cols-1 gap-2">
                                        <p className="mt-2 text-base">{GetDropdownLabel(element?.solItemType, proCategoryOptions)}</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-base text-black font-bold decoration-2 mb-2">
                                        Item
                                    </div>
                                    <div className="md:grid grid-cols-1 gap-2">
                                        <p className="mt-2 text-base">{GetDropdownLabel(element?.cItemType, element?.chooseItems)}</p>
                                    </div>
                                </div>
                            </div>

                            <div >
                                {element?.solItems?.map((vnt, index) => {
                                    return (vnt?.solPrice && <div className="md:grid grid-cols-7 mt-5">

                                        <div className="col-span-1 md:gird mx-2">
                                            <div className="text-base text-black font-bold decoration-2 mb-2">
                                                Varient
                                            </div>
                                            <div className="md:grid grid-cols-1 gap-2">
                                                <p className="mt-2 text-base">{GetDropdownLabel(vnt?.solVariant, element?.chooseVarients)}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-base text-black font-bold decoration-2 mb-2">
                                                Price in USD
                                            </div>
                                            <div className="md:grid grid-cols-1 gap-2">
                                                <p className="mt-2 text-base">{vnt?.solPrice}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-base text-black font-bold decoration-2 mb-2">
                                                Discount
                                            </div>
                                            <div className="md:grid grid-cols-1 gap-2">
                                                <p className="mt-2 text-base">{vnt?.solDiscount}</p>
                                            </div>
                                        </div>
                                    </div>)

                                })}
                            </div>
                            </Card>
                        </>

                    )

                })}
            {/* <Card className="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2 mb-4">
                    <h6 className="mx-2 mb-4 mt-1 font-bold">CONFIG DETAILS</h6>
                    <div className=" text-base text-black font-bold flex justify-end">
                        <Link onClick={() => { setStep(0) }} >
                            <div className='flex'>
                                <MdModeEdit className="mt-1" />
                                <p className='ml-2'>EDIT</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="md:grid grid-cols-6">
                    <div className="col-span-2 md:gird mx-2">
                        <div className="text-base text-black font-bold  decoration-2 mb-2">
                            Title:
                        </div>
                        <div className="col-span-6 md:grid grid-cols-2 gap-2">
                            <p className="mt-2 text-base">Config ABC</p>
                        </div>
                    </div>
                </div>
                <h5 className="mx-2 mb-4 mt-4 font-bold">IF</h5>
                <div className="md:grid grid-cols-1">
                    <div className="md:grid grid-cols-7">
                        <div className="text-base text-black mb-2">1.</div>
                        <div className="grid-cols-1 text-base text-black mb-2">
                            Customer Type
                        </div>
                        <div className="grid-cols-1 text-base text-black mb-2">
                            Greater Than or Equal to
                        </div>
                        <div className="grid-cols-1 text-base text-black mb-2">
                            10000
                        </div>
                        <div className="grid-cols-1 bold text-base text-black font-bold  decoration-2 mb-2">
                            AND
                        </div>
                    </div>
                    <div className="md:grid grid-cols-7">
                        <div className="text-base text-black mb-2">2.</div>
                        <div className="grid-cols-1 text-base text-black mb-2">
                            Customer Type
                        </div>
                        <div className="grid-cols-1 text-base text-black mb-2">
                            Greater Than or Equal to
                        </div>
                        <div className="grid-cols-1 text-base text-black mb-2">
                            10000
                        </div>
                        <div className="grid-cols-1 bold text-base text-black font-bold  decoration-2 mb-2"></div>
                    </div>
                </div>
                <h5 className="mx-2 mb-4 mt-1 font-bold">THEN</h5>
                <div className="md:grid grid-cols-2">
                    <div className="md:grid grid-cols-4">
                        <div className="text-base text-black mb-2">1.</div>
                        <div className="grid-cols-1 text-base text-black mb-2">
                            Price
                        </div>
                        <div className="grid-cols-1 text-base text-black mb-2">
                            Equal to
                        </div>
                        <div className="grid-cols-1 text-base text-black mb-2">
                            10000
                        </div>
                    </div>
                </div>
            </Card> */}
        </>
    )
}

export default SolutionPreview
