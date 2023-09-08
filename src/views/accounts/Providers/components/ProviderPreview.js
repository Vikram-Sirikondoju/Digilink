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



const language = [
    { label: 'English', value: 1 },
    { label: 'Spanish', value: 2 },
    { label: 'Arabic', value: 3 },
    { label: 'Portugese', value: 4 },

]
const orientationtype = [
    { label: 'Right to Left', value: "RTL" },
    { label: 'Left to Right', value: "LTR" },
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
    { label: 'Airtel Inc.', value: 1 },
    { label: 'Airtel Inc.', value: 2 },
    { label: 'Airtel India', value: 3 },
]

const contractStatus = [
    { label: 'ACTIVE', value: 'ACTIVE' },
    { label: 'IN_ACTIVE', value: 'IN_ACTIVE' },
    { label: 'PENDING_APPROVAL', value: 'PENDING_APPROVAL' }
]



function ProviderPreview({ providerState, step, setStep, message, mode }) {

    console.log(providerState, "providerState")

    const [showContent, setShowContent] = useState(false)
    const [content, setContent] = useState(null)

    const currencyList = useSelector((state) => state.salesOrderList?.data?.currencyList)
    const parentAccountList = useSelector((state) => state.salesOrderList?.data?.parentAccountList)
    const dateFormat = useSelector((state) => state.locale.dateFormat)

    const timeZoneList = timeZone?.map((timezone) => ({
        value: timezone.id,
        label: timezone.value,
    }))
    const productCategoryList = useSelector((state) => state.providerList?.data?.productCatList)
    const contractTypeList = useSelector((state) => state.providerList?.data?.contractTypeList)
    const publicRolesList = useSelector(
        (state) => state.providerList?.data?.publicRolesList
    )
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
                    <h6 className="mx-2 mb-4 mt-1 font-bold text-cyan-500">
                        PROVIDER DETAILS{' '}
                    </h6>
                    <div className=" text-base  font-bold flex justify-end" >
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
                            {/* <p className="mt-2 text-base">ID : {providerState?.providerId}</p>
                            <p className="mt-2 text-base">User Group 1</p> */}
                            <p className="mt-2 text-base">{providerState?.accName}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(providerState?.accTimeZone, timeZoneList)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(providerState?.accType, parentAccountList)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(providerState?.accCurrency, currencyList)}</p>
                           <div className='flex'>
                           <p className="mt-2 text-base  whitespace-nowrap">Inc Date: </p>
                            <p className='mt-[11px]'>
                                {dayjs(
                                    providerState?.accIncorpDt,
                                    dateFormat
                                )?.format(dateFormat)}
                            </p>
                           </div>
                            <p className="mt-2 text-base">{GetDropdownLabel(providerState?.accLang, language)}</p>
                            <p className="mt-2 text-base">Tax: {providerState?.accTaxId}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(providerState?.accOrient, orientationtype)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(providerState?.prodCategory, productCategoryList)}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base  font-bold underline  decoration-2 mb-2">
                            Contract Info
                        </div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">{providerState?.accPrimeContFirstName}</p>
                            <p className="mt-2 text-base">{providerState?.accPrimeContLastName}</p>
                            <p className="mt-2 text-base">{providerState?.accPrimeContMidName}</p>
                            <p className="mt-2 text-base">{providerState?.accEmailId}</p>
                            <p className="mt-2 text-base">{providerState?.accPrimCont}</p>
                            <p className="mt-2 text-base">{providerState?.accAltCont}</p>
                            <p className="mt-2 text-base">{providerState?.accWebUrl}</p>
                        </div>
                    </div>
                    <div>
                        <div className="text-base  font-bold underline  decoration-2 mb-2">
                            Address
                        </div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">{providerState?.accAddL1}</p>
                            <p className="mt-2 text-base">{providerState?.accCity}</p>
                            <p className="mt-2 text-base">{providerState?.accState}</p>
                            <p className="mt-2 text-base">{providerState?.accCountry}</p>
                            <p className="mt-2 text-base">{providerState?.accZipcode}</p>
                        </div>
                    </div>



                    <div>
                        <div className="text-base  font-bold underline  decoration-2 mb-2">Settlement Info</div>
                        <div className="md:grid grid-cols-1 gap-2">
                            <p className="mt-2 text-base">{GetDropdownLabel(providerState?.prefSettleType, settlementType)}</p>
                            <p className="mt-2 text-base">{GetDropdownLabel(providerState?.billCycle, settelementCycle)}</p>

                            <p className="mt-2 text-base whitespace-nowrap">{providerState?.bankAccNum}</p>
                            <p className="mt-2 text-base">{providerState?.bankName}</p>
                            <p className="mt-2 text-base">{providerState?.bankBranchName}</p>
                            <p className="mt-2 text-base">{providerState?.billDueTenor}</p>
                            <p className="mt-2 text-base">{providerState?.ifscCode}</p>
                            <p className="mt-2 text-base">{providerState?.micrCode}</p>
                            {/* <p className="mt-2 text-base">{convert(providerState?.billDate)}</p> */}
                            <p>
                                {dayjs(
                                    providerState?.billDate,
                                    dateFormat
                                )?.format(dateFormat)}
                            </p>

                        </div>
                    </div>
                    <div className='ml-6'>
                        <div className="text-base  font-bold underline  decoration-2 mb-2">Files</div>
                        {providerState?.uploadFiles.map(e => {
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
                        {providerState?.additionalFiles.map(e => {
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
                        <p className='text-base'>{GetDropdownLabel(providerState?.publicRole, publicRolesList)}</p>
                    </div>
                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>UserRole</p>
                        <p className='text-base'>{providerState?.userRole}</p>
                    </div>
                    <div className='col-span-2 md:gird mx-2'>
                        <p className='text-base underline font-bold mb-2'>Description</p>
                        <p className='text-base'>{ReactHtmlParser(providerState?.description)}</p>
                    </div>
                   
                </div>
            </Card>}
            {mode == 'ADD' && <Card className="mx-3 mb-4 mt-1">
                <div className="md:grid grid-cols-2">
                    <h6 className="mx-2 mb-4 mt-1 font-bold text-cyan-500">
                        USER INFO{' '}
                    </h6>
                    {mode == 'ADD' && <div className=" text-base  font-bold flex justify-end">
                        <Link onClick={() => { setStep(0) }} >
                            <div className='flex'>
                                <MdModeEdit className="mt-1" />
                                <p className='ml-2'>EDIT</p>
                            </div>
                        </Link>
                    </div>}
                </div>
                <div className="">
                    <div className='grid grid-cols-12'>
                        <div className="col-span-2 md:gird mx-2 mt-4">
                            <p className="text-base underline font-bold mb-2">
                                FirstName
                            </p>
                            <p className="text-base">{providerState?.userInfo?.firstName}</p>
                        </div>
                        <div className="col-span-2 md:gird mx-2 mt-4">
                            <p className="text-base underline font-bold mb-2">
                                LastName
                            </p>
                            <p className="text-base">{providerState?.userInfo?.lastName}</p>
                        </div>
                        {/* <div className="col-span-2 md:gird mx-2">
                        <p className="text-base underline font-bold mb-2">
                            Register Id:
                        </p>
                        <p className="text-base">4679812656_Ajjas</p>
                    </div> */}
                        <div className="col-span-2 md:gird mx-2 mt-4">
                            <p className="text-base underline font-bold mb-2">
                                Email ID:
                            </p>
                            <p className="text-base">{providerState?.userInfo?.emailId}</p>
                        </div>
                        <div className="col-span-2 md:gird mx-2 mt-4">
                            <p className="text-base underline font-bold mb-2">
                                Phone Number
                            </p>
                            <p className="text-base">{providerState?.userInfo?.phoneNumber}</p>
                        </div>
                    </div>

                    {/* contract type */}


                    <div className='grid grid-cols-12'>
                        <div className="col-span-2 md:gird mx-2 mt-4">
                            <p className="text-base underline font-bold mb-2">
                                Contract Type
                            </p>
                            <p className="text-base">{GetDropdownLabel(providerState?.contractType, contractTypeList)}</p>
                        </div>
                        <div className="col-span-2 md:gird mx-2 mt-4">
                            <p className="text-base underline font-bold mb-2">
                                Signed Date
                            </p>
                            {/* <p className="text-base">{convert(providerState?.signedDate)}</p> */}
                            <p>
                                {dayjs(
                                   providerState?.signedDate,
                                    dateFormat
                                )?.format(dateFormat)}
                            </p>
                        </div>
                        <div className="col-span-2 md:gird mx-2 mt-4">
                            <p className="text-base underline font-bold mb-2">
                                Enforcement Date
                            </p>
                            {/* <p className="text-base">{convert(providerState?.enforcementDate)}</p> */}
                            <p>
                                {dayjs(
                                   providerState?.enforcementDate,
                                    dateFormat
                                )?.format(dateFormat)}
                            </p>
                        </div>
                        <div className="col-span-2 md:gird mx-2 mt-4">
                            <p className="text-base underline font-bold mb-2">
                                Termination Date
                            </p>
                            {/* <p className="text-base">{convert(providerState?.terminationDate)}</p> */}
                            <p>
                                {dayjs(
                                   providerState?.terminationDate,
                                    dateFormat
                                )?.format(dateFormat)}
                            </p>
                        </div>
                        <div className="col-span-2 md:gird mx-2 mt-4">
                            <p className="text-base underline font-bold mb-2">
                                Status
                            </p>
                            <p className="text-base">{GetDropdownLabel(providerState?.contractStatus, contractStatus)}</p>
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

export default ProviderPreview
