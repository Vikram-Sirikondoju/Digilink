import { Alert, Button, Card, Dialog } from 'components/ui'
import React, { useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import GetDropdownLabel from 'views/Servicefile';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { timeZone } from '../../../../mock/data/timezones'
import appConfig from 'configs/app.config';
import dayjs from 'dayjs';

const custOperator = [
    { label: 'Airtel Telangana', value: '1' },
    { label: 'Airtel Mumbai', value: '2' },
    { label: 'Airtel Rajasthan ', value: '3' },

]

const genderOptions = [
    { label: 'Airtel Inc.', value: '5' },
    { label: 'Airtel Inc.', value: '6' },
    { label: 'Airtel India', value: '7' },
]
const orientationtype = [
    { label: 'Right to Left', value: "RTL" },
    { label: 'Left to Right', value: "LTR" },
]

const language = [
    { label: 'English', value: 1 },
    { label: 'Spanish', value: 2 },
    { label: 'Arabic', value: 3 },
    { label: 'Portugese', value: 4 },

]

// const currency = [
//     { label: 'USD', value: '1' },
//     { label: 'EUR', value: '2' },
//     { label: 'CAD', value: '3' },
//     { label: 'KWD', value: '4' },
//     { label: 'INR', value: '5' },
// ]

// const timeZone = [
//     { label: 'India (GMT+5:30)', value: '1' },
//     { label: 'USA (GMT-4)', value: '2' },
//     { label: 'Chicago (GMT-5)', value: '3' },
//     { label: 'Phoenix (GMT-7)', value: '4' },
//     { label: 'Los Angeles (GMT-7)', value: '5' },
// ]

// const parentAccount = [
//     { label: 'Global MNO', value: '1' },

// ]

const custCat = [
    { label: 'Premium', value: '1' },
    { label: 'Platinum', value: '2' },
    { label: 'Gold', value: '3' },
    { label: 'Silver', value: '3' },

]

function RetailPreview({ retailState, step, setStep, message , mode}) {

    const [showContent, setShowContent] = useState(false)
    const [content, setContent] = useState(null)

    const currencyList = useSelector((state) => state.retailsList?.data?.currencyList)
    const parentAccountList = useSelector((state) => state.retailsList?.data?.parentAccountList)
    const custmoerCategoryList = useSelector((state) => state.retailsList?.data?.custmoerCatList)
    const dateFormat = useSelector((state) => state.locale.dateFormat)
    
    const timeZoneList = timeZone?.map((timezone) => ({
        value: timezone.id,
        label: timezone.value,
    }))

    function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("/");
    }
    console.log(retailState, "retailState")
    const onClickFile = (fileInfo) => {
        setShowContent(true)
        setContent(fileInfo)
    }
    return (
        <>
         {message && (
                <Alert className="mb-4" type="danger" showIcon>
                    {Array.isArray(message) ? message.join(", ") : message}
                </Alert>
            )}
            <Card className="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2">
                    {/* to="/account-new-retail" */}
                    <h6 className="mx-2 mb-4 mt-1 font-bold text-cyan-500">
                        RETAIL CUSTOMER DETAILS{' '}
                    </h6>
                 <div className=" text-base  font-bold flex justify-end">
                        <button onClick={() => { setStep(0) }} >
                            <div className='flex'>
                                <MdModeEdit className="mt-1" />
                                <p className='ml-2'>EDIT</p>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="md:grid grid-cols-6">
                    <div className="col-span-2 md:gird mx-2">
                        <div className="text-base  font-bold underline  decoration-2 mb-2">
                            Accounts Info
                        </div>
                        <div className="col-span-6 md:grid grid-cols-2 gap-2">
                            
                            {/* <p className="mt-2 text-base">{GetDropdownLabel(retailState?.customerType, custOperator)}</p> */}
                            <p className="mt-2 text-base">{retailState?.custName}</p>
                            <p className="mt-2 text-base">{retailState?.custCompName}</p>
                            {/* <p className="mt-2 text-base">{enterpriseState?.customerType}</p> */}
                           
                            <p className="mt-2 text-base">
                                {/* {convert(retailState?.custIncorpDt)} */}
                                <p>
                                    {dayjs(
                                       retailState?.custIncorpDtt,
                                        dateFormat
                                    )?.format(dateFormat)}
                                </p>
                            </p>
                            <p className="mt-2 text-base">Tax: {retailState?.custTaxId}</p>        
                            <p className="mt-2 text-base">{GetDropdownLabel(retailState?.customerType, parentAccountList)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(retailState?.custTimeZone, timeZoneList)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(retailState?.custCurrency, currencyList)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(retailState?.custLang, language)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(retailState?.custOrient, orientationtype)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(retailState?.custCat, custCat)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(retailState?.custCat, custmoerCategoryList)}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base  font-bold underline  decoration-2 mb-2">
                            Contact Info
                        </div>
                        <div className='md:grid grid-cols-1 gap-2'>
                            <p className="mt-2 text-base">CXO :{retailState?.custFirstName}</p>
                            <p className="mt-2 text-base">{retailState?.custEmailId}</p>
                            <p className="mt-2 text-base">{retailState?.custWebUrl}</p>
                            <p className="mt-2 text-base">{retailState?.custPhone}</p>
                            <p className="mt-2 text-base">{retailState?.custMiddleName}</p>
                            <p className="mt-2 text-base">{retailState?.custLastName}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base  font-bold underline  decoration-2 mb-2">
                            Address
                        </div>
                        <div className='md:grid grid-cols-1 gap-2'>
                            <p className="mt-2 text-base">{retailState?.custAddL1}</p>
                            <p className="mt-2 text-base">{retailState?.custAddL2}</p>
                            <p className="mt-2 text-base">{retailState?.custCity}</p>

                            <p className="mt-2 text-base">{retailState?.custState}</p>
                            <p className="mt-2 text-base">{retailState?.custCountry}</p>
                            <p className="mt-2 text-base">{retailState?.custZipcode}</p>
                        </div>
                    </div>

                    <div>
                        <div className="text-base  font-bold underline  decoration-2 mb-2">Files</div>
                        {retailState?.uploadFiles.map(e => {
                             if(e.file_name !== ""){                            
                                return(
                                    <>
                                        <div className='md:grid grid-cols-1 gap-2' onClick={() => onClickFile(e)}>
                                            <p className='mt-2 text-base underline text-sky-500 cursor-pointer'>{e.doc_name}</p>
                                        </div>
                                    </>
                                )
                            }
                        })}
                        {retailState?.additionalFiles.map(e => {
                           if(e.file_name !== ""){   
                            return(
                                <>
                                    <div className='md:grid grid-cols-1 gap-2' onClick={() => onClickFile(e)}>
                                        <p className='mt-2 text-base underline text-sky-500 cursor-pointer'>{e.doc_name}</p>
                                    </div>
                                </>
                            )
                        }
                        })}
                    </div>
                </div>
            </Card>
            { mode == "ADD" &&    <Card className="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2">
                    <h6 className="mx-2 mb-4 mt-1 font-bold text-cyan-500">
                        USER INFO{' '}
                    </h6>
                    {mode == "ADD" &&    <div className=" text-base  font-bold flex justify-end">
                        <Link onClick={() => { setStep(0) }} >
                            <div className='flex'>
                                <MdModeEdit className="mt-1" />
                                <p className='ml-2'>EDIT</p>
                            </div>
                        </Link>
                    </div>}
                </div>
                <div className="md:grid grid-cols-12">



                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>FirstName</p>
                        <p className='text-base'>{retailState?.retailUserInitValues?.firstName}</p>
                    </div>
                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>LastName</p>
                        <p className='text-base'>{retailState?.retailUserInitValues?.lastName}</p>
                    </div>

                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>Email ID:</p>
                        <p className='text-base'>{retailState?.retailUserInitValues?.emailId}</p>
                    </div>

                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>Order Approver EmailID:</p>
                        <p className='text-base'>{retailState?.retailUserInitValues?.ordemailId}</p>
                    </div>


                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>Phone Number</p>
                        <p className='text-base'>{retailState?.retailUserInitValues?.phoneNumber}</p>
                    </div>



                </div>


            </Card>}
            <Dialog isOpen={showContent}
                onClose={() => setShowContent(false)}>
                <div className='p-5'>
                    <img src={`${appConfig.apiPrefix}/media/uniqid/${content?.file_url}`} alt="Content" />
                    <Button onClick={() => window.open(`${appConfig.apiPrefix}/media/uniqid/${content?.file_url}`, '_blank')} className='mt-2' variant='solid'>Download</Button>
                </div>
            </Dialog>
        </>
    )
}

export default RetailPreview
