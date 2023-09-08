import { Card, Dialog, Button } from 'components/ui'
import React, { useMemo, useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import ReactHtmlParser from 'html-react-parser'
import { Link } from 'react-router-dom'
import GetDropdownLabel from 'views/Servicefile'
import { useSelector } from 'react-redux'

import appConfig from 'configs/app.config';
const tempItemTypeOptions = [
    { label: "Product", value: 'P' },
    { label: "Data Paln", value: 'D' },
    { label: "Service Plan", value: 'S' }
]
const productCategoryOptions = [
    { label: 'GPS TRACKERS', value: '1' },
    { label: 'SMART SECURITY SYSTEMS', value: '2' },
    { label: 'SMART MOBILES', value: '3' },

]




function ItemPreview({ itemIntials, step, setStep }) {
    const [showContent, setShowContent] = useState(false)
    const [content, setContent] = useState(null)
    
    const onClickFile = (fileInfo) => {
       
        setShowContent(true)
        setContent(fileInfo)
    }
    const itemsProductcat = useSelector((state) => state?.itemsCreateList?.data?.itemsProductCatList)
    return (
        <>
            <h3 className="mx-4 mb-4 mt-2">Preview</h3>

            <Card className="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2 mb-4">
                    <h5 className="mx-2 mb-4 mt-1 font-bold text-cyan-500">
                        CHOOSE TEMPLATE{' '}
                    </h5>
                    <div className=" text-base  font-bold flex justify-end pointer-events-auto">
                        <Link onClick={() => { setStep(0) }} >
                            <div className='flex'>
                                <MdModeEdit className="mt-1" />
                                <p className='ml-2'>EDIT</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="md:grid grid-cols-4">
                    <div className="md:gird mx-2">
                        <div className="text-base  font-bold underline decoration-2 mb-2">
                            Item Category
                        </div>
                        <div className="col-span-6 md:grid grid-cols-2 gap-2">
                            <p className="mt-2 text-base">{GetDropdownLabel(itemIntials?.itemTemplate?.productCat, itemsProductcat)}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base  font-bold underline decoration-2 mb-2">
                            Template Title
                        </div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">{itemIntials.itemTemplate.selectedTemplateName}</p>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2 mb-4">
                    <h5 className="mx-2 mb-4 mt-1 font-bold text-cyan-500">ITEM DETAILS </h5>
                    <div className=" text-base font-bold flex justify-end">
                        <Link onClick={() => { setStep(1) }} >
                            <div className='flex'>
                                <MdModeEdit className="mt-1" />
                                <p className='ml-2'>EDIT</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="md:grid grid-cols-4">
                    <div className="md:gird mx-2">
                        <div className="text-base  font-bold underline decoration-2 mb-2">
                            Item Title
                        </div>
                        <div className="col-span-6 md:grid grid-cols-2 gap-2">
                            <p className="mt-2 text-base">{itemIntials?.itemBasicDetails?.itemTitle}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base  font-bold  underline decoration-2 mb-2">
                            Item Description
                        </div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <div className="mt-2 text-base" dangerouslySetInnerHTML={{ __html: itemIntials?.itemBasicDetails?.itemDesc || '' }} />
                        </div>
                    </div>
                    <div>
                        <div className="text-base underline font-bold  decoration-2 mb-2">
                            Upload Images
                        </div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <div className='md:grid grid-cols-1 gap-2' onClick={() => onClickFile(itemIntials?.itemBasicDetails?.sopFileUrl)}>
                                <p className='mt-2 text-base underline text-sky-500 cursor-pointer'>{itemIntials?.itemBasicDetails?.sopFileUrl}</p>
                            </div>
                            <div className='md:grid grid-cols-1 gap-2' onClick={() => onClickFile(itemIntials?.itemBasicDetails?.uploadImageUrl)}>
                                <p className='mt-2 text-base underline text-sky-500 cursor-pointer'>{itemIntials?.itemBasicDetails?.uploadImageUrl}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        {/* <div className="text-base text-black font-bold  decoration-2 mb-2">
                            Item Features
                        </div> */}
                        <div className="md:grid grid-cols-1 gap-2">
                            <div className="mt-2 text-base">

                                {/* {ReactHtmlParser( */}
                                {itemIntials?.itemBasicDetailsOther?.itemFeatureDec}
                                {/* )}  */}
                            </div >
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2 mb-4">
                    <h5 className="mx-2 mb-4 mt-1 font-bold text-cyan-500">
                        VARIANTS DETAILS{' '}
                    </h5>
                    <div className=" text-base font-bold flex justify-end">
                        <Link onClick={() => { setStep(2) }} >
                            <div className='flex'>
                                <MdModeEdit className="mt-1" />
                                <p className='ml-2'>EDIT</p>
                            </div>
                        </Link>
                    </div>
                </div>
                {itemIntials?.itemVarients?.map((vari, i) => {
            
                    return <div className="md:grid grid-cols-4 mx-2" key={i}>
                        {/* <div className="md:gird ">
                            <div className="text-base text-black font-bold  decoration-2 mb-2">
                                Variant Type:
                            </div>
                            <div className="col-span-6 md:grid grid-cols-1 gap-2">
                                <p className="mt-2 text-base">variant type 1</p>
                            </div>
                        </div> */}
                        <div>
                            <div className="text-base underline font-bold  decoration-2 mb-2">
                                Variant Title
                            </div>
                            <div className="md:grid grid-cols-1 gap-2">
                                <p className="mt-2 text-base">{vari?.item_var_title}</p>
                            </div>
                        </div>
                        {/* <div>
                            <div className="text-base text-black font-bold  decoration-2 mb-2">
                                Variant ID
                            </div>
                            <div className="md:grid grid-cols-1 gap-2">
                                <p className="mt-2 text-base">ID12345</p>
                            </div>
                        </div> */}
                        <div>
                            <div className="text-base underline font-bold  decoration-2 mb-2">
                                Variant Price
                            </div>
                            <div className="md:grid grid-cols-1 gap-2">
                                <p className="mt-2 text-base">{vari?.var_def_price}</p>
                            </div>
                        </div>
                        <div>
                            <div className="text-base underline font-bold  decoration-2 mb-2 mt-4">
                                Variant Description
                            </div>
                            <div className="md:grid grid-cols-1 gap-2">
                                <div className="mt-2 text-base" dangerouslySetInnerHTML={{ __html: vari?.item_var_desc || '' }} />
                            </div>
                        </div>
                        <div>
                            <div className="text-base underline  font-bold  decoration-2 mb-2  mt-4">
                                Upload Images
                            </div>
                            <div className='md:grid grid-cols-1 gap-2' onClick={() => onClickFile(vari
                                ?.img_url)}>
                                <p className='mt-2 text-base underline text-sky-500 cursor-pointer'>{vari
                                    ?.img_url}</p>
                            </div>
                        </div>
                    </div>
                })}

            </Card>
            <Dialog isOpen={showContent}
                onClose={() => setShowContent(false)}>
                <div className='p-5'>
                    <img src={`${appConfig.apiPrefix}/media/uniqid/${content}`} alt="Content" />
                    <Button onClick={() => window.open(`${appConfig.apiPrefix}/media/uniqid/${content}`, '_blank')} className='mt-2' variant='solid'>Download</Button>
                </div>
            </Dialog>
        </>
    )
}

export default ItemPreview
