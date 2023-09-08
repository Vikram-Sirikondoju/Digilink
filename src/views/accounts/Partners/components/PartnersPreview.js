import { pathForOrientation } from '@visx/pattern/lib/patterns/Lines';
import { Alert, Button, Card, Dialog } from 'components/ui'
import React, { useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import { Link } from 'react-router-dom';
import GetDropdownLabel from 'views/Servicefile';
import { timeZone } from '../../../../mock/data/timezones'
import { useSelector } from 'react-redux';
import appConfig from 'configs/app.config';
import DateFormat from 'components/template/DateFormat';
import dayjs from 'dayjs';
import ReactHtmlParser from 'html-react-parser'

const partner = [
    { label: 'Shipping Partner', value: 0 },
    { label: 'Warehouse Partner', value: 1 },
]
// const currency = [
//     { label: 'USD', value: 0 },
//     { label: 'EUR', value: 1 },
//     { label: 'CAD', value: 2 },
//     { label: 'KWD', value: 3 },
//     { label: 'INR', value: 4 },
// ]

// const timeZone = [
//     { label: 'India (GMT+5:30)', value: 0 },
//     { label: 'USA (GMT-4)', value: 1 },
//     { label: 'Chicago (GMT-5)', value: 2 },
//     { label: 'Phoenix (GMT-7)', value: 3 },
//     { label: 'Los Angeles (GMT-7)', value: 4},
// ] 
const orientation = [
    { label: 'Right to Left', value: "RTL" },
    { label: 'Left to Right', value: "LTR" },
]
const language = [
    { label: 'English', value: 1 },
    { label: 'Spanish', value: 2 },
    { label: 'Arabic', value: 3 },
    { label: 'Portugese', value: 4 },

]
const settlementType = [
    { label: 'Automatic', value: 'AUTOMATIC' },
    { label: 'Manual', value: 'MANUAL' },
];

const settelementCycle = [
    { label: 'Daily', value: 'DAILY' },
    { label: 'Weekly', value: 'WEEKLY' },
    { label: 'Monthly', value: 'MONTHLY' },
    { label: 'Quarterly', value: 'QUARTERLY' },
    { label: 'Half-Yearly', value: 'HALFYEARLY' },
    { label: 'Yearly', value: 'YEARLY' },
];

const genderOptions = [
    { label: 'Airtel Inc.', value: 0 },
    { label: 'Airtel Inc.', value: 1 },
    { label: 'Airtel India', value: 2 },
]


const contractStatus = [
    { label: 'ACTIVE', value: 'ACTIVE' },
    { label: 'IN_ACTIVE', value: 'IN_ACTIVE' },
    { label: 'PENDING_APPROVAL', value: 'PENDING_APPROVAL' }
]
const apiConfiguration = [
    { label: 'AUTOMATIC', value: 'AUTOMATIC,' },
    { label: 'MANUAL', value: 'MANUAL' },
]
const custOperator = [
    { label: 'Airtel Telangana', value: 0 },
    { label: 'Airtel Mumbai', value: 1 },
    { label: 'Airtel Rajasthan ', value: 2 },

]

function PartnersPreview({ partnerState, step, setStep, message, mode }) {

    const [showContent, setShowContent] = useState(false)
    const [content, setContent] = useState(null)

    console.log(partnerState, "partnerState")
    //  partnerState = {
    //     ...partnerState,
    //     ...partnerState.accInfo,
    //     ...partnerState.ContactInfo,
    //     ...partnerState.address,
    //     ...partnerState.settlementInfo,
    // };
    const publicRolesList = useSelector(
        (state) => state.partnerList?.data?.publicRolesList
    )
    const currencyList = useSelector((state) => state.partnerList?.data?.currencyList)
    const parentAccountList = useSelector((state) => state.partnerList?.data?.parentAccountList)
    const dateFormat = useSelector((state) => state.locale.dateFormat)

    const timeZoneList = timeZone?.map((timezone) => ({
        value: timezone.id,
        label: timezone.value,
    }))

    const contractTypeList = useSelector((state) => state.partnerList?.data?.contractTypeList)

    function convert(str) {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);
        return [day, mnth, date.getFullYear()].join("/");
    }

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
            <h3 className="mx-4 mb-4 mt-2">Preview</h3>
            <Card className="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2">
                    <h6 className="mx-2 mb-4 mt-1 font-bold text-cyan-500">PARTNER DETAILS{' '}</h6>
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
                        <div className="text-base  font-bold underline  decoration-2 mb-2">Accounts Info</div>
                        <div className="col-span-6 md:grid grid-cols-2 gap-2">

                            <p className="mt-2 text-base">{partnerState?.accName}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(partnerState?.accTimeZone, timeZoneList)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(partnerState?.operater, parentAccountList)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(partnerState?.partnerType, partner)}</p>
                            <div className='flex'>
                                <p className="mt-2 text-base  whitespace-nowrap">Inc Date: </p>
                                <p className='mt-[11px]'>
                                    {dayjs(
                                        partnerState?.accIncorpDt,
                                        dateFormat
                                    )?.format(dateFormat)}
                                </p>
                            </div>
                            <p className="mt-2 text-base">{GetDropdownLabel(partnerState?.accCurrency, currencyList)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(partnerState?.accLang, language)}</p>
                            <p className="mt-2 text-base">Tax: {partnerState?.accTaxId}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(partnerState?.accOrient, orientation)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(partnerState?.apiConfig, apiConfiguration)}</p>

                            {/* <p className="mt-2 text-base">Sensors</p> */}
                        </div>
                    </div>
                    <div>
                        <div className="text-base  font-bold underline  decoration-2 mb-2">Contact Info</div>
                        <div className='md:grid grid-cols-1 gap-2'>
                            <p className="mt-2 text-base">CXO : {partnerState?.accPrimContName}</p>
                            <p className="mt-2 text-base">{partnerState?.accEmailId}</p>
                            <p className="mt-2 text-base">{partnerState?.accPrimCont}</p>
                            <p className="mt-2 text-base">{partnerState?.accAltCont}</p>
                            <p className="mt-2 text-base">{partnerState?.accWebUrl}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base  font-bold underline  decoration-2 mb-2">Address</div>
                        <div className='md:grid grid-cols-1 gap-2'>
                            <p className="mt-2 text-base">{partnerState?.accAddL1}</p>
                            <p className="mt-2 text-base">{partnerState?.accCity}</p>
                            <p className="mt-2 text-base">{partnerState?.accState}</p>
                            <p className="mt-2 text-base">{partnerState?.accCountry}</p>
                            <p className="mt-2 text-base">{partnerState?.accZipcode}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base  font-bold underline  decoration-2 mb-2">Settlement Info</div>
                        <div className='md:grid grid-cols-1 gap-2'>


                            <p className="mt-2 text-base">{GetDropdownLabel(partnerState?.prefSettleType, settlementType)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(partnerState?.billCycle, settelementCycle)}</p>

                            <p className="mt-2 text-base whitespace-nowrap">{partnerState?.bankAccNum}</p>
                            <p className="mt-2 text-base">{partnerState?.bankName}</p>
                            <p className="mt-2 text-base">{partnerState?.bankBranchName}</p>
                            <p className="mt-2 text-base">{partnerState?.billDueTenor}</p>
                            <p className="mt-2 text-base">{partnerState?.ifscCode}</p>
                            <p className="mt-2 text-base">{partnerState?.micrCode}</p>
                            {/* <p className="mt-2 text-base">{convert(partnerState?.billDate)}</p> */}
                            <p>
                                {dayjs(
                                    partnerState?.billDate,
                                    dateFormat
                                )?.format(dateFormat)}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base  font-bold underline  decoration-2 mb-2">Files</div>
                        {partnerState?.uploadFiles.map(e => {
                            if (e.file_name !== "") {
                                return (
                                    <>
                                        <div className='md:grid grid-cols-1 gap-2' onClick={() => onClickFile(e)}>
                                            <p className='mt-2 text-base underline text-sky-500 cursor-pointer'>{e.doc_name}</p>
                                        </div>
                                    </>
                                )
                            }
                        })}
                        {partnerState?.additionalFiles.map(e => {
                            if (e.file_name !== "") {
                                return (
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
            {mode == 'ADD' && <Card className="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2">
                    <h6 className="mx-2 mb-4 mt-1 font-bold text-cyan-500">MASTER PERMISSIONS{' '}</h6>
                    {mode == 'ADD' && <div className=" text-base  font-bold flex justify-end">
                        <Link onClick={() => { setStep(1) }} >
                            <div className='flex'>
                                <MdModeEdit className="mt-1" />
                                <p className='ml-2'>EDIT</p>
                            </div>
                        </Link>
                    </div>}
                </div>

                <div className="md:grid grid-cols-12">
                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>PublicRole</p>
                        <p className='text-base'>{GetDropdownLabel(partnerState?.publicRole, publicRolesList)}</p>
                    </div>
                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>UserRole</p>
                        <p className='text-base'>{partnerState?.userRole}</p>
                    </div>
                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>Description</p>
                        <p className='text-base'>{ReactHtmlParser(partnerState?.description)}</p>
                    </div>

                </div>
            </Card>}
            {mode == 'ADD' && <Card className="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2">
                    <h6 className="mx-2 mb-4 mt-1 font-bold text-cyan-500">USER INFO{' '}</h6>
                    {mode == "ADD" && <div className=" text-base  font-bold flex justify-end">
                        <Link onClick={() => { setStep(0) }} >
                            <div className='flex'>
                                <MdModeEdit className="mt-1" />
                                <p className='ml-2'>EDIT</p>
                            </div>
                        </Link>
                    </div>}
                </div>
                <div className="">
                    <div className='md:grid grid-cols-12'>
                        <div className='col-span-2 md:gird mx-2'>
                            <p className='text-base underline font-bold mb-2'>FirstName</p>
                            <p className='text-base'>{partnerState?.userInfo?.firstName}</p>
                        </div>
                        <div className='col-span-2 md:gird mx-2'>
                            <p className='text-base underline font-bold mb-2'>LastName</p>
                            <p className='text-base'>{partnerState?.userInfo?.lastName}</p>
                        </div>
                        {/* <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>Register Id:</p>
                        <p className='text-base'>4679812656_Ajjas</p>
                    </div> */}
                        <div className='col-span-2 md:gird mx-2'>
                            <p className='text-base underline font-bold mb-2'>Email ID:</p>
                            <p className='text-base'>{partnerState?.userInfo?.emailId}</p>
                        </div>
                        <div className='col-span-4 md:gird mx-2'>
                            <p className='text-base underline font-bold mb-2'>Phone Number</p>
                            <p className='text-base'>{partnerState?.userInfo?.phoneNumber}</p>
                        </div>
                    </div>
                    <div className='md:grid grid-cols-12'>
                        <div className='col-span-2 md:gird mx-2 mt-4'>
                            <p className='text-base underline font-bold mb-2'>Contract Type</p>
                            <p className='text-base'>{GetDropdownLabel(partnerState?.contractInfo?.contractType, contractTypeList)}</p>
                        </div>
                        <div className='col-span-2 md:gird mx-2 mt-4'>
                            <p className='text-base underline font-bold mb-2'>Signed Date</p>
                            {/* <p className='text-base'>{convert(partnerState?.contractInfo?.signedDate)}</p> */}
                            <p className='text-base'>
                                {dayjs(
                                    partnerState?.contractInfo?.signedDate,
                                    dateFormat
                                )?.format(dateFormat)}
                            </p>
                        </div>
                        <div className='col-span-2 md:gird mx-2 mt-4'>
                            <p className='text-base underline font-bold mb-2'>Enforcement Date</p>
                            {/* <p className='text-base'>{convert(partnerState?.contractInfo?.enforcementDate)}</p> */}
                            <p className='text-base'>
                                {dayjs(
                                    partnerState?.contractInfo?.enforcementDate,
                                    dateFormat
                                )?.format(dateFormat)}
                            </p>
                        </div>
                        <div className='col-span-2 md:gird mx-2 mt-4'>
                            <p className='text-base underline font-bold mb-2'>Termination Date</p>
                            {/* <p className='text-base'>{convert(partnerState?.contractInfo?.terminationDate)}</p> */}
                            <p className='text-base'>
                                {dayjs(
                                    partnerState?.contractInfo?.terminationDate,
                                    dateFormat
                                )?.format(dateFormat)}
                            </p>
                        </div>
                        <div className='col-span-2 md:gird mx-2 mt-4'>
                            <p className='text-base underline font-bold mb-2'>status</p>
                            <p className='text-base'>{GetDropdownLabel(partnerState?.contractInfo?.contractStatus, contractStatus)}</p>
                        </div>
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

export default PartnersPreview
